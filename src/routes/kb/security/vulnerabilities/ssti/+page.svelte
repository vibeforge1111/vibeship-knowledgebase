<script lang="ts">
  import { onMount } from 'svelte';

  let showFixPrompt = $state(false);
  let copySuccess = $state(false);

  const aiFixPrompt = `Review my codebase for Server-Side Template Injection (SSTI) vulnerabilities (CWE-1336):

## Check 1: Template String Construction
Search for patterns where user input enters template strings:
- Python: f"...{user_input}...", "..." + user_input, render_template_string()
- Node.js: \`...\${userInput}...\` with template engines, ejs.render()
- PHP: "...$variable..." with Twig/Blade
- Java: String concatenation into FreeMarker/Velocity templates

Flag: Any user input concatenated into template strings

## Check 2: Dynamic Template Names
Look for user-controlled template selection:
- render(req.params.template)
- render_template(user_input)
- Template path derived from user input
- Include statements with variable paths

## Check 3: Unsafe Helper Registration
In Handlebars/custom engines, check for:
- Helpers that execute shell commands
- Helpers that access the filesystem
- Helpers using eval() or exec()
- Custom filters with dangerous operations

## Check 4: Template Engine Configuration
Verify secure defaults:
- Jinja2: sandbox mode for untrusted templates
- EJS: avoid client option for untrusted data
- Twig: sandbox policy enabled
- FreeMarker: secure configuration

## Secure Patterns by Engine

Jinja2 (Python/Flask):
\`\`\`python
# SECURE: Pass data as template variables
return render_template('greeting.html', name=user_input)
# Or with inline templates
return render_template_string("Hello {"{{"} name {"}}"}", name=user_input)
\`\`\`

EJS (Node.js/Express):
\`\`\`javascript
// SECURE: Use data object, never concatenate
res.render('page', {"{"}name: userInput{"}"})
// In template: <%= name %> for escaped output
\`\`\`

Pug (Node.js):
\`\`\`javascript
// SECURE: Pass data object
res.render('template', {"{"}name: userInput{"}"})
// In template: h1= name (interpolated and escaped)
\`\`\`

Twig (PHP):
\`\`\`php
// SECURE: Use named template with data
echo $twig->render('hello.twig', ['name' => $name]);
\`\`\`

FreeMarker (Java):
\`\`\`java
// SECURE: Use data model
template.process(dataModel, out);
\`\`\`

For each vulnerability found:
1. Show the vulnerable code with line numbers
2. Demonstrate how {{7*7}} or \${7*7} would evaluate
3. Explain the RCE path for that specific engine
4. Provide secure replacement with data passed as variables
5. If render_template_string() is used, suggest switching to file-based templates`;

  function copyPrompt() {
    navigator.clipboard.writeText(aiFixPrompt);
    copySuccess = true;
    setTimeout(() => copySuccess = false, 2000);
  }

  // Schema.org structured data
  onMount(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "SSTI: When AI Template Code Becomes Remote Code Execution",
      "description": "Server-Side Template Injection (SSTI) lets attackers execute code through template engines like Jinja2, EJS, and Pug. AI generates vulnerable patterns. Learn detection and prevention.",
      "author": {
        "@type": "Organization",
        "name": "vibeship"
      },
      "publisher": {
        "@type": "Organization",
        "name": "vibeship",
        "url": "https://vibeship.co"
      },
      "datePublished": "2024-12-17",
      "dateModified": "2024-12-17",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://vibeship.co/kb/security/vulnerabilities/ssti/"
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is server-side template injection?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Server-side template injection (SSTI) is a vulnerability where attackers inject malicious expressions into template engines that execute on your server. Unlike XSS which runs in browsers, SSTI runs on your server - meaning attackers can read files, access databases, and execute system commands. It happens when user input is concatenated into template strings instead of passed as data."
          }
        },
        {
          "@type": "Question",
          "name": "How do I detect SSTI vulnerabilities?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Test input fields with template expressions: {{7*7}}, ${7*7}, or <%= 7*7 %>. If the output shows '49' instead of the literal text, you likely have SSTI. Different template engines use different syntax - Jinja2/Twig use {{, FreeMarker uses ${, and EJS/ERB use <%=. Error messages can also reveal which engine is running."
          }
        },
        {
          "@type": "Question",
          "name": "Is Jinja2 vulnerable to SSTI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Jinja2 itself is not inherently vulnerable - the vulnerability comes from how developers use it. When you concatenate user input into template strings (like f'Hello {"{"}name{"}"}' with render_template_string()), you create SSTI. The secure pattern is passing data as variables: render_template_string('Hello {"{{"} name {"}}"}', name=user_input). Jinja2's autoescape prevents XSS but does not prevent SSTI."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between SSTI and XSS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Location of execution is the key difference. XSS (Cross-Site Scripting) executes malicious code in the victim's browser - attackers can steal cookies or hijack sessions. SSTI (Server-Side Template Injection) executes on your server - attackers can read files, access databases, and run system commands. SSTI is typically more severe because it leads to Remote Code Execution (RCE), while XSS is limited to browser context."
          }
        },
        {
          "@type": "Question",
          "name": "How do I prevent template injection in Node.js?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Never concatenate user input into template strings. With EJS, use res.render('template', { data: userInput }) instead of building template strings dynamically. With Pug, pass data objects rather than interpolating into the template source. Avoid using eval() or Function() constructors. If you must render user-controlled templates, use a sandboxed environment and strictly validate input against an allowlist."
          }
        }
      ]
    };

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.text = JSON.stringify(schema);
    document.head.appendChild(scriptTag);

    const faqScriptTag = document.createElement('script');
    faqScriptTag.type = 'application/ld+json';
    faqScriptTag.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScriptTag);
  });
