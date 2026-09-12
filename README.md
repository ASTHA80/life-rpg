# ⚔️ LIFE RPG

### **Turn your real-life goals into an adventure.**

> **Study. Complete quests. Earn XP. Level up. Keep moving.**

**Life RPG** is a full-stack productivity game that transforms real-world study goals into RPG-style quests.

Instead of treating productivity like another checklist, Life RPG turns focused work into a progression system where every completed quest contributes to your character, rewards, attributes, streak, and journey.

---

## 🎮 THE IDEA

Traditional productivity apps usually tell you:

> **“You have tasks left to complete.”**

Life RPG asks:

> **“What is your next quest?”**

Your real-world study goals become quests.

```text
Real-world goal
      ↓
   ⚔️ QUEST
      ↓
 ⏱️ FOCUS SESSION
      ↓
 ✅ COMPLETION
      ↓
 ┌────┴────┐
 ↓         ↓
⭐ XP     🪙 GOLD
 ↓         ↓
LEVEL    INVENTORY
      ↓
🧠 ATTRIBUTE PROGRESS
      ↓
🔥 KEEP GOING
```

The goal is not simply to make productivity _look_ like a game.

The goal is to make completing real-world work **feel like progressing through one**.

---

# 🌎 THE ADVENTURE

## 🧑 Choose Your Character

Begin your journey by selecting your adventurer.

Your selected character becomes part of your persistent player profile.

---

## 🗺️ Choose Your World

Enter an environment designed to make focused work feel more immersive.

Current environments include:

- 🌊 **Moonlit Riverside** — peaceful water and mountain surroundings
- 📚 **Enchanted Library** — a warm environment built around knowledge
- 🏔️ **Mountain Retreat** — a quiet place above the clouds
- 🌸 **Japanese-inspired environments** — calm, minimal scenery for focused study

The environment changes the atmosphere while the core objective remains the same:

### **Focus on the quest.**

---

# ⚔️ QUEST SYSTEM

Real study objectives become RPG-style quests.

Example quests:

```text
⚔️ WARM UP
Study for 10 minutes.

🧠 KNOWLEDGE RUN
Complete one focused study session.

🔥 DEEP FOCUS
Complete a distraction-free session.

✨ SKILL FORGE
Learn something new and practice it.

💪 BOSS PREPARATION
Complete your hardest study objective.
```

The application supports creating and managing quests through the backend.

---

# ⏱️ FOCUS MODE

When a quest begins, Life RPG enters a dedicated study experience.

The player gets:

- ⏱️ Circular focus timer
- 📊 Visual study progress
- ▶️ Start / pause controls
- ⚔️ Quest completion
- ⭐ XP rewards
- 🪙 Gold rewards
- 🔥 Streak progression
- 🧠 Attribute progression

The focus timer provides a dedicated space for completing the current quest instead of turning the experience into another ordinary task list.

---

# 🏆 RPG PROGRESSION

Every completed quest contributes to your character's progression.

## ⭐ XP & Levels

Completing quests awards XP.

Life RPG uses a **non-linear leveling system**, increasing the amount of XP required as the player's level grows.

```text
Complete Quest
      ↓
   Earn XP
      ↓
Level Progress
      ↓
  Level Up
```

---

## 🪙 Gold

Quests also provide Gold.

Gold can be used in the virtual shop to purchase collectible items.

---

## 🧠 Attributes

Quest categories contribute to RPG-style attributes:

| Attribute     | Represents                      |
| ------------- | ------------------------------- |
| 🧠 Intellect  | Learning and knowledge          |
| ⚔️ Discipline | Consistency and focus           |
| ✨ Creativity | Experimentation and learning    |
| 💪 Strength   | Completing difficult objectives |

Your character gradually develops as you complete different types of quests.

---

## 🔥 Streaks

Consistent activity contributes to your study streak.

The streak is maintained as part of the player's server-side game state.

---

# 🎒 INVENTORY & SHOP

Earn Gold through quests and spend it on virtual items.

Current collectible items include:

```text
🧪 Focus Potion
🎓 Scholar Hat
🗡️ Golden Sword
⭐ Star Badge
```

Inventory data is associated with the authenticated player and stored through the backend.

---

# 🔐 FULL-STACK ARCHITECTURE

Life RPG is built as a real full-stack application rather than a frontend-only mockup.

```text
                    ┌──────────────────────┐
                    │      LIFE RPG        │
                    │   React + Vite UI    │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │       FastAPI        │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        🔐 Authentication   ⚔️ Quests       🎒 Inventory
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                    ┌──────────────────────┐
                    │        SQLite        │
                    │  Persistent Storage   │
                    └──────────────────────┘
```

### Architecture layers

**Frontend**

Handles the game interface, navigation, character/world selection, quests, timer, progression visuals and inventory experience.

**Backend**

Provides authenticated REST APIs for users, quests, game progression and inventory.

**Database**

Stores persistent player and game data so important progression is not dependent only on browser state.

---

# 🔒 AUTHENTICATION & SECURITY

Life RPG includes a dedicated authentication system.

Implemented authentication functionality includes:

- User registration
- User login
- JWT-based authentication
- Protected frontend routes
- Password hashing
- Authenticated API requests
- User-specific data
- Resource ownership checks

Sensitive environment configuration is kept outside the repository.

Only the example environment configuration is committed.

---

# 💾 PERSISTENT GAME STATE

Player progression is stored on the backend.

The game maintains information such as:

```text
PLAYER
│
├── Character
├── World
├── XP
├── Level
├── Gold
├── Streak
│
├── Attributes
│   ├── Intellect
│   ├── Discipline
│   ├── Creativity
│   └── Strength
│
├── Quests
│   ├── Active
│   └── Completed
│
└── Inventory
    └── Purchased Items
```

### Refresh the page.

### Your game state remains.

This server-side persistence is one of the key differences between Life RPG and a localStorage-only productivity prototype.

---

# 🔄 CORE GAME LOOP

```text
        ┌─────────────────┐
        │  CREATE ACCOUNT │
        └────────┬────────┘
                 ↓
        ┌─────────────────┐
        │      LOGIN      │
        └────────┬────────┘
                 ↓
        ┌─────────────────┐
        │ CHOOSE CHARACTER│
        └────────┬────────┘
                 ↓
        ┌─────────────────┐
        │   CHOOSE WORLD  │
        └────────┬────────┘
                 ↓
        ┌─────────────────┐
        │   ACCEPT QUEST  │
        └────────┬────────┘
                 ↓
        ┌─────────────────┐
        │   FOCUS MODE    │
        └────────┬────────┘
                 ↓
        ┌─────────────────┐
        │ COMPLETE QUEST  │
        └────────┬────────┘
                 ↓
       ┌─────────┴─────────┐
       ↓                   ↓
   ⭐ XP REWARD        🪙 GOLD REWARD
       ↓                   ↓
    LEVEL             🎒 INVENTORY
       │
       └─────────┬─────────┘
```
