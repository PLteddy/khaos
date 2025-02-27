import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, XCircle } from 'lucide-react';
import { useGameStore } from '../game/store';
import { useNavigate } from 'react-router-dom';

export const ResultModal: React.FC = () => {
  const { showResultModal, gamePhase, lastWonCard, currentOpponent, level, nextPhase, resetGame } = useGameStore();
  const navigate = useNavigate();

  if (!showResultModal) return null;

  const isVictory = gamePhase === 'level_complete';
  const isFinalLevel = level === 6; // Vérifie si c'est le dernier niveau

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
          className="bg-gradient-to-b from-purple-800 to-purple-900 p-8 rounded-xl shadow-xl max-w-md w-full mx-4"
        >
          <div className="text-center">
            {isVictory ? (
              <>
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">
                  {isFinalLevel ? "Félicitations, vous avez terminé le jeu !" : `Niveau ${level} terminé !`}
                </h2>
                {lastWonCard && (
                  <div className="bg-purple-700/50 rounded-lg p-4 mb-6">
                    <p className="text-yellow-400 font-bold mb-2">Carte gagnée :</p>
                    <p className="text-white">{lastWonCard.name}</p>
                  </div>
                )}
                <p className="text-gray-300 mb-6">
                  {isFinalLevel
                    ? "Vous avez vaincu tous les adversaires et remporté la victoire ultime !"
                    : `Félicitations ! Vous avez vaincu ${currentOpponent?.name} !`}
                </p>

                <button
                  onClick={() => (isFinalLevel ? navigate('/') : nextPhase())}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  {isFinalLevel ? 'Retour à l\'accueil' : 'Niveau suivant'}
                </button>
              </>
            ) : (
              <>
                <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">Niveau {level} échoué</h2>
                <p className="text-gray-300 mb-6">
                  {currentOpponent?.name} vous a vaincu. Réessayez !
                </p>

                <button
                  onClick={() => nextPhase()} // Permet toujours de recommencer, même au niveau 6
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Réessayer
                </button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
