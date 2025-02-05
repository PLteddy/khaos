export interface Card {
  id: number;
  name: string;
  value: number;
  color: number;
}

export const CARD_TYPES = {
  EMPEROR: { name: 'Empereur', value: 8, color: 0xf59e0b },
  DRAGON: { name: 'Dragon', value: 7, color: 0xdc2626 },
  QUEEN: { name: 'Reine', value: 6, color: 0xd946ef },
  KNIGHT: { name: 'Chevalier', value: 5, color: 0x2563eb },
  MERCHANT: { name: 'Marchand', value: 4, color: 0x059669 },
  WIZARD: { name: 'Sorcier', value: 3, color: 0x7c3aed },
  MONK: { name: 'Moine', value: 2, color: 0xf97316 },
  PEASANT: { name: 'Paysan', value: 1, color: 0x6b7280 }
};

export function createDeck(): Card[] {
  // Créer 3 copies de chaque carte
  return Object.entries(CARD_TYPES).flatMap(([key, type], typeIndex) => 
    Array.from({ length: 3 }, (_, copyIndex) => ({
      id: typeIndex * 3 + copyIndex + 1,
      ...type
    }))
  );
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}