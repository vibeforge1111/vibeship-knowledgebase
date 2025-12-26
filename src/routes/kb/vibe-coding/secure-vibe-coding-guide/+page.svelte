<script lang="ts">
	import { onMount } from 'svelte';
	import { Header } from '$lib/components/layout';

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Vibe Coding', href: '/kb/vibe-coding' },
		{ label: 'Secure Vibe Coding Guide' }
	];

	// Copy button functionality
	let copiedRules = $state(false);
	let copiedReview = $state(false);

	function copyToClipboard(text: string, type: 'rules' | 'review') {
		navigator.clipboard.writeText(text);
		if (type === 'rules') {
			copiedRules = true;
			setTimeout(() => copiedRules = false, 2000);
		} else {
			copiedReview = true;
			setTimeout(() => copiedReview = false, 2000);
		}
	}

	const faqs = [
		{
			question: 'Is vibe coding safe?',
			answer:
				'Vibe coding can be safe if you follow security practices. Research shows AI-generated code frequently contains vulnerabilities - <a href="https://www.veracode.com/blog/genai-code-security-report/">Veracode (2025)</a> found 45% failed security tests, <a href="https://arxiv.org/abs/2211.03622">Pearce et al.</a> found 40% contained flaws. These rates can be dramatically reduced with secure prompting, rules files, and code review. The key is treating AI as an assistant, not a replacement for security awareness.'
		},
		{
			question: "What's the biggest security risk with AI coding tools?",
			answer:
				'<a href="/kb/security/vulnerabilities/hardcoded-secrets/">Hardcoded secrets</a> and <a href="/kb/security/vulnerabilities/missing-auth/">missing authentication</a> are the most common issues. AI tools generate functional code quickly, but they don\'t automatically add authentication checks or secure secret management unless you explicitly request it.'
		},
		{
			question: 'Do I need to be a security expert to vibe code safely?',
			answer:
				"No, but you need to follow a checklist. This guide provides everything you need: secure prompts, rules files, and review checklists. Use them consistently and you'll catch most issues. Security expertise helps, but systematic processes matter more."
		},
		{
			question: 'Should I use Cursor rules for security?',
			answer:
				'Yes, absolutely. Rules files provide persistent security context so you don\'t have to repeat security requirements in every prompt. They act like a security-focused senior developer reviewing every AI suggestion. See <a href="/kb/vibe-coding-tools/cursor/">Cursor Security Patterns</a> for specific guidance.'
		},
		{
			question: 'How do I review AI-generated code for security?',
			answer:
				'Use the 5-minute security review checklist in this guide. Check for authentication, input validation, secrets exposure, and error handling. Then run automated tools like Semgrep and Gitleaks for additional coverage. Consider using our <a href="https://scanner.vibeship.co">vibeship scanner</a> for comprehensive analysis.'
		},
		{
			question: 'What percentage of AI-generated code has vulnerabilities?',
			answer:
				'Studies show significant vulnerability rates in AI-generated code. <a href="https://www.veracode.com/blog/genai-code-security-report/">Veracode\'s 2025 testing</a> found 45% of samples failed security tests. <a href="https://dl.acm.org/doi/10.1145/3610721">Pearce et al.</a> found 40% of Copilot programs contained vulnerabilities. This is why review and scanning are essential.'
		},
		{
			question: 'Are there free security tools for vibe coding?',
			answer:
				'Yes! <a href="https://gitleaks.io/">Gitleaks</a> (secrets), <a href="https://semgrep.dev/">Semgrep</a> (SAST), npm audit (dependencies), and ESLint security plugin are all free and effective. Start with these before considering paid tools. Our <a href="https://scanner.vibeship.co">vibeship scanner</a> also offers a free tier.'
		},
		{
			question: 'How do I write secure prompts for AI coding?',
			answer:
				'Include explicit security requirements in every prompt. Use the formula: WHAT (function) + HOW (approach) + SECURE (requirements) + AVOID (CWEs). The more specific you are about security, the better the output. Research shows enhanced prompts can reduce vulnerabilities by up to 56%.'
		}
	];

	// Security rules content for copying
	const securityRulesContent = `# Security Rules for AI Code Generation

## CRITICAL: Never Do These
- NEVER hardcode API keys, passwords, secrets, or credentials
- NEVER use eval(), exec(), or Function() with user input
- NEVER build SQL queries with string concatenation
- NEVER trust client-side validation alone
- NEVER expose stack traces or detailed errors to users
- NEVER use \`origin: '*'\` with credentials in CORS
- NEVER store passwords in plain text

## ALWAYS Do These
- ALWAYS use parameterized queries for database access
- ALWAYS validate and sanitize ALL user input on the server
- ALWAYS use environment variables for secrets
- ALWAYS check authentication before protected operations
- ALWAYS verify the user owns the resource (authorization)
- ALWAYS use HTTPS in production
- ALWAYS set secure, httpOnly, sameSite flags on cookies
- ALWAYS return generic error messages to clients
- ALWAYS escape output based on context (HTML, SQL, shell)

## Framework-Specific Rules

### Next.js
- Use Server Actions or API routes for sensitive operations
- Never expose NEXT_PUBLIC_ variables containing secrets
- Use middleware for authentication checks
- Validate Server Action inputs with Zod

### Express
- Use helmet() for security headers
- Use express-rate-limit for rate limiting
- Use express-validator for input validation
- Never use res.send(error.message) in production

### Supabase
- ALWAYS enable RLS on tables with user data
- Use getUser() not getSession() on the server
- Never expose service_role key to client
- Create policies for SELECT, INSERT, UPDATE, DELETE

### Database
- Use ORM (Prisma, Drizzle) or parameterized queries
- Never use $queryRaw or raw SQL with user input
- Apply principle of least privilege to database users
- Encrypt sensitive fields at rest

## When Generating Code
1. Assume all user input is malicious
2. Fail securely (deny by default)
3. Log security events (failed auth, validation errors)
4. Consider the OWASP Top 10 for every feature`;

	const aiReviewPrompt = `Review this code for security vulnerabilities. Check for:

1. **Injection flaws**: SQL injection, command injection, XSS
2. **Authentication issues**: Missing auth checks, weak session handling
3. **Authorization issues**: IDOR, missing ownership verification
4. **Data exposure**: Hardcoded secrets, verbose errors, excessive data in responses
5. **Configuration issues**: Insecure CORS, missing security headers

For each issue found:
- Describe the vulnerability
- Show the vulnerable code
- Explain the attack scenario
- Provide the fixed code

Code to review:
[PASTE CODE HERE]`;

	// Schema.org structured data
	let schemaData: object;

	onMount(() => {
		schemaData = {
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'TechArticle',
					headline: 'The Complete Secure Vibe Coding Guide: Ship Fast Without Getting Hacked',
					description:
						'45% of AI-generated code fails security tests (Veracode 2025). Learn secure prompting, rules files, and code review to vibe code safely with Cursor, Copilot, and Claude Code.',
					author: {
						'@type': 'Organization',
						name: 'vibeship',
						url: 'https://vibeship.co'
					},
					publisher: {
						'@type': 'Organization',
						name: 'vibeship',
						url: 'https://vibeship.co'
					},
					datePublished: '2025-12-17',
					dateModified: '2025-12-17',
					mainEntityOfPage: {
						'@type': 'WebPage',
						'@id': 'https://vibeship.co/kb/vibe-coding/secure-vibe-coding-guide/'
					},
					about: [
						{ '@type': 'Thing', name: 'Vibe Coding Security' },
						{ '@type': 'Thing', name: 'AI Code Security' }
					],
					keywords:
						'vibe coding security, secure vibe coding, AI code security, cursor security, copilot security, AI generated code vulnerabilities, secure AI coding'
				},
				{
					'@type': 'FAQPage',
					mainEntity: faqs.map((faq) => ({
						'@type': 'Question',
						name: faq.question,
						acceptedAnswer: {
							'@type': 'Answer',
							text: faq.answer.replace(/<[^>]*>/g, '')
						}
					}))
				},
				{
					'@type': 'BreadcrumbList',
					itemListElement: [
						{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vibeship.co' },
						{ '@type': 'ListItem', position: 2, name: 'Knowledge Base', item: 'https://vibeship.co/kb/' },
						{ '@type': 'ListItem', position: 3, name: 'Vibe Coding', item: 'https://vibeship.co/kb/vibe-coding/' },
						{ '@type': 'ListItem', position: 4, name: 'Secure Vibe Coding Guide', item: 'https://vibeship.co/kb/vibe-coding/secure-vibe-coding-guide/' }
					]
				},
				{
					'@type': 'HowTo',
					name: 'How to Vibe Code Securely',
					step: [
						{ '@type': 'HowToStep', name: 'Use Secure Prompts', text: 'Include explicit security requirements in every prompt using the WHAT + HOW + SECURE + AVOID formula.' },
						{ '@type': 'HowToStep', name: 'Set Up Security Rules', text: 'Install security rules files in Cursor, Copilot, or Claude Code to provide persistent security context.' },
						{ '@type': 'HowToStep', name: 'Review Generated Code', text: 'Use the 5-minute security review checklist to verify AI-generated code before committing.' },
						{ '@type': 'HowToStep', name: 'Run Security Scanners', text: 'Use Gitleaks, Semgrep, and npm audit to catch vulnerabilities automatically.' },
						{ '@type': 'HowToStep', name: 'Deploy Securely', text: 'Follow the pre-deployment checklist to ensure security survives the trip to production.' }
					]
				}
			]
		};
	});
