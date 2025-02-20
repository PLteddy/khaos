import { Card } from './type';
import OracleImg from '../assets/xard3.png';

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
  ORACLE: { name: "Oracle de Delphes", type: "mortal", value: 3, color: "#9333ea",
    image: OracleImg
   },
  PRETRESSE: { name: "Prêtresse d'Aphrodite", type: "mortal", value: 3, color: "#ec4899",
    image: OracleImg
  },
  PHILOSOPHE: { name: "Philosophe", type: "mortal", value: 3, color: "#14b8a6",
    image: OracleImg
   },
  ROI_AVEUGLE: { name: "Roi Aveugle", type: "mortal", value: 3, color: "#facc15",
    image: OracleImg
   },
  MOINE: { name: "Moine", type: "mortal", value: 3, color: "#84cc16",
    image: OracleImg
   },
  MARCHAND: { name: "Marchand", type: "mortal", value: 3, color: "#f59e0b",
    image: OracleImg
   },
  SOLDAT: { name: "Soldat", type: "mortal", value: 3, color: "#6b7280",
    image: OracleImg
   },
  ESCLAVE: { name: "Esclave", type: "mortal", value: 3, color: "#9ca3af",
    image: OracleImg
   },

  // Niveau 2 - Créatures
  MINOTAURE: { name: "Minotaure", type: "creature", value: 4, color: "#9ca3af",
    image: OracleImg
   },
  MEDUSE: { name: "Méduse", type: "creature", value: 4, color: "#7c3aed",
    image: OracleImg
   },
  CERBERE: { name: "Cerbère", type: "creature", value: 4, color: "#374151",
    image: OracleImg
   },
  HARPIES: { name: "Harpies", type: "creature", value: 4, color: "#9333ea",
    image: OracleImg
   },


  // Niveau 3 - Héros
  HERACLES: { name: "Héraclès", type: "hero", value: 5, color: "#f97316",
    image: OracleImg
   },
  ACHILLE: { name: "Achille", type: "hero", value: 5, color: "#2563eb",
    image: OracleImg
   },
  ULYSSE: { name: "Ulysse", type: "hero", value: 5, color: "#7c3aed",
    image: OracleImg
   },
  PERSEE: { name: "Persée", type: "hero", value: 5, color: "#d946ef",
    image: OracleImg
   },
  THESEE: { name: "Thésée", type: "hero", value: 5, color: "#10b981",
    image: OracleImg
   },
  JASON: { name: "Jason", type: "hero", value: 5, color: "#f59e0b",
    image: OracleImg
   },
  ATALANTE: { name: "Atalante", type: "hero", value: 5, color: "#84cc16" ,
    image: OracleImg
  },

  // Niveau 4 - Dieux Mineurs
  ATHENA: { name: "Athéna", type: "god", value: 6, color: "#facc15",
    image: OracleImg
   },
  ARES: { name: "Arès", type: "god", value: 6, color: "#dc2626",
    image: OracleImg
   },
  APOLLON: { name: "Apollon", type: "god", value: 6, color: "#f59e0b",
    image: OracleImg
   },
  ARTEMIS: { name: "Artémis", type: "god", value: 6, color: "#84cc16",
    image: OracleImg
   },
  DIONYSOS: { name: "Dionysos", type: "god", value: 6, color: "#9333ea",
    image: OracleImg
   },
  HERMES: { name: "Hermès", type: "god", value: 6, color: "#14b8a6",
    image: OracleImg
   },

  // Niveau 5 - Dieux Majeurs
  HADES: { name: "Hadès", type: "major_god", value: 7, color: "#374151",
    image: OracleImg
   },
  POSEIDON: { name: "Poséidon", type: "major_god", value: 7, color: "#2563eb",
    image: OracleImg
   },
  HERA: { name: "Héra", type: "major_god", value: 7, color: "#d946ef",
    image: OracleImg
   },

  // Niveau 6 - Boss Final
  ZEUS: { name: "Zeus", type: "boss", value: 8, color: "#fbbf24",
    image: OracleImg
   }
} as const;

// Fonction pour obtenir un deck initial aléatoire
export function getInitialDeck(): Card[] {
  const allCards = createDeck();
  return shuffleDeck(allCards).slice(0, 3);
}

