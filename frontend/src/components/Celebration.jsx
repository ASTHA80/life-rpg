import { motion } from "framer-motion";

const CONFETTI_COLORS = [
  "#a855f7",
  "#22d3ee",
  "#facc15",
  "#34d399",
  "#fb7185",
  "#60a5fa",
];

const CONFETTI = Array.from({ length: 100 }, (_, index) => ({
  id: index,
  left: (index * 37) % 100,
  endLeft: ((index * 53) % 100) - 10,
  rotation: (index * 97) % 720,
  duration: 2.5 + (index % 10) / 4,
  delay: (index % 8) / 10,
  color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
}));

function ConfettiPiece({ piece }) {
  return (
    <motion.div
      initial={{
        left: `${piece.left}vw`,
        top: "-10vh",
        rotate: 0,
        opacity: 1,
      }}
      animate={{
        left: `${piece.endLeft}vw`,
        top: "110vh",
        rotate: piece.rotation,
        opacity: [1, 1, 1, 0],
      }}
      transition={{
        duration: piece.duration,
        delay: piece.delay,
        ease: "easeIn",
      }}
      className="absolute h-5 w-2 rounded-sm md:h-7 md:w-3"
      style={{
        backgroundColor: piece.color,
      }}
    />
  );
}

export default function Celebration({
  quest,
  streak,
  onContinue,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050816]/95 px-5 backdrop-blur-md"
    >
      {/* FULL SCREEN CONFETTI */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {CONFETTI.map((piece) => (
          <ConfettiPiece
            key={piece.id}
            piece={piece}
          />
        ))}
      </div>

      {/* Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[100px]"
      />

      {/* Victory Card */}
      <motion.div
        initial={{
          scale: 0.5,
          y: 40,
        }}
        animate={{
          scale: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 12,
        }}
        className="relative z-10 text-center"
      >
        <motion.div
          animate={{
            rotate: [-8, 8, -8],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="text-7xl md:text-9xl"
        >
          🏆
        </motion.div>

        <p className="mt-5 text-sm font-bold tracking-[.4em] text-cyan-300">
          QUEST COMPLETE
        </p>

        <h1 className="mt-2 text-5xl font-black md:text-7xl">
          VICTORY!
        </h1>

        <p className="mt-3 text-white/40">
          {quest?.title}
        </p>

        {/* Rewards */}
        <div className="mt-8 flex justify-center gap-3 md:gap-4">
          <RewardCard
            icon="✨"
            value={`+${quest?.xp ?? 0}`}
            label="XP"
          />

          <RewardCard
            icon="🪙"
            value={`+${quest?.gold ?? 0}`}
            label="GOLD"
          />

          <RewardCard
            icon="🔥"
            value={`+${streak}`}
            label="STREAK"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="mt-10 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 px-9 py-4 font-black tracking-wider"
        >
          CONTINUE JOURNEY →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function RewardCard({
  icon,
  value,
  label,
}) {
  return (
    <div className="w-24 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl md:w-28">
      <div className="text-2xl">
        {icon}
      </div>

      <div className="mt-2 text-xl font-black">
        {value}
      </div>

      <div className="mt-1 text-[9px] tracking-widest text-white/30">
        {label}
      </div>
    </div>
  );
}