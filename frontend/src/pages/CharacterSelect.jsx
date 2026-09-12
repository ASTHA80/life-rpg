import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { characters } from "../data/gameData";
import { apiRequest } from "../api/api";

export default function CharacterSelect({ onContinue }) {
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleContinue() {
    if (!selected || saving) return;

    try {
      setSaving(true);
      setError("");

      await apiRequest("/users/me", {
        method: "PATCH",
        body: JSON.stringify({
          character_id: selected,
        }),
      });

      onContinue(selected);
    } catch (err) {
      console.error("Failed to save character:", err);

      setError(
        err.message || "Could not save your character."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] p-6 text-white">
      <div className="w-full max-w-4xl text-center">
        <Sparkles className="mx-auto mb-4 text-purple-400" />

        <p className="text-xs tracking-[.4em] text-purple-400">
          STEP 01
        </p>

        <h1 className="mt-3 text-4xl font-black md:text-6xl">
          CHOOSE YOUR HERO
        </h1>

        <p className="mt-3 text-white/40">
          Your journey begins with you.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {characters.map((character) => {
            const active = selected === character.id;

            return (
              <motion.button
                key={character.id}
                type="button"
                onClick={() => setSelected(character.id)}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                className={`relative rounded-3xl border p-8 transition-all ${
                  active
                    ? "border-purple-400 bg-purple-500/10 shadow-[0_0_50px_rgba(168,85,247,.2)]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {active && (
                  <div className="absolute right-4 top-4 text-xs text-purple-300">
                    ✓ SELECTED
                  </div>
                )}

                <motion.div
                  animate={
                    active
                      ? { y: [-6, 6, -6] }
                      : { y: 0 }
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="py-8 text-8xl"
                >
                  {character.emoji}
                </motion.div>

                <p className="text-xs tracking-[.3em] text-purple-400">
                  {character.title || "ADVENTURER"}
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  {character.name}
                </h2>

                <p className="mt-3 text-sm text-white/40">
                  {character.description}
                </p>
              </motion.button>
            );
          })}
        </div>

        {error && (
          <p className="mt-5 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="button"
          disabled={!selected || saving}
          onClick={handleContinue}
          className="mx-auto mt-10 flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 px-8 py-4 font-bold transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {saving ? "SAVING..." : "CONTINUE"}
          {!saving && <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
}