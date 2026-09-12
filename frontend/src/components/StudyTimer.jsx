import { useEffect, useRef, useState } from "react";
import { Flag, Pause, Play } from "lucide-react";
import CircularProgress from "./CircularProgress";

const DEMO_MODE = true;

export default function StudyTimer({
  duration = 10,
  onComplete,
}) {
  const realSeconds = Math.max(1, duration * 60);
  const demoSeconds = Math.max(10, duration);

  const totalSeconds = DEMO_MODE
    ? demoSeconds
    : realSeconds;

  const [secondsLeft, setSecondsLeft] =
    useState(totalSeconds);

  const [running, setRunning] = useState(false);

  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    if (secondsLeft !== 0) return;
    if (completedRef.current) return;

    completedRef.current = true;
    setRunning(false);

    onCompleteRef.current?.();
  }, [secondsLeft]);

  const progress =
    totalSeconds > 0
      ? ((totalSeconds - secondsLeft) /
          totalSeconds) *
        100
      : 0;

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (secondsLeft % 60)
    .toString()
    .padStart(2, "0");

  function finishEarly() {
    if (completedRef.current) return;

    completedRef.current = true;
    setRunning(false);
    setSecondsLeft(0);

    onCompleteRef.current?.();
  }

  return (
    <div className="relative flex flex-col items-center">

      {/* DEMO LABEL */}
      {DEMO_MODE && (
        <div className="mb-3 rounded-lg border border-white/[0.06] bg-[#080b10] px-3 py-1 text-[9px] font-bold tracking-[.2em] text-white/30 shadow-inner">
          DEMO MODE • {duration} MIN
        </div>
      )}

      {/* DARK CLOCK */}
      <div className="rounded-full border border-white/[0.06] bg-[#05070b] p-2 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
        <CircularProgress
          progress={progress}
          time={`${minutes}:${seconds}`}
        />
      </div>

      {/* CONTROLS */}
      <div className="mt-4 flex items-center gap-2">

        <button
          type="button"
          onClick={() =>
            setRunning((value) => !value)
          }
          className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-[#0b0f16] px-6 py-2.5 text-sm font-bold text-white/80 shadow-lg shadow-black/50 transition hover:bg-[#111720]"
        >
          {running ? (
            <>
              <Pause size={16} />
              PAUSE
            </>
          ) : (
            <>
              <Play
                size={16}
                fill="currentColor"
              />
              START STUDY
            </>
          )}
        </button>

        <button
          type="button"
          onClick={finishEarly}
          title="Complete quest"
          className="rounded-lg border border-white/[0.07] bg-[#080c12] px-3 py-2.5 text-white/40 transition hover:bg-[#111720] hover:text-white/80"
        >
          <Flag size={16} />
        </button>

      </div>
    </div>
  );
}