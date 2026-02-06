import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Recommendation } from '../../types/results';

interface PerfumeCardProps {
  recommendation: Recommendation;
  index: number;
  aspectColor: string;
}

export function PerfumeCard({ recommendation, index, aspectColor }: PerfumeCardProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'ru' | 'en';
  const { perfume, matchScore, matchReason } = recommendation;

  const allNotes = [
    ...perfume.notes.top.map((n) => ({ note: n, layer: 'top' as const })),
    ...perfume.notes.middle.map((n) => ({ note: n, layer: 'middle' as const })),
    ...perfume.notes.base.map((n) => ({ note: n, layer: 'base' as const })),
  ];

  const layerLabels = {
    top: { ru: 'верх', en: 'top' },
    middle: { ru: 'сердце', en: 'heart' },
    base: { ru: 'база', en: 'base' },
  };

  return (
    <motion.a
      href={perfume.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
      className="block glass rounded-2xl p-5 md:p-6 hover:bg-white/[0.06] transition-all duration-300 group"
    >
      {/* Header: Name + Brand */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-lg md:text-xl font-semibold text-text-primary truncate group-hover:text-gold transition-colors">
            {perfume.name}
          </h4>
          <p className="text-text-muted text-sm font-light">
            {perfume.brand}
            {perfume.year && ` · ${perfume.year}`}
            {perfume.concentration && ` · ${perfume.concentration}`}
          </p>
        </div>
        {/* Match percentage */}
        <div className="flex-shrink-0 ml-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-light border"
            style={{
              borderColor: aspectColor,
              color: aspectColor,
              background: `${aspectColor}15`,
            }}
          >
            {Math.round(matchScore * 100)}%
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-xs ${i < Math.round(perfume.rating) ? 'text-gold' : 'text-white/10'}`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-text-muted text-xs">{perfume.rating.toFixed(1)}</span>
      </div>

      {/* Note Pyramid */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1.5">
          {allNotes.slice(0, 8).map(({ note, layer }) => (
            <span
              key={`${layer}-${note}`}
              className="px-2 py-0.5 rounded-full text-[10px] md:text-xs font-light border border-white/[0.08] text-text-muted"
              title={layerLabels[layer][lang]}
            >
              <span className="opacity-50 mr-0.5">
                {layer === 'top' ? '△' : layer === 'middle' ? '◇' : '▽'}
              </span>
              {note}
            </span>
          ))}
          {allNotes.length > 8 && (
            <span className="px-2 py-0.5 text-[10px] text-text-muted">
              +{allNotes.length - 8}
            </span>
          )}
        </div>
      </div>

      {/* Match Reason */}
      <p className="text-text-secondary text-xs md:text-sm font-light italic leading-relaxed">
        {matchReason[lang]}
      </p>

      {/* External link hint */}
      <div className="mt-3 flex items-center gap-1 text-text-muted text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        <span>{lang === 'ru' ? 'подробнее' : 'learn more'}</span>
        <span>→</span>
      </div>
    </motion.a>
  );
}