</script>

<svelte:head>
	<title>Secure Vibe Coding Guide | VibeShip</title>
	<meta name="description" content="45% of AI-generated code fails security tests (Veracode 2025). Learn secure prompting, rules files, and code review to vibe code safely with Cursor, Copilot, and Claude Code." />
	<meta name="keywords" content="vibe coding security, secure vibe coding, AI code security, cursor security, copilot security, AI generated code vulnerabilities, secure AI coding prompts" />
	<link rel="canonical" href="https://vibeship.co/kb/vibe-coding/secure-vibe-coding-guide/" />

	<meta property="og:title" content="The Complete Secure Vibe Coding Guide: Ship Fast Without Getting Hacked" />
	<meta property="og:description" content="45% of AI-generated code fails security tests. Learn secure prompting, rules files, and code review to vibe code safely." />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://vibeship.co/kb/vibe-coding/secure-vibe-coding-guide/" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="The Complete Secure Vibe Coding Guide: Ship Fast Without Getting Hacked" />
	<meta name="twitter:description" content="45% of AI-generated code fails security tests. Learn secure prompting, rules files, and code review." />

	{#if schemaData}
		{@html `<script type="application/ld+json">${JSON.stringify(schemaData)}</script>`}
	{/if}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<!-- Header -->
		<header class="article-header">
			<h1>The Complete Secure Vibe Coding Guide: Ship Fast Without Getting Hacked</h1>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>45% of AI-generated code fails security tests.</strong> To vibe code safely:
				1) Use secure prompts with explicit security requirements, 2) Set up security rules files in your
				AI tool, 3) Review code with the 5-minute checklist, 4) Run automated scanners.
			</p>
		</div>

		<!-- TOC -->
		<nav class="toc-box">
			<h2>Table of Contents</h2>
			<ol>
				<li><a href="#problem">The Vibe Coding Security Problem</a></li>
				<li><a href="#prompting">Secure Prompting</a></li>
				<li><a href="#rules">Security Rules Files</a></li>
				<li><a href="#review">Code Review & Scanning</a></li>
				<li><a href="#deployment">Secure Deployment</a></li>
				<li><a href="#tools">Tool-Specific Guides</a></li>
				<li><a href="#vulnerabilities">Vulnerability Quick Reference</a></li>
				<li><a href="#faq">FAQ</a></li>
			</ol>
		</nav>

		<!-- SECTION 1: The Problem -->
		<section id="problem" class="article-section">
			<h2>The Vibe Coding Security Problem</h2>

			<h3>Why AI Code Isn't Secure by Default</h3>
			<p>
				AI coding tools have transformed how we build software. But there's a problem: <strong>45% of AI-generated code fails security tests</strong>
				according to <a href="https://www.veracode.com/blog/genai-code-security-report/">Veracode's 2025 analysis</a> of 100+ LLMs across 80 tasks.
				For Java specifically, 72% of generated code contained vulnerabilities.
			</p>
			<p>
				This isn't an isolated finding. <a href="https://dl.acm.org/doi/10.1145/3610721">Pearce et al.'s research</a> (ACM CCS 2023) found that 40% of 1,689 programs
				generated by Copilot contained security vulnerabilities. <a href="https://dl.acm.org/doi/abs/10.1145/3576915.3623157">Stanford researchers</a> discovered
				that developers using AI assistants write significantly MORE insecure code than those without - and are more likely to believe their code is secure.
			</p>
			<p>
				Why does this happen? AI optimizes for "code that works," not "code that's secure." Training data includes millions of Stack Overflow answers and GitHub repos - much of it containing vulnerabilities.
				AI doesn't distinguish between trusted internal data and untrusted user input. When you ask for a login form, you get a login form. Authentication, rate limiting, and secure error handling? Only if you ask for them.
			</p>

			<h3>The Five Security Sins of AI Code</h3>
			<p>These vulnerabilities appear consistently across all AI coding tools:</p>
			<ol class="security-sins-list">
				<li><strong><a href="/kb/security/vulnerabilities/hardcoded-secrets/">Hardcoded Secrets</a></strong> - API keys, passwords, and tokens directly in code. AI generates example values that get committed.</li>
				<li><strong><a href="/kb/security/vulnerabilities/missing-auth/">Missing Authentication</a></strong> - Routes and endpoints that work but have no auth checks. "Create an API" doesn't imply "protect it."</li>
				<li><strong>Injection Vulnerabilities (<a href="/kb/security/vulnerabilities/sql-injection/">SQL</a>, <a href="/kb/security/vulnerabilities/command-injection/">Command</a>)</strong> - User input concatenated directly into queries and commands.</li>
				<li><strong>Excessive Permissions</strong> - <code>origin: '*'</code> in CORS, admin access by default, overly permissive policies.</li>
				<li><strong>Trusting the Client</strong> - Validation only on the frontend, no server-side checks, assuming input is safe.</li>
			</ol>

			<h3>You're Still the Developer</h3>
			<p>
				The <a href="https://best.openssf.org/Security-Focused-Guide-for-AI-Code-Assistant-Instructions">OpenSSF Security Guide</a> puts it simply:
				"AI is the assistant, you're the developer." Every line of code that ships is your responsibility - whether you wrote it or AI generated it.
				AI doesn't replace security knowledge; it increases the need for it.
			</p>
			<p>
				The good news: you don't need to become a security expert. You need to follow a systematic process. This guide gives you that process.
			</p>
		</section>

		<!-- SECTION 2: Secure Prompting -->
		<section id="prompting" class="article-section">
			<h2>Secure Prompting (Shift Left)</h2>

			<h3>Why Prompts Matter for Security</h3>
			<p>
				Your prompt is more than a request - it's a design artifact. It defines requirements, technical approach, and constraints. If you don't mention security, AI won't add it.
				Research shows that enhanced security prompts can <a href="https://arxiv.org/html/2504.20612v1">reduce vulnerabilities by up to 56%</a>.
			</p>
			<p>
				The Stanford user study found that developers who prompted more carefully produced fewer vulnerabilities. This is your first line of defense: get secure code from the start.
			</p>

			<h3>The Secure Prompt Formula</h3>
			<p>Structure every significant prompt with these four components:</p>

			<div class="formula-box">
				<div class="formula-item"><span class="formula-label">WHAT</span><span class="formula-desc">Functional requirement - what the code should do</span></div>
				<div class="formula-item"><span class="formula-label">HOW</span><span class="formula-desc">Technical approach - frameworks, patterns to use</span></div>
				<div class="formula-item"><span class="formula-label">SECURE</span><span class="formula-desc">Security requirements - explicit protections needed</span></div>
				<div class="formula-item"><span class="formula-label">AVOID</span><span class="formula-desc">CWEs and patterns to prevent</span></div>
			</div>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-block-header"><span class="code-block-lang status-bad">INSECURE PROMPT</span></div>
					<pre><code>Create a login form that checks the database for the user</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-block-header"><span class="code-block-lang status-good">SECURE PROMPT</span></div>
					<pre><code>Create a secure login form for a Next.js app with these requirements:

