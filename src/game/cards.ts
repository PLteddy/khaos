import { Card } from './type';
import Oracle from '../assets/cartes/oracle.png';
import Zeus from '../assets/cartes/zeus.png';
import Ulysse from '../assets/cartes/ulysse.png';
import Philosophe from '../assets/cartes/philosophe.png';
import Roi from '../assets/cartes/kingt.png';
import Marchand from '../assets/cartes/mercantt.png';
import Soldat from '../assets/cartes/soldat.png';
import Slave from '../assets/cartes/slave.png';
import Minotaure from '../assets/cartes/minotaure.png';
import Meduse from '../assets/cartes/meduse.png';
import Cerbere from '../assets/cartes/cerbere.png';
import Harpie from '../assets/cartes/harpie.png';
import Heracles from '../assets/cartes/heracles.png';
import Achille from '../assets/cartes/achille.png';
import Thesee from '../assets/cartes/thésée.png';
import Artemis from '../assets/cartes/artemis.png';
import Apollon from '../assets/cartes/apollon.png';
import Athena from '../assets/cartes/athena.png';
import Hermes from '../assets/cartes/hermes.png';
import Hera from '../assets/cartes/hera.png';
import Hades from '../assets/cartes/hades.png';
import Poseidon from '../assets/cartes/poseidon.png';


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
  MINOTAURE: { name: "Minotaure", type: "creature", value: 10, color: "#9ca3af",
    image: Minotaure
   },
  MEDUSE: { name: "Méduse", type: "creature", value: 9, color: "#7c3aed",
    image: Meduse
   },
  CERBERE: { name: "Cerbère", type: "creature", value: 8, color: "#374151",
    image: Cerbere
   },
  HARPIES: { name: "Harpies", type: "creature", value: 7, color: "#9333ea",
    image: Harpie
   },


  // Niveau 3 - Héros
  HERACLES: { name: "Héraclès", type: "hero", value: 14, color: "#f97316",
    image: Heracles
   },
  ACHILLE: { name: "Achille", type: "hero", value: 13, color: "#2563eb",
    image: Achille
   },
  ULYSSE: { name: "Ulysse", type: "hero", value: 12, color: "#7c3aed",
    image: Ulysse
   },
  THESEE: { name: "Thésée", type: "hero", value: 11, color: "#10b981",
    image: Thesee
   },


  // Niveau 4 - Dieux Mineurs
  ATHENA: { name: "Athéna", type: "god", value: 18, color: "#facc15",
    image: Athena
   },
  APOLLON: { name: "Apollon", type: "god", value: 17, color: "#f59e0b",
    image: Apollon
   },
  ARTEMIS: { name: "Artémis", type: "god", value: 16, color: "#84cc16",
    image: Artemis
   },
  HERMES: { name: "Hermès", type: "god", value: 15, color: "#14b8a6",
    image: Hermes
   },

  // Niveau 5 - Dieux Majeurs
  HADES: { name: "Hadès", type: "major_god", value: 21, color: "#374151",
    image: Hades
   },
  POSEIDON: { name: "Poséidon", type: "major_god", value: 20, color: "#2563eb",
    image: Poseidon
   },
  HERA: { name: "Héra", type: "major_god", value: 19, color: "#d946ef",
    image: Hera
   },

  // Niveau 6 - Boss Final
  ZEUS: { name: "Zeus", type: "boss", value: 22, color: "#fbbf24",
    image: Zeus
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
      { card: { id: 6, ...CARD_TYPES.PHILOSOPHE }, description: "Gagne face à la violence brute par la logique" },
      { card: { id: 7, ...CARD_TYPES.ROI_AVEUGLE }, description: "Possède une sagesse cachée" },
      { card: { id: 9, ...CARD_TYPES.MARCHAND }, description: "Peut négocier sa survie" },
      { card: { id: 10, ...CARD_TYPES.SOLDAT }, description: "Un simple guerrier, sans pouvoir particulier" },
      { card: { id: 11, ...CARD_TYPES.ESCLAVE }, description: "Le plus faible… mais peut surprendre avec une règle de chaos" }
    ],
    2: [ // Créatures
      { card: { id: 12, ...CARD_TYPES.MINOTAURE }, description: "Monstre brutal du labyrinthe" },
      { card: { id: 13, ...CARD_TYPES.MEDUSE }, description: "Transforme en pierre ceux qui la regardent" },
      { card: { id: 14, ...CARD_TYPES.CERBERE }, description: "Gardien des Enfers, 3 têtes" },
      { card: { id: 17, ...CARD_TYPES.HARPIES }, description: "Démons ailés, voleurs rapides" },
    ],
    3: [ // Héros
      { card: { id: 19, ...CARD_TYPES.HERACLES }, description: "Le plus grand héros, force colossale" },
      { card: { id: 20, ...CARD_TYPES.ACHILLE }, description: "Guerrier invincible sauf au talon" },
      { card: { id: 21, ...CARD_TYPES.ULYSSE }, description: "Maître de la ruse et de la stratégie" },
      { card: { id: 23, ...CARD_TYPES.THESEE }, description: "Vainqueur du Minotaure" },
    ],
    4: [ // Dieux Mineurs
      { card: { id: 26, ...CARD_TYPES.ATHENA }, description: "Déesse de la sagesse et de la guerre stratégique" },
      { card: { id: 28, ...CARD_TYPES.APOLLON }, description: "Dieu de la lumière et des arts" },
      { card: { id: 29, ...CARD_TYPES.ARTEMIS }, description: "Déesse de la chasse et de la nature" },
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