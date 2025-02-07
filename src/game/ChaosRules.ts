import { Card } from './Card';

export interface ChaosRule {
  name: string;
  description: string;
  apply: (playerCard: Card, aiCard: Card) => { playerCard: Card; aiCard: Card; pointMultiplier: number };
}

export const CHAOS_RULES: ChaosRule[] = [
  {
    name: "Volonté des Moires",
    description: "Les fileuses du destin ont parlé… la carte la plus faible l'emporte !",
    apply: (playerCard: Card, aiCard: Card) => ({
      playerCard: { ...playerCard, value: 6 - playerCard.value },
      aiCard: { ...aiCard, value: 6 - aiCard.value },
      pointMultiplier: 1
    })
  },
  {
    name: "Tromperie de Prométhée",
    description: "Un héros rusé peut vaincre un dieu… mais une seule fois !",
    apply: (playerCard: Card, aiCard: Card) => ({
      playerCard,
      aiCard,
      pointMultiplier: playerCard.type === "hero" && aiCard.type === "god" ? 2 : 1
    })
  },
  {
    name: "Jugement des Enfers",
    description: "Si Hadès est en jeu, il remporte automatiquement ce tour !",
    apply: (playerCard: Card, aiCard: Card) => ({
      playerCard,
      aiCard,
      pointMultiplier: playerCard.name === "Hadès" ? 99 : aiCard.name === "Hadès" ? 0 : 1
    })
  },
  {
    name: "Bénédiction de Zeus",
    description: "Les dieux suprêmes obtiennent un boost de puissance !",
    apply: (playerCard: Card, aiCard: Card) => ({
      playerCard: { ...playerCard, value: playerCard.type === "god" ? playerCard.value + 2 : playerCard.value },
      aiCard: { ...aiCard, value: aiCard.type === "god" ? aiCard.value + 2 : aiCard.value },
      pointMultiplier: 1
    })
  },
  {
    name: "Colère d'Arès",
    description: "Les héros et guerriers gagnent un bonus de force !",
    apply: (playerCard: Card, aiCard: Card) => ({
      playerCard: { ...playerCard, value: playerCard.type === "hero" || playerCard.name === "Soldat" ? playerCard.value + 1 : playerCard.value },
      aiCard: { ...aiCard, value: aiCard.type === "hero" || aiCard.name === "Soldat" ? aiCard.value + 1 : aiCard.value },
      pointMultiplier: 1
    })
  },
  {
    name: "Ruse d'Hermès",
    description: "Les cartes sont échangées au dernier moment !",
    apply: (playerCard: Card, aiCard: Card) => ({
      playerCard: aiCard,
      aiCard: playerCard,
      pointMultiplier: 1
    })
  },
  {
    name: "Inversion des forces",
    description: "Les valeurs des cartes sont inversées !",
    apply: (playerCard: Card, aiCard: Card) => ({
      playerCard: { ...playerCard, value: 6 - playerCard.value },
      aiCard: { ...aiCard, value: 6 - aiCard.value },
      pointMultiplier: 1
    })
  },
  {
    name: "Double points",
    description: "Les points sont doublés ce tour-ci !",
    apply: (playerCard: Card, aiCard: Card) => ({
      playerCard,
      aiCard,
      pointMultiplier: 2
    })
  },
  {
    name: "Égalité parfaite",
    description: "Toutes les cartes ont la même valeur !",
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