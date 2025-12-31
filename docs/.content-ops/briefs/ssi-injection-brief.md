# Content Brief: Server-Side Includes (SSI) Injection

**Generated:** 2025-12-18
**Target Publish:** TBD
**Priority:** P2
**Status:** Ready for Writer

---

## 1. Core Data

### Scanner Statistics
| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | Data being collected | Scanner DB (legacy vulnerability - rare in modern AI-generated code) |
| Repos Scanned | N/A | Scanner DB |
| Week-over-Week | N/A | Scanner DB |
| Most Affected Tool | Data being collected | Scanner DB |

**Note:** SSI injection is a legacy vulnerability rarely encountered in modern AI-generated code. Most AI tools generate applications using modern templating systems (React, Vue, Svelte, Jinja2, EJS) rather than legacy .shtml files with SSI directives. However, vibe coders may encounter this when:
- Working with legacy codebases or inherited projects
- Deploying to certain hosting providers that enable SSI by default
- Using Apache/Nginx servers with default configurations that support SSI
- Maintaining or extending older web applications

### Security References
- **CWE ID:** [CWE-97](https://cwe.mitre.org/data/definitions/97.html)
- **CWE Name:** Improper Neutralization of Server-Side Includes (SSI) Within a Web Page
- **OWASP Category:** [A03:2021 - Injection](https://owasp.org/Top10/2021/A03_2021-Injection/) / [A05:2025 - Injection](https://owasp.org/Top10/2025/A05_2025-Injection/) (moved from #3 to #5 in 2025)
- **Severity:** High
- **CVSS Range:** 7.5-9.8 (depending on configuration and exploitability)

### Real-World Impact
- **Historical CVE:** [CVE-2001-0506](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2001-0506) - IIS 4.0/5.0 buffer overflow in ssinc.dll allowing system privilege escalation
- **Attack Classification:** [CAPEC-101: Server Side Include (SSI) Injection](https://capec.mitre.org/data/definitions/101.html)
- **Modern Relevance:** According to an [InstaTunnel security research blog](https://instatunnel.my/blog/server-side-includes-ssi-injection-the-90s-attack-that-still-works), SSI injection is described as "The 90s Attack That Still Works" - despite being a vintage vulnerability, it persists in legacy configurations and misconfigured servers

### Technical Context
- **File Extensions:** .shtml, .shtm, .stm (traditional), but can affect .html/.htm if SSI is globally enabled
- **Server Modules:** Apache mod_include, Nginx ngx_http_ssi_module
- **Common Directives:** `<!--#exec cmd="..."-->`, `<!--#include virtual="..."-->`, `<!--#echo var="..."-->`
- **Default Configuration:** Most modern web servers disable `exec` directive by default, reducing RCE risk

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Est. Volume | Difficulty | Intent |
|---------|-------------|------------|--------|
| SSI injection | 1,000-2,000 | Medium | Informational |
| server side includes injection | 500-1,000 | Medium | Informational |
| what is SSI injection | 200-500 | Low | Informational |
| SSI injection prevention | 300-600 | Low | Transactional |
| server side includes vulnerability | 400-800 | Medium | Informational |
| .shtml security | 100-300 | Low | Informational |
| Apache SSI injection | 200-400 | Low | Informational |
| SSI attack examples | 300-600 | Medium | Informational |

### People Also Ask
1. "What is Server-Side Includes (SSI) injection?"
2. "How does SSI injection work?"
3. "Is SSI injection still relevant in 2025?"
4. "How do I prevent SSI injection attacks?"
5. "What files are vulnerable to SSI injection?"
6. "Can AI coding tools generate SSI vulnerabilities?"

### Search Intent Analysis
- **Primary intent:** Informational - security researchers and developers learning about legacy vulnerabilities
- **User goal:** Understand what SSI injection is, whether their legacy code is vulnerable, and how to fix it
- **Content need:** Clear explanation of SSI mechanics, detection methods, and prevention techniques - especially in context of maintaining legacy systems

---

## 3. Competitive Analysis

### Current Top 3 Results for "SSI injection"

**1. [OWASP Foundation - Server-Side Includes (SSI) Injection](https://owasp.org/www-community/attacks/Server-Side_Includes_(SSI)_Injection)**
- Title: "Server-Side Includes (SSI) Injection"
- Word count: ~800
- Strengths: Authoritative source, technical accuracy, attack examples with directives
- Weaknesses: Dense technical language, no AI tool context, no modern framework guidance
- Our advantage: Plain English for vibe coders, AI tool patterns, legacy vs modern context

**2. [PortSwigger - SSI injection](https://portswigger.net/kb/issues/00101100_ssi-injection)**
- Title: "SSI injection"
- Word count: ~400
- Strengths: Concise, clear impact description, remediation guidance
- Weaknesses: Very brief, no code examples, no detection patterns
- Our advantage: Complete AI fix prompt, before/after code, when vibe coders encounter this

**3. [Beagle Security - Server-Side Includes (SSI) injection](https://beaglesecurity.com/blog/vulnerability/ssi-injection.html)**
- Title: "Server-Side Includes (SSI) injection"
- Word count: ~1,200
- Strengths: Good technical depth, prevention techniques, impact scenarios
- Weaknesses: No AI tool context, generic prevention advice, no legacy hosting guidance
- Our advantage: AI-specific fix prompt, hosting provider warnings, modern vs legacy context

### Content Gaps (Our Opportunities)
1. **AI Tool Context:** No competitor addresses when/why vibe coders might encounter SSI injection (legacy projects, hosting providers, inherited code)
2. **Modern vs Legacy:** No one explains why this is rare in AI-generated code (modern templating systems) but still matters
3. **Hosting Provider Warnings:** Missing guidance on which hosting providers enable SSI by default
4. **Copy-Paste Fixes:** No AI-ready fix prompts for modernizing legacy SSI code
5. **File Extension Detection:** Limited practical guidance on scanning for .shtml files in inherited projects

---

## 4. Content Structure

### Recommended Sections

```
H1: SSI Injection: Find & Fix in Legacy Code | VibeShip

H2: What is SSI Injection?
    - Plain English: SSI lets web servers run small scripts inside HTML pages
    - Vulnerability: Attackers inject malicious SSI directives through user input
    - Real-world analogy: Like a hotel where guests can write instructions
      that hotel staff must follow - attackers write "<!--#exec cmd='steal data'-->"
    - Impact: Read files, execute commands, full server compromise
    Target: 100-150 words

H2: Why Vibe Coders Encounter SSI Injection
    - Legacy systems: Inheriting older codebases with .shtml files
    - Hosting providers: Apache/Nginx default configs may enable SSI
    - Template confusion: Not understanding difference between modern templates
      (React, Vue) and legacy SSI
    - When to worry: Working with files ending in .shtml, .shtm, .stm
    Target: 150-200 words

H2: How SSI Injection Works
    - SSI directive syntax: <!--#directive parameter=value-->
    - Attack examples:
      * <!--#exec cmd="cat /etc/passwd"--> (read password file)
      * <!--#include virtual="/proc/version"--> (system info)
      * <!--#echo var="DOCUMENT_NAME"--> (file disclosure)
    - HTTP header injection: User-Agent, Referer fields
    Target: 150-200 words

H2: What Could Happen
    - Remote command execution (if exec enabled)
    - Sensitive file disclosure (/etc/passwd, .env files)
    - Environment variable leakage (API keys, database credentials)
    - XSS via injected JavaScript
    - Full server compromise
    Target: 75-100 words

H2: How to Detect SSI Injection
    - File extension check: Search for .shtml, .shtm, .stm files
    - Server config review: Apache mod_include, Nginx ssi module
    - Test payloads: <!--#echo var="DATE_LOCAL"-->
    - Character detection: < > ! # in user input reaching .shtml pages
    - Regex pattern: <!--\s*#\s*(exec|include|echo|config)
    - Scanner CTA: "Scan your codebase for legacy SSI files"
    Target: 100-150 words

H2: How to Fix SSI Injection
    H3: AI Fix Prompt (250-350 words)
        Complete prompt for modernizing legacy SSI code:
        - Identify all .shtml files
        - Migrate to modern templating (React, Vue, EJS, Jinja2)
        - Disable SSI at server level
        - Implement input validation if SSI must remain
        - Framework-specific migration paths

    H3: Manual Fix: Disable SSI
        Before (Apache):
        ```apache
        Options +Includes
        AddType text/html .shtml
        AddOutputFilter INCLUDES .shtml
        ```

        After (Apache):
        ```apache
        Options -Includes
        # Or use Options All -Includes
        ```

        Before (Nginx):
        ```nginx
        location / {
            ssi on;
        }
        ```

        After (Nginx):
        ```nginx
        location / {
            ssi off;
        }
        ```

    H3: Manual Fix: Migrate to Modern Templates
        Before (SSI):
        ```html
        <!--#include virtual="/header.html"-->
        <h1>Welcome <!--#echo var="USER_NAME"--></h1>
        ```

        After (React):
        ```jsx
        import Header from './Header';

        function Welcome({ userName }) {
          return (
            <>
              <Header />
              <h1>Welcome {userName}</h1>
            </>
          );
        }
        ```

    H3: If SSI Must Remain (Legacy Systems)
        - Input validation: Sanitize < > ! # characters
        - Whitelist validation: Only allow specific SSI directives
        - Disable exec: Options IncludesNOEXEC (Apache)
        - File restrictions: Limit SSI to specific directories only
        - Content Security Policy headers

    Target: 300-400 words total

H2: Server-Specific Configuration
    H3: Apache mod_include
        - Disable: Options -Includes
        - Disable exec only: Options IncludesNOEXEC
        - Restrict to specific files: <Files "*.shtml">
        - Error messages: SSIErrorMsg "<!-- Error -->"

    H3: Nginx ssi module
        - Disable: ssi off;
        - Note: Nginx does NOT support #exec by default (safer)
        - ssi_types: Restrict which MIME types process SSI
        - ssi_silent_errors: Hide error messages

    Target: 150-200 words

H2: When to Modernize vs When to Secure
    - Modernize if: Building new features, active development
    - Secure if: Legacy system in maintenance mode, minimal budget
    - Migration path: SSI → EJS → React/Vue (incremental)
    - Risk assessment: exec enabled? User input in SSI? Public-facing?
    Target: 100-150 words

H2: FAQ
    Q1: Is SSI injection still a threat in 2025?
    Q2: Do AI coding tools like Cursor generate SSI vulnerabilities?
    Q3: What's the difference between SSI and modern templates like React?
    Q4: Can I just disable SSI without breaking my site?
    Q5: What hosting providers enable SSI by default?

    Target: 50-100 words each

H2: Related
    - Command Injection
    - Server-Side Template Injection (SSTI)
    - Path Traversal
    - XSS (Cross-Site Scripting)
    - Apache security configuration
```

### Required Elements Checklist
- [x] Quick answer in first 50 words
- [x] Legacy vs modern context (why rare in AI-generated code)
- [x] Complete AI fix prompt (250-350 words) for modernization
- [x] Before/after code examples (Apache/Nginx config + SSI to React migration)
- [x] 5 FAQ entries matching PAA
- [x] Scanner CTA (find .shtml files)
- [x] 5-10 internal links
- [x] CWE-97/OWASP A03:2021 references
- [x] Server-specific guidance (Apache mod_include, Nginx ssi module)
- [x] Detection regex patterns
- [x] Character sanitization guidance

---

## 5. Internal Linking

### Must Link TO (Parent/Authority Pages)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/ | "injection vulnerabilities" |
| /kb/security/vulnerabilities/command-injection/ | "command injection" |
| /kb/security/vulnerabilities/ssti/ | "server-side template injection (SSTI)" |
| /kb/security/vulnerabilities/xss/ | "cross-site scripting (XSS)" |

### Should Link TO (Related Content)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/path-traversal/ | "path traversal" |
| /kb/security/vulnerabilities/xxe/ | "XML external entity (XXE)" |
| /kb/vibe-coding-tools/cursor/ | "Cursor" |
| /kb/vibe-coding-tools/claude-code/ | "Claude Code" |
| /kb/glossary/security/injection/ | "injection attacks" |
| /kb/glossary/security/input-validation/ | "input validation" |

### External Authority Links
| Source | Purpose | URL |
|--------|---------|-----|
| OWASP SSI Injection | Official attack description | https://owasp.org/www-community/attacks/Server-Side_Includes_(SSI)_Injection |
| CWE-97 | Technical reference | https://cwe.mitre.org/data/definitions/97.html |
| OWASP A03:2021 Injection | OWASP Top 10 category | https://owasp.org/Top10/2021/A03_2021-Injection/ |
| OWASP A05:2025 Injection | Updated OWASP Top 10 2025 | https://owasp.org/Top10/2025/A05_2025-Injection/ |
| CAPEC-101 | Attack pattern reference | https://capec.mitre.org/data/definitions/101.html |
| PortSwigger SSI Injection | Security research | https://portswigger.net/kb/issues/00101100_ssi-injection |
| Apache mod_include docs | Official Apache documentation | https://httpd.apache.org/docs/2.4/mod/mod_include.html |
| Apache SSI Tutorial | Official Apache SSI guide | https://httpd.apache.org/docs/current/howto/ssi.html |
| Nginx ssi module docs | Official Nginx documentation | https://nginx.org/en/docs/http/ngx_http_ssi_module.html |
| OWASP Testing Guide - SSI | Testing methodology | https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/08-Testing_for_SSI_Injection |
| HackerOne SSI Reports | Real-world examples | https://hackerone.com/hacktivity (search: SSI) |

---

## 6. Unique Angle

### Our Differentiator
**Legacy Context for Modern Vibe Coders:** We're the only resource that explains SSI injection specifically for developers using AI coding tools. While competitors treat SSI as a current threat, we position it accurately: a legacy vulnerability that vibe coders encounter when inheriting old projects, deploying to certain hosting providers, or maintaining existing systems. We bridge the gap between "vintage 90s attack" and "why should I care in 2025?"

### Key Message
"SSI injection is rare in AI-generated code because modern frameworks (React, Vue, Svelte) don't use .shtml files - but if you inherit a legacy project or deploy to Apache/Nginx with default configs, you need to know how to detect and modernize it."

### Data-Driven Claims to Highlight
1. "SSI injection dates back to the 1990s but still affects misconfigured servers - CVE-2001-0506 showed buffer overflow in IIS ssinc.dll"
2. "Most modern web servers disable the dangerous `exec` directive by default, but `include` and `echo` can still leak sensitive data"
3. "According to [OWASP A03:2021](https://owasp.org/Top10/2021/A03_2021-Injection/), injection attacks (including SSI) rank #3 in web application risks"
4. "Files with .shtml, .shtm, or .stm extensions are the primary indicators - but SSI can be enabled globally for .html/.htm if misconfigured"
5. "Nginx is safer by default: it does NOT support the `#exec` directive unlike Apache"

---

## 7. Meta Information

### Suggested Title Tag (under 60 chars)
```
SSI Injection: Find & Fix in Legacy Code | VibeShip
```
(49 characters)

### Suggested Meta Description (150-160 chars)
```
SSI injection lets attackers execute commands via .shtml files. Rare in AI code but critical for legacy projects. Get detection & fix guide for vibe coders.
```
(158 characters)

### Target URL
```
/kb/security/vulnerabilities/ssi-injection/
```

### Related URLs to Create
- /kb/security/vulnerabilities/ssti/ (Server-Side Template Injection - modern equivalent)
- /kb/security/vulnerabilities/command-injection/ (related attack)
- /kb/security/fixes/ssi-injection/apache/ (Apache-specific fix)
- /kb/security/fixes/ssi-injection/nginx/ (Nginx-specific fix)
- /kb/security/checklists/legacy-code-security/ (broader legacy security checklist)

---

## 8. Writer Notes

### Tone Guidance
**Balanced and Educational:** This vulnerability is serious but RARE for vibe coders. Don't be alarmist ("Your code is vulnerable!") but don't dismiss it either. Frame it as "unlikely you'll generate this, but if you inherit legacy code or deploy to certain hosts, here's what to know." Reassure that modern AI tools (Cursor, Claude Code, Bolt) generate React/Vue/Svelte apps that DON'T use SSI.

### Technical Accuracy Notes
- **Key Point:** Nginx does NOT support `<!--#exec cmd="..."-->` by default - this is a major security advantage over Apache. Mention this clearly.
- **File Extensions:** While .shtml/.shtm/.stm are traditional, SSI can be enabled for ANY file type via server config. Don't imply it's ONLY those extensions.
- **Modern Equivalents:** SSI is NOT the same as Server-Side Template Injection (SSTI). SSI is a specific, legacy technology. SSTI affects modern frameworks like Jinja2, Twig, etc. Link to SSTI article but clarify the difference.
- **Exec vs Include:** Most modern servers disable `exec` but leave `include` and `echo` enabled. `include` can still do path traversal, `echo` can leak environment variables with API keys.

### Things to Avoid
- Don't recommend regex-based input sanitization as primary defense - it's fragile. Primary recommendation: disable SSI or migrate to modern templates.
- Don't claim SSI injection is "common" in AI-generated code - it's NOT. Be accurate about prevalence.
- Don't use deprecated Apache directives like XBitHack - focus on modern Apache 2.4+ syntax.
- Don't suggest manually escaping SSI characters as a reliable fix - whitelisting or disabling is better.

### Reference Materials
**Must Consult:**
1. [OWASP SSI Injection Attack](https://owasp.org/www-community/attacks/Server-Side_Includes_(SSI)_Injection) - Authoritative source for attack mechanics
2. [CWE-97](https://cwe.mitre.org/data/definitions/97.html) - Official weakness definition
3. [Apache mod_include Documentation](https://httpd.apache.org/docs/2.4/mod/mod_include.html) - Authoritative Apache config
4. [Nginx ssi module Documentation](https://nginx.org/en/docs/http/ngx_http_ssi_module.html) - Authoritative Nginx config
5. [OWASP Testing Guide - SSI Injection](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/08-Testing_for_SSI_Injection) - Testing methodology
6. [PortSwigger SSI Injection](https://portswigger.net/kb/issues/00101100_ssi-injection) - Clear impact description
7. [CAPEC-101](https://capec.mitre.org/data/definitions/101.html) - Attack pattern details

**For AI Tool Context:**
- Review AI-generated code security research from [Endor Labs](https://www.endorlabs.com/learn/the-most-common-security-vulnerabilities-in-ai-generated-code) and [Snyk](https://snyk.io/blog/code-injection-vulnerabilities-caused-by-generative-ai/) showing 40%+ code contains flaws, but note that SSI injection is NOT among the common AI-generated vulnerabilities (template engines yes, SSI no).

### AI Fix Prompt Template (250-350 words)

```
You are a security expert helping migrate legacy Server-Side Includes (SSI)
code to modern, secure alternatives.

**Context:**
I have inherited a web application that uses Server-Side Includes (SSI) with
.shtml files. I need to eliminate SSI injection vulnerabilities while
maintaining functionality.

**Current Setup:**
- Web server: [Apache/Nginx]
- File types: .shtml, .shtm, .stm
- SSI directives in use: [list them, e.g., <!--#include virtual="..."-->,
  <!--#echo var="..."-->]
- User input fields: [describe where user input appears on .shtml pages]

**Required Actions:**

1. **Inventory Analysis:**
   - List all files with .shtml, .shtm, .stm extensions
   - Identify which SSI directives each file uses (#include, #echo, #exec,
     #config, etc.)
   - Map user input points that could reach SSI processing

2. **Immediate Mitigation (if full migration isn't possible yet):**
   - Disable SSI at the server level (provide Apache/Nginx config)
   - OR disable ONLY the dangerous #exec directive (Options IncludesNOEXEC)
   - Implement input validation to block SSI directive characters (< > ! #)
   - Add Content Security Policy headers

3. **Long-term Solution - Migrate to Modern Templates:**
   - For static includes: Convert to [React/Vue/Svelte] components
   - For dynamic variables: Use framework state management
   - For server-side logic: Move to API routes or server components
   - Provide before/after code examples for common SSI patterns

4. **Specific Migration Paths:**
   - <!--#include virtual="/header.html"--> → React <Header /> component
   - <!--#echo var="USER_NAME"--> → Template variable {userName}
   - <!--#exec cmd="date"--> → Server-side API endpoint or build-time generation

5. **Validation:**
   - Confirm no .shtml files remain in production
   - Verify SSI is disabled in web server config
   - Test that all dynamic content works without SSI
   - Scan for any remaining SSI directive syntax in codebase

**Output Format:**
- Updated server configuration (Apache httpd.conf or Nginx nginx.conf)
- Migration code examples (SSI → modern framework)
- Security testing commands to verify SSI is disabled
- Checklist of files converted and SSI directives removed

Prioritize security and maintainability. If the application is in active
development, prefer full migration to React/Vue. If it's in maintenance mode
with limited budget, provide the secure configuration approach.
```

---

## 9. SEO and LLM Optimization

### Structured Data Requirements
```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "SSI Injection: Find & Fix in Legacy Code",
  "description": "Server-Side Includes (SSI) injection explained for developers working with legacy code and AI-generated applications",
  "author": {
    "@type": "Organization",
    "name": "VibeShip"
  },
  "datePublished": "[DATE]",
  "dateModified": "[DATE]",
  "publisher": {
    "@type": "Organization",
    "name": "VibeShip",
    "logo": {
      "@type": "ImageObject",
      "url": "https://vibeship.co/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://vibeship.co/kb/security/vulnerabilities/ssi-injection/"
  },
  "keywords": "SSI injection, Server-Side Includes, CWE-97, legacy code security, .shtml vulnerability",
  "articleSection": "Security",
  "vulnerabilityCategory": "Injection",
  "securityReference": [
    {
      "@type": "Thing",
      "name": "CWE-97",
      "url": "https://cwe.mitre.org/data/definitions/97.html"
    },
    {
      "@type": "Thing",
      "name": "OWASP A03:2021",
      "url": "https://owasp.org/Top10/2021/A03_2021-Injection/"
    }
  ]
}
```

### FAQ Schema
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is SSI injection still a threat in 2025?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, but primarily in legacy systems. SSI injection affects servers running Apache mod_include or Nginx with SSI enabled, especially on .shtml files. Modern AI coding tools generate React/Vue/Svelte apps that don't use SSI, but vibe coders may encounter it when inheriting older projects or deploying to hosting providers with default SSI configurations."
      }
    },
    {
      "@type": "Question",
      "name": "Do AI coding tools like Cursor generate SSI vulnerabilities?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, modern AI coding tools (Cursor, Claude Code, Bolt, v0, Replit) generate applications using modern templating systems like React, Vue, Svelte, or EJS - not legacy .shtml files with SSI directives. You'd only encounter SSI when maintaining existing legacy code, not in new AI-generated projects."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between SSI and modern templates like React?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SSI (Server-Side Includes) is a 1990s technology that processes directives like <!--#include--> on the web server before serving HTML. Modern templates (React, Vue, Svelte) are component-based frameworks that render on the client or server using JavaScript, with built-in security features. SSI is a legacy approach, while React/Vue are industry standard for new development."
      }
    },
    {
      "@type": "Question",
      "name": "Can I just disable SSI without breaking my site?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Only if your site doesn't rely on SSI directives. Check for .shtml/.shtm/.stm files and search for <!--# syntax. If found, test disabling SSI (Options -Includes in Apache, ssi off in Nginx) in a staging environment first. If functionality breaks, you'll need to migrate those features to modern alternatives before disabling SSI."
      }
    },
    {
      "@type": "Question",
      "name": "What hosting providers enable SSI by default?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional shared hosting providers often enable Apache mod_include by default for backward compatibility. Check your hosting control panel (cPanel, Plesk) or Apache configuration. Modern cloud platforms (Vercel, Netlify, AWS Amplify) do NOT enable SSI - they're designed for static sites and serverless functions, not legacy SSI processing."
      }
    }
  ]
}
```

### Breadcrumb Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Knowledge Base",
      "item": "https://vibeship.co/kb/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Security",
      "item": "https://vibeship.co/kb/security/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Vulnerabilities",
      "item": "https://vibeship.co/kb/security/vulnerabilities/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "SSI Injection",
      "item": "https://vibeship.co/kb/security/vulnerabilities/ssi-injection/"
    }
  ]
}
```

---

## 10. Additional Research Context

### Why AI Tools Don't Generate SSI Code

Based on research from [Endor Labs](https://www.endorlabs.com/learn/the-most-common-security-vulnerabilities-in-ai-generated-code) and [Snyk](https://snyk.io/blog/code-injection-vulnerabilities-caused-by-generative-ai/), the most common vulnerabilities in AI-generated code include:
- Missing input validation (40%+ of AI code)
- SQL injection
- XSS (Cross-Site Scripting)
- Insecure use of eval/exec functions
- Template injection (SSTI in Jinja2, Twig, etc.)

**Notably ABSENT:** Server-Side Includes (SSI) injection. Why?
1. **Training Data Bias:** LLMs are trained on modern codebases (2015-2024) where SSI is rarely used
2. **Framework Defaults:** AI tools default to React, Vue, Next.js, Svelte - none use .shtml
3. **Best Practices:** Modern security tutorials and documentation don't recommend SSI
4. **File Extensions:** AI tools generate .jsx, .vue, .svelte, .tsx - NOT .shtml/.shtm

### When Vibe Coders Encounter SSI

**Scenario 1: Legacy Codebase Inheritance**
- Client hands over a 10-year-old PHP/Apache site with .shtml files
- Vibe coder asked to "add a feature" using Cursor
- AI suggests modern React components, but deployment breaks because server expects .shtml

**Scenario 2: Hosting Provider Defaults**
- Deploy AI-generated static site to traditional shared hosting (cPanel, Plesk)
- Apache has mod_include enabled globally
- If app uses user input in any .html page AND server processes SSI, vulnerability exists

**Scenario 3: Template Confusion**
- Vibe coder Googles "how to include header in HTML"
- Finds old tutorial recommending SSI
- Asks AI: "how do I use SSI in my Next.js app?"
- AI may provide historical context without warning about security

### Detection in Practice

**Regex Pattern for Code Scanning:**
```regex
<!--\s*#\s*(exec|include|echo|config|fsize|flastmod|printenv|set)\s+(var|cmd|cgi|file|virtual|errmsg|sizefmt|timefmt)?\s*=\s*["']?[^"'>]+["']?\s*-->
```

**Bash Command to Find SSI Files:**
```bash
find . -type f \( -name "*.shtml" -o -name "*.shtm" -o -name "*.stm" \)
```

**Grep for SSI Directives:**
```bash
grep -r "<!--#" . --include="*.html" --include="*.shtml"
```

**Apache Config Check:**
```bash
grep -i "Options.*Includes" /etc/apache2/apache2.conf /etc/apache2/sites-enabled/*
```

**Nginx Config Check:**
```bash
grep -i "ssi\s*on" /etc/nginx/nginx.conf /etc/nginx/sites-enabled/*
```

---

**Brief Status:** ✅ Complete - Ready for Writer Agent

**Writer Agent Instructions:**
Use this brief with the guidelines from `docs/.content-ops/agents/writer-agent.md` and `docs/.content-ops/strategies/VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md` to create a complete article. Focus on the unique angle: SSI is a legacy vulnerability that modern AI tools DON'T generate, but vibe coders may encounter when working with inherited projects or certain hosting providers. Balance technical accuracy with accessibility for non-security-expert vibe coders.
