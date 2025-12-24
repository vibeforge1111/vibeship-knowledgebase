<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Weak Password Hashing: MD5, SHA1 & AI Defaults | VibeShip',
		description: 'Weak password hashing with MD5 or SHA1 lets attackers crack passwords in seconds. Learn why AI tools generate this and how to upgrade to Argon2id or bcrypt.',
		url: '/kb/security/vulnerabilities/weak-password-hashing/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Weak Password Hashing' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#2',
		category: 'A02:2021 - Cryptographic Failures',
		source: 'https://owasp.org/Top10/A02_2021-Cryptographic_Failures/',
		cweId: 'CWE-328',
		cweId2: 'CWE-916',
		cweSource: 'https://cwe.mitre.org/data/definitions/328.html',
		cweSource2: 'https://cwe.mitre.org/data/definitions/916.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'Is MD5 ever safe for passwords?',
			answer: 'No. MD5 has been broken since 2005 and should never be used for password storage. Modern GPUs can compute billions of MD5 hashes per second, making brute-force attacks trivial. Even with salting, MD5 is too fast to resist GPU cracking.'
		},
		{
			question: 'What about SHA-256? Isn\'t it secure?',
			answer: 'SHA-256 is cryptographically secure for data integrity, but too fast for passwords. Without a work factor, attackers can still compute millions of hashes per second. Use Argon2id or bcrypt instead, which are designed specifically for password storage with configurable difficulty.'
		},
		{
			question: 'What bcrypt cost factor should I use in 2025?',
			answer: 'Minimum cost factor 12, with 13-14 recommended for high-security applications. According to OWASP, aim for 250-500ms computation time. Test on your hardware and adjust accordingly. Cost factors below 12 are considered outdated for 2025.'
		},
		{
			question: 'Do I need to store the salt separately?',
			answer: 'No. Both bcrypt and Argon2 store the salt within the hash string itself. The salt is automatically generated and verified during password comparison. You don\'t need separate database columns or configuration.'
		},
		{
			question: 'How do I migrate from MD5 to Argon2 without breaking existing passwords?',
			answer: 'Implement hybrid verification: detect the hash format, verify against old algorithm, and rehash with new algorithm on successful login. This gradually upgrades your database without forcing password resets. Store an algorithm identifier to track progress.'
		},
		{
			question: 'Why does my AI tool generate MD5 for passwords?',
			answer: 'AI models are trained on general programming examples where MD5 is commonly used for checksums and data integrity. They don\'t distinguish between general hashing and password-specific hashing without explicit guidance. When you ask for "hash a password," the AI defaults to the simplest hash function it\'s seen most often.'
		},
		{
			question: 'Is PBKDF2 a good choice?',
			answer: 'PBKDF2 is acceptable if you need FIPS-140 compliance, but Argon2id is generally preferred. If using PBKDF2, OWASP recommends 600,000+ iterations with HMAC-SHA-256. For new projects, use Argon2id unless you have specific compliance requirements.'
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
			{"@type": "ListItem", "position": 4, "name": "Weak Password Hashing"}
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
		"datePublished": "2025-12-25",
		"dateModified": "2025-12-25"
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
				<span class="badge">CWE-328</span>
				<span class="badge">CWE-916</span>
				<span class="badge">OWASP A02:2021</span>
			</div>
			<h1>Weak Password Hashing in Vibe Coded Apps</h1>
			<p class="text-secondary">How MD5, SHA1, and default AI patterns let attackers crack passwords in seconds</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Weak password hashing uses fast algorithms like MD5 or SHA1 that attackers can crack in seconds.</strong>
				Modern password storage requires slow, memory-hard algorithms like Argon2id or bcrypt. Ranked <a href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/">#2 in OWASP Top 10</a> under Cryptographic Failures. AI tools default to fast hash functions because they optimize for speed, not security.
			</p>
		</div>

		<!-- Stats Box - Real OWASP Data -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{owaspData.ranking}</div>
				<div class="stat-label">OWASP Ranking</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>Weak Hash</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">10M×</div>
				<div class="stat-label">Slower to Crack (bcrypt)</div>
			</div>
			<div class="stat-box">
				<div class="stat-value critical">Critical</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021)</a>, <a href="https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html">OWASP Password Storage Cheat Sheet</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is weak password hashing?</h2>
			<p>
				Weak password hashing is when you store passwords using fast hash functions like MD5, SHA1, or SHA-256 instead of algorithms designed for password storage. These algorithms were built for speed, which is exactly what makes them terrible for passwords. Attackers can try billions of password guesses per second on modern GPUs.
			</p>
			<p>
				Think of it like using a diary lock on a bank vault. The lock works, but it's designed for a completely different threat model. MD5 computes hashes fast because it was designed for checksums and data integrity. Password storage needs the opposite: intentionally slow computation that makes brute-force attacks economically infeasible.
			</p>
			<p>
				According to <a href="https://cwe.mitre.org/data/definitions/328.html">CWE-328</a>, MD5 has been considered cryptographically broken since 2005. SHA1 had collision attacks demonstrated in 2017. Yet vibe coders still ship these patterns because AI tools suggest them by default. The code works perfectly until someone runs hashcat against your password database.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>Why do AI tools generate weak password hashing?</h2>
			<p>
				AI coding tools are trained on millions of code examples where MD5 and SHA-256 are used for checksums, file verification, and data integrity. They've seen <code>crypto.createHash('md5')</code> thousands of times. They've never learned that "hashing" and "password hashing" are fundamentally different security problems.
			</p>

			<div class="tool-patterns-box">
				<h3>The default pattern that ships to production</h3>
				<p>Ask Cursor, Bolt, or Claude Code to "hash a password" without specifying an algorithm:</p>
				<div class="code-block">
					<pre><code>{`// What AI tools generate by default
import crypto from 'crypto';

function hashPassword(password) {
  return crypto.createHash('md5')
    .update(password)
    .digest('hex');
}

// Or the "slightly better" version
function hashPassword(password) {
  return crypto.createHash('sha256')
    .update(password)
    .digest('hex');
}`}</code></pre>
				</div>
				<p class="pattern-note">
					Both are vulnerable. MD5 is completely broken. SHA-256 is too fast. Neither has a work factor. Neither is memory-hard. An RTX 4090 can test 25 billion SHA-256 hashes per second.
				</p>
			</div>

			<p>
				<strong>Why this happens:</strong> AI models optimize for "works and looks clean." These functions are simpler than setting up bcrypt or Argon2. They appear in more training examples. The AI doesn't understand the difference between hashing for integrity versus hashing for password storage. You have to explicitly request secure password algorithms.
			</p>

			<p>
				Every major AI tool generates this pattern. Not a bug in any specific tool, just how code generation works when trained on public repositories where most password hashing is done wrong.
			</p>
		</section>

		<!-- The Attack -->
		<section class="article-section">
			<h2>How weak password hashing gets exploited</h2>
			<p>
				Once an attacker has your password database, weak hashing is just a speed problem. Modern GPUs are built for parallel computation. Hash functions designed for speed run perfectly on GPU architecture.
			</p>

			<h3>GPU cracking speed comparison</h3>
			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Algorithm</th>
							<th>Hashes/Second (RTX 4090)</th>
							<th>8-Char Password Time</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>MD5</td>
							<td>~170 billion</td>
							<td>Seconds</td>
						</tr>
						<tr>
							<td>SHA1</td>
							<td>~60 billion</td>
							<td>Seconds</td>
						</tr>
						<tr>
							<td>SHA-256</td>
							<td>~25 billion</td>
							<td>Minutes</td>
						</tr>
						<tr>
							<td>bcrypt (cost 12)</td>
							<td>~1,500</td>
							<td>Months-Years</td>
						</tr>
						<tr>
							<td>Argon2id</td>
							<td>~500-1,000</td>
							<td>Years</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="data-source">
				Source: <a href="https://gist.github.com/epixoip/a83d38f412b4737e99bbef804a270c40">hashcat benchmark data</a>, <a href="https://securityboulevard.com/2024/07/comparative-analysis-of-password-hashing-algorithms-argon2-bcrypt-scrypt-and-pbkdf2/">Security Boulevard analysis</a>
			</p>

			<p>
				<strong>The math is brutal:</strong> bcrypt at cost factor 12 is roughly 10 million times slower to crack than MD5. That's not a small difference. That's the difference between cracking a database in an afternoon versus it being economically infeasible.
			</p>

			<h3>Rainbow table attacks</h3>
			<p>
				Pre-computed hash tables exist for billions of common passwords. These tables map common passwords to their MD5, SHA1, and SHA-256 hashes. Attackers download these tables and do instant lookups. No computation required. Millions of leaked password hashes are available on the dark web, indexed and searchable.
			</p>
			<p>
				Salting prevents rainbow tables, but doesn't slow down GPU cracking. If you're using MD5 with a salt, you've solved the wrong problem. The vulnerability is speed, not pre-computation.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect weak password hashing?</h2>
			<p>
				Search your codebase for any use of fast hash functions near password-related code. The patterns are consistent across languages and frameworks.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`// JavaScript/Node.js - DANGEROUS patterns
crypto.createHash('md5')
crypto.createHash('sha1')
crypto.createHash('sha256')  // near "password"

// Python - DANGEROUS patterns
hashlib.md5(password.encode())
hashlib.sha1(password.encode())
hashlib.sha256(password.encode())

// Low bcrypt cost - DANGEROUS
bcrypt.hash(password, 4)  // Should be 12+
bcrypt.hash(password, 10) // Outdated for 2025

// Grep patterns to find these:
rg "createHash\\('(md5|sha1)\\)"
rg "password.*sha256|sha256.*password"
rg "hashlib\\.(md5|sha1)\\("
rg "bcrypt\\.hash.*,\\s*[0-9]\\s*\\)" --pcre2`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Don't want to search manually?</strong></p>
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
			<h2>How do I fix weak password hashing?</h2>
			<p>
				Replace fast hash functions with algorithms designed for password storage. Argon2id for new projects, bcrypt for legacy systems with cost factor 12 or higher. The migration can happen gradually without breaking existing user logins.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this into Cursor, Claude Code, or Bolt to upgrade your password hashing systematically:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Upgrade password hashing from [MD5/SHA1/SHA-256] to Argon2id or bcrypt.

