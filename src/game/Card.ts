export interface Card {
  id: number;
  name: string;
  type: string; // Ajout du type (dieu, héros, créature, etc.)
  value: number;
  color: number;
}

export const CARD_TYPES = {
  // ⚡ Dieux Suprêmes (Valeur max)
  ZEUS: { name: "Zeus", type: "god", value: 8, color: 0xfbbf24 },
  HADES: { name: "Hadès", type: "god", value: 8, color: 0x374151 },
  POSEIDON: { name: "Poséidon", type: "god", value: 8, color: 0x2563eb },
  HERA: { name: "Héra", type: "god", value: 8, color: 0xd946ef },

  // 🌟 Dieux Olympiens
  ATHENA: { name: "Athéna", type: "god", value: 7, color: 0xfacc15 },
  ARES: { name: "Arès", type: "god", value: 7, color: 0xdc2626 },
  APOLLON: { name: "Apollon", type: "god", value: 7, color: 0xf59e0b },
  ARTEMIS: { name: "Artémis", type: "god", value: 7, color: 0x84cc16 },
  DIONYSOS: { name: "Dionysos", type: "god", value: 7, color: 0x9333ea },
  HERMES: { name: "Hermès", type: "god", value: 7, color: 0x14b8a6 },

  // 🏛️ Héros et Demi-Dieux
  HERACLES: { name: "Héraclès", type: "hero", value: 6, color: 0xf97316 },
  ACHILLE: { name: "Achille", type: "hero", value: 6, color: 0x2563eb },
  ULYSSE: { name: "Ulysse", type: "hero", value: 6, color: 0x7c3aed },
  PERSEE: { name: "Persée", type: "hero", value: 6, color: 0xd946ef },
  THESEE: { name: "Thésée", type: "hero", value: 6, color: 0x10b981 },
  JASON: { name: "Jason", type: "hero", value: 6, color: 0xf59e0b },
  ATALANTE: { name: "Atalante", type: "hero", value: 6, color: 0x84cc16 },

  // 🐉 Créatures Mythologiques
  MINOTAURE: { name: "Minotaure", type: "creature", value: 5, color: 0x9ca3af },
  MEDUSE: { name: "Méduse", type: "creature", value: 5, color: 0x7c3aed },
  CERBERE: { name: "Cerbère", type: "creature", value: 5, color: 0x374151 },
  CHIMERE: { name: "Chimère", type: "creature", value: 5, color: 0xdc2626 },
  SPHINX: { name: "Sphinx", type: "creature", value: 5, color: 0xfacc15 },
  HARPIES: { name: "Harpies", type: "creature", value: 5, color: 0x9333ea },
  GORGONES: { name: "Gorgones", type: "creature", value: 5, color: 0x2563eb },

  // 🛕 Humains et Prêtres (Faibles mais rusés)
  ORACLE: { name: "Oracle de Delphes", type: "human", value: 4, color: 0xfbbf24 },
  PRETRESSE: { name: "Prêtresse d’Aphrodite", type: "human", value: 3, color: 0xd946ef },
  PHILOSOPHE: { name: "Philosophe", type: "human", value: 3, color: 0x6b7280 },
  ROI_AVEUGLE: { name: "Roi Aveugle", type: "human", value: 2, color: 0x059669 },
  MOINE: { name: "Moine", type: "human", value: 2, color: 0xf97316 },
  MARCHAND: { name: "Marchand", type: "human", value: 2, color: 0x10b981 },
  SOLDAT: { name: "Soldat", type: "human", value: 1, color: 0x6b7280 },
  ESCLAVE: { name: "Esclave", type: "human", value: 1, color: 0x6b7280 },
};

export function createDeck(): Card[] {
  // Créer un deck avec 32 cartes uniques (1 copie de chaque)
  return Object.entries(CARD_TYPES).map(([key, type], index) => ({
    id: index + 1,
    ...type
  }));
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
