import { Card } from './type';
const Oracle = "./cartes/oracle.png";
const Zeus = "./cartes/zeus.png";
const Ulysse = "./cartes/ulysse.png";
const Philosophe = "./cartes/philosophe.png";
const Roi = "./cartes/kingt.png";
const Marchand = "./cartes/mercantt.png";
const Soldat = "./cartes/soldat.png";
const Slave = "./cartes/slave.png";
const Minotaure = "./cartes/minotaure.png";
const Meduse = "./cartes/meduse.png";
const Cerbere = "./cartes/cerbere.png";
const Harpie = "./cartes/harpie.png";
const Heracles = "./cartes/heracles.png";
const Achille = "./cartes/achille.png";
const Thesee = "./cartes/thésée.png";
const Artemis = "./cartes/artemis.png";
const Apollon = "./cartes/apollon.png";
const Athena = "./cartes/athena.png";
const Hermes = "./cartes/hermes.png";
const Hera = "./cartes/hera.png";
const Hades = "./cartes/hades.png";
const Poseidon = "./cartes/poseidon.png";
// Compare this snippet from src/game/store.ts:


interface CardType {
  name: string;
  type: string;
  value: number;
  color: string;
  image: string;
}

interface Opponent {
  card: Card;
  description: string;
}

export const CARD_TYPES: { [key: string]: CardType } = {
  // Niveau 1 - Mortels
  ORACLE: { name: "Oracle de Delphes", type: "mortal", value: 6, color: "#9333ea",
    image: Oracle
   },
  PHILOSOPHE: { name: "Philosophe", type: "mortal", value: 5, color: "#14b8a6",
    image: Philosophe
   },
  ROI_AVEUGLE: { name: "Roi Aveugle", type: "mortal", value: 4, color: "#facc15",
    image: Roi
   },
  MARCHAND: { name: "Marchand", type: "mortal", value: 3, color: "#f59e0b",
    image: Marchand
   },
  SOLDAT: { name: "Soldat", type: "mortal", value: 2, color: "#6b7280",
    image: Soldat
   },
  ESCLAVE: { name: "Esclave", type: "mortal", value: 1, color: "#9ca3af",
    image: Slave
   },

  // Niveau 2 - Créatures
  MINOTAURE: { name: "Minotaur", type: "creature", value: 10, color: "#9ca3af",
    image: Minotaure
   },
  MEDUSE: { name: "Meduse", type: "creature", value: 9, color: "#7c3aed",
    image: Meduse
   },
  CERBERE: { name: "Cerbere", type: "creature", value: 8, color: "#374151",
    image: Cerbere
   },
  HARPIES: { name: "Harpies", type: "creature", value: 7, color: "#9333ea",
    image: Harpie
   },


  // Niveau 3 - Héros
  HERACLES: { name: "Heracles", type: "hero", value: 14, color: "#f97316",
    image: Heracles
   },
  ACHILLE: { name: "Achille", type: "hero", value: 13, color: "#2563eb",
    image: Achille
   },
  ULYSSE: { name: "Odysseus", type: "hero", value: 12, color: "#7c3aed",
    image: Ulysse
   },
  THESEE: { name: "Theseus", type: "hero", value: 11, color: "#10b981",
    image: Thesee
   },


  // Niveau 4 - Dieux Mineurs
  ATHENA: { name: "Athena", type: "god", value: 18, color: "#facc15",
    image: Athena
   },
  APOLLON: { name: "Apollo", type: "god", value: 17, color: "#f59e0b",
    image: Apollon
   },
  ARTEMIS: { name: "Artemis", type: "god", value: 16, color: "#84cc16",
    image: Artemis
   },
  HERMES: { name: "Hermes", type: "god", value: 15, color: "#14b8a6",
    image: Hermes
   },

  // Niveau 5 - Dieux Majeurs
  HADES: { name: "Hades", type: "major_god", value: 21, color: "#374151",
    image: Hades
   },
  POSEIDON: { name: "Poseidon", type: "major_god", value: 20, color: "#2563eb",
    image: Poseidon
   },
  HERA: { name: "Hera", type: "major_god", value: 19, color: "#d946ef",
    image: Hera
   },

  // Niveau 6 - Boss Final
  ZEUS: { name: "Zeus", type: "boss", value: 22, color: "#fbbf24",
    image: Zeus
   }
} as const;

