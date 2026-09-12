import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import GameBackground from "../components/GameBackground";
import WorldEnvironment from "../components/WorldEnvironment";
import GameHUD from "../components/GameHUD";
import GameCharacter from "../components/GameCharacter";
import QuestPath from "../components/QuestPath";
import StudyTimer from "../components/StudyTimer";
import Celebration from "../components/Celebration";
import AudioController from "../components/AudioController";

import { characters, worlds } from "../data/gameData";
import { apiRequest } from "../api/api";
import { useAuth } from "../context/AuthContext";

function getQuestIcon(category) {
  const icons = {
    intellect: "🧠",
    discipline: "⚔️",
    creativity: "✨",
    strength: "💪",
  };

  return icons[category] || "⭐";
}

export default function GameWorld() {
  const { user } = useAuth();

  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [completed, setCompleted] = useState(0);
  const [activeQuest, setActiveQuest] = useState(0);

  const [studying, setStudying] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [moving, setMoving] = useState(false);
  const [finished, setFinished] = useState(false);

  const [stats, setStats] = useState({
    xp: user?.xp || 0,
    level: user?.level || 1,
    gold: user?.gold || 0,
    streak: user?.streak || 0,
  });

  /* =====================================================
     LOAD QUESTS
  ===================================================== */

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        setError("");

        let data = await apiRequest("/tasks");

        /*
         * New account:
         * automatically create starter quests.
         */
        if (!data || data.length === 0) {
          const starterQuests = [
            {
              title: "Complete React Basics",
              description:
                "Study React components and JSX for 20 minutes.",
              category: "intellect",
              duration: 20,
              xp_reward: 75,
              gold_reward: 25,
            },
            {
              title: "Practice React Hooks",
              description:
                "Learn and practice useState and useEffect.",
              category: "discipline",
              duration: 20,
              xp_reward: 75,
              gold_reward: 25,
            },
            {
              title: "Build a React Component",
              description:
                "Create one reusable React component.",
              category: "creativity",
              duration: 30,
              xp_reward: 120,
              gold_reward: 40,
            },
            {
              title: "Deep Focus Session",
              description:
                "Complete a distraction-free study session.",
              category: "discipline",
              duration: 30,
              xp_reward: 120,
              gold_reward: 40,
            },
            {
              title: "Master Your Skill",
              description:
                "Finish your hardest study objective.",
              category: "strength",
              duration: 45,
              xp_reward: 180,
              gold_reward: 60,
            },
          ];

          for (const quest of starterQuests) {
            await apiRequest("/tasks", {
              method: "POST",
              body: JSON.stringify(quest),
            });
          }

          data = await apiRequest("/tasks");
        }

        const formattedTasks = data.map((task) => ({
          ...task,
          xpReward: task.xp_reward,
          goldReward: task.gold_reward,

          // Compatibility fields
          xp: task.xp_reward,
          gold: task.gold_reward,

          icon: getQuestIcon(task.category),
        }));

        setQuests(formattedTasks);

        /*
         * Count completed quests.
         */
        const completedCount =
          formattedTasks.filter(
            (task) => task.completed
          ).length;

        setCompleted(completedCount);

        /*
         * Select first unfinished quest.
         */
        const nextQuestIndex =
          formattedTasks.findIndex(
            (task) => !task.completed
          );

        if (nextQuestIndex !== -1) {
          setActiveQuest(nextQuestIndex);
        } else {
          setActiveQuest(
            Math.max(
              formattedTasks.length - 1,
              0
            )
          );
        }
      } catch (err) {
        console.error(
          "Failed to load quests:",
          err
        );

        setError(
          err.message ||
            "Could not load quests."
        );
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      loadTasks();
    }
  }, [user]);

  /* =====================================================
     CHARACTER
  ===================================================== */

  const character = useMemo(
    () =>
      characters.find(
        (item) =>
          item.id === user?.character_id
      ),
    [user?.character_id]
  );

  /* =====================================================
     WORLD
  ===================================================== */

  const world = useMemo(
    () =>
      worlds.find(
        (item) =>
          item.id === user?.world_id
      ),
    [user?.world_id]
  );

  const currentQuest = quests[activeQuest];

  /* =====================================================
     TIMER COMPLETE
  ===================================================== */

  function handleQuestComplete() {
    if (!currentQuest) return;

    /*
     * Study session has ended.
     * AudioController automatically stops
     * because studying becomes false.
     */
    setStudying(false);
    setCelebrating(true);
  }

  /* =====================================================
     COMPLETE QUEST IN DATABASE
  ===================================================== */

  async function continueJourney() {
    if (!currentQuest) return;

    /*
     * Prevent duplicate completion.
     */
    if (currentQuest.completed) {
      setCelebrating(false);
      return;
    }

    try {
      setError("");

      /*
       * REAL BACKEND REQUEST
       */
      const result = await apiRequest(
        `/tasks/${currentQuest.id}/complete`,
        {
          method: "POST",
        }
      );

      console.log(
        "REAL BACKEND REWARD:",
        result
      );

      /*
       * Update HUD using backend values.
       */
      setStats({
        xp: result.total_xp,
        level: result.level,
        gold: result.total_gold,
        streak: result.streak,
      });

      setCelebrating(false);

      /*
       * Mark quest completed locally.
       */
      setQuests((previous) =>
        previous.map((quest) =>
          quest.id === currentQuest.id
            ? {
                ...quest,
                completed: true,
              }
            : quest
        )
      );

      const newCompleted =
        completed + 1;

      setCompleted(newCompleted);

      /*
       * Character travels to next quest.
       */
      setMoving(true);

      setTimeout(() => {
        setMoving(false);

        /*
         * Find next unfinished quest
         * after the current one.
         */
        const nextIndex =
          quests.findIndex(
            (quest, index) =>
              index > activeQuest &&
              !quest.completed
          );

        if (nextIndex !== -1) {
          setActiveQuest(nextIndex);
        } else {
          /*
           * Search anywhere in the questline
           * for another unfinished quest.
           */
          const anyRemaining =
            quests.findIndex(
              (quest) =>
                quest.id !== currentQuest.id &&
                !quest.completed
            );

          if (anyRemaining !== -1) {
            setActiveQuest(anyRemaining);
          } else {
            setFinished(true);
          }
        }
      }, 1500);
    } catch (err) {
      console.error(
        "Failed to complete quest:",
        err
      );

      setCelebrating(false);

      setError(
        err.message ||
          "Could not save quest completion."
      );
    }
  }

  /* =====================================================
     LOADING SCREEN
  ===================================================== */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#03050a] text-white">
        <div className="text-center">
          <div className="animate-pulse text-6xl">
            ⚔️
          </div>

          <p className="mt-4 text-white/50">
            Loading your quests...
          </p>
        </div>
      </div>
    );
  }

  /* =====================================================
     ERROR SCREEN
  ===================================================== */

  if (error && quests.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#03050a] px-6 text-white">
        <div className="max-w-md text-center">
          <div className="text-6xl">
            ⚠️
          </div>

          <h1 className="mt-5 text-2xl font-black">
            Quest loading failed
          </h1>

          <p className="mt-3 text-red-300">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-6 rounded-xl border border-white/[0.08] bg-[#0a0d13] px-6 py-3 font-bold text-white/80 transition hover:bg-[#11161f]"
          >
            TRY AGAIN
          </button>
        </div>
      </div>
    );
  }

  /* =====================================================
     NO QUESTS
  ===================================================== */

  if (quests.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#03050a] text-white">
        <div className="text-center">
          <div className="text-6xl">
            📜
          </div>

          <h1 className="mt-5 text-3xl font-black">
            No quests yet
          </h1>

          <p className="mt-3 text-white/40">
            Create your first real-life quest.
          </p>
        </div>
      </div>
    );
  }

  /* =====================================================
     FINISHED SCREEN
  ===================================================== */

  if (finished) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#03050a] px-6 text-white">

        <GameBackground
          world={world?.id}
        />

        <div className="relative z-10 max-w-xl text-center">

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-8xl"
          >
            🏆
          </motion.div>

          <p className="mt-6 text-xs font-bold tracking-[.4em] text-cyan-300/70">
            CHAPTER COMPLETE
          </p>

          <h1 className="mt-3 text-5xl font-black md:text-7xl">
            YOU DID IT.
          </h1>

          <p className="mt-5 text-white/40">
            You completed your questline in{" "}
            {world?.name}.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">

            <FinalStat
              value={stats.xp}
              label="TOTAL XP"
            />

            <FinalStat
              value={stats.gold}
              label="GOLD"
            />

            <FinalStat
              value={quests.length}
              label="QUESTS"
            />

          </div>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-10 rounded-xl border border-white/[0.08] bg-[#0a0d13] px-8 py-4 font-black text-white/90 shadow-2xl shadow-black/60 transition hover:bg-[#11161f]"
          >
            PLAY AGAIN
          </button>

        </div>
      </div>
    );
  }

  /* =====================================================
     MAIN GAME
  ===================================================== */

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03050a] text-white">

      {/* =================================================
          AUDIO
          
          Ambience plays ONLY while studying.
          Backend is not involved.
      ================================================= */}

      <AudioController
        world={world?.id}
        playing={studying}
      />

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <GameBackground
        world={world?.id}
      />

      {/* =================================================
          WORLD ANIMATION
      ================================================= */}

      <WorldEnvironment
        world={world?.id}
      />

      {/* =================================================
          TOP HUD
      ================================================= */}

      <div className="relative z-50">

        <GameHUD
          level={stats.level}
          xp={stats.xp}
          maxXp={500}
          gold={stats.gold}
          streak={stats.streak}
        />

      </div>

      {/* =================================================
          WORLD TITLE
      ================================================= */}

      <div className="absolute left-1/2 top-28 z-20 -translate-x-1/2 text-center">

        <p className="text-[9px] tracking-[.4em] text-white/25">
          CURRENT WORLD
        </p>

        <h1 className="mt-1 whitespace-nowrap text-lg font-black text-white/80 md:text-2xl">
          {world?.icon}{" "}
          {world?.name}
        </h1>

      </div>

      {/* =================================================
          CHARACTER
      ================================================= */}

      <div className="absolute bottom-[31%] left-0 right-0 z-30 h-20">

        <GameCharacter
          emoji={character?.emoji}
          position={activeQuest}
          moving={moving}
        />

      </div>

      {/* =================================================
          QUEST PATH
      ================================================= */}

      <div className="absolute bottom-[18%] left-0 right-0 z-20 opacity-80">

        <QuestPath
          quests={quests}
          completed={completed}
          activeQuest={activeQuest}
          onSelect={setActiveQuest}
        />

      </div>

      {/* =================================================
          NOT STUDYING
      ================================================= */}

      {!studying && !celebrating && (

        <div className="absolute bottom-6 left-0 right-0 z-40 flex justify-center px-4">

          <button
            type="button"
            onClick={() =>
              setStudying(true)
            }
            className="rounded-xl border border-white/[0.08] bg-[#070a10]/95 px-8 py-3 font-black text-white/80 shadow-2xl shadow-black/70 backdrop-blur-md transition hover:bg-[#10151c] hover:text-white"
          >
            START QUEST
          </button>

        </div>

      )}

      {/* =================================================
          STUDY MODE
          
          QUEST CARD
          ↓
          CIRCULAR TIMER
      ================================================= */}

      {studying && currentQuest && (

        <motion.div
          initial={{
            opacity: 0,
            y: -25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="fixed left-1/2 top-[86px] z-[70] flex -translate-x-1/2 flex-col items-center"
        >

          {/* QUEST CARD */}

          <div className="w-[350px] rounded-2xl border border-white/[0.07] bg-[#05070c]/98 px-5 py-4 text-center shadow-2xl shadow-black/80 backdrop-blur-md">

            <div className="text-xl">
              {currentQuest.icon}
            </div>

            <h2 className="mt-1 text-lg font-black text-white">
              {currentQuest.title}
            </h2>

            <p className="mt-1 text-xs leading-relaxed text-white/40">
              {currentQuest.description}
            </p>

            <div className="mt-3 flex justify-center gap-2">

              <span className="rounded-lg border border-white/[0.06] bg-[#0a0d13] px-3 py-1 text-[10px] font-bold text-white/50">
                +{currentQuest.xpReward} XP
              </span>

              <span className="rounded-lg border border-white/[0.06] bg-[#0a0d13] px-3 py-1 text-[10px] font-bold text-white/50">
                +{currentQuest.goldReward} GOLD
              </span>

            </div>

          </div>

          {/* CIRCULAR TIMER */}

          <div className="mt-3 rounded-2xl border border-white/[0.06] bg-[#03050a]/98 px-5 py-4 shadow-2xl shadow-black/90">

            <StudyTimer
              key={currentQuest.id}
              duration={currentQuest.duration}
              onComplete={
                handleQuestComplete
              }
            />

          </div>

        </motion.div>

      )}

      {/* =================================================
          CELEBRATION
      ================================================= */}

      <AnimatePresence>

        {celebrating && (

          <Celebration
            quest={currentQuest}
            streak={stats.streak + 1}
            onContinue={
              continueJourney
            }
          />

        )}

      </AnimatePresence>

      {/* =================================================
          ERROR TOAST
      ================================================= */}

      {error && (

        <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-xl border border-red-400/20 bg-[#12090b]/95 px-5 py-3 text-sm text-red-300 shadow-2xl shadow-black/70">
          {error}
        </div>

      )}

    </div>
  );
}

/* =====================================================
   FINAL STAT
===================================================== */

function FinalStat({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#080b11]/95 p-4 shadow-xl shadow-black/40">

      <div className="text-2xl font-black">
        {value}
      </div>

      <div className="mt-1 text-[9px] tracking-widest text-white/30">
        {label}
      </div>

    </div>
  );
}