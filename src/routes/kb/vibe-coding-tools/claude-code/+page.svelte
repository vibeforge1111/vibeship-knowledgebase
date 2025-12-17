<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Is Claude Code Safe? Security Guide',
		description: 'Security patterns in Claude Code AI-generated apps. Learn about input validation, verbose errors, CORS issues, and how to use Claude Code securely.',
		url: '/kb/vibe-coding-tools/claude-code/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'AI Patterns', href: '/kb/vibe-coding-tools' },
		{ label: 'Claude Code' }
	];

	// Security patterns specific to Claude Code
	const patterns = [
		{
			name: 'Missing Input Validation',
			severity: 'High',
			description: 'Claude Code generates API endpoints that accept request data without validating types, formats, or constraints. This can lead to type coercion bugs, database errors, or injection vulnerabilities.',
			example: `// Claude Code often generates this:
app.post('/api/user/profile', async (req, res) => {
  const { userId, email, bio } = req.body;
  const result = await db.users.update({
    where: { id: userId },
    data: { email, bio }
  });
  res.json({ success: true, user: result });
});`,
			fix: `// Secure version with Zod validation:
import { z } from 'zod';

const schema = z.object({
  userId: z.string().uuid(),
  email: z.string().email().max(255),
  bio: z.string().max(500).optional()
});

app.post('/api/user/profile', async (req, res) => {
  const validated = schema.parse(req.body);
  const result = await db.users.update({
    where: { id: validated.userId },
    data: { email: validated.email, bio: validated.bio }
  });
  res.json({ success: true, user: result });
});`,
			link: '/kb/security/vulnerabilities/xss/'
		},
		{
			name: 'Verbose Error Messages',
			severity: 'Medium',
			description: 'Claude Code generates error handlers that expose internal details like stack traces, SQL queries, and file paths. This information helps attackers understand system internals.',
			example: `// Claude Code might generate:
app.post('/api/data', async (req, res) => {
  try {
    const result = await db.query(sql);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
      query: error.sql
    });
  }
});`,
			fix: `// Secure version with sanitized errors:
app.post('/api/data', async (req, res) => {
  try {
    const result = await db.query(sql);
  } catch (error) {
    logger.error('Query failed', { error, requestId: req.id });
    res.status(500).json({
      error: 'An error occurred',
      requestId: req.id
    });
  }
});`,
			link: '/kb/security/vulnerabilities/xss/'
		},
		{
			name: 'Missing Rate Limiting',
			severity: 'High',
			description: 'Claude Code creates authentication endpoints without rate limiting. This allows brute force attacks on login, password reset, and registration endpoints.',
			example: `// Claude Code generates functional but unprotected routes:
export default async function handler(req, res) {
  const { username, password } = req.body;
  const user = await authenticateUser(username, password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  return res.json({ token: generateToken(user) });
}`,
			fix: `// With rate limiting:
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many attempts, try again later'
});

app.post('/api/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  const user = await authenticateUser(username, password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  return res.json({ token: generateToken(user) });
});`,
			link: '/kb/security/vulnerabilities/missing-auth/'
		},
		{
			name: 'Overly Permissive CORS',
			severity: 'High',
			description: 'Claude Code may set CORS to allow all origins when you ask for API endpoints accessible from the frontend. This exposes APIs to cross-origin attacks.',
			example: `// Claude Code might generate:
import cors from 'cors';

app.use(cors({
  origin: '*',
  credentials: true
}));`,
			fix: `// Secure version with origin allowlist:
import cors from 'cors';

const allowedOrigins = ['https://app.example.com', 'https://example.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));`,
			link: '/kb/security/vulnerabilities/xss/'
		},
		{
			name: 'Client-Side Only Validation',
			severity: 'High',
			description: 'Claude Code may add form validation only on the client side, which attackers can bypass by calling the API directly.',
			example: `// Client validation only:
const handleSubmit = () => {
  if (!email.includes('@')) {
    setError('Invalid email');
    return;
  }
  // Submits to API that has no validation
  fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
}

// Server trusts client validation:
export async function POST({ request }) {
  const { email } = await request.json();
  await db.users.create({ data: { email } });
  return json({ success: true });
}`,
			fix: `// Client validation (UX):
const handleSubmit = () => {
  if (!email.includes('@')) {
    setError('Invalid email');
    return;
  }
  fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
}

// Server also validates (security):
export async function POST({ request }) {
  const { email } = await request.json();

  if (!email || !z.string().email().safeParse(email).success) {
    return json({ error: 'Invalid email' }, { status: 400 });
  }

  await db.users.create({ data: { email } });
  return json({ success: true });
}`,
			link: '/kb/security/vulnerabilities/xss/'
		}
	];

	// FAQ data
	const faqs = [
		{
			question: 'Is Claude Code secure?',
			answer: 'Claude Code is more security-conscious than many AI coding tools and will sometimes add basic security patterns without prompting. However, like all AI tools, it prioritizes functionality over security. Generated code still requires security review before deployment.'
		},
		{
			question: 'What security issues does Claude Code have?',
			answer: 'Claude Code commonly generates code with missing input validation, verbose error messages, missing rate limiting, overly permissive CORS, and client-side only validation. These patterns appear because AI models optimize for working code, not secure code.'
		},
		{
			question: 'Is Claude Code safer than Cursor?',
			answer: 'Claude Code exhibits slightly more security awareness than Cursor in some areas. It is less likely to generate SQL injection via template literals and sometimes adds basic auth checks without prompting. However, both tools require the same level of security review.'
		},
		{
			question: 'How do I use Claude Code securely?',
			answer: 'Be explicit about security requirements in prompts. Instead of "create an API endpoint," say "create an API endpoint with input validation, rate limiting, and proper error handling." Review generated code for the patterns listed above before committing.'
		},
		{
			question: 'Can Claude Code fix security issues?',
			answer: 'Yes. Claude Code is effective at refactoring code to fix security issues once you point them out. You can paste AI fix prompts from this knowledge base directly into Claude Code and ask it to apply the fixes to your codebase.'
		}
	];

	let copied = $state(false);
	let copiedIndex = $state(-1);

	function copyCode(code: string, index: number) {
		navigator.clipboard.writeText(code);
		copied = true;
		copiedIndex = index;
		setTimeout(() => {
			copied = false;
			copiedIndex = -1;
		}, 2000);
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
			{"@type": "ListItem", "position": 2, "name": "AI Patterns", "item": "https://vibeship.co/kb/vibe-coding-tools"},
			{"@type": "ListItem", "position": 3, "name": "Claude Code"}
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
			"name": "Vibeship"
		},
		"publisher": {
			"@type": "Organization",
			"name": "Vibeship",
			"logo": {
				"@type": "ImageObject",
				"url": "https://vibeship.co/logo.png"
			}
		},
		"datePublished": "2025-12-17",
		"dateModified": "2025-12-17"
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
				<span class="badge">AI Tool</span>
				<span class="badge">CLI</span>
			</div>
			<h1>Claude Code Security Patterns</h1>
			<p class="text-secondary">Common security vulnerabilities in code generated by Claude Code AI</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Claude Code's most common security issue is missing input validation.</strong>
				It also generates verbose error messages, APIs without rate limiting, overly permissive CORS, and client-side only validation. Claude Code is generally more security-aware than competitors but still requires review.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">Input Validation</div>
				<div class="stat-label">Top Issue</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">More Secure</div>
				<div class="stat-label">Than Competitors</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">5</div>
				<div class="stat-label">Key Patterns</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Fixable</div>
				<div class="stat-label">With Prompts</div>
			</div>
		</div>

		<!-- About Claude Code -->
		<section class="article-section">
			<h2>About Claude Code</h2>
			<p>
				<a href="https://claude.ai/code" target="_blank" rel="noopener">Claude Code</a> is <a href="https://www.anthropic.com" target="_blank" rel="noopener">Anthropic</a>'s official CLI tool for code generation and editing.
				It is built on Claude 3.5 Sonnet and later models, designed specifically for software development tasks including writing, refactoring, and debugging code.
			</p>
			<p>
				Claude Code is more deliberate about security than many AI coding tools. It sometimes adds authentication checks, uses parameterized queries, and considers edge cases without explicit prompting. However, like all AI assistants, it still generates patterns that prioritize functionality over comprehensive security. The common issues align with <a href="https://owasp.org/Top10/" target="_blank" rel="noopener">OWASP Top 10</a> categories including <a href="https://owasp.org/Top10/A04_2021-Insecure_Design/" target="_blank" rel="noopener">A04:2021 Insecure Design</a>. Vibe coders should still review Claude Code output before deploying to production.
			</p>
		</section>

		<!-- Security Patterns -->
		<section class="article-section">
			<h2>Security Patterns</h2>
			<p>These are the most common security issues we see in vibe coded projects using Claude Code:</p>

			{#each patterns as pattern, i}
				<div class="pattern-card">
					<div class="pattern-header">
						<h3>{pattern.name}</h3>
						<span class="badge badge-{pattern.severity.toLowerCase()}">{pattern.severity}</span>
					</div>
					<p class="pattern-description">{pattern.description}</p>

					<div class="code-comparison">
						<div class="code-block vulnerable">
							<div class="code-block-header">
								<span class="code-block-lang status-bad">VULNERABLE</span>
							</div>
							<pre><code>{pattern.example}</code></pre>
						</div>

						<div class="code-block secure">
							<div class="code-block-header">
								<span class="code-block-lang status-good">SECURE</span>
								<button class="copy-btn small" onclick={() => copyCode(pattern.fix, i)}>
									{copied && copiedIndex === i ? 'Copied!' : 'Copy'}
								</button>
							</div>
							<pre><code>{pattern.fix}</code></pre>
						</div>
					</div>

					<a href={pattern.link} class="pattern-link">
						Learn more about this vulnerability
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M5 12h14M12 5l7 7-7 7"/>
						</svg>
					</a>
				</div>
			{/each}
		</section>

		<!-- Why This Happens -->
		<section class="article-section">
			<h2>Why Claude Code generates these patterns</h2>
			<p>Claude Code generates these security patterns for the same fundamental reasons all AI coding tools do:</p>
			<ul>
				<li><strong>Training data patterns:</strong> AI models learn from millions of code examples. Many tutorials and Stack Overflow answers prioritize clarity and quick solutions over security best practices</li>
				<li><strong>Functionality first:</strong> AI optimizes for code that works immediately. Security features like rate limiting and input validation add complexity that may not be evident in initial testing</li>
				<li><strong>Implicit requirements:</strong> When vibe coding, "create an API endpoint" does not automatically imply "with rate limiting, input validation, and sanitized errors" to an AI model</li>
				<li><strong>Context limitations:</strong> AI may not have full context about your threat model, compliance requirements, or production environment constraints</li>
			</ul>
			<p>
				That said, Claude Code is more likely than competing tools to add basic security patterns like parameterized queries and authentication checks without explicit prompting. This is because Claude models have been trained with more emphasis on helpful, harmless, and honest outputs.
			</p>
		</section>

		<!-- How to Use Claude Code Securely -->
		<section class="article-section">
			<h2>How to use Claude Code securely</h2>
			<ol class="numbered-list">
				<li>
					<strong>Be explicit about security requirements in prompts:</strong>
					<p>Instead of "create a user registration API," say "create a user registration API with email validation using Zod, rate limiting at 3 attempts per 15 minutes, and sanitized error messages."</p>
				</li>
				<li>
					<strong>Review generated code before committing:</strong>
					<p>Look for missing input validation, verbose error messages, missing rate limiting, and overly permissive CORS configurations.</p>
				</li>
				<li>
					<strong>Use Claude Code to fix its own issues:</strong>
					<p>Paste fix prompts from this knowledge base into Claude Code and ask it to refactor the vulnerable code. Claude Code is effective at applying security fixes when given clear instructions.</p>
				</li>
				<li>
					<strong>Scan your codebase before deployment:</strong>
					<p>Run <a href="https://scanner.vibeship.co">Vibeship Scanner</a> to catch vulnerabilities that may have slipped through review.</p>
				</li>
			</ol>
		</section>

		<!-- CTA Box -->
		<div class="cta-box">
			<p><strong>Scan your vibe coded apps</strong></p>
			<p class="cta-subtext">Find missing validation, verbose errors, and other issues in your Claude Code-generated codebase</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green">
				Scan your code free
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>

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
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor</div>
					<p class="related-card-description">Security patterns in Cursor generated code</p>
				</a>
				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Bolt</div>
					<p class="related-card-description">Security patterns in Bolt generated apps</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">Authentication and authorization vulnerabilities</p>
				</a>
			</div>
		</section>
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

	/* Pattern Card */
	.pattern-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.pattern-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	.pattern-header h3 {
		margin: 0;
		font-size: 1.1rem;
	}

	.pattern-description {
		color: var(--text-secondary);
		margin-bottom: 1rem;
	}

	.pattern-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--green-dim);
		font-size: 0.875rem;
		text-decoration: none;
		margin-top: 1rem;
	}

	.pattern-link:hover {
		color: var(--green);
	}

	/* Code Comparison */
	.code-comparison {
		display: grid;
		gap: 1rem;
		margin: 1rem 0;
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

	.copy-btn.small {
		font-size: 0.7rem;
		padding: 0.25rem 0.5rem;
	}

	/* CTA Box */
	.cta-box {
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		padding: 2rem;
		text-align: center;
		margin: 2rem 0;
	}

	.cta-box p {
		margin: 0 0 0.5rem;
		color: var(--text-primary);
	}

	.cta-subtext {
		color: var(--text-secondary) !important;
		font-size: 0.9rem;
		margin-bottom: 1.5rem !important;
	}

	/* Numbered List */
	.numbered-list {
		counter-reset: step;
		list-style: none;
		padding: 0;
	}

	.numbered-list li {
		position: relative;
		padding-left: 2.5rem;
		margin-bottom: 1.5rem;
	}

	.numbered-list li::before {
		counter-increment: step;
		content: counter(step);
		position: absolute;
		left: 0;
		top: 0;
		width: 1.75rem;
		height: 1.75rem;
		background: var(--bg-tertiary);
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.numbered-list li strong {
		display: block;
		margin-bottom: 0.25rem;
	}

	.numbered-list li p {
		margin: 0;
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	/* FAQ */
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

	/* Severity badges */
	.badge-critical {
		background: var(--red);
		color: white;
	}

	.badge-high {
		background: var(--orange, #f97316);
		color: white;
	}

	.badge-medium {
		background: var(--yellow, #eab308);
		color: black;
	}

	@media (max-width: 768px) {
		.pattern-header {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