// Fonction pour obtenir un deck initial aléatoire
export function getInitialDeck(): Card[] {
  const allCards = createDeck().filter(card => card.name !== "Zeus");
  return shuffleDeck(allCards).slice(0, 3);
}

// Fonction pour obtenir les adversaires par niveau
export function getOpponentsByLevel(level: number): Opponent[] {
  const opponents: { [key: number]: Opponent[] } = {
    1: [ // Mortels
      { card: { id: 100, ...CARD_TYPES.ORACLE }, description: "Predit l'avenir, influence les règles de chaos" },
      { card: { id: 99, ...CARD_TYPES.PHILOSOPHE }, description: "Gagne face à la violence brute par la logique" },
      { card: { id: 98, ...CARD_TYPES.ROI_AVEUGLE }, description: "Possède une sagesse cachee" },
      { card: { id: 97, ...CARD_TYPES.MARCHAND }, description: "Peut negocier sa survie" },
      { card: { id: 96, ...CARD_TYPES.SOLDAT }, description: "Un simple guerrier, sans pouvoir particulier" },
      { card: { id: 95, ...CARD_TYPES.ESCLAVE }, description: "Le plus faible… mais peut surprendre avec une règle de chaos" }
    ],
    2: [ // Créatures
      { card: { id: 94, ...CARD_TYPES.MINOTAURE }, description: "Monstre brutal du labyrinthe" },
      { card: { id: 93, ...CARD_TYPES.MEDUSE }, description: "Transforme en pierre ceux qui la regardent" },
      { card: { id: 92, ...CARD_TYPES.CERBERE }, description: "Gardien des Enfers, 3 têtes" },
      { card: { id: 91, ...CARD_TYPES.HARPIES }, description: "Demons ailes, voleurs rapides" },
    ],
    3: [ // Héros
      { card: { id: 90, ...CARD_TYPES.HERACLES }, description: "Le plus grand heros, force colossale" },
      { card: { id: 89, ...CARD_TYPES.ACHILLE }, description: "Guerrier invincible sauf au talon" },
      { card: { id: 88, ...CARD_TYPES.ULYSSE }, description: "Maître de la ruse et de la strategie" },
      { card: { id: 87, ...CARD_TYPES.THESEE }, description: "Vainqueur du Minotaure" },
    ],
    4: [ // Dieux Mineurs
      { card: { id: 86, ...CARD_TYPES.ATHENA }, description: "Deesse de la sagesse et de la guerre stratégique" },
      { card: { id: 85, ...CARD_TYPES.APOLLON }, description: "Dieu de la lumière et des arts" },
      { card: { id: 84, ...CARD_TYPES.ARTEMIS }, description: "Deesse de la chasse et de la nature" },
      { card: { id: 83, ...CARD_TYPES.HERMES }, description: "Messager des dieux, maître des ruses" }
    ],
    5: [ // Dieux Majeurs
      { card: { id: 82, ...CARD_TYPES.HADES }, description: "Dieu des Enfers" },
      { card: { id: 81, ...CARD_TYPES.POSEIDON }, description: "Dieu des oceans" },
      { card: { id: 80, ...CARD_TYPES.HERA }, description: "Deesse du mariage et reine des dieux" }
    ],
    6: [ // Boss Final
      { card: { id: 79, ...CARD_TYPES.ZEUS }, description: "Dieu du ciel et de la foudre, roi des dieux" }
    ]
  };

  const levelOpponents = opponents[level as keyof typeof opponents] || [];
  // Mélanger et prendre 3 adversaires aléatoires (ou moins s'il y en a moins de 3)
  return shuffleDeck(levelOpponents).slice(0, 3);
}

export function createDeck(): Card[] {
  return Object.entries(CARD_TYPES).map(([key, type], index) => ({
    id: index + 1,
    ...type
  }));
}

export function shuffleDeck<T>(deck: T[]): T[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}