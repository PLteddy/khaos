import { create } from 'zustand';
import { Card, GameState, Opponent } from './type';
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
  playerUsedCards: [], // Cartes utilisées dans le niveau actuel
  aiDeck: getRandomOpponentDeck(1),
  playerScore: 0,
  aiScore: 0,
  currentRule: getRandomRule(),
  selectedCard: null,
  aiSelectedCard: null,
  gamePhase: 'selection',
  availableOpponents: null,
  lastWonCard: null // Dernière carte gagnée
};

export const useGameStore = create<GameState & {
  selectCard: (cardId: number) => void;
  confirmSelection: () => void;
  nextPhase: () => void;
  selectNextOpponent: (opponentId: number) => void;
  resetGame: () => void;
}>((set) => ({
  ...initialState,
  
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
      // Si un joueur a déjà 2 victoires
      if (state.playerScore >= 2 || state.aiScore >= 2) {
        const playerWonLevel = state.playerScore >= 2;
        
        if (playerWonLevel && state.aiSelectedCard) {
          // Si c'est le dernier niveau (Zeus), fin du jeu
          if (state.level === 6) {
            return {
              ...initialState,
              gamePhase: 'game_complete'
            };
          }

          // Récupérer toutes les cartes du joueur + la carte gagnée
          const updatedPlayerDeck = [...state.playerDeck, state.aiSelectedCard];
          
          // Passer au niveau suivant
          const nextLevel = state.level + 1;
          
          // Si c'est le niveau final (Zeus), pas de choix d'adversaire
          if (nextLevel === 6) {
            const zeus = getOpponentsByLevel(6)[0];
            return {
              ...state,
              level: nextLevel,
              gamePhase: 'selection',
              playerDeck: updatedPlayerDeck,
              playerUsedCards: [], // Réinitialiser les cartes utilisées
              aiDeck: [zeus.card],
              playerScore: 0,
              aiScore: 0,
              selectedCard: null,
              aiSelectedCard: null,
              currentRule: getRandomRule(),
              availableOpponents: null,
              lastWonCard: state.aiSelectedCard // Sauvegarder la carte gagnée
            };
          }
          
          // Sinon, proposer le choix des adversaires du niveau suivant
          return {
            ...state,
            level: nextLevel,
            gamePhase: 'opponent_selection',
            availableOpponents: getOpponentsByLevel(nextLevel),
            playerDeck: updatedPlayerDeck,
            playerUsedCards: [], // Réinitialiser les cartes utilisées
            playerScore: 0,
            aiScore: 0,
            selectedCard: null,
            aiSelectedCard: null,
            currentRule: getRandomRule(),
            lastWonCard: state.aiSelectedCard // Sauvegarder la carte gagnée
          };
        } else {
          // Réinitialiser pour réessayer le niveau
          return {
            ...state,
            playerScore: 0,
            aiScore: 0,
            selectedCard: null,
            aiSelectedCard: null,
            playerUsedCards: [], // Réinitialiser les cartes utilisées
            gamePhase: 'selection',
            currentRule: getRandomRule(),
            lastWonCard: null
          };
        }
      }
      
      // Continuer le combat en cours
      return {
        ...state,
        selectedCard: null,
        aiSelectedCard: null,
        gamePhase: 'selection',
        currentRule: getRandomRule()
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
      playerUsedCards: [], // Réinitialiser les cartes utilisées
      gamePhase: 'selection',
      currentRule: getRandomRule(),
      availableOpponents: null,
      lastWonCard: null
    };
  }),
  
  resetGame: () => set(initialState)
}));