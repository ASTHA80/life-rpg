import { motion } from "framer-motion";

export default function CircularProgress({
  progress = 0,
  time = "00:00",
}) {
  const radius = 82;
  const circumference = 2 * Math.PI * radius;

  const safeProgress = Math.min(
    100,
    Math.max(0, progress)
  );

  const offset =
    circumference -
    (safeProgress / 100) * circumference;

  return (
    <div className="relative h-48 w-48">

      {/* DARK CIRCULAR BODY */}
      <div className="absolute inset-0 rounded-full bg-[#03050a] shadow-[0_10px_45px_rgba(0,0,0,0.8)]" />

      {/* SVG RING */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full -rotate-90"
      >
        {/* OUTER SUBTLE RING */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="9"
        />

        {/* ACTIVE PROGRESS RING */}
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{
            strokeDashoffset: offset,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        />
      </svg>

      {/* INNER DARK CIRCLE */}
      <div className="absolute inset-[13px] flex flex-col items-center justify-center rounded-full border border-white/[0.04] bg-[#06080d]">

        <span className="text-[9px] font-bold tracking-[0.35em] text-white/30">
          FOCUS
        </span>

        <span className="mt-1 font-mono text-4xl font-black tracking-tight text-white">
          {time}
        </span>

        <span className="mt-1 text-[8px] font-medium tracking-[0.25em] text-white/20">
          STUDY TIME
        </span>

      </div>
    </div>
  );
}