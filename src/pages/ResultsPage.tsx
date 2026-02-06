import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PageTransition } from '../components/ui/PageTransition';
import { PerfumeCard } from '../components/results/PerfumeCard';
import { useQuizContext } from '../context/QuizContext';
import { generateRecommendations } from '../engine/recommender';
import type { Perfume, MoodToAccordMap } from '../types/perfume';
import type { QuizResults } from '../types/results';
import type { Aspect } from '../types/quiz';

// Lazy-load heavy data
import perfumeData from '../data/perfumes-niche.json';
import moodMapData from '../data/mood-to-accord-map.json';

export function ResultsPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'ru' | 'en';
  const { state, dispatch } = useQuizContext();
  const [isCalculating, setIsCalculating] = useState(true);

  // Generate recommendations
  const results: QuizResults | null = useMemo(() => {
    if (!state.selectedMBTI || state.answers.length === 0) return null;

    return generateRecommendations(
      state.selectedMBTI,
      state.answers,
      state.aspectScores,
      perfumeData as Perfume[],
      moodMapData as MoodToAccordMap
    );
  }, [state.selectedMBTI, state.answers, state.aspectScores]);

  useEffect(() => {
    if (!state.selectedMBTI) {
      navigate('/select');
      return;
    }

    // Atmospheric "calculating" delay
    const timer = setTimeout(() => {
      setIsCalculating(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [state.selectedMBTI, navigate]);

  const handleRetake = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  const aspectColors: Record<Aspect, string> = {
    shadow: '#6B2D5B',
    sanctuary: '#2D4B3B',
    armor: '#4B3D2D',
  };

  const aspectIcons: Record<Aspect, string> = {
    shadow: '🌑',
    sanctuary: '🏛',
    armor: '🛡',
  };

  // Calculating state
  if (isCalculating) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Pulsing orb */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-24 h-24 rounded-full bg-gold/20 mx-auto mb-8 blur-sm"
            />
            <p className="font-accent text-xl md:text-2xl text-text-secondary italic tracking-wide">
              {t('calculating.line1')}
            </p>
            <p className="font-accent text-xl md:text-2xl text-gold-light italic tracking-wide">
              {t('calculating.line2')}
            </p>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-16"
          >
            <p className="text-text-muted text-sm uppercase tracking-[0.3em] mb-3 font-light">
              {state.selectedMBTI}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gold-gradient mb-4">
              {t('results.title')}
            </h1>
            <p className="text-text-secondary font-light">
              {t('results.subtitle')}
            </p>
          </motion.div>

          {/* Aspect Sections */}
          {results.aspects.map((aspectResult, sectionIndex) => {
            const color = aspectColors[aspectResult.aspect];

            return (
              <motion.section
                key={aspectResult.aspect}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + sectionIndex * 0.3 }}
                className="mb-16"
              >
                {/* Aspect Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{aspectIcons[aspectResult.aspect]}</span>
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
                          {aspectResult.name[lang]}
                        </h2>
                        {sectionIndex === 0 && (
                          <span className="text-gold text-xs uppercase tracking-widest font-light px-2 py-0.5 border border-gold/30 rounded-full">
                            {t('results.dominant')}
                          </span>
                        )}
                      </div>
                      <p className="text-text-muted text-xs uppercase tracking-[0.2em] mt-0.5">
                        {t(`results.aspects.${aspectResult.aspect}`)}
                      </p>
                    </div>
                  </div>

                  {/* Aspect Description */}
                  <p className="text-text-secondary font-light text-sm md:text-base leading-relaxed mt-3 max-w-2xl">
                    {aspectResult.description[lang]}
                  </p>

                  {/* Score bar */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${color}, var(--color-gold))` }}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(aspectResult.score / Math.max(...results.aspects.map((a) => a.score), 1)) * 100}%`,
                        }}
                        transition={{ delay: 0.8 + sectionIndex * 0.3, duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="text-text-muted text-xs font-light whitespace-nowrap">
                      {aspectResult.score}/{results.aspects.reduce((sum, a) => sum + a.score, 0)}
                    </span>
                  </div>
                </div>

                {/* Perfume Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aspectResult.recommendations.map((rec, recIndex) => (
                    <PerfumeCard
                      key={rec.perfume.id}
                      recommendation={rec}
                      index={recIndex}
                      aspectColor={color}
                    />
                  ))}
                </div>

                {/* Divider between sections */}
                {sectionIndex < results.aspects.length - 1 && (
                  <div className="mt-12 flex justify-center">
                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                  </div>
                )}
              </motion.section>
            );
          })}

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="text-center space-y-4 mt-8"
          >
            <button
              onClick={handleRetake}
              className="px-8 py-3 rounded-full border border-gold/30 text-gold font-accent text-lg tracking-wider hover:bg-gold/10 transition-all duration-300"
            >
              {t('results.retake')}
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
