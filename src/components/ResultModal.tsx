import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, XCircle } from 'lucide-react';
import { useGameStore } from '../game/store';
import { useNavigate } from 'react-router-dom';

export const ResultModal: React.FC = () => {
  const { showResultModal, gamePhase, lastWonCard, currentOpponent, level, nextPhase, resetGame } = useGameStore();
  const navigate = useNavigate();

  // Vérifier si c'est le niveau final et si c'est une victoire
  const isFinalVictory = gamePhase === 'game_complete';
  const isVictory = gamePhase === 'level_complete';
  const isFailure = gamePhase === 'level_failed';

  if (!showResultModal) return null;

  return (
    <AnimatePresence>
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
          className="bg-gradient-to-b from-yellow-400 to-yellow-500 p-8 rounded-xl shadow-xl max-w-md w-full mx-4"
        >
          <div className="text-center">
            {isFinalVictory ? (
              // Modal pour la victoire finale
              <>
                <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  🏆 Felicitations ! 🎉
                </h2>
                <p className="text-xl text-yellow-200 mb-2">Vous avez terminé le jeu !</p>
                <p className="text-white mb-6">
                  Vous avez vaincu tous les adversaires et remporte la victoire ultime !
                </p>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => {
                      resetGame();
                     
                    }}
                    className="bg-yellow-500 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Retour au menu
                  </button>
                </div>
              </>
            ) : isVictory ? (
              // Modal pour les victoires de niveau normales
              <>
                <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">
                  Niveau {level} termine !
                </h2>
                {lastWonCard && (
                  <div className="bg-black rounded-lg p-4 mb-6">
                    <p className="text-yellow-400 font-bold mb-2">Carte gagnee :</p>
                    <p className="text-white">{lastWonCard.name}</p>
                  </div>
                )}
                <p className="text-white mb-6">
                  Felicitations ! Vous avez vaincu {currentOpponent?.name} !
                </p>
                <button
                  onClick={nextPhase}
                  className="bg-black hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Niveau suivant
                </button>
              </>
            ) : isFailure ? (
              // Modal pour les échecs
              <>
                <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">Niveau {level} echoue</h2>
                <p className="text-white mb-6">
                  {currentOpponent?.name} vous a vaincu. Reessayez !
                </p>
                <button
                  onClick={() => nextPhase()}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Reessayer
                </button>
              </>
            ) : null}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};