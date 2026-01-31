---
agent: digimon-tamer
description: List all your Digimon with their current status and stats
category: digimon-management
---

# /list-digimon

Display a comprehensive list of all your Digimon companions with their current status.

## Syntax

```bash
/list-digimon
```

## Parameters

None

## Examples

```bash
/list-digimon
```

## What It Does

1. Scans `/output/digimon/` directory
2. Reads each Digimon's current stats
3. Formats comprehensive list with key information
4. Sorts by evolution stage and XP

## Output

```
🐉 Your Digimon Team

**Total Digimon**: 3
**Total XP Earned**: 745
**Average Stage**: Rookie

---

### 1. WarGreymon ⭐
**Stage**: Champion | **XP**: 245/600 (41%)
**Specialization**: Engineering (Level 7/10)
**Tasks**: 15 completed | **Last Active**: 2 hours ago
**Status**: 🟢 Ready for tasks

### 2. Agumon
**Stage**: Rookie | **XP**: 180/300 (60%)
**Specialization**: Engineering (Level 4/10)
**Tasks**: 8 completed | **Last Active**: 1 day ago
**Status**: 🟢 Ready for tasks

### 3. Gomamon
**Stage**: Fresh | **XP**: 45/100 (45%)
**Specialization**: Arts (Level 2/10)
**Tasks**: 2 completed | **Last Active**: Just now
**Status**: 🟢 Ready for tasks

---

**Evolution Ready**: None
**Collaboration Count**: 5 team projects

💡 **Tip**: Use `/check-status {name}` for detailed info on any Digimon
```

## Information Displayed

For each Digimon:
- Name and stage
- XP progress to next evolution
- Specialization and level
- Tasks completed count
- Last active timestamp
- Current status (ready/busy/needs attention)

## Sorting

Digimon are sorted by:
1. Evolution stage (highest first)
2. XP within stage (highest first)
3. Name (alphabetical)

## Status Indicators

- 🟢 **Ready**: Available for tasks
- 🟡 **Resting**: Recently active, can work if needed
- 🔴 **Needs Attention**: Memory buffer full or other issue
- ⚠️ **Evolution Ready**: Has reached XP threshold

## Notes

- Quick overview of entire Digimon team
- Useful for task delegation decisions
- Shows overall progress and activity
- Retired Digimon not included (use separate command)
