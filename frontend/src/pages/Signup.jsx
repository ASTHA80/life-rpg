import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await signup(email, password);
      navigate("/character", { replace: true });
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#090b18] text-white flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#37215f,transparent_45%)]" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌟</div>

          <h1 className="text-4xl font-black">
            Begin your quest
          </h1>

          <p className="text-slate-400 mt-2">
            Your real life. Your RPG.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-7 shadow-2xl"
        >
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
            placeholder="At least 6 characters"
            className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-purple-400 mb-5"
          />

          <label className="block text-sm text-slate-300 mb-2">
            Confirm password
          </label>

          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Repeat password"
            className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-purple-400 mb-6"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 py-3 font-bold transition"
          >
            {loading ? "Creating..." : "Create my character"}
          </button>

          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-300 hover:text-purple-200 font-semibold"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;