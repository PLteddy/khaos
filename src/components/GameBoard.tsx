import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../game/store';
import { Card } from '../game/type';
import { ChaosRuleDisplay } from './ChaosRulesDisplay';
import { ScoreBoard } from './ScoreBoard';
import { Menu, RotateCcw } from 'lucide-react';
import cardImage from "../assets/cards2.png";
import cardBackImage from "../assets/cards2.png";
import buttonsfond from "../assets/button_menu.png";
import niveau from "../assets/cerclelvl.png";
import croix from "../assets/croix.png";

export const GameBoard: React.FC = () => {
  const [showMenuConfirm, setShowMenuConfirm] = useState(false);
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
    selectNextOpponent,
    resetGame,
    returnToLastCheckpoint
  } = useGameStore();

  // Filtrer les cartes disponibles (non utilisées)
  const availableCards = playerDeck.filter(card => !playerUsedCards.includes(card.id));
  const remainingCards = availableCards.length;

  if (gamePhase === 'opponent_selection' && availableOpponents) {
    return (
      <div className="min-h-screen bg-black text-white p-8"> 
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
<div className="min-h-screen bg-black text-white p-8 relative">
  <div className="max-w-4xl mx-auto">
    {/* Boutons Menu et Checkpoint */}
    <div className="absolute bottom-4 left-4 flex flex-col gap-4">
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center text-white font-bold w-[150px] h-[50px] text-lg transition-colors"
          onClick={() => setShowMenuConfirm(true)}
          style={{
            backgroundImage: `url(${buttonsfond})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          Menu
        </motion.button>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center text-white font-bold w-[150px] h-[50px] text-lg transition-colors"
          onClick={returnToLastCheckpoint}
          style={{
            backgroundImage: `url(${buttonsfond})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          Restart
        </motion.button>
      </div>
    </div>


        {/* Popup de confirmation pour le menu */}
        <AnimatePresence>
          {showMenuConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-purple-900 p-8 rounded-xl shadow-xl max-w-md w-full mx-4"
              >
                <h3 className="text-xl font-bold mb-4">Retour au menu principal ?</h3>
                <p className="text-gray-300 mb-6">
                  Attention : votre progression ne sera pas sauvegardée.
                </p>
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => setShowMenuConfirm(false)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => {
                      resetGame();
                      setShowMenuConfirm(false);
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
                  >
                    Confirmer
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* En-tête avec niveau et adversaire */}
        <div className="text-center mb-8">
          {currentOpponent && (
            <p className="text-xl text-yellow-400">
              Adversaire : {currentOpponent.name}
            </p>
          )}
        </div>

        <div className="absolute top-4 right-4 flex flex-col items-center gap-2">
        <span className="text-white text-sm font-mono">LVL</span>
        {Array.from({ length: 6 }, (_, i) => (
      <div key={i} className="relative">
         {/* Image de base */}
         <img src={niveau} alt="Niveau" className="w-6 h-6" />
       {/* Croix rouge si le niveau est complété */}
        {i < level && (
        <div className="absolute inset-0 flex items-center justify-center">
           <img src={croix} alt="Croix" className="w-6 h-6" />
        </div>
      )}
    </div>
  ))}
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
      <div
        className={`absolute inset-0 p-4 flex items-center justify-center
        ${isRevealed ? 'opacity-100' : 'opacity-0'} transition-opacity`}
      >
        {/* Image de la carte */}
        <div className="w-full h-full">
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
  
      {/* Dos de la carte */}
      <div
        className={`absolute inset-0 rounded-xl
          flex items-center justify-center ${isRevealed ? 'opacity-0' : 'opacity-100'} transition-opacity`}
      >
        <img src={cardBackImage} alt="Dos de la carte" className="w-full h-full object-cover rounded-xl" />
      </div>
    </div>
  );
}