FUNCTIONAL:
- Accept email and password
- Check against PostgreSQL database
- Return JWT token on success

SECURITY:
- Use bcrypt for password comparison (never store plain passwords)
- Parameterized queries only (prevent SQL injection)
- Rate limit to 5 attempts per minute per IP
- Generic error messages ("Invalid credentials" not "User not found")
- Set secure, httpOnly, sameSite cookies

AVOID: CWE-89 (SQL injection), CWE-307 (brute force), CWE-209 (info disclosure)</code></pre>
				</div>
			</div>

			<h3>Security Phrases to Include in Every Prompt</h3>
			<p>These phrases trigger secure patterns in AI output:</p>
			<ul class="security-phrases-grid">
				<li>"Use parameterized queries"</li>
				<li>"Validate and sanitize all input"</li>
				<li>"Use environment variables for secrets"</li>
				<li>"Add authentication check"</li>
				<li>"Verify user owns this resource"</li>
				<li>"Return generic error messages"</li>
				<li>"Use HTTPS only"</li>
				<li>"Set secure cookie flags"</li>
				<li>"Add rate limiting"</li>
				<li>"Escape output for [HTML/SQL/shell]"</li>
			</ul>

			<h3>Tool-Specific Secure Prompting</h3>
			<ul>
				<li><strong><a href="/kb/vibe-coding-tools/cursor/">Cursor</a>:</strong> Use .cursorrules for persistent security context across all sessions</li>
				<li><strong><a href="/kb/vibe-coding-tools/github-copilot/">Copilot</a>:</strong> Add security comments before code blocks to guide generation</li>
				<li><strong><a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>:</strong> CLAUDE.md can include project-wide security rules</li>
				<li><strong><a href="/kb/vibe-coding-tools/bolt/">Bolt</a>:</strong> Add "with security" to every generation request</li>
			</ul>
		</section>

		<!-- SECTION 3: Security Rules Files -->
		<section id="rules" class="article-section">
			<h2>Security Rules Files (Automated Guardrails)</h2>

			<h3>What Are Rules Files?</h3>
			<p>
				Rules files are configuration that tells AI how to behave. They persist across sessions, providing consistent security context without repeating requirements in every prompt.
				Think of them as a security-focused senior developer reviewing every suggestion.
			</p>
			<p>
				The <a href="https://cloudsecurityalliance.org/blog/2025/05/06/secure-vibe-coding-level-up-with-cursor-rules-and-the-r-a-i-l-g-u-a-r-d-framework">Cloud Security Alliance</a>
				and <a href="https://www.wiz.io/blog/safer-vibe-coding-rules-files">Wiz</a> both recommend rules files as a critical security control for vibe coding.
			</p>

			<h3>The vibeship Security Rules (Copy-Paste Ready)</h3>
			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span class="fix-prompt-label">vibeship security rules for AI Tools</span>
					<button class="copy-btn" class:copied={copiedRules} onclick={() => copyToClipboard(securityRulesContent, 'rules')}>
						{copiedRules ? 'Copied!' : 'Copy Rules'}
					</button>
				</div>
				<div class="fix-prompt-content">{securityRulesContent}</div>
			</div>

			<h3>Installing Security Rules</h3>
			<div class="install-list">
				<div class="install-item">
					<h4>Cursor</h4>
					<div class="code-block">
						<pre><code># Create .cursor/rules/security.mdc in project root