// Fonction pour obtenir les adversaires par niveau
export function getOpponentsByLevel(level: number): Opponent[] {
  const opponents: { [key: number]: Opponent[] } = {
    1: [ // Mortels
      { card: { id: 4, ...CARD_TYPES.ORACLE }, description: "Prédit l'avenir, influence les règles de chaos" },
      { card: { id: 5, ...CARD_TYPES.PRETRESSE }, description: "Fait tomber amoureux un adversaire" },
      { card: { id: 6, ...CARD_TYPES.PHILOSOPHE }, description: "Gagne face à la violence brute par la logique" },
      { card: { id: 7, ...CARD_TYPES.ROI_AVEUGLE }, description: "Possède une sagesse cachée" },
      { card: { id: 8, ...CARD_TYPES.MOINE }, description: "Protégé par les dieux" },
      { card: { id: 9, ...CARD_TYPES.MARCHAND }, description: "Peut négocier sa survie" },
      { card: { id: 10, ...CARD_TYPES.SOLDAT }, description: "Un simple guerrier, sans pouvoir particulier" },
      { card: { id: 11, ...CARD_TYPES.ESCLAVE }, description: "Le plus faible… mais peut surprendre avec une règle de chaos" }
    ],
    2: [ // Créatures
      { card: { id: 12, ...CARD_TYPES.MINOTAURE }, description: "Monstre brutal du labyrinthe" },
      { card: { id: 13, ...CARD_TYPES.MEDUSE }, description: "Transforme en pierre ceux qui la regardent" },
      { card: { id: 14, ...CARD_TYPES.CERBERE }, description: "Gardien des Enfers, 3 têtes" },
      { card: { id: 15, ...CARD_TYPES.CHIMERE }, description: "Créature hybride, souffle le feu" },
      { card: { id: 16, ...CARD_TYPES.SPHINX }, description: "Maître des énigmes mortelles" },
      { card: { id: 17, ...CARD_TYPES.HARPIES }, description: "Démons ailés, voleurs rapides" },
      { card: { id: 18, ...CARD_TYPES.GORGONES }, description: "Sœurs de Méduse, regard pétrifiant" }
    ],
    3: [ // Héros
      { card: { id: 19, ...CARD_TYPES.HERACLES }, description: "Le plus grand héros, force colossale" },
      { card: { id: 20, ...CARD_TYPES.ACHILLE }, description: "Guerrier invincible sauf au talon" },
      { card: { id: 21, ...CARD_TYPES.ULYSSE }, description: "Maître de la ruse et de la stratégie" },
      { card: { id: 22, ...CARD_TYPES.PERSEE }, description: "Tueur de Méduse, sauveur d'Andromède" },
      { card: { id: 23, ...CARD_TYPES.THESEE }, description: "Vainqueur du Minotaure" },
      { card: { id: 24, ...CARD_TYPES.JASON }, description: "Chef des Argonautes" },
      { card: { id: 25, ...CARD_TYPES.ATALANTE }, description: "Chasseuse ultra-rapide" }
    ],
    4: [ // Dieux Mineurs
      { card: { id: 26, ...CARD_TYPES.ATHENA }, description: "Déesse de la sagesse et de la guerre stratégique" },
      { card: { id: 27, ...CARD_TYPES.ARES }, description: "Dieu de la guerre brutale" },
      { card: { id: 28, ...CARD_TYPES.APOLLON }, description: "Dieu de la lumière et des arts" },
      { card: { id: 29, ...CARD_TYPES.ARTEMIS }, description: "Déesse de la chasse et de la nature" },
      { card: { id: 30, ...CARD_TYPES.DIONYSOS }, description: "Dieu de la fête et de la folie" },
      { card: { id: 31, ...CARD_TYPES.HERMES }, description: "Messager des dieux, maître des ruses" }
    ],
    5: [ // Dieux Majeurs
      { card: { id: 32, ...CARD_TYPES.HADES }, description: "Dieu des Enfers" },
      { card: { id: 33, ...CARD_TYPES.POSEIDON }, description: "Dieu des océans" },
      { card: { id: 34, ...CARD_TYPES.HERA }, description: "Déesse du mariage et reine des dieux" }
    ],
    6: [ // Boss Final
      { card: { id: 35, ...CARD_TYPES.ZEUS }, description: "Dieu du ciel et de la foudre, roi des dieux" }
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