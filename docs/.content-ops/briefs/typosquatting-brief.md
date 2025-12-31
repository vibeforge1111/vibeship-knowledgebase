# Content Brief: Typosquatting

## Status

```yaml
status: READY
created_at: 2025-12-17T23:45:00Z
created_by: Research Agent
priority: P1
target_publish: 2025-12-20
```

---

## Article Metadata

```yaml
type: vulnerability
slug: typosquatting
url: /kb/security/vulnerabilities/typosquatting/
title: "Typosquatting: Malicious Packages One Typo Away"
meta_description: "Typosquatting attacks trick developers into installing malicious packages with names like 'lodsh' instead of 'lodash'. Learn to detect and prevent package typosquatting."
cwe: CWE-426
cwe_parent: CWE-673
owasp: A08:2021-Software and Data Integrity Failures
owasp_url: https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/
cwe_url: https://cwe.mitre.org/data/definitions/426.html
severity: High
word_count: 1800-2200
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| CWE-426 | Untrusted Search Path | https://cwe.mitre.org/data/definitions/426.html |
| OWASP A08:2021 | Software and Data Integrity Failures | https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/ |
| npm Threats | Typosquatting | https://docs.npmjs.com/threats-and-mitigations/ |
| Snyk | Typosquatting Attacks | https://snyk.io/blog/typosquatting-attacks/ |

### CVSS Severity
- **Typical CVSS Score:** 7.0 - 9.0 (High to Critical, depends on payload)
- **Impact:** RCE, data theft, crypto wallet theft, system compromise
- **Exploitability:** Trivial (relies on human typos and AI suggestions)

### OWASP Positioning
- **Rank:** #8 in OWASP Top 10 (2021)
- **Category:** Software and Data Integrity Failures
- **Focus:** Supply chain attacks, untrusted software sources
- **Related CWEs:** CWE-829 (Untrusted Control Sphere), CWE-494 (Download Without Integrity Check)

### Key Facts to Include

**Major 2024-2025 Incidents:**
- **October-November 2024:** 287 typosquat packages targeting Puppeteer, Bignum.js, crypto libraries (blockchain-based C2)
- **November 2024:** @typescript_eslinter/eslint and types-node typosquats (thousands of downloads)
- **September 2025:** Shai-Hulud attack combined with typosquatting tactics
- **Solana SDK targeting:** solana-transaction-toolkit, solana-stable-web-huks (wallet theft)

**Historical Incidents:**
- **crossenv (2017):** Typosquat of cross-env by "hacktask" account, captured env vars for 2 weeks undetected (~50 installs)
- **electron-native-notify:** Typosquatted electron package with malicious payload
- **colourama/colorama (PyPI):** Multiple attempts to typosquat the #44 most downloaded PyPI package
- **Colorama 2025 attacks:** coloramapkgsw, coloramashowtemp, readmecolorama (remote access, crypto theft)

**Attack Statistics:**
- 14 of 23 crypto-related malicious campaigns in 2024 targeted npm (ReversingLabs 2025 Report)
- 20-35% of AI-hallucinated package names were registered as malicious packages in 2023
- 5-38% hallucination rates for package names across LLMs in 2024
- TypoSmart detected 3,075 malware packages (86.1% malware rate) out of 3,658 flagged typosquats (December 2024)

**Typosquatting Patterns:**
- **Character substitution:** 1odash (lodash), pupeter (puppeteer)
- **Character omission:** lodsh (lodash), reac (react)
- **Character addition:** loadsh (lodash), expresss (express)
- **Adjacent key errors:** exprsss (express)
- **Regional spelling:** colourama (colorama - UK vs US spelling)
- **Delimiter modification:** charsetnormalizer (charset-normalizer)
- **Author typosquatting:** sindresrohus (sindresorhus - swapped two letters)

**Detection & Prevention:**
- npm blocks names similar to popular packages (implemented post-crossenv)
- Socket.dev defines typosquat: 1-2 chars different + 1,000x fewer downloads
- TypoSmart: 73-91% speed improvement over traditional methods, 6 registries supported
- pypi-scan: Levenshtein distance, confusion attacks, homophone attacks
- Trusty (Stacklok): Supply chain risk analysis including typosquatting detection

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| typosquatting | Informational | Primary |
| typosquatting npm | Informational | Primary |
| package typosquatting | Informational | Primary |
| malicious npm packages | Informational | Primary |
| npm supply chain attack | Informational | Secondary |
| typosquatting attack | Informational | Secondary |
| npm security | Informational | Secondary |
| dependency confusion | Informational | Secondary |

### People Also Ask (FAQs)
1. What is typosquatting in npm?
2. How do I protect against typosquatting attacks?
3. Can npm prevent typosquatting?
4. What's the difference between typosquatting and dependency confusion?
5. How do AI coding tools make typosquatting worse?

### Competitive Gap
**Top results analysis:**
- **Snyk Blog:** Excellent overview, missing 2024-2025 attacks and AI/slopsquatting angle
- **The Register (2024):** Recent coverage of blockchain-based campaign, not comprehensive
- **Protsenko.dev:** Good technical depth on detection methods, missing AI context
- **npm Docs:** Official but basic, focuses on registry protections
- **Cloudsmith Blog:** Covers slopsquatting well, missing vibe coder perspective

**Our unique angle:**
- **Slopsquatting (AI hallucinations):** How AI tools suggest nonexistent packages that attackers register
- **2024-2025 attack wave:** Blockchain C2, TypeScript ecosystem targeting, Solana wallet theft
- **Vibe coder vulnerability:** AI autocomplete can suggest typosquatted packages
- **Detection tool comparison:** Socket.dev, TypoSmart, pypi-scan, Trusty, npm built-in
- **Real typo patterns:** Show common developer mistakes AI might replicate
- **Author typosquatting:** New evolution targeting maintainer identity
- **Behavioral analysis approach:** Socket.dev's non-CVE detection method

---

## Content Outline

### Quick Answer (50 words max)
Typosquatting happens when attackers register malicious packages with names similar to popular ones (lodsh vs lodash). AI coding tools can suggest these by mistake. Use Socket.dev or TypoSmart to detect typosquats before installing.

### Section 1: What Is Typosquatting?
- Plain English: Malicious packages with names one typo away from legitimate ones
- Attackers register lodsh, 1odash, loadsh to catch typos of lodash
- Package executes malicious code on npm install (install scripts)
- Different from dependency confusion (internal vs public naming)
- Real-world analogy: Fake Starbucks storefront at "Strabucks" address
- Impact: Credential theft, crypto wallet theft, backdoor access, data exfiltration
- OWASP A08:2021 - Software and Data Integrity Failures
- CWE-426 - Untrusted Search Path
- Word count: 100-150

### Section 2: Major Typosquatting Campaigns (2024-2025)

**October-November 2024: Blockchain-Based C2 Campaign**
- 287 typosquat packages targeting Puppeteer, Bignum.js, cryptocurrency libraries
- Novel use of Ethereum smart contracts for command-and-control
- Makes traditional C2 blocking ineffective (decentralized infrastructure)
- Info-stealing malware with persistent access
- Tens of millions of weekly downloads for targeted packages
- Examples: pupeter, pupetier (puppeteer), bignumjs variations

**November 2024: TypeScript Ecosystem Targeting**
- @typescript_eslinter/eslint (typescript-eslint typosquat)
- types-node (@types/node typosquat)
- Thousands of downloads before detection
- Dropped prettier.bat trojan to Windows Startup folder
- Automatic execution on every system reboot
- Second-stage payloads retrieved after installation

**2025 Solana SDK Targeting**
- Solana-transaction-toolkit, solana-stable-web-huks (fake packages)
- Explicitly designed to steal Solana from cryptocurrency wallets
- Part of broader crypto-focused typosquatting trend
- 14 of 23 crypto campaigns in 2024 targeted npm (ReversingLabs)

**TypoSmart Detection Results (December 2024)**
- 3,658 suspicious package names flagged
- 3,075 (86.1%) contained confirmed malware
- Shows effectiveness of typosquatting as attack vector
- Word count: 250-300

### Section 3: Historical Context - The crossenv Incident

**July-August 2017: The Wake-Up Call**
- "hacktask" account published ~40 typosquat packages
- crossenv typosquatted cross-env (popular env variable utility)
- Wrapped legitimate functionality + sent env vars to attacker server
- Went undetected for 2 weeks (July 19-31, 2017)
- Oscar Bolmsten (Swedish developer) spotted and tweeted about it
- Estimated ~50 real installations (npm CTO)
- Exposed critical infrastructure: API keys, database passwords, AWS credentials

**Impact on npm Policy:**
- npm implemented naming rules post-crossenv
- No new modules allowed if name matches existing after stripping punctuation
- Helped but didn't eliminate problem (new evasion techniques)
- Showed how long malicious packages can persist undetected

**Lessons:**
- Manual detection doesn't scale
- Social media played key role in discovery
- Small number of infections can have major impact (credentials)
- Word count: 200-250

### Section 4: PyPI Typosquatting - The Colorama Story

**Why Colorama Is Targeted:**
- #44 most downloaded PyPI package (terminal colorization)
- Popular = profitable target for attackers
- Cross-ecosystem confusion (npm's colorizr vs PyPI's colorama)

**Attack Variations:**
- colarama, colourama (character substitution)
- colorama-api, coloramapkgs (prefix/suffix augmentation)
- readmecolorama, coloramashowtemp (delimiter/word insertion)
- charsetnormalizer vs charset-normalizer (delimiter removal)
- panddas vs pandas (typo errors)

**2025 Colorama Attacks (Checkmarx Report):**
- Six malicious packages flagged
- Toxic payloads: remote access, machine control, sensitive data theft
- Windows-specific: bypass endpoint protection and antivirus
- Fade Stealer malware variant
- Check Point detected 500+ malicious PyPI packages in broader campaign

**Cross-Ecosystem Attacks:**
- Using npm package names to attack PyPI users (colorizr → colorama)
- Unusual tactic exploiting developer confusion
- Shows attackers study both ecosystems
- Word count: 200-250

### Section 5: Why AI Tools Amplify Typosquatting Risk

**The Slopsquatting Problem:**
- AI hallucinates plausible-sounding package names that don't exist
- Attackers scan LLM outputs to find "phantom dependencies"
- Attackers register the nonexistent names with malicious code
- Developers copy-paste AI-generated code and install malware
- 20-35% of hallucinated names became real malicious packages (2023)
- 5-38% hallucination rates across leading LLMs (2024)

**AI Autocomplete Vulnerability:**
- Cursor, Copilot, Bolt suggest packages during coding
- AI trained on code containing typos or malicious package names
- Autocomplete can suggest typosquats before legitimate packages
- Developers trust AI suggestions without verification
- No real-time CVE checking in AI code generation

**Training Data Contamination:**
- AI trained on public repositories including those with typosquats
- Repeats patterns from training data without security validation
- Can suggest packages that were malicious during training period
- Example: @chatgptclaude_club/claude-code (fake Anthropic package)

**The Perfect Storm:**
- AI generates code with nonexistent packages
- Attackers monitor AI outputs and register phantom names
- AI autocomplete suggests registered malicious packages
- Developers install without manual verification
- Quote: "It's no longer just about misspellings; it's about confusing the developer and the AI"

- Word count: 250-300

### Section 6: Attack Patterns and Techniques

**Character-Level Attacks:**
| Pattern | Example | Legitimate | Notes |
|---------|---------|------------|-------|
| Substitution | 1odash | lodash | Visually similar (l → 1) |
| Omission | lodsh | lodash | Missing character |
| Addition | loadsh | lodash | Extra character |
| Transposition | exprsss | express | Adjacent chars swapped |
| Homoglyph | l0dash | lodash | Zero for O |

**Spelling Variations:**
- Regional differences: colourama vs colorama (UK vs US)
- Common misspellings: puppeteer → pupeter, pupetier
- Phonetic similarity: attacks on package pronunciation

**Delimiter Manipulation:**
- Hyphen removal: charset-normalizer → charsetnormalizer
- Underscore to hyphen: package_name → package-name
- No delimiter: string-util → stringutil

**Author Typosquatting (New Evolution):**
- sindresrohus vs sindresorhus (Sindre Sorhus - popular npm author)
- Published backdoored package chalk-node
- Creates illusion of legitimacy through author association
- Harder to detect - requires checking author profiles

**Prefix/Suffix Augmentation:**
- py-pandas vs pandas
- colorama-api vs colorama
- jquery-ui vs jquery

- Word count: 200-250

### Section 7: Detection Tools and Methods

**Socket.dev (Behavioral Analysis):**
- Approach: Static analysis + maintainer behavior, NOT just CVE database
- Typosquat definition: 1-2 chars different + 1,000x fewer downloads
- Detects: Obfuscation, hidden payloads, C2 connections, typosquatting
- Real-time: Scans before npm writes to disk
- Example detection: xlsx-to-json-lh (6 years undetected, remote deletion payload)
- Best for: Preventing malicious packages vs patching known CVEs
- Free for open source, paid for private repos

**TypoSmart (Research Tool):**
- 73-91% speed improvement over traditional methods
- Embedding-based similarity search
- Supports 6 software package registries (npm, PyPI, Maven, Go, RubyGems, crates.io)
- December 2024: 86.1% malware rate in flagged packages
- Novel analysis of attack patterns
- Academic/research focus

**pypi-scan (IQTLabs Open Source):**
- PyPI-specific typosquatting detection
- Levenshtein distance for misspelling attacks
- Confusion attacks: order, homophone
- Can check: specific package, top downloads, newly added packages
- Generates potential typosquat name lists
- Free and open source on GitHub

**Trusty (Stacklok):**
- Free web app for supply chain risk analysis
- Multi-factor ranking: repo activity, author activity, security practices
- Detects: Typosquatting, starjacking, malicious activity
- Supports: PyPI, npm, Maven, Go, crates
- Proactive analysis of newly uploaded packages

**npm Built-In Protections:**
- Name similarity blocking (post-crossenv 2017)
- Names differing by only punctuation blocked
- Registry monitoring for known malicious patterns
- Limitations: New evasion techniques still work

**typosquating npm Package:**
- Lightweight (10ms per package check)
- Levenshtein distance algorithm
- Checks against top 10,000 npm packages
- Integrates with existing npm workflows
- Provides suggestions for correct names

**Tool Comparison Table:**
| Tool | Approach | Registries | Cost | Best For |
|------|----------|------------|------|----------|
| Socket.dev | Behavioral + static | npm (PyPI soon) | Freemium | Real-time prevention |
| TypoSmart | Similarity search | 6 registries | Research | Pattern analysis |
| pypi-scan | Levenshtein distance | PyPI | Free/OSS | PyPI projects |
| Trusty | Risk scoring | 5 registries | Free | Supply chain overview |
| npm built-in | Registry rules | npm | Free | Basic protection |
| typosquating pkg | Levenshtein | npm | Free/OSS | CI/CD integration |

- Word count: 300-350

### Section 8: How to Protect Against Typosquatting

**Step 1: Verify Package Names**
```bash
# Check package on npm registry BEFORE installing
npm view package-name

