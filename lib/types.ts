export type StepId = 'pitch' | 'lyrics' | 'banner' | 'music' | 'video';

export type StepStatus = 'pending' | 'generating' | 'done' | 'error';

export interface StepState {
  id: StepId;
  label: string;
  emoji: string;
  status: StepStatus;
  error?: string;
}

export interface PitchResult {
  text: string;
}

export interface LyricsResult {
  text: string;
  title: string;
}

export interface BannerResult {
  imageUrl: string;
  prompt: string;
}

export interface MusicResult {
  audioUrl: string;
  imageUrl?: string;
  title: string;
  style: string;
  lyric: string;
  duration: number;
}

export interface VideoResult {
  videoUrl: string;
  thumbnailUrl?: string;
}

export interface GenerationResults {
  pitch?: PitchResult;
  lyrics?: LyricsResult;
  banner?: BannerResult;
  music?: MusicResult;
  video?: VideoResult;
}

export interface SSEEvent {
  event: string;
  data: ProgressEvent | ResultEvent | CompleteEvent | ErrorEvent;
}

export interface ProgressEvent {
  step: StepId;
  status: StepStatus;
  error?: string;
}

export interface ResultEvent {
  step: StepId;
  result: PitchResult | LyricsResult | BannerResult | MusicResult | VideoResult;
}

export interface CompleteEvent {
  results: GenerationResults;
}

export interface ErrorEvent {
  message: string;
}
