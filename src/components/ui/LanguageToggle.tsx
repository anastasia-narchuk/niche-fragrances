import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const switchLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <div className="flex items-center gap-1 text-sm font-light tracking-wider">
      <button
        onClick={() => switchLang('ru')}
        className={cn(
          'px-2 py-1 transition-colors',
          currentLang === 'ru'
            ? 'text-gold'
            : 'text-text-muted hover:text-text-secondary'
        )}
      >
        RU
      </button>
      <span className="text-border-subtle">|</span>
      <button
        onClick={() => switchLang('en')}
        className={cn(
          'px-2 py-1 transition-colors',
          currentLang === 'en'
            ? 'text-gold'
            : 'text-text-muted hover:text-text-secondary'
        )}
      >
        EN
      </button>
    </div>
  );
}
