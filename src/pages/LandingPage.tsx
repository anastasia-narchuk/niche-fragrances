import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PageTransition } from '../components/ui/PageTransition';

export function LandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Background ambiance */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.03] blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-aspect-shadow/[0.05] blur-[100px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl">
          {/* Philosophy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-accent text-text-secondary text-lg md:text-xl tracking-wide mb-2 italic"
          >
            {t('landing.philosophy1')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-accent text-gold-light text-lg md:text-xl tracking-wide mb-12 italic"
          >
            {t('landing.philosophy2')}
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="text-gold-gradient">{t('landing.title')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-text-secondary text-base md:text-lg font-light tracking-wide mb-16 max-w-md mx-auto"
          >
            {t('landing.subtitle')}
          </motion.p>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/select')}
            className="relative px-10 py-4 rounded-full border border-gold/40 bg-gold/[0.08] text-gold-light font-accent text-xl tracking-widest uppercase transition-all duration-300 hover:bg-gold/[0.15] hover:border-gold/60 hover:shadow-[0_0_40px_rgba(201,169,110,0.2)] animate-glow-pulse"
          >
            {t('landing.cta')}
          </motion.button>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold/50 to-transparent" />
        </motion.div>
      </div>
    </PageTransition>
  );
}
