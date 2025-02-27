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
    description: "Si Hadès est joué, il gagne +5 points !",
    effect: (playerCard, aiCard) => ({
      playerCard: {
        ...playerCard,
        value: playerCard.name === "Hadès" ? playerCard.value + 5 : playerCard.value
      },
      aiCard: {
        ...aiCard,
        value: aiCard.name === "Hadès" ? aiCard.value + 5 : aiCard.value
      },
      pointMultiplier: 1 // Plus besoin de multiplier les points
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
    id: 5,
    name: "Châtiment de Cronos",
    description: "Les dieux majeurs perdent 5 points !",
    effect: (playerCard, aiCard) => ({
      playerCard: {
        ...playerCard,
        value:
          playerCard.type === "major_god"
            ? Math.max(1, playerCard.value - 5)
            : playerCard.value
      },
      aiCard: {
        ...aiCard,
        value:
          aiCard.type === "major_god"
            ? Math.max(1, aiCard.value - 5)
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
  },
  {
    id: 9,
    name: "Colère d'Arès",
    description: "Si deux cartes du même type s'affrontent, la plus faible gagne !",
    effect: (playerCard, aiCard) => ({
      playerCard,
      aiCard,
      pointMultiplier: playerCard.type === aiCard.type ? -1 : 1
    })
  },
  
  {
    id: 10,
    name: "Ruse d'Hermès",
    description: "Si une carte mortelle est jouée contre un dieu, elle gagne +10 points !",
    effect: (playerCard, aiCard) => ({
      playerCard: {
        ...playerCard,
        value: playerCard.type === "mortal" && aiCard.type === "god" ? playerCard.value + 10 : playerCard.value
      },
      aiCard: {
        ...aiCard,
        value: aiCard.type === "mortal" && playerCard.type === "god" ? aiCard.value + 10 : aiCard.value
      },
      pointMultiplier: 1
    })
  },
  {
    id: 11,
    name: "Épreuve d'Héraclès",
    description: "Les héros gagnent un bonus de +3.",
    effect: (playerCard, aiCard) => ({
      playerCard: { ...playerCard, value: playerCard.type === "hero" ? playerCard.value + 3 : playerCard.value },
      aiCard: { ...aiCard, value: aiCard.type === "hero" ? aiCard.value + 3 : aiCard.value },
      pointMultiplier: 1
    })
  },
  {
    id: 12,
    name: "Vision d'Apollon",
    description: "Les cartes avec un nombre pair de valeur gagnent un bonus de +2.",
    effect: (playerCard, aiCard) => ({
      playerCard: { ...playerCard, value: playerCard.value % 2 === 0 ? playerCard.value + 2 : playerCard.value },
      aiCard: { ...aiCard, value: aiCard.value % 2 === 0 ? aiCard.value + 2 : aiCard.value },
      pointMultiplier: 1
    })
  },
  {
    id: 13,
    name: "Furie de Dionysos",
    description: "Les cartes sont échangées avant le duel !",
    effect: (playerCard, aiCard) => ({ playerCard: aiCard, aiCard: playerCard, pointMultiplier: 1 })
  },
  
];

export const getRandomRule = (): ChaosRule => {
  return rules[Math.floor(Math.random() * rules.length)];
};