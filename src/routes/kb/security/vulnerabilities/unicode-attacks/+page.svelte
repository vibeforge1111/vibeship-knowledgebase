<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Unicode & Homograph Attacks: Detect & Fix Guide',
		description: 'Unicode attacks use lookalike characters to spoof domains and bypass filters. Learn to detect homograph attacks and implement proper text normalization.',
		url: '/kb/security/vulnerabilities/unicode-attacks/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Unicode Attacks' }
	];

	const faqs = [
		{
			question: 'What are homograph attacks?',
			answer: 'Homograph attacks use characters that look identical but have different Unicode code points. The Cyrillic "а" (U+0430) looks like Latin "a" (U+0061). Attackers register domains like "аpple.com" that display identically to "apple.com" but are completely different domains.'
		},
		{
			question: 'How do I prevent Unicode spoofing?',
			answer: 'Normalize text using Unicode normalization (NFC/NFKC). For domains, use Punycode display to reveal non-ASCII characters. Validate input against expected character sets. Flag mixed-script text (combining Latin with Cyrillic). Use confusable detection libraries.'
		},
		{
			question: 'What is Unicode normalization?',
			answer: 'Unicode has multiple ways to represent the same character. "é" can be one character (U+00E9) or two (e + combining accent). Normalization converts these to a canonical form. Use NFC for general text, NFKC for security-sensitive comparisons like username uniqueness.'
		},
		{
			question: 'Can Unicode attacks bypass security filters?',
			answer: 'Yes. Filters checking for "script" might miss "ѕсrірt" (with Cyrillic s, c, r, i, p). Width variations, combining characters, and bidirectional overrides can all bypass naive text matching. Always normalize before security comparisons.'
		},
		{
			question: 'How do browsers handle IDN homographs?',
			answer: 'Modern browsers show Punycode (xn--...) for suspicious domains instead of the Unicode display. They detect mixed scripts and known attack patterns. But protection varies by browser and isn\'t foolproof. Application-level validation is still needed.'
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
				<span class="badge">CWE-1007</span>
				<span class="badge">Visual Spoofing</span>
			</div>
			<h1>Unicode & Homograph Attacks</h1>
			<p class="text-secondary">When characters aren't what they appear to be</p>
		</header>

		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Unicode homographs are lookalike characters from different alphabets.</strong>
				Cyrillic "а" looks like Latin "a" but is a different character. Attackers use this for phishing domains, bypassing filters, and username spoofing. Fix: normalize text with NFKC, detect mixed scripts, and validate against expected character sets.
			</p>
		</div>

		<section class="article-section">
			<h2>What are Unicode attacks?</h2>

			<div class="homograph-examples">
				<div class="homograph-example">
					<div class="example-label">Looks like</div>
					<div class="example-text">apple.com</div>
					<div class="example-label">Actually is</div>
					<div class="example-text spoofed">аррlе.com</div>
					<div class="example-note">Uses Cyrillic а, р, l, е</div>
				</div>
			</div>

			<div class="code-comparison">
				<div class="code-block code-bad">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable - No normalization</span>
						<span class="code-label-bad">Spoofing possible</span>
					</div>
					<pre><code>{`// Username uniqueness check
async function isUsernameAvailable(username) {
  // VULNERABLE: No normalization
  const existing = await db.users.findOne({ username });
  return !existing;
}

// "admin" and "аdmin" (Cyrillic а) are both allowed!
// Attacker registers "аdmin" to impersonate admin`}</code></pre>
				</div>
				<div class="code-block code-good">
					<div class="code-block-header">
						<span class="code-block-lang">Secure - Normalized comparison</span>
						<span class="code-label-good">Fixed</span>
					</div>
					<pre><code>{`import confusables from 'unicode-confusables';

async function isUsernameAvailable(username: string) {
  // Normalize to NFKC form
  const normalized = username.normalize('NFKC');

  // Check for confusable characters
  const skeleton = confusables.skeleton(normalized);

  // Reject if similar to existing usernames
  const similar = await db.users.findOne({
    skeleton: skeleton  // Store skeleton on registration
  });

  return !similar;
}`}</code></pre>
				</div>
			</div>
		</section>

		<section class="article-section">
			<h2>How to fix Unicode vulnerabilities</h2>

			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span class="fix-prompt-label">AI Fix Prompt</span>
					<button class="copy-btn" class:copied onclick={copyPrompt}>
						{copied ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<div class="fix-prompt-content" id="ai-fix-prompt">{`Protect against Unicode/homograph attacks.

## Required protections

### 1. Normalize all user input
\`\`\`typescript
// Use NFKC for security comparisons
const normalized = input.normalize('NFKC');
\`\`\`

### 2. Detect confusable characters
\`\`\`typescript
import confusables from 'unicode-confusables';

// Get "skeleton" - normalized form for comparison
const skeleton = confusables.skeleton(username);
// "аdmin" and "admin" have same skeleton
\`\`\`

### 3. Restrict character sets
\`\`\`typescript
// Only allow ASCII for usernames
const ASCII_ONLY = /^[a-zA-Z0-9_-]+$/;
if (!ASCII_ONLY.test(username)) {
  throw new Error('Only ASCII characters allowed');
}
\`\`\`

### 4. Detect mixed scripts
\`\`\`typescript
// Flag text mixing Latin + Cyrillic
function hasMixedScripts(text: string): boolean {
  const hasLatin = /[a-zA-Z]/.test(text);
  const hasCyrillic = /[\\u0400-\\u04FF]/.test(text);
  return hasLatin && hasCyrillic;
}
\`\`\``}</div>
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
				<a href="/kb/security/vulnerabilities/open-redirect/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Open Redirect</div>
					<p class="related-card-description">URL validation</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">XSS</div>
					<p class="related-card-description">Input validation</p>
				</a>
				<a href="/kb/security/vulnerabilities/typosquatting/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Typosquatting</div>
					<p class="related-card-description">Domain impersonation</p>
				</a>
			</div>
		</section>

		<div class="final-cta">
			<h2>Not all characters are what they seem</h2>
			<p>Normalize and validate Unicode input.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">Scan for spoofing risks</a>
		</div>
	</article>
</div>

<style>
	.badge-row { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }

	.homograph-examples { background: var(--bg-secondary); border: 1px solid var(--border); padding: 1.5rem; margin: 1.5rem 0; }
	.homograph-example { text-align: center; }
	.example-label { font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 0.25rem; }
	.example-text { font-size: 1.5rem; font-family: 'JetBrains Mono', monospace; margin-bottom: 0.5rem; }
	.example-text.spoofed { color: var(--red); }
	.example-note { font-size: 0.8125rem; color: var(--text-secondary); }

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
