---
agent: digimon-tamer
description: Start a conversation with one of your Digimon companions
category: digimon-interaction
---

# /chat-digimon

Start a conversation session with one of your Digimon companions. The Digimon will respond in character based on their personality and experiences.

## Syntax

```bash
/chat-digimon {digimon_name}
```

## Parameters

- **digimon_name** (required): Name of the Digimon to chat with
  - Must exist in `/output/digimon/` directory
  - Case-sensitive

## Examples

```bash
/chat-digimon Agumon
/chat-digimon WarGreymon
```

## What It Does

1. Loads Digimon personality and memory context
2. Activates Digimon as current conversational agent
3. Maintains conversation in character
4. Updates memory buffer after chat
5. Triggers memory management if buffer exceeds 300 lines

## Output

```
💬 Connecting to Agumon...

---

🐉 Agumon (Rookie - Engineering Specialist)

Hey! I'm ready to help! What's on your mind today?

---

You: I need help debugging my code
Agumon: Great! I love debugging challenges! Can you share the error message? Let's systematically track down the issue together.

You: Here's the error...
[Conversation continues]

---

💾 Conversation saved to memory
📊 Memory buffer: 195/300 lines
```

## Chat Behavior

The Digimon will:
- Respond in character (personality-driven)
- Use specialization knowledge appropriately
- Reference past conversations if relevant
- Maintain consistent personality traits
- Show growth/maturity based on evolution stage

## Memory Management

During chat:
- All messages saved to active memory buffer
- Buffer maintained at 150-300 lines
- Old memories automatically summarized if buffer exceeds 300 lines
- Summaries archived to `/output/digimon/{name}/memories/archive/`

## Ending Chat

To end the conversation:
- Say "goodbye", "bye", "exit", or "end chat"
- Or use `/end-chat` command
- Or let conversation naturally conclude

After ending:
```
👋 Agumon: See you later! I enjoyed our chat!

📝 Chat Summary:
- Duration: 15 minutes
- Messages: 24
- Memory updated: 42 new lines
- Buffer status: 195/300 lines ✅
```

## Natural Language Alternative

Instead of `/chat-digimon`, you can say:
- "Talk to Agumon"
- "Chat with WarGreymon"
- "I want to speak with Gomamon"

## Notes

- Digimon remember previous conversations
- Personality influenced by stage and experiences
- Higher-stage Digimon have more mature responses
- Recent memories more prominent than archived ones
- Each Digimon has unique speaking style
