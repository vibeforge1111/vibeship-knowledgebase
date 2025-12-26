<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Expression Language Injection: Find & Fix in AI-Generated Code',
		description: 'Expression Language injection lets attackers run code through template variables. Common in Java/Spring vibe coding. Get copy-paste fixes for AI-generated code.',
		url: '/kb/security/vulnerabilities/el-injection/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'EL Injection' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#3',
		category: 'A03:2021 - Injection',
		source: 'https://owasp.org/Top10/A03_2021-Injection/',
		cweId: 'CWE-917',
		cweSource: 'https://cwe.mitre.org/data/definitions/917.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is the difference between EL injection and template injection?',
			answer: 'Expression Language injection is a specific type of template injection that targets Java-based expression languages like JSTL EL, Spring EL, or OGNL. Template injection is the broader category covering Jinja2, Twig, Freemarker, and others. The attack pattern is similar: user input gets interpreted as code instead of text. EL injection specifically exploits the ${} or #{} syntax in Java ecosystems.'
		},
		{
			question: 'Can EL injection lead to remote code execution?',
			answer: 'Yes. EL injection frequently escalates to remote code execution. Expression languages in Java can access Java classes directly. An attacker who controls an expression can call Runtime.getRuntime().exec() to run system commands. This turns a seemingly minor template vulnerability into complete server takeover. Spring EL and OGNL are particularly dangerous because of their powerful reflection capabilities.'
		},
		{
			question: 'Is EL injection possible in modern frameworks like Spring Boot?',
			answer: 'Absolutely. Spring Boot uses Spring Expression Language (SpEL) extensively. If user input reaches @Value annotations, SpEL template strings, or dynamic query construction, injection becomes possible. The framework does not automatically sanitize expressions. Vibe coded Spring Boot apps often pass user input directly into SpEL contexts without realizing the risk.'
		},
		{
			question: 'How do AI coding tools cause EL injection vulnerabilities?',
			answer: 'AI tools generate code that looks clean but concatenates user input into expression strings. When prompted for dynamic templates or configurable queries, models produce patterns like "${userInput}" or SpelExpressionParser.parseExpression(userInput). The code works perfectly in demos. It also opens a direct path to code execution. AI prioritizes functionality over security awareness.'
		},
		{
			question: 'What is the fastest way to detect EL injection in my codebase?',
			answer: 'Search for expression evaluation patterns combined with user input. Look for SpelExpressionParser, ExpressionParser, StandardEvaluationContext, and any ${} or #{} syntax near request parameters. In JSP files, check for unescaped EL expressions. The pattern to flag: any path from user input (request.getParameter, @RequestParam, @PathVariable) to expression evaluation without sanitization between them.'
		}
	];

	let copied = $state(false);

	function copyPrompt() {
		const prompt = document.getElementById('ai-fix-prompt')?.textContent || '';
		navigator.clipboard.writeText(prompt);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={meta.url} />
	<meta property="og:type" content="article" />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />

	<!-- BreadcrumbList Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{"@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb"},
			{"@type": "ListItem", "position": 2, "name": "Security", "item": "https://vibeship.co/kb/security"},
			{"@type": "ListItem", "position": 3, "name": "Vulnerabilities", "item": "https://vibeship.co/kb/security/vulnerabilities"},
			{"@type": "ListItem", "position": 4, "name": "EL Injection"}
		]
	}
	</script>`}

	<!-- Schema.org structured data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": "${meta.title}",
		"description": "${meta.description}",
		"author": {
			"@type": "Organization",
			"name": "VibeShip"
		},
		"publisher": {
			"@type": "Organization",
			"name": "VibeShip",
			"logo": {
				"@type": "ImageObject",
				"url": "https://vibeship.co/logo.png"
			}
		},
		"datePublished": "2025-12-26",
		"dateModified": "2025-12-26"
	}
	</script>`}

	<!-- FAQ Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": ${JSON.stringify(faqs.map(faq => ({
			"@type": "Question",
			"name": faq.question,
			"acceptedAnswer": {
				"@type": "Answer",
				"text": faq.answer
			}
		})))}
	}
	</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<!-- Header -->
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-critical">Critical</span>
				<span class="badge">CWE-917</span>
				<span class="badge">OWASP A03:2021</span>
			</div>
			<h1>Expression Language Injection in Vibe Coded Apps</h1>
			<p class="text-secondary">How to find and fix the vulnerability that turns template variables into backdoors</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Expression Language (EL) injection happens when user input gets treated as code inside template expressions.</strong>
				Think of it like a calculator that suddenly starts running programs. Your template expects simple text, but attackers type in commands that execute on your server.
				This falls under <a href="https://owasp.org/Top10/A03_2021-Injection/">OWASP A03:2021 Injection</a> and can lead to complete server takeover.
				Vibe coded Java and Spring apps are particularly vulnerable because AI tools love generating dynamic expression patterns.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{owaspData.ranking}</div>
				<div class="stat-label">OWASP Ranking</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">RCE</div>
				<div class="stat-label">Common Impact</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Critical</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021)</a>, <a href={owaspData.cweSource}>MITRE CWE-917</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is Expression Language injection?</h2>
			<p>
				Expression Language injection is what happens when user input flows into template expressions that get evaluated as code.
				Picture a mail merge template. You type "Dear ${name}" and expect it to fill in "Dear Alice." Now imagine someone types "${7*7}" as their name, and instead of showing that text, the system calculates 49.
				That calculation capability is the vulnerability.
			</p>
			<p>
				In Java applications, Expression Languages like Spring EL, OGNL, and JSTL EL provide powerful features for accessing objects and calling methods.
				When user input reaches these expression parsers, attackers can access Java classes directly.
				One carefully crafted expression can call <code>Runtime.getRuntime().exec()</code> and run any command on your server.
			</p>
			<p>
				According to <a href="https://cwe.mitre.org/data/definitions/917.html">CWE-917</a>, this vulnerability occurs when applications use "special elements" in expression language statements without proper neutralization.
				The <a href="https://owasp.org/Top10/A03_2021-Injection/">OWASP Top 10</a> categorizes it under Injection, the same family as SQL injection.
				The difference is where the malicious code runs: SQL injection targets databases, EL injection targets your application server.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools cause EL injection?</h2>
			<p>
				AI coding tools generate EL injection vulnerabilities because dynamic templates look elegant.
				When vibe coders ask for "customizable messages" or "user-configurable templates," models produce code that evaluates user input as expressions.
				The code reads beautifully. It also creates a direct path from the browser to code execution.
			</p>

			<div class="tool-patterns-box">
				<h3>The pattern behind the problem</h3>
				<p>Ask an AI tool for dynamic template processing in Spring. This is typical output:</p>
				<div class="code-block">
					<pre><code>{`// AI-generated code that looks helpful
@GetMapping("/greeting")
public String greet(@RequestParam String template) {
    SpelExpressionParser parser = new SpelExpressionParser();
    Expression exp = parser.parseExpression(template);
    return exp.getValue(String.class);
}

// User visits: /greeting?template=Hello World
// Returns: "Hello World"

// Attacker visits: /greeting?template=T(java.lang.Runtime).getRuntime().exec('whoami')
// Returns: Server executes 'whoami' command`}</code></pre>
				</div>
				<p class="pattern-note">
					The code works exactly as requested. It also gives attackers shell access.
					The <code>template</code> parameter goes straight into the expression parser with zero filtering.
				</p>
			</div>

			<p>
				<strong>Why AI generates this:</strong> Expression languages exist to make templates powerful. AI models learn from code that demonstrates this power.
				Dynamic evaluation is the point of these APIs.
				Security restrictions make the code less flexible, so training data skews toward the vulnerable pattern.
				Vibe coders get working code that happens to be exploitable.
			</p>

			<p>
				This pattern appears in Cursor, Claude Code, GitHub Copilot, and other AI tools when working with Java, Spring, or JSP projects.
				The vulnerability is not specific to any tool. It is how AI interprets requests for dynamic template functionality.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have EL injection?</h2>
			<p>
				EL injection is one of the more severe vulnerabilities because of where expressions run. They execute in your application's context, with your application's permissions.
				Think of it as handing someone the keys to your server room.
			</p>
			<ul class="consequences-list">
				<li><strong>Remote code execution:</strong> Attackers run system commands through expression evaluation. Installing backdoors, downloading malware, pivoting to other systems. Full server compromise in a single request.</li>
				<li><strong>Data exfiltration:</strong> Expressions can read files, access environment variables, and query databases. Attackers extract secrets, credentials, and sensitive data without touching your database layer.</li>
				<li><strong>Application manipulation:</strong> Expressions can modify application state, change configurations, and alter business logic. Prices get changed, access controls get bypassed, audit logs get wiped.</li>
				<li><strong>Denial of service:</strong> Resource-intensive expressions consume CPU and memory. Infinite loops and memory exhaustion crash applications. Even failed exploitation attempts can degrade performance.</li>
				<li><strong>Lateral movement:</strong> Server access becomes a stepping stone. Attackers read SSH keys, database credentials, and API tokens. One vulnerable endpoint compromises the entire infrastructure.</li>
			</ul>
			<p>
				The jump from "template variable" to "server takeover" happens in one HTTP request. There is no warning phase. By the time logs show something unusual, the damage is done.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect EL injection?</h2>
			<p>
				Finding EL injection means tracing user input to expression evaluation.
				Any path from a request parameter to an expression parser is a potential vulnerability.
				The patterns are specific enough to search for systematically.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`// Spring Expression Language (SpEL)
SpelExpressionParser
ExpressionParser.parseExpression()
StandardEvaluationContext
@Value("#{}")  // with dynamic content

// OGNL (Object-Graph Navigation Language)
OgnlContext
Ognl.getValue()
Ognl.parseExpression()

// JSTL/JSP EL
\${userInput}  // in JSP files
<c:out value="\${param.x}"/>  // if evaluating, not escaping

// Search regex patterns:
// parseExpression\\s*\\([^)]*request
// \\$\\{[^}]*param\\.
// getValue\\s*\\([^)]*getParameter`}</code></pre>
			</div>

			<p>
				In Spring applications, pay close attention to <code>@Value</code> annotations that incorporate external input.
				In JSP files, look for EL expressions that include request parameters.
				The vulnerability exists wherever the path from user input to expression evaluation lacks sanitization.
			</p>

			<div class="cta-box">
				<p><strong>Want automated detection?</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your code free
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How do I fix EL injection?</h2>
			<p>
				Fixing EL injection comes down to one principle: user input should never be evaluated as an expression.
				The input can populate variables that expressions reference, but the expression structure itself must be static.
				Think of it as the difference between "fill in the blank" and "rewrite the sentence."
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>This prompt guides AI tools to find and fix EL injection patterns. Copy it into Cursor, Claude Code, or your preferred AI assistant:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all Expression Language injection vulnerabilities in my codebase.

