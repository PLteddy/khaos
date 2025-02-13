import React from 'react';
import { motion } from 'framer-motion';
import { Swords, Trophy, Settings } from 'lucide-react';
import { useGameStore } from '../game/store';

export const MainMenu: React.FC = () => {
  const startGame = useGameStore(state => state.startGame);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-gray-900 flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-bold text-white mb-4">
          Mythological Card Game
        </h1>
        <p className="text-xl text-gray-300">
          Affrontez les dieux et les héros de la mythologie grecque
        </p>
      </motion.div>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
          onClick={() => startGame()}
        >
          <Swords className="w-6 h-6" />
          Commencer l'aventure
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
        >
          <Trophy className="w-6 h-6" />
          Tableau des scores
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-3 bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
        >
          <Settings className="w-6 h-6" />
          Options
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-gray-400 text-sm"
      >
        Version 1.0.0
      </motion.div>
    </div>
  );
};