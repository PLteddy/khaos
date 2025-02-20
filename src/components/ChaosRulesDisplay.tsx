import React from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../game/store";
import kaosImage from "../assets/kaossfond.png";

export const ChaosRuleDisplay: React.FC = () => {
  const { currentRule } = useGameStore();

  if (!currentRule) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-lg p-6 text-center mb-8 overflow-hidden"
    >
      {/* Image en fond */}
      <img
        src={kaosImage}
        alt="Kaos"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Contenu avec fond semi-transparent pour lisibilité */}
      <div className="relative z-10 p-4 ">
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">
          {currentRule.name}
        </h2>
        <p className="text-white/90">{currentRule.description}</p>
      </div>
    </motion.div>
  );
};
