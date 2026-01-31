# XP System

## Overview

The Experience Point (XP) system tracks Digimon growth and triggers evolution. XP is earned through task completion, with random modifiers adding variability and excitement.

## XP Earning

### Base XP by Task Complexity

**Simple Tasks** (10-30 XP):
- Basic assistance
- Straightforward questions
- Simple content review
- Routine operations

**Moderate Tasks** (30-60 XP):
- Standard development work
- Research tasks
- Content creation
- Process optimization

**Complex Tasks** (60-100 XP):
- System design
- Major features
- Comprehensive analysis
- Strategic planning

**Very Complex Tasks** (100+ XP):
- Architecture design
- Large-scale refactoring
- Complex integrations
- Multi-phase projects

### Random Modifier System

**Formula**: `final_xp = base_xp * (1 + random(0, 0.5))`

**Example Calculations**:
- Task: 50 base XP
- Random: 0.30 (30%)
- Final: 50 * 1.30 = 65 XP

- Task: 100 base XP
- Random: 0.15 (15%)
- Final: 100 * 1.15 = 115 XP

**Why Random Modifiers**:
- Adds unpredictability and excitement
- Simulates real-world variable rewards
- Makes each task feel unique
- Prevents monotonous progression
- Keeps evolution timing dynamic

### Quality Bonuses

High-quality work earns bonus XP:
- **Excellent**: +20% base XP
- **Outstanding**: +30% base XP
- **Exceptional**: +50% base XP

Applied before random modifier.

### Collaboration XP

When Digimon collaborate:
1. Calculate total task XP
2. Apply team random modifier
3. Distribute by contribution percentage
4. Apply individual random modifier per Digimon

Example:
- Task: 100 base XP
- Team modifier: +40% → 140 XP total
- 3 Digimon, equal contribution (33.3% each):
  - Digimon A: 46.7 * 1.25 = 58 XP
  - Digimon B: 46.7 * 1.10 = 51 XP
  - Digimon C: 46.7 * 1.35 = 63 XP

## Evolution Thresholds

### XP Requirements by Stage

| From Stage | To Stage | XP Needed | Total XP |
|-----------|----------|-----------|----------|
| Fresh | In-Training | 100 | 100 |
| In-Training | Rookie | 200 | 300 |
| Rookie | Champion | 300 | 600 |
| Champion | Ultimate | 400 | 1000 |

### Threshold Behavior

- Evolution triggers automatically when threshold met
- XP counter resets for next stage
- Excess XP carries over
- Example: Reach 320 XP at In-Training → Evolve to Rookie with 20 XP

## XP Tracking

Each Digimon tracks:
- **Current XP**: Progress toward next evolution
- **Total XP Earned**: Lifetime accumulation
- **Tasks Completed**: Count of finished tasks
- **Average XP per Task**: Performance metric

Stored in Digimon document:
```yaml
xp: 245              # Current XP toward next stage
total_xp_earned: 545 # Lifetime total
tasks_completed: 12  # Total tasks
avg_xp: 45.4         # Average per task
```

## XP Display

### In Status Checks
```
**XP**: 245 / 300 (Next: Rookie)
Progress: [=========>         ] 82%
```

### After Task Completion
```
✅ Task Complete: {task_name}
📊 XP Earned: +52 XP (base 40 + 30% random modifier)
📈 Progress: 245/300 → 297/300 (99%)
⚠️ Almost ready to evolve!
```

### At Evolution
```
🎉 DIGIVOLUTION!
{Name} has evolved from In-Training to Rookie!
Total XP Earned: 300 XP
New Threshold: 300 XP to Champion
```

## XP Philosophy

The XP system is designed to:

**1. Reward Effort**
- Completing tasks = growth
- More complex tasks = more growth
- Quality work = bonus growth

**2. Add Excitement**
- Random modifiers create surprise
- Evolution timing varies
- Each Digimon's journey unique

**3. Encourage Activity**
- Regular task completion = steady progress
- Collaboration = shared growth
- Variety of tasks = diverse experience

**4. Simulate Realism**
- Not all work rewards equally
- Some tasks teach more than others
- Growth is not perfectly linear

## Special XP Events

### Milestones
First time achieving something:
- **First Task**: +10 bonus XP
- **First Collaboration**: +20 bonus XP
- **First Complex Task**: +30 bonus XP

### Achievements
Exceptional performance:
- **Perfect Quality**: +50 bonus XP
- **Speed Record**: +25 bonus XP
- **Innovation**: +40 bonus XP

### Learning
New skills or domains:
- **New Skill Area**: +15 bonus XP
- **Cross-Specialization**: +25 bonus XP

## XP Management

### Viewing XP
- `/check-status {name}` - See current XP
- `/list-digimon` - See all Digimon XP
- Natural: "How much XP does Agumon have?"

### Manual XP Awards
For exceptional circumstances:
- User can manually award bonus XP
- Useful for special contributions
- Should be rare and meaningful

### XP Adjustments
If needed for balance:
- Can adjust base XP values
- Can modify random range
- Can add/remove bonuses
- Document changes in history

## Best Practices

**For Task Assignment**:
- Assign tasks appropriate to Digimon level
- Challenge promotes faster growth
- But avoid tasks far above capability

**For Evolution Planning**:
- Monitor XP regularly
- Prepare for evolutions in advance
- Celebrate evolution moments

**For Collaboration**:
- Ensure fair XP distribution
- Consider contribution levels
- Apply individual modifiers

The XP system creates a dynamic, rewarding progression that keeps Digimon development engaging and unpredictable.