mkdir -p .cursor/rules
# Paste the rules above into security.mdc</code></pre>
					</div>
				</div>
				<div class="install-item">
					<h4>Claude Code</h4>
					<div class="code-block">
						<pre><code># Add to CLAUDE.md in project root
# Create the file and paste security rules section</code></pre>
					</div>
				</div>
				<div class="install-item">
					<h4>GitHub Copilot</h4>
					<div class="code-block">
						<pre><code># Create .github/copilot-instructions.md
# Paste security rules</code></pre>
					</div>
				</div>
				<div class="install-item">
					<h4>Windsurf</h4>
					<div class="code-block">
						<pre><code># Create .windsurfrules in project root</code></pre>
					</div>
				</div>
			</div>

			<div class="warning-box">
				<strong>Warning:</strong> Rules files can be compromised. <a href="/kb/vibe-coding-tools/windsurf/">Research has shown</a> hidden Unicode characters can inject malicious instructions.
				Always review rules files from external sources, store them in version control, and don't auto-run commands from untrusted rules.
			</div>
		</section>

		<!-- SECTION 4: Code Review & Scanning -->
		<section id="review" class="article-section">
			<h2>Code Review & Scanning (Catch What Slipped Through)</h2>

			<h3>Why Review Matters More with AI Code</h3>
			<p>
				AI generates code faster than humans can review. Volume increases but review time stays the same.
				The key insight: AI makes consistent mistakes. Once you know the patterns, you know what to look for.
			</p>

			<h3>The 5-Minute Security Review</h3>
			<p>Run through this checklist for every AI-generated file:</p>

			<div class="checklist-box">
				<h4>Authentication & Authorization</h4>
				<ul>
					<li>Is there an auth check before sensitive operations?</li>
					<li>Does it verify the user owns the resource (<a href="/kb/security/vulnerabilities/idor/">IDOR prevention</a>)?</li>
					<li>Are routes protected that should be?</li>
				</ul>

				<h4>Input Handling</h4>
				<ul>
					<li>Is all user input validated on the server?</li>
					<li>Are database queries parameterized (<a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a>)?</li>
					<li>Is output escaped for its context (<a href="/kb/security/vulnerabilities/xss/">XSS</a>)?</li>
				</ul>

				<h4>Secrets & Config</h4>
				<ul>
					<li>Are there any <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded keys/passwords</a>?</li>
					<li>Are secrets loaded from environment variables?</li>
					<li>Is .env in .gitignore?</li>
				</ul>

				<h4>Error Handling</h4>
				<ul>
					<li>Are errors logged server-side?</li>
					<li>Are error messages generic to clients (<a href="/kb/security/vulnerabilities/sensitive-data-exposure/">no stack traces</a>)?</li>
				</ul>
			</div>

			<h3>Quick Security Grep Commands</h3>
			<div class="code-block">
				<pre><code># Find potential hardcoded secrets
