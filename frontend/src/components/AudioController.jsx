import { useEffect, useRef, useState } from "react";

const SOUND_MAP = {
  riverside: "/sounds/river.mp3",
  library: "/sounds/library.mp3",
  mountain: "/sounds/mountain.mp3",
  japanese: "/sounds/japanese.mp3",
};

function AudioController({
  world = "riverside",
  playing = false,
}) {
  const audioRef = useRef(null);
  const [enabled, setEnabled] = useState(true);

  // Create/change audio when world changes
  useEffect(() => {
    const source =
      SOUND_MAP[world] || SOUND_MAP.riverside;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(source);

    audio.loop = true;
    audio.volume = 0.22;

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [world]);

  // Start/stop audio based on study session
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (enabled && playing) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [enabled, playing]);

  return (
    <button
      type="button"
      onClick={() =>
        setEnabled((value) => !value)
      }
      className="fixed right-5 top-5 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 backdrop-blur-md transition hover:bg-white/10"
      title={
        enabled
          ? "Mute ambience"
          : "Enable ambience"
      }
      aria-label={
        enabled
          ? "Mute ambience"
          : "Enable ambience"
      }
    >
      {enabled ? "🔊" : "🔇"}
    </button>
  );
}

export default AudioController;