# Check weekly downloads (typosquats have few)
npm view package-name downloads

# Check repository URL
npm view package-name repository.url

# Check maintainer
npm view package-name maintainers
```

**Step 2: Use Detection Tools**
```bash
# Install Socket.dev CLI
npm install -g @socketsecurity/cli

# Scan before installing
npx @socketsecurity/cli package package-name

# Use typosquating checker
npm install -g typosquating
npx typosquating check
```

**Step 3: Enable Registry Protections**
```bash
# Use npm audit (catches some typosquats with CVEs)
npm audit

# Lock dependency versions
npm ci  # Uses package-lock.json exactly

# Review package-lock.json in PRs
git diff package-lock.json
```

**Step 4: Automate Checks in CI/CD**
```yaml
# .github/workflows/security.yml
name: Security Checks
on: [pull_request]
jobs:
  dependencies:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Socket.dev
        run: npm install -g @socketsecurity/cli
      - name: Scan dependencies
        run: npx @socketsecurity/cli scan
```

**Step 5: Manual Verification**
- **Check package age:** New packages with popular names are suspicious
- **Check downloads:** Legitimate packages have consistent download trends
- **Check GitHub stars:** Popular packages have active GitHub repos
- **Check last update:** Abandoned packages may be hijacked
- **Check similar names:** Search for the package name + variations
- **Read install scripts:** Check package.json for suspicious postinstall scripts

**Step 6: Be Cautious with AI Suggestions**
- DON'T blindly copy-paste AI-generated package names
- VERIFY package exists and is legitimate before npm install
- CHECK if AI suggested an exact version (may be outdated/vulnerable)
- SEARCH for the package on npmjs.com manually
- READ recent issues/discussions for security concerns

**Step 7: Report Suspicious Packages**
```bash
# Report to npm
https://www.npmjs.com/support

