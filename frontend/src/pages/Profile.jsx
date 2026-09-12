import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AttributePanel from "../components/AttributePanel";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) return null;

  const stats = {
    intellect: user.intellect ?? 1,
    discipline: user.discipline ?? 1,
    creativity: user.creativity ?? 1,
    strength: user.strength ?? 1,
  };

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#05070b] text-white p-6 md:p-10">
      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-sm text-white/40 transition hover:text-white"
        >
          ← Back
        </button>

        {/* Profile header */}
        <div className="mb-6 rounded-3xl border border-white/[0.08] bg-[#0a0d13] p-7 shadow-2xl shadow-black/40">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">

            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-6xl shadow-[0_0_40px_rgba(255,255,255,0.04)]">
              {user.character_id === "girl"
                ? "👩🏻‍💻"
                : "🧑🏻‍💻"}
            </div>

            <div className="text-center md:text-left">
              <p className="text-[10px] font-bold tracking-[0.3em] text-white/30">
                ADVENTURER PROFILE
              </p>

              <h1 className="mt-2 break-all text-2xl font-black md:text-3xl">
                {user.email}
              </h1>

              <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
                <span className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-xs font-bold text-white/60">
                  LEVEL {user.level ?? 1}
                </span>

                <span className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-xs font-bold text-white/60">
                  {user.world_id ?? "riverside"}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Main stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0d13] p-5">
            <p className="text-[10px] font-bold tracking-[0.25em] text-white/30">
              EXPERIENCE
            </p>

            <p className="mt-2 text-3xl font-black">
              ⭐ {user.xp ?? 0}
            </p>

            <p className="mt-1 text-xs text-white/30">
              Total XP
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0d13] p-5">
            <p className="text-[10px] font-bold tracking-[0.25em] text-white/30">
              GOLD
            </p>

            <p className="mt-2 text-3xl font-black text-yellow-300">
              🪙 {user.gold ?? 0}
            </p>

            <p className="mt-1 text-xs text-white/30">
              Available currency
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0d13] p-5">
            <p className="text-[10px] font-bold tracking-[0.25em] text-white/30">
              STREAK
            </p>

            <p className="mt-2 text-3xl font-black">
              🔥 {user.streak ?? 0}
            </p>

            <p className="mt-1 text-xs text-white/30">
              Consecutive study days
            </p>
          </div>

        </div>

        {/* Attributes */}
        <div className="mt-6">
          <AttributePanel values={stats} />
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">

          <button
            onClick={() => navigate("/game")}
            className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/70 transition hover:bg-white/[0.08] hover:text-white"
          >
            ⚔️ Return to Adventure
          </button>

          <button
            onClick={() => navigate("/inventory")}
            className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/70 transition hover:bg-white/[0.08] hover:text-white"
          >
            🎒 Inventory
          </button>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-red-400/20 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/20"
          >
            Log out
          </button>

        </div>

      </div>
    </div>
  );
}

export default Profile;