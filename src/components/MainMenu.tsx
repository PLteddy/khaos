import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Info, Settings, Mail, Linkedin } from 'lucide-react';
import { useGameStore } from '../game/store';
import { Language } from '../game/type';
import fond from "../assets/fond.png";
import buttonsfond from "../assets/buttonsfond.png";
import column from "../assets/column.png";

const translations = {
  fr: {
    title: "Khaos",
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
7. Progressez à travers les niveaux jusqu'au boss final !
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
7. Progress through levels until the boss !
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
      <div
        className="h-screen w-screen overflow-hidden flex flex-col items-center justify-center p-8"
        style={{
          backgroundColor: "black",
          backgroundImage: `url(${fond})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold text-white mb-4 p-4">{t.title}</h1>
          <p className="text-xl text-gray-300 p-4">{t.subtitle}</p>
        </motion.div>
    
        <div className="relative w-full h-full flex items-center justify-center bg-black">
          {/* Image de gauche */}
          <div
            className="absolute left-[15%] top-0 h-[130%] w-1/3 bg-no-repeat bg-contain bg-left"
            style={{ backgroundImage: `url(${column})` }}
          ></div>
    
          <div className="relative z-10 flex flex-col items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-3 text-white font-bold w-full h-[125px] text-xl transition-colors"
              onClick={startGame}
              style={{
                backgroundImage: `url(${buttonsfond})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <Swords className="w-6 h-6" />
              {t.startGame}
            </motion.button>
    
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-3 text-white font-bold w-full h-[125px] text-xl transition-colors"
              onClick={toggleCredits}
              style={{
                backgroundImage: `url(${buttonsfond})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <Info className="w-6 h-6" />
              {t.credits}
            </motion.button>
    
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-3 text-white font-bold w-full h-[125px] text-xl transition-colors"
              onClick={toggleHowToPlay}
              style={{
                backgroundImage: `url(${buttonsfond})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <Settings className="w-6 h-6" />
              {t.options}
            </motion.button>
          </div>
    
          {/* Image de droite */}
          <div
            className="absolute right-[15%] top-0 h-[130%] w-1/3 bg-no-repeat bg-contain bg-right"
            style={{ backgroundImage: `url(${column})` }}
          ></div>
        </div>
    
        {/* Modals */}
        <AnimatePresence>
          {showCredits && (
            <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <motion.div className="bg-purple-900 p-8 rounded-xl shadow-xl max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-white mb-6">{t.creditsTitle}</h2>
                <p className="text-gray-300">{t.developer}: Yussera Sebdaoui</p>
                <p className="text-gray-300">{t.music}: Yussera Sebdaoui</p>
                <p className="text-gray-300">{t.graphics}: Yussera Sebdaoui</p>
                <button
                  onClick={toggleCredits}
                  className="mt-6 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg"
                >
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
                <button
                  onClick={() => changeLanguage('fr')}
                  className={`px-4 py-2 rounded-lg ${language === 'fr' ? 'bg-purple-600 text-white' : 'bg-purple-800 text-gray-300'}`}
                >
                  Français
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-4 py-2 rounded-lg ${language === 'en' ? 'bg-purple-600 text-white' : 'bg-purple-800 text-gray-300'}`}
                >
                  English
                </button>
                <p className="text-gray-300">{t.howToPlayText}</p>
                <button
                  onClick={toggleHowToPlay}
                  className="mt-6 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg"
                >
                  {t.close}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    
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
  }