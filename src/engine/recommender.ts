import type { Aspect, SelectedAnswer } from '../types/quiz';
import type { Perfume, MoodToAccordMap, PerfumeProfile } from '../types/perfume';
import type { Recommendation, AspectResult, QuizResults } from '../types/results';
import { ASPECT_NAMES } from './aspect-names';

// ─── Scoring weights ──────────────────────────────
const WEIGHTS = {
  accordMatch: 0.40,
  noteMatch: 0.35,
  moodTagMatch: 0.15,
  energyWarmthFit: 0.10,
};

const NOTE_LAYER_WEIGHTS = {
  top: 1.0,
  middle: 1.2,
  base: 1.5,
};

// ─── Build perfume profile from mood tags ─────────
function buildPerfumeProfile(
  moodTags: Record<string, number>,
  moodMap: MoodToAccordMap
): PerfumeProfile {
  const accordWeights: Record<string, number> = {};
  const noteWeights: Record<string, number> = {};
  let energySum = 0;
  let warmthSum = 0;
  let energyCount = 0;
  let warmthCount = 0;

  for (const [tag, weight] of Object.entries(moodTags)) {
    const normalizedTag = tag.toLowerCase().trim();

    // Try exact match first, then fuzzy match
    const mapping = moodMap[normalizedTag] || findFuzzyMapping(normalizedTag, moodMap);
    if (!mapping) continue;

    // Accumulate accord weights
    for (const [accord, accordWeight] of Object.entries(mapping.accords)) {
      accordWeights[accord] = (accordWeights[accord] || 0) + accordWeight * weight;
    }

    // Accumulate note weights
    for (const [note, noteWeight] of Object.entries(mapping.notes)) {
      noteWeights[note] = (noteWeights[note] || 0) + noteWeight * weight;
    }

    // Accumulate energy/warmth
    const midEnergy = (mapping.energy.min + mapping.energy.max) / 2;
    const midWarmth = (mapping.warmth.min + mapping.warmth.max) / 2;
    energySum += midEnergy * weight;
    warmthSum += midWarmth * weight;
    energyCount += weight;
    warmthCount += weight;
  }

  // Normalize
  const maxAccord = Math.max(...Object.values(accordWeights), 1);
  const maxNote = Math.max(...Object.values(noteWeights), 1);

  for (const key of Object.keys(accordWeights)) {
    accordWeights[key] /= maxAccord;
  }
  for (const key of Object.keys(noteWeights)) {
    noteWeights[key] /= maxNote;
  }

  const avgEnergy = energyCount > 0 ? energySum / energyCount : 5;
  const avgWarmth = warmthCount > 0 ? warmthSum / warmthCount : 5;

  return {
    accordWeights,
    noteWeights,
    energyRange: { min: Math.max(1, avgEnergy - 2), max: Math.min(10, avgEnergy + 2) },
    warmthRange: { min: Math.max(1, avgWarmth - 2), max: Math.min(10, avgWarmth + 2) },
  };
}

// ─── Fuzzy mood tag matching ──────────────────────
function findFuzzyMapping(
  tag: string,
  moodMap: MoodToAccordMap
): MoodToAccordMap[string] | null {
  // Try partial match: look for tags that contain the search or vice versa
  const keys = Object.keys(moodMap);

  // Exact word match in compound tags
  for (const key of keys) {
    if (key.includes(tag) || tag.includes(key)) {
      return moodMap[key];
    }
  }

  // Try matching individual words
  const tagWords = tag.split(/[\s-]+/);
  for (const word of tagWords) {
    if (word.length < 3) continue;
    for (const key of keys) {
      if (key === word || key.startsWith(word) || word.startsWith(key)) {
        return moodMap[key];
      }
    }
  }

  return null;
}

