export interface Perfume {
  id: string;
  name: string;
  brand: string;
  year: number | null;
  concentration: string;
  rating: number;
  ratingCount: number;
  accords: string[];
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  moodTags: string[];
  energy: number;   // 1-10
  warmth: number;    // 1-10
  url: string;
}

export interface MoodMapping {
  accords: Record<string, number>;
  notes: Record<string, number>;
  energy: { min: number; max: number };
  warmth: { min: number; max: number };
}

export type MoodToAccordMap = Record<string, MoodMapping>;

export interface PerfumeProfile {
  accordWeights: Record<string, number>;
  noteWeights: Record<string, number>;
  energyRange: { min: number; max: number };
  warmthRange: { min: number; max: number };
}
