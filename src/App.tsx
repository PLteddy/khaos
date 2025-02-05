import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { GameScene } from './game/GameScene';

function App() {
  useEffect(() => {
    // Configuration du jeu Phaser
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1024, // Largeur optimale pour une bonne lisibilité
      height: 768, // Hauteur optimale pour l'affichage des cartes
      parent: 'game-container',
      backgroundColor: '#2d2d2d',
      scene: GameScene,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
    };

    // Création de l'instance du jeu
    const game = new Phaser.Game(config);

    // Nettoyage lors du démontage du composant
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 flex flex-col items-center justify-center p-4">
      {/* Titre du jeu avec effet de texte */}
      <h1 className="text-5xl font-bold text-white mb-8 text-center tracking-wider">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
          Chaos Card Game
        </span>
      </h1>
      
      {/* Container du jeu avec ombre et bordure */}
      <div 
        id="game-container" 
        className="rounded-xl overflow-hidden shadow-2xl border-4 border-indigo-600/30"
      />
      
      {/* Instructions du jeu */}
      <div className="mt-6 text-gray-300 text-center max-w-2xl">
        <p className="text-sm">
          Jouez vos cartes stratégiquement et adaptez-vous aux règles du chaos pour remporter la victoire !
          <br />
          Premier à 10 points gagne la partie.
        </p>
      </div>
    </div>
  );
}

export default App;