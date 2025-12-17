# Content Briefs Folder

This folder contains content briefs created by the Research Agent for the Writer Agents to consume.

## File Naming Convention

```
{slug}-brief.md
```

Examples:
- `nextjs-supabase-brief.md`
- `missing-rate-limiting-brief.md`

## Status Tracking

Each brief has a status in its frontmatter:

| Status | Meaning |
|--------|---------|
| `READY` | Research complete, ready for Writer Agent |
| `IN_PROGRESS` | Writer Agent is working on this |
| `DONE` | Article published, brief can be archived |

## Workflow

1. **Research Agent (Terminal 1)** creates briefs with status `READY`
2. **Writer Agent (Terminal 2 or 3)** claims a brief by changing status to `IN_PROGRESS`
3. After publishing, Writer Agent changes status to `DONE`

## Claiming a Brief

When starting work on a brief, the Writer Agent should:

1. Check for briefs with status `READY`
2. Change status to `IN_PROGRESS` immediately
3. Add `claimed_by: Terminal X` and `claimed_at: timestamp`

This prevents two Writer Agents from working on the same brief.
