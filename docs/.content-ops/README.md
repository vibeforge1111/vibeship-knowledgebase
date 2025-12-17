# VibeShip Content Operations

Internal documentation and tools for KB content generation.

**⚠️ Internal Use Only** - This folder contains content strategy and AI prompts.

---

## Quick Start

### 1. Research Phase (Agent 1)
```
Open new Claude conversation.
Paste: .content-ops/agents/research-agent.md
Request: "Create a brief for [TOPIC] using [TEMPLATE]"
```

### 2. Writing Phase (Agent 2)
```
Open new Claude conversation.
Paste: .content-ops/agents/writer-agent.md
Request: "Create article from this brief: [PASTE BRIEF]"
```

### 3. QA Phase
```
Use: .content-ops/checklists/qa-checklist.md
Verify all items before publishing.
```

---

## Folder Structure

```
.content-ops/
├── README.md                 ← You are here
├── PIPELINE.md               ← Full workflow documentation
│
├── agents/
│   ├── research-agent.md     ← Agent 1: Research & briefs
│   └── writer-agent.md       ← Agent 2: Content writing
│
├── templates/
│   ├── vulnerability-brief.md
│   ├── tool-brief.md
│   └── stack-brief.md
│
├── references/
│   ├── vulnerability-db.md   ← OWASP/CWE data
│   ├── ai-tool-patterns.md   ← Known patterns by tool
│   └── seo-llm-guide.md      ← SEO & LLM optimization
│
└── checklists/
    └── qa-checklist.md       ← Pre-publish QA
```

---

## Content Types

| Type | Template | URL Pattern |
|------|----------|-------------|
| Vulnerability | `vulnerability-brief.md` | `/kb/security/vulnerabilities/{slug}/` |
| AI Tool | `tool-brief.md` | `/kb/vibe-coding-tools/{tool}/` |
| Stack Guide | `stack-brief.md` | `/kb/security/stacks/{stack}/` |
| Fix Prompt | (in writer-agent) | `/kb/security/fixes/{vuln}/{framework}/` |
| Glossary | (in writer-agent) | `/kb/glossary/security/{term}/` |

---

## Workflow Modes

### Mode A: Quick (Single Article, ~15 min)
1. Agent 1: Quick brief
2. Agent 2: Full article in one shot
3. Light QA review

### Mode B: Quality (Single Article, ~45 min)
1. Agent 1: Comprehensive brief
2. Agent 2: Section by section with review
3. Full QA checklist

### Mode C: Batch (Multiple Articles)
1. Agent 1: Multiple briefs in one session
2. Agent 2: Process by section type across all articles
3. Batch QA

See `PIPELINE.md` for detailed instructions.

---

## Key Documents

| Document | When to Use |
|----------|-------------|
| `PIPELINE.md` | Full workflow reference, troubleshooting |
| `writer-agent.md` | Copy into Claude for content generation |
| `research-agent.md` | Copy into Claude for research/briefs |
| `qa-checklist.md` | Before every publish |

---

## Tips

1. **Always start with research** - Bad brief = bad content
2. **Test AI fix prompts** - Don't publish untested prompts
3. **Section by section for quality** - More control, better results
4. **Use the QA checklist** - Catch issues before publishing

---

## Updates

When updating these docs:
- Keep `writer-agent.md` under 8000 tokens if possible
- Test changes on a sample article before batch processing
- Update `PIPELINE.md` if workflow changes
