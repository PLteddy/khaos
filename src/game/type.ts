export interface Card {
  id: number;
  name: string;
  type: string;
  value: number;
  color: string;
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

export interface GameState {
  level: number;
  playerDeck: Card[];
  playerUsedCards: number[]; // IDs des cartes utilisées dans le niveau actuel
  aiDeck: Card[];
  playerScore: number;
  aiScore: number;
  currentRule: ChaosRule | null;
  selectedCard: Card | null;
  aiSelectedCard: Card | null;
  gamePhase: 'selection' | 'reveal' | 'result' | 'opponent_selection' | 'game_complete';
  availableOpponents: Opponent[] | null;
  lastWonCard: Card | null; // Dernière carte gagnée
}