# AI Tool Analysis Template

Use this template for all pages at `/kb/vibe-coding-tools/{tool}/`

## JSON Content Structure

```json
{
  "title": "Security in {Tool}-Generated Code",
  "slug": "{tool-slug}",
  "toolName": "{Tool Display Name}",
  "description": "Analysis of {N} {Tool} projects. Security score: {X}/100. Top vulnerabilities and how to fix them.",
  
  "quickAnswer": "{30-50 words. Security assessment summary. Include score, main finding, and recommendation.}",
  
  "stats": {
    "totalScanned": 10847,
    "reposWithVulnerabilities": 8234,
    "vulnerabilityRate": 75.9,
    "avgVulnerabilitiesPerRepo": 3.2,
    "securityScore": 42,
    "trend": "up|down|stable",
    "weekOverWeekChange": -2.1
  },
  
  "content": {
    "overview": "{100-150 words. Overall security assessment. What this tool does well, what it struggles with. Set expectations.}",
    
    "whyThisHappens": "{150-200 words. Technical explanation of WHY this tool generates these patterns. Training data? Default behaviors? Prompt interpretation?}",
    
    "recommendations": "{100-150 words. How to use this tool more securely. What to check after generation. Prompts that help.}"
  },
  
  "topVulnerabilities": [
    {
      "rank": 1,
      "slug": "sql-injection",
      "name": "SQL Injection",
      "percentage": 81.2,
      "trend": "up",
      "description": "Brief explanation of how this tool causes this specific vulnerability"
    }
  ],
  
  "comparisonWithOthers": [
    {
      "tool": "cursor",
      "score": 42,
      "rate": 75.9,
      "topIssue": "SQL Injection"
    },
    {
      "tool": "claude-code", 
      "score": 58,
      "rate": 62.3,
      "topIssue": "Missing Authentication"
    }
  ],
  
  "securePromptExamples": [
    {
      "bad": "Create a login system",
      "good": "Create a login system with parameterized queries, password hashing using bcrypt, and rate limiting",
      "explanation": "Explicit security requirements yield safer code"
    }
  ],
  
  "faqs": [
    {
      "question": "Is {Tool} safe to use?",
      "answer": "{Balanced answer with data. Safe for X, but check Y.}"
    },
    {
      "question": "Should I stop using {Tool}?",
      "answer": "{No, but... Practical advice.}"
    },
    {
      "question": "What should I check after using {Tool}?",
      "answer": "{Actionable checklist.}"
    },
    {
      "question": "How does {Tool} compare to other AI coding tools?",
      "answer": "{Data-driven comparison.}"
    }
  ],
  
  "relatedTools": ["other-tool-1", "other-tool-2"],
  "relatedVulnerabilities": ["sql-injection", "missing-auth", "hardcoded-secrets"],
  
  "publishedAt": "2024-12-01T00:00:00Z",
  "updatedAt": "2024-12-15T00:00:00Z"
}
```

