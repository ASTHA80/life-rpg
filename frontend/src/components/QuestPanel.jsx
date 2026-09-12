import { Clock, Coins, Sparkles, Swords } from "lucide-react";

export default function QuestPanel({
  quest,
  onStart,
}) {
  if (!quest) return null;

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-black/40 p-5 shadow-2xl backdrop-blur-xl md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-purple-300">
          <Swords size={17} />

          <span className="text-xs font-bold tracking-[.25em]">
            ACTIVE QUEST
          </span>
        </div>

        <span className="text-2xl">
          {quest.icon}
        </span>
      </div>

      <h2 className="mt-4 text-2xl font-black">
        {quest.title}
      </h2>

      <p className="mt-1 text-xs text-purple-300">
        {quest.category}
      </p>

      <p className="mt-3 text-sm text-white/45">
        {quest.description}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <Stat
          icon={<Clock size={14} />}
          value={`${quest.duration}m`}
        />

        <Stat
          icon={<Sparkles size={14} />}
          value={`+${quest.xp}`}
        />

        <Stat
          icon={<Coins size={14} />}
          value={`+${quest.gold}`}
        />
      </div>

      <button
        onClick={onStart}
        className="mt-5 w-full rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 py-3 text-sm font-black tracking-wider transition hover:scale-[1.02]"
      >
        BEGIN QUEST
      </button>
    </div>
  );
}

function Stat({ icon, value }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.04] py-3 text-center">
      <div className="flex justify-center text-white/40">
        {icon}
      </div>

      <p className="mt-1 text-sm font-bold">
        {value}
      </p>
    </div>
  );
}