grep -r "api_key\|apikey\|secret\|password" --include="*.ts" --include="*.js"

# Find potential SQL injection
grep -r "\`SELECT\|'SELECT" --include="*.ts" --include="*.js"

# Find dangerous functions
grep -r "eval\|exec\|Function(" --include="*.ts" --include="*.js"

# Find console.log (remove before production)
grep -r "console.log" --include="*.ts" --include="*.js"</code></pre>
			</div>

			<h3>Automated Security Scanning</h3>
			<p>Free tools that catch what manual review misses:</p>

			<div class="tools-table-wrapper">
				<table class="tools-table">
					<thead>
						<tr>
							<th>Tool</th>
							<th>What It Catches</th>
							<th>Integration</th>
						</tr>
					</thead>
					<tbody>
						<tr><td><a href="https://gitleaks.io/">Gitleaks</a></td><td>Hardcoded secrets</td><td>Pre-commit, CI</td></tr>
						<tr><td><a href="https://semgrep.dev/">Semgrep</a></td><td>OWASP Top 10, custom rules</td><td>IDE, CI</td></tr>
						<tr><td>npm audit</td><td>Vulnerable dependencies</td><td>CLI, CI</td></tr>
						<tr><td>ESLint security</td><td>JS/TS security issues</td><td>IDE, CI</td></tr>
						<tr><td><a href="https://trivy.dev/">Trivy</a></td><td>Container/dependency vulns</td><td>CI</td></tr>
					</tbody>
				</table>
			</div>

			<h3>Setup Commands</h3>
			<div class="code-block">
				<pre><code># Gitleaks (secrets)
brew install gitleaks  # or download from GitHub
gitleaks detect --source .

# Semgrep (SAST)
pip install semgrep
semgrep --config=p/owasp-top-ten .

# npm audit (dependencies)
npm audit

