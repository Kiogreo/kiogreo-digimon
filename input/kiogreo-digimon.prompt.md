# Kiogreo Digimon

An LLM AI orchestration framework that enables me to simulate a Digimon-like virtual pet fantasy within the Kiogreo Ecosystem

## Why?

For **FUN** obviously, I also want this to be able to help in certain way. I'm thinking of each Digimon have a specialization trait that will be tied to real world skills such as engineering, scientist, arts, politic & so on.

## The Concept

1. AI generate Digitama
   1. AI generate a new prompt for the Digitama & save them into **Digitama Document**
2. I tell AI to hatch the Digitama
   1. AI generate a new prompt that includes personality with their specialization & save them into **Digimon Document**
   2. AI then generate a new AI subagent that will act as the newly generated Digimon based on their **Digimon Document**
3. I want to chat with the digimon
   1. AI main will change into AI subagent that embodies the Digimon so that I can talk to them as if I'm talking to the Digimon directly
   2. After the chat the subagent will save the chat context into the **Memory Document** as memory for future chat
   3. AI main agent will make sure the context is within 150 - 300 lines as buffer for the memory (Digimon can forget about their past memories)
4. I want to ask them to do something for me
   1. AI main will change into AI subagent that embodies the Digimon so that I can talk to them as if I'm talking to the Digimon directly
   2. If the Digimon does not have a good specialization for that specific task, he'll ask other Digimon to help or suggest them to me
   3. In reality, this action is just the main AI checking other **Digimon Document** to find out the best Digimon that can help with said task
5. Each **Digimon** will generate certain amount of XP once they completed their task
   1. Once their XP reach a certain level, they will trigger a **Digivolution**

## Minimum Viable Product (MVP)

### Digitama

1. Digitama Generator
2. Digitama Hatcher

### Digimon

1. Digimon Evolver
2. Personality Generator
3. Specialization Generator

### Config

1. Digitama Config
2. Evolution Config
3. Personality Config
4. Specialization Config

## Good To Have

1. ODO Personality Randomizer
2. Specialization Randomizer
3. Evolution Randomizer

# Input

Certain input can be taken from the content of a file. For this kind of input, it must be put inside the `/input` folder.

# Output

Any output that is meant to be written into a file must be put within the `/output` folder.