// ─── Score a single perfume against a profile ─────
function scorePerfume(perfume: Perfume, profile: PerfumeProfile, moodTags: Record<string, number>): number {
  // 1. Accord match (40%)
  let accordScore = 0;
  let accordTotal = 0;
  for (const [accord, weight] of Object.entries(profile.accordWeights)) {
    accordTotal += weight;
    if (perfume.accords.some((a) => a.toLowerCase() === accord.toLowerCase())) {
      accordScore += weight;
    }
  }
  const accordMatch = accordTotal > 0 ? accordScore / accordTotal : 0;

  // 2. Note match (35%)
  let noteScore = 0;
  let noteTotal = 0;
  const allPerfumeNotes: Record<string, number> = {};

  for (const [layer, layerWeight] of Object.entries(NOTE_LAYER_WEIGHTS) as [keyof typeof NOTE_LAYER_WEIGHTS, number][]) {
    for (const note of perfume.notes[layer]) {
      allPerfumeNotes[note.toLowerCase()] = layerWeight;
    }
  }

  for (const [note, weight] of Object.entries(profile.noteWeights)) {
    noteTotal += weight;
    const perfumeNoteWeight = allPerfumeNotes[note.toLowerCase()];
    if (perfumeNoteWeight) {
      noteScore += weight * perfumeNoteWeight;
    }
  }
  const noteMatch = noteTotal > 0 ? Math.min(noteScore / noteTotal, 1) : 0;

  // 3. Mood tag match (15%)
  let moodScore = 0;
  let moodTotal = 0;
  for (const [tag, weight] of Object.entries(moodTags)) {
    moodTotal += weight;
    const normalizedTag = tag.toLowerCase().trim();
    if (perfume.moodTags.some((t) => {
      const normalized = t.toLowerCase().trim();
      return normalized === normalizedTag ||
        normalized.includes(normalizedTag) ||
        normalizedTag.includes(normalized);
    })) {
      moodScore += weight;
    }
  }
  const moodMatch = moodTotal > 0 ? moodScore / moodTotal : 0;

  // 4. Energy/Warmth fit (10%)
  const energyFit = 1 - Math.min(
    Math.abs(perfume.energy - (profile.energyRange.min + profile.energyRange.max) / 2) / 5,
    1
  );
  const warmthFit = 1 - Math.min(
    Math.abs(perfume.warmth - (profile.warmthRange.min + profile.warmthRange.max) / 2) / 5,
    1
  );
  const ewFit = (energyFit + warmthFit) / 2;

  // 5. Rating bonus (tiebreaker)
  const ratingBonus = (perfume.rating / 5) * 0.05;

  return (
    accordMatch * WEIGHTS.accordMatch +
    noteMatch * WEIGHTS.noteMatch +
    moodMatch * WEIGHTS.moodTagMatch +
    ewFit * WEIGHTS.energyWarmthFit +
    ratingBonus
  );
}

// ─── Collect mood tags per aspect ─────────────────
function collectAspectMoodTags(
  answers: SelectedAnswer[],
  targetAspect: Aspect
): Record<string, number> {
  const tags: Record<string, number> = {};

  for (const answer of answers) {
    const weight = answer.aspect === targetAspect ? 1.0 : 0.3;
    for (const tag of answer.moodTags) {
      tags[tag] = (tags[tag] || 0) + weight;
    }
  }

  return tags;
}

// ─── Generate match reason ────────────────────────
function generateMatchReason(
  _perfume: Perfume,
  aspect: Aspect,
  matchedAccords: string[],
  matchedNotes: string[]
): { ru: string; en: string } {
  const aspectNamesRu: Record<Aspect, string> = {
    shadow: 'теневого я',
    sanctuary: 'внутреннего святилища',
    armor: 'социальных доспехов',
  };
  const aspectNamesEn: Record<Aspect, string> = {
    shadow: 'shadow self',
    sanctuary: 'inner sanctuary',
    armor: 'social armor',
  };

  const topAccords = matchedAccords.slice(0, 2);
  const topNotes = matchedNotes.slice(0, 2);

  const elementsRu = [...topAccords, ...topNotes].filter(Boolean).join(', ');
  const elementsEn = [...topAccords, ...topNotes].filter(Boolean).join(', ');

  if (elementsRu) {
    return {
      ru: `Резонирует с энергией вашего ${aspectNamesRu[aspect]} через ${elementsRu}`,
      en: `Resonates with the energy of your ${aspectNamesEn[aspect]} through ${elementsEn}`,
    };
  }

  return {
    ru: `Отражает глубинный характер вашего ${aspectNamesRu[aspect]}`,
    en: `Reflects the deep character of your ${aspectNamesEn[aspect]}`,
  };
}

