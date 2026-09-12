import { motion } from "framer-motion";

export default function GameCharacter({
  emoji = "👩‍💻",
  position = 0,
  moving = false,
}) {
  const leftPosition = 8 + position * 21;

  return (
    <motion.div
      animate={{
        left: `${leftPosition}%`,
        y: moving ? [-5, -18, 0] : [-4, 4, -4],
        scale: moving ? [1, 1.08, 1] : 1,
      }}
      transition={{
        left: {
          duration: 1.4,
          ease: "easeInOut",
        },
        y: {
          duration: moving ? 0.7 : 2.5,
          repeat: moving ? 1 : Infinity,
          ease: "easeInOut",
        },
      }}
      className="absolute bottom-0 z-30 -translate-x-1/2"
    >
      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400/20 blur-2xl" />

      <div className="relative text-6xl drop-shadow-[0_0_25px_rgba(168,85,247,.4)] md:text-7xl">
        {emoji}
      </div>
    </motion.div>
  );
}