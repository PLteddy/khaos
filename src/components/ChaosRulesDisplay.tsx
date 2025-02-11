import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../game/store';

export const ChaosRuleDisplay: React.FC = () => {
  const { currentRule } = useGameStore();

  if (!currentRule) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-purple-900/80 rounded-lg p-6 text-center mb-8"
    >
      <h2 className="text-2xl font-bold text-yellow-400 mb-2">
        {currentRule.name}
      </h2>
      <p className="text-white/90">
        {currentRule.description}
      </p>
    </motion.div>
  );
};