import { motion, AnimatePresence } from "framer-motion";

function LevelUp({ level, visible, onClose }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.5, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5 }}
            className="text-center bg-slate-950 border border-yellow-300/30 rounded-3xl p-10 shadow-2xl"
          >
            <div className="text-7xl mb-5">🌟</div>

            <p className="text-yellow-300 uppercase tracking-[0.3em] text-sm font-bold">
              Level Up
            </p>

            <h2 className="text-5xl font-black mt-2">
              Level {level}
            </h2>

            <p className="text-slate-400 mt-3">
              Your character has grown stronger.
            </p>

            <button
              onClick={onClose}
              className="mt-7 px-7 py-3 rounded-xl bg-yellow-500 text-black font-black hover:bg-yellow-400"
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LevelUp;