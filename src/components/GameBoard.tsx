import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../game/store';
import { Card } from '../game/type';
import { ChaosRuleDisplay } from './ChaosRulesDisplay';
import { ScoreBoard } from './ScoreBoard';

export const GameBoard: React.FC = () => {
  const {
    playerDeck,
    playerUsedCards,
    selectedCard,
    aiSelectedCard,
    gamePhase,
    availableOpponents,
    lastWonCard,
    currentOpponent,
    level,
    selectCard,
    confirmSelection,
    nextPhase,
    selectNextOpponent
  } = useGameStore();

  // Filtrer les cartes disponibles (non utilisées)
  const availableCards = playerDeck.filter(card => !playerUsedCards.includes(card.id));
  const remainingCards = availableCards.length;

  if (gamePhase === 'opponent_selection' && availableOpponents) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-gray-900 text-white p-8">
        {lastWonCard && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 p-4 bg-green-600/20 rounded-lg"
          >
            <h3 className="text-xl font-bold text-green-400">
              Félicitations ! Vous avez gagné la carte {lastWonCard.name} !
            </h3>
          </motion.div>
        )}
        <h2 className="text-3xl font-bold text-center mb-8">Choisissez votre prochain adversaire</h2>
        <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
          {availableOpponents.map((opponent) => (
            <motion.div
              key={opponent.card.id}
              className="bg-purple-800/50 rounded-lg p-6 cursor-pointer hover:bg-purple-700/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              onClick={() => selectNextOpponent(opponent.card.id)}
            >
              <h3 className="text-xl font-bold mb-2">{opponent.card.name}</h3>
              <p className="text-sm text-gray-300 mb-4">{opponent.description}</p>
              <div className="text-yellow-400 font-bold">
                Force: {opponent.card.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête avec niveau et adversaire */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Niveau {level} / 6
          </h2>
          {currentOpponent && (
            <p className="text-xl text-yellow-400">
              Adversaire : {currentOpponent.name}
            </p>
          )}
        </div>

        <ScoreBoard />
        <ChaosRuleDisplay />
        
        {/* Affichage du nombre de cartes restantes */}
        <div className="text-center mb-4 text-yellow-400">
          Cartes restantes : {remainingCards} / {playerDeck.length}
        </div>
        
        <div className="mt-8 relative min-h-[400px]">
          {/* Zone de l'adversaire */}
          <div className="absolute top-0 left-0 right-0 h-32 flex justify-center items-center">
            {gamePhase !== 'selection' && aiSelectedCard && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <CardDisplay card={aiSelectedCard} isRevealed={gamePhase === 'result'} />
              </motion.div>
            )}
          </div>
          
          {/* Zone du joueur */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="flex flex-col items-center gap-8">
              <div className="flex justify-center gap-4">
                {availableCards.map((card) => (
                  <motion.div
                    key={card.id}
                    whileHover={{ y: -20 }}
                    onClick={() => gamePhase === 'selection' && selectCard(card.id)}
                  >
                    <CardDisplay
                      card={card}
                      isSelected={selectedCard?.id === card.id}
                      isRevealed={true}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Bouton de confirmation */}
              {gamePhase === 'selection' && selectedCard && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold"
                  onClick={confirmSelection}
                >
                  Confirmer la sélection
                </motion.button>
              )}
            </div>
          </div>
        </div>
        
        {gamePhase !== 'selection' && (
          <div className="mt-8 text-center">
            <button
              onClick={nextPhase}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold"
            >
              {gamePhase === 'reveal' ? 'Révéler les cartes' : 'Tour suivant'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface CardDisplayProps {
  card: Card;
  isSelected?: boolean;
  isRevealed?: boolean;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card, isSelected, isRevealed }) => {
  return (
    <div
      className={`relative w-32 h-48 rounded-xl transition-transform ${
        isSelected ? 'ring-4 ring-yellow-400' : ''
      }`}
      style={{ backgroundColor: card.color }}
    >
      <div className={`absolute inset-0 p-4 flex flex-col items-center justify-between
        ${isRevealed ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
        <div className="text-center">
          <h3 className="font-bold text-white text-shadow">{card.name}</h3>
          <p className="text-sm text-white/80">{card.type}</p>
        </div>
        
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-3xl font-bold text-white text-shadow">
            {card.value}
          </span>
        </div>
      </div>
      
      {/* Dos de la carte */}
      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br from-purple-800 to-purple-600
          flex items-center justify-center ${isRevealed ? 'opacity-0' : 'opacity-100'} transition-opacity`}
      >
        <div className="w-16 h-16 rounded-full border-4 border-white/30" />
      </div>
    </div>
  );
};