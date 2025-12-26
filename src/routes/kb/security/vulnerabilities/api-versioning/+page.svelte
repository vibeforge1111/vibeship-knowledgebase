<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'API Versioning Vulnerabilities: Security Guide',
		description: 'Old API versions keep old vulnerabilities. Learn how deprecated endpoints become attack vectors and how to implement secure API versioning.',
		url: '/kb/security/vulnerabilities/api-versioning/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'API Versioning' }
	];

	const faqs = [
		{
			question: 'Why are old API versions dangerous?',
			answer: 'Old API versions often lack security fixes applied to newer versions. Attackers specifically target /api/v1 endpoints knowing they may have vulnerabilities fixed in /api/v2. Each version you maintain is another attack surface.'
		},
		{
			question: 'How should I version my API securely?',
			answer: 'Use a unified security middleware that applies to ALL versions. Set sunset dates for old versions and enforce them. Log usage of deprecated versions to track migration. Never copy security code—share it across versions.'
		},
		{
			question: 'What is API version header manipulation?',
			answer: 'Some APIs accept version via headers (Accept: application/vnd.api+json;version=1). Attackers can manipulate these to access older, vulnerable endpoints. Always validate version headers against allowed values.'
		},
		{
			question: 'How do I sunset an API version?',
			answer: 'Announce deprecation 6-12 months ahead. Add Deprecation and Sunset headers to responses. Return warnings, then errors for deprecated versions. Monitor usage and contact major consumers directly.'
		},
		{
			question: 'Should security be versioned?',
			answer: 'No. Security controls should apply uniformly across all versions. Authentication, rate limiting, input validation, and authorization should be in a shared middleware layer, not duplicated per version.'
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
	<link rel="canonical" href="https://vibeship.co{meta.url}" />
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-medium">Medium Severity</span>
				<span class="badge">CWE-1059</span>
				<span class="badge">OWASP A05</span>
			</div>
			<h1>API Versioning Vulnerabilities</h1>
			<p class="text-secondary">When old endpoints become your newest attack surface</p>
		</header>

		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Old API versions keep old vulnerabilities alive.</strong>
				If you patched SQL injection in /api/v2 but /api/v1 still runs the old code, attackers will use v1. Fix: apply security uniformly across all versions, sunset old versions aggressively, and share security middleware.
			</p>
		</div>

		<section class="article-section">
			<h2>How API versions become vulnerabilities</h2>
			<p>
				Most vibe coded apps copy-paste entire route folders when versioning. The v1 folder becomes a time capsule—bugs fixed in v2 persist in v1 forever.
			</p>

			<div class="version-comparison">
				<div class="version-item vulnerable">
					<div class="version-header">/api/v1/users</div>
					<ul>
						<li>No rate limiting</li>
						<li>SQL injection in search</li>
						<li>Missing auth on /export</li>
						<li>Still in production</li>
					</ul>
				</div>
				<div class="version-arrow">→</div>
				<div class="version-item secure">
					<div class="version-header">/api/v2/users</div>
					<ul>
						<li>Rate limited</li>
						<li>Parameterized queries</li>
						<li>Auth on all endpoints</li>
						<li>Active development</li>
					</ul>
				</div>
			</div>

			<div class="code-comparison">
				<div class="code-block code-bad">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable - Separate security per version</span>
						<span class="code-label-bad">Security drift</span>
					</div>
					<pre><code>{`// routes/v1/users.ts - OLD CODE, FORGOTTEN
router.get('/search', async (req, res) => {
  // VULNERABLE: SQL injection never fixed here
  const users = await db.query(
    \`SELECT * FROM users WHERE name LIKE '%\${req.query.q}%'\`
  );
  res.json(users);
});

// routes/v2/users.ts - NEW CODE
router.get('/search', async (req, res) => {
  // Fixed in v2, but v1 still vulnerable
  const users = await db.query(
    'SELECT * FROM users WHERE name LIKE $1',
    [\`%\${req.query.q}%\`]
  );
  res.json(users);
});`}</code></pre>
				</div>
				<div class="code-block code-good">
					<div class="code-block-header">
						<span class="code-block-lang">Secure - Shared security layer</span>
						<span class="code-label-good">Fixed</span>
					</div>
					<pre><code>{`// middleware/security.ts - SHARED ACROSS ALL VERSIONS
export const securityMiddleware = [
  rateLimit({ windowMs: 60000, max: 100 }),
  validateInput,
  authenticate,
  authorize
];

// routes/v1/index.ts
router.use(securityMiddleware);

// routes/v2/index.ts
router.use(securityMiddleware);

// services/userSearch.ts - SHARED BUSINESS LOGIC
export async function searchUsers(query: string) {
  // Single implementation, used by all versions
  return db.query(
    'SELECT * FROM users WHERE name LIKE $1',
    [\`%\${query}%\`]
  );
}`}</code></pre>
				</div>
			</div>
		</section>

		<section class="article-section">
			<h2>Version header manipulation</h2>
			<p>
				Some APIs let clients specify versions via headers. Without validation, attackers can request any version:
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Attack - Version downgrade</span>
				</div>
				<pre><code>{`# Normal request uses latest version
curl -H "Accept: application/vnd.api+json;version=2" \\
  https://api.example.com/users

# Attacker downgrades to vulnerable version
curl -H "Accept: application/vnd.api+json;version=1" \\
  https://api.example.com/users

# Or tries invalid versions
curl -H "Accept: application/vnd.api+json;version=0" \\
  https://api.example.com/users`}</code></pre>
			</div>
		</section>

		<section class="article-section">
			<h2>How to fix version vulnerabilities</h2>

			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span class="fix-prompt-label">AI Fix Prompt</span>
					<button class="copy-btn" class:copied onclick={copyPrompt}>
						{copied ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<div class="fix-prompt-content" id="ai-fix-prompt">{`Secure API versioning in this codebase.

## Architecture changes

### 1. Unified security middleware
\`\`\`typescript
// Apply to ALL API versions
const apiSecurity = [
  helmet(),
  rateLimit({ windowMs: 60000, max: 100 }),
  cors(corsOptions),
  authenticate,
  validateApiVersion
];

app.use('/api', apiSecurity);
\`\`\`

### 2. Validate version headers
\`\`\`typescript
const SUPPORTED_VERSIONS = ['2', '3'];
const DEPRECATED_VERSIONS = ['1'];

function validateApiVersion(req, res, next) {
  const version = extractVersion(req);

  if (DEPRECATED_VERSIONS.includes(version)) {
    res.set('Deprecation', 'true');
    res.set('Sunset', 'Sat, 1 Jan 2025 00:00:00 GMT');
  }

  if (!SUPPORTED_VERSIONS.includes(version) &&
      !DEPRECATED_VERSIONS.includes(version)) {
    return res.status(400).json({
      error: 'Unsupported API version'
    });
  }

  next();
}
\`\`\`

### 3. Share business logic
\`\`\`typescript
// services/ contains shared logic
// routes/v1 and routes/v2 are thin wrappers
// Security fixes apply to shared services
\`\`\`

### 4. Sunset old versions
- Add Deprecation header to old versions
- Log usage of deprecated versions
- Set and enforce sunset dates
- Remove old version code entirely when sunsetted`}</div>
			</div>
		</section>

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

		<section class="article-section">
			<h2>Related content</h2>
			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/bola/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">BOLA</div>
					<p class="related-card-description">API authorization flaws</p>
				</a>
				<a href="/kb/security/vulnerabilities/bfla/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">BFLA</div>
					<p class="related-card-description">Function-level auth</p>
				</a>
				<a href="/kb/security/vulnerabilities/excessive-data-exposure/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Excessive Data Exposure</div>
					<p class="related-card-description">API response filtering</p>
				</a>
			</div>
		</section>

		<div class="final-cta">
			<h2>Old code is technical debt with interest</h2>
			<p>Every API version is an attack surface you maintain.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">Scan API endpoints</a>
		</div>
	</article>
</div>

<style>
	.badge-row { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }

	.version-comparison { display: flex; align-items: center; gap: 1rem; margin: 1.5rem 0; flex-wrap: wrap; justify-content: center; }
	.version-item { flex: 1; min-width: 200px; max-width: 300px; padding: 1.5rem; border: 1px solid var(--border); }
	.version-item.vulnerable { border-color: var(--red); background: rgba(255, 107, 107, 0.05); }
	.version-item.secure { border-color: var(--green); background: rgba(0, 255, 136, 0.05); }
	.version-header { font-family: 'JetBrains Mono', monospace; font-size: 0.9375rem; font-weight: 600; margin-bottom: 1rem; }
	.version-item.vulnerable .version-header { color: var(--red); }
	.version-item.secure .version-header { color: var(--green); }
	.version-item ul { margin: 0; padding-left: 1.25rem; }
	.version-item li { font-size: 0.875rem; margin-bottom: 0.25rem; color: var(--text-secondary); }
	.version-arrow { font-size: 1.5rem; color: var(--text-tertiary); }

	.code-comparison { display: flex; flex-direction: column; gap: 1rem; margin: 1.5rem 0; }
	.code-bad { border-left: 3px solid var(--red); }
	.code-good { border-left: 3px solid var(--green); }
	.code-label-bad, .code-label-good { font-size: 0.6875rem; padding: 0.125rem 0.5rem; text-transform: uppercase; font-weight: 600; }
	.code-label-bad { color: var(--red); background: rgba(255, 107, 107, 0.1); }
	.code-label-good { color: var(--green); background: rgba(0, 255, 136, 0.1); }

	.faq-list { margin-top: 1rem; }
	.faq-item { padding: 1.5rem 0; border-bottom: 1px solid var(--border); }
	.faq-item:last-child { border-bottom: none; }
	.faq-item h3 { font-size: 1.0625rem; font-weight: 600; margin: 0 0 0.5rem; }
	.faq-item p { margin: 0; font-size: 0.9375rem; line-height: 1.7; color: var(--text-secondary); }

	.final-cta { text-align: center; padding: 3rem 2rem; background: var(--bg-secondary); border: 1px solid var(--border); margin-top: 3rem; }
	.final-cta h2 { margin-bottom: 0.75rem; }
	.final-cta p { color: var(--text-secondary); margin-bottom: 1.5rem; }
</style>
