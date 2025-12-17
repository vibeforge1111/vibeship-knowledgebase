# Parallel Content Pipeline

**5 Terminal System: 2 Research + 2 Writers + 1 QA Agent**

---

## Quick Start

### Terminal 1: Research Agent #1
```bash
cd ~/Desktop/vibeship-knowledgebase
claude
```
Then: "Start as Research Agent #1" (paste prompt from `terminals/T1-RESEARCH.md`)

### Terminal 1B: Research Agent #2
```bash
cd ~/Desktop/vibeship-knowledgebase
claude
```
Then: "Start as Research Agent #2" (paste prompt from `terminals/T1B-RESEARCH.md`)

### Terminal 2: Writer Agent #1
```bash
cd ~/Desktop/vibeship-knowledgebase
claude
```
Then: "Start as Writer Agent #1" (paste prompt from `terminals/T2-WRITER.md`)

### Terminal 3: Writer Agent #2
```bash
cd ~/Desktop/vibeship-knowledgebase
claude
```
Then: "Start as Writer Agent #2" (paste prompt from `terminals/T3-WRITER.md`)

### Terminal 4: QA Agent
```bash
cd ~/Desktop/vibeship-knowledgebase
claude
```
Then: "Start as QA Agent" (paste prompt from `terminals/T4-QA.md`)

---

## How It Works

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         PARALLEL CONTENT PIPELINE                             │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  T1 RESEARCH #1       BRIEFS           T2 WRITER         T4 QA              │
│  ┌──────────┐       ┌────────┐       ┌──────────┐      ┌──────────┐         │
│  │Research 1│──────▶│ READY  │──────▶│ Writer 1 │─────▶│    QA    │         │
│  └──────────┘       ├────────┤       └──────────┘      │  Agent   │         │
│                     │ READY  │              │          └──────────┘         │
│  T1B RESEARCH #2    ├────────┤              │               │               │
│  ┌──────────┐       │ READY  │              ▼               ▼               │
│  │Research 2│──────▶├────────┤         Writes          Fact-checks          │
│  └──────────┘       │ READY  │         article         Validates            │
│       │             └────────┘         commits         Sources              │
│       ▼                  ▲                              Approves            │
│  Both research           │                                │                 │
│  in parallel             │         T3 WRITER              │                 │
│                          │        ┌──────────┐            │                 │
│                          └───────▶│ Writer 2 │────────────┘                 │
│                                   └──────────┘                              │
│                                                                              │
│  Flow: Research ──▶ Brief (READY) ──▶ Writer (IN_PROGRESS) ──▶ QA ──▶ DONE │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## The Briefs Folder

Location: `docs/.content-ops/briefs/`

### File Naming
```
{slug}-brief.md
```

Examples:
- `nextjs-supabase-brief.md`
- `missing-rate-limiting-brief.md`

### Status Values (in frontmatter)

| Status | Meaning | Who Sets It |
|--------|---------|-------------|
| `RESEARCHING` | Research agent is working on it | Research Agent |
| `READY` | Research complete, available for claim | Research Agent |
| `IN_PROGRESS` | Writer is working on it | Writer Agent |
| `REVIEW` | Article written, needs QA | Writer Agent |
| `REVISION` | QA found issues, needs fixes | QA Agent |
| `DONE` | QA approved, article published | QA Agent |

---

## Terminal Roles

### Terminal 1 & 1B: Research Agents

**Reads:** QUEUE.md, references/, existing articles
**Writes:** Brief files to `briefs/` folder
**Never Does:** Write article prose, create Svelte components

**Two Research Agents** work in parallel to keep briefs flowing to writers.

