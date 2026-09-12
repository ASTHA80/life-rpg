import { useEffect, useState } from "react";

function GameClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-5 left-5 z-40 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 px-4 py-2 text-white shadow-xl">
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">
        Real world
      </div>

      <div className="font-mono font-bold text-lg">
        {time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
}

export default GameClock;