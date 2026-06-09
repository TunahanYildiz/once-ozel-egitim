/**
 * Central program data for all 28 education/therapy programs.
 * Used by both the listing page (/egitimlerimiz) and individual detail pages (/egitimlerimiz/[slug]).
 */

export interface ProgramData {
  slug: string;
  translationKey: string; // Key prefix in messages JSON (e.g., "c1_p1")
  categoryKey: string;    // Category translation key (e.g., "cat1Title")
  categoryId: string;     // Category identifier
}

export const PROGRAMS: ProgramData[] = [
  // ── Dil & Konuşma ──
  { slug: 'dil-ve-konusma-terapisi', translationKey: 'c1_p1', categoryKey: 'cat1Title', categoryId: 'cat1' },
  { slug: 'gecikmis-dil-ve-konusma', translationKey: 'c1_p2', categoryKey: 'cat1Title', categoryId: 'cat1' },
  { slug: 'kekemelik-terapisi', translationKey: 'c1_p3', categoryKey: 'cat1Title', categoryId: 'cat1' },
  { slug: 'artikulasyon-bozukluklari', translationKey: 'c1_p4', categoryKey: 'cat1Title', categoryId: 'cat1' },
  { slug: 'afazi-ve-motor-konusma-bozukluklari', translationKey: 'c1_p5', categoryKey: 'cat1Title', categoryId: 'cat1' },

  // ── Öğrenme & Akademik ──
  { slug: 'ozgul-ogrenme-guclugu', translationKey: 'c2_p1', categoryKey: 'cat2Title', categoryId: 'cat2' },
  { slug: 'diskalkuli', translationKey: 'c2_p2', categoryKey: 'cat2Title', categoryId: 'cat2' },
  { slug: 'disgrafi', translationKey: 'c2_p3', categoryKey: 'cat2Title', categoryId: 'cat2' },
  { slug: 'okula-hazirlik-programlari', translationKey: 'c2_p4', categoryKey: 'cat2Title', categoryId: 'cat2' },
  { slug: 'akademik-destek-egitimleri', translationKey: 'c2_p5', categoryKey: 'cat2Title', categoryId: 'cat2' },

  // ── Nörogelişimsel ──
  { slug: 'otizm-spektrum-bozuklugu', translationKey: 'c3_p1', categoryKey: 'cat3Title', categoryId: 'cat3' },
  { slug: 'dehb-programi', translationKey: 'c3_p2', categoryKey: 'cat3Title', categoryId: 'cat3' },
  { slug: 'down-sendromu', translationKey: 'c3_p3', categoryKey: 'cat3Title', categoryId: 'cat3' },
  { slug: 'asperger-sendromu', translationKey: 'c3_p4', categoryKey: 'cat3Title', categoryId: 'cat3' },
  { slug: 'yaygin-gelisimsel-bozukluklar', translationKey: 'c3_p5', categoryKey: 'cat3Title', categoryId: 'cat3' },

  // ── Terapi & Rehabilitasyon ──
  { slug: 'duyu-butunleme-terapisi', translationKey: 'c4_p1', categoryKey: 'cat4Title', categoryId: 'cat4' },
  { slug: 'ergoterapi', translationKey: 'c4_p2', categoryKey: 'cat4Title', categoryId: 'cat4' },
  { slug: 'aba-terapisi', translationKey: 'c4_p3', categoryKey: 'cat4Title', categoryId: 'cat4' },
  { slug: 'hareket-egitimi', translationKey: 'c4_p4', categoryKey: 'cat4Title', categoryId: 'cat4' },
  { slug: 'fizyoterapi-ve-rehabilitasyon', translationKey: 'c4_p5', categoryKey: 'cat4Title', categoryId: 'cat4' },
  { slug: 'floortime-terapisi', translationKey: 'c4_p6', categoryKey: 'cat4Title', categoryId: 'cat4' },

  // ── Destek Programları ──
  { slug: 'bilissel-gelisim-destek', translationKey: 'c5_p1', categoryKey: 'cat5Title', categoryId: 'cat5' },
  { slug: 'fiziksel-gelisim', translationKey: 'c5_p2', categoryKey: 'cat5Title', categoryId: 'cat5' },
  { slug: 'oyun-terapisi-ve-sosyal-beceri', translationKey: 'c5_p3', categoryKey: 'cat5Title', categoryId: 'cat5' },
  { slug: 'aile-danismanligi', translationKey: 'c5_p4', categoryKey: 'cat5Title', categoryId: 'cat5' },
  { slug: 'kamp-egitimi', translationKey: 'c5_p5', categoryKey: 'cat5Title', categoryId: 'cat5' },
  { slug: 'psikolojik-danismanlik', translationKey: 'c5_p6', categoryKey: 'cat5Title', categoryId: 'cat5' },
  { slug: 'erken-cocukluk-mudahale', translationKey: 'c5_p7', categoryKey: 'cat5Title', categoryId: 'cat5' },
];

export function getProgramBySlug(slug: string): ProgramData | undefined {
  return PROGRAMS.find(p => p.slug === slug);
}

export function getProgramSlugs(): string[] {
  return PROGRAMS.map(p => p.slug);
}
