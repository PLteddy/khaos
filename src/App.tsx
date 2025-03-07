import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useGameStore } from './game/store';
import { GameBoard } from './components/GameBoard';
import { MainMenu } from './components/MainMenu';
import { ResultModal } from './components/ResultModal';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const gamePhase = useGameStore((state) => state.gamePhase);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-gray-900">
        {gamePhase === 'loading' ? (
          <LoadingScreen />
        ) : gamePhase === 'menu' ? (
          <MainMenu />
        ) : (
          <GameBoard />
        )}
        <ResultModal />
      </div>
    </Router>
  );
}

export default App;