## Find vulnerable patterns
- crypto.createHash('md5'), crypto.createHash('sha1'), crypto.createHash('sha256') near passwords
- hashlib.md5(), hashlib.sha1(), hashlib.sha256() in Python
- bcrypt with cost factor below 12

## Replace with secure pattern

VULNERABLE:
crypto.createHash('md5').update(password).digest('hex')

SECURE (Argon2id - preferred):
const argon2 = require('argon2');
await argon2.hash(password, { type: argon2.argon2id, memoryCost: 19456, timeCost: 2 });
await argon2.verify(hash, password);

SECURE (bcrypt - cost 12+):
const bcrypt = require('bcrypt');
await bcrypt.hash(password, 12);
await bcrypt.compare(password, hash);

## Migration strategy
Detect hash format on login, verify with old algorithm, rehash with new algorithm on success. Don't force password resets.

## After fixing
1. Search for remaining vulnerable patterns
2. Test login with both old and new hash formats
3. List all modified files with before/after snippets

Proceed systematically through the codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix - Node.js Argon2id -->
			<div class="fix-section">
				<h3>Manual Fix - Node.js with Argon2id</h3>
				<p>Argon2id is the recommended algorithm for new projects. Winner of the 2015 Password Hashing Competition, designed to resist both GPU and ASIC attacks.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE - MD5</span>
						</div>
						<pre><code>{`const crypto = require('crypto');

function hashPassword(password) {
  return crypto.createHash('md5')
    .update(password)
    .digest('hex');
}

function verifyPassword(password, hash) {
  const computed = crypto.createHash('md5')
    .update(password)
    .digest('hex');
  return computed === hash;
}

// GPU can test 170 billion hashes/second
// Entire password database crackable in minutes`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE - Argon2id</span>
						</div>
						<pre><code>{`const argon2 = require('argon2');

async function hashPassword(password) {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 19456,  // 19 MiB
    timeCost: 2,
    parallelism: 1
  });
}

async function verifyPassword(password, hash) {
  try {
    return await argon2.verify(hash, password);
  } catch (err) {
    return false;
  }
}

// Memory-hard algorithm, GPU-resistant
// Economically infeasible to crack at scale`}</code></pre>
					</div>
				</div>
			</div>

			<!-- Manual Fix - Node.js bcrypt -->
			<div class="fix-section">
				<h3>Manual Fix - Node.js with bcrypt</h3>
				<p>bcrypt is acceptable for legacy systems. Use cost factor 12 minimum, 13-14 for high security.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE - SHA-256</span>
						</div>
						<pre><code>{`const crypto = require('crypto');

function hashPassword(password) {
  return crypto.createHash('sha256')
    .update(password)
    .digest('hex');
}

// GPU can test 25 billion SHA-256 hashes/second
// No salt, no work factor, no memory hardness`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE - bcrypt</span>
						</div>
						<pre><code>{`const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;  // 2025 minimum

async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// GPU can test ~1,500 bcrypt hashes/second
// 10 million times slower than MD5
// Salt automatically generated and stored in hash`}</code></pre>
					</div>
				</div>
			</div>

			<!-- Manual Fix - Python -->
			<div class="fix-section">
				<h3>Manual Fix - Python with Argon2id</h3>
				<p>Python's argon2-cffi library provides secure Argon2 hashing with sane defaults.</p>

				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE - MD5</span>
						</div>
						<pre><code>{`import hashlib

def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()

def verify_password(password, hash):
    return hashlib.md5(password.encode()).hexdigest() == hash

# Completely broken since 2005`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE - Argon2id</span>
						</div>
						<pre><code>{`from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

ph = PasswordHasher(
    time_cost=2,
    memory_cost=19456,  # 19 MiB
    parallelism=1,
    hash_len=32,
    salt_len=16
)

def hash_password(password):
    return ph.hash(password)

def verify_password(password, hash):
    try:
        ph.verify(hash, password)
        return True
    except VerifyMismatchError:
        return False`}</code></pre>
					</div>
				</div>
			</div>
		</section>

		<!-- Bcrypt vs Argon2 -->
		<section class="article-section">
			<h2>Bcrypt vs Argon2: Which should you use?</h2>
			<p>
				Both are secure. Argon2id is newer and preferred. bcrypt is legacy but acceptable with proper configuration.
			</p>

			<div class="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Feature</th>
							<th>bcrypt</th>
							<th>Argon2id</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>Status</strong></td>
							<td>Legacy, still secure</td>
							<td>Modern, recommended</td>
						</tr>
						<tr>
							<td><strong>Released</strong></td>
							<td>1999</td>
							<td>2015 (Password Hashing Competition winner)</td>
						</tr>
						<tr>
							<td><strong>Memory Usage</strong></td>
							<td>4 KB (fixed)</td>
							<td>Configurable (19 MB+ recommended)</td>
						</tr>
						<tr>
							<td><strong>GPU Resistance</strong></td>
							<td>Good</td>
							<td>Excellent (memory-hard)</td>
						</tr>
						<tr>
							<td><strong>Password Limit</strong></td>
							<td>72 bytes (truncates longer)</td>
							<td>None</td>
						</tr>
						<tr>
							<td><strong>Cost Adjustment</strong></td>
							<td>Exponential (2^n)</td>
							<td>Linear (memory, time, parallelism)</td>
						</tr>
						<tr>
							<td><strong>Recommendation</strong></td>
							<td>Legacy systems (cost 12+)</td>
							<td>New projects</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				<strong>Bottom line:</strong> Use Argon2id for new projects. If you're already using bcrypt with cost 12+, you don't need to migrate urgently. If you're using MD5, SHA1, or SHA-256, upgrade immediately.
			</p>
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
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">Storing passwords in plaintext or committed to Git</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated code</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Complete security checklist for this stack</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find these before an attacker does</h2>
			<p>Too many breaches start with "we thought MD5 with a salt was enough."</p>
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

	/* CTA Box */
	.cta-box {
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		padding: 1.5rem;
		text-align: center;
		margin: 2rem 0;
	}

	.cta-box p {
		margin: 0 0 1rem;
		color: var(--text-primary);
	}

	/* Fix Sections */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	/* Code Comparison - Stacked vertically */
	.code-comparison {
		display: flex;
		flex-direction: column;
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
</style>
