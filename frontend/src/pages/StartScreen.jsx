import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function StartScreen({ onStart }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,.18),transparent_55%)]" />

      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]"
      />

      <div className="relative text-center">
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [-4, 4, -4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="text-8xl md:text-[130px]"
        >
          ⚔️
        </motion.div>

        <p className="mt-8 text-xs tracking-[.5em] text-purple-400">
          YOUR LIFE. YOUR QUEST.
        </p>

        <h1 className="mt-3 text-6xl font-black md:text-9xl">
          LIFE
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            RPG
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-white/40">
          Transform real-life goals into quests.
          Explore worlds. Earn XP. Build streaks.
          Become the hero of your own journey.
        </p>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="mx-auto mt-10 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 px-10 py-4 font-black tracking-[.15em] shadow-[0_0_50px_rgba(139,92,246,.3)]"
        >
          <Play size={20} fill="currentColor" />
          START GAME
        </motion.button>
      </div>
    </div>
  );
}