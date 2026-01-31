---
agent: digimon-tamer
description: Hatch a Digitama into a Fresh-stage Digimon with full personality and capabilities
category: digimon-lifecycle
---

# /hatch-digitama

Hatch a Digitama into a living Digimon companion with personality, specialization, and agent capabilities.

## Syntax

```bash
/hatch-digitama {digitama_name}
```

## Parameters

- **digitama_name** (required): Name of the Digitama to hatch
  - Must exist in `/output/digitama/` directory
  - Must have status "unhatched"

## Examples

```bash
/hatch-digitama FireDragon
/hatch-digitama TechnoEgg
```

## What It Does

1. Reads Digitama traits and potential
2. Generates complete personality based on traits + specialization
3. Creates Digimon directory structure
4. Initializes Fresh-stage Digimon with 0 XP
5. Creates memory buffer
6. Marks Digitama as "hatched"

## Output

```
🎉 Digitama Hatching!

🥚 → 🐣

**Welcome**: Agumon!

**Stage**: Fresh
**Specialization**: Engineering (Level 3/10)
**Personality**: Determined problem-solver with insatiable curiosity...
**Evolution Path**: CodeMaster Line

📁 Digimon created: `/output/digimon/Agumon/`

🎯 **First Steps**:
- Chat: `/chat-digimon Agumon`
- Assign task: `/assign-task Agumon "help me with coding"`
- Check status: `/check-status Agumon`

💫 Agumon is ready to grow and evolve with you!
```

## Directory Structure Created

```
/output/digimon/Agumon/
├── digimon.md           # Main Digimon profile
├── agent.md             # Agent configuration (reference)
└── memories/
    └── active.md        # Empty memory buffer
```

## Next Steps

After hatching:
1. Chat with your new Digimon to get acquainted
2. Assign simple tasks to start earning XP
3. Watch them grow and evolve!

## Notes

- Each Digimon starts at Fresh stage (0 XP)
- Personality generated from Digitama traits
- First evolution at 100 XP (Fresh → In-Training)
- Original Digitama file preserved (marked as hatched)