</script>

<svelte:head>
  <title>SSTI: When AI Template Code Becomes Remote Code Execution | vibeship</title>
  <meta name="description" content="Server-Side Template Injection (SSTI) lets attackers execute code through template engines like Jinja2, EJS, and Pug. AI generates vulnerable patterns. Learn detection and prevention." />
  <meta name="keywords" content="SSTI, server-side template injection, template injection, Jinja2 SSTI, EJS security, CWE-1336, vibe coding security" />
  <link rel="canonical" href="https://vibeship.co/kb/security/vulnerabilities/ssti/" />
</svelte:head>

<nav aria-label="Breadcrumb" class="breadcrumb">
  <a href="/">Home</a>
  <span>/</span>
  <a href="/kb">Knowledge Base</a>
  <span>/</span>
  <a href="/kb/security">Security</a>
  <span>/</span>
  <a href="/kb/security/vulnerabilities">Vulnerabilities</a>
  <span>/</span>
  <span aria-current="page">SSTI</span>
</nav>

<article class="vulnerability-article">
  <header class="article-header">
    <div class="severity-badge critical">Critical Severity</div>
    <h1>SSTI: When AI Template Code Becomes Remote Code Execution</h1>
    <p class="subtitle">Server-Side Template Injection leads to full server compromise</p>
  </header>

  <div class="quick-answer">
    <strong>Server-Side Template Injection lets attackers execute code by injecting template expressions into your app.</strong>
    AI tools generate vulnerable code that concatenates user input into templates. The fix: always pass user data as template variables, never embed it in the template string itself.
    Classified as <a href="https://cwe.mitre.org/data/definitions/1336.html">CWE-1336</a>.
  </div>

  <div class="stats-box">
    <div class="stat">
      <span class="stat-value">RCE</span>
      <span class="stat-label">Typical Impact</span>
    </div>
    <div class="stat">
      <span class="stat-value">Critical</span>
      <span class="stat-label">Severity</span>
    </div>
    <div class="stat">
      <span class="stat-value">#3</span>
      <span class="stat-label">OWASP Injection</span>
    </div>
    <div class="stat">
      <span class="stat-value">8+</span>
      <span class="stat-label">Major Engines Affected</span>
    </div>
  </div>

  <nav class="toc">
    <h2>Contents</h2>
    <ul>
      <li><a href="#what-is-ssti">What is SSTI?</a></li>
      <li><a href="#how-attacks-work">How SSTI Attacks Work</a></li>
      <li><a href="#why-ai-generates">Why AI Tools Generate Vulnerable Code</a></li>
      <li><a href="#template-patterns">Secure Patterns by Template Engine</a></li>
      <li><a href="#detection">How to Detect SSTI</a></li>
      <li><a href="#ssti-vs-xss">SSTI vs XSS</a></li>
      <li><a href="#ai-fix-prompt">AI Fix Prompt</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
  </nav>

  <section id="what-is-ssti">
    <h2>What is Server-Side Template Injection?</h2>

    <p>Server-Side Template Injection (SSTI) is a vulnerability where user input is embedded directly into server-side templates, allowing attackers to inject malicious expressions that execute on your server. Template engines like Jinja2, EJS, and Pug process special syntax - and if attackers can inject that syntax, they control what runs on your server.</p>

    <p>Think of templates like fill-in-the-blank documents. Normally, you fill in the blanks with data. SSTI is like letting someone rewrite the document itself. Instead of filling in "name: John", they inject code that reads your database or executes system commands.</p>

    <p>SSTI is part of the <a href="https://owasp.org/Top10/A03_2021-Injection/">OWASP A03:2021 Injection</a> category. Unlike <a href="/kb/security/vulnerabilities/xss/">XSS</a> which runs in browsers, SSTI runs on your server - making it typically more severe. A successful SSTI attack usually leads to Remote Code Execution (RCE), giving attackers complete control over your server.</p>
  </section>

  <section id="how-attacks-work">
    <h2>How SSTI Attacks Work</h2>

    <p>SSTI attacks follow a predictable pattern: detection, engine identification, and exploitation. Attackers test whether template expressions are evaluated, determine which engine is running, then craft payloads specific to that engine.</p>

    <h3>Step 1: Detection</h3>
    <p>Attackers inject simple mathematical expressions to test if templates are processed:</p>

    <div class="code-block">
      <pre><code class="language-text"># Test payloads
