import { generateLyrics, generateBanner, generateMusic, generateVideo } from '@/lib/acedata';
import { generatePitchText, buildLyricsPrompt, buildBannerPrompt, buildMusicStyle, buildVideoPrompt } from '@/lib/prompts';
import { StepId } from '@/lib/types';

export const maxDuration = 300;

export async function POST(req: Request) {
  const { tokenName, vibe } = await req.json();

  if (!tokenName || !vibe) {
    return new Response(JSON.stringify({ error: 'tokenName and vibe are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: Record<string, unknown>) => {
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
        );
      };

      const sendProgress = (step: StepId, status: string, error?: string) => {
        send('progress', { step, status, ...(error ? { error } : {}) });
      };

      const sendResult = (step: StepId, result: Record<string, unknown>) => {
        send('result', { step, result });
      };

      try {
        // Phase 1: Pitch (local) + Lyrics + Banner in parallel
        sendProgress('pitch', 'generating');
        sendProgress('lyrics', 'generating');
        sendProgress('banner', 'generating');

        const pitchText = generatePitchText(tokenName, vibe);
        sendProgress('pitch', 'done');
        sendResult('pitch', { text: pitchText });

        const lyricsPrompt = buildLyricsPrompt(tokenName, vibe);
        const bannerPrompt = buildBannerPrompt(tokenName, vibe);

        const [lyricsSettled, bannerSettled] = await Promise.allSettled([
          generateLyrics(lyricsPrompt),
          generateBanner(bannerPrompt),
        ]);

        let lyricsText = '';
        if (lyricsSettled.status === 'fulfilled') {
          sendProgress('lyrics', 'done');
          sendResult('lyrics', {
            text: lyricsSettled.value.text,
            title: lyricsSettled.value.title,
          });
          lyricsText = lyricsSettled.value.text;
        } else {
          const errMsg = lyricsSettled.reason?.message || 'Lyrics generation failed';
          sendProgress('lyrics', 'error', errMsg);
        }

        let bannerUrl = '';
        if (bannerSettled.status === 'fulfilled') {
          sendProgress('banner', 'done');
          sendResult('banner', {
            imageUrl: bannerSettled.value.imageUrl,
            prompt: bannerSettled.value.prompt,
          });
          bannerUrl = bannerSettled.value.imageUrl;
        } else {
          const errMsg = bannerSettled.reason?.message || 'Banner generation failed';
          sendProgress('banner', 'error', errMsg);
        }

        // Phase 2: Music (needs lyrics) + Video (needs banner) in parallel
        const phase2Promises: Promise<void>[] = [];

        if (lyricsText) {
          sendProgress('music', 'generating');
          phase2Promises.push(
            generateMusic(`$${tokenName.toUpperCase()} Anthem`, lyricsText, buildMusicStyle())
              .then((music) => {
                sendProgress('music', 'done');
                sendResult('music', {
                  audioUrl: music.audioUrl,
                  imageUrl: music.imageUrl,
                  title: music.title,
                  style: music.style,
                  lyric: music.lyric,
                  duration: music.duration,
                });
              })
              .catch((err) => {
                sendProgress('music', 'error', err.message || 'Music generation failed');
              })
          );
        } else {
          sendProgress('music', 'error', 'Skipped — lyrics generation failed');
        }

        if (bannerUrl) {
          sendProgress('video', 'generating');
          phase2Promises.push(
            generateVideo(buildVideoPrompt(tokenName, vibe), bannerUrl)
              .then((video) => {
                sendProgress('video', 'done');
                sendResult('video', {
                  videoUrl: video.videoUrl,
                  thumbnailUrl: video.thumbnailUrl,
                });
              })
              .catch((err) => {
                sendProgress('video', 'error', err.message || 'Video generation failed');
              })
          );
        } else {
          sendProgress('video', 'error', 'Skipped — banner generation failed');
        }

        if (phase2Promises.length > 0) {
          await Promise.allSettled(phase2Promises);
        }

        send('complete', { finished: true });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        send('error', { message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
