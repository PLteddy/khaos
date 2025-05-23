import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Info, Settings, Mail, Linkedin } from 'lucide-react';
import { useGameStore } from '../game/store';
import { Language } from '../game/type';
import { SoundSystem } from '../game/sound';
const fond = "./fond.png";
const buttonsfond = "./buttonsfond.png";
const column = "./column.png";
const translations = {

  fr: {
    title: "Khaos",
    subtitle: "Affrontez les dieux et les heros de la mythologie grecque",
    startGame: "Commencer l'aventure",
    credits: "Credits",
    options: "Comment jouer ?",
    howToPlay: "Comment jouer",
    language: "Langue",
    close: "Fermer",
    creditsTitle: "Credits du jeu",
    developer: "Developpe par",
    music: "Musique par",
    graphics: "Graphismes par",
    contact: "Contact",
    howToPlayTitle: "Comment jouer",
    sound: "Son",
    musique: "Musique",
    on: "Activé",
    off: "Désactivé",
    howToPlayText: 
    "1. Chaque joueur commence avec un deck de 3 cartes.\n" +
    "2. À chaque tour, une règle de chaos est active.\n" +
    "3. Choisissez une carte en tenant compte de la règle.\n" +
    "4. La carte la plus forte gagne le tour.\n" +
    "5. La manche se finit quand chaque joueur n'a plus de cartes.\n" +
    "6. Gagnez des cartes en battant vos adversaires.\n" +
    "7. Progressez à travers les niveaux jusqu'au boss final !"
},
  en: {
    title: "Mythological Card Game",
    subtitle: "Face the gods and heroes of Greek mythology",
    startGame: "Start Adventure",
    credits: "Credits",
    options: "How to Play ?",
    howToPlay: "How to Play",
    language: "Language",
    close: "Close",
    creditsTitle: "Game Credits",
    developer: "Developed by",
    music: "Music by",
    graphics: "Graphics by",
    contact: "Contact",
    howToPlayTitle: "How to Play",
    sound: "Sound",
    musique: "Music",
    on: "On",
    off: "Off",
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
  className="w-screen h-screen flex items-center justify-center bg-black overflow-hidden"
>
{/* Conteneur du jeu avec redimensionnement automatique */}
<div
  className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
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
    className="text-center mb-6"
  >
    <h1 className="text-5xl font-bold text-white mb-3 p-3">{t.title}</h1>
    <p className="text-lg text-gray-300 p-3">{t.subtitle}</p>
  </motion.div>

  <div className="relative w-full h-full flex items-center justify-center bg-black">
    {/* Image de gauche */}
    <div
      className="absolute left-[12%] top-0 h-[110%] w-1/3 bg-no-repeat bg-contain bg-left hidden md:block"
      style={{ backgroundImage: `url(${column})` }}
    ></div>

    <div className="relative z-10 flex flex-col items-center justify-center gap-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center gap-3 text-white font-bold w-[300px] h-[100px] text-lg transition-colors"
        onClick={() => {
          SoundSystem.play('buttonClick'); // Son du bouton
          startGame(); // Ou l'action associée au bouton
        }}
        style={{
          backgroundImage: `url(${buttonsfond})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Swords className="w-5 h-5" />
        {t.startGame}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center gap-3 text-white font-bold w-[300px] h-[100px] text-lg transition-colors"
        onClick={() => {
          SoundSystem.play('buttonClick');
          toggleCredits(); // Ajoute les parenthèses ici
        }}
        
        style={{
          backgroundImage: `url(${buttonsfond})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Info className="w-5 h-5" />
        {t.credits}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center gap-3 text-white font-bold w-[300px] h-[100px] text-lg transition-colors"
        onClick={() => {
          SoundSystem.play('buttonClick');
          toggleHowToPlay(); // Ajoute les parenthèses ici
        }}
        
        style={{
          backgroundImage: `url(${buttonsfond})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Settings className="w-5 h-5" />
        {t.options}
      </motion.button>
    </div>

{/* Image de droite */} 
<div
  className="absolute right-[12%] top-0 h-[110%] w-1/3 bg-no-repeat bg-contain bg-right hidden md:block"
  style={{ backgroundImage: `url(${column})` }}
></div>

  </div>

  {/* Modals */}
  <AnimatePresence>
    {showCredits && (
      <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <motion.div className="bg-yellow-400 p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
          <h2 className="text-xl font-bold text-white mb-4">{t.creditsTitle}</h2>
          <p className="text-white">{t.developer}: Yussera Sebdaoui</p>
          <p className="text-white">{t.music}: Yussera Sebdaoui</p>
          <p className="text-white">{t.graphics}: Yussera Sebdaoui</p>
          <button
            onClick={() => {SoundSystem.play('buttonClick');
              toggleCredits();}}
            className="mt-4 px-4 py-2 bg-black hover:bg-yellow-600 text-white rounded-lg"
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
        <motion.div className="bg-yellow-400 p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
          <h3 className="text-lg font-bold text-white mb-3">{t.language}</h3>
          <button
             onClick={() => {SoundSystem.play('buttonClick'); changeLanguage("fr")}}
            className={`px-4 py-2 rounded-lg ${
              language === "fr" ? "bg-yellow-600 text-white" : "bg-yellow-600 text-white"
            }`}
          >
            Français
          </button>
          <pre className="text-white whitespace-pre-line">{t.howToPlayText}</pre>

          <button
             onClick={() => {SoundSystem.play('buttonClick');toggleHowToPlay();}}
            className="mt-4 px-4 py-2 bg-black hover:bg-yellow-600 text-white rounded-lg"
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
    className="mt-6 text-gray-400 text-sm"
  >
    Version 1.0.0
  </motion.div>
</div>
</div>
    );
} 