## What to look for

Search for these dangerous patterns:

1. User input in SpEL expressions:
   - SpelExpressionParser.parseExpression(userInput)
   - parser.parseExpression(request.getParameter("x"))
   - @Value with dynamic content from external sources

2. User input in OGNL expressions:
   - Ognl.getValue(userInput, context)
   - Ognl.parseExpression(userControlled)

3. Unsafe JSP EL usage:
   - \${param.anything} used in script contexts
   - Dynamic EL construction from request data

4. Template engines with user-controlled templates:
   - Freemarker templates from user input
   - Thymeleaf expressions from request parameters

## How to fix

Replace dynamic expression evaluation with parameterized approaches:

### For Spring SpEL:
\`\`\`java
// Before (vulnerable)
String template = request.getParameter("template");
Expression exp = parser.parseExpression(template);
return exp.getValue(context, String.class);

// After (secure) - Use static expressions with variable context
StandardEvaluationContext context = new StandardEvaluationContext();
context.setVariable("userValue", request.getParameter("value"));
Expression exp = parser.parseExpression("#userValue");  // Static expression
return exp.getValue(context, String.class);
\`\`\`

### For OGNL:
\`\`\`java
// Before (vulnerable)
Object result = Ognl.getValue(userInput, context, root);

// After (secure) - Avoid OGNL with user input entirely
// Use direct property access or a safe templating approach
String result = root.getProperty(sanitizedPropertyName);
\`\`\`

### For JSP:
\`\`\`jsp
<!-- Before (vulnerable) -->
<p>\${param.message}</p>

<!-- After (secure) - Escape output -->
<p><c:out value="\${param.message}" escapeXml="true"/></p>
\`\`\`

## Framework-specific notes

- Spring Boot: Audit all @Value annotations with SpEL (\#{})
- Struts: Review OGNL usage in action configurations
- JSP/JSTL: Use <c:out> with escapeXml for all user data
- Thymeleaf: Prefer th:text over th:utext for user content

## After fixing

1. Search for remaining expression evaluation patterns
2. Add input validation as defense in depth
3. Consider disabling dangerous EL features in configuration
4. List all files modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix</h3>
				<p>The core fix separates user data from expression structure. Expressions remain static while user input populates variables:</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// User controls the entire expression - DANGEROUS
@GetMapping("/calculate")
public String calculate(@RequestParam String expression) {
    SpelExpressionParser parser = new SpelExpressionParser();
    Expression exp = parser.parseExpression(expression);
    return exp.getValue(String.class);
}

// Attacker input: T(java.lang.Runtime).getRuntime().exec('rm -rf /')
// Result: Server executes destructive command`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// Static expression, user only provides data - SAFE
@GetMapping("/calculate")
public String calculate(@RequestParam Integer a, @RequestParam Integer b) {
    SpelExpressionParser parser = new SpelExpressionParser();
    StandardEvaluationContext context = new StandardEvaluationContext();

    // User input goes into variables, not the expression
    context.setVariable("a", a);
    context.setVariable("b", b);

    // Expression structure is fixed at compile time
    Expression exp = parser.parseExpression("#a + #b");
    return exp.getValue(context, String.class);
}

