# Master Prompting Skill

## Skill Overview

**Purpose:** Guide creation of world-class prompting content for the VibeShip Knowledge Base, including .cursorrules guides, CLAUDE.md documentation, system prompts, and AI configuration best practices.

**Use When:**
- Researching prompting-related topics
- Writing content about AI configuration (cursor rules, claude.md, system prompts)
- Creating example prompts and rules for articles
- QA-ing prompting content for accuracy and best practices
- Building prompt libraries or templates

---

## SKILL ROUTING REMINDER

**This skill is for PROMPTS content only.** Before writing, verify you're using the correct skill:

| Content Type | Correct Skill | Path |
|--------------|---------------|------|
| **Prompts** (cursor rules, CLAUDE.md, AI config) | THIS FILE | `docs/.content-ops/skills/master-prompting-skill.md` |
| **Security** (vulnerabilities, stacks, fixes) | Security Writer Agent | `docs/.content-ops/strategies/VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md` |
| **Research** (briefs, data gathering) | Research Agent | `docs/.content-ops/agents/research-agent.md` |
| **QA** (pre-publish checks) | QA Checklist | `docs/.content-ops/checklists/qa-checklist.md` |

**If you're writing security content, STOP and read `VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md` instead.**

---

## Part 1: Prompting Fundamentals

### Core Techniques (Priority Order)

