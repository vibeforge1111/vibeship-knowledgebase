<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'HTTP Response Splitting: Detect & Fix Guide',
		description: 'HTTP response splitting injects headers via CRLF characters, enabling cache poisoning and XSS. Learn to detect and sanitize header values.',
		url: '/kb/security/vulnerabilities/http-response-splitting/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'HTTP Response Splitting' }
	];

	const faqs = [
		{
			question: 'What is HTTP response splitting?',
			answer: 'HTTP response splitting injects CRLF (\\r\\n) characters into HTTP headers. This allows attackers to terminate headers and inject new ones, or even inject a second HTTP response. It can lead to cache poisoning, XSS, and session hijacking.'
		},
		{
			question: 'How do I prevent response splitting?',
			answer: 'Sanitize all user input before using in HTTP headers. Remove or encode CRLF characters (\\r, \\n). Use framework methods that automatically sanitize header values. Never directly concatenate user input into headers.'
		},
		{
			question: 'What characters cause response splitting?',
			answer: 'The dangerous characters are carriage return (\\r, %0D) and line feed (\\n, %0A). Together they form CRLF which terminates HTTP headers. Some frameworks also need to handle standalone CR or LF.'
		},
		{
			question: 'Is response splitting still relevant?',
			answer: 'Modern frameworks often sanitize header values automatically, making it less common. However, custom header setting, older frameworks, and edge cases still create vulnerabilities. Always validate rather than assuming protection.'
		},
		{
			question: 'How does response splitting enable XSS?',
			answer: 'By injecting CRLF twice (\\r\\n\\r\\n), attackers end the headers and start the response body. They can then inject arbitrary HTML/JavaScript that executes in the victim\'s browser. The response appears legitimate because it comes from the trusted server.'
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
				<span class="badge">CWE-113</span>
				<span class="badge">OWASP A03</span>
			</div>
			<h1>HTTP Response Splitting in Vibe Coded Apps</h1>
			<p class="text-secondary">When CRLF characters hijack your HTTP responses</p>
		</header>

		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Response splitting injects CRLF (\\r\\n) into HTTP headers.</strong>
				If user input goes into headers like <code>Set-Cookie</code> or <code>Location</code> without sanitization, attackers can inject new headers or entire response bodies. Fix: strip or encode \\r and \\n from all header values.
			</p>
		</div>

		<section class="article-section">
			<h2>What is HTTP response splitting?</h2>
			<p>
				HTTP headers are separated by CRLF (carriage return + line feed). If you put user input into a header without sanitizing CRLF characters, attackers can inject additional headers—or terminate headers entirely and inject response body content.
			</p>

			<div class="code-comparison">
				<div class="code-block code-bad">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable - User input in header</span>
						<span class="code-label-bad">CRLF injectable</span>
					</div>
					<pre><code>{`// User controls the redirect URL
app.get('/redirect', (req, res) => {
  const url = req.query.url;
  // VULNERABLE: CRLF not sanitized
  res.setHeader('Location', url);
  res.status(302).end();
});

// Attack: ?url=http://evil.com%0D%0ASet-Cookie:%20admin=true
// Results in:
// Location: http://evil.com
// Set-Cookie: admin=true`}</code></pre>
				</div>
				<div class="code-block code-good">
					<div class="code-block-header">
						<span class="code-block-lang">Secure - Sanitized headers</span>
						<span class="code-label-good">Fixed</span>
					</div>
					<pre><code>{`// Sanitize CRLF from header values
function sanitizeHeader(value: string): string {
  return value.replace(/[\\r\\n]/g, '');
}

app.get('/redirect', (req, res) => {
  const url = req.query.url;
  // Validate URL and sanitize
  if (!isValidRedirectUrl(url)) {
    return res.status(400).send('Invalid URL');
  }
  res.setHeader('Location', sanitizeHeader(url));
  res.status(302).end();
});`}</code></pre>
				</div>
			</div>
		</section>

		<section class="article-section">
			<h2>How to fix response splitting</h2>

			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span class="fix-prompt-label">AI Fix Prompt</span>
					<button class="copy-btn" class:copied onclick={copyPrompt}>
						{copied ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<div class="fix-prompt-content" id="ai-fix-prompt">{`Find and fix HTTP response splitting vulnerabilities.

## Search for
- res.setHeader() with user input
- res.header() with user input
- Set-Cookie with user values
- Location header with user URLs
- Custom header values from request

## Fix pattern
\`\`\`typescript
function sanitizeHeaderValue(value: string): string {
  // Remove all CR and LF characters
  return String(value).replace(/[\\r\\n\\x00]/g, '');
}

// Apply to all user-controlled header values
res.setHeader('X-Custom', sanitizeHeaderValue(userInput));
\`\`\`

## Test with
- %0D%0A (URL-encoded CRLF)
- %0D (carriage return only)
- %0A (line feed only)
- Nested encoding: %250D%250A`}</div>
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
				<a href="/kb/security/vulnerabilities/header-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Header Injection</div>
					<p class="related-card-description">HTTP header manipulation</p>
				</a>
				<a href="/kb/security/vulnerabilities/open-redirect/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Open Redirect</div>
					<p class="related-card-description">Unvalidated redirects</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">XSS</div>
					<p class="related-card-description">Script injection attacks</p>
				</a>
			</div>
		</section>

		<div class="final-cta">
			<h2>Headers need sanitization too</h2>
			<p>CRLF characters can hijack your responses.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">Scan for header vulnerabilities</a>
		</div>
	</article>
</div>

<style>
	.badge-row { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
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
