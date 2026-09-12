import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);

      const destination = location.state?.from || "/character";
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#090b18] text-white flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#29315f,transparent_45%)]" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">⚔️</div>

          <h1 className="text-4xl font-black tracking-tight">
            LIFE RPG
          </h1>

          <p className="text-slate-400 mt-2">
            Continue your real-life adventure
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-7 shadow-2xl"
        >
          <h2 className="text-2xl font-bold mb-6">
            Welcome back
          </h2>

          {error && (
            <div className="mb-5 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <label className="block text-sm text-slate-300 mb-2">
            Email
          </label>

          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-purple-400 mb-5"
          />

          <label className="block text-sm text-slate-300 mb-2">
            Password
          </label>

          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-purple-400 mb-6"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 py-3 font-bold transition"
          >
            {loading ? "Entering..." : "Enter the world"}
          </button>

          <p className="text-center text-sm text-slate-400 mt-6">
            New adventurer?{" "}
            <Link
              to="/signup"
              className="text-purple-300 hover:text-purple-200 font-semibold"
            >
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;