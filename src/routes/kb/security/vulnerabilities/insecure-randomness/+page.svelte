<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Insecure Randomness: Detect & Fix Guide',
		description: 'Math.random() is not cryptographically secure. Learn why predictable tokens lead to account takeover and how to generate secure random values.',
		url: '/kb/security/vulnerabilities/insecure-randomness/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Insecure Randomness' }
	];

	const faqs = [
		{
			question: 'Why is Math.random() insecure?',
			answer: 'Math.random() uses a PRNG (pseudo-random number generator) designed for speed, not security. Given enough outputs, attackers can predict future values. It uses only 32-48 bits of state, making brute force feasible. Never use it for tokens, passwords, or any security purpose.'
		},
		{
			question: 'What should I use instead?',
			answer: 'In Node.js: crypto.randomBytes() or crypto.randomUUID(). In browsers: crypto.getRandomValues() or crypto.randomUUID(). These use the OS cryptographic random number generator with proper entropy sources.'
		},
		{
			question: 'What about UUID v4?',
			answer: 'UUID v4 is secure IF generated with crypto.randomUUID() or a library that uses crypto. Some UUID libraries use Math.random() internally—check your dependency. A proper UUID v4 has 122 bits of randomness, which is sufficient for most security purposes.'
		},
		{
			question: 'Can I seed Math.random() securely?',
			answer: 'No. Math.random() cannot be seeded in JavaScript, and even seedable PRNGs are not cryptographically secure. The algorithm itself is predictable regardless of the seed. You must use cryptographic APIs.'
		},
		{
			question: 'What about nanoid?',
			answer: 'nanoid is secure—it uses crypto.getRandomValues() internally. It generates URL-safe IDs that are shorter than UUIDs while maintaining security. It is a good choice for tokens and IDs in vibe coded apps.'
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
				<span class="badge badge-high">High Severity</span>
				<span class="badge">CWE-330</span>
				<span class="badge">OWASP A02</span>
			</div>
			<h1>Insecure Randomness in Vibe Coded Apps</h1>
			<p class="text-secondary">When Math.random() becomes your biggest vulnerability</p>
		</header>

		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Math.random() is not cryptographically secure—attackers can predict its output.</strong>
				If you use it for tokens, session IDs, or passwords, attackers can guess them. Fix: use <code>crypto.randomBytes()</code> in Node.js or <code>crypto.getRandomValues()</code> in browsers.
			</p>
		</div>

		<section class="article-section">
			<h2>The problem with Math.random()</h2>
			<p>
				Every vibe coder has written <code>Math.random().toString(36)</code> to generate a "unique" ID. It works for dev, but it's a security disaster in production. Here's why:
			</p>

			<div class="entropy-comparison">
				<div class="entropy-item bad">
					<div class="entropy-label">Math.random()</div>
					<div class="entropy-bits">~32-48 bits</div>
					<div class="entropy-status">Predictable</div>
				</div>
				<div class="entropy-item good">
					<div class="entropy-label">crypto.randomBytes(32)</div>
					<div class="entropy-bits">256 bits</div>
					<div class="entropy-status">Secure</div>
				</div>
			</div>

			<div class="code-comparison">
				<div class="code-block code-bad">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable - Math.random()</span>
						<span class="code-label-bad">Predictable</span>
					</div>
					<pre><code>{`// VULNERABLE: Password reset token
function generateResetToken() {
  // Math.random() is NOT cryptographically secure
  return Math.random().toString(36).substring(2);
}

// VULNERABLE: Session ID
function createSession() {
  const sessionId = Math.random().toString(36) +
                    Math.random().toString(36);
  return sessionId;
}

// VULNERABLE: API key generation
function generateApiKey() {
  return 'sk_' + Math.random().toString(36).substring(2, 15);
}`}</code></pre>
				</div>
				<div class="code-block code-good">
					<div class="code-block-header">
						<span class="code-block-lang">Secure - Cryptographic randomness</span>
						<span class="code-label-good">Fixed</span>
					</div>
					<pre><code>{`import { randomBytes, randomUUID } from 'crypto';

// SECURE: Password reset token
function generateResetToken(): string {
  return randomBytes(32).toString('hex');
  // 64 hex chars = 256 bits of entropy
}

// SECURE: Session ID
function createSession(): string {
  return randomUUID();
  // UUID v4 = 122 bits of entropy
}

// SECURE: API key generation
function generateApiKey(): string {
  return 'sk_' + randomBytes(24).toString('base64url');
}`}</code></pre>
				</div>
			</div>
		</section>

		<section class="article-section">
			<h2>Browser-safe alternatives</h2>
			<p>
				In the browser, you don't have Node's crypto module. Use the Web Crypto API instead:
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Browser - Web Crypto API</span>
				</div>
				<pre><code>{`// Generate secure random bytes in browser
function getSecureRandomBytes(length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

// Generate secure token
function generateToken(): string {
  const bytes = getSecureRandomBytes(32);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Or use the built-in UUID (modern browsers)
const secureId = crypto.randomUUID();`}</code></pre>
			</div>
		</section>

		<section class="article-section">
			<h2>How to fix insecure randomness</h2>

			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span class="fix-prompt-label">AI Fix Prompt</span>
					<button class="copy-btn" class:copied onclick={copyPrompt}>
						{copied ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<div class="fix-prompt-content" id="ai-fix-prompt">{`Find and fix insecure randomness in this codebase.

## Search for
- Math.random() used for security purposes
- Tokens, session IDs, API keys using weak random
- Password reset/verification code generation
- Any "unique ID" used for authentication/authorization

## Replace with

### Node.js
\`\`\`typescript
import { randomBytes, randomUUID } from 'crypto';

// For hex tokens (64 chars = 256 bits)
const token = randomBytes(32).toString('hex');

// For URL-safe tokens
const urlSafe = randomBytes(32).toString('base64url');

// For UUIDs
const id = randomUUID();
\`\`\`

### Browser
\`\`\`typescript
// For random bytes
const bytes = new Uint8Array(32);
crypto.getRandomValues(bytes);

// For UUID
const id = crypto.randomUUID();
\`\`\`

### Using nanoid (both environments)
\`\`\`typescript
import { nanoid } from 'nanoid';
const id = nanoid(); // 21 chars, URL-safe
\`\`\`

## Minimum entropy requirements
- Session IDs: 128 bits minimum
- API keys: 256 bits recommended
- Password reset tokens: 256 bits
- CSRF tokens: 128 bits minimum`}</div>
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
				<a href="/kb/security/vulnerabilities/insufficient-entropy/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Insufficient Entropy</div>
					<p class="related-card-description">Weak key generation</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-crypto-keys/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Crypto Keys</div>
					<p class="related-card-description">Static secret exposure</p>
				</a>
				<a href="/kb/security/vulnerabilities/password-reset/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Password Reset Flaws</div>
					<p class="related-card-description">Reset token vulnerabilities</p>
				</a>
			</div>
		</section>

		<div class="final-cta">
			<h2>Randomness matters more than you think</h2>
			<p>One predictable token can compromise your entire app.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">Scan for weak randomness</a>
		</div>
	</article>
</div>

<style>
	.badge-row { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }

	.entropy-comparison { display: flex; gap: 1rem; margin: 1.5rem 0; flex-wrap: wrap; }
	.entropy-item { flex: 1; min-width: 200px; padding: 1.5rem; text-align: center; border: 1px solid var(--border); }
	.entropy-item.bad { border-color: var(--red); background: rgba(255, 107, 107, 0.05); }
	.entropy-item.good { border-color: var(--green); background: rgba(0, 255, 136, 0.05); }
	.entropy-label { font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; margin-bottom: 0.5rem; }
	.entropy-bits { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }
	.entropy-item.bad .entropy-bits { color: var(--red); }
	.entropy-item.good .entropy-bits { color: var(--green); }
	.entropy-status { font-size: 0.75rem; text-transform: uppercase; color: var(--text-tertiary); }

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
