import React from 'react';
import { useGameStore } from '../game/store';
import { Trophy } from 'lucide-react';

export const ScoreBoard: React.FC = () => {
  const { playerScore, aiScore, level } = useGameStore();

  return (
    <div className="bg-purple-900/60 rounded-lg p-4 mb-6 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <div className="text-center">
          <h3 className="text-white/80 text-sm">Joueur</h3>
          <p className="text-2xl font-bold text-white">{playerScore}</p>
        </div>
        <Trophy className="text-yellow-400 w-6 h-6" />
        <div className="text-center">
          <h3 className="text-white/80 text-sm">Adversaire</h3>
          <p className="text-2xl font-bold text-white">{aiScore}</p>
        </div>
      </div>
      <div className="bg-purple-800 px-4 py-2 rounded-md">
        <p className="text-white font-bold">Niveau {level}</p>
      </div>
    </div>
  );
};