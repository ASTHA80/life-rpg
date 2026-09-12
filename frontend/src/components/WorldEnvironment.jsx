import { motion } from "framer-motion";

export default function WorldEnvironment({ world }) {
  if (world === "library") {
    return (
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[5%] top-[18%] text-7xl opacity-60 md:text-8xl">
          📚
        </div>

        <div className="absolute right-[7%] top-[15%] text-7xl opacity-50 md:text-8xl">
          📚
        </div>

        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute left-1/2 top-[20%] -translate-x-1/2 text-5xl"
        >
          🕯️
        </motion.div>

        <div className="absolute bottom-[12%] left-[8%] text-7xl md:text-8xl">
          🪑
        </div>

        <div className="absolute bottom-[12%] right-[8%] text-7xl md:text-8xl">
          🪑
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-gradient-to-t from-amber-900/20 to-transparent" />
      </div>
    );
  }

  if (world === "mountain") {
    return (
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-[12%] left-[2%] text-[110px] md:text-[170px]">
          🏔️
        </div>

        <div className="absolute bottom-[13%] right-[2%] text-[110px] md:text-[160px]">
          🏔️
        </div>

        <motion.div
          animate={{ x: [-30, 30, -30] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute left-[20%] top-[17%] text-6xl opacity-50"
        >
          ☁️
        </motion.div>

        <motion.div
          animate={{ x: [20, -20, 20] }}
          transition={{ duration: 16, repeat: Infinity }}
          className="absolute right-[20%] top-[25%] text-5xl opacity-40"
        >
          ☁️
        </motion.div>

        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-6xl">
          🏕️
        </div>
      </div>
    );
  }

  if (world === "cyber") {
    return (
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-[38%] bg-gradient-to-t from-cyan-500/15 to-transparent" />

        <div className="absolute bottom-[14%] left-[5%] text-7xl md:text-9xl">
          🏢
        </div>

        <div className="absolute bottom-[14%] right-[5%] text-7xl md:text-9xl">
          🏙️
        </div>

        <motion.div
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute right-[20%] top-[25%] text-5xl"
        >
          ✨
        </motion.div>

        <motion.div
          animate={{ opacity: [0.1, 0.7, 0.1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute left-[25%] top-[32%] text-4xl"
        >
          💠
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute bottom-[17%] left-[-4%] text-[120px] md:text-[180px]">
        🏔️
      </div>

      <div className="absolute bottom-[18%] right-[-4%] text-[110px] md:text-[170px]">
        🏔️
      </div>

      <motion.div
        animate={{ x: [-40, 40, -40] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute left-[20%] top-[14%] text-6xl opacity-60"
      >
        ☁️
      </motion.div>

      <motion.div
        animate={{ x: [30, -30, 30] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute right-[20%] top-[20%] text-5xl opacity-50"
      >
        ☁️
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-[28%] bg-gradient-to-b from-cyan-500/10 to-blue-500/30">
        <motion.div
          animate={{ x: ["-5%", "5%", "-5%"] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_18px,rgba(255,255,255,.18)_19px,transparent_20px)]"
        />
      </div>

      <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 text-7xl">
        🪵
      </div>
    </div>
  );
}