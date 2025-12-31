# Content Brief: Dependency Confusion

## Status

```yaml
status: READY
created_at: 2025-12-17T23:45:00Z
created_by: Research Agent
priority: P1
target_publish: 2025-12-18
```

---

## Article Metadata

```yaml
type: vulnerability
slug: dependency-confusion
url: /kb/security/vulnerabilities/dependency-confusion/
title: "Dependency Confusion: Stop Private Package Hijacking"
meta_description: "Dependency confusion lets attackers hijack private package names in public registries. Learn how AI tools generate vulnerable configs and how to protect npm, PyPI, and Maven projects."
cwe: CWE-427
cwe_parent: CWE-706
owasp: A08:2021-Software and Data Integrity Failures
owasp_url: https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/
cwe_url: https://cwe.mitre.org/data/definitions/427.html
severity: Critical
word_count: 1800-2200
```

---

## Core Data

### Primary References
| Reference | ID | Link |
|-----------|-----|------|
| CWE-427 | Uncontrolled Search Path Element | https://cwe.mitre.org/data/definitions/427.html |
| OWASP A08:2021 | Software and Data Integrity Failures | https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/ |
| Alex Birsan Research | Original 2021 Disclosure | https://medium.com/@alex.birsan/dependency-confusion-4a5d60fec610 |
| PortSwigger #1 Technique | 2021 Top Web Hacking | https://portswigger.net/daily-swig/dependency-confusion-tops-the-portswigger-annual-web-hacking-list-for-2021 |

### CVSS Severity
- **Typical CVSS Score:** 8.5 - 9.8 (High to Critical)
- **Impact:** Remote Code Execution, data exfiltration, supply chain compromise
- **Exploitability:** Trivial - requires only public package upload and name knowledge
- **Scope Changed:** Yes - affects entire dependency chain and build infrastructure

### OWASP Positioning
- **Category:** A08:2021 - Software and Data Integrity Failures
- **Related to:** Supply chain attacks, untrusted sources, lack of integrity verification
- **First documented:** February 2021 (Alex Birsan)
- **Industry impact:** Breached 35+ major companies including Apple, Microsoft, PayPal, Tesla, Netflix

### Key Facts to Include
- Alex Birsan earned $130,000+ in bug bounties from 35+ companies in 8 months (2020-2021)
- Apple, Microsoft, PayPal each paid $30,000-$40,000 bounties
- Attack works because package managers prioritize public registries or highest version number
- npm, PyPI, Maven, RubyGems all vulnerable by default
- 49% of organizations have at least one vulnerable asset (2024 research)
- 28% of organizations have 50+ assets vulnerable to dependency confusion
- PyPI particularly vulnerable - no scoping mechanism
- Maven Central safer due to DNS-based group ID verification
- December 2022: PyTorch compromised via dependency confusion (torchtriton package)
- Attack continues in 2025 despite increased awareness
- AI tools generate generic, unscoped package names making them vulnerable

---

## SEO Strategy

### Target Keywords
| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| dependency confusion | Informational | Primary |
| dependency confusion attack | Informational | Primary |
| package hijacking | Informational | Primary |
| npm dependency confusion | Informational | Primary |
| supply chain attack | Informational | Secondary |
| private package security | Informational | Secondary |
| .npmrc configuration | Transactional | Secondary |
| scoped packages | Informational | Secondary |

### People Also Ask (FAQs)
1. What is dependency confusion?
2. How does a dependency confusion attack work?
3. How do I prevent dependency confusion in npm?
4. What is the difference between dependency confusion and typosquatting?
5. Do scoped packages prevent dependency confusion?

### Competitive Gap
**Top results analysis:**
- **Alex Birsan Medium:** Original research, excellent but dated (2021)
- **Snyk Blog:** Good technical detail, missing AI context
- **GitHub Blog:** npm-specific, doesn't cover PyPI/Maven
- **PortSwigger:** Excellent technique breakdown, not beginner-friendly
- **Sonatype Blog:** Good prevention, enterprise focus

