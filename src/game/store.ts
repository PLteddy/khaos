import { create } from 'zustand';
import { Card, GameState, Opponent, GamePhase } from './type';
import { initialCards, getOpponentsByLevel } from './cards';
import { getRandomRule } from './rules';

const getRandomOpponentDeck = (level: number): Card[] => {
  const opponents = getOpponentsByLevel(level);
  const mainOpponent = opponents[Math.floor(Math.random() * opponents.length)];
  
  // On ajoute 3 cartes supplémentaires du même niveau
  const additionalCards = opponents
    .filter(o => o.card.id !== mainOpponent.card.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(o => o.card);

  return [mainOpponent.card, ...additionalCards];
};

const initialState: GameState = {
  level: 1,
  playerDeck: initialCards,
  playerUsedCards: [],
  aiDeck: getRandomOpponentDeck(1),
  playerScore: 0,
  aiScore: 0,
  currentRule: getRandomRule(),
  selectedCard: null,
  aiSelectedCard: null,
  gamePhase: 'menu',
  availableOpponents: null,
  lastWonCard: null,
  currentOpponent: null,
  showResultModal: false,
  roundWinner: null
};

export const useGameStore = create<GameState & {
  selectCard: (cardId: number) => void;
  confirmSelection: () => void;
  nextPhase: () => void;
  selectNextOpponent: (opponentId: number) => void;
  resetGame: () => void;
  startGame: () => void;
}>((set) => ({
  ...initialState,

  startGame: () => set(state => ({
    ...state,
    gamePhase: 'selection',
    currentOpponent: state.aiDeck[0] // Premier adversaire
  })),
  
  selectCard: (cardId: number) => set((state) => {
    if (state.gamePhase !== 'selection') return state;
    
    const selectedCard = state.playerDeck
      .filter(card => !state.playerUsedCards.includes(card.id))
      .find(card => card.id === cardId);
    
    if (!selectedCard) return state;
    
    return {
      ...state,
      selectedCard
    };
  }),

  confirmSelection: () => set((state) => {
    if (!state.selectedCard || state.gamePhase !== 'selection') return state;
    
    const aiCard = state.aiDeck[Math.floor(Math.random() * state.aiDeck.length)];
    
    return {
      ...state,
      aiSelectedCard: aiCard,
      playerUsedCards: [...state.playerUsedCards, state.selectedCard.id],
      gamePhase: 'reveal'
    };
  }),
  
  nextPhase: () => set((state) => {
    if (state.gamePhase === 'selection') return state;
    
    if (state.gamePhase === 'reveal') {
      if (!state.currentRule || !state.selectedCard || !state.aiSelectedCard) {
        return state;
      }

      const result = state.currentRule.effect(state.selectedCard, state.aiSelectedCard);
      const playerWins = result.playerCard.value > result.aiCard.value;
      
      return {
        ...state,
        gamePhase: 'result',
        playerScore: playerWins ? state.playerScore + 1 : state.playerScore,
        aiScore: !playerWins ? state.aiScore + 1 : state.aiScore
      };
    }
    
    if (state.gamePhase === 'result') {
      // Vérifier si toutes les cartes ont été utilisées
      const allCardsUsed = state.playerDeck.length === state.playerUsedCards.length;

      // Si toutes les cartes n'ont pas été utilisées, continuer le combat
      if (!allCardsUsed) {
        return {
          ...state,
          selectedCard: null,
          aiSelectedCard: null,
          gamePhase: 'selection',
          currentRule: getRandomRule()
        };
      }

      // Si toutes les cartes ont été utilisées, vérifier le score
      if (state.playerScore > state.aiScore) {
        // Le joueur a gagné le niveau
        if (state.level === 6) {
          // Si c'est le dernier niveau (Zeus), fin du jeu
          return {
            ...initialState,
            gamePhase: 'game_complete'
          };
        }

        // Récupérer toutes les cartes du joueur + la carte gagnée
        const updatedPlayerDeck = [...state.playerDeck];
        if (state.aiSelectedCard) {
          updatedPlayerDeck.push(state.aiSelectedCard);
        }

        // Passer au niveau suivant
        const nextLevel = state.level + 1;

        // Afficher la modale de victoire
        return {
          ...state,
          gamePhase: 'level_complete',
          showResultModal: true,
          lastWonCard: state.aiSelectedCard
        };
      } else {
        // Le joueur a perdu, afficher la modale d'échec
        return {
          ...state,
          gamePhase: 'level_failed',
          showResultModal: true
        };
      }
    }

    // Gérer la transition après la modale de résultat
    if (state.gamePhase === 'level_complete') {
      const nextLevel = state.level + 1;
      
      // Si c'est le niveau final (Zeus), pas de choix d'adversaire
      if (nextLevel === 6) {
        const zeus = getOpponentsByLevel(6)[0];
        return {
          ...state,
          level: nextLevel,
          gamePhase: 'selection',
          playerDeck: [...state.playerDeck, state.lastWonCard!],
          playerUsedCards: [],
          aiDeck: [zeus.card],
          playerScore: 0,
          aiScore: 0,
          selectedCard: null,
          aiSelectedCard: null,
          currentRule: getRandomRule(),
          availableOpponents: null,
          currentOpponent: zeus.card,
          showResultModal: false,
          roundWinner: null
        };
      }

      // Sinon, proposer le choix des adversaires du niveau suivant
      return {
        ...state,
        level: nextLevel,
        gamePhase: 'opponent_selection',
        availableOpponents: getOpponentsByLevel(nextLevel),
        playerDeck: [...state.playerDeck, state.lastWonCard!],
        playerUsedCards: [],
        playerScore: 0,
        aiScore: 0,
        selectedCard: null,
        aiSelectedCard: null,
        currentRule: getRandomRule(),
        showResultModal: false,
        roundWinner: null
      };
    }

    if (state.gamePhase === 'level_failed') {
      // Réinitialiser le niveau
      return {
        ...state,
        playerScore: 0,
        aiScore: 0,
        selectedCard: null,
        aiSelectedCard: null,
        playerUsedCards: [],
        gamePhase: 'selection',
        currentRule: getRandomRule(),
        showResultModal: false,
        roundWinner: null
      };
    }
    
    return state;
  }),

  selectNextOpponent: (opponentId: number) => set((state) => {
    const opponent = state.availableOpponents?.find(o => o.card.id === opponentId);
    if (!opponent) return state;

    return {
      ...state,
      aiDeck: getRandomOpponentDeck(state.level),
      playerScore: 0,
      aiScore: 0,
      selectedCard: null,
      aiSelectedCard: null,
      playerUsedCards: [],
      gamePhase: 'selection',
      currentRule: getRandomRule(),
      availableOpponents: null,
      lastWonCard: null,
      currentOpponent: opponent.card,
      showResultModal: false,
      roundWinner: null
    };
  }),
  
  resetGame: () => set(initialState)
}));