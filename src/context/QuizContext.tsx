import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Aspect, QuizStep, SelectedAnswer } from '../types/quiz';
import type { QuizResults } from '../types/results';

// ─── State ─────────────────────────────────────────────
interface QuizState {
  step: QuizStep;
  selectedMBTI: string | null;
  currentQuestionIndex: number;
  answers: SelectedAnswer[];
  aspectScores: Record<Aspect, number>;
  moodTagAccumulator: Record<string, number>;
  results: QuizResults | null;
}

const initialState: QuizState = {
  step: 'landing',
  selectedMBTI: null,
  currentQuestionIndex: 0,
  answers: [],
  aspectScores: { shadow: 0, sanctuary: 0, armor: 0 },
  moodTagAccumulator: {},
  results: null,
};

// ─── Actions ───────────────────────────────────────────
type QuizAction =
  | { type: 'SET_STEP'; payload: QuizStep }
  | { type: 'SELECT_MBTI'; payload: string }
  | { type: 'ANSWER_QUESTION'; payload: SelectedAnswer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'SET_RESULTS'; payload: QuizResults }
  | { type: 'RESET' };

// ─── Reducer ───────────────────────────────────────────
function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };

    case 'SELECT_MBTI':
      return {
        ...state,
        selectedMBTI: action.payload,
        step: 'quiz',
        currentQuestionIndex: 0,
        answers: [],
        aspectScores: { shadow: 0, sanctuary: 0, armor: 0 },
        moodTagAccumulator: {},
        results: null,
      };

    case 'ANSWER_QUESTION': {
      const { aspect, moodTags } = action.payload;
      const newAspectScores = { ...state.aspectScores };
      newAspectScores[aspect] += 1;

      const newMoodTags = { ...state.moodTagAccumulator };
      for (const tag of moodTags) {
        newMoodTags[tag] = (newMoodTags[tag] || 0) + 1;
      }

      return {
        ...state,
        answers: [...state.answers, action.payload],
        aspectScores: newAspectScores,
        moodTagAccumulator: newMoodTags,
      };
    }

    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };

    case 'SET_RESULTS':
      return {
        ...state,
        results: action.payload,
        step: 'results',
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

// ─── Context ───────────────────────────────────────────
interface QuizContextValue {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuizContext must be used within QuizProvider');
  return ctx;
}
