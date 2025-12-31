# Content Brief: Expression Language (EL) Injection

**Generated:** 2025-12-18
**Target Publish:** Q1 2025
**Priority:** P2
**Status:** ✅ Complete - Ready for Writer Agent

---

## 1. Core Data

### Scanner Statistics
| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | Data coming soon | Scanner DB (in development) |
| Repos Scanned | TBD | Scanner DB (in development) |
| Week-over-Week | TBD | Scanner DB (in development) |
| Most Affected Tool | TBD | Scanner DB (in development) |

**Note:** VibeShip Scanner is actively collecting data on EL injection in AI-generated code. Brief will rely on external authoritative sources until internal data is available.

### Tool Breakdown
| Tool | Vulnerability Rate | Sample Size |
|------|-------------------|-------------|
| Cursor | TBD | TBD |
| Bolt | TBD | TBD |
| Claude Code | TBD | TBD |
| v0 | TBD | TBD |
| Replit | TBD | TBD |
| Copilot | TBD | TBD |

### Security References
- **CWE ID:** CWE-917
- **CWE Name:** Improper Neutralization of Special Elements used in an Expression Language Statement ('Expression Language Injection')
- **OWASP Category:** A03:2021 - Injection
- **Severity:** Critical (often CVSS 9.0+)
- **CVSS Range:** 7.5 - 10.0 (depending on exploitability)

### External Research Data

