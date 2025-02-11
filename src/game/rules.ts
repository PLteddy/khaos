import { ChaosRule } from './type';

export const rules: ChaosRule[] = [
  {
    id: 1,
    name: "Volonté des Moires",
    description: "La carte avec la plus petite valeur gagne ce tour !",
    effect: (playerCard, aiCard) => ({
      playerCard: { ...playerCard, value: 10 - playerCard.value },
      aiCard: { ...aiCard, value: 10 - aiCard.value },
      pointMultiplier: 1
    })
  },
  {
    id: 2,
    name: "Jugement des Enfers",
    description: "Si Hadès est joué, il gagne automatiquement !",
    effect: (playerCard, aiCard) => ({
      playerCard,
      aiCard,
      pointMultiplier: playerCard.name === "Hadès" ? 2 : aiCard.name === "Hadès" ? 0 : 1
    })
  },
  {
    id: 3,
    name: "Bénédiction de Zeus",
    description: "Les dieux gagnent un bonus de +2 !",
    effect: (playerCard, aiCard) => ({
      playerCard: {
        ...playerCard,
        value: playerCard.type === "god" ? playerCard.value + 2 : playerCard.value
      },
      aiCard: {
        ...aiCard,
        value: aiCard.type === "god" ? aiCard.value + 2 : aiCard.value
      },
      pointMultiplier: 1
    })
  }
];

export const getRandomRule = (): ChaosRule => {
  return rules[Math.floor(Math.random() * rules.length)];
};