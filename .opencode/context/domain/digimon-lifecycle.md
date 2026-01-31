# Digimon Lifecycle

## Overview

The Digimon lifecycle in the Kiogreo Digimon system follows a progression from Digitama (egg) through multiple evolution stages, each representing growth in capability, personality maturity, and specialization mastery.

## Lifecycle Stages

### Stage 0: Digitama (Egg)
- **State**: Unhatched
- **Duration**: Indefinite (until user hatches)
- **Characteristics**: Potential, traits, and specialization tendency
- **Location**: `/output/digitama/{name}.md`

### Stage 1: Fresh
- **XP Required**: 0 (starting stage)
- **XP to Next**: 100
- **Characteristics**: 
  - Newborn, learning basic concepts
  - Discovering specialization
  - Minimal task capability
  - Personality just forming
- **Typical Level**: Specialization level 1-3
- **Can Perform**: Very simple tasks, conversation

### Stage 2: In-Training
- **XP Required**: 100
- **XP to Next**: 200 (300 total)
- **Characteristics**:
  - Beginning to understand their specialization
  - Developing personality traits
  - Can handle simple tasks independently
  - Learning collaboration
- **Typical Level**: Specialization level 2-4
- **Can Perform**: Simple tasks, basic assistance

### Stage 3: Rookie
- **XP Required**: 300 total
- **XP to Next**: 300 (600 total)
- **Characteristics**:
  - Competent in specialization basics
  - Distinct personality established
  - Reliable for moderate tasks
  - Good team player
- **Typical Level**: Specialization level 3-6
- **Can Perform**: Moderate complexity tasks, collaboration

### Stage 4: Champion
- **XP Required**: 600 total
- **XP to Next**: 400 (1000 total)
- **Characteristics**:
  - Skilled professional in specialization
  - Mature personality with wisdom
  - Can lead teams or work independently
  - High-quality output
- **Typical Level**: Specialization level 5-8
- **Can Perform**: Complex tasks, team leadership, mentoring

### Stage 5: Ultimate
- **XP Required**: 1000 total
- **XP to Next**: None (max stage)
- **Characteristics**:
  - Master-level specialization
  - Fully mature personality
  - Can handle any task in domain
  - Exceptional collaboration and leadership
- **Typical Level**: Specialization level 8-10
- **Can Perform**: Very complex tasks, strategic planning, system-level work

## Evolution Mechanics

### XP Accumulation
- Digimon earn XP by completing tasks
- XP amount based on task complexity and quality
- Random modifier applied: +0% to +50% of base XP
- Evolution triggers automatically when threshold reached

### Personality Maturation
Each evolution stage brings personality changes:
- **Fresh → In-Training**: Basic awareness → Beginning understanding
- **In-Training → Rookie**: Learning → Competent
- **Rookie → Champion**: Competent → Skilled professional
- **Champion → Ultimate**: Skilled → Master with wisdom

Core personality traits remain consistent, but expression matures.

### Ability Enhancement
Each evolution increases:
- **Specialization Level**: +1 to +3 points
- **Task Capacity**: Can handle more complex work
- **Collaboration**: Better teamwork and coordination
- **Autonomy**: More independent decision-making
- **Quality**: Higher standards and output quality

### Branching Paths
Evolution paths branch moderately based on specialization:
- Engineering: MechWarrior or CodeMaster lines
- Scientist: ResearchLord or DataSage lines
- Arts: CreativeSpirit or ArtMaster lines
- Politics: Diplomat or Strategist lines
- Business: Entrepreneur or Executive lines
- Data-Analysis: PatternSeeker or MetricsGuardian lines
- Creative-Writing: Storyteller or Wordsmith lines
- Support: Helper or Coordinator lines
- Research: Scholar or Investigator lines

Path influences naming and specific abilities within specialization.

## Lifecycle Management

### Hatching
- Triggered by user command
- Transforms Digitama into Fresh-stage Digimon
- Creates full file structure and agent configuration
- Initializes memory buffer
- Sets starting stats and personality

### Growth
- Continuous process through task completion
- XP accumulates with each completed task
- Memory buffer grows with interactions
- Personality deepens through experiences

### Evolution
- Automatic trigger when XP threshold met
- Updates stage, personality, and abilities
- Announces to user with celebration
- Resets XP counter for next threshold
- Logs in history

### Retirement
- Optional end-of-lifecycle action
- Moves Digimon to retired directory
- Preserves all history and memories
- Can be "unretired" if needed

## Key Concepts

### Potential
Digitama have potential levels (1-10) that influence:
- Starting specialization level
- XP gain rate (implicit through random modifiers)
- Evolution path options

### Specialization
Each Digimon has one primary specialization:
- Determines task suitability
- Influences evolution paths
- Grows from level 1-10 over time
- Defines role in collaborations

### Memory
Digimon maintain conversation history:
- Active buffer: 150-300 lines
- Older memories: Summarized and archived
- Simulates "forgetting" while preserving key events
- Provides context for interactions

### Experience (XP)
Quantifies growth and triggers evolution:
- Earned through task completion
- Random modifiers add variability
- Thresholds define evolution stages
- Reflects overall contribution and activity

## Lifecycle Philosophy

The Digimon lifecycle simulates realistic growth:
- **Organic Development**: Growth through experience, not just time
- **Personality Maturation**: Character deepens and matures naturally
- **Skill Progression**: Capabilities expand through practice
- **Meaningful Evolution**: Each stage brings significant changes
- **Individual Journeys**: Each Digimon's path is unique

This creates engaging, dynamic companions that feel alive and responsive to interaction.
