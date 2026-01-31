---
agent: digimon-tamer
description: Assign a task to a specific Digimon or get automatic delegation suggestion
category: digimon-tasks
---

# /assign-task

Assign a task to a Digimon companion. Can specify a particular Digimon or let the system recommend the best match.

## Syntax

```bash
# Assign to specific Digimon
/assign-task {digimon_name} "{task_description}"

# Auto-delegate (system finds best match)
/assign-task "{task_description}"
```

## Parameters

- **digimon_name** (optional): Specific Digimon to assign task to
- **task_description** (required): Clear description of the task
  - Use quotes if description contains spaces
  - Be specific about requirements

## Examples

```bash
# Specific assignment
/assign-task Agumon "Review this code for bugs"
/assign-task WarGreymon "Design the authentication system"

# Auto-delegation
/assign-task "Write documentation for the API"
/assign-task "Analyze sales data and create visualization"
```

## What It Does

### Specific Assignment
1. Verifies Digimon exists and is available
2. Checks if task matches Digimon's specialization
3. Assigns task and tracks execution
4. Awards XP with random modifier upon completion
5. Checks for evolution trigger

### Auto-Delegation
1. Analyzes task requirements
2. Scans all available Digimon
3. Evaluates matches based on specialization and capabilities
4. Recommends best match with reasoning
5. Asks for confirmation before assignment

## Output

### Specific Assignment
```
✅ Task Assigned: Agumon

**Task**: Review this code for bugs
**Specialization Match**: Engineering (Perfect match!)
**Estimated XP**: 45-68 (base 45 + random modifier)

🚀 Agumon is working on it...

[Task execution]

✅ Task Complete!

**Result**: {task_outcome}
**Quality**: Excellent
**XP Earned**: +52 XP (base 45 + 16% modifier)

📊 Agumon Progress:
- XP: 180/300 → 232/300 (77%)
- Tasks Completed: 7 → 8
```

### Auto-Delegation
```
🎯 Finding Best Match...

**Recommended**: WarGreymon

**Why**:
- Specialization: Engineering (Level 7/10) - Perfect match for system design
- Evolution Stage: Champion (experienced)
- Recent work: 12 tasks completed, 98% success rate
- Match Score: 175/200

**Estimated XP**: 75-112 (base 75 + random modifier)

**Proceed with WarGreymon?** [Yes/No]
```

## Task Complexity Detection

System automatically detects complexity:

**Simple** (10-30 XP):
- Basic questions, simple assistance
- Any Rookie+ can handle

**Moderate** (30-60 XP):
- Standard development work, research
- Rookie+ with matching specialization

**Complex** (60-100 XP):
- System design, major features
- Champion+ recommended

**Very Complex** (100+ XP):
- Architecture, large-scale work
- Champion/Ultimate required
- May suggest collaboration

## Collaboration Suggestions

If task is very complex:
```
⚠️ Complex Task Detected

This task may benefit from collaboration:
- Engineering: WarGreymon
- Data-Analysis: MetalGarurumon

Would you like to:
1. Assign to WarGreymon alone
2. Create collaboration team
3. Simplify task requirements
```

## Natural Language Alternative

Instead of `/assign-task`, you can say:
- "Ask Agumon to help me with coding"
- "I need help with data analysis" (auto-delegates)
- "Have WarGreymon review my architecture"

## XP and Evolution

After task completion:
- Base XP calculated by complexity
- Random modifier applied: +0% to +50%
- Quality bonus if exceptional work: +20-50%
- Evolution automatically triggered if threshold reached

## Notes

- Tasks should match Digimon capabilities
- Auto-delegation finds optimal matches
- Complex tasks may require collaboration
- XP variability adds excitement and unpredictability
- Task history tracked for each Digimon
