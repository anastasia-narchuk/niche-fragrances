import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '../ui/LanguageToggle';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const showBack = location.pathname !== '/';

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10"
      style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0) 100%)' }}
    >
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            onClick={() => navigate(-1)}
            className="text-text-secondary hover:text-gold transition-colors text-sm font-light tracking-wider"
          >
            &larr; {t('common.back')}
          </button>
        ) : (
          <span className="font-display text-lg tracking-wider text-gold/80">
            SOS
          </span>
        )}
      </div>

      <LanguageToggle />
    </motion.header>
  );
}
