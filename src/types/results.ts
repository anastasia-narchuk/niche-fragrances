import type { Aspect } from './quiz';
import type { Perfume } from './perfume';

export interface Recommendation {
  perfume: Perfume;
  matchScore: number;
  matchReason: { ru: string; en: string };
}

export interface AspectResult {
  aspect: Aspect;
  name: { ru: string; en: string };
  description: { ru: string; en: string };
  score: number;
  recommendations: Recommendation[];
}

export interface QuizResults {
  mbtiType: string;
  aspects: AspectResult[];  // ranked from dominant to least expressed
}
