import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Info, Settings, Mail, Linkedin } from 'lucide-react';
import { useGameStore } from '../game/store';
import { Language } from '../game/type';

const translations = {
  fr: {
    title: "Mythological Card Game",
    subtitle: "Affrontez les dieux et les héros de la mythologie grecque",
    startGame: "Commencer l'aventure",
    credits: "Crédits",
    options: "Options",
    howToPlay: "Comment jouer",
    language: "Langue",
    close: "Fermer",
    creditsTitle: "Crédits du jeu",
    developer: "Développé par",
    music: "Musique par",
    graphics: "Graphismes par",
    contact: "Contact",
    howToPlayTitle: "Comment jouer",
    howToPlayText: `
1. Chaque joueur commence avec 3 cartes
2. À chaque tour, une règle de chaos est active
3. Choisissez une carte en tenant compte de la règle
4. La carte la plus forte gagne le tour
5. Le premier à gagner 2 tours remporte le niveau
6. Gagnez des cartes en battant vos adversaires
7. Progressez à travers les niveaux jusqu'à Zeus !
    `
  },
  en: {
    title: "Mythological Card Game",
    subtitle: "Face the gods and heroes of Greek mythology",
    startGame: "Start Adventure",
    credits: "Credits",
    options: "Options",
    howToPlay: "How to Play",
    language: "Language",
    close: "Close",
    creditsTitle: "Game Credits",
    developer: "Developed by",
    music: "Music by",
    graphics: "Graphics by",
    contact: "Contact",
    howToPlayTitle: "How to Play",
    howToPlayText: `
1. Each player starts with 3 cards
2. Each turn has an active chaos rule
3. Choose a card considering the rule
4. The strongest card wins the turn
5. First to win 2 turns wins the level
6. Win cards by defeating opponents
7. Progress through levels until Zeus!
    `
  }
};

export const MainMenu: React.FC = () => {
  // ✅ Sélectionne uniquement les valeurs nécessaires
  const startGame = useGameStore(state => state.startGame);
  const language = useGameStore(state => state.language);
  const showCredits = useGameStore(state => state.showCredits);
  const showHowToPlay = useGameStore(state => state.showHowToPlay);
  
  const t = translations[language];

  // ✅ Utilisation de useCallback pour éviter la recréation des fonctions à chaque rendu
  const toggleCredits = useCallback(() => {
    useGameStore.setState(state => ({ showCredits: !state.showCredits }));
  }, []);

  const toggleHowToPlay = useCallback(() => {
    useGameStore.setState(state => ({ showHowToPlay: !state.showHowToPlay }));
  }, []);

  const changeLanguage = useCallback((lang: Language) => {
    useGameStore.setState({ language: lang });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-gray-900 flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-bold text-white mb-4">{t.title}</h1>
        <p className="text-xl text-gray-300">{t.subtitle}</p>
      </motion.div>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
          onClick={startGame}
        >
          <Swords className="w-6 h-6" />
          {t.startGame}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
          onClick={toggleCredits}
        >
          <Info className="w-6 h-6" />
          {t.credits}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-3 bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
          onClick={toggleHowToPlay}
        >
          <Settings className="w-6 h-6" />
          {t.options}
        </motion.button>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showCredits && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div className="bg-purple-900 p-8 rounded-xl shadow-xl max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-white mb-6">{t.creditsTitle}</h2>
              <p className="text-gray-300">{t.developer}: John Doe</p>
              <p className="text-gray-300">{t.music}: Jane Smith</p>
              <p className="text-gray-300">{t.graphics}: Alex Johnson</p>
              <button onClick={toggleCredits} className="mt-6 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg">
                {t.close}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHowToPlay && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div className="bg-purple-900 p-8 rounded-xl shadow-xl max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-white mb-4">{t.language}</h3>
              <button onClick={() => changeLanguage('fr')} className={`px-4 py-2 rounded-lg ${language === 'fr' ? 'bg-purple-600 text-white' : 'bg-purple-800 text-gray-300'}`}>Français</button>
              <button onClick={() => changeLanguage('en')} className={`px-4 py-2 rounded-lg ${language === 'en' ? 'bg-purple-600 text-white' : 'bg-purple-800 text-gray-300'}`}>English</button>
              <p className="text-gray-300">{t.howToPlayText}</p>
              <button onClick={toggleHowToPlay} className="mt-6 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg">
                {t.close}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 text-gray-400 text-sm">
        Version 1.0.0
      </motion.div>
    </div>
  );
};
