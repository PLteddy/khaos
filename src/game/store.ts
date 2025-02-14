import { create } from 'zustand';
import { Card, GameState, Opponent, GamePhase, ChaosRule } from './type';
import { initialCards, getOpponentsByLevel } from './cards';
import { getRandomRule } from './rules';

const getRandomOpponentDeck = (level: number, playerDeckSize: number): Card[] => {
  let allAvailableCards: Card[] = [];
  for (let i = 1; i <= level; i++) {
    const levelCards = getOpponentsByLevel(i).map(o => o.card);
    allAvailableCards = [...allAvailableCards, ...levelCards];
  }

  const currentLevelOpponents = getOpponentsByLevel(level);
  const mainOpponent = currentLevelOpponents[Math.floor(Math.random() * currentLevelOpponents.length)];
  
  const otherCards = allAvailableCards.filter(card => card.id !== mainOpponent.card.id);
  
  const additionalCards = otherCards
    .sort(() => Math.random() - 0.5)
    .slice(0, playerDeckSize - 1);

  return [mainOpponent.card, ...additionalCards];
};

// Fonction pour évaluer la meilleure carte à jouer en fonction de la règle actuelle
const evaluateCardForRule = (card: Card, rule: ChaosRule): number => {
  let score = card.value;

  // Règle "Volonté des Moires" - la plus petite valeur gagne
  if (rule.name === "Volonté des Moires") {
    score = 10 - card.value; // Inverse la valeur
  }

  // Règle "Jugement des Enfers" - Hadès gagne automatiquement
  if (rule.name === "Jugement des Enfers" && card.name === "Hadès") {
    score = 100; // Score très élevé pour Hadès
  }

  // Règle "Bénédiction de Zeus" - Les dieux gagnent un bonus
  if (rule.name === "Bénédiction de Zeus" && card.type === "god") {
    score += 2;
  }

  return score;
};

// Fonction pour choisir la meilleure carte pour l'IA
const chooseBestCard = (availableCards: Card[], rule: ChaosRule): Card => {
  return availableCards.reduce((best, current) => {
    const bestScore = evaluateCardForRule(best, rule);
    const currentScore = evaluateCardForRule(current, rule);
    return currentScore > bestScore ? current : best;
  }, availableCards[0]);
};

const initialState: GameState = {
  level: 1,
  playerDeck: initialCards,
  playerUsedCards: [],
  aiDeck: [],
  aiUsedCards: [],
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

  startGame: () => set(state => {
    const initialDeck = getRandomOpponentDeck(1, state.playerDeck.length);
    return {
      ...state,
      gamePhase: 'selection',
      aiDeck: initialDeck,
      aiUsedCards: [],
      currentOpponent: initialDeck[0]
    };
  }),
  
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
    if (!state.selectedCard || state.gamePhase !== 'selection' || !state.currentRule) return state;
    
    // Sélectionner la meilleure carte disponible en fonction de la règle actuelle
    const availableAiCards = state.aiDeck.filter(card => !state.aiUsedCards.includes(card.id));
    const aiCard = chooseBestCard(availableAiCards, state.currentRule);
    
    return {
      ...state,
      aiSelectedCard: aiCard,
      playerUsedCards: [...state.playerUsedCards, state.selectedCard.id],
      aiUsedCards: [...state.aiUsedCards, aiCard.id],
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
      const allCardsUsed = state.playerDeck.length === state.playerUsedCards.length;

      if (!allCardsUsed) {
        return {
          ...state,
          selectedCard: null,
          aiSelectedCard: null,
          gamePhase: 'selection',
          currentRule: getRandomRule()
        };
      }

      if (state.playerScore > state.aiScore) {
        if (state.level === 6) {
          return {
            ...initialState,
            gamePhase: 'game_complete'
          };
        }

        return {
          ...state,
          gamePhase: 'level_complete',
          showResultModal: true,
          lastWonCard: state.currentOpponent
        };
      } else {
        return {
          ...state,
          gamePhase: 'level_failed',
          showResultModal: true
        };
      }
    }

    if (state.gamePhase === 'level_complete') {
      const nextLevel = state.level + 1;
      
      if (nextLevel === 6) {
        const zeus = getOpponentsByLevel(6)[0];
        const zeusDeck = [zeus.card];
        return {
          ...state,
          level: nextLevel,
          gamePhase: 'selection',
          playerDeck: [...state.playerDeck, state.lastWonCard!],
          playerUsedCards: [],
          aiDeck: zeusDeck,
          aiUsedCards: [],
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

      return {
        ...state,
        level: nextLevel,
        gamePhase: 'opponent_selection',
        availableOpponents: getOpponentsByLevel(nextLevel),
        playerDeck: [...state.playerDeck, state.lastWonCard!],
        playerUsedCards: [],
        aiUsedCards: [],
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
      return {
        ...state,
        playerScore: 0,
        aiScore: 0,
        selectedCard: null,
        aiSelectedCard: null,
        playerUsedCards: [],
        aiUsedCards: [],
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

    const newDeck = getRandomOpponentDeck(state.level, state.playerDeck.length);

    return {
      ...state,
      aiDeck: newDeck,
      playerScore: 0,
      aiScore: 0,
      selectedCard: null,
      aiSelectedCard: null,
      playerUsedCards: [],
      aiUsedCards: [],
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