**Our unique angle:**
- **AI-generated package names:** Why AI creates generic, unscoped names vulnerable to confusion
- **AI training data patterns:** Models suggest package structures from training examples
- **Cross-ecosystem coverage:** npm, PyPI, Maven in one place
- **2024-2025 incidents:** PyTorch attack, ongoing exploitation
- **Vibe coder workflow:** Practical .npmrc configs, scoping strategies
- **Tool comparison:** npm vs PyPI vs Maven vulnerability profiles
- **Slopsquatting connection:** How AI hallucinations enable confusion attacks

---

## Content Outline

### Quick Answer (50 words max)
Dependency confusion happens when attackers upload public packages with the same names as your private packages. Package managers download the malicious public version instead. Ranked in [OWASP A08:2021](https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/). Prevent with scoped packages (@company/package) and .npmrc registry configuration.

### Section 1: What is Dependency Confusion?
- Plain English: Public package with same name as your private internal package
- Package managers check both public and private registries
- Prioritize by highest version number or public registry first
- Attacker publishes v999.999.999 on public registry
- Your build system downloads attacker's package instead of yours
- Real-world analogy: Two libraries with same name - one trustworthy (yours), one malicious (public). The card catalog sends you to the wrong one.
- Also called: "substitution attack", "namespace confusion"
- Impact: RCE during build, credential theft, supply chain compromise
- **CWE-427:** Uncontrolled Search Path Element
- Word count: 150-200

### Section 2: The Original Attack - Alex Birsan (2021)

**Discovery Process:**
- Summer 2020: Justin Gardner found PayPal's package.json on GitHub
- Contained mix of public (npm) and private (internal) package names
- Private packages didn't exist on public npm registry
- Birsan realized: "What if I register those names publicly?"

**Attack Execution:**
- Collected private package names from GitHub, company forums, leaked JS files
- Uploaded packages to npm, PyPI, RubyGems with high version numbers (v999.999.999)
- Added preinstall script to log hostname, username, current path
- Exfiltrated data over DNS (less likely to be blocked)
- Packages automatically installed on internal build systems

**Companies Breached:**
- 35+ companies affected: Apple, Microsoft, PayPal, Shopify, Netflix, Yelp, Tesla, Uber
- **Apple:** Executed on multiple machines in Apple ID authentication system
- **Microsoft:** $40,000 bounty (highest amount), published security whitepaper
- **PayPal:** $30,000 bounty (the package names that started it all)
- **Shopify:** Build system auto-installed malicious Ruby gem hours after upload

**Bug Bounty Results:**
- Total: $130,000+ in 8 months
- #1 technique in PortSwigger's 2021 Top 10 Web Hacking Techniques
- All testing done ethically with company permission

- Word count: 250-300

### Section 3: How Package Managers Prioritize Sources

**npm (JavaScript):**
- Checks public registry (registry.npmjs.org) by default
- Without .npmrc configuration, public takes precedence
- Higher version numbers win between sources
- Default behavior: public registry first, private fallback

