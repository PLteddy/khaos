import React, { useEffect, useState } from 'react';
import { useGameStore } from '../game/store';
import { SoundSystem } from '../game/sound';


export const LoadingScreen: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const startGame = useGameStore((state) => state.startGame);
  const goToMenu = useGameStore((state) => state.goToMenu);

  useEffect(() => {
    // Précharge la musique sans la jouer encore
    const bgMusic = SoundSystem.sounds['backgroundMusic'];
    bgMusic.load();

    // Simule un temps de chargement (tu peux ajouter d'autres ressources à charger ici)
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000); // Par exemple, 2 secondes de chargement
  }, []);

  const handleStart = () => {
    SoundSystem.play('backgroundMusic', true); // Joue la musique en boucle
    goToMenu();
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl mb-4">Chargement...</h1>
      {!isLoaded ? (
        <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full"></div>
      ) : (
        <button
          onClick={handleStart}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg mt-8"
        >
          Demarrer l'aventure
        </button>
      )}
    </div>
  );
};