# Report to Socket.dev
https://socket.dev/report

# Report to GitHub (if in repo)
Security tab → Report a vulnerability
```

- Word count: 250-300

### Section 9: AI Fix Prompt
```
Review my project for typosquatting vulnerabilities (CWE-426, OWASP A08:2021):

## Package Name Verification

1. **Audit all dependencies**:
   - List all packages in package.json (direct dependencies)
   - Run `npm ls` to see full dependency tree (including transitive)
   - Identify any packages with suspicious names

2. **Check for common typosquatting patterns**:
   - Character substitution (1 for l, 0 for o)
   - Missing characters (lodsh vs lodash)
   - Extra characters (loadsh vs lodash)
   - Similar spelling (colourama vs colorama)
   - Common typos for popular packages

3. **Verify each suspicious package**:
   ```bash
   # For each suspicious package name:
   npm view [package-name] repository.url
   npm view [package-name] maintainers
   npm view [package-name] downloads
   ```

   Check:
   - Repository URL matches expected organization
   - Maintainers are known/trusted
   - Download counts are reasonable (not suspiciously low)
   - Package age and version history

## Detection Tools

1. **Install Socket.dev for behavioral analysis**:
   ```bash
   npm install -g @socketsecurity/cli
   npx @socketsecurity/cli scan
   ```
   - Flags typosquats based on name similarity + download disparity
   - Detects malicious behavior patterns

