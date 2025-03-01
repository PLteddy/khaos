import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useGameStore } from './game/store';
import { GameBoard } from './components/GameBoard';
import { MainMenu } from './components/MainMenu';
import { ResultModal } from './components/ResultModal';
import { SoundSystem } from './game/sound';

function App() {
  const gamePhase = useGameStore((state) => state.gamePhase);

  useEffect(() => {
    // ✅ Ne lance la musique de fond qu'une seule fois lors du chargement initial
    SoundSystem.play('backgroundMusic', true);

    // Nettoie la musique quand le composant est démonté (optionnel)
    return () => SoundSystem.stop('backgroundMusic');
  }, []); // Le tableau vide [] garantit que cela ne s'exécute qu'une seule fois

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-gray-900">
        {gamePhase === 'menu' ? <MainMenu /> : <GameBoard />}
        <ResultModal />
      </div>
    </Router>
  );
}

export default App;
