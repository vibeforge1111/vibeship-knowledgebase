# Content Brief: Subdomain Takeover

**Generated:** December 2024
**Target Publish:** December 2024
**Priority:** P0 (High-value gap)
**Status:** Ready for Writer

---

## 1. Core Data

### Security References
| Metric | Value | Source |
|--------|-------|--------|
| **CWE ID** | CWE-16 (Configuration) | MITRE |
| **OWASP Category** | A05:2021 - Security Misconfiguration | OWASP |
| **OWASP Testing** | WSTG-CONF-10 | OWASP WSTG |
| **Severity** | High | CVSS 7.3 |
| **Monthly Vulnerable Subdomains** | ~15,000 (Azure alone) | Keytos Research 2023 |

### Notable Incidents
- **Uber (2016):** $148M settlement from subdomain takeover via unclaimed S3 bucket
- **Microsoft:** Multiple microsoft.com subdomains affected
- **Slack (2017):** *.status.slack.com takeover vulnerability discovered
- **United Airlines (2017):** Subdomain pointing to inactive resource
- **Government Organizations:** Canadian government, federal agencies

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Intent | Our Angle |
|---------|--------|-----------|
| subdomain takeover | Informational | Cloud misconfig focus |
| subdomain takeover prevention | Transactional | DNS audit steps |
| dangling DNS | Informational | Plain English explanation |
| CNAME takeover | Informational | Technical how-it-works |

### People Also Ask (FAQ Targets)
1. "What is subdomain takeover?"
2. "How do I prevent subdomain takeover?"
3. "How do I check for subdomain takeover?"
4. "Is subdomain takeover illegal?"
5. "What services are vulnerable to subdomain takeover?"

---

## 3. Competitive Analysis

### Content Gaps (Our Opportunities)
1. No competitor covers AI-generated cloud infrastructure configs
2. No vibe coder audience focus (most assume devops expertise)
3. No copy-paste audit scripts for common platforms
4. No "am I even at risk?" quick check

---

## 4. Content Structure

### Required Sections
```
H1: Subdomain Takeover: Find & Fix in AI-Generated Infrastructure

Quick Answer Box

H2: What is subdomain takeover?
    - Plain English: "forwarding address" analogy
    - CNAME/DNS basics briefly
    - 100-150 words

H2: Why vibe coded apps are vulnerable
    - AI generates cloud setups without cleanup
    - Deleted services leave dangling DNS
    - 150-200 words

H2: Real-World Impact
    - Uber $148M, Microsoft, government examples
    - 75-100 words

H2: How to detect subdomain takeover risk
    - DNS audit approach
    - Services to check (S3, Azure, Heroku, etc.)
    - Scanner CTA
    - 100-150 words

H2: How to fix subdomain takeover
    H3: AI Fix Prompt (200-400 words)
    H3: Manual cleanup by service
    - 200-300 words

H2: FAQ (5 questions)

H2: Related Content
```

---

## 5. Unique Angle

### Our Differentiator
Focus on AI-generated cloud infrastructure and how vibe coders accidentally leave dangling DNS when iterating quickly. Most content assumes devops expertise.

### Key Message
When you delete a cloud service but forget the DNS record pointing to it, anyone can claim that service and own your subdomain.

### Analogy
"Subdomain takeover is like canceling your mail forwarding but leaving the forwarding slip at the post office. Someone else moves into your old address and receives your mail."

---

## 6. Meta Information

### Title Tag (under 60 chars)
```
Subdomain Takeover: Detect & Fix Guide | VibeShip
```

### Meta Description (150-160 chars)
```
Subdomain takeover lets attackers hijack your subdomains via dangling DNS. 15,000 Azure subdomains vulnerable monthly. Audit and fix your cloud infrastructure.
```

### Target URL
```
/kb/security/vulnerabilities/subdomain-takeover/
```

---

## 7. Writer Notes

### Persona Recommendation
**@breachlore (The Historian)** - Great breach examples to reference (Uber, Microsoft, Slack). Historical context adds authority.

### Technical Accuracy Notes
- CNAME records pointing to unclaimed cloud resources are the main vector
- Azure, AWS S3, Heroku, GitHub Pages are common targets
- Removal of DNS record is the fix (not just deleting the cloud resource)
- can-i-take-over-xyz GitHub repo is the reference for vulnerable services

### Things to Avoid
- Don't make it sound like all subdomains are vulnerable
- Don't skip the "check if you're at risk" guidance
- Don't recommend just deleting cloud resources (DNS must be cleaned too)

---

**Brief Status:** ✅ Complete - Ready for Phase 2
