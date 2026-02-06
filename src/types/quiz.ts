export type Aspect = 'shadow' | 'sanctuary' | 'armor';

export interface Answer {
  id: string;
  text: {
    ru: string;
    en: string;
  };
  aspect: Aspect;
  moodTags: string[];
}

export interface QuizQuestion {
  id: string;
  mbtiType: string;
  questionNumber: number;
  text: {
    ru: string;
    en: string;
  };
  answers: Answer[];
}

export interface SelectedAnswer {
  questionId: string;
  answerId: string;
  aspect: Aspect;
  moodTags: string[];
}

export type QuizStep = 'landing' | 'mbti-select' | 'quiz' | 'calculating' | 'results';

export interface AspectScore {
  aspect: Aspect;
  score: number;
  moodTags: Record<string, number>;
}
