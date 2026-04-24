import { LyricsResult, BannerResult, MusicResult, VideoResult } from './types';

const API_BASE = 'https://api.acedata.cloud';

function getHeaders(): HeadersInit {
  const token = process.env.ACE_API_TOKEN;
  if (!token) throw new Error('ACE_API_TOKEN is not configured');
  return {
    'accept': 'application/json',
    'authorization': `Bearer ${token}`,
    'content-type': 'application/json',
  };
}

export async function generateLyrics(prompt: string): Promise<LyricsResult> {
  const res = await fetch(`${API_BASE}/suno/lyrics`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ prompt, model: 'default' }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Lyrics API error (${res.status}): ${text}`);
  }

  const json = await res.json();
  const lyrics = json.data || json;
  if (!lyrics.text && !lyrics.title) {
    throw new Error('Unexpected lyrics response format');
  }

  return {
    text: lyrics.text || '',
    title: lyrics.title || 'Untitled',
  };
}

export async function generateBanner(prompt: string): Promise<BannerResult> {
  const res = await fetch(`${API_BASE}/flux/images`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      action: 'generate',
      prompt,
      size: '1024x1024',
      model: 'flux-dev',
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Banner API error (${res.status}): ${text}`);
  }

  const json = await res.json();

  let imageUrl = '';
  if (json.data && Array.isArray(json.data) && json.data.length > 0) {
    imageUrl = json.data[0].image_url || json.data[0].url || '';
  } else if (json.image_url) {
    imageUrl = json.image_url;
  } else if (json.url) {
    imageUrl = json.url;
  }

  if (!imageUrl) {
    throw new Error('No image URL in banner response');
  }

  return { imageUrl, prompt };
}

export async function generateMusic(
  title: string,
  lyric: string,
  style: string
): Promise<MusicResult> {
  const res = await fetch(`${API_BASE}/suno/audios`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      action: 'generate',
      model: 'chirp-v4',
      custom: true,
      title,
      lyric,
      style,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Music API error (${res.status}): ${text}`);
  }

  const json = await res.json();
  const track = Array.isArray(json.data) ? json.data[0] : json;

  if (!track || !track.audio_url) {
    throw new Error('No audio URL in music response');
  }

  return {
    audioUrl: track.audio_url,
    imageUrl: track.image_url || undefined,
    title: track.title || title,
    style: track.style || style,
    lyric: track.lyric || lyric,
    duration: track.duration || 0,
  };
}

async function pollLumaTask(taskId: string, maxAttempts = 30): Promise<VideoResult> {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(r => setTimeout(r, 10000));

    const res = await fetch(`${API_BASE}/luma/tasks`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ id: taskId, action: 'retrieve' }),
    });

    if (!res.ok) continue;
    const json = await res.json();
    const data = json.data || json;

    if (data.state === 'completed' || data.video_url) {
      return {
        videoUrl: data.video_url,
        thumbnailUrl: data.thumbnail_url || undefined,
      };
    }

    if (data.state === 'failed') {
      throw new Error('Video generation failed');
    }
  }

  throw new Error('Video generation timed out after polling');
}

export async function generateVideo(
  prompt: string,
  startImageUrl?: string
): Promise<VideoResult> {
  const body: Record<string, unknown> = {
    prompt,
    action: 'generate',
    aspect_ratio: '16:9',
  };

  if (startImageUrl) {
    body.start_image_url = startImageUrl;
  }

  const res = await fetch(`${API_BASE}/luma/videos`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Video API error (${res.status}): ${text}`);
  }

  const json = await res.json();
  const data = json.data || json;

  if (data.video_url) {
    return {
      videoUrl: data.video_url,
      thumbnailUrl: data.thumbnail_url || undefined,
    };
  }

  const taskId = data.task_id || data.video_id || data.id;
  if (taskId) {
    return pollLumaTask(taskId);
  }

  throw new Error('No video URL or task ID in video response');
}
