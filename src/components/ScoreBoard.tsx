import React from 'react';
import { useGameStore } from '../game/store';
import { Trophy } from 'lucide-react';

interface ScoreBoardProps {
  className?: string;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ className = '' }) => {
  const { playerScore, aiScore, level } = useGameStore();

  return (
    <div className={`bg-transparent rounded-lg p-2 sm:p-4 mb-4 sm:mb-6 flex flex-col items-center space-y-2 sm:space-y-4 ${className}`}>
      <div className="flex flex-col items-center space-y-2 sm:space-y-4">
        <div className="bg-purple-800 px-3 sm:px-4 py-1 sm:py-2 rounded-md">
          <p className="text-white font-bold">
            <span className="hidden sm:inline">Niveau </span>
            {level}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-white/80 text-xs sm:text-sm">Joueur</h3>
          <p className="text-xl sm:text-2xl font-bold text-white">{playerScore}</p>
        </div>
        <Trophy className="text-yellow-400 w-4 h-4 sm:w-6 sm:h-6" />
        <div className="text-center">
          <h3 className="text-white/80 text-xs sm:text-sm">Adversaire</h3>
          <p className="text-xl sm:text-2xl font-bold text-white">{aiScore}</p>
        </div>
      </div>
    </div>
  );
};