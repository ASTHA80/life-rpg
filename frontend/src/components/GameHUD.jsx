import { Coins, Flame, Star } from "lucide-react";

export default function GameHUD({
  level = 1,
  xp = 0,
  maxXp = 1000,
  gold = 0,
  streak = 0,
}) {
  const percentage = Math.min((xp / maxXp) * 100, 100);

  return (
    <div className="absolute left-0 right-0 top-0 z-40 p-4 md:p-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 text-xl">
            ⚔️
          </div>

          <div className="hidden sm:block">
            <p className="text-[10px] tracking-[.25em] text-white/40">
              LIFE RPG
            </p>

            <p className="font-black">LEVEL {level}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-yellow-400/20 bg-black/30 px-3 py-2 backdrop-blur-md">
            <Coins size={15} className="text-yellow-300" />
            <span className="text-sm font-bold">{gold}</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-orange-400/20 bg-black/30 px-3 py-2 backdrop-blur-md">
            <Flame size={15} className="text-orange-400" />
            <span className="text-sm font-bold">{streak}</span>
          </div>

          <div className="hidden items-center gap-2 rounded-xl border border-purple-400/20 bg-black/30 px-3 py-2 backdrop-blur-md md:flex">
            <Star size={15} className="text-purple-300" />
            <span className="text-sm font-bold">
              {xp}/{maxXp}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-md">
        <div className="mb-1 flex justify-between text-[10px] text-white/40">
          <span>LEVEL {level}</span>
          <span>{Math.round(percentage)}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full border border-white/10 bg-black/40">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}