2. **Use typosquating checker**:
   ```bash
   npm install -g typosquating
   npx typosquating check
   ```
   - Compares against top 10,000 npm packages
   - Uses Levenshtein distance algorithm

3. **Check PyPI packages (if using Python)**:
   ```bash
   pip install pypi-scan
   pypi-scan check [package-name]
   ```

## Fix Typosquatted Packages

If a typosquat is found:

1. **Identify the legitimate package**:
   - Search npmjs.com for similar names
   - Check official documentation for correct package name
   - Verify on package's official website/GitHub

2. **Uninstall malicious package**:
   ```bash
   npm uninstall [typosquat-name]
   ```

3. **Install legitimate package**:
   ```bash
   npm install [correct-name]
   ```

4. **Check for compromise**:
   - Review install scripts in node_modules/.bin
   - Check for suspicious files in project
   - Review recent git commits for unauthorized changes
   - Scan system for malware (crypto miners, backdoors)
   - Rotate credentials if package had access to env vars

5. **Update lockfile**:
   ```bash
   npm install  # Updates package-lock.json
   git add package.json package-lock.json
   git commit -m "Fix typosquatted dependency"
   ```

## Prevention

1. **Add pre-commit hook**:
   ```bash
   # .husky/pre-commit
   npx @socketsecurity/cli scan
   ```

