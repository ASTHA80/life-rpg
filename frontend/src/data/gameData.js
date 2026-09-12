export const characters = [
  {
    id: "boy",
    name: "Kai",
    emoji: "🧑🏻‍💻",
    description: "A focused explorer who turns knowledge into power.",
  },
  {
    id: "girl",
    name: "Mira",
    emoji: "👩🏻‍💻",
    description: "A determined adventurer who grows through every quest.",
  },
];

export const worlds = [
  {
    id: "riverside",
    name: "Moonlit Riverside",
    icon: "🌊",
    description: "Study beside a peaceful river beneath the mountains.",
    gradient: "from-cyan-950 via-blue-900 to-indigo-950",
    accent: "cyan",
    ambient: "river",
  },
  {
    id: "library",
    name: "Enchanted Library",
    icon: "📚",
    description: "Ancient books, warm lamps and endless knowledge.",
    gradient: "from-amber-950 via-orange-950 to-red-950",
    accent: "amber",
    ambient: "library",
  },
  {
    id: "mountain",
    name: "Mountain Retreat",
    icon: "🏔️",
    description: "Find your focus above the clouds.",
    gradient: "from-slate-900 via-indigo-950 to-purple-950",
    accent: "violet",
    ambient: "mountain",
  },
  {
    id: "cyber",
    name: "Neon City",
    icon: "🌃",
    description: "A futuristic city where every quest upgrades your mind.",
    gradient: "from-fuchsia-950 via-purple-950 to-slate-950",
    accent: "fuchsia",
    ambient: "cyber",
  },
];

export const defaultQuests = [
  {
    id: 1,
    title: "Warm Up",
    description: "Study for 10 minutes.",
    category: "discipline",
    duration: 10,
    xpReward: 40,
    goldReward: 15,
  },
  {
    id: 2,
    title: "Knowledge Run",
    description: "Complete one focused study session.",
    category: "intellect",
    duration: 20,
    xpReward: 75,
    goldReward: 25,
  },
  {
    id: 3,
    title: "Deep Focus",
    description: "Complete a 30-minute distraction-free session.",
    category: "discipline",
    duration: 30,
    xpReward: 120,
    goldReward: 40,
  },
  {
    id: 4,
    title: "Skill Forge",
    description: "Learn something new and practice it.",
    category: "creativity",
    duration: 45,
    xpReward: 180,
    goldReward: 60,
  },
  {
    id: 5,
    title: "Boss Preparation",
    description: "Finish your hardest study objective.",
    category: "strength",
    duration: 60,
    xpReward: 250,
    goldReward: 100,
  },
];

export const attributes = [
  {
    id: "intellect",
    name: "Intellect",
    icon: "🧠",
  },
  {
    id: "discipline",
    name: "Discipline",
    icon: "⚔️",
  },
  {
    id: "creativity",
    name: "Creativity",
    icon: "✨",
  },
  {
    id: "strength",
    name: "Strength",
    icon: "💪",
  },
];

export const inventoryItems = [
  {
    id: "focus-potion",
    name: "Focus Potion",
    icon: "🧪",
    price: 50,
    description: "A magical potion representing deep concentration.",
  },
  {
    id: "scholar-hat",
    name: "Scholar Hat",
    icon: "🎓",
    price: 100,
    description: "A badge of dedication to learning.",
  },
  {
    id: "golden-sword",
    name: "Golden Sword",
    icon: "🗡️",
    price: 200,
    description: "A legendary symbol of discipline.",
  },
  {
    id: "star-badge",
    name: "Star Badge",
    icon: "⭐",
    price: 300,
    description: "Awarded to legendary adventurers.",
  },
];

export function getLevelFromXp(xp) {
  let level = 1;
  let required = 100;

  while (xp >= required) {
    xp -= required;
    level += 1;
    required = Math.floor(100 * Math.pow(level, 1.5));
  }

  return level;
}

export function getXpForNextLevel(level) {
  return Math.floor(100 * Math.pow(level, 1.5));
}