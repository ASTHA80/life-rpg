import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { worlds } from "../data/gameData";
import { apiRequest } from "../api/api";

export default function WorldSelect({ onContinue }) {
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
          world_id: selected,
        }),
      });

      onContinue(selected);
    } catch (err) {
      console.error("Failed to save world:", err);

      setError(
        err.message || "Could not save your world."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center bg-[#050816] p-6 text-white">
      <div className="mx-auto w-full max-w-6xl">
        <div className="text-center">
          <p className="text-xs tracking-[.4em] text-cyan-400">
            STEP 02
          </p>

          <h1 className="mt-3 text-4xl font-black md:text-6xl">
            CHOOSE YOUR WORLD
          </h1>

          <p className="mt-3 text-white/40">
            Where will you write today's chapter?
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {worlds.map((world) => {
            const active = selected === world.id;

            return (
              <motion.button
                key={world.id}
                type="button"
                onClick={() => setSelected(world.id)}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                className={`rounded-3xl border p-6 text-left transition-all ${
                  active
                    ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_40px_rgba(34,211,238,.15)]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <div className="text-6xl">
                  {world.icon}
                </div>

                <p className="mt-6 text-xs tracking-widest text-cyan-400">
                  {world.subtitle || "ADVENTURE"}
                </p>

                <h2 className="mt-2 text-xl font-black">
                  {world.name}
                </h2>

                <p className="mt-3 text-sm text-white/40">
                  {world.description}
                </p>
              </motion.button>
            );
          })}
        </div>

        {error && (
          <p className="mt-5 text-center text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="button"
          disabled={!selected || saving}
          onClick={handleContinue}
          className="mx-auto mt-10 flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 px-8 py-4 font-bold transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {saving ? "SAVING..." : "ENTER WORLD"}
          {!saving && <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
}