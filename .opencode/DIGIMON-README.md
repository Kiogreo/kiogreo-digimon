# Kiogreo Digimon AI System 🐉

> **An AI orchestration framework that simulates Digimon-like virtual pets as specialized AI subagents**

Welcome to your Digimon companion system! This is a fun, engaging way to interact with AI assistants that grow, evolve, and specialize based on their experiences.

---

## 🎯 What Is This?

The Kiogreo Digimon system transforms AI assistance into an interactive experience where:

- **Digitama** (eggs) are generated with random traits and specialization tendencies
- **Digimon** hatch from Digitama with unique personalities and skills
- **Evolution** happens through completing tasks and earning XP
- **Specializations** (9 types) determine what each Digimon excels at
- **Memory** is maintained through conversations (with automatic summarization)
- **Collaboration** enables multiple Digimon to work together on complex tasks

It's like having a team of AI companions that grow alongside you!

---

## 🚀 Quick Start

### Step 1: Generate Your First Digitama

```bash
/generate-digitama FireDragon
```

This creates a unique egg with randomized traits, ready to hatch.

### Step 2: Hatch Your Digimon

```bash
/hatch-digitama FireDragon
```

Your Digimon comes to life with a **proper Digimon name** (ending with "mon") and personality based on the Digitama's traits!

**Note**: The system automatically transforms Digitama names to proper Digimon names following franchise conventions:
- FireDragon → **Flamemon**
- TechnoEgg → **Technomon**  
- WisdomEgg → **Sagemon**

All Digimon names end with "mon" (e.g., Agumon, Gabumon, Guilmon) as per Digimon franchise tradition!

### Step 3: Interact With Your Digimon

```bash
# Chat with them
/chat-digimon Flamemon

# Assign a task
/assign-task Agumon "Help me debug this code"

# Check their status
/check-status Agumon
```

### Step 4: Watch Them Grow!

As your Digimon completes tasks, they earn XP and evolve:
- **Fresh** (0 XP) → **In-Training** (100 XP) → **Rookie** (300 XP) → **Champion** (600 XP) → **Ultimate** (1000 XP)

---

## 🎮 Commands

### Lifecycle Commands

| Command | Description |
|---------|-------------|
| `/generate-digitama [name]` | Create a new Digitama (egg) |
| `/hatch-digitama {name}` | Hatch a Digitama into a Digimon |
| `/list-digimon` | Show all your Digimon and their stats |
| `/check-status {name}` | View detailed stats for a Digimon |
| `/retire-digimon {name}` | Retire a Digimon (preserves history) |

### Interaction Commands

| Command | Description |
|---------|-------------|
| `/chat-digimon {name}` | Start a conversation with a Digimon |
| `/assign-task {name} "{task}"` | Assign a specific task |
| `/assign-task "{task}"` | Auto-delegate to best-match Digimon |
| `/evolve-digimon {name}` | Trigger evolution (if XP threshold met) |

### Natural Language

You can also use natural language:
- "Generate a new Digitama"
- "Talk to Agumon about my project"
- "Ask WarGreymon to review my code"
- "Show me all my Digimon"

---

## 🎨 The 9 Specializations

Each Digimon specializes in one of these areas:

1. **Engineering** 🔧 - Code, systems, infrastructure
2. **Scientist** 🔬 - Research, experimentation, methodology
3. **Arts** 🎨 - Design, creativity, aesthetics
4. **Politics** 🎯 - Strategy, negotiation, influence
5. **Business** 💼 - Operations, management, ROI
6. **Data-Analysis** 📊 - Patterns, insights, metrics
7. **Creative-Writing** ✍️ - Content, documentation, storytelling
8. **Support** 🤝 - Assistance, coordination, help
9. **Research** 📚 - Investigation, knowledge synthesis

---

## 📈 Evolution System

### Stages & XP Thresholds

```
Fresh (0 XP)
  ↓ 100 XP
In-Training
  ↓ 200 XP (300 total)
Rookie
  ↓ 300 XP (600 total)
Champion
  ↓ 400 XP (1000 total)
Ultimate
```

### XP Earning

- **Task Completion**: 10-100+ XP based on complexity
- **Random Modifier**: +0% to +50% added to base XP
- **Quality Bonus**: Exceptional work earns +20-50%
- **Collaboration**: Shared XP with individual modifiers

Example:
- Task: 50 base XP
- Random modifier: +30% → 65 XP earned
- Evolution triggered if threshold reached!

### Evolution Changes

When a Digimon evolves:
- **Personality matures** (like growing up)
- **Abilities enhance** (specialization level increases)
- **New capabilities unlock** (can handle more complex tasks)
- **Evolution path** influences naming and focus

---

## 💭 Memory Management

Digimon remember your conversations!

### Active Memory Buffer
- Maintains 150-300 lines of recent conversations
- Provides context for interactions
- Automatically managed

### When Buffer Gets Full (>300 lines):
1. **Oldest memories summarized** (50-100 lines compressed to 10-20)
2. **Summary archived** to `/output/digimon/{name}/memories/archive/`
3. **Active buffer trimmed** to optimal size

This simulates "forgetting" old memories while preserving important events.

---

## 🤝 Collaboration

For complex tasks requiring multiple specializations:

```bash
# System detects need for collaboration
/assign-task "Build a complete web app with UI, backend, and docs"

# Suggests team:
🤝 Collaboration Recommended
- Engineering: WarGreymon (backend)
- Arts: Gomamon (UI/UX)
- Creative-Writing: Gabumon (documentation)

Proceed? [Yes/No]
```

