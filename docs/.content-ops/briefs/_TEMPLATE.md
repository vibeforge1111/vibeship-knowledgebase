# Content Brief: {TITLE}

## Status

```yaml
status: READY
created_at: {YYYY-MM-DDTHH:MM:SSZ}
created_by: Research Agent (Terminal 1)
claimed_by: null
claimed_at: null
completed_at: null
```

---

## Article Metadata

```yaml
type: {vulnerability | tool | stack | checklist}
slug: {slug}
url: /kb/{path}/{slug}/
title: "{SEO Title - under 60 chars}"
meta_description: "{150-160 chars with CTA}"
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| CWE | CWE-XXX | https://cwe.mitre.org/data/definitions/XXX.html |
| OWASP | AXX:2021 | https://owasp.org/Top10/AXX_2021-{Name}/ |

### External Sources (for outbound links)
| Source | URL | Key Finding | Tier |
|--------|-----|-------------|------|
| {Source 1} | {URL} | {What to cite} | {1-7} |
| {Source 2} | {URL} | {What to cite} | {1-7} |
| {Source 3} | {URL} | {What to cite} | {1-7} |

### Key Facts to Include
- {Fact 1 with attribution}
- {Fact 2 with attribution}
- {Fact 3 with attribution}

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| {primary keyword} | {informational/transactional} | Primary |
| {secondary 1} | {intent} | Secondary |
| {secondary 2} | {intent} | Secondary |

### People Also Ask (FAQs)
1. {Question 1}?
2. {Question 2}?
3. {Question 3}?
4. {Question 4}?
5. {Question 5}?

### Competitive Gap
{What's missing from top results that we can provide}

---

## Content Outline

### Quick Answer (50 words max)
{Draft the quick answer - writer will refine}

### Section 1: What is {topic}?
- Plain English definition
- Real-world analogy: {suggested analogy}
- Consequences: {what could happen}
- Word count: 100-150

### Section 2: {Question-based H2}
- Key points to cover
- Code examples needed: {list}
- Sources to cite: {list}
- Word count: 150-200

### Section 3: {Question-based H2}
- Key points
- Before/after code patterns
- Framework considerations
- Word count: 150-200

### Section 4: How to fix / How to use securely
- Step-by-step approach
- AI fix prompt requirements (for vulnerabilities)
- Word count: 200-400

### FAQ Section
- Use PAA questions above
- Each answer: 50-100 words
- Include citable fact in each

### Related Content
- Links to include at bottom

---

## Internal Links (5-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| {text} | /kb/path/ | {where to place} |
| {text} | /kb/path/ | {where to place} |
| {text} | /kb/path/ | {where to place} |
| {text} | /kb/path/ | {where to place} |
| {text} | /kb/path/ | {where to place} |

---

## External Links (5-10 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| {text} | {URL} | {1-7} | {section} |
| {text} | {URL} | {1-7} | {section} |
| {text} | {URL} | {1-7} | {section} |

**Tier Reference:**
1. OWASP, CWE, NIST, MDN
2. PortSwigger, Snyk Learn, HackerOne
3. Verizon DBIR, IBM Reports
4. Opengrep, Semgrep, Trivy, Gitleaks
5. IEEE, USENIX, ACM, arXiv
6. Framework docs (Next.js, Supabase, etc.)
7. Tool official sites

---

## Code Examples Needed

### Pattern 1: {Name}
```javascript
// Vulnerable (what AI generates)
{code}

// Secure (the fix)
{code}
```
Explanation: {why this is vulnerable, why fix works}

### Pattern 2: {Name}
```javascript
// Vulnerable
{code}

// Secure
{code}
```
Explanation: {why}

---

## AI Fix Prompt Requirements (for vulnerabilities)

The Writer Agent should create an AI fix prompt that includes:
- [ ] Specific file patterns to search (e.g., `/api/`, `*.ts`)
- [ ] Regex patterns for detection
- [ ] Before/after code for each fix pattern
- [ ] Framework-specific notes ({frameworks})
- [ ] Verification command/step

---

## Notes for Writer Agent

### Tone Guidance
{Any specific tone notes}

### Technical Accuracy
{Gotchas to watch for}

### Things to Avoid
{Common mistakes for this topic}

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

---

## Checklist Before Marking READY

- [ ] All external links verified working
- [ ] CWE/OWASP references correct
- [ ] 5+ internal links identified
- [ ] 5 PAA questions included
- [ ] Competitive gap is specific
- [ ] Code examples drafted
- [ ] No placeholder text (TBD, TODO)

---

**Brief Status:** ✅ READY for Writer Agent
