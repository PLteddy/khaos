import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../game/store';
import { Card } from '../game/type';
import { ChaosRuleDisplay } from './ChaosRulesDisplay';
import { ScoreBoard } from './ScoreBoard';
import { ResultModal} from './ResultModal';
import { Menu, RotateCcw } from 'lucide-react';
import cardImage from "../assets/cards2.png";
import cardBackImage from "../assets/cards2.png";
import buttonsfond from "../assets/button_menu.png";
import niveau from "../assets/cerclelvl.png";
import croix from "../assets/croix.png";
import { SoundSystem } from '../game/sound';
import { useSwipeable } from 'react-swipeable';

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

  const availableCards = playerDeck.filter(card => !playerUsedCards.includes(card.id));
  const remainingCards = availableCards.length;

  if (gamePhase === 'opponent_selection' && availableOpponents) {
    return (
      <div className="min-h-screen bg-black text-white p-4 sm:p-8"> 
        {lastWonCard && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4 sm:mb-8 p-4 bg-green-600/20 rounded-lg"
          >
            <h3 className="text-lg sm:text-xl font-bold text-green-400">
              Felicitations ! Vous avez gagne la carte {lastWonCard.name} !
            </h3>
          </motion.div>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">Choisissez votre prochain adversaire</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto">
          {availableOpponents.map((opponent) => (
            opponent.card ? (
              <motion.div
                key={opponent.card.id}
                className="bg-purple-800/50 rounded-lg p-4 sm:p-6 cursor-pointer hover:bg-purple-700/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                onClick={() => { 
                  SoundSystem.play('buttonClick');
                  selectNextOpponent(opponent.card.id);
                }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2">{opponent.card.name}</h3>
                <p className="text-xs sm:text-sm text-gray-300 mb-4">{opponent.description}</p>
                <div className="text-yellow-400 font-bold">
                  Force: {opponent.card.value}
                </div>
              </motion.div>
            ) : null
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 relative">
      <div className="max-w-4xl mx-auto">
        <ScoreBoard className="absolute left-0" />
        
        {/* Boutons Menu et Checkpoint - Responsive */}
        <div className="fixed bottom-4 sm:bottom-12 left-4 flex flex-col gap-2 sm:gap-4 z-20">
          <div className="relative flex flex-col items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center text-white font-bold w-[120px] sm:w-[150px] h-[40px] sm:h-[50px] text-base sm:text-lg transition-colors"
              onClick={() => { 
                SoundSystem.play('buttonClick'); 
                setShowMenuConfirm(true);
              }}
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
          <div className="relative flex flex-col items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center text-white font-bold w-[120px] sm:w-[150px] h-[40px] sm:h-[50px] text-base sm:text-lg transition-colors"
              onClick={() => { 
                SoundSystem.play('buttonClick');
                returnToLastCheckpoint();
              }}
              style={{
                backgroundImage: `url(${buttonsfond})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              Checkpoint
            </motion.button>
          </div>
        </div>

        {/* Menu Confirmation Modal */}
        <AnimatePresence>
          {showMenuConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-purple-900 p-6 sm:p-8 rounded-xl shadow-xl max-w-md w-full mx-4"
              >
                <h3 className="text-lg sm:text-xl font-bold mb-4">Retour au menu principal ?</h3>
                <p className="text-sm sm:text-base text-gray-300 mb-6">
                  Attention : votre progression ne sera pas sauvegardee.
                </p>
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => { 
                      SoundSystem.play('buttonClick');
                      setShowMenuConfirm(false);
                    }}
                    className="px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => {
                      SoundSystem.play('buttonClick');
                      resetGame();
                      useGameStore.getState().goToMenu();
                      setShowMenuConfirm(false);
                    }}
                    className="px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    Confirmer
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Niveau et adversaire */}
        <div className="text-center mb-4 sm:mb-8">
          {currentOpponent && (
            <p className="text-lg sm:text-xl text-yellow-400">
              Adversaire : {currentOpponent.name}
            </p>
          )}
        </div>

        {/* Indicateur de niveau */}
        <div className="absolute top-24 sm:top-48 right-4 sm:right-12 flex flex-col items-center gap-1 sm:gap-2">
          <span className="text-white text-xs sm:text-sm font-mono">LVL</span>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="relative">
              <img src={niveau} alt="Niveau" className="w-4 h-4 sm:w-6 sm:h-6" />
              {i < level && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src={croix} alt="Croix" className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        <ChaosRuleDisplay />
        
        <div className="text-center mb-4 text-yellow-400 text-sm sm:text-base">
          Cartes restantes : {remainingCards} / {playerDeck.length}
        </div>
        
        <div className="mt-4 sm:mt-8 relative min-h-[300px] sm:min-h-[400px]">
          {/* Zone de l'adversaire */}
          <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 flex justify-center items-center">
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
                    onClick={() => {
                      if (gamePhase === 'selection') {
                        SoundSystem.play('cardClick'); // ✅ Joue le son de clic
                        selectCard(card.id); // ✅ Exécute l'action de sélection de carte
                      }
                    }}
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
                  Confirmer la selection
                </motion.button>
              )}
            </div>
          </div>
        </div>
        
        {gamePhase !== 'selection' && gamePhase !== 'level_complete' && (
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
      className={`relative w-24 h-36 sm:w-32 sm:h-48 rounded-xl overflow-hidden transition-transform ${
        isSelected ? 'ring-4 ring-yellow-400' : ''
      }`}
    >
      <img
        src={card.image}
        alt={card.name}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
          isRevealed ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute inset-0 rounded-xl flex items-center justify-center ${
          isRevealed ? 'opacity-0' : 'opacity-100'
        } transition-opacity`}
      >
        <img 
          src={cardBackImage} 
          alt="Dos de la carte" 
          className="w-full h-full object-cover rounded-xl" 
        />
      </div>
    </div>
  );
};