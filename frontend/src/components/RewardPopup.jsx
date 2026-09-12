import { AnimatePresence, motion } from "framer-motion";

function RewardPopup({
  visible,
  xp = 0,
  gold = 0,
  streak = 0,
  onClose,
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{
              scale: 0.5,
              y: 60,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              y: 0,
              opacity: 1,
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 14,
            }}
            className="w-full max-w-md rounded-3xl border border-white/15 bg-slate-950/95 shadow-2xl p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.15,
                type: "spring",
              }}
              className="text-7xl mb-4"
            >
              🎉
            </motion.div>

            <p className="text-xs uppercase tracking-[0.35em] text-emerald-300 font-bold">
              Quest complete
            </p>

            <h2 className="text-4xl font-black mt-2">
              Victory!
            </h2>

            <div className="grid grid-cols-3 gap-3 mt-7">
              <div className="rounded-2xl bg-purple-500/10 border border-purple-400/20 p-4">
                <div className="text-2xl">⭐</div>
                <div className="text-xl font-black text-purple-300 mt-1">
                  +{xp}
                </div>
                <div className="text-xs text-slate-400">
                  XP
                </div>
              </div>

              <div className="rounded-2xl bg-yellow-500/10 border border-yellow-400/20 p-4">
                <div className="text-2xl">🪙</div>
                <div className="text-xl font-black text-yellow-300 mt-1">
                  +{gold}
                </div>
                <div className="text-xs text-slate-400">
                  Gold
                </div>
              </div>

              <div className="rounded-2xl bg-orange-500/10 border border-orange-400/20 p-4">
                <div className="text-2xl">🔥</div>
                <div className="text-xl font-black text-orange-300 mt-1">
                  {streak}
                </div>
                <div className="text-xs text-slate-400">
                  Streak
                </div>
              </div>
            </div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2 }}
              className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 rounded-full mt-7"
            />

            <button
              onClick={onClose}
              className="mt-7 w-full rounded-xl bg-purple-600 hover:bg-purple-500 py-3 font-bold transition"
            >
              Continue Adventure
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RewardPopup;