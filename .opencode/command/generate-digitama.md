---
agent: digimon-tamer
description: Generate a new Digitama (Digimon egg) with randomized traits and specialization
category: digimon-lifecycle
---

# /generate-digitama

Generate a new Digitama (Digimon egg) ready to be hatched into a Digimon companion.

## Syntax

```bash
/generate-digitama [name]
```

## Parameters

- **name** (optional): Custom name for your Digitama
  - If omitted, a creative name will be auto-generated
  - Must be valid filename (letters, numbers, `-`, `_`)

## Examples

```bash
# Generate with custom name
/generate-digitama FireDragon

# Auto-generate name
/generate-digitama
```

## What It Does

1. Creates unique Digitama with randomized traits
2. Assigns specialization tendency (one of 9 specializations)
3. Determines potential level (1-10)
4. Generates creative description
5. Saves to `/output/digitama/{name}.md`

## Output

```
✅ Digitama Generated!

**Name**: FireDragon
**ID**: 20260114_742
**Potential**: 7/10
**Specialization Tendency**: engineering (85%)
**Traits**: Determined, Analytical, Curious, Systematic, Clever

📝 Digitama saved to: `/output/digitama/FireDragon.md`

🥚 Ready to hatch! Use `/hatch-digitama FireDragon` when ready.
```

## Next Steps

After generating a Digitama:
1. Review the Digitama file to see its traits
2. Decide when to hatch (no time limit)
3. Use `/hatch-digitama {name}` to bring it to life!

## Notes

- Each Digitama is unique (randomized traits and potential)
- Potential level influences starting specialization level
- Specialization tendency guides evolution path
- Digitama can be hatched anytime (no expiration)
