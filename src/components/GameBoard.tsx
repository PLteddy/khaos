import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    level,
    playerScore,
    aiScore,
    selectCard,
    confirmSelection,
    nextPhase,
    selectNextOpponent,
    resetGame
  } = useGameStore();

  // Filtrer les cartes disponibles (non utilisées)
  const availableCards = playerDeck.filter(card => !playerUsedCards.includes(card.id));

  // État pour le popup de fin de niveau
  const [showLevelEndPopup, setShowLevelEndPopup] = React.useState(false);
  const [showGameEndPopup, setShowGameEndPopup] = React.useState(false);
  const [levelWon, setLevelWon] = React.useState(false);

  // Vérifier la fin du niveau quand le score change
  React.useEffect(() => {
    if (playerScore >= 2 || aiScore >= 2) {
      setLevelWon(playerScore >= 2);
      if (level === 6) {
        setShowGameEndPopup(true);
      } else {
        setShowLevelEndPopup(true);
      }
    }
  }, [playerScore, aiScore, level]);

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
      <ScoreBoard />
      
      {level === 6 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 p-4 bg-red-600/20 rounded-lg"
        >
          <h3 className="text-2xl font-bold text-red-400">
            ⚡ BOSS FINAL : ZEUS, ROI DES DIEUX ⚡
          </h3>
        </motion.div>
      )}

      <div className="max-w-4xl mx-auto">
        <ChaosRuleDisplay />
        
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

      {/* Popup de fin de niveau */}
      <AnimatePresence>
        {showLevelEndPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-purple-900 p-8 rounded-xl shadow-xl max-w-md w-full"
            >
              <h2 className={`text-2xl font-bold mb-4 ${levelWon ? 'text-green-400' : 'text-red-400'}`}>
                {levelWon ? 'Niveau terminé !' : 'Niveau échoué !'}
              </h2>
              <p className="text-gray-300 mb-6">
                {levelWon 
                  ? 'Félicitations ! Vous pouvez maintenant choisir votre prochain adversaire.'
                  : 'Ne vous découragez pas ! Réessayez ce niveau.'}
              </p>
              <button
                onClick={() => setShowLevelEndPopup(false)}
                className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold"
              >
                Continuer
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Popup de fin de jeu (Zeus) */}
        {showGameEndPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-purple-900 p-8 rounded-xl shadow-xl max-w-md w-full"
            >
              <h2 className={`text-2xl font-bold mb-4 ${levelWon ? 'text-green-400' : 'text-red-400'}`}>
                {levelWon ? 'Victoire contre Zeus !' : 'Défaite face à Zeus !'}
              </h2>
              <p className="text-gray-300 mb-6">
                {levelWon 
                  ? 'Félicitations ! Vous avez vaincu le roi des dieux !'
                  : 'Zeus est trop puissant... Pour l\'instant !'}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    resetGame();
                    setShowGameEndPopup(false);
                  }}
                  className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold"
                >
                  Nouvelle partie
                </button>
                <button
                  onClick={() => {
                    // Redémarrer au niveau 6 (Zeus)
                    selectNextOpponent(availableOpponents?.[0].card.id || 0);
                    setShowGameEndPopup(false);
                  }}
                  className="flex-1 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-bold"
                >
                  Réessayer Zeus
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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