Input: {"{{"}7*7{"}}"}
Output: 49  ← SSTI confirmed!

Input: ${"${"}7*7{"}"}
Output: 49  ← SSTI confirmed!

Input: {"<%="}7*7{"%>"}
Output: 49  ← SSTI confirmed!</code></pre>
    </div>

    <p>If the output shows "49" instead of the literal text, the template engine evaluated the expression - confirming SSTI vulnerability exists.</p>

    <h3>Step 2: Engine Identification</h3>
    <p>Different engines use different syntax. Attackers identify the engine to craft appropriate exploits:</p>

    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th>Syntax</th>
            <th>Template Engines</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>{"{{"}...{"}}"}</code></td>
            <td>Jinja2, Twig, Django</td>
            <td>Python, PHP</td>
          </tr>
          <tr>
            <td><code>{"${"}...{"}"}</code></td>
            <td>FreeMarker, Velocity</td>
            <td>Java</td>
          </tr>
          <tr>
            <td><code>{"<%="}...{"%>"}</code></td>
            <td>EJS, ERB</td>
            <td>Node.js, Ruby</td>
          </tr>
          <tr>
            <td><code>#{"{}"}...</code></td>
            <td>Pug (Jade)</td>
            <td>Node.js</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>Step 3: Exploitation</h3>
    <p>Once the engine is identified, attackers use engine-specific payloads to achieve RCE. Here's a Jinja2 example that reads system files:</p>

    <div class="code-block">
      <pre><code class="language-python"># Jinja2 payload to read /etc/passwd
{"{{"}''.__class__.__mro__[1].__subclasses__()[40]('/etc/passwd').read(){"}}"}

# Execute system commands
{"{{"}config.__class__.__init__.__globals__['os'].popen('id').read(){"}}"}</code></pre>
    </div>

    <p>The <a href="https://portswigger.net/web-security/server-side-template-injection">PortSwigger SSTI guide</a> documents exploitation techniques for various engines in detail.</p>
  </section>

  <section id="why-ai-generates">
    <h2>Why AI Tools Generate Vulnerable Code</h2>

    <p>AI coding tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, and <a href="/kb/vibe-coding-tools/bolt/">Bolt</a> frequently generate SSTI-vulnerable code because string concatenation feels "natural" for dynamic content. When vibe coders ask for personalized templates, AI reaches for f-strings and template literals.</p>

    <p>The core issue: AI treats template syntax as regular string building. For "personalized greeting" requests, AI generates:</p>

    <div class="code-comparison">
      <div class="code-vulnerable">
        <h4>AI-Generated (Vulnerable)</h4>
        <pre><code class="language-python"># Flask/Jinja2 - AI's typical output
