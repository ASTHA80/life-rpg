import { useState } from "react";

function QuestCreator({ onCreate }) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(25);
  const [category, setCategory] = useState("intellect");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) return;

    const quest = {
      title: title.trim(),
      description: `Complete ${title.trim()}.`,
      duration: Number(duration),
      category,
      xpReward: Math.max(20, Number(duration) * 4),
      goldReward: Math.max(10, Math.floor(Number(duration) * 1.5)),
    };

    onCreate?.(quest);

    setTitle("");
    setDuration(25);
    setCategory("intellect");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black/25 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
    >
      <h3 className="text-xl font-bold mb-4">
        Create a quest
      </h3>

      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="e.g. Complete React hooks"
        className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 mb-3 outline-none focus:border-purple-400"
      />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <input
          type="number"
          min="1"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
          className="rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
        >
          <option value="intellect">🧠 Intellect</option>
          <option value="discipline">⚔️ Discipline</option>
          <option value="creativity">✨ Creativity</option>
          <option value="strength">💪 Strength</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-purple-600 hover:bg-purple-500 py-3 font-bold"
      >
        + Add Quest
      </button>
    </form>
  );
}

export default QuestCreator;