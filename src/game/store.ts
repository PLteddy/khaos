import { create } from 'zustand';
import { Card, GameState, Opponent, GamePhase, Language, ChaosRule } from './type';
import { getInitialDeck, getOpponentsByLevel } from './cards';
import { getRandomRule } from './rules';
import { SoundSystem } from './sound';


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

const evaluateCardForRule = (card: Card, rule: ChaosRule): number => {
  let score = card.value;

  return score;
};

const chooseBestCard = (availableCards: Card[], rule: ChaosRule): Card | null => {
  if (availableCards.length === 0) return null; // Évite de retourner undefined

  return availableCards.reduce((best, current) => {
    const bestScore = evaluateCardForRule(best, rule);
    const currentScore = evaluateCardForRule(current, rule);
    return currentScore > bestScore ? current : best;
  }, availableCards[0]);
};

const initialState: GameState = {
  level: 1,
  playerDeck: getInitialDeck(),
  playerUsedCards: [],
  aiDeck: [],
  aiUsedCards: [],
  playerScore: 0,
  aiScore: 0,
  currentRule: getRandomRule(),
  selectedCard: null,
  aiSelectedCard: null,
  gamePhase: 'loading', // ✅ Démarre correctement avec l'écran de chargement
  availableOpponents: null,
  lastWonCard: null,
  currentOpponent: null,
  showResultModal: false,
  roundWinner: null,
  lastCheckpoint: null,
  language: 'fr',
  showCredits: false,
  showHowToPlay: false,
  soundEnabled: true,
  musicEnabled: true,
};


export const useGameStore = create<GameState & {
  selectCard: (cardId: number) => void;
  confirmSelection: () => void;
  nextPhase: () => void;
  selectNextOpponent: (opponentId: number) => void;
  resetGame: () => void;
  startGame: () => void;
  goToMenu: () => void;
  
  returnToLastCheckpoint: () => void;
}>((set) => ({
  ...initialState,
  
  goToMenu: () => set({ gamePhase: 'menu' }),
  startGame: () => set(state => {
    const initialDeck = getRandomOpponentDeck(1, state.playerDeck.length);
    SoundSystem.play('buttonClick');
    return {
      ...state,
      gamePhase: 'selection',
      aiDeck: initialDeck,
      aiUsedCards: [],
      currentOpponent: initialDeck[0],
      lastCheckpoint: null,
      
    };
  }),
  
  selectCard: (cardId: number) => set((state) => {
    SoundSystem.play('cardSelect');
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
    SoundSystem.play('buttonClick');
    if (!state.selectedCard || state.gamePhase !== 'selection' || !state.currentRule) return state;
    
    const availableAiCards = state.aiDeck.filter(card => !state.aiUsedCards.includes(card.id));
    let aiCard = chooseBestCard(availableAiCards, state.currentRule);
    
    // 🔍 Si aucune carte n'est disponible, choisir une carte au hasard dans le deck total de l'IA
    if (!aiCard && state.aiDeck.length > 0) {
      aiCard = state.aiDeck[Math.floor(Math.random() * state.aiDeck.length)];
    }
    
    if (!aiCard) {
      console.error("Erreur: Aucune carte AI disponible, même dans le deck complet !");
      return state; // Sécurité supplémentaire
    }

    
    // 🔍 Debugging logs pour voir le problème
    console.log("Deck IA :", state.aiDeck);
    console.log("Cartes IA déjà utilisées :", state.aiUsedCards);
    console.log("Cartes IA disponibles :", availableAiCards);

    // Vérification pour éviter l'erreur
    if (!aiCard) {
        console.error("Erreur: Aucune carte AI disponible !");
        return state; // Ne change rien et évite l'erreur
    }
    
    return {
      ...state,
      aiSelectedCard: aiCard,
      playerUsedCards: [...state.playerUsedCards, state.selectedCard.id],
      aiUsedCards: [...state.aiUsedCards, aiCard.id],
      gamePhase: 'reveal'
    };
}),

  
  nextPhase: () => set((state) => {
    SoundSystem.play('buttonClick');
    if (state.gamePhase === 'selection') return state;
    
    if (state.gamePhase === 'reveal') {
      SoundSystem.play('cardReveal');
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
        SoundSystem.play('victory');
        if (state.level === 6) {
          SoundSystem.play('gameComplete');
          return {
            ...initialState,
            gamePhase: 'game_complete',
            showResultModal: true, // On active bien le modal final
          };
        }

        return {
          ...state,
          gamePhase: 'level_complete',
          showResultModal: true,
          lastWonCard: state.currentOpponent
        };
      } else {
        SoundSystem.play('defeat');
        return {
          ...state,
          gamePhase: 'level_failed',
          showResultModal: true
        };
      }
    }

    if (state.gamePhase === 'level_complete') {
      SoundSystem.play('levelComplete');
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
          roundWinner: null,
          lastCheckpoint: null
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
        roundWinner: null,
        lastCheckpoint: null
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

    const checkpoint = {
      level: state.level,
      playerDeck: state.playerDeck,
      availableOpponents: state.availableOpponents
    };

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
      currentOpponent: opponent.card,
      showResultModal: false,
      roundWinner: null,
      lastCheckpoint: checkpoint
    };
  }),
  
  resetGame: () => set({
    ...initialState,
    playerDeck: getInitialDeck()
  }),

  returnToLastCheckpoint: () => set((state) => {
    if (!state.lastCheckpoint) return state;

    return {
      ...state,
      level: state.lastCheckpoint.level,
      playerDeck: state.lastCheckpoint.playerDeck,
      availableOpponents: state.lastCheckpoint.availableOpponents,
      gamePhase: 'opponent_selection',
      playerScore: 0,
      aiScore: 0,
      selectedCard: null,
      aiSelectedCard: null,
      playerUsedCards: [],
      aiUsedCards: [],
      currentRule: getRandomRule(),
      showResultModal: false,
      roundWinner: null,
      currentOpponent: null,
      aiDeck: []
    };
  })
}));