# ESLint security
npm install eslint-plugin-security --save-dev</code></pre>
			</div>

			<h3>The AI Security Review Prompt</h3>
			<p>Use this with Claude, ChatGPT, or your AI tool for a second opinion:</p>
			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span class="fix-prompt-label">AI Security Review Prompt</span>
					<button class="copy-btn" class:copied={copiedReview} onclick={() => copyToClipboard(aiReviewPrompt, 'review')}>
						{copiedReview ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<div class="fix-prompt-content">{aiReviewPrompt}</div>
			</div>

			<div class="cta-box">
				<p><strong>Automate Your Security Reviews:</strong> vibeship scanner automatically analyzes AI-generated code for vulnerabilities and provides fix suggestions.</p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Try vibeship scanner
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- SECTION 5: Secure Deployment -->
		<section id="deployment" class="article-section">
			<h2>Secure Deployment (Don't Undo Your Work)</h2>

			<h3>Pre-Deployment Checklist</h3>
			<p>Before shipping your vibe coded app, verify these items. Use our <a href="/kb/security/checklists/pre-launch/">complete pre-launch checklist</a> for the full list.</p>

			<div class="checklist-box">
				<h4>Environment & Secrets</h4>
				<ul>
					<li>All secrets in environment variables (not code)</li>
					<li>.env files in .gitignore</li>
					<li>Different secrets for dev/staging/production</li>
					<li>Service keys restricted to server-side only</li>
				</ul>

				<h4>Authentication</h4>
				<ul>
					<li>Auth required on all protected routes</li>
					<li>Session/token expiration configured</li>
					<li>Password reset flow secure</li>
					<li>MFA available for admin accounts</li>
				</ul>

				<h4>Database</h4>
				<ul>
					<li>RLS enabled (if using <a href="/kb/security/stacks/nextjs-supabase/">Supabase</a>)</li>
					<li>Database user has minimum required permissions</li>
					<li>Connection strings not exposed</li>
					<li>Backups configured and tested</li>
				</ul>

				<h4>Network</h4>
				<ul>
					<li>HTTPS enforced (redirect HTTP)</li>
					<li>Security headers configured (CSP, HSTS)</li>
					<li>CORS configured for specific origins (not *)</li>
					<li>Rate limiting on public endpoints</li>
				</ul>
			</div>

			<h3>Security Headers Setup</h3>
			<div class="code-block">
				<pre><code>{`// next.config.js
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' }
]

module.exports = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}`}</code></pre>
			</div>

			<h3>Post-Deployment Monitoring</h3>
			<ul>
				<li>Set up error tracking (Sentry, LogRocket)</li>
				<li>Monitor for leaked secrets (<a href="https://www.gitguardian.com/state-of-secrets-sprawl-report-2025">GitGuardian</a>)</li>
				<li>Regular dependency updates</li>
				<li>Security scan in CI/CD pipeline</li>
				<li>Periodic penetration testing for critical apps</li>
			</ul>
		</section>

		<!-- SECTION 6: Tool-Specific Guides -->
		<section id="tools" class="article-section">
			<h2>Tool-Specific Security Guides</h2>
			<p>Each AI coding tool has unique patterns and vulnerabilities. Our detailed guides cover specific risks and mitigations:</p>

			<div class="related-grid">
				<a href="/kb/vibe-coding-tools/cursor/" class="card">
					<h3>Cursor</h3>
					<p>VS Code fork with GPT-4/Claude. Common issues: template literals for SQL, missing auth in API routes.</p>
				</a>
				<a href="/kb/vibe-coding-tools/github-copilot/" class="card">
					<h3>GitHub Copilot</h3>
					<p>Most popular AI tool. CVEs for path traversal. Common issues: SQL concatenation, weak random generation.</p>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code/" class="card">
					<h3>Claude Code</h3>
					<p>Anthropic's official agent. More security-conscious but not immune. Missing input validation, verbose errors.</p>
				</a>
				<a href="/kb/vibe-coding-tools/bolt/" class="card">
					<h3>Bolt.new</h3>
					<p>StackBlitz's rapid prototyping tool. "Ready to run" philosophy means security often skipped.</p>
				</a>
				<a href="/kb/vibe-coding-tools/v0/" class="card">
					<h3>v0 (Vercel)</h3>
					<p>AI UI generation. Common issue: NEXT_PUBLIC_ secret exposure. Missing server-side validation.</p>
				</a>
				<a href="/kb/vibe-coding-tools/replit/" class="card">
					<h3>Replit Agent</h3>
					<p>Browser-based development. July 2025: agent deleted production database. Now has Semgrep integration.</p>
				</a>
				<a href="/kb/vibe-coding-tools/windsurf/" class="card">
					<h3>Windsurf</h3>
					<p>Codeium's IDE with Cascade agent. CVE-2025-62353 for path traversal. Prompt injection can exfiltrate .env files.</p>
				</a>
			</div>
		</section>

		<!-- SECTION 7: Vulnerability Quick Reference -->
		<section id="vulnerabilities" class="article-section">
			<h2>Vulnerability Quick Reference</h2>
			<p>Every vulnerability AI tools commonly generate, with severity and fix guides. Bookmark this table.</p>

			<div class="tools-table-wrapper">
				<table class="tools-table vuln-table">
					<thead>
						<tr>
							<th>Vulnerability</th>
							<th>Severity</th>
							<th>What Happens</th>
							<th>Guide</th>
						</tr>
					</thead>
					<tbody>
						<tr><td>SQL Injection</td><td><span class="badge badge-critical">Critical</span></td><td>Attackers steal your database</td><td><a href="/kb/security/vulnerabilities/sql-injection/">Fix</a></td></tr>
						<tr><td>Hardcoded Secrets</td><td><span class="badge badge-critical">Critical</span></td><td>API keys exposed in code</td><td><a href="/kb/security/vulnerabilities/hardcoded-secrets/">Fix</a></td></tr>
						<tr><td>Missing Auth</td><td><span class="badge badge-critical">Critical</span></td><td>Anyone can access protected data</td><td><a href="/kb/security/vulnerabilities/missing-auth/">Fix</a></td></tr>
						<tr><td>Command Injection</td><td><span class="badge badge-critical">Critical</span></td><td>Attackers run system commands</td><td><a href="/kb/security/vulnerabilities/command-injection/">Fix</a></td></tr>
						<tr><td>Insecure Deserialization</td><td><span class="badge badge-critical">Critical</span></td><td>Remote code execution</td><td><a href="/kb/security/vulnerabilities/insecure-deserialization/">Fix</a></td></tr>
						<tr><td>XSS</td><td><span class="badge badge-high">High</span></td><td>Attackers run scripts on users</td><td><a href="/kb/security/vulnerabilities/xss/">Fix</a></td></tr>
						<tr><td>IDOR</td><td><span class="badge badge-high">High</span></td><td>Users access each other's data</td><td><a href="/kb/security/vulnerabilities/idor/">Fix</a></td></tr>
						<tr><td>CSRF</td><td><span class="badge badge-high">High</span></td><td>Attackers trick users into actions</td><td><a href="/kb/security/vulnerabilities/csrf/">Fix</a></td></tr>
						<tr><td>SSRF</td><td><span class="badge badge-high">High</span></td><td>Server fetches malicious URLs</td><td><a href="/kb/security/vulnerabilities/ssrf/">Fix</a></td></tr>
						<tr><td>Path Traversal</td><td><span class="badge badge-high">High</span></td><td>Attackers access system files</td><td><a href="/kb/security/vulnerabilities/path-traversal/">Fix</a></td></tr>
						<tr><td>Sensitive Data Exposure</td><td><span class="badge badge-high">High</span></td><td>Stack traces leak to users</td><td><a href="/kb/security/vulnerabilities/sensitive-data-exposure/">Fix</a></td></tr>
						<tr><td>JWT Vulnerabilities</td><td><span class="badge badge-high">High</span></td><td>Token bypass/forgery</td><td><a href="/kb/security/vulnerabilities/jwt-vulnerabilities/">Fix</a></td></tr>
						<tr><td>Mass Assignment</td><td><span class="badge badge-high">High</span></td><td>Users modify forbidden fields</td><td><a href="/kb/security/vulnerabilities/mass-assignment/">Fix</a></td></tr>
						<tr><td>Open Redirect</td><td><span class="badge badge-medium">Medium</span></td><td>Phishing via your domain</td><td><a href="/kb/security/vulnerabilities/open-redirect/">Fix</a></td></tr>
						<tr><td>Missing Rate Limiting</td><td><span class="badge badge-medium">Medium</span></td><td>Brute force attacks succeed</td><td><a href="/kb/security/vulnerabilities/missing-rate-limiting/">Fix</a></td></tr>
						<tr><td>Insecure CORS</td><td><span class="badge badge-medium">Medium</span></td><td>Cross-origin attacks allowed</td><td><a href="/kb/security/vulnerabilities/insecure-cors/">Fix</a></td></tr>
					</tbody>
				</table>
			</div>

			<h3>Stack-Specific Guides</h3>
			<p>Security guidance for popular vibe coding stacks:</p>
			<ul>
				<li><a href="/kb/security/stacks/nextjs-supabase/">Next.js + Supabase Security</a></li>
				<li><a href="/kb/security/stacks/nextjs-prisma/">Next.js + Prisma Security</a></li>
				<li><a href="/kb/security/stacks/sveltekit-supabase/">SvelteKit + Supabase Security</a></li>
			</ul>
		</section>

		<!-- SECTION 8: FAQ -->
		<section id="faq" class="article-section">
			<h2>Frequently Asked Questions</h2>
			<div class="faq-list">
				{#each faqs as faq}
					<div class="faq-item">
						<h3>{faq.question}</h3>
						<p>{@html faq.answer}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Start Vibe Coding Securely Today</h2>
			<p>You now have everything you need: secure prompts, rules files, review checklists, and vulnerability guides.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Try vibeship scanner
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>

		<!-- External References -->
		<section class="article-section">
			<h2>External References</h2>
			<ul class="reference-list">
				<li><a href="https://best.openssf.org/Security-Focused-Guide-for-AI-Code-Assistant-Instructions" target="_blank" rel="noopener">OpenSSF Security Guide for AI Code Assistants</a></li>
				<li><a href="https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/" target="_blank" rel="noopener">OWASP Top 10 for LLM Applications 2025</a></li>
				<li><a href="https://www.veracode.com/blog/genai-code-security-report/" target="_blank" rel="noopener">Veracode GenAI Code Security Report 2025</a></li>
				<li><a href="https://dl.acm.org/doi/10.1145/3610721" target="_blank" rel="noopener">Pearce et al. - ACM CCS 2023 (Copilot Vulnerability Study)</a></li>
				<li><a href="https://dl.acm.org/doi/abs/10.1145/3576915.3623157" target="_blank" rel="noopener">Stanford User Study - ACM CCS 2023</a></li>
				<li><a href="https://cloudsecurityalliance.org/blog/2025/05/06/secure-vibe-coding-level-up-with-cursor-rules-and-the-r-a-i-l-g-u-a-r-d-framework" target="_blank" rel="noopener">CSA Secure Vibe Coding with R.A.I.L.G.U.A.R.D</a></li>
				<li><a href="https://www.wiz.io/blog/safer-vibe-coding-rules-files" target="_blank" rel="noopener">Wiz - Safer Vibe Coding with Rules Files</a></li>
				<li><a href="https://owasp.org/Top10/" target="_blank" rel="noopener">OWASP Top 10</a></li>
				<li><a href="https://cheatsheetseries.owasp.org/" target="_blank" rel="noopener">OWASP Cheat Sheet Series</a></li>
				<li><a href="https://semgrep.dev/" target="_blank" rel="noopener">Semgrep</a></li>
				<li><a href="https://gitleaks.io/" target="_blank" rel="noopener">Gitleaks</a></li>
			</ul>
		</section>
	</article>
</div>

<style>
	/* Page-specific styles - minimal, using CSS variables */

	/* Badge row */
	.badge-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	/* Badge variants */
	.badge-pillar {
		background: var(--violet);
		color: white;
	}

	.badge-comprehensive {
		background: var(--green);
		color: white;
	}

	/* TOC box */
	.toc-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.toc-box h2 {
		font-size: 1rem;
		margin-bottom: 1rem;
		margin-top: 0;
	}

	.toc-box ol {
		margin: 0;
		padding-left: 1.25rem;
	}

	.toc-box li {
		margin-bottom: 0.5rem;
	}

	/* Security sins list */
	.security-sins-list {
		background: var(--bg-secondary);
		border-left: 3px solid var(--red);
		padding: 1.5rem;
		padding-left: 2.5rem;
	}

	.security-sins-list li {
		margin-bottom: 0.75rem;
	}

	/* Formula box */
	.formula-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.formula-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	.formula-label {
		background: var(--green-dim);
		color: white;
		padding: 0.25rem 0.75rem;
		font-weight: 600;
		font-size: 0.875rem;
		min-width: 80px;
		text-align: center;
		font-family: 'JetBrains Mono', monospace;
	}

	.formula-desc {
		color: var(--text-secondary);
	}

	/* Security phrases grid */
	.security-phrases-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 0.5rem;
		margin: 1rem 0;
		list-style: none;
		padding: 0;
	}

	.security-phrases-grid li {
		background: var(--bg-secondary);
		padding: 0.5rem 1rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.8rem;
		margin: 0;
	}

	/* Install list - vertical layout */
	.install-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	.install-item {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.install-item h4 {
		margin: 0 0 0.75rem 0;
		color: var(--green-dim);
		font-size: 1rem;
	}

	.install-item .code-block {
		margin: 0;
	}

	.install-item .code-block pre {
		margin: 0;
		font-size: 0.8rem;
	}

	/* Warning box */
	.warning-box {
		background: var(--bg-secondary);
		border-left: 3px solid var(--orange);
		padding: 1rem 1.5rem;
		margin: 1.5rem 0;
	}

	/* Checklist box */
	.checklist-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.checklist-box h4 {
		margin-top: 0;
		margin-bottom: 0.75rem;
		color: var(--green-dim);
	}

	.checklist-box h4:not(:first-child) {
		margin-top: 1.5rem;
	}

	.checklist-box ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.checklist-box li {
		margin-bottom: 0.5rem;
	}

	/* Tools table wrapper */
	.tools-table-wrapper {
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	.tools-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
	}

	.tools-table th,
	.tools-table td {
		padding: 0.75rem;
		text-align: left;
		border-bottom: 1px solid var(--border);
	}

	.tools-table th {
		background: var(--bg-secondary);
		font-weight: 600;
	}

	/* FAQ - simple list style (matches sql-injection) */
	.faq-list {
		margin-top: 1rem;
	}

	.faq-item {
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--border);
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-item h3 {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
		font-size: 1.0625rem;
		font-weight: 600;
		margin: 0 0 0.5rem;
		color: var(--text-primary);
		line-height: 1.5;
		letter-spacing: -0.01em;
	}

	.faq-item p {
		margin: 0;
		font-size: 0.9375rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	/* Final CTA */
	.final-cta {
		text-align: center;
		padding: 3rem 2rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		margin-top: 3rem;
	}

	.final-cta h2 {
		margin-bottom: 0.75rem;
		margin-top: 0;
	}

	.final-cta p {
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}

	/* Reference list */
	.reference-list {
		list-style: none;
		padding: 0;
	}

	.reference-list li {
		margin-bottom: 0.75rem;
		padding-left: 1.5rem;
		position: relative;
	}

	.reference-list li::before {
		content: '→';
		position: absolute;
		left: 0;
		color: var(--green-dim);
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.formula-item {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.formula-label {
			min-width: auto;
		}

		.security-phrases-grid {
			grid-template-columns: 1fr;
		}

		.faq-item h3 {
			font-size: 1rem;
		}

		.final-cta {
			padding: 2rem 1.5rem;
		}
	}
</style>