**Workflow:**
1. Check QUEUE.md for next pending items
2. Check `briefs/` folder - skip items other agent is researching
3. Create placeholder brief with status `RESEARCHING` immediately
4. Research using web search, file reading, existing docs
5. Update brief to status `READY`
6. Immediately start next research (don't wait)

**Coordination:**
- T1 and T1B must check for existing `RESEARCHING` briefs before starting
- First to create placeholder owns that article
- If conflict: earlier `created_at` timestamp wins

**Commands:**
- `Research next` - Research next queue item (skip other agent's work)
- `Research 3` - Research next 3 items in parallel
- `Status` - Show all briefs and their status

---

### Terminal 2 & 3: Writer Agents

**Reads:** Brief files, VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md, existing articles
**Writes:** Svelte components, commits to git
**Never Does:** Research new data, change brief content

**Workflow:**
1. Check `briefs/` folder for `READY` or `REVISION` briefs
2. **IMMEDIATELY** claim by changing status to `IN_PROGRESS`
3. Write full article following writer skill
4. Commit and push
5. Update brief to `REVIEW` for QA Agent
6. Claim next brief (or fix if QA returns with `REVISION`)

**Commands:**
- `Claim next` - Find and claim next READY brief
- `Status` - Show all briefs
- `Fix {slug}` - Address QA revision notes

---

### Terminal 4: QA Agent

**Reads:** Completed articles, briefs, external sources for fact-checking
**Writes:** QA reports, status updates
**Never Does:** Write new content (only flag issues)

**Workflow:**
1. Check `briefs/` folder for `REVIEW` status
2. Run full QA checklist (fact-check, links, SEO, accuracy)
3. Either:
   - **PASS:** Set status to `DONE`, article is published
   - **FAIL:** Set status to `REVISION` with issues list
4. Move to next `REVIEW` brief

**Commands:**
- `QA next` - QA the next article in REVIEW status
- `QA {slug}` - QA specific article
- `Fact check {slug}` - Just verify claims
- `Status` - Show all briefs

---

## Claiming Protocol (CRITICAL)

To prevent two writers working on the same article:

### Step 1: Check Status
```markdown
# Open the brief file
# Check frontmatter:
status: READY  ← Only claim if READY
```

### Step 2: Claim Immediately
```yaml
status: IN_PROGRESS
claimed_by: Writer Agent Terminal 2  # or Terminal 3
claimed_at: 2024-12-17T10:30:00Z
```

### Step 3: Save Before Writing
Save the file BEFORE starting to write. This prevents race conditions.

### Conflict Resolution
If you open a brief and it's already `IN_PROGRESS`:
- Check `claimed_by` - if it's the other terminal, skip it
- Check `claimed_at` - if >2 hours old with no article, you may reclaim
- Move to next `READY` brief

---

## Output Paths

| Content Type | File Path |
|--------------|-----------|
| Vulnerability | `src/routes/kb/security/vulnerabilities/{slug}/+page.svelte` |
| AI Tool | `src/routes/kb/vibe-coding-tools/{slug}/+page.svelte` |
| Stack Guide | `src/routes/kb/security/stacks/{slug}/+page.svelte` |
| Checklist | `src/routes/kb/security/checklists/{slug}/+page.svelte` |

---

## Parallel Throughput

### Single Terminal (Sequential)
```
Research → Write → Commit → Research → Write → Commit
   5min     8min    2min      5min     8min    2min
                    Total: ~30 min for 2 articles
```

### 3 Terminals (Parallel)
```
T1: Research A → Research B → Research C → Research D → ...
T2:    wait    →  Write A   →  Write C   → ...
T3:    wait    →  Write B   →  Write D   → ...

Timeline:
0-5min:   T1 researches A
5-10min:  T1 researches B, T2 writes A
10-15min: T1 researches C, T2 writes A (finish), T3 writes B
15-20min: T1 researches D, T2 writes C, T3 writes B (finish)
...

Result: After initial 5min delay, ~1 article every 4-5 minutes
        vs 15 min per article sequential
        = 3x faster throughput
```

---

## Example Session

### Terminal 1 (Research)
```
> Research next 3

Creating briefs for:
1. nextjs-supabase (Stack Guide)
2. nextjs-prisma (Stack Guide)
3. missing-rate-limiting (Vulnerability)

Brief ready: nextjs-supabase-brief.md (READY)
Brief ready: nextjs-prisma-brief.md (READY)
Brief ready: missing-rate-limiting-brief.md (READY)

> Research next
Creating brief for: insecure-cors...
```

### Terminal 2 (Writer #1)
```
> Claim next

Claiming: nextjs-supabase-brief.md
Status changed to IN_PROGRESS
Starting article...

[writes article]

Article complete. Running QA...
✓ All checks passed

Committing...
Pushed to main.

Brief status: DONE
QUEUE.md updated.

> Claim next

Claiming: missing-rate-limiting-brief.md
...
```

### Terminal 3 (Writer #2)
```
> Claim next

Claiming: nextjs-prisma-brief.md
Status changed to IN_PROGRESS
Starting article...

[writes article in parallel with Terminal 2]
```

---

## Key Files

| File | Purpose |
|------|---------|
| `terminals/T1-RESEARCH.md` | Research Agent #1 startup prompt |
| `terminals/T1B-RESEARCH.md` | Research Agent #2 startup prompt |
| `terminals/T2-WRITER.md` | Writer Agent #1 startup prompt |
| `terminals/T3-WRITER.md` | Writer Agent #2 startup prompt |
| `terminals/T4-QA.md` | QA Agent startup prompt |
| `briefs/_TEMPLATE.md` | Brief template with status tracking |
| `strategies/VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md` | Full writer skill |
| `QUEUE.md` | Article queue with definitions |
| `checklists/qa-checklist.md` | QA checklist |

---

## Startup Checklist

Before starting parallel work:

- [ ] QUEUE.md has items marked `⏳ Pending`
- [ ] `briefs/` folder exists
- [ ] All 5 terminals are in the project directory
- [ ] Each terminal has loaded its agent prompt
- [ ] Dev server running (`npm run dev`)

---

## Troubleshooting

### Both writers claimed same brief
1. Check `claimed_at` timestamps
2. Earlier claim wins
3. Later claimer moves to next `READY` brief

### Research is slower than writing
1. Both Research Agents should batch with `Research 3`
2. Writers will naturally throttle when no READY briefs
3. Two research agents should keep briefs flowing

### Both research agents picked same item
1. Check `created_at` timestamps in briefs
2. Earlier timestamp wins
3. Later agent deletes their brief and moves on

### Brief is stuck IN_PROGRESS
1. Check if terminal crashed
2. If `claimed_at` > 2 hours, safe to reclaim
3. Reclaim by changing status back to `READY` first

### Git conflicts
1. Writers should pull before commit
2. Use separate branches if needed
3. Merge to main after each article