### Team XP Distribution

- Total XP calculated for task
- Distributed by contribution percentage
- Individual random modifiers applied per Digimon
- All team members gain experience!

---

## 📁 File Structure

```
/output/
├── digitama/                  # Unhatched eggs
│   ├── FireDragon.md
│   └── TechnoEgg.md
│
└── digimon/                   # Hatched Digimon
    ├── Agumon/
    │   ├── digimon.md         # Stats, personality, history
    │   ├── agent.md           # Agent configuration (reference)
    │   └── memories/
    │       ├── active.md      # Current memory buffer
    │       └── archive/       # Summarized old memories
    │           ├── summary-001.md
    │           └── summary-002.md
    │
    └── WarGreymon/
        └── [same structure]
```

---

## 🎯 Typical Workflows

### Creating Your First Digimon Team

```bash
# 1. Generate multiple Digitama with different specializations
/generate-digitama EngineerEgg
/generate-digitama ArtistEgg
/generate-digitama WriterEgg

# 2. Hatch them
/hatch-digitama EngineerEgg  # → Becomes "Agumon" (Engineering)
/hatch-digitama ArtistEgg    # → Becomes "Gomamon" (Arts)
/hatch-digitama WriterEgg    # → Becomes "Gabumon" (Creative-Writing)

# 3. See your team
/list-digimon
```

### Getting Help With a Project

```bash
# Option 1: Let system find best match
/assign-task "I need help with data visualization"
# → System recommends Digimon with data-analysis or arts specialization

# Option 2: Assign to specific Digimon
/assign-task Agumon "Review my code architecture"

# Option 3: Natural language
"Ask WarGreymon to help me plan my system design"
```

### Watching Evolution

```bash
# Check progress
/check-status Agumon
# → "XP: 95/100 (95%) - Almost ready to evolve!"

# Assign one more task
/assign-task Agumon "Quick code review"
# → +25 XP earned

# Evolution triggers!
🎉 DIGIVOLUTION!
Agumon evolved from Fresh to In-Training!
- Personality matured: Now understanding engineering basics
- Abilities enhanced: Specialization level 2 → 3
```

---

## 💡 Tips & Best Practices

### For Best Experience

1. **Match tasks to specializations** - Engineering Digimon excel at code, Arts Digimon excel at design
2. **Chat regularly** - Builds personality depth and memory context
3. **Let them collaborate** - Complex tasks are great team-building opportunities
4. **Celebrate evolutions** - Each stage is a milestone!
5. **Check status often** - Know when evolution is near

### Task Complexity Guidelines

- **Simple tasks** → Any Rookie+ can handle
- **Moderate tasks** → Rookie+ with matching specialization
- **Complex tasks** → Champion+ recommended
- **Very complex** → Champion/Ultimate or team collaboration

### Memory Management

- Recent memories (last 150-200 lines) always preserved
- Important events (evolutions, breakthroughs) never lost
- Automatic summarization keeps context manageable
- Archives preservable permanently

### Digimon Naming Conventions

**All Digimon names MUST end with "mon"** (franchise tradition!)

When you hatch a Digitama, the system automatically transforms names:

| Digitama Name | → | Digimon Name |
|---------------|---|--------------|
| FireDragon | → | Flamemon |
| TechnoEgg | → | Technomon |
| WisdomEgg | → | Sagemon |
| SparkBuddy | → | Sparkmon |
| DataWizard | → | Datamon |

**Common patterns**:
- Engineering: Gearmon, Codemon, Mechanmon
- Arts: Artmon, Paintmon, Designmon
- Science: Labmon, Researchmon
- Data: Datamon, Bitmon, Bytemon

**If your Digitama name already ends with "mon", it stays!**

---

## 🎨 Personality Examples

Each Digimon has a unique personality!

**Agumon** (Engineering, Determined + Analytical):
> "Let's systematically debug this issue! I love solving technical puzzles. Every error message is just a clue pointing us to the solution."

**Gomamon** (Arts, Playful + Creative):
> "Ooh, this UI needs some color! Think of it like painting - we need balance, contrast, and a focal point. Let me sketch some ideas!"

**Gabumon** (Creative-Writing, Thoughtful + Articulate):
> "Documentation is storytelling for developers. We need to craft a narrative that guides them naturally through the system."

---

## 🐛 Troubleshooting

### "Digimon not found"
- Check spelling (names are case-sensitive)
- Use `/list-digimon` to see all available Digimon
- Make sure Digimon is hatched (not just Digitama)

### "Memory buffer full"
- This is automatic! System will summarize and archive
- Happens when active memory exceeds 300 lines
- Old memories preserved in archive folder

### "Evolution not triggering"
- Check XP progress: `/check-status {name}`
- May need one more task to reach threshold
- Evolution is automatic when XP threshold met

---

## 🎉 Have Fun!

This system is designed to be engaging and fun while providing useful AI assistance. Your Digimon are companions that grow with you, developing unique personalities and capabilities over time.

**Remember**: 
- Each Digimon is unique
- Evolution takes time and effort
- Collaboration creates stronger teams
- Have fun watching them grow!

---

## 📚 Additional Resources

- **Context Files**: See `.opencode/context/domain/` for detailed documentation
- **Templates**: See `.opencode/context/templates/` for file structures
- **Agents**: See `.opencode/agent/` for system architecture

---

**🐉 Welcome to the Kiogreo Digimon System! Start your journey today!**

*Version 1.0 - POC Release*