## Page Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ Breadcrumb: KB > Security > AI Patterns > {Tool}                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ # Security in {Tool}-Generated Code                             │
│                                                                 │
│ {quickAnswer}                                                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ SECURITY SCORE                                              │ │
│ │                                                             │ │
│ │         ┌────────────────────────────┐                     │ │
│ │         │         42/100             │                     │ │
│ │         │      ██████░░░░░░          │                     │ │
│ │         │       MODERATE             │                     │ │
│ │         └────────────────────────────┘                     │ │
│ │                                                             │ │
│ │ ───────────────────────────────────────────────────────    │ │
│ │ Repos Scanned    Vuln Rate    Avg Issues    Trend          │ │
│ │ 10,847          75.9%        3.2/repo      📉 -2.1%       │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ## Overview                                                     │
│ {overview content}                                              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ## Top 10 Vulnerabilities in {Tool} Projects                    │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ RANK  VULNERABILITY          RATE    TREND                 │ │
│ │ ──────────────────────────────────────────────────────────│ │
│ │  1    SQL Injection          81.2%   📈                    │ │
│ │  2    Hardcoded Secrets      73.4%   📈                    │ │
│ │  3    Missing Authentication 68.9%   ➡️                    │ │
│ │  4    XSS                    54.2%   📉                    │ │
│ │  5    IDOR                   47.8%   📈                    │ │
│ │  ...                                                       │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Each vulnerability links to detailed page                       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ## Why {Tool} Generates These Issues                            │
│ {whyThisHappens content}                                        │
│                                                                 │
│ ### Pattern 1: {Pattern Name}                                   │
│ {Code example of what Tool generates}                           │
│                                                                 │
│ ### Pattern 2: {Pattern Name}                                   │
│ {Code example}                                                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ## How {Tool} Compares                                          │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ TOOL         SCORE    VULN RATE    TOP ISSUE               │ │
│ │ ──────────────────────────────────────────────────────────│ │
│ │ Claude Code  58/100   62.3%        Missing Auth            │ │
│ │ Cursor       42/100   75.9%        SQL Injection           │ │
│ │ Bolt         38/100   79.2%        Hardcoded Secrets       │ │
│ │ v0           51/100   68.4%        Missing Auth            │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ## Using {Tool} More Securely                                   │
│ {recommendations content}                                       │
│                                                                 │
│ ### Prompts That Help                                           │
│                                                                 │
│ ❌ "Create a login system"                                      │
│ ✅ "Create a login system with parameterized queries,           │
│     password hashing using bcrypt, and rate limiting"           │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ## Scan Your {Tool} Code                                        │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ VibeShip Scanner checks for all vulnerabilities common in   │ │
│ │ {Tool} projects. Results in 60 seconds.                     │ │
│ │                                                             │ │
│ │              [Free Security Scan →]                         │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ## FAQ                                                          │
│ {FAQ accordion}                                                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ## Related                                                      │
│ Other tools: [Claude Code] [Bolt] [v0]                         │
│ Common issues: [SQL Injection] [Missing Auth]                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Tool-Specific Vulnerability Pages

For each tool, also create sub-pages at `/kb/vibe-coding-tools/{tool}/{vulnerability}/`

These pages focus on how THIS SPECIFIC TOOL causes THIS SPECIFIC VULNERABILITY.

```json
{
  "title": "{Vulnerability} in {Tool}-Generated Code",
  "slug": "{tool}/{vulnerability}",
  
  "quickAnswer": "{30-50 words. How this tool specifically causes this vulnerability. Include stat.}",
  
  "content": {
    "pattern": "{What code pattern does this tool generate that causes this?}",
    "why": "{Why does this tool make this specific mistake?}",
    "example": "{Before/after code showing tool output vs secure version}",
    "fixPrompt": "{Tool-specific fix prompt}"
  },
  
  "parentTool": "{tool-slug}",
  "parentVulnerability": "{vulnerability-slug}"
}
```

## Example: Cursor Analysis

### Quick Answer
> Cursor generates security vulnerabilities in 75.9% of projects we scanned, with an average of 3.2 issues per codebase. Its biggest weakness is SQL injection (81.2% of projects affected). Score: 42/100. We recommend scanning all Cursor-generated code before deployment.

### Why Cursor Generates These Issues
> Cursor excels at generating working code quickly, but its training prioritizes functionality over security. When you ask for "a function to get user by ID," it delivers exactly that—functional code that retrieves users by ID. It doesn't consider that the ID might come from an untrusted source.
>
> Three patterns explain most of Cursor's security issues:
>
> **1. Template Literal Defaults:** Cursor loves template literals for readability. When generating database queries, it defaults to `\`SELECT * FROM users WHERE id = ${id}\`` instead of parameterized queries.
>
> **2. Missing Security Context:** Unless you explicitly mention security in your prompt, Cursor assumes you want the simplest working solution. "Add authentication" might get you a password check without hashing.
>
> **3. Copy-Paste Vulnerability Propagation:** Cursor learns from existing code. If your codebase has one vulnerable pattern, it will propagate that pattern to new code.

### Secure Prompts for Cursor

| Instead of... | Try... |
|---------------|--------|
| "Create a login system" | "Create a login system with bcrypt password hashing, parameterized queries, and rate limiting" |
| "Add a database query" | "Add a parameterized database query that prevents SQL injection" |
| "Store user data" | "Store user data with proper input validation and sanitization" |
