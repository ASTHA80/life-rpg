import { useNavigate } from "react-router-dom";
import QuestCreator from "../components/QuestCreator";

function QuestCreate() {
  const navigate = useNavigate();

  function createQuest(quest) {
    const existing =
      JSON.parse(localStorage.getItem("study_game_custom_quests") || "[]");

    localStorage.setItem(
      "study_game_custom_quests",
      JSON.stringify([
        ...existing,
        {
          ...quest,
          id: `custom-${Date.now()}`,
        },
      ])
    );

    navigate("/game");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-400 hover:text-white mb-8"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-black mb-2">
          Forge a Quest
        </h1>

        <p className="text-slate-400 mb-8">
          Turn something you need to do into an RPG mission.
        </p>

        <QuestCreator onCreate={createQuest} />
      </div>
    </div>
  );
}

export default QuestCreate;