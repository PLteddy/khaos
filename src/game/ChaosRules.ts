import { Card } from './Card';

export interface ChaosRule {
  name: string;
  description: string;
  apply: (playerCard: Card, aiCard: Card) => { playerCard: Card; aiCard: Card; pointMultiplier: number };
}

export const CHAOS_RULES: ChaosRule[] = [
  {
    name: 'Inversion des forces',
    description: 'Les valeurs des cartes sont inversées !',
    apply: (playerCard: Card, aiCard: Card) => ({
      playerCard: { ...playerCard, value: 6 - playerCard.value },
      aiCard: { ...aiCard, value: 6 - aiCard.value },
      pointMultiplier: 1
    })
  },
  {
    name: 'Double points',
    description: 'Les points sont doublés ce tour-ci !',
    apply: (playerCard: Card, aiCard: Card) => ({
      playerCard,
      aiCard,
      pointMultiplier: 2
    })
  },
  {
    name: 'Égalité parfaite',
    description: 'Toutes les cartes ont la même valeur !',
    apply: (playerCard: Card, aiCard: Card) => ({
      playerCard: { ...playerCard, value: 3 },
      aiCard: { ...aiCard, value: 3 },
      pointMultiplier: 1
    })
  }
];

export function getRandomChaosRule(): ChaosRule {
  return CHAOS_RULES[Math.floor(Math.random() * CHAOS_RULES.length)];
}