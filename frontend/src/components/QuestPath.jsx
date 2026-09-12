import { motion } from "framer-motion";
import QuestNode from "./QuestNode";

export default function QuestPath({
  quests,
  completed,
  activeQuest,
  onSelect,
}) {
  const progress =
    quests.length <= 1
      ? 0
      : (completed / (quests.length - 1)) * 100;

  return (
    <div className="relative mx-auto w-full max-w-5xl px-4">
      <div className="absolute left-[8%] right-[8%] top-7 h-1 rounded-full bg-white/10 md:top-8" />

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(progress, 100)}%` }}
        transition={{ duration: 0.8 }}
        className="absolute left-[8%] top-7 h-1 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 md:top-8"
      />

      <div className="relative flex justify-between gap-2">
        {quests.map((quest, index) => (
          <QuestNode
            key={quest.id}
            quest={quest}
            index={index}
            completed={index < completed}
            active={index === activeQuest}
            locked={index > completed}
            onClick={() => {
              if (index <= completed) {
                onSelect(index);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}