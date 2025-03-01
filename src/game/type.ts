export interface Card {
  id: number;
  name: string;
  type: string;
  value: number;
  color: string;
  image: string;
}

export interface ChaosRule {
  id: number;
  name: string;
  description: string;
  effect: (playerCard: Card, aiCard: Card) => {
    playerCard: Card;
    aiCard: Card;
    pointMultiplier: number;
  };
}

export interface Opponent {
  card: Card;
  description: string;
}

export interface RuleEffect {
  playerCard: Card;
  aiCard: Card;
  pointMultiplier: number;
}

export type GamePhase = 
  | 'menu'           // Menu principal
  | 'selection'      // Sélection de carte
  | 'reveal'         // Révélation des cartes
  | 'result'         // Résultat du tour
  | 'opponent_selection' // Sélection du prochain adversaire
  | 'game_complete'  // Jeu terminé
  | 'level_complete' // Niveau terminé
  | 'level_failed';  // Niveau échoué

export type Language = 'fr' | 'en';

export interface Checkpoint {
  level: number;
  playerDeck: Card[];
  availableOpponents: Opponent[] | null;
}

export interface GameState {
  level: number;
  playerDeck: Card[];
  playerUsedCards: number[];
  aiDeck: Card[];
  aiUsedCards: number[];
  playerScore: number;
  aiScore: number;
  currentRule: ChaosRule | null;
  selectedCard: Card | null;
  aiSelectedCard: Card | null;
  gamePhase: GamePhase;
  availableOpponents: Opponent[] | null;
  lastWonCard: Card | null;
  currentOpponent: Card | null;
  showResultModal: boolean;
  roundWinner: 'player' | 'ai' | null;
  lastCheckpoint: Checkpoint | null;
  language: Language;
  showCredits: boolean;
  showHowToPlay: boolean;
  soundEnabled: boolean;
  musicEnabled: boolean;
}