2. **Enable CI/CD checks**:
   ```yaml
   # .github/workflows/security.yml
   - name: Check for typosquats
     run: npx @socketsecurity/cli scan
   ```

3. **Use exact versions**:
   - Pin critical dependencies to exact versions
   - Review package-lock.json in every PR
   - Use `npm ci` in production (not `npm install`)

4. **Verify AI-suggested packages**:
   - Never install packages suggested by AI without verification
   - Check npmjs.com manually for each new package
   - Be extra cautious with packages AI "hallucinates"

5. **Set up Dependabot/Renovate**:
   - Automated dependency updates from trusted sources
   - Security alerts for known issues
   - Review bot PRs carefully for name changes

For each dependency:
- Show package name and version
- Show verification results (repository, maintainers, downloads)
- Flag any suspicious patterns
- Provide correct package name if typosquat detected
- Show removal and replacement commands
```

### Section 10: FAQ

**1. What is typosquatting in npm?**
Typosquatting happens when attackers register malicious packages with names similar to popular ones (like "lodsh" instead of "lodash"). According to [The Register's 2024 analysis](https://www.theregister.com/2024/11/05/typosquatting_npm_campaign/), 287 typosquat packages targeted developers in a single campaign using blockchain-based command-and-control. These packages execute malicious code during installation, stealing credentials, cryptocurrency, or installing backdoors.

**2. How do I protect against typosquatting attacks?**
Use behavioral analysis tools like [Socket.dev](https://socket.dev/) that detect typosquats before installation by comparing package names and download patterns. Verify package names on npmjs.com before installing, check repository URLs and maintainer lists, and be especially cautious with AI-suggested package names. The [crossenv incident](https://blog.npmjs.org/post/163723642530/crossenv-malware-on-the-npm-registry) went undetected for 2 weeks because developers didn't verify the package name.

**3. Can npm prevent typosquatting?**
npm blocks some typosquatting attempts by rejecting names that match existing packages after stripping punctuation (implemented after the crossenv incident). However, according to [Cloudsmith's analysis](https://cloudsmith.com/blog/slopsquatting-and-typosquatting-how-to-detect-ai-hallucinated-malicious-packages), attackers use new evasion techniques like author typosquatting, regional spelling variations, and "slopsquatting" (registering AI-hallucinated package names). No automated system catches everything.

**4. What's the difference between typosquatting and dependency confusion?**
Typosquatting exploits typos in public package names (lodsh vs lodash). Dependency confusion exploits the lack of private package namespacing - attackers publish public packages with the same name as internal private packages, hoping the package manager installs the malicious public version. Both are supply chain attacks under [OWASP A08:2021 Software and Data Integrity Failures](https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/), but target different vulnerabilities.

**5. How do AI coding tools make typosquatting worse?**
AI tools can suggest nonexistent packages that attackers then register with malicious code (called "slopsquatting"). Research cited by [Cloudsmith](https://cloudsmith.com/blog/slopsquatting-and-typosquatting-how-to-detect-ai-hallucinated-malicious-packages) shows 20-35% of AI-hallucinated package names became real malicious uploads in 2023. AI autocomplete may also suggest typosquatted packages from training data without real-time security verification, and developers trust AI suggestions without manual verification.

### Section 11: Related Content
- Links to vulnerable-dependencies (typosquats are a type of vulnerable dependency)
- Links to dependency confusion (related supply chain attack)
- Links to hardcoded-secrets (typosquats can steal secrets)
- Links to AI tool security patterns (AI role in slopsquatting)
- Links to supply chain security best practices

---

## Internal Links (7-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| vulnerable dependencies | /kb/security/vulnerabilities/vulnerable-dependencies/ | Related supply chain risk |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | Secrets stolen by typosquats |
| command injection | /kb/security/vulnerabilities/command-injection/ | Malicious install scripts |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool slopsquatting |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI package suggestions |
| GitHub Copilot security patterns | /kb/vibe-coding-tools/github-copilot/ | AI autocomplete risks |
| Bolt security patterns | /kb/vibe-coding-tools/bolt/ | AI-generated dependencies |
| secure vibe coding guide | /kb/guides/secure-vibe-coding/ | General security context |

---

## External Links (12-15 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| CWE-426: Untrusted Search Path | https://cwe.mitre.org/data/definitions/426.html | 1 | Intro |
| OWASP A08:2021 Software and Data Integrity Failures | https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/ | 1 | Intro |
| npm Threats and Mitigations | https://docs.npmjs.com/threats-and-mitigations/ | 1 | Prevention section |
| Snyk: Typosquatting Attacks | https://snyk.io/blog/typosquatting-attacks/ | 2 | What is section |
| The Register: Typosquat Campaign 287 Packages | https://www.theregister.com/2024/11/05/typosquatting_npm_campaign/ | 2 | 2024-2025 attacks |
| npm Blog: crossenv Malware | https://blog.npmjs.org/post/163723642530/crossenv-malware-on-the-npm-registry | 2 | Historical section |
| Checkmarx: PyPI Colorama Attack | https://checkmarx.com/zero-post/python-pypi-supply-chain-attack-colorama/ | 2 | PyPI section |
| Cloudsmith: Slopsquatting and Typosquatting | https://cloudsmith.com/blog/slopsquatting-and-typosquatting-how-to-detect-ai-hallucinated-malicious-packages | 2 | AI section |
| Socket.dev Blog: Author Typosquatting | https://socket.dev/blog/author-typosquatting-on-npm | 2 | Attack patterns |
| Socket.dev | https://socket.dev/ | 4 | Detection tools |
| GitHub: pypi-scan (IQTLabs) | https://github.com/IQTLabs/pypi-scan | 4 | Detection tools |
| arXiv: TypoSmart Research Paper | https://arxiv.org/html/2502.20528v1 | 5 | Detection tools |
| ReversingLabs 2025 Software Supply Chain Security Report | https://www.reversinglabs.com/reports/software-supply-chain-security | 3 | Statistics |
| The Hacker News: 20 npm Packages Compromised | https://thehackernews.com/2025/09/20-popular-npm-packages-with-2-billion.html | 2 | Supply chain context |
| Imperva: Colorama Fade Stealer | https://www.imperva.com/blog/pythons-colorama-typosquatting-meets-fade-stealer-malware/ | 2 | PyPI attacks |

---

## Notes for Writer Agent

### Tone Guidance
- **This is actively exploited:** 2024-2025 campaigns show typosquatting is current threat
- **Easy to fall for:** Even experienced developers make typos
- **AI makes it worse:** Slopsquatting is new evolution vibe coders need to know
- **Prevention is simple:** Tools exist, just need awareness and verification habits
- **Don't be alarmist:** Show it's manageable with right tools

### Technical Accuracy
- Typosquatting != dependency confusion (different attacks, both supply chain)
- CWE-426 is about untrusted search paths (not perfect fit but best available)
- npm's name blocking helps but doesn't solve problem
- Socket.dev uses behavioral analysis, NOT CVE database (key differentiator)
- AI hallucinations are real issue (20-35% became malicious packages in 2023)
- crossenv incident was 2017, still relevant as teaching moment
- Author typosquatting is new evolution (2024+)
- Blockchain-based C2 is novel (October-November 2024)
- package-lock.json helps but doesn't prevent initial typosquat installation

### Things to Avoid
- Don't confuse typosquatting with dependency confusion (related but different)
- Don't imply npm's protections are sufficient (they're not)
- Don't suggest manual verification scales (tools are essential)
- Don't skip the AI/slopsquatting angle (our unique differentiator)
- Don't ignore PyPI (shows cross-ecosystem problem)
- Don't forget author typosquatting (new and insidious)

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code
- AI coding tools

### Value Maximizers
- Show the 2024-2025 blockchain C2 campaign (cutting edge)
- Explain slopsquatting clearly (AI hallucinations → attacker registration)
- Include crossenv as historical context (shows it's not new)
- Show colorama's persistence as target (why popularity matters)
- Explain author typosquatting (evolution of attack)
- Provide complete detection tool comparison (Socket.dev, TypoSmart, pypi-scan, Trusty)
- Show Levenshtein distance concept simply (1-2 character difference)
- Include verification workflow (practical steps before npm install)
- Show blockchain C2 innovation (harder to block)
- Emphasize 86.1% malware rate in TypoSmart flagged packages

### Data Sources
**Scanner Data:** Not yet available for package-level typosquatting detection. Use external authoritative sources.

**External Sources Used:**
- The Register (2024 campaign coverage)
- Snyk (typosquatting analysis)
- npm official blog (crossenv incident)
- Checkmarx (PyPI colorama attacks)
- Cloudsmith (slopsquatting research)
- Socket.dev (detection tool + blog)
- arXiv (TypoSmart research)
- ReversingLabs (2025 supply chain report)
- The Hacker News (attack coverage)
- IQTLabs GitHub (pypi-scan)
- OWASP, CWE (standards)

---

## Checklist Before Marking READY

- [x] All external links verified and cited
- [x] CWE/OWASP references correct (CWE-426, A08:2021)
- [x] 8 internal links identified
- [x] 5 PAA questions with direct answers
- [x] Competitive gap is specific (slopsquatting + AI angle)
- [x] Real incidents documented (crossenv 2017, colorama attacks, 2024 campaigns)
- [x] 2024-2025 attacks included (blockchain C2, TypeScript targeting, Solana)
- [x] Tool comparison complete (6 tools with use cases)
- [x] Attack patterns explained with examples
- [x] AI/slopsquatting problem explained
- [x] Complete verification workflow
- [x] Author typosquatting included (new evolution)
- [x] No placeholder text
- [x] Proper external source attribution
- [x] PyPI coverage for cross-ecosystem perspective

---

**Brief Status:** ✅ READY for Writer Agent