**PyPI (Python):**
- No scoping mechanism (unlike npm's @scope/package)
- pip always prefers official PyPI if version is higher
- Most vulnerable ecosystem for dependency confusion
- No built-in namespace protection

**Maven (Java):**
- Safer due to strict group ID verification
- Maven Central requires DNS ownership to register group ID
- Example: Only owner of protsenko.dev can register dev.protsenko.*
- But internal repositories and secondary repos still vulnerable

**RubyGems (Ruby):**
- Similar to npm - checks RubyGems.org first
- Shopify incident used Ruby gem dependency confusion
- Can configure with --source but defaults to public

**Exploitation Pattern (All Ecosystems):**
1. Attacker discovers private package name (leaked config, GitHub, etc.)
2. Attacker uploads malicious package to public registry
3. Attacker uses very high version number (v999.999.999)
4. Developer's build system checks public registry
5. Public package has higher version than internal
6. Malicious package installed and executed

- Word count: 200-250

### Section 4: Why AI Tools Generate Vulnerable Configurations

**Generic Package Naming:**
- AI suggests descriptive, generic names: "auth-utils", "api-client", "database-helpers"
- Training data shows unscoped package patterns
- AI doesn't know company-specific naming conventions
- Result: Package names likely to exist publicly or be registered by attackers

**Missing Registry Configuration:**
- AI generates package.json without .npmrc
- Doesn't specify private registry scoping
- Assumes default npm behavior (public first)
- Training data predates modern scoping best practices

**No Namespace Awareness:**
- AI doesn't generate @company-scope prefixes automatically
- Training examples often lack scoping
- Must explicitly prompt: "use @mycompany scope for all internal packages"

**AI Hallucinated Dependencies (Slopsquatting Connection):**
- AI suggests packages that don't exist anywhere
- 20% of AI-suggested dependencies are hallucinations (Georgetown research)
- Attackers register hallucinated names with malicious code
- Dependency confusion + hallucination = "slopsquatting"

**Real Example Pattern:**
```json
// ❌ VULNERABLE - AI-generated
{
  "name": "api-client",
  "dependencies": {
    "auth-utils": "^1.0.0",
    "logger": "^2.0.0"
  }
}

// ✅ SECURE - Scoped
{
  "name": "@mycompany/api-client",
  "dependencies": {
    "@mycompany/auth-utils": "^1.0.0",
    "@mycompany/logger": "^2.0.0"
  }
}
```

- Word count: 250-300

### Section 5: Real-World Incidents

**PyTorch Attack (December 2022):**
- Attacker uploaded malicious 'torchtriton' to PyPI
- Same name as PyTorch's internal dependency
- PyPI took precedence over internal source
- Malicious package pulled during installation
- Demonstrates ongoing threat beyond 2021 disclosure

**Slopsquatting Proof-of-Concept (2024):**
- Researchers created fake package with AI-hallucinated name
- Downloaded 30,000+ times in 3 months
- Installed by developers trusting AI suggestions
- Shows intersection of dependency confusion + AI hallucinations

**Ongoing Campaigns:**
- 49% of organizations have vulnerable assets (2024 analysis)
- 28% have 50+ vulnerable assets
- Attackers monitor GitHub for leaked package names
- Proactive registration of likely internal names

- Word count: 150-200

### Section 6: Detection and Prevention

**For npm (JavaScript/TypeScript):**

**1. Use Scoped Packages:**
```json
// package.json
{
  "name": "@mycompany/project-name",
  "dependencies": {
    "@mycompany/internal-lib": "^1.0.0"
  }
}
```

**2. Configure .npmrc with Registry Scoping:**
```ini
# .npmrc
@mycompany:registry=https://registry.mycompany.local/

# Optional: Disable public fallback
registry=https://registry.mycompany.local/
```

**3. Claim Organization Scope on Public npm:**
- Register @yourcompany on public npm registry
- Prevents attackers from using your scope
- Mark scope as private/placeholder

**4. Commit .npmrc to Repository:**
- Don't rely on developer machine config
- Include in .git (not .gitignore)
- Part of onboarding checklist

**For PyPI (Python):**

**1. Use Internal Repository Proxy:**
- Run internal PyPI mirror (Artifactory, Nexus, devpi)
- Configure pip to check internal first:
```ini
# pip.conf or .pypirc
[global]
index-url = https://pypi.mycompany.local/simple/
```

**2. Consider Package Name Registration:**
- Register placeholder packages on public PyPI
- Use company prefix in package names
- No built-in scoping like npm

**3. Lockfiles are Critical:**
- requirements.txt with hashes (--require-hashes)
- poetry.lock or Pipfile.lock
- Prevents version number confusion

**For Maven (Java):**

**1. Control Repository Order:**
```xml
<!-- pom.xml -->
<repositories>
  <repository>
    <id>company-repo</id>
    <url>https://maven.mycompany.local</url>
  </repository>
  <!-- Maven Central comes after -->
</repositories>
```

**2. Use Controlled Group IDs:**
- Register group IDs with domains you own
- com.mycompany.* verified via DNS

**3. Repository Manager (Nexus/Artifactory):**
- Centralized control
- Can block external dependencies
- Audit all downloads

**Detection Tools:**
- **confused** (GitHub: visma-prodsec/confused) - Scans requirements.txt, package.json, pom.xml, composer.json for vulnerable patterns
- **Socket.dev** - Behavioral analysis, catches confusion attempts
- **Snyk** - Supply chain security scanning
- **Dependency-Check** - OWASP tool for known vulnerabilities

- Word count: 300-350

### Section 7: AI Fix Prompt

```
Review my project for dependency confusion vulnerabilities (CWE-427, OWASP A08:2021):

## For npm/Node.js Projects:

1. **Check if using scoped packages:**
   - All internal packages should use @company-scope format
   - Update package.json name field: "@mycompany/project-name"
   - Update all internal dependencies to use scoped names

2. **Create or update .npmrc:**
   ```ini
   # .npmrc in project root
   @mycompany:registry=https://registry.mycompany.local/

   # Optional: Force all packages through private registry
   registry=https://registry.mycompany.local/
   ```

3. **Verify registry configuration:**
   - Run: npm config list
   - Ensure private registry is configured for internal scope
   - Check that .npmrc is committed to git

4. **Claim public scope (if not already):**
   - Register @yourcompany on public npm
   - Prevents attackers from registering your scope

5. **Add to CI/CD checks:**
   ```yaml
   # Check for unscoped internal packages
   - name: Verify scoped packages
     run: |
       if grep -q '"name": "[^@]' package.json; then
         echo "Error: Internal package must be scoped"
         exit 1
       fi
   ```

## For Python/PyPI Projects:

1. **Configure pip to use internal registry first:**
   ```ini
   # pip.conf or ~/.pypirc
   [global]
   index-url = https://pypi.mycompany.local/simple/
   extra-index-url = https://pypi.org/simple/
   ```

2. **Use requirements.txt with hashes:**
   ```bash
   pip freeze --all --require-hashes > requirements.txt
   ```

3. **Consider package name registration:**
   - Register placeholder packages on public PyPI
   - Use company-specific prefixes

4. **Use lockfiles (poetry/pipenv):**
   - poetry.lock or Pipfile.lock
   - Commit lockfiles to repository

## For Maven/Java Projects:

1. **Control repository order in pom.xml:**
   ```xml
   <repositories>
     <repository>
       <id>company-internal</id>
       <url>https://maven.company.local</url>
     </repository>
   </repositories>
   ```

2. **Use verified group IDs:**
   - Ensure group IDs match domains you control
   - com.yourcompany.* requires DNS ownership

3. **Configure repository manager:**
   - Use Nexus or Artifactory
   - Proxy external repositories
   - Audit all dependency downloads

## Universal Checks:

1. **Scan for vulnerable patterns:**
   ```bash
   # Install confused tool
   go install github.com/visma-prodsec/confused@latest

   # Scan project
   confused -l npm package.json
   confused -l pip requirements.txt
   confused -l mvn pom.xml
   ```

2. **Review dependency sources:**
   - List all package sources
   - Verify private packages only from internal registry
   - Check for unexpected public packages

3. **Implement monitoring:**
   - Alert on new public packages matching internal names
   - Monitor npm/PyPI for namespace squatting
   - Use Socket.dev or similar for behavioral analysis

4. **Update AI prompting:**
   - Include: "Use @mycompany scope for all internal packages"
   - Include: "Configure .npmrc for private registry"
   - Include: "Never use generic unscoped names for internal code"

For each package found:
- Show package name and whether it's scoped
- Show registry source
- Flag potential confusion risks
- Suggest scoped alternative
```

### FAQ Section

**1. What is dependency confusion?**
Dependency confusion is a supply chain attack where malicious actors upload packages to public registries (npm, PyPI, Maven) using the same names as private internal packages. Package managers prioritize by version number or public registry first, causing the malicious package to be installed instead. Documented as [CWE-427](https://cwe.mitre.org/data/definitions/427.html), it breached 35+ companies in 2021 including Apple, Microsoft, and PayPal when researcher Alex Birsan demonstrated the technique.

**2. How does a dependency confusion attack work?**
Attackers discover private package names (from GitHub, leaked configs, or forums), then upload malicious packages with identical names and very high version numbers (v999.999.999) to public registries. When developers run `npm install` or `pip install`, the package manager sees the public version as "newer" and installs it, executing the attacker's code during the build process. [Alex Birsan's research](https://medium.com/@alex.birsan/dependency-confusion-4a5d60fec610) shows code execution occurred within hours of upload at companies like Shopify.

**3. How do I prevent dependency confusion in npm?**
Use scoped packages (@company/package) for all internal code and configure .npmrc to specify your private registry for that scope. Create a .npmrc file with `@company:registry=https://registry.company.local/` and commit it to your repository. Claim your organization scope on public npm to prevent attackers from using it. [GitHub's npm security guide](https://github.blog/security/supply-chain-security/avoiding-npm-substitution-attacks/) recommends scoping as the primary defense.

**4. What is the difference between dependency confusion and typosquatting?**
Typosquatting uses similar names (like "reqeusts" instead of "requests") to trick developers making typos. Dependency confusion uses exact name matches between public and private packages, exploiting package manager prioritization rules. Both are supply chain attacks, but confusion targets organizations with private packages while typosquatting targets individual developer mistakes. Dependency confusion requires knowledge of internal package names, while typosquatting is more opportunistic.

**5. Do scoped packages prevent dependency confusion?**
Yes, when configured correctly. Scoped packages (@company/name) create a namespace that can be mapped to a specific registry via .npmrc, ensuring internal packages only come from your private registry. However, you must commit .npmrc to your repository and claim your scope on the public registry to prevent attackers from registering it. PyPI lacks scoping, making it more vulnerable - Python projects need repository-level configuration instead.

### Related Content
- Links to vulnerable dependencies (related supply chain issue)
- Links to AI tool security patterns (why AI generates vulnerable configs)
- Links to hardcoded secrets (often in compromised packages)
- Links to supply chain security guides
- Links to npm/PyPI/Maven security best practices

---

## Internal Links (7-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| vulnerable dependencies | /kb/security/vulnerabilities/vulnerable-dependencies/ | Related supply chain issue |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | Secrets in compromised packages |
| command injection | /kb/security/vulnerabilities/command-injection/ | RCE via malicious packages |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool generates vulnerable configs |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool generates vulnerable configs |
| GitHub Copilot security patterns | /kb/vibe-coding-tools/github-copilot/ | AI hallucinations + confusion |
| Next.js + Supabase security | /kb/security/stacks/nextjs-supabase/ | Stack-specific package security |
| secure vibe coding guide | /kb/guides/secure-vibe-coding/ | General security context |

---

## External Links (10-15 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| CWE-427: Uncontrolled Search Path Element | https://cwe.mitre.org/data/definitions/427.html | 1 | Intro |
| OWASP A08:2021 Software and Data Integrity Failures | https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/ | 1 | Intro |
| Dependency Confusion: How I Hacked Into Apple, Microsoft and Dozens of Other Companies | https://medium.com/@alex.birsan/dependency-confusion-4a5d60fec610 | 2 | Original attack section |
| Avoiding npm Substitution Attacks - GitHub Blog | https://github.blog/security/supply-chain-security/avoiding-npm-substitution-attacks/ | 2 | Prevention section |
| Dependency Confusion Tops 2021 Web Hacking List - PortSwigger | https://portswigger.net/daily-swig/dependency-confusion-tops-the-portswigger-annual-web-hacking-list-for-2021 | 2 | Original attack section |
| Detect and Prevent Dependency Confusion Attacks on npm - Snyk | https://snyk.io/blog/detect-prevent-dependency-confusion-attacks-npm-supply-chain-security/ | 2 | Prevention section |
| Dependency Confusion Attacks and Prevention - GitGuardian | https://blog.gitguardian.com/dependency-confusion-attacks/ | 2 | Prevention section |
| npm Security Best Practices: Shai-Hulud Attack - Snyk | https://snyk.io/articles/npm-security-best-practices-shai-hulud-attack/ | 2 | Context section |
| Understanding and Preventing Dependency Confusion Attacks - OX Security | https://www.ox.security/blog/understanding-and-preventing-dependency-confusion-attacks/ | 2 | Prevention section |
| Dependency Confusion Attack Mounted via PyPI - PortSwigger | https://portswigger.net/daily-swig/dependency-confusion-attack-mounted-via-pypi-repo-exposes-flawed-package-installer-behavior | 2 | PyTorch incident |
| AI-Generated Code Packages Can Lead to Slopsquatting - DevOps.com | https://devops.com/ai-generated-code-packages-can-lead-to-slopsquatting-threat/ | 2 | AI section |
| 20% of AI-Generated Code Dependencies Don't Exist - TraxTech | https://www.traxtech.com/blog/20-of-ai-generated-code-dependencies-dont-exist-creating-supply-chain-security-risks | 2 | AI section |
| npm scope Documentation | https://docs.npmjs.com/cli/v6/using-npm/scope/ | 1 | Prevention section |
| confused - GitHub | https://github.com/visma-prodsec/confused | 4 | Detection tools |
| Dependency Confusion: Detection and Risk Mitigation - Protsenko.dev | https://protsenko.dev/2025/04/30/dependency-confusion-detection-mitigation-2025/ | 2 | Maven section |

---

## Notes for Writer Agent

### Tone Guidance
- **Serious but solvable:** This breached Apple/Microsoft, but solutions exist
- **Credit to Alex Birsan:** Ethical disclosure led to fixes across industry
- **AI angle is NEW:** Connect AI package generation patterns to vulnerability
- **Practical focus:** Vibe coders need copy-paste .npmrc configs, not theory

### Technical Accuracy
- Dependency confusion is NOT the same as typosquatting (different attack vectors)
- npm scoping requires BOTH @scope in package.json AND .npmrc configuration
- PyPI is most vulnerable (no scoping mechanism)
- Maven is safer (DNS-based group ID verification)
- .npmrc must be committed to repository (don't rely on developer machines)
- package-lock.json prevents some but not all confusion attacks
- Alex Birsan's research was ethical with company permission
- $130,000 in bounties is accurate (multiple sources confirm)
- Slopsquatting is dependency confusion + AI hallucinations

### Things to Avoid
- Don't confuse with typosquatting (e.g., "reqeusts" vs "requests")
- Don't imply npm audit catches this (it's about malicious packages, not CVEs)
- Don't suggest renaming packages alone fixes it (must use scoping + registry config)
- Don't skip the .npmrc step (essential for prevention)
- Don't ignore PyPI's lack of scoping (real limitation)
- Don't vilify Alex Birsan (ethical researcher who improved security)

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding
- vibe coders
- vibe coded
- AI-generated code

### Value Maximizers
- Include complete .npmrc configuration examples (copy-paste ready)
- Show before/after package.json (unscoped vs scoped)
- Explain AI training data pattern problem (unique angle)
- Detail Alex Birsan's methodology (fascinating story)
- Compare npm vs PyPI vs Maven vulnerability profiles
- Connect to AI hallucinations (slopsquatting)
- Provide detection tool workflow (confused CLI)
- Include CI/CD check examples

### Data Sources
**Scanner Data:** Not yet available for this vulnerability type. Use external authoritative sources.

**External Sources Used:**
- Alex Birsan (original researcher, Medium)
- PortSwigger (ranked #1 technique 2021)
- GitHub Security Blog (npm official guidance)
- Snyk (security vendor research)
- CWE/OWASP (standards)
- TraxTech, DevOps.com (AI hallucination research)
- Various security researchers (PyTorch incident)

---

## Checklist Before Marking READY

- [x] All external links verified and cited
- [x] CWE/OWASP references correct (CWE-427, A08:2021)
- [x] 8 internal links identified
- [x] 5 PAA questions with direct answers
- [x] Competitive gap is specific (AI configuration patterns)
- [x] Alex Birsan's original research documented accurately
- [x] 2021 incidents detailed (Apple, Microsoft, PayPal)
- [x] 2022-2025 incidents included (PyTorch, slopsquatting)
- [x] Cross-ecosystem coverage (npm, PyPI, Maven)
- [x] Complete .npmrc configuration examples
- [x] AI training data angle explained
- [x] Prevention workflow from detection to fix
- [x] No placeholder text
- [x] Proper external source attribution

---

**Brief Status:** ✅ READY for Writer Agent
