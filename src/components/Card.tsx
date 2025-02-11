import React from 'react';
import { motion } from 'framer-motion';
import { Card as CardType } from '../game/type';

interface CardProps {
  card: CardType;
  isSelected?: boolean;
  isRevealed?: boolean;
}

export const Card: React.FC<CardProps> = ({ card, isSelected, isRevealed }) => {
  return (
    <motion.div
      className={`relative w-32 h-48 rounded-xl ${
        isSelected ? 'ring-4 ring-yellow-400' : ''
      }`}
      animate={{
        rotateY: isRevealed ? 0 : 180,
      }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={`absolute inset-0 rounded-xl p-4 flex flex-col items-center justify-between
          ${isRevealed ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundColor: card.color }}
      >
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
      
      {/* Card Back */}
      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br from-purple-800 to-purple-600
          flex items-center justify-center ${isRevealed ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="w-16 h-16 rounded-full border-4 border-white/30" />
      </div>
    </motion.div>
  );
};