Based on [Anthropic's official documentation](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview):

| Technique | Description | When to Use |
|-----------|-------------|-------------|
| **Be Clear and Direct** | Explicit, unambiguous instructions | Always - foundation of all prompts |
| **Use Examples (Multishot)** | Provide 2-5 examples of desired output | Complex formats, specific patterns |
| **Chain of Thought** | "Think step by step" before answering | Reasoning, analysis, complex problems |
| **XML Tags** | Structure with `<tags>` for parsing | Multi-part inputs, structured data |
| **System Prompts** | Set role and context upfront | Consistent behavior across sessions |
| **Response Prefilling** | Start the response yourself | Control format, guide direction |
| **Prompt Chaining** | Sequential prompts for complex tasks | Multi-step workflows |
| **Long Context Tips** | Strategies for large documents | Processing extensive inputs |

### Advanced Techniques (From Research)

Based on [OpenAI Cookbook](https://cookbook.openai.com/), [Eugene Yan](https://eugeneyan.com/writing/prompting/), and [Lilian Weng](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/):

| Technique | Description | When to Use |
|-----------|-------------|-------------|
| **Self-Consistency** | Sample multiple outputs, majority vote | Critical decisions, high-stakes answers |
| **Task Decomposition** | Break complex problems into subtasks | Multi-step reasoning |
| **Sketchpad Sections** | Dedicated `<sketchpad>` for reasoning | Intermediate verification needed |
| **Tree of Thoughts** | Explore multiple reasoning paths | Complex problem-solving |
| **ReAct (Reason + Act)** | Interleave reasoning with tool use | External tool integration |
| **Least-to-Most** | Solve simpler subproblems first | Compositional reasoning |

### The Golden Rules of Prompting

1. **Specificity beats length** - A short, precise prompt outperforms a long, vague one
2. **Show, don't tell** - Examples are more powerful than descriptions
3. **Structure enables parsing** - XML tags, markdown, JSON improve reliability
4. **Context is king** - Relevant context beats clever tricks
5. **Test empirically** - What works in theory may fail in practice
6. **Less is more for specialized models** - Overprompting coding models reduces quality (GPT-5-Codex guidance)

### Context Engineering (The New Paradigm)

Per [Simon Willison](https://simonwillison.net/tags/prompt-engineering/), the field is shifting from "prompt engineering" to **context engineering**:

> "The skill involves filling the context window with just the right information through task descriptions, examples, RAG, tools, and state management."

**Key Principles:**
- **Reinforcement patterns** - Repeat objectives as tools execute (like Claude Code's TODO list)
- **Tool-specific prompting** - Different instructions for bash, grep, search, etc.
- **Context debt is real** - Watch for poisoning, distraction, confusion, clash patterns
- **Prune aggressively** - Summarize and quarantine stale context

### Prompt Structure Template

```markdown
<context>
[Background information the AI needs]
</context>

<task>
[Specific instruction - what you want done]
</task>

<format>
[How the output should be structured]
</format>

<examples>
[2-5 examples of input/output pairs]
</examples>

<sketchpad>
[Optional: Space for intermediate reasoning]
</sketchpad>

<constraints>
[What NOT to do, limitations, edge cases]
</constraints>
```

### What Doesn't Matter (Eugene Yan Research)

- Politeness markers ("please," "thank you") - no measurable impact
- Monetary incentives or threats - models don't respond to these
- Excessive detail for simple tasks - can cause overcomplexation

---

## Part 2: AI Tool Configuration Comparison

### Complete Tool Comparison Table

| Tool | Config File | Location | Format | Key Features |
|------|-------------|----------|--------|--------------|
| **Claude Code** | `CLAUDE.md` | 4-tier hierarchy | Markdown | Imports, path rules, recursive discovery |
| **Cursor** | `.cursor/rules/*.md` | Project + User + Team | Markdown + frontmatter | Globs, 4 activation modes |
| **Windsurf** | `.windsurf/rules/` | Global + Workspace | Markdown | 12k char limit, auto-memories |
| **Cline** | `.clinerules/` | Project + Global | Markdown | Rules bank pattern, AGENTS.md fallback |
| **GitHub Copilot** | `.github/copilot-instructions.md` | Repo + path-specific | Markdown + frontmatter | `applyTo` globs, `excludeAgent` |

### AGENTS.md (Cross-Tool Standard)

`AGENTS.md` is emerging as a universal fallback supported by multiple tools:
- **Cursor**: Reads from project root
- **Cline**: Auto-detects as fallback
- **Claude Code**: Supports in addition to CLAUDE.md

```markdown
# AGENTS.md

## Project Context
[What this project does]

## Coding Standards
[Your team's conventions]

## Security Requirements
[Critical patterns to follow]
```

---

## Part 3: Cursor Rules Best Practices

Based on [official Cursor documentation](https://cursor.com/docs/context/rules) and [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) (36.2k stars).

### File Structure (Modern System)

```
project/
├── .cursor/
│   └── rules/
│       ├── core.md              # Always-on rules
│       ├── security.md          # Security patterns
│       ├── typescript.md        # Language-specific
│       └── testing.md           # Test patterns
├── .cursorrules                  # Legacy (still works, deprecated)
└── AGENTS.md                     # Cross-tool fallback
```

### Rule File Format

```markdown
---
description: "Brief description for AI to determine relevance"
alwaysApply: false
globs: ["**/*.ts", "**/*.tsx"]
---

# Rule Title

## Context
[What this rule is for]

## Instructions
[Specific guidance]

## Examples
[Code examples with @filename references]

## Anti-patterns
[What NOT to do]
```

### Rule Application Types

| Type | Frontmatter | Behavior |
|------|-------------|----------|
| **Always Apply** | `alwaysApply: true` | Active in every chat |
| **Apply Intelligently** | `alwaysApply: false` + description | AI decides relevance |
| **File-specific** | `globs: ["*.ts"]` | Triggered by file patterns |
| **Manual** | (none) | Activated via `@rule-name` |

### Rule Precedence

**Team Rules → Project Rules → User Rules** (higher takes priority)

### Rules Best Practices

| Do | Don't |
|----|-------|
| Keep rules under 500 lines | Write novel-length rules |
| Be specific with examples | Use vague language |
| Include anti-patterns | Only show happy path |
| Update as project evolves | Set and forget |
| Split into focused modules | One giant file |
| Use file references `@filename` | Copy-paste code snippets |

---

## Part 4: CLAUDE.md Best Practices

Based on [Claude Code documentation](https://code.claude.com/docs/en/memory).

### Four-Tier Memory Hierarchy

```
1. Enterprise Policy    /Library/Application Support/ClaudeCode/CLAUDE.md (macOS)
   └── Organization-wide, managed by IT/DevOps

2. Project Memory       ./CLAUDE.md or ./.claude/CLAUDE.md
   └── Team-shared, version controlled

3. Project Rules        ./.claude/rules/*.md
   └── Modular, path-specific rules

4. User Memory          ~/.claude/CLAUDE.md
   └── Personal preferences (lowest priority)
   └── Local variant: ./CLAUDE.local.md (auto-gitignored)
```

### Key Features

**Imports:** Use `@path/to/import` syntax (max 5 hops depth)
```markdown
## Security Rules
@.claude/rules/security.md
```

**Path-Specific Rules:** Use YAML frontmatter
```markdown
---
paths: src/**/*.ts
---
# TypeScript-specific rules here
```

**Recursive Discovery:** Claude Code searches upward to git root and downward into subtrees.

### Essential Sections

```markdown
# CLAUDE.md

## Project Overview
[What this project does - 2-3 sentences]

## Tech Stack
- Framework: [Next.js 14 / SvelteKit / etc.]
- Language: [TypeScript / Python / etc.]
- Database: [Supabase / Prisma / MongoDB]
- Styling: [Tailwind / CSS Modules]

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run linter

## Architecture
[Key patterns, folder structure, important files]

## Code Conventions
[Naming, formatting, patterns to follow]

## Security Rules
[Critical security patterns - our differentiator]

## Common Gotchas
[Things that often trip people up]
```

### Best Practices (From Official Docs)

- Be specific ("Use 2-space indentation" not "Format properly")
- Use markdown structure to organize related memories
- Review periodically as projects evolve
- Keep rules focused on single topics
- Use conditional/path rules sparingly

---

## Part 5: Windsurf Rules

Based on [Windsurf documentation](https://docs.windsurf.com/windsurf/cascade/memories).

### File Structure

```
project/
├── .windsurf/
│   └── rules/           # Workspace rules (12k char limit each)
└── global_rules.md      # Cross-workspace rules
```

### Memories vs Rules

| Type | Source | Persistence |
|------|--------|-------------|
| **Memories** | Auto-generated by Cascade | Workspace-specific, no credit cost |
| **Rules** | Manually defined | Global or workspace |

### Activation Modes

| Mode | Trigger |
|------|---------|
| **Manual** | `@mention` in input |
| **Always On** | Every conversation |
| **Model Decision** | Natural language description matching |
| **Glob** | File pattern matching (`*.js`, `src/**/*.ts`) |

### Best Practices (From Windsurf Docs)

- Keep rules "simple, concise, and specific"
- Avoid generic guidance already in model training
- Use bullet points and numbered lists
- Leverage XML tags to group related rules:

```markdown
<coding_guidelines>
- Use early returns when possible
- Always add documentation for new functions
</coding_guidelines>
```

---

## Part 6: Cline Rules

Based on [Cline documentation](https://docs.cline.bot/features/cline-rules).

### File Structure

```
project/
├── .clinerules/              # Folder approach (recommended)
│   ├── 01-coding.md          # Numeric prefixes for ordering
│   ├── 02-documentation.md
│   └── 03-security.md
├── .clinerules               # Single file approach (alternative)
└── clinerules-bank/          # Inactive rules storage (advanced)
```

### Global Rules Location

- **Windows:** `Documents\Cline\Rules`
- **macOS:** `~/Documents/Cline/Rules`
- **Linux/WSL:** `~/Documents/Cline/Rules`

### Rules Bank Pattern (Advanced)

Maintain two directories:
- `.clinerules/` - Active rules
- `clinerules-bank/` - Available but inactive rules

This allows teams to activate only relevant rules for current context.

### Creation Methods

- Click `+` in Rules tab
- Use `/newrule` slash command
- Toggle via popover UI (v3.13+)

---

## Part 7: GitHub Copilot Instructions

Based on [GitHub Copilot documentation](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot).

### File Locations

```
.github/
├── copilot-instructions.md           # Repository-wide
└── instructions/
    └── NAME.instructions.md          # Path-specific
```

### Path-Specific Frontmatter

```markdown
---
applyTo: "app/models/**/*.rb"
excludeAgent: "code-review"
---

# Model-specific instructions here
```

### Recommended Content

- High-level overview (languages, frameworks, runtime)
- Build instructions (bootstrap, build, test, lint commands)
- Project layout (architecture, key files)
- Validation steps (CI/CD documentation)
- Dependencies (non-obvious requirements)

### Best Practices

- Keep repository-wide instructions concise (~2 pages)
- Use language indicating requirements: "always run npm install before building"
- Avoid conflicting instructions across files
- Document command sequences with preconditions/postconditions

---

## Part 8: Security Rules Library (Copy-Paste Ready)

### SQL Injection Prevention
```markdown
## Database Security
- NEVER use template literals for SQL: `SELECT * FROM ${table}`
- ALWAYS use parameterized queries or ORM methods
- Validate input types before queries
- Use allowlists for dynamic table/column names

Patterns:
✅ db.query('SELECT * FROM users WHERE id = $1', [userId])
✅ prisma.user.findUnique({ where: { id: userId } })
❌ db.query(`SELECT * FROM users WHERE id = ${userId}`)
❌ db.query(`SELECT * FROM ${tableName}`)
```

### Authentication Rules
```markdown
## Authentication
- Check auth on EVERY API route and server action
- Use middleware for auth checks, not inline
- Never trust client-side auth state alone
- Implement proper session validation

Pattern for protected routes:
1. Get session/token
2. Validate session exists and is valid
3. Check user permissions if needed
4. THEN process the request
```

### Input Validation Rules
```markdown
## Input Validation
- Validate ALL user input on the server
- Use Zod or similar for schema validation
- Never pass raw user input to:
  - Database queries
  - File system operations
  - Shell commands
  - URL redirects
  - HTML rendering

Pattern:
const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100)
})
const result = schema.safeParse(input)
if (!result.success) return error(400)
```

### Secret Handling Rules
```markdown
## Secrets
- NEVER hardcode API keys, passwords, tokens
- Use environment variables: process.env.SECRET_NAME
- Never log secrets or include in error messages
- Never commit .env files (add to .gitignore)
- Use different secrets for dev/staging/prod

Pattern:
✅ const apiKey = process.env.STRIPE_SECRET_KEY
❌ const apiKey = "sk_live_abc123..."
```

### Path Traversal Prevention
```markdown
## File Operations
- Validate file paths before operations
- Use allowlists for permitted directories
- Sanitize user-provided filenames
- Never construct paths with user input directly

Pattern:
✅ const safePath = path.join(ALLOWED_DIR, path.basename(userFile))
❌ const unsafePath = path.join('/uploads', userProvidedPath)
```

### NoSQL Injection Prevention
```markdown
## NoSQL Security (MongoDB, Firestore)
- Validate input is string, not object (prevents operator injection)
- Never pass raw req.body to queries
- Use schema validation (Zod) to reject objects like {"$ne": ""}

Pattern:
✅ if (typeof input !== 'string') throw new Error('Invalid')
✅ const { username } = loginSchema.parse(req.body)
❌ db.collection('users').findOne({ username: req.body.username })
```

---

## Part 9: Writing Prompting Content for VibeShip KB

### Content Types in /kb/prompts/

| Type | Example | Focus |
|------|---------|-------|
| Configuration Guide | cursor-rules, claude-md | How to set up |
| Prompt Library | security-prompts | Copy-paste prompts |
| Best Practices | prompting-tips | Techniques |
| Templates | stack-templates | Ready-to-use configs |
| Comparisons | cursor-vs-copilot-rules | Tool differences |

### Article Structure for Prompting Content

```markdown
H1: [Tool/Concept]: [Value Proposition]

Quick Answer Box (50 words):
[What it is + why it matters + what reader will get]

H2: What Is [Concept]?
- Definition
- Why it matters for vibe coders
- Target: 150-200 words

H2: How to Set Up [Concept]
- Step-by-step guide
- File locations
- Basic structure
- Target: 200-250 words

H2: Essential [Concept] Sections
- Category 1 with examples
- Category 2 with examples
- Category 3 with examples
- Target: 300-400 words

H2: Security Rules (Our Angle!)
- SQL injection prevention
- Auth patterns
- Input validation
- Secret handling
- Copy-paste examples
- Target: 400-500 words

H2: [Concept] Templates by Stack
- Next.js + Supabase
- SvelteKit + Prisma
- Python + FastAPI
- Target: 400-500 words

H2: [Concept] Best Practices
- Do's and don'ts table
- Common mistakes
- Target: 200-250 words

H2: FAQ
- 5-7 questions with direct answers

H2: Related Resources
- Links to tools, security guides
```

### Code Example Requirements

**Always show both patterns:**
```markdown
✅ **SECURE:**
```typescript
const user = await db.query('SELECT * FROM users WHERE id = $1', [userId])
```

❌ **VULNERABLE:**
```typescript
const user = await db.query(`SELECT * FROM users WHERE id = ${userId}`)
```
```

**Include context comments:**
```typescript
// Security: Always use parameterized queries
// This prevents SQL injection even if userId contains malicious input
const user = await db.query('SELECT * FROM users WHERE id = $1', [userId])
```

---

## Part 10: QA Checklist for Prompting Content

### Technical Accuracy
- [ ] File paths and locations are correct for each tool
- [ ] Syntax examples are valid and tested
- [ ] Frontmatter format matches tool requirements
- [ ] Version-specific info is current (check tool docs)
- [ ] Character/line limits noted where applicable

### Completeness
- [ ] All essential sections covered
- [ ] Security rules included (our differentiator)
- [ ] Multiple stack examples provided
- [ ] FAQ answers common questions
- [ ] Cross-tool comparison where relevant

### Copy-Paste Quality
- [ ] All code examples are complete and runnable
- [ ] No placeholder values that would break
- [ ] Comments explain the "why"
- [ ] Both good and bad patterns shown

### SEO/LLM Optimization
- [ ] Target keywords in H1, H2s, content
- [ ] Quick answer box under 50 words
- [ ] Each section self-contained (75-225 words)
- [ ] Internal links to related content

### Value Delivery
- [ ] Reader can take action immediately
- [ ] Complex concepts explained simply
- [ ] Mental models provided (analogies)
- [ ] Common mistakes addressed

---

## Part 11: Reference Links

### Official Documentation

| Tool | Documentation URL |
|------|-------------------|
| Anthropic Prompting | [platform.claude.com/docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) |
| Claude Code Memory | [code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory) |
| Cursor Rules | [cursor.com/docs/context/rules](https://cursor.com/docs/context/rules) |
| Windsurf Rules | [docs.windsurf.com](https://docs.windsurf.com/windsurf/cascade/memories) |
| Cline Rules | [docs.cline.bot](https://docs.cline.bot/features/cline-rules) |
| GitHub Copilot | [docs.github.com/copilot](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot) |

### Community Resources (High Authority)

| Resource | URL | Why It's Valuable |
|----------|-----|-------------------|
| awesome-cursorrules | [github.com/PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) | 36.2k stars, 150+ rules |
| Anthropic Cookbook | [github.com/anthropics/anthropic-cookbook](https://github.com/anthropics/anthropic-cookbook) | 29.6k stars, official examples |
| Prompt Engineering Guide | [promptingguide.ai](https://www.promptingguide.ai/) | 18 techniques, cited by Google |
| Learn Prompting | [learnprompting.org](https://learnprompting.org/) | Course format, cited by NIST |
| OpenAI Cookbook | [cookbook.openai.com](https://cookbook.openai.com/) | Reliability techniques |

### Expert Blogs

| Author | URL | Focus |
|--------|-----|-------|
| Simon Willison | [simonwillison.net/tags/prompt-engineering](https://simonwillison.net/tags/prompt-engineering/) | Context engineering, practical insights |
| Eugene Yan | [eugeneyan.com/writing/prompting](https://eugeneyan.com/writing/prompting/) | Production patterns, what doesn't matter |
| Lilian Weng | [lilianweng.github.io](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/) | Academic rigor, technique taxonomy |
| Latent Space | [latent.space](https://www.latent.space/) | AI engineering interviews |

### VibeShip Internal

- `/kb/prompts/cursor-rules/` - Our cursor rules guide
- `/kb/prompts/claude-md/` - Our CLAUDE.md guide
- `/kb/vibe-coding-tools/cursor/` - Cursor tool page
- `/kb/vibe-coding-tools/claude-code/` - Claude Code tool page
- `/kb/vibe-coding-tools/windsurf/` - Windsurf tool page
- `/kb/security/vulnerabilities/` - All vulnerability guides

---

## Quick Reference Card

### Prompt Structure
```
<context> → <task> → <format> → <examples> → <sketchpad> → <constraints>
```

### Tool Config Files
```
Claude Code:  CLAUDE.md (4-tier hierarchy)
Cursor:       .cursor/rules/*.md (frontmatter)
Windsurf:     .windsurf/rules/ (12k limit)
Cline:        .clinerules/ (folder or file)
Copilot:      .github/copilot-instructions.md
Universal:    AGENTS.md (cross-tool fallback)
```

### Activation Modes (Common Pattern)
```
1. Always On      - Every conversation
2. Intelligent    - AI decides from description
3. File-specific  - Glob pattern matching
4. Manual         - @mention trigger
```

### Security Rules (Always Include)
```
1. SQL: Parameterized queries only
2. Auth: Check every route
3. Input: Validate with Zod
4. Secrets: Environment variables
5. Files: Validate paths
6. NoSQL: Type-check inputs (prevent operator injection)
```

### Key Prompting Techniques
```
1. Be Clear & Direct     - Foundation
2. Multishot (2-5 ex)    - Complex formats
3. Chain of Thought      - Reasoning
4. XML Tags              - Structure
5. Self-Consistency      - Critical decisions
6. Task Decomposition    - Complex workflows
```

---

**Skill Version:** 2.0
**Last Updated:** 2025-12-17
**Research Sources:** Anthropic, Cursor, Windsurf, Cline, GitHub, OpenAI Cookbook, promptingguide.ai, learnprompting.org, Simon Willison, Eugene Yan, Lilian Weng
**Maintainer:** VibeShip Content Ops
