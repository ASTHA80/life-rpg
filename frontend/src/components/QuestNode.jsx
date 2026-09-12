import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";

export default function QuestNode({
  quest,
  index,
  completed,
  active,
  locked,
  onClick,
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={locked}
      whileHover={!locked ? { scale: 1.08, y: -4 } : {}}
      whileTap={!locked ? { scale: 0.95 } : {}}
      className={`relative flex min-w-0 flex-col items-center gap-2 ${
        locked ? "cursor-not-allowed opacity-35" : ""
      }`}
    >
      <div
        className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 text-xl backdrop-blur-xl md:h-16 md:w-16 md:text-2xl ${
          completed
            ? "border-emerald-300 bg-emerald-400/20 shadow-[0_0_25px_rgba(52,211,153,.3)]"
            : active
              ? "border-purple-300 bg-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,.35)]"
              : "border-white/20 bg-black/30"
        }`}
      >
        {locked ? <Lock size={19} /> : completed ? <Check /> : quest.icon}

        {active && (
          <motion.div
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
            className="absolute inset-[-5px] rounded-full border border-purple-400"
          />
        )}
      </div>

      <span className="max-w-20 text-center text-[9px] font-bold text-white/70 md:text-xs">
        {quest.title}
      </span>

      <span className="text-[9px] text-purple-300">
        +{quest.xp} XP
      </span>

      <span className="absolute -top-5 text-[9px] text-white/20">
        {index + 1}
      </span>
    </motion.button>
  );
}