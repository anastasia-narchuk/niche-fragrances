import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PageTransition } from '../components/ui/PageTransition';
import { GlowCard } from '../components/ui/GlowCard';
import { useQuizContext } from '../context/QuizContext';
import { MBTI_GROUPS, MBTI_LABELS, type MBTIType } from '../types/mbti';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
} as const;

export function MBTISelectPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { dispatch } = useQuizContext();
  const lang = i18n.language as 'ru' | 'en';

  const handleSelect = (type: string) => {
    dispatch({ type: 'SELECT_MBTI', payload: type });
    navigate('/quiz');
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16 px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl md:text-5xl font-bold text-gold-gradient mb-3"
          >
            {t('mbti.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-text-secondary font-light tracking-wide"
          >
            {t('mbti.subtitle')}
          </motion.p>
        </div>

        {/* MBTI Grid by groups */}
        <div className="max-w-4xl mx-auto space-y-10">
          {Object.entries(MBTI_GROUPS).map(([groupKey, group]) => (
            <div key={groupKey}>
              {/* Group label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-text-muted text-xs uppercase tracking-[0.25em] mb-4 text-center font-light"
              >
                {group.label[lang]}
              </motion.p>

              {/* Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
              >
                {group.types.map((type) => (
                  <motion.div key={type} variants={itemVariants}>
                    <GlowCard
                      onClick={() => handleSelect(type)}
                      className="p-5 md:p-6 text-center"
                    >
                      <span className="font-display text-2xl md:text-3xl font-bold text-text-primary block mb-1">
                        {type}
                      </span>
                      <span className="text-text-muted text-xs md:text-sm font-light tracking-wide">
                        {MBTI_LABELS[type as MBTIType][lang]}
                      </span>
                    </GlowCard>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Don't know your type? */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
        >
          <p className="text-text-muted text-sm font-light">
            {t('mbti.dontKnow')}{' '}
            <a
              href="https://www.16personalities.com/free-personality-test"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/70 hover:text-gold underline underline-offset-4 transition-colors"
            >
              {t('mbti.takeTest')}
            </a>
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
