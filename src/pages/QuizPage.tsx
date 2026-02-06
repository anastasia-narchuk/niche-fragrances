import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PageTransition } from '../components/ui/PageTransition';
import { GlowCard } from '../components/ui/GlowCard';
import { useQuizContext } from '../context/QuizContext';
import { cn } from '../utils/cn';

import quizData from '../data/quiz-questions.json';
import type { QuizQuestion } from '../types/quiz';

const questionVariants = {
  enter: { x: 50, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: { x: -50, opacity: 0, transition: { duration: 0.3 } },
};

export function QuizPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useQuizContext();
  const lang = i18n.language as 'ru' | 'en';

  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get questions for selected MBTI type
  const questions = (quizData as QuizQuestion[]).filter(
    (q) => q.mbtiType === state.selectedMBTI
  );
  const totalQuestions = questions.length;
  const currentQuestion = questions[state.currentQuestionIndex];

  // Redirect if no MBTI selected
  useEffect(() => {
    if (!state.selectedMBTI) {
      navigate('/select');
    }
  }, [state.selectedMBTI, navigate]);

  const handleAnswer = useCallback(
    (answerId: string) => {
      if (isTransitioning) return;

      const answer = currentQuestion.answers.find((a) => a.id === answerId);
      if (!answer) return;

      setSelectedAnswerId(answerId);
      setIsTransitioning(true);

      // Record the answer
      dispatch({
        type: 'ANSWER_QUESTION',
        payload: {
          questionId: currentQuestion.id,
          answerId: answer.id,
          aspect: answer.aspect,
          moodTags: answer.moodTags,
        },
      });

      // Capture current index to avoid stale closure
      const nextIndex = state.currentQuestionIndex + 1;

      // Auto-advance after 800ms
      setTimeout(() => {
        if (nextIndex < totalQuestions) {
          dispatch({ type: 'NEXT_QUESTION' });
          setSelectedAnswerId(null);
          setIsTransitioning(false);
        } else {
          // Last question — go to calculating/results
          dispatch({ type: 'SET_STEP', payload: 'calculating' });
          navigate('/results');
        }
      }, 800);
    },
    [currentQuestion, dispatch, isTransitioning, navigate, state.currentQuestionIndex, totalQuestions]
  );

  if (!currentQuestion) {
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16 px-6 md:px-10 flex flex-col items-center">
        {/* Progress */}
        <div className="w-full max-w-xl mb-12">
          <div className="flex items-center justify-between mb-3">
            <span className="text-text-muted text-xs uppercase tracking-[0.2em] font-light">
              {t('quiz.question')}
            </span>
            <span className="text-gold/60 text-sm font-light">
              {t('quiz.progress', {
                current: state.currentQuestionIndex + 1,
                total: totalQuestions,
              })}
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-dark to-gold"
              initial={{ width: 0 }}
              animate={{
                width: `${((state.currentQuestionIndex + 1) / totalQuestions) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              variants={questionVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Question text */}
              <h2 className="font-display text-xl md:text-2xl font-medium text-text-primary leading-relaxed mb-10 text-center">
                {currentQuestion.text[lang]}
              </h2>

              {/* Answers */}
              <div className="space-y-3">
                {currentQuestion.answers.map((answer, index) => {
                  const letter = String.fromCharCode(65 + index); // A, B, C, D
                  const isSelected = selectedAnswerId === answer.id;
                  const isDimmed = selectedAnswerId !== null && !isSelected;

                  return (
                    <motion.div
                      key={answer.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: isDimmed ? 0.35 : 1,
                        y: 0,
                        scale: isSelected ? 1.02 : 1,
                      }}
                      transition={{ delay: index * 0.08, duration: 0.3 }}
                    >
                      <GlowCard
                        onClick={() => handleAnswer(answer.id)}
                        className={cn(
                          'p-4 md:p-5 flex items-start gap-4',
                          isSelected && 'border-gold/50 bg-gold/[0.08]',
                          isDimmed && 'pointer-events-none'
                        )}
                        glowColor={isSelected ? 'rgba(201, 169, 110, 0.25)' : undefined}
                      >
                        <span
                          className={cn(
                            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-light border transition-colors',
                            isSelected
                              ? 'border-gold text-gold bg-gold/10'
                              : 'border-white/10 text-text-muted'
                          )}
                        >
                          {letter}
                        </span>
                        <span className="text-sm md:text-base font-light leading-relaxed text-text-primary/90">
                          {answer.text[lang]}
                        </span>
                      </GlowCard>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