// Attacker cannot inject expression syntax
// They can only provide values for predefined variables`}</code></pre>
					</div>
				</div>

				<p>
					<strong>What changed:</strong> The expression structure is now hardcoded. User input populates typed variables, not the expression itself.
					Even if an attacker provides malicious content, it gets treated as data, not code.
					The expression parser sees <code>#a + #b</code> every time. It never sees user input as executable syntax.
				</p>
			</div>

			<!-- Additional Defenses -->
			<div class="fix-section">
				<h3>Additional defenses</h3>
				<p>Beyond fixing individual instances, these configurations reduce EL injection risk across the application:</p>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Spring Security Configuration</span>
					</div>
					<pre><code>{`// Restrict SpEL capabilities in Spring Boot
@Configuration
public class SpelSecurityConfig {

    @Bean
    public SpelExpressionParser restrictedParser() {
        SpelParserConfiguration config = new SpelParserConfiguration(
            SpelCompilerMode.OFF,  // Disable compilation for security
            null
        );
        return new SpelExpressionParser(config);
    }

    // Create evaluation context with limited functionality
    public StandardEvaluationContext safeContext() {
        StandardEvaluationContext context = new StandardEvaluationContext();
        // Remove access to dangerous methods
        context.setTypeLocator(typeName -> {
            throw new SpelEvaluationException("Type access disabled");
        });
        return context;
    }
}`}</code></pre>
				</div>

				<p>
					These restrictions limit what expressions can do even if injection occurs.
					Disabling type access prevents <code>T(java.lang.Runtime)</code> attacks.
					Defense in depth means vulnerabilities cause less damage.
				</p>
			</div>
		</section>

		<!-- FAQ -->
		<section class="article-section">
			<h2>Frequently asked questions</h2>

			<div class="faq-list">
				{#each faqs as faq}
					<div class="faq-item">
						<h3>{faq.question}</h3>
						<p>{faq.answer}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Related -->
		<section class="article-section">
			<h2>Related content</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/ssti/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Server-Side Template Injection (SSTI)</div>
					<p class="related-card-description">The broader category of template injection attacks</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">Similar injection pattern targeting databases</p>
				</a>
				<a href="/kb/security/vulnerabilities/command-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Command Injection</div>
					<p class="related-card-description">Direct OS command execution through user input</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find these before an attacker does</h2>
			<p>Expression injection turns template features into backdoors. Scan your vibe coded apps for this and other critical vulnerabilities.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan your code now
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>
	</article>
</div>

<style>
	/* Badge row */
	.badge-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	/* Data Source Attribution */
	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* Tool Patterns Box */
	.tool-patterns-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.tool-patterns-box h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
	}

	.tool-patterns-box > p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
	}

	.pattern-note {
		margin: 1rem 0 0 !important;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.pattern-note code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Consequences List */
	.consequences-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.consequences-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.consequences-list li:last-child {
		border-bottom: none;
	}

	.consequences-list strong {
		color: var(--text-primary);
	}

	/* Fix Sections */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	/* Code Comparison */
	.code-comparison {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-block.vulnerable .code-block-header {
		border-left: 3px solid var(--red);
	}

	.code-block.secure .code-block-header {
		border-left: 3px solid var(--green);
	}

	.status-bad {
		color: var(--red);
	}

	.status-good {
		color: var(--green);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.stats-row {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