**AI-Generated Code Security (2024):**
- According to [Georgetown University's Center for Security and Emerging Technology (CSET) November 2024 report](https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/), only 55% of AI-generated code was secure across 100+ large language models tested
- [Log Injection (CWE-117) shows 88% insecurity rate](https://cset.georgetown.edu/wp-content/uploads/CSET-Cybersecurity-Risks-of-AI-Generated-Code.pdf) in AI-generated code
- [Cross-Site Scripting (CWE-80) has 86% failure rate](https://cset.georgetown.edu/wp-content/uploads/CSET-Cybersecurity-Risks-of-AI-Generated-Code.pdf) in AI-generated code
- Context-dependent vulnerabilities are particularly problematic for AI tools, which lack understanding of broader application architecture

**Real-World Impact:**
- EL injection facilitated the [Equifax breach (2017) via CVE-2017-5638](https://www.blackduck.com/blog/equifax-apache-struts-vulnerability-cve-2017-5638.html), exposing personal information of over 145 million US citizens
- Equifax failed to patch for 146 days despite public disclosure and available fix

**Framework-Specific Statistics:**
- 76% of developers now use AI to help write code ([Stack Overflow 2024 survey](https://www.veracode.com/blog/ai-generated-code-security-risks/))
- 30% of code at Microsoft is written by AI ([CEO Satya Nadella](https://www.veracode.com/blog/ai-generated-code-security-risks/))
- [Apiiro found 3X surge in repositories containing PII, 10X increase in APIs missing authorization](https://www.veracode.com/blog/ai-generated-code-security-risks/) in AI-generated code

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Est. Volume | Difficulty | Intent |
|---------|-------------|------------|--------|
| expression language injection | 1,000-1,500 | Medium | Informational |
| SpEL injection | 500-800 | Medium | Informational |
| OGNL injection | 400-600 | Medium | Informational |
| EL injection vulnerability | 300-500 | Low-Medium | Informational |
| Spring expression language injection | 600-900 | Medium | Informational |
| how to prevent EL injection | 200-400 | Low | Transactional |
| expression language injection Java | 400-600 | Medium | Informational |
| CVE-2017-5638 | 800-1,200 | Medium | Informational |
| Spring Cloud Function CVE-2022-22963 | 300-500 | Low | Informational |
| MVEL injection | 100-200 | Low | Informational |

### People Also Ask
1. "What is expression language injection?"
2. "How does SpEL injection work?"
3. "What caused the Equifax data breach?"
4. "How do you prevent expression language injection in Spring?"
5. "What is the difference between OGNL and SpEL?"
6. "Is expression language injection dangerous?"
7. "What frameworks are vulnerable to EL injection?"
8. "How to detect EL injection vulnerabilities?"

### Search Intent Analysis
- **Primary intent:** Informational - developers want to understand what EL injection is and how it works
- **Secondary intent:** Transactional - developers need to fix existing vulnerabilities
- **User goal:** Learn to identify, prevent, and remediate EL injection in Java/Spring applications
- **Content need:** Technical explanation with real-world examples (Equifax), detection methods, and framework-specific prevention techniques

---

## 3. Competitive Analysis

### Current Top 3 Results for "expression language injection"

**1. [OWASP - Expression Language Injection](https://owasp.org/www-community/vulnerabilities/Expression_Language_Injection)**
- Title: "Expression Language Injection | OWASP Foundation"
- Word count: ~1,000
- Strengths: Authoritative source, technical accuracy, covers multiple EL implementations (JSP, OGNL, SpEL, MVEL)
- Weaknesses: Dense technical writing, lacks AI coding tool context, no before/after code examples, outdated (references Spring 3.0.5)
- Our advantage: AI tool patterns, vibe coder audience, modern examples with Spring 5.x/6.x, copy-paste fix prompts

**2. [Snyk Learn - Express Language injection](https://learn.snyk.io/lesson/express-language-injection/)**
- Title: "What is Express Language injection? | Tutorial & examples | Snyk Learn"
- Word count: ~1,500
- Strengths: Tutorial format, interactive lessons, good beginner explanations, covers prevention
- Weaknesses: No AI-generated code angle, limited Spring-specific guidance, no comparison of EL types, no real CVE examples
- Our advantage: AI tool comparison data, real-world breaches (Equifax, Spring Cloud), framework-specific fixes for Spring Boot

**3. [PortSwigger - Expression Language injection](https://portswigger.net/kb/issues/00100f20_expression-language-injection)**
- Title: "Expression Language injection - PortSwigger"
- Word count: ~800
- Strengths: Clear remediation guidance, security professional audience, concise
- Weaknesses: Very brief, no code examples, no framework specifics, generic advice
- Our advantage: Detailed code examples, Spring/Struts specific guidance, AI fix prompts, CVE analysis

### Content Gaps (Our Opportunities)
1. **AI Tool Angle:** No competitor addresses why AI coding tools (Cursor, Bolt, Claude Code) generate EL injection vulnerabilities. We can show specific patterns AI tools create (template concatenation, unsafe SpEL parsing).
2. **Real-World Breach Analysis:** Only OWASP mentions Equifax briefly. We can provide detailed CVE-2017-5638 breakdown, CVE-2022-22963 (Spring Cloud Function), CVE-2022-22965 (Spring4Shell), showing real-world impact.
3. **Framework Comparison:** No competitor compares OGNL vs SpEL vs MVEL vs JSP EL side-by-side. We can create comparison table showing use cases, risk levels, and prevention methods.
4. **Detection Methods:** Competitors lack concrete detection patterns (regex, code review checklists, SAST rules). We can provide specific patterns to grep for in codebases.
5. **SimpleEvaluationContext vs StandardEvaluationContext:** No competitor explains this critical Spring security distinction clearly for developers.
6. **Copy-Paste AI Fix Prompts:** No competitor provides ready-to-use prompts for AI tools to fix vulnerabilities.

---

## 4. Content Structure

### Recommended Sections

```
H1: Expression Language (EL) Injection: Find & Fix in Java & Spring | VibeShip

[Quick Answer Box: 50 words]
Expression Language (EL) injection happens when user input is evaluated by an expression language
interpreter without proper validation. Attackers can execute arbitrary code and compromise servers.
Ranked #3 in OWASP Top 10:2021 under Injection. CWE-917. Critical severity (CVSS 9.0+).

H2: What is Expression Language (EL) Injection?
    - Plain English definition: "Think of it like giving attackers a calculator that can run system commands"
    - Technical explanation: User input passed to EL interpreter (SpEL, OGNL, MVEL, JSP EL)
    - Real-world analogy: Like a hotel where guests can write their own master key codes
    - Concrete consequences: RCE, data exfiltration, server compromise
    - Link to [OWASP A03:2021 Injection](https://owasp.org/Top10/2021/A03_2021-Injection/)
    - Link to [CWE-917](https://cwe.mitre.org/data/definitions/917.html)
    Target: 100-150 words

H2: Types of Expression Language Injection
    - SpEL (Spring Expression Language) - Most common in modern Java apps
    - OGNL (Object-Graph Navigation Language) - Used by Struts2, caused Equifax breach
    - MVEL (MVFLEX Expression Language) - General purpose EL
    - JSP EL (JavaServer Pages Expression Language) - Legacy applications
    - Comparison table showing framework, syntax (${} vs #{}), risk level
    - Link to [Minded Security EL Injection whitepaper](https://mindedsecurity.com/wp-content/uploads/2020/10/ExpressionLanguageInjection.pdf)
    Target: 150-200 words

H2: Real-World Examples: The Equifax Breach & Spring Vulnerabilities
    H3: CVE-2017-5638: The $145 Million Mistake
        - OGNL injection in Apache Struts2 Jakarta Multipart parser
        - Malicious Content-Type header with OGNL expression
        - Equifax failed to patch for 146 days after public disclosure
        - 145+ million US citizens' data exposed
        - Link to [Black Duck CVE-2017-5638 analysis](https://www.blackduck.com/blog/cve-2017-5638-apache-struts-vulnerability-explained.html)

    H3: CVE-2022-22963: Spring Cloud Function SpEL Injection
        - Critical RCE via spring.cloud.function.routing-expression HTTP header
        - CVSS 9.8 (Critical)
        - Exploited in the wild within days of disclosure
        - Link to [Akamai Spring Cloud Function analysis](https://www.akamai.com/blog/security/spring-cloud-function)

    H3: CVE-2022-22965: Spring4Shell/SpringShell
        - RCE via class.module.classLoader manipulation
        - JDK 9+ on Apache Tomcat WAR deployments
        - CVSS 9.8 (Critical)
        - Fixed in Spring Framework 5.3.18+ and 5.2.20+

    Target: 250-300 words

H2: How AI Tools Cause Expression Language Injection
    - Why AI generates vulnerable patterns:
      1. AI lacks understanding of security boundaries between code and data
      2. Training data includes insecure legacy code patterns
      3. AI prioritizes "working code" over "secure code"
      4. Context-dependent vulnerabilities confuse AI (safe internally, unsafe with external input)
    - Common AI-generated patterns:
      • String concatenation to build SpEL expressions
      • Using StandardEvaluationContext instead of SimpleEvaluationContext
      • Forced evaluation syntax %{...} with user input
      • Missing input validation before SpEL parsing
    - Georgetown CSET 2024 data: Only 55% of AI-generated code is secure
    - Link to [CSET Cybersecurity Risks of AI-Generated Code](https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/)
    Target: 200-250 words

H2: What Could Happen: Impact of EL Injection
    - Remote Code Execution (RCE): Full server compromise
    - Data Exfiltration: Access to databases, environment variables, application secrets
    - Privilege Escalation: Manipulate session attributes (e.g., set admin=true)
    - Lateral Movement: Use compromised server as attack platform
    - Business Impact: Equifax paid $575+ million in settlements after CVE-2017-5638
    - Link to [PortSwigger EL Injection impact](https://portswigger.net/kb/issues/00100f20_expression-language-injection)
    Target: 100-150 words

H2: How to Detect Expression Language Injection
    H3: Code Patterns to Search For
        - Regex patterns to grep:
          • `\$\{.*\}` or `#\{.*\}`
          • `parseExpression\s*\(` (SpEL)
          • `Ognl\.getValue\s*\(` (OGNL)
          • `MVEL\.eval\s*\(` (MVEL)
          • `<spring:eval\s*expression\s*=`
          • `%\{.*\}` (Struts2 forced evaluation)
        - Link to [GitHub manual-source-code-review regex patterns](https://github.com/va1da5/manual-source-code-review)

    H3: Framework-Specific Detection
        - Spring: Look for ExpressionParser, StandardEvaluationContext, @Value("${...}")
        - Struts2: Search for %{...} syntax with user input, getText() with params
        - JSP: Find <spring:message code="${param.x}"/>

    H3: SAST Tools
        - CodeQL: java-spel-expression-injection, java-mvel-expression-injection
        - Semgrep/Opengrep: Custom rules for SpEL/OGNL patterns
        - Commercial: Checkmarx, Fortify, Snyk Code
        - Link to [CodeQL SpEL injection query](https://codeql.github.com/codeql-query-help/java/java-spel-expression-injection/)

    H3: Scanner CTA
        "Scan your Java/Spring codebase for EL injection with VibeShip Scanner →"

    Target: 200-250 words

H2: How to Fix Expression Language Injection
    H3: AI Fix Prompt (Complete 250-350 word prompt)
        ```
        You are a security-focused code reviewer. Audit this Java/Spring codebase for
        Expression Language (EL) injection vulnerabilities and fix them.

        ## What to Look For

        1. **SpEL Injection (Spring)**:
           - User input passed to `ExpressionParser.parseExpression()`
           - Using `StandardEvaluationContext` instead of `SimpleEvaluationContext`
           - `@Value("${...}")` with external input
           - Dynamic SpEL in repository @Query annotations

        2. **OGNL Injection (Struts2)**:
           - Forced evaluation %{...} with user parameters
           - `getText()` methods with request parameters
           - Unsafe namespace/action configurations

        3. **MVEL/JSP EL**:
           - `MVEL.eval()` with user input
           - JSP `<spring:message code="${param.x}"/>`

        ## How to Fix

        **For Spring SpEL:**
        1. **Never** use `ExpressionParser.parseExpression()` with user input
        2. Replace `StandardEvaluationContext` with `SimpleEvaluationContext.forReadOnlyDataBinding()`
        3. Use parameterized queries instead of dynamic SpEL in @Query
        4. Validate input with strict whitelist (alphanumeric only)
        5. Use array syntax [0] for safe SpEL argument access

        **For Struts2 OGNL:**
        1. Enable OGNL allowlist: `struts.allowlist.enable=true`
        2. Never use %{...} with user input
        3. Avoid `getText()` with request parameters
        4. Upgrade to Struts 2.5.26+ or 6.4+

        **For All EL Types:**
        1. Treat user input as data, never as code
        2. Use static templates instead of dynamic expressions
        3. Implement defense in depth (WAF + input validation + secure coding)

        ## Update Dependencies
        - Spring Framework 5.3.18+ or 5.2.20+
        - Spring Cloud Function 3.2.3+ or 3.1.7+
        - Apache Struts 2.5.26+ or 6.4+

        Provide before/after code examples for each fix.
        ```

    H3: Manual Fix with Before/After Code

        **Example 1: SpEL Injection (VULNERABLE)**
        ```java
        // ❌ VULNERABLE - User input directly in parseExpression()
        @GetMapping("/search")
        public String search(@RequestParam String query) {
            ExpressionParser parser = new SpelExpressionParser();
            Expression exp = parser.parseExpression(query); // DANGER!
            return exp.getValue().toString();
        }
        ```

        **Example 1: Fixed**
        ```java
        // ✅ SECURE - Avoid dynamic SpEL entirely, use safe alternatives
        @GetMapping("/search")
        public String search(@RequestParam String query) {
            // Validate input with whitelist
            if (!query.matches("^[a-zA-Z0-9]+$")) {
                throw new IllegalArgumentException("Invalid query");
            }

            // Use parameterized query instead of SpEL
            return repository.findByName(query);
        }
        ```

        **Example 2: StandardEvaluationContext (VULNERABLE)**
        ```java
        // ❌ VULNERABLE - StandardEvaluationContext allows method invocation
        ExpressionParser parser = new SpelExpressionParser();
        StandardEvaluationContext context = new StandardEvaluationContext();
        Expression exp = parser.parseExpression(userInput);
        exp.getValue(context); // Can execute T(java.lang.Runtime).getRuntime().exec()
        ```

        **Example 2: Fixed**
        ```java
        // ✅ SECURE - SimpleEvaluationContext restricts capabilities
        ExpressionParser parser = new SpelExpressionParser();
        SimpleEvaluationContext context = SimpleEvaluationContext
            .forReadOnlyDataBinding()
            .build();
        Expression exp = parser.parseExpression(trustedExpression);
        exp.getValue(context); // Method invocation blocked
        ```

        **Example 3: Struts2 OGNL (VULNERABLE)**
        ```java
        // ❌ VULNERABLE - Forced evaluation with user parameter
        <s:property value="%{#parameters.msg}" />
        ```

        **Example 3: Fixed**
        ```java
        // ✅ SECURE - Use static value, avoid forced evaluation
        <s:property value="message" />

        // Or in Action class:
        public String getMessage() {
            String userMsg = request.getParameter("msg");
            // Validate and sanitize
            return StringEscapeUtils.escapeHtml4(userMsg);
        }
        ```

        Link to [Spring Security best practices](https://docs.spring.io/spring-security/reference/index.html)
        Target: 300-400 words

    H3: Framework-Specific Fixes
        **Spring Boot:**
        - Link to /kb/security/fixes/el-injection/spring-boot/
        - Key points: Use SimpleEvaluationContext, avoid parseExpression() with user input

        **Struts2:**
        - Link to /kb/security/fixes/el-injection/struts2/
        - Key points: Enable OGNL allowlist, disable forced evaluation

        **JSP/Legacy:**
        - Link to /kb/security/fixes/el-injection/jsp/
        - Key points: Set <el-ignored>true</el-ignored> in web.xml

        Target: 100-150 words

H2: Prevention Best Practices
    1. **Principle of Least Privilege:** Use SimpleEvaluationContext, not StandardEvaluationContext
    2. **Input Validation:** Whitelist alphanumeric strings only
    3. **Avoid Dynamic Evaluation:** Use static templates and parameterized queries
    4. **Defense in Depth:** WAF rules + SAST + runtime protection (RASP)
    5. **Keep Dependencies Updated:** Monitor CVEs for Spring, Struts, other frameworks
    6. **Security Testing:** Include EL injection in penetration testing and code reviews
    - Link to [OWASP EL Injection Prevention](https://owasp.org/www-community/vulnerabilities/Expression_Language_Injection)
    - Link to [Snyk Learn EL Injection](https://learn.snyk.io/lesson/express-language-injection/)
    Target: 150-200 words

H2: Frequently Asked Questions (FAQ)

    **Q: What is the difference between SpEL and OGNL?**
    A: SpEL (Spring Expression Language) is Spring's expression language for the Spring Framework,
    using #{...} syntax. OGNL (Object-Graph Navigation Language) is used by Apache Struts2 and uses
    %{...} syntax. Both can cause RCE if user input is evaluated, but OGNL caused the infamous
    Equifax breach (CVE-2017-5638). SpEL is more prevalent in modern applications due to Spring's
    popularity. Both require the same prevention strategy: never evaluate user input as expressions.
    (75 words)

    **Q: Is ${} always dangerous in Spring?**
    A: No. In Spring, ${} is used for property placeholders (e.g., from application.properties) and is
    generally safe. The dangerous syntax is #{} which invokes SpEL and allows method calls. However,
    ${} becomes dangerous when used in JSP tags like <spring:message code="${param.x}"/> because Spring
    performs double evaluation. In @Value annotations, ${} reads properties safely, but #{} can execute
    arbitrary code. Always validate the context where ${} or #{} appears.
    (75 words)

    **Q: How do I know if my Spring app is vulnerable to SpEL injection?**
    A: Search your codebase for: (1) `ExpressionParser.parseExpression()` with user input, (2)
    `StandardEvaluationContext` instead of `SimpleEvaluationContext`, (3) `@Query` or `@Aggregation`
    annotations with parametrized SpEL, (4) Dynamic routing expressions in Spring Cloud Function.
    Use CodeQL's `java-spel-expression-injection` query or Semgrep/Opengrep rules. The VibeShip Scanner
    can automatically detect these patterns in Java/Spring projects.
    (65 words)

    **Q: What's the difference between SimpleEvaluationContext and StandardEvaluationContext?**
    A: StandardEvaluationContext is powerful but dangerous—it allows full SpEL capabilities including
    method invocation, type references (T()), and bean references. This means an attacker can execute
    `T(java.lang.Runtime).getRuntime().exec("malicious-command")`. SimpleEvaluationContext is restricted—
    it only allows property access and disables method invocation, type references, and constructors.
    Always use SimpleEvaluationContext when processing any external input. Only use StandardEvaluationContext
    for trusted, internal expressions.
    (70 words)

    **Q: Can a WAF protect against EL injection?**
    A: A Web Application Firewall (WAF) can provide defense-in-depth by blocking common EL injection patterns
    like `${`, `#{`, `T(java.lang.Runtime)`, and `getClass().forName`. However, attackers can bypass WAF
    rules using encoding, fragmentation, or alternative syntax. WAF protection is a layer, not a solution.
    The correct fix is to never evaluate user input as EL expressions. Use WAF alongside secure coding practices,
    input validation, and SAST tools for comprehensive protection.
    (75 words)

H2: Related Vulnerabilities & Resources
    - [SQL Injection](/kb/security/vulnerabilities/sql-injection/) - Another A03:2021 injection type
    - [Command Injection](/kb/security/vulnerabilities/command-injection/) - OS command execution
    - [LDAP Injection](/kb/security/vulnerabilities/ldap-injection/) - Directory service injection
    - [Server-Side Template Injection (SSTI)](/kb/security/vulnerabilities/ssti/) - Template engine RCE
    - [Cursor Security Patterns](/kb/vibe-coding-tools/cursor/) - How Cursor generates EL injection
    - [Spring Boot Security Guide](/kb/security/stacks/spring-boot/) - Securing Spring applications
```

### Required Elements Checklist
- [x] Quick answer in first 50 words
- [ ] Stats box with Scanner data (marked "Data coming soon")
- [x] Types comparison table (SpEL vs OGNL vs MVEL vs JSP EL)
- [x] Complete AI fix prompt (250-350 words)
- [x] Before/after code examples (3 examples covering Spring SpEL, StandardEvaluationContext, Struts2)
- [x] 5 FAQ entries matching PAA
- [x] Scanner CTA in Detection section
- [x] 5-10 internal links planned
- [x] CWE-917, OWASP A03:2021 references

---

## 5. Internal Linking

### Must Link TO (Parent/Authority Pages)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/ | "security vulnerabilities" |
| /kb/security/ | "application security" |
| /kb/vibe-coding-tools/cursor/ | "Cursor security patterns" |
| /kb/vibe-coding-tools/bolt/ | "Bolt.new code generation" |

### Should Link TO (Related Content)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/sql-injection/ | "SQL injection" |
| /kb/security/vulnerabilities/command-injection/ | "command injection" |
| /kb/security/vulnerabilities/ldap-injection/ | "LDAP injection" |
| /kb/security/vulnerabilities/ssti/ | "Server-Side Template Injection" |
| /kb/security/vulnerabilities/xss/ | "Cross-Site Scripting (XSS)" |
| /kb/security/stacks/spring-boot/ | "Spring Boot security" |
| /kb/security/stacks/nextjs-supabase/ | "Next.js + Supabase stack" |
| /kb/security/fixes/el-injection/spring-boot/ | "fix EL injection in Spring Boot" |
| /kb/security/fixes/el-injection/struts2/ | "fix EL injection in Struts2" |
| /kb/glossary/security/rce/ | "Remote Code Execution (RCE)" |
| /kb/glossary/security/injection/ | "injection attacks" |

### External Authority Links
| Source | Purpose | URL |
|--------|---------|-----|
| OWASP EL Injection | Official vulnerability description | https://owasp.org/www-community/vulnerabilities/Expression_Language_Injection |
| CWE-917 | Technical reference | https://cwe.mitre.org/data/definitions/917.html |
| OWASP Top 10:2021 A03 | Injection category | https://owasp.org/Top10/2021/A03_2021-Injection/ |
| Snyk Learn EL Injection | Tutorial and examples | https://learn.snyk.io/lesson/express-language-injection/ |
| PortSwigger EL Injection | Security testing reference | https://portswigger.net/kb/issues/00100f20_expression-language-injection |
| Minded Security Whitepaper | In-depth technical analysis | https://mindedsecurity.com/wp-content/uploads/2020/10/ExpressionLanguageInjection.pdf |
| Black Duck CVE-2017-5638 | Equifax breach analysis | https://www.blackduck.com/blog/cve-2017-5638-apache-struts-vulnerability-explained.html |
| Akamai Spring Cloud Function | CVE-2022-22963 analysis | https://www.akamai.com/blog/security/spring-cloud-function |
| Spring Security Docs | Official security recommendations | https://docs.spring.io/spring-security/reference/index.html |
| Spring Evaluation Docs | EvaluationContext reference | https://docs.spring.io/spring-framework/reference/core/expressions/evaluation.html |
| CodeQL SpEL Injection Query | SAST detection | https://codeql.github.com/codeql-query-help/java/java-spel-expression-injection/ |
| Apache Struts Security | Struts2 security guidance | https://struts.apache.org/security/ |
| CSET AI Code Security Report | AI-generated code vulnerabilities | https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/ |
| Veracode AI Security Risks | AI code security statistics | https://www.veracode.com/blog/ai-generated-code-security-risks/ |

---

## 6. Unique Angle

### Our Differentiator
**AI Coding Tools & EL Injection Patterns:** We are the first to comprehensively address how modern AI coding tools (Cursor, Bolt, Claude Code, v0, Copilot) generate Expression Language injection vulnerabilities. While competitors focus on general secure coding, we explain:
1. **Why** AI tools create these vulnerabilities (training data includes legacy insecure patterns, AI lacks security context)
2. **Which patterns** AI tools generate most often (string concatenation for SpEL, StandardEvaluationContext usage, forced evaluation with user input)
3. **How vibe coders** can use AI to fix these issues (copy-paste AI fix prompts)
4. **Real CVE analysis** connecting AI coding practices to major breaches (Equifax, Spring Cloud)

### Key Message
**Expression Language injection is a critical RCE vulnerability that AI coding tools frequently generate because they lack understanding of the security boundary between code and data. The Equifax breach (145M+ records, $575M+ settlements) was caused by EL injection (CVE-2017-5638). Vibe coders using Spring or Struts frameworks must validate all inputs and use SimpleEvaluationContext instead of StandardEvaluationContext.**

### Data-Driven Claims to Highlight
1. **"The Equifax breach via CVE-2017-5638 exposed 145+ million US citizens' personal data due to an OGNL injection in Apache Struts2—and Equifax failed to patch for 146 days after the fix was publicly available."** (Source: [Black Duck CVE-2017-5638 analysis](https://www.blackduck.com/blog/equifax-apache-struts-vulnerability-cve-2017-5638.html))

2. **"According to Georgetown University's CSET November 2024 report, only 55% of AI-generated code was secure across 100+ tested LLMs, with context-dependent vulnerabilities like EL injection particularly problematic."** (Source: [CSET AI-Generated Code Security](https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/))

3. **"76% of developers now use AI to write code, and at Microsoft, 30% of code is AI-generated—but Apiiro found a 10X increase in APIs missing authorization in AI-generated codebases."** (Source: [Veracode AI Code Security Risks](https://www.veracode.com/blog/ai-generated-code-security-risks/))

4. **"CVE-2022-22963 (Spring Cloud Function SpEL injection) was exploited in the wild within days of disclosure, with a critical CVSS 9.8 severity allowing remote attackers to execute arbitrary code via HTTP headers."** (Source: [Akamai Spring Cloud Function](https://www.akamai.com/blog/security/spring-cloud-function))

5. **"Using StandardEvaluationContext instead of SimpleEvaluationContext allows attackers to execute system commands like `T(java.lang.Runtime).getRuntime().exec('malicious-command')` through SpEL expressions."** (Source: [Spring Evaluation Documentation](https://docs.spring.io/spring-framework/reference/core/expressions/evaluation.html))

---

## 7. Meta Information

### Suggested Title Tag (under 60 chars)
```
EL Injection: Find & Fix in Java/Spring | VibeShip
```
*(52 characters)*

### Suggested Meta Description (150-160 chars)
```
Expression Language injection lets attackers execute code and steal data. Found in Equifax breach (145M+ records). Get fixes for Spring, Struts & AI tools.
```
*(159 characters)*

### Target URL
```
/kb/security/vulnerabilities/el-injection/
```

### Related URLs to Create
- /kb/security/fixes/el-injection/spring-boot/
- /kb/security/fixes/el-injection/struts2/
- /kb/security/fixes/el-injection/jsp/
- /kb/vibe-coding-tools/cursor/el-injection/
- /kb/vibe-coding-tools/bolt/el-injection/
- /kb/glossary/security/spel/
- /kb/glossary/security/ognl/
- /kb/glossary/security/evaluation-context/

---

## 8. Writer Notes

### Tone Guidance
- **Technical but accessible:** This vulnerability requires more Java/Spring context than typical web vulnerabilities. Explain SpEL, OGNL, and evaluation contexts clearly for vibe coders who may not have deep Java experience.
- **Emphasize real-world impact:** The Equifax breach is a powerful cautionary tale. Use it prominently to show consequences of ignoring EL injection.
- **Not alarmist, but serious:** EL injection is Critical severity (CVSS 9.0+) and enables full RCE. Communicate severity without panic.
- **Framework-specific:** Spring and Struts2 are primary targets. Provide clear, copy-paste code examples for each.

### Technical Accuracy Notes
1. **${} vs #{} distinction:** In Spring, `${}` is for property placeholders (usually safe), while `#{}` is SpEL (dangerous). However, `${}` can be unsafe in certain contexts (JSP double evaluation). Explain this nuance clearly.

2. **SimpleEvaluationContext is NOT a silver bullet:** Even SimpleEvaluationContext should never process untrusted user input as SpEL expressions. The correct approach is to avoid dynamic SpEL entirely.

3. **CVE timeline accuracy:**
   - CVE-2017-5638: Disclosed March 6, 2017; Equifax breached May-July 2017; failed to patch for 146 days
   - CVE-2022-22963: Disclosed March 24, 2022; affects Spring Cloud Function 3.1.6, 3.2.2 and older
   - CVE-2022-22965: Spring4Shell; requires JDK 9+, Tomcat, Spring Framework 5.3.0-5.3.17 or 5.2.0-5.2.19

4. **Struts2 version ranges:** Many CVEs affect different version ranges. Be specific (e.g., CVE-2020-17530 affects 2.0.0-2.5.25; fix is 2.5.26+).

5. **OGNL allowlist:** Struts 2.5.26+ introduced OGNL allowlist. Recommend enabling `struts.allowlist.enable=true` for defense in depth.

### Things to Avoid
1. **Don't oversimplify EL types:** SpEL, OGNL, MVEL, and JSP EL are different implementations with different syntax and risk profiles. Don't conflate them.

2. **Don't recommend blacklist filtering:** Filtering `${`, `#{`, `%{` characters is bypassable (encoding, fragmentation). Emphasize that the ONLY correct fix is to never evaluate user input as EL.

3. **Don't claim WAF is a fix:** WAF is defense in depth, not a solution. Attackers bypass WAF rules. Secure coding is the primary defense.

4. **Avoid outdated Spring versions in examples:** Use Spring Boot 2.7+ or 3.x in code examples, not Spring 3.0.5 like OWASP does.

5. **Don't forget Spring Data MongoDB:** CVE-2022-22980 affects @Query and @Aggregation with parametrized SpEL. Mention this for completeness.

### Reference Materials

**Primary Technical Sources:**
- [OWASP Expression Language Injection](https://owasp.org/www-community/vulnerabilities/Expression_Language_Injection) - Authoritative overview
- [CWE-917](https://cwe.mitre.org/data/definitions/917.html) - Official definition
- [Minded Security EL Injection Whitepaper (PDF)](https://mindedsecurity.com/wp-content/uploads/2020/10/ExpressionLanguageInjection.pdf) - In-depth technical analysis
- [Spring Framework Evaluation Context Docs](https://docs.spring.io/spring-framework/reference/core/expressions/evaluation.html) - SimpleEvaluationContext vs StandardEvaluationContext
- [CodeQL SpEL Injection Query](https://codeql.github.com/codeql-query-help/java/java-spel-expression-injection/) - Detection patterns
- [CodeQL MVEL Injection Query](https://codeql.github.com/codeql-query-help/java/java-mvel-expression-injection/) - MVEL detection

**CVE Analysis:**
- [Black Duck: CVE-2017-5638 Equifax Breach](https://www.blackduck.com/blog/equifax-apache-struts-vulnerability-cve-2017-5638.html)
- [Akamai: CVE-2022-22963 Spring Cloud Function](https://www.akamai.com/blog/security/spring-cloud-function)
- [Spring: CVE-2022-22980 Spring Data MongoDB](https://spring.io/blog/2022/06/20/spring-data-mongodb-spel-expression-injection-vulnerability-cve-2022-22980/)
- [Qualys: CVE-2020-17530 Struts2 Double OGNL](https://blog.qualys.com/vulnerabilities-threat-research/2021/09/21/apache-struts-2-double-ognl-evaluation-vulnerability-cve-2020-17530)

**AI Code Security Research:**
- [Georgetown CSET: Cybersecurity Risks of AI-Generated Code (Nov 2024)](https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/)
- [Veracode: AI-Generated Code Security Risks](https://www.veracode.com/blog/ai-generated-code-security-risks/)
- [Checkmarx: Why AI-Generated Code May Be Less Secure](https://checkmarx.com/learn/ai-security/why-ai-generated-code-may-be-less-secure-and-how-to-protect-it/)

**Tutorials:**
- [Snyk Learn: Express Language Injection](https://learn.snyk.io/lesson/express-language-injection/)
- [PortSwigger: Expression Language Injection](https://portswigger.net/kb/issues/00100f20_expression-language-injection)
- [0xn3va Application Security Cheat Sheet: SpEL Injection](https://0xn3va.gitbook.io/cheat-sheets/framework/spring/spel-injection)

**Framework Security Guides:**
- [Apache Struts Security](https://struts.apache.org/security/)
- [Spring Security Reference](https://docs.spring.io/spring-security/reference/index.html)

---

## 9. AI Tool Research Notes

### Why AI Tools Generate EL Injection Vulnerabilities

Based on Georgetown CSET November 2024 research analyzing 100+ LLMs:

1. **Context-Dependent Vulnerabilities:** AI tools struggle with vulnerabilities that are safe in one context but dangerous in another. EL injection is safe when expressions are static and trusted, but dangerous when expressions include user input. AI cannot distinguish these contexts without full application knowledge.

2. **Training Data Bias:** AI models are trained on public code repositories, many of which contain legacy insecure patterns (e.g., Spring 3.0.5 double-evaluation issues, Struts2 forced evaluation with user input). AI replicates these patterns.

3. **"Working Code" Priority:** AI tools optimize for generating code that compiles and runs, not code that is secure. Using `StandardEvaluationContext` is simpler and more powerful than `SimpleEvaluationContext`, so AI defaults to it.

4. **Missing Security Boundaries:** AI does not understand the security principle that "user input is data, not code." It treats SpEL expressions as a convenient way to process dynamic data without recognizing the RCE risk.

### Common AI-Generated Vulnerable Patterns

**Pattern 1: String Concatenation for SpEL**
```java
// AI-generated vulnerable code
String userQuery = request.getParameter("query");
String spelExpression = "#root." + userQuery; // DANGER!
ExpressionParser parser = new SpelExpressionParser();
parser.parseExpression(spelExpression).getValue();
```

**Pattern 2: StandardEvaluationContext by Default**
```java
// AI generates this because it's in training data examples
ExpressionParser parser = new SpelExpressionParser();
StandardEvaluationContext context = new StandardEvaluationContext(); // DANGER!
Expression exp = parser.parseExpression(someExpression);
exp.getValue(context);
```

**Pattern 3: Struts2 Forced Evaluation with User Input**
```java
// AI generates JSP/Struts code with forced evaluation
<s:property value="%{#parameters.msg}" /> // DANGER!
```

**Pattern 4: Spring @Query with Dynamic SpEL**
```java
// AI generates parametrized SpEL in @Query
@Query("{ 'name': ?#{#name} }") // If #name is user-controlled, DANGER!
List<User> findByName(String name);
```

### AI Fix Prompt Effectiveness

The 250-350 word AI fix prompt in Section 4 (H2: How to Fix) is designed to:
1. **Teach AI the security boundary:** Explicitly state "never evaluate user input as expressions"
2. **Provide safe alternatives:** Show parameterized queries, SimpleEvaluationContext, static templates
3. **Include detection patterns:** Help AI identify vulnerable code in existing codebases
4. **Framework-specific guidance:** Cover Spring, Struts2, MVEL, JSP separately

This prompt can be used by vibe coders with Cursor, Bolt, Claude Code, or Copilot to audit and fix EL injection in their Java/Spring projects.

---

## 10. Competitive Keywords Analysis

### Primary Keyword: "expression language injection"
- **Current top results:** OWASP, Snyk Learn, PortSwigger
- **Search intent:** Developers want to understand what EL injection is (informational)
- **Our edge:** Real CVE analysis (Equifax), AI tool angle, framework comparison table, copy-paste fixes

### Secondary Keywords with Lower Competition:
- **"SpEL injection"** - Spring-specific, lower competition than general "EL injection"
- **"OGNL injection"** - Struts2-specific, good opportunity to rank for Equifax breach searches
- **"CVE-2017-5638"** - High search volume after Equifax breach, we can provide detailed analysis
- **"SimpleEvaluationContext vs StandardEvaluationContext"** - Specific Spring security question, low competition
- **"how to prevent expression language injection"** - Transactional intent, good for conversion to Scanner

### Long-Tail Opportunities:
- "expression language injection in AI-generated code"
- "Spring Cloud Function CVE-2022-22963 fix"
- "Equifax breach OGNL injection"
- "detect SpEL injection Java code"
- "Spring Boot EL injection prevention"

---

**Brief Status:** ✅ Complete - Ready for Writer Agent

**Next Steps:**
1. Hand off to Writer Agent with full VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md
2. Writer Agent creates complete Svelte component following content formula
3. QA against qa-checklist.md (10 SEO+LLM rules)
4. Publish to /kb/security/vulnerabilities/el-injection/
5. Update .content-ops/QUEUE.md status to "Published"
