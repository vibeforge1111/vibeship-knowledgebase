# Content QA Checklist

Use this checklist before publishing any KB content.

---

## Pre-Flight Check

### Content Brief Verified
- [ ] All statistics have sources
- [ ] Keywords have search intent identified
- [ ] Internal links are valid URLs
- [ ] Unique angle is clear
- [ ] No placeholder text (TBD, TODO, etc.)

---

## Structure & Format

### Title & Meta
- [ ] Title under 60 characters
- [ ] Title includes primary keyword in first 4 words
- [ ] Meta description 150-160 characters
- [ ] Meta description includes CTA
- [ ] URL follows structure: `/kb/security/[type]/[slug]/`

### Headings
- [ ] Single H1 matching title intent
- [ ] H2s are question-based where appropriate
- [ ] No skipped heading levels (H1 → H3)
- [ ] Headings create logical outline

### Formatting
- [ ] Code blocks have language specified (```javascript)
- [ ] Tables are properly formatted
- [ ] Lists use consistent formatting
- [ ] No walls of text (max 3-4 sentences per paragraph)

---

## Content Quality

### Opening
- [ ] First 50 words directly answer the main query
- [ ] Quick answer includes key stat
- [ ] Hook makes reader want to continue

### Data & Attribution
- [ ] All statistics have attribution
- [ ] Format: "[X]% of [N] repos (Source, Date)"
- [ ] No made-up or estimated numbers
- [ ] CWE/OWASP references included where applicable

### Writing
- [ ] All jargon explained on first use
- [ ] Real-world analogies for complex concepts
- [ ] No unexplained acronyms
- [ ] Active voice preferred
- [ ] Vibe coder would understand without security background

### Code Examples
- [ ] All examples show BEFORE (vulnerable) and AFTER (secure)
- [ ] Code is syntactically correct
- [ ] Comments explain what's happening
- [ ] Framework-specific where relevant

---

## AI Fix Prompt

- [ ] Length: 200-400 words
- [ ] Specific patterns to search for (not vague)
- [ ] Includes regex or search terms
- [ ] Before/after code for each fix pattern
- [ ] Framework-specific considerations included
- [ ] Verification step at end
- [ ] Works in Cursor, Claude Code, AND Bolt
- [ ] **TESTED on real code** (or marked as untested)

---

## FAQ Section

- [ ] 5 questions included
- [ ] Questions match "People Also Ask" research
- [ ] Each answer 50-100 words
- [ ] First sentence directly answers question (YES/NO/FACT)
- [ ] Each answer includes citable fact with attribution
- [ ] Links to deeper content where relevant
- [ ] No hedging or weasel words

---

## SEO Optimization

### Keywords
- [ ] Primary keyword in title
- [ ] Primary keyword in first 100 words
- [ ] Primary keyword in at least one H2
- [ ] Secondary keywords appear naturally
- [ ] No keyword stuffing

### Vibe Coding Terminology
- [ ] "Vibe coding/vibe coded/vibe coders" used 3-5 times
- [ ] Mixed with "AI-generated code" for variety
- [ ] Terms appear naturally (not forced)

### Links
- [ ] 5-10 internal links included
- [ ] Links to parent/hub pages
- [ ] Links to related content
- [ ] 1-2 external authority links (OWASP, CWE, docs)
- [ ] All links are valid URLs
- [ ] Anchor text is descriptive (not "click here")

### Technical SEO
- [ ] Alt text for any images
- [ ] Schema markup ready (FAQ, Article, HowTo)
- [ ] Breadcrumb structure defined

---

## LLM Optimization

### Chunk Structure
- [ ] Each H2 section is 75-225 words
- [ ] Sections are self-contained (make sense without context)
- [ ] First sentence of each section answers the H2 question

### Citable Facts
- [ ] Facts are specific, not vague
- [ ] Clear attribution: "According to VibeShip Scanner..."
- [ ] Numbers are precise (23.4%, not "about 25%")
- [ ] Dates included where relevant

### Extraction Test
- [ ] Would ChatGPT cite this for the target query?
- [ ] Facts are easily extractable
- [ ] No important info buried in middle of paragraphs

---

## Technical Accuracy

### Security Claims
- [ ] CWE ID is correct for the vulnerability
- [ ] OWASP category is current (2021 version)
- [ ] Severity rating is appropriate
- [ ] Fix actually prevents the vulnerability
- [ ] No dangerous or outdated recommendations

### Code Accuracy
- [ ] All code examples are syntactically correct
- [ ] Code works with current framework versions
- [ ] Fix patterns match current best practices
- [ ] No deprecated methods recommended

---

## Final Review

### Readability
- [ ] Read aloud - does it flow?
- [ ] Vibe coder audience would understand
- [ ] Not condescending or overly technical
- [ ] Appropriate length for topic complexity

### Completeness
- [ ] All sections from template included
- [ ] No TODO or placeholder text
- [ ] Related content linked
- [ ] Scanner CTA included

### Competitive
- [ ] Better than current top 3 results
- [ ] Unique angle is clear
- [ ] Data advantage highlighted

### Brand Voice
- [ ] Knowledgeable friend, not textbook
- [ ] Direct and actionable
- [ ] Confident but not arrogant
- [ ] Occasionally playful, always professional

---

## Sign-Off

| Check | Initials | Date |
|-------|----------|------|
| Content complete | | |
| Technical review | | |
| SEO review | | |
| Final approval | | |

---

## Quick Reference: Common Issues

### "First 50 words don't answer query"
→ Rewrite opening to lead with the answer, not context

### "Jargon not explained"
→ Add parenthetical: "IDOR (when users access other users' data by changing IDs)"

### "AI fix prompt too vague"
→ Add specific regex patterns, file paths, and real code examples

### "FAQ answers hedged"
→ Start with direct answer: "Yes—" or "No, but—" or the specific fact

### "Missing internal links"
→ Link vulnerability → fixes, tool → vulnerabilities, stack → both

### "Not citable by LLMs"
→ Add "According to VibeShip Scanner (Month Year)..." before key stats
