import type { Aspect } from './quiz';

export const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
] as const;

export type MBTIType = typeof MBTI_TYPES[number];

export interface AspectInfo {
  name: { ru: string; en: string };
  description: { ru: string; en: string };
}

export type MBTIAspects = Record<Aspect, AspectInfo>;
export type MBTIAspectsMap = Record<MBTIType, MBTIAspects>;

// Temperament groups for MBTI grid
export const MBTI_GROUPS = {
  NT: { label: { ru: 'Аналитики', en: 'Analysts' }, types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'] },
  NF: { label: { ru: 'Дипломаты', en: 'Diplomats' }, types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] },
  SJ: { label: { ru: 'Стражи', en: 'Sentinels' }, types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'] },
  SP: { label: { ru: 'Искатели', en: 'Explorers' }, types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'] },
} as const;

// Short MBTI type labels
export const MBTI_LABELS: Record<MBTIType, { ru: string; en: string }> = {
  INTJ: { ru: 'Стратег', en: 'Architect' },
  INTP: { ru: 'Учёный', en: 'Logician' },
  ENTJ: { ru: 'Командир', en: 'Commander' },
  ENTP: { ru: 'Полемист', en: 'Debater' },
  INFJ: { ru: 'Провидец', en: 'Advocate' },
  INFP: { ru: 'Посредник', en: 'Mediator' },
  ENFJ: { ru: 'Наставник', en: 'Protagonist' },
  ENFP: { ru: 'Борец', en: 'Campaigner' },
  ISTJ: { ru: 'Инспектор', en: 'Logistician' },
  ISFJ: { ru: 'Защитник', en: 'Defender' },
  ESTJ: { ru: 'Руководитель', en: 'Executive' },
  ESFJ: { ru: 'Консул', en: 'Consul' },
  ISTP: { ru: 'Виртуоз', en: 'Virtuoso' },
  ISFP: { ru: 'Артист', en: 'Adventurer' },
  ESTP: { ru: 'Делец', en: 'Entrepreneur' },
  ESFP: { ru: 'Развлекатель', en: 'Entertainer' },
};