// ─── Main recommendation function ─────────────────
export function generateRecommendations(
  mbtiType: string,
  answers: SelectedAnswer[],
  aspectScores: Record<Aspect, number>,
  perfumes: Perfume[],
  moodMap: MoodToAccordMap
): QuizResults {
  // 1. Rank aspects
  const sortedAspects = (['shadow', 'sanctuary', 'armor'] as const)
    .map((aspect) => ({
      aspect,
      score: aspectScores[aspect],
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const priority = { shadow: 3, sanctuary: 2, armor: 1 };
      return priority[b.aspect] - priority[a.aspect];
    });

  const usedPerfumeIds = new Set<string>();
  const brandCounts: Record<string, number> = {};

  // 2. For each aspect, get recommendations
  const aspects: AspectResult[] = sortedAspects.map(({ aspect, score }) => {
    // Collect mood tags for this aspect
    const aspectMoodTags = collectAspectMoodTags(answers, aspect);

    // Build perfume profile
    const profile = buildPerfumeProfile(aspectMoodTags, moodMap);

    // Score all perfumes
    const scored = perfumes
      .filter((p) => !usedPerfumeIds.has(p.id))
      .map((perfume) => ({
        perfume,
        score: scorePerfume(perfume, profile, aspectMoodTags),
      }))
      .sort((a, b) => b.score - a.score);

    // Pick top 3 with brand diversity
    const recommendations: Recommendation[] = [];
    for (const { perfume, score: matchScore } of scored) {
      if (recommendations.length >= 3) break;

      // Max 2 perfumes per brand across ALL aspects
      const brandCount = brandCounts[perfume.brand] || 0;
      if (brandCount >= 2) continue;

      // Find matched accords and notes for reason generation
      const matchedAccords = Object.keys(profile.accordWeights)
        .filter((a) => perfume.accords.some((pa) => pa.toLowerCase() === a.toLowerCase()))
        .sort((a, b) => (profile.accordWeights[b] || 0) - (profile.accordWeights[a] || 0));

      const allNotes = [...perfume.notes.base, ...perfume.notes.middle, ...perfume.notes.top];
      const matchedNotes = Object.keys(profile.noteWeights)
        .filter((n) => allNotes.some((pn) => pn.toLowerCase() === n.toLowerCase()))
        .sort((a, b) => (profile.noteWeights[b] || 0) - (profile.noteWeights[a] || 0));

      const matchReason = generateMatchReason(perfume, aspect, matchedAccords, matchedNotes);

      recommendations.push({
        perfume,
        matchScore,
        matchReason,
      });

      usedPerfumeIds.add(perfume.id);
      brandCounts[perfume.brand] = brandCount + 1;
    }

    // Get aspect names
    const aspectName = ASPECT_NAMES[mbtiType]?.[aspect] || {
      name: {
        ru: aspect === 'shadow' ? 'Теневое Я' : aspect === 'sanctuary' ? 'Святилище' : 'Доспехи',
        en: aspect === 'shadow' ? 'Shadow Self' : aspect === 'sanctuary' ? 'Sanctuary' : 'Social Armor',
      },
      description: {
        ru: aspect === 'shadow'
          ? 'Скрытая грань вашей личности — то, что вы прячете от мира'
          : aspect === 'sanctuary'
            ? 'Ваше безопасное внутреннее пространство — место покоя и исцеления'
            : 'Ваша парфюмерная подпись для мира — уверенность и характер',
        en: aspect === 'shadow'
          ? 'The hidden facet of your personality — what you conceal from the world'
          : aspect === 'sanctuary'
            ? 'Your safe inner space — a place of peace and healing'
            : 'Your olfactory signature for the world — confidence and character',
      },
    };

    return {
      aspect,
      name: aspectName.name,
      description: aspectName.description,
      score,
      recommendations,
    };
  });

  return {
    mbtiType,
    aspects,
  };
}
