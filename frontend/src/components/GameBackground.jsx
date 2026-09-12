import { motion } from "framer-motion";

export default function GameBackground({ world = "river" }) {
  const backgrounds = {
    river: "from-sky-950 via-indigo-950 to-emerald-950",
    library: "from-indigo-950 via-purple-950 to-black",
    mountain: "from-slate-950 via-blue-950 to-indigo-950",
    cyber: "from-[#050014] via-purple-950 to-cyan-950",
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-gradient-to-b ${
        backgrounds[world] || backgrounds.river
      }`}
    >
      <motion.div
        animate={{
          x: ["-15%", "15%", "-15%"],
          y: ["0%", "5%", "0%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-48 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[140px]"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.5)_100%)]" />

      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute left-[15%] top-[25%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_#22d3ee]"
      />

      <motion.div
        animate={{ opacity: [0.1, 0.5, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute right-[20%] top-[35%] h-1.5 w-1.5 rounded-full bg-purple-300 shadow-[0_0_15px_#a855f7]"
      />
    </div>
  );
}