@app.route('/greet')
def greet():
    name = request.args.get('name')
    # Direct concatenation into template
    template = f"&lt;h1&gt;Welcome, {"{"}name{"}"}!&lt;/h1&gt;"
    return render_template_string(template)

# Attack: ?name={"{{"}config.items(){"}}"}</code></pre>
      </div>
      <div class="code-secure">
        <h4>Secure Pattern</h4>
        <pre><code class="language-python"># Flask/Jinja2 - Correct approach
@app.route('/greet')
def greet():
    name = request.args.get('name')
    # Pass data as variable, not in template string
    return render_template_string(
        "&lt;h1&gt;Welcome, {"{{"}name{"}}"}!&lt;/h1&gt;",
        name=name
    )</code></pre>
      </div>
    </div>

    <h3>Common AI Patterns That Create SSTI</h3>

    <div class="code-block">
      <pre><code class="language-python"># Pattern 1: f-string templates (Python)
template = f"Hello {"{"}user_input{"}"}"
render_template_string(template)

# Pattern 2: Template literal concatenation (Node.js)
const template = `&lt;div&gt;${"{"}userInput{"}"}&lt;/div&gt;`
ejs.render(template)

# Pattern 3: String addition
template = "Hello " + user_input + "!"
render_template_string(template)</code></pre>
    </div>

    <p>AI-generated code from vibe coding sessions prioritizes getting things working. The training data includes millions of examples where concatenation "works" - but creates security vulnerabilities. The mental model AI needs: templates are documents, user input is data that fills blanks.</p>
  </section>

  <section id="template-patterns">
    <h2>Secure Patterns by Template Engine</h2>

    <p>The fix is consistent across all engines: never concatenate user input into template strings. Always pass data as separate variables. Here are secure patterns for the engines vibe coders use most.</p>

    <h3>Jinja2 (Python/Flask)</h3>
    <p>Used with Flask and FastAPI. <a href="https://jinja.palletsprojects.com/">Jinja2</a> is one of the most common targets for SSTI.</p>

    <div class="code-comparison">
      <div class="code-vulnerable">
        <h4>Vulnerable</h4>
        <pre><code class="language-python"># NEVER do this
return render_template_string(
    f"Hello {"{"}name{"}"}"
)</code></pre>
      </div>
      <div class="code-secure">
        <h4>Secure</h4>
        <pre><code class="language-python"># Always pass data as variables
return render_template_string(
    "Hello {"{{"}name{"}}"}",
    name=name
)

# Or use file-based templates (preferred)
return render_template(
    'greeting.html',
    name=name
)</code></pre>
      </div>
    </div>

    <p><strong>Note:</strong> Jinja2's autoescape prevents XSS but does NOT prevent SSTI. Even with autoescape enabled, template expressions still execute.</p>

    <h3>EJS (Node.js/Express)</h3>
    <p><a href="https://www.npmjs.com/package/ejs">EJS</a> is common in Express applications. CVE-2024-34359 affected LLM tools using EJS-style templating.</p>

    <div class="code-comparison">
      <div class="code-vulnerable">
        <h4>Vulnerable</h4>
        <pre><code class="language-javascript">// NEVER build template strings
const html = ejs.render(
    `&lt;p&gt;${"{"}userInput{"}"}&lt;/p&gt;`
)</code></pre>
      </div>
      <div class="code-secure">
        <h4>Secure</h4>
        <pre><code class="language-javascript">// Pass data object to template
res.render('page', {"{"}
    name: userInput
{"}"})

// In template file:
// &lt;p&gt;{"<%="}name{"%>"}&lt;/p&gt; (escaped)
// &lt;p&gt;{"<%-"}name{"%>"}&lt;/p&gt; (unescaped, only for trusted)</code></pre>
      </div>
    </div>

    <h3>Pug (Node.js)</h3>
    <p><a href="https://pugjs.org/">Pug</a> (formerly Jade) is another Express favorite. Same principle applies.</p>

    <div class="code-comparison">
      <div class="code-vulnerable">
        <h4>Vulnerable</h4>
        <pre><code class="language-javascript">// NEVER concatenate into template source
const template = `h1 ${"{"}userInput{"}"}`
pug.render(template)</code></pre>
      </div>
      <div class="code-secure">
        <h4>Secure</h4>
        <pre><code class="language-javascript">// Pass data as locals
res.render('template', {"{"}
    name: userInput
{"}"})

// In template file:
// h1= name (interpolated and escaped)</code></pre>
      </div>
    </div>

    <h3>Twig (PHP)</h3>
    <p>Common in Symfony and Laravel projects.</p>

    <div class="code-comparison">
      <div class="code-vulnerable">
        <h4>Vulnerable</h4>
        <pre><code class="language-php">// NEVER use createTemplate with user input
$twig->createTemplate("Hello $name")->render();</code></pre>
      </div>
      <div class="code-secure">
        <h4>Secure</h4>
        <pre><code class="language-php">// Use file-based templates with data
echo $twig->render('hello.twig', [
    'name' => $name
]);</code></pre>
      </div>
    </div>

    <h3>Handlebars (Node.js)</h3>
    <p>Handlebars is safer by default due to its limited expression language, but custom helpers can introduce vulnerabilities.</p>

    <div class="code-comparison">
      <div class="code-vulnerable">
        <h4>Vulnerable Helper</h4>
        <pre><code class="language-javascript">// NEVER create helpers that execute code
Handlebars.registerHelper('exec', (cmd) =&gt; {"{"}
    return require('child_process')
        .execSync(cmd)
{"}"})</code></pre>
      </div>
      <div class="code-secure">
        <h4>Secure Pattern</h4>
        <pre><code class="language-javascript">// Only register safe helpers
Handlebars.registerHelper('uppercase', (str) =&gt; {"{"}
    return str.toUpperCase()
{"}"})

// Compile templates from trusted files only
const template = Handlebars.compile(
    fs.readFileSync('template.hbs', 'utf8')
)</code></pre>
      </div>
    </div>
  </section>

  <section id="detection">
    <h2>How to Detect SSTI</h2>

    <p>Detection involves testing for template expression evaluation and identifying which engine is running. The <a href="https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/18-Testing_for_Server-side_Template_Injection">OWASP SSTI Testing Guide</a> provides comprehensive methodology.</p>

    <h3>Manual Testing</h3>
    <p>Inject these payloads into any user input field (form fields, URL parameters, headers):</p>

    <div class="code-block">
      <pre><code class="language-text"># Universal detection payloads
{"{{"}7*7{"}}"}        → 49 = Jinja2/Twig/Django
${"${"}7*7{"}"}        → 49 = FreeMarker/Velocity
{"<%="}7*7{"%>"}       → 49 = EJS/ERB
#{"{}"}7*7             → 49 = Pug
${"{{"}7*7{"}}"}       → 49 = Smarty

# Error-based detection
${"{{"}               → Error message reveals engine
${"${"}               → Error message reveals engine</code></pre>
    </div>

    <h3>Automated Tools</h3>
    <ul>
      <li><a href="https://github.com/epinna/tplmap">Tplmap</a> - Automated SSTI detection and exploitation</li>
      <li><a href="https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Template%20Injection">PayloadsAllTheThings</a> - Payload collection for various engines</li>
      <li>Burp Scanner - Includes SSTI checks in professional version</li>
      <li>SAST tools - Opengrep, Trivy can detect vulnerable patterns in code</li>
    </ul>

    <h3>Code Review Patterns</h3>
    <p>Search your codebase for these dangerous patterns:</p>

    <div class="code-block">
      <pre><code class="language-text"># Python
render_template_string(f"...")
render_template_string("..." + variable)
Template(user_input)

# Node.js
ejs.render(`...${"{"}var{"}"}...`)
pug.render(variable)
new Function(user_input)

# PHP
$twig->createTemplate($variable)
eval() with template content</code></pre>
    </div>
  </section>

  <section id="ssti-vs-xss">
    <h2>SSTI vs XSS: Understanding the Difference</h2>

    <p>Both are injection vulnerabilities, but they execute in different places with vastly different impacts.</p>

    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th>Aspect</th>
            <th>SSTI</th>
            <th>XSS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Execution Location</strong></td>
            <td>Server</td>
            <td>Browser</td>
          </tr>
          <tr>
            <td><strong>Typical Impact</strong></td>
            <td>Remote Code Execution</td>
            <td>Session hijacking, defacement</td>
          </tr>
          <tr>
            <td><strong>What Attacker Accesses</strong></td>
            <td>Server files, databases, system commands</td>
            <td>User's browser session, cookies</td>
          </tr>
          <tr>
            <td><strong>Severity</strong></td>
            <td>Critical (server compromise)</td>
            <td>High (user account compromise)</td>
          </tr>
          <tr>
            <td><strong>Prevention</strong></td>
            <td>Pass data as variables, not in template string</td>
            <td>Output encoding, CSP headers</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>Important nuance: SSTI can lead to XSS (template expressions might output JavaScript), but SSTI is the more dangerous vulnerability. Jinja2's autoescape prevents XSS but NOT SSTI. Learn more about <a href="/kb/security/vulnerabilities/xss/">XSS prevention</a> in our dedicated article.</p>
  </section>

  <section id="ai-fix-prompt">
    <h2>AI Fix Prompt for SSTI</h2>

    <p>Copy this prompt to your AI coding tool to audit your codebase for Server-Side Template Injection vulnerabilities:</p>

    <div class="fix-prompt-container">
      <button class="toggle-prompt" onclick={() => showFixPrompt = !showFixPrompt}>
        {showFixPrompt ? 'Hide' : 'Show'} AI Fix Prompt
      </button>

      {#if showFixPrompt}
        <div class="fix-prompt">
          <div class="prompt-header">
            <span>SSTI Audit Prompt</span>
            <button class="copy-btn" onclick={copyPrompt}>
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre>{aiFixPrompt}</pre>
        </div>
      {/if}
    </div>

    <p>This prompt guides <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, or other AI tools through a systematic review of template usage patterns, identifying vulnerable concatenation and providing engine-specific secure replacements.</p>
  </section>

  <section id="notable-cves">
    <h2>Notable SSTI Vulnerabilities</h2>

    <div class="cve-list">
      <div class="cve-item">
        <h4>CVE-2024-34359 - llama_cpp_python</h4>
        <p>Jinja2 SSTI in Python LLM bindings, allowing RCE. Particularly relevant as it affected AI/LLM tools.</p>
      </div>
      <div class="cve-item">
        <h4>CVE-2020-12790 - Twig</h4>
        <p>Template injection leading to code execution in Symfony applications using Twig.</p>
      </div>
      <div class="cve-item">
        <h4>CVE-2019-19999 - FreeMarker</h4>
        <p>Unsafe default configuration allowing SSTI in Java applications.</p>
      </div>
    </div>
  </section>

  <section id="faq">
    <h2>Frequently Asked Questions</h2>

    <div class="faq-list">
      <details class="faq-item">
        <summary>What is server-side template injection?</summary>
        <div class="faq-answer">
          <p>Server-side template injection (SSTI) is a vulnerability where attackers inject malicious expressions into template engines that execute on your server. Unlike XSS which runs in browsers, SSTI runs on your server - meaning attackers can read files, access databases, and execute system commands. It happens when user input is concatenated into template strings instead of passed as data. The result is usually Remote Code Execution (RCE).</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>How do I detect SSTI vulnerabilities?</summary>
        <div class="faq-answer">
          <p>Test input fields with template expressions: <code>{"{{"}7*7{"}}"}</code>, <code>${"${"}7*7{"}"}</code>, or <code>{"<%="}7*7{"%>"}</code>. If the output shows "49" instead of the literal text, you likely have SSTI. Different template engines use different syntax - Jinja2/Twig use <code>{"{{"}{"}}"}</code>, FreeMarker uses <code>${"${"}{"}"}</code>, and EJS/ERB use <code>{"<%="}{"%>"}</code>. Error messages often reveal which engine is running, helping identify exploitation paths.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>Is Jinja2 vulnerable to SSTI?</summary>
        <div class="faq-answer">
          <p>Jinja2 itself is not inherently vulnerable - the vulnerability comes from how developers use it. When you concatenate user input into template strings (like <code>f"Hello {"{"}name{"}"}"</code> with <code>render_template_string()</code>), you create SSTI. The secure pattern is passing data as variables: <code>render_template_string("Hello {"{{"}name{"}}"}", name=user_input)</code>. Note that Jinja2's autoescape prevents XSS but does NOT prevent SSTI.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>What's the difference between SSTI and XSS?</summary>
        <div class="faq-answer">
          <p>Location of execution is the key difference. XSS (Cross-Site Scripting) executes malicious code in the victim's browser - attackers can steal cookies or hijack sessions. SSTI (Server-Side Template Injection) executes on your server - attackers can read files, access databases, and run system commands. SSTI is typically more severe because it leads to Remote Code Execution (RCE), while XSS is limited to browser context. Read more about <a href="/kb/security/vulnerabilities/xss/">XSS</a>.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>How do I prevent template injection in Node.js?</summary>
        <div class="faq-answer">
          <p>Never concatenate user input into template strings. With EJS, use <code>res.render('template', {"{"} data: userInput {"}"})</code> instead of building template strings dynamically. With Pug, pass data objects rather than interpolating into the template source. Avoid using <code>eval()</code> or <code>Function()</code> constructors. If you must render user-controlled templates, use a sandboxed environment and strictly validate input against an allowlist.</p>
        </div>
      </details>
    </div>
  </section>

  <section class="related-content">
    <h2>Related Security Topics</h2>
    <div class="related-links">
      <a href="/kb/security/vulnerabilities/xss/" class="related-link">
        <h4>Cross-Site Scripting (XSS)</h4>
        <p>Client-side injection - compare with SSTI</p>
      </a>
      <a href="/kb/security/vulnerabilities/command-injection/" class="related-link">
        <h4>Command Injection</h4>
        <p>Another path to RCE through shell commands</p>
      </a>
      <a href="/kb/security/vulnerabilities/sql-injection/" class="related-link">
        <h4>SQL Injection</h4>
        <p>Database injection in the OWASP Injection family</p>
      </a>
      <a href="/kb/security/vulnerabilities/insecure-deserialization/" class="related-link">
        <h4>Insecure Deserialization</h4>
        <p>Another code execution vulnerability in data handling</p>
      </a>
      <a href="/kb/security/vulnerabilities/path-traversal/" class="related-link">
        <h4>Path Traversal</h4>
        <p>Can combine with SSTI for template file attacks</p>
      </a>
    </div>
  </section>

  <section class="cta-section">
    <h2>Scan Your Code for SSTI</h2>
    <p>vibeship scanner automatically detects template injection vulnerabilities in your AI-generated code across Jinja2, EJS, Pug, Twig, and more.</p>
    <a href="https://scanner.vibeship.co" class="cta-button">Scan Your Repository</a>
  </section>
</article>

<style>
  .vulnerability-article {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: system-ui, -apple-system, sans-serif;
    line-height: 1.6;
    color: #1a1a2e;
  }

  .breadcrumb {
    display: flex;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .breadcrumb a {
    color: #6366f1;
    text-decoration: none;
  }

  .breadcrumb a:hover {
    text-decoration: underline;
  }

  .article-header {
    margin-bottom: 2rem;
  }

  .severity-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
  }

  .severity-badge.critical {
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
  }

  h1 {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #1a1a2e;
  }

  .subtitle {
    font-size: 1.125rem;
    color: #666;
  }

  .quick-answer {
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-left: 4px solid #0ea5e9;
    padding: 1.5rem;
    border-radius: 0 8px 8px 0;
    margin-bottom: 2rem;
    font-size: 1rem;
  }

  .quick-answer a {
    color: #0284c7;
    text-decoration: none;
  }

  .quick-answer a:hover {
    text-decoration: underline;
  }

  .stats-box {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat {
    text-align: center;
  }

  .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #6366f1;
  }

  .stat-label {
    font-size: 0.75rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .toc {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .toc h2 {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .toc ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
  }

  .toc a {
    color: #6366f1;
    text-decoration: none;
    font-size: 0.875rem;
  }

  .toc a:hover {
    text-decoration: underline;
  }

  section {
    margin-bottom: 3rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1a1a2e;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1.5rem 0 1rem;
    color: #374151;
  }

  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin: 1rem 0 0.5rem;
    color: #4b5563;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: #6366f1;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .code-block {
    background: #1e1e1e;
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    margin: 1rem 0;
  }

  .code-block pre {
    margin: 0;
  }

  .code-block code {
    color: #d4d4d4;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .code-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1rem 0;
  }

  @media (max-width: 768px) {
    .code-comparison {
      grid-template-columns: 1fr;
    }
  }

  .code-vulnerable,
  .code-secure {
    border-radius: 8px;
    overflow: hidden;
  }

  .code-vulnerable {
    border: 1px solid #fecaca;
  }

  .code-secure {
    border: 1px solid #bbf7d0;
  }

  .code-vulnerable h4,
  .code-secure h4 {
    margin: 0;
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .code-vulnerable h4 {
    background: #fef2f2;
    color: #dc2626;
  }

  .code-secure h4 {
    background: #f0fdf4;
    color: #16a34a;
  }

  .code-vulnerable pre,
  .code-secure pre {
    margin: 0;
    padding: 1rem;
    background: #1e1e1e;
    overflow-x: auto;
  }

  .code-vulnerable code,
  .code-secure code {
    color: #d4d4d4;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.8rem;
    line-height: 1.5;
  }

  .comparison-table {
    overflow-x: auto;
    margin: 1rem 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }

  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }

  th {
    background: #f8fafc;
    font-weight: 600;
    color: #374151;
  }

  td code {
    background: #f1f5f9;
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    font-size: 0.8rem;
  }

  ul, ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  .fix-prompt-container {
    margin: 1.5rem 0;
  }

  .toggle-prompt {
    background: #6366f1;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }

  .toggle-prompt:hover {
    background: #4f46e5;
  }

  .fix-prompt {
    margin-top: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
  }

  .prompt-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .prompt-header span {
    font-weight: 600;
    color: #374151;
  }

  .copy-btn {
    background: #e0e7ff;
    color: #4f46e5;
    border: none;
    padding: 0.375rem 0.75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }

  .copy-btn:hover {
    background: #c7d2fe;
  }

  .fix-prompt pre {
    margin: 0;
    padding: 1rem;
    background: #1e1e1e;
    color: #d4d4d4;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.8rem;
    line-height: 1.6;
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .cve-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;
  }

  .cve-item {
    padding: 1rem;
    background: #fef3c7;
    border-left: 4px solid #f59e0b;
    border-radius: 0 8px 8px 0;
  }

  .cve-item h4 {
    margin: 0 0 0.5rem 0;
    color: #92400e;
    font-size: 0.875rem;
  }

  .cve-item p {
    margin: 0;
    font-size: 0.875rem;
    color: #78350f;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .faq-item {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
  }

  .faq-item summary {
    padding: 1rem;
    font-weight: 500;
    cursor: pointer;
    background: #f8fafc;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .faq-item summary::-webkit-details-marker {
    display: none;
  }

  .faq-item summary::after {
    content: '+';
    font-size: 1.25rem;
    color: #6366f1;
    font-weight: 300;
  }

  .faq-item[open] summary::after {
    content: '-';
  }

  .faq-answer {
    padding: 1rem;
    background: white;
    border-top: 1px solid #e2e8f0;
  }

  .faq-answer p {
    margin: 0;
    font-size: 0.875rem;
    color: #4b5563;
    line-height: 1.6;
  }

  .faq-answer code {
    background: #f1f5f9;
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    font-size: 0.8rem;
  }

  .faq-answer a {
    color: #6366f1;
  }

  .related-content {
    background: #f8fafc;
    border-radius: 12px;
    padding: 2rem;
  }

  .related-content h2 {
    border-bottom: none;
    padding-bottom: 0;
  }

  .related-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .related-link {
    display: block;
    padding: 1rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    text-decoration: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .related-link:hover {
    border-color: #6366f1;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    text-decoration: none;
  }

  .related-link h4 {
    margin: 0 0 0.25rem 0;
    color: #6366f1;
    font-size: 0.875rem;
  }

  .related-link p {
    margin: 0;
    font-size: 0.75rem;
    color: #64748b;
  }

  .cta-section {
    text-align: center;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 12px;
    padding: 3rem 2rem;
    color: white;
  }

  .cta-section h2 {
    color: white;
    border-bottom: none;
    padding-bottom: 0;
  }

  .cta-section p {
    opacity: 0.9;
    max-width: 500px;
    margin: 0 auto 1.5rem;
  }

  .cta-button {
    display: inline-block;
    background: white;
    color: #6366f1;
    padding: 0.875rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    text-decoration: none;
  }
</style>
