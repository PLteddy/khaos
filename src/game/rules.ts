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
  },
  {
    id: 4,
    name: "Tromperie de Prométhée",
    description: "Un héros peut battre un dieu une seule fois !",
    effect: (playerCard, aiCard) => ({
      playerCard,
      aiCard,
      pointMultiplier:
        playerCard.type === "hero" && aiCard.type === "god"
          ? 2
          : aiCard.type === "hero" && playerCard.type === "god"
          ? 0.5
          : 1
    })
  },
  {
    id: 5,
    name: "Châtiment de Cronos",
    description: "Les dieux majeurs perdent 3 points !",
    effect: (playerCard, aiCard) => ({
      playerCard: {
        ...playerCard,
        value:
          playerCard.type === "major_god"
            ? Math.max(1, playerCard.value - 3)
            : playerCard.value
      },
      aiCard: {
        ...aiCard,
        value:
          aiCard.type === "major_god"
            ? Math.max(1, aiCard.value - 3)
            : aiCard.value
      },
      pointMultiplier: 1
    })
  },
  {
    id: 6,
    name: "Chaos de Nyx",
    description: "Les valeurs des cartes sont inversées !",
    effect: (playerCard, aiCard) => ({
      playerCard: { ...playerCard, value: 23 - playerCard.value },
      aiCard: { ...aiCard, value: 23 - aiCard.value },
      pointMultiplier: 1
    })
  },
  {
    id: 7,
    name: "Jugement d’Hadès",
    description: "Les morts (créatures et dieux des enfers) gagnent +2 !",
    effect: (playerCard, aiCard) => ({
      playerCard: {
        ...playerCard,
        value:
          ["creature", "major_god"].includes(playerCard.type) &&
          playerCard.name === "Hadès"
            ? playerCard.value + 2
            : playerCard.value
      },
      aiCard: {
        ...aiCard,
        value:
          ["creature", "major_god"].includes(aiCard.type) &&
          aiCard.name === "Hadès"
            ? aiCard.value + 2
            : aiCard.value
      },
      pointMultiplier: 1
    })
  },
  {
    id: 8,
    name: "Colère de Poséidon",
    description: "Les cartes mortelles et héros perdent -2 !",
    effect: (playerCard, aiCard) => ({
      playerCard: {
        ...playerCard,
        value:
          ["mortal", "hero"].includes(playerCard.type)
            ? Math.max(1, playerCard.value - 2)
            : playerCard.value
      },
      aiCard: {
        ...aiCard,
        value:
          ["mortal", "hero"].includes(aiCard.type)
            ? Math.max(1, aiCard.value - 2)
            : aiCard.value
      },
      pointMultiplier: 1
    })
  }
  
];

export const getRandomRule = (): ChaosRule => {
  return rules[Math.floor(Math.random() * rules.length)];
};