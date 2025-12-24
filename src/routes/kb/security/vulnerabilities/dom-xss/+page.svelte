<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'DOM XSS: Client-Side Script Injection in SPAs',
		description: 'DOM XSS happens entirely in the browser. WAFs can\'t see it. Ranked #3 OWASP Top 10. Fix prompts for React, Vue, Angular & Svelte.',
		url: '/kb/security/vulnerabilities/dom-xss/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'DOM XSS' }
	];

	// Real external data sources
	const owaspData = {
		ranking: '#3',
		category: 'A03:2021 - Injection',
		source: 'https://owasp.org/Top10/A03_2021-Injection/',
		cweId: 'CWE-79',
		cweSource: 'https://cwe.mitre.org/data/definitions/79.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What\'s the difference between DOM XSS and regular XSS?',
			answer: 'DOM XSS happens entirely in the browser. The malicious payload never touches the server, so server-side security tools like WAFs can\'t see it. Regular reflected/stored XSS involves server-side rendering where the server injects the payload. DOM XSS is Type 0, Reflected is Type 1, Stored is Type 2. Same damage, different attack surface.'
		},
		{
			question: 'Does React protect me from DOM XSS by default?',
			answer: 'Not if you use dangerouslySetInnerHTML. That\'s the escape hatch that bypasses React\'s built-in XSS protection. The moment you set innerHTML via that property, you\'re vulnerable. Snyk found 3 XSS vulnerabilities in React core itself. The framework helps, but it doesn\'t save you from yourself.'
		},
		{
			question: 'Can Content Security Policy (CSP) block DOM XSS attacks?',
			answer: 'Yes, but only if configured correctly. CSP can block inline scripts and restrict script sources. The problem is most developers ship weak CSP policies or none at all. A strict CSP with nonces or hashes works. The default unsafe-inline CSP does nothing. Google paid $5,000 for a CSP bypass in one of their properties.'
		},
		{
			question: 'Why is DOM XSS harder to detect than other vulnerabilities?',
			answer: 'Because it never touches the server. Traditional security scanners look at HTTP traffic. DOM XSS executes entirely in JavaScript after the page loads. You need a browser-based scanner or manual code review. Automated tools miss it unless they can run JavaScript and trace data flow from sources like location.hash to sinks like innerHTML.'
		},
		{
			question: 'Do single-page applications have more DOM XSS risk?',
			answer: 'Yes. SPAs rely heavily on client-side routing, URL fragments, and dynamic DOM manipulation. Every framework has a dangerous template directive: React\'s dangerouslySetInnerHTML, Vue\'s v-html, Angular\'s bypassSecurityTrustHtml, Svelte\'s @html. 98% of websites use JavaScript client-side. That\'s 98% of the web exposed to this attack vector.'
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
			{"@type": "ListItem", "position": 4, "name": "DOM XSS"}
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
				<span class="badge badge-high">High</span>
				<span class="badge">CWE-79</span>
				<span class="badge">OWASP A03:2021</span>
			</div>
			<h1>DOM XSS in Vibe Coded SPAs</h1>
			<p class="text-secondary">How to find and fix client-side script injection that bypasses server security</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>DOM XSS lets attackers inject malicious JavaScript that runs entirely in the victim's browser, never touching your server.</strong>
				It exploits dangerous JavaScript APIs like innerHTML, document.write, and eval. WAFs can't detect it. Server logs won't show it.
				Ranked <a href="https://owasp.org/Top10/A03_2021-Injection/">#3 on OWASP Top 10</a> as part of injection attacks.
				Every major JavaScript framework has a dangerous escape hatch that vibe coders use without understanding the risk.
			</p>
		</div>

		<!-- Stats Box - Real OWASP Data -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{owaspData.ranking}</div>
				<div class="stat-label">OWASP Ranking</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">98%</div>
				<div class="stat-label">Sites Use JS</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">22,254</div>
				<div class="stat-label">CVEs (2024)</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Sources: <a href={owaspData.source}>OWASP Top 10 (2021)</a>, <a href="https://w3techs.com/technologies/details/cp-javascript">W3Techs JavaScript Usage (2025)</a>, <a href="https://www.cvedetails.com/vulnerability-list/year-2024/opxss-1/xss.html">CVE Details XSS Stats</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is DOM XSS?</h2>
			<p>
				DOM-based Cross-Site Scripting (DOM XSS) is client-side code injection that happens entirely in the browser.
				An attacker crafts a malicious URL with JavaScript in it. When a victim clicks the link, your JavaScript code takes data from the URL and inserts it directly into the page DOM without sanitization.
				The malicious script executes. Session cookies get stolen. User accounts get compromised.
			</p>
			<p>
				Unlike reflected or stored XSS where the payload goes through your server, DOM XSS never touches server-side code.
				The vulnerability exists purely in your JavaScript. Your WAF won't see it. Your server logs won't catch it. Traditional security tools are blind to DOM XSS.
			</p>
			<p>
				According to <a href="https://owasp.org/Top10/A03_2021-Injection/">OWASP Top 10 (2021)</a>, injection attacks (including XSS) rank #3 in web application risks.
				DOM XSS is classified as <a href={owaspData.cweSource}>CWE-79</a> and represents Type 0 XSS in the traditional classification.
				The <a href="https://cwe.mitre.org/top25/archive/2024/2024_cwe_top25.html">CWE Top 25 (2024)</a> lists Cross-site Scripting at #2 with 22,254 CVEs by mid-2024, a 30% increase year-over-year.
			</p>
			<p>
				<a href="https://w3techs.com/technologies/details/cp-javascript">98% of all websites use JavaScript client-side</a>.
				That's 98% of the web potentially vulnerable to DOM XSS if developers don't understand sources and sinks.
			</p>
		</section>

		<!-- How It Works - Sources and Sinks -->
		<section class="article-section">
			<h2>Sources and sinks: how DOM XSS works</h2>
			<p>
				DOM XSS happens when untrusted data flows from a <strong>source</strong> to a dangerous <strong>sink</strong> without sanitization.
				Understanding these two concepts is how you audit code for DOM XSS.
			</p>

			<h3>Common sources (attacker-controlled input)</h3>
			<ul>
				<li><code>location.hash</code> - The URL fragment after #</li>
				<li><code>location.search</code> - Query parameters like ?id=123</li>
				<li><code>document.referrer</code> - The previous page URL</li>
				<li><code>window.name</code> - Window name property</li>
				<li><code>postMessage</code> events - Cross-origin messages</li>
				<li><code>document.cookie</code> - Cookie data (if attacker-influenced)</li>
			</ul>

			<h3>Dangerous sinks (code execution points)</h3>
			<ul>
				<li><code>innerHTML</code> - Parses HTML and executes scripts</li>
				<li><code>outerHTML</code> - Same as innerHTML but replaces element</li>
				<li><code>document.write()</code> - Writes HTML directly to page</li>
				<li><code>eval()</code> - Executes arbitrary JavaScript</li>
				<li><code>setTimeout(string)</code> - Executes string as code</li>
				<li><code>setInterval(string)</code> - Repeatedly executes string</li>
				<li><code>Function()</code> constructor - Creates function from string</li>
				<li>jQuery <code>.html()</code> - Sets innerHTML via jQuery</li>
			</ul>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Classic DOM XSS Example</span>
				</div>
				<pre><code>{`// Vulnerable code - source to sink with no sanitization
const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('name');
document.getElementById('greeting').innerHTML = 'Hello ' + userName;

// Attack URL:
// https://example.com/page?name=<img src=x onerror=alert(document.cookie)>

// Result: Script executes, cookie stolen`}</code></pre>
			</div>

			<p>
				When source data flows to a sink without validation, you have DOM XSS.
				The attacker controls the source (URL parameters), your code puts it in a sink (innerHTML), game over.
			</p>
		</section>

		<!-- Framework Patterns -->
		<section class="article-section">
			<h2>Framework-specific DOM XSS patterns</h2>
			<p>
				Every major JavaScript framework has a dangerous escape hatch that bypasses built-in XSS protection.
				AI coding tools generate these patterns constantly because they make the code "work."
				Understanding each framework's vulnerability is critical for vibe coders.
			</p>

			<!-- React -->
			<h3>React: dangerouslySetInnerHTML</h3>
			<p>
				React escapes user content by default. The moment you use <code>dangerouslySetInnerHTML</code>, you bypass that protection.
				<a href="https://snyk.io/blog/5-react-security-vulnerabilities/">Snyk found 3 XSS vulnerabilities in React core</a>, proving even battle-tested frameworks have edge cases.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-block-header">
						<span class="code-block-lang status-bad">VULNERABLE - React</span>
					</div>
					<pre><code>{`function UserProfile() {
  const params = new URLSearchParams(window.location.search);
  const bio = params.get('bio');

  return (
    <div
      dangerouslySetInnerHTML={{ __html: bio }}
    />
  );
}

// Attack URL: ?bio=<img src=x onerror=alert(1)>
// Result: Script executes`}</code></pre>
				</div>

				<div class="code-block secure">
					<div class="code-block-header">
						<span class="code-block-lang status-good">SECURE - React</span>
					</div>
					<pre><code>{`import DOMPurify from 'dompurify';

function UserProfile() {
  const params = new URLSearchParams(window.location.search);
  const bio = params.get('bio');
  const clean = DOMPurify.sanitize(bio);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}

// Attack URL: ?bio=<img src=x onerror=alert(1)>
// Result: DOMPurify strips malicious code`}</code></pre>
				</div>
			</div>

			<!-- Vue -->
			<h3>Vue: v-html directive</h3>
			<p>
				Vue escapes template content by default using mustache syntax.
				The <code>v-html</code> directive renders raw HTML and is the primary DOM XSS vector in Vue apps.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-block-header">
						<span class="code-block-lang status-bad">VULNERABLE - Vue</span>
					</div>
					<pre><code>{`<template>
  <div v-html="userContent"></div>
</template>

<script>
export default {
  data() {
    return {
      userContent: new URLSearchParams(location.search).get('content')
    }
  }
}
</script>

<!-- Attack URL: ?content=<img src=x onerror=alert(1)> -->
<!-- Result: Script executes -->`}</code></pre>
				</div>

				<div class="code-block secure">
					<div class="code-block-header">
						<span class="code-block-lang status-good">SECURE - Vue</span>
					</div>
					<pre><code>{`<template>
  <div v-html="sanitizedContent"></div>
</template>

<script>
import DOMPurify from 'dompurify';

export default {
  data() {
    return {
      userContent: new URLSearchParams(location.search).get('content')
    }
  },
  computed: {
    sanitizedContent() {
      return DOMPurify.sanitize(this.userContent);
    }
  }
}
</script>

<!-- Attack URL: ?content=<img src=x onerror=alert(1)> -->
<!-- Result: DOMPurify strips malicious code -->`}</code></pre>
				</div>
			</div>

			<!-- Angular -->
			<h3>Angular: bypassSecurityTrustHtml</h3>
			<p>
				Angular sanitizes templates by default. The <code>bypassSecurityTrustHtml</code> method tells Angular to skip sanitization.
				Use it with untrusted input and you have DOM XSS.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-block-header">
						<span class="code-block-lang status-bad">VULNERABLE - Angular</span>
					</div>
					<pre><code>{`import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-content',
  template: '<div [innerHTML]="trustedHtml"></div>'
})
export class ContentComponent {
  trustedHtml: any;

  constructor(private sanitizer: DomSanitizer) {
    const params = new URLSearchParams(window.location.search);
    const html = params.get('html');
    this.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

// Attack URL: ?html=<img src=x onerror=alert(1)>
// Result: Script executes`}</code></pre>
				</div>

				<div class="code-block secure">
					<div class="code-block-header">
						<span class="code-block-lang status-good">SECURE - Angular</span>
					</div>
					<pre><code>{`import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import DOMPurify from 'dompurify';

@Component({
  selector: 'app-content',
  template: '<div [innerHTML]="trustedHtml"></div>'
})
export class ContentComponent {
  trustedHtml: any;

  constructor(private sanitizer: DomSanitizer) {
    const params = new URLSearchParams(window.location.search);
    const html = params.get('html');
    const clean = DOMPurify.sanitize(html);
    this.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(clean);
  }
}

// Attack URL: ?html=<img src=x onerror=alert(1)>
// Result: DOMPurify strips malicious code before bypass`}</code></pre>
				</div>
			</div>

			<!-- Svelte -->
			<h3>Svelte: @html tag</h3>
			<p>
				Svelte escapes content in curly braces by default. The <code>@html</code> tag renders raw HTML and is the DOM XSS vector.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-block-header">
						<span class="code-block-lang status-bad">VULNERABLE - Svelte</span>
					</div>
					<pre><code>{`<script>
  const params = new URLSearchParams(window.location.search);
  const content = params.get('content');
</script>

{@html content}

<!-- Attack URL: ?content=<img src=x onerror=alert(1)> -->
<!-- Result: Script executes -->`}</code></pre>
				</div>

				<div class="code-block secure">
					<div class="code-block-header">
						<span class="code-block-lang status-good">SECURE - Svelte</span>
					</div>
					<pre><code>{`<script>
  import DOMPurify from 'dompurify';

  const params = new URLSearchParams(window.location.search);
  const content = params.get('content');
  const clean = DOMPurify.sanitize(content);
</script>

{@html clean}

<!-- Attack URL: ?content=<img src=x onerror=alert(1)> -->
<!-- Result: DOMPurify strips malicious code -->`}</code></pre>
				</div>
			</div>

			<!-- jQuery -->
			<h3>jQuery: .html() and .append()</h3>
			<p>
				jQuery's <code>.html()</code> and <code>.append()</code> methods are direct innerHTML wrappers.
				<a href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-11023">CVE-2020-11023</a> was a DOM XSS in jQuery itself.
				Even security-focused libraries have vulnerabilities.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-block-header">
						<span class="code-block-lang status-bad">VULNERABLE - jQuery</span>
					</div>
					<pre><code>{`const params = new URLSearchParams(window.location.search);
const message = params.get('msg');

$('#message').html(message);
// or
$('#message').append(message);

// Attack URL: ?msg=<img src=x onerror=alert(1)>
// Result: Script executes`}</code></pre>
				</div>

				<div class="code-block secure">
					<div class="code-block-header">
						<span class="code-block-lang status-good">SECURE - jQuery</span>
					</div>
					<pre><code>{`import DOMPurify from 'dompurify';

const params = new URLSearchParams(window.location.search);
const message = params.get('msg');
const clean = DOMPurify.sanitize(message);

$('#message').html(clean);
// or better - use .text() for plain text
$('#message').text(message);

// Attack URL: ?msg=<img src=x onerror=alert(1)>
// Result: Either sanitized or rendered as plain text`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Real-World Impact -->
		<section class="article-section">
			<h2>What could happen if I have DOM XSS?</h2>
			<p>
				DOM XSS has the same impact as any XSS attack. The difference is detection and prevention are harder because server-side tools can't see it.
			</p>
			<ul class="consequences-list">
				<li><strong>Session hijacking:</strong> Attacker steals session cookies via document.cookie and impersonates the victim. No password needed. Full account access.</li>
				<li><strong>Credential theft:</strong> Inject a fake login form that sends credentials to attacker's server. Users type their password into what looks like your login page. It's not.</li>
				<li><strong>Keylogging:</strong> Install an event listener that captures every keystroke. Credit cards, passwords, private messages. All recorded and exfiltrated.</li>
				<li><strong>Defacement:</strong> Replace page content with malicious messaging. Make it look like your site was hacked. Damage brand reputation instantly.</li>
				<li><strong>Cryptocurrency mining:</strong> Inject a script that mines cryptocurrency using victim's CPU. Browser slows to a crawl. They blame your site for poor performance.</li>
				<li><strong>Phishing redirects:</strong> Redirect users to fake pages that look identical to your site. Harvest credentials at scale. Google paid $5,000 for a DOM XSS vulnerability in their bug bounty program.</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect DOM XSS?</h2>
			<p>
				Traditional security scanners struggle with DOM XSS because it requires JavaScript execution and data flow analysis.
				Manual code review is the gold standard. Look for data flowing from sources to sinks.
			</p>

			<h3>Manual detection patterns</h3>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Search patterns</span>
				</div>
				<pre><code>{`// Search for dangerous sinks
innerHTML
outerHTML
document.write
eval(
setTimeout(
setInterval(
Function(

// Search for source access
location.hash
location.search
document.referrer
window.name
postMessage

// Framework-specific
dangerouslySetInnerHTML  // React
v-html                   // Vue
bypassSecurityTrustHtml  // Angular
@html                    // Svelte
.html(                   // jQuery
.append(                 // jQuery

// Regex patterns
\\.innerHTML\\s*=
dangerouslySetInnerHTML.*:
v-html=
bypassSecurityTrustHtml\\(
@html\\s
\\.html\\(`}</code></pre>
			</div>

			<h3>Automated scanning</h3>
			<p>
				Browser-based scanners can detect DOM XSS by executing JavaScript and tracing data flow.
				<a href="https://scanner.vibeship.co">VibeShip Scanner</a> uses opengrep rules that detect source-to-sink patterns in React, Vue, Angular, and Svelte code.
			</p>

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
			<h2>How do I fix DOM XSS?</h2>
			<p>
				Three defense strategies work: avoid dangerous sinks entirely, sanitize before using sinks, or deploy Content Security Policy.
				The best approach is defense in depth - use all three.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>This prompt finds and fixes DOM XSS across all major frameworks. Copy it into Cursor, Claude Code, or Bolt:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all DOM XSS vulnerabilities in my codebase.

## What to look for

Search for data flowing from sources to dangerous sinks:

### Sources (attacker-controlled input):
- location.hash
- location.search
- document.referrer
- window.name
- postMessage events

### Dangerous sinks (code execution):
- innerHTML
- outerHTML
- document.write()
- eval()
- setTimeout(string)
- setInterval(string)
- jQuery .html() / .append()

### Framework escape hatches:
- React: dangerouslySetInnerHTML
- Vue: v-html directive
- Angular: bypassSecurityTrustHtml
- Svelte: @html tag

## How to fix

### Option 1: Avoid dangerous sinks (best)

Use safe alternatives that don't execute scripts:

\`\`\`javascript
// AVOID: innerHTML
element.innerHTML = userInput;

// USE: textContent (safe - renders as plain text)
element.textContent = userInput;

// AVOID: jQuery .html()
$('#div').html(userInput);

// USE: jQuery .text()
$('#div').text(userInput);
\`\`\`

### Option 2: Sanitize with DOMPurify (when HTML needed)

Install DOMPurify: npm install dompurify

\`\`\`javascript
import DOMPurify from 'dompurify';

// React
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />

// Vue
<div v-html="DOMPurify.sanitize(html)"></div>

// Angular
import DOMPurify from 'dompurify';
this.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(
  DOMPurify.sanitize(html)
);

// Svelte
{@html DOMPurify.sanitize(content)}

// Vanilla JS
element.innerHTML = DOMPurify.sanitize(userInput);
\`\`\`

### Option 3: Content Security Policy (defense in depth)

Add CSP headers to block inline scripts:

\`\`\`
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{random}';
  object-src 'none';
\`\`\`

Use nonces or hashes for inline scripts. Never use 'unsafe-inline'.

### Trusted Types API (Chrome 83+)

Enable Trusted Types to enforce safe DOM manipulation:

\`\`\`javascript
// In HTML
<meta http-equiv="Content-Security-Policy"
      content="require-trusted-types-for 'script'">

// In code
const policy = trustedTypes.createPolicy('default', {
  createHTML: (string) => DOMPurify.sanitize(string)
});

element.innerHTML = policy.createHTML(userInput);
\`\`\`

## Framework-specific notes

- React: Avoid dangerouslySetInnerHTML unless absolutely necessary
- Vue: Prefer mustache syntax over v-html
- Angular: Let Angular's sanitizer work; only bypass with sanitized input
- Svelte: Avoid @html tag for user content
- jQuery: Use .text() instead of .html() for plain text

## After fixing

1. Search for remaining dangerous patterns
2. Add CSP headers to your server config
3. Consider Trusted Types API for modern browsers
4. Test with payloads: <img src=x onerror=alert(1)>
5. List all files modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Defense in Depth -->
			<div class="fix-section">
				<h3>Defense in depth strategy</h3>
				<p>The most secure approach uses multiple layers:</p>

				<div class="table-wrapper">
					<table>
						<thead>
							<tr>
								<th>Layer</th>
								<th>Defense</th>
								<th>Effectiveness</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1. Avoid sinks</td>
								<td>Use textContent instead of innerHTML</td>
								<td>100% - no vulnerability if sink not used</td>
							</tr>
							<tr>
								<td>2. Sanitize input</td>
								<td>DOMPurify before rendering</td>
								<td>99% - strips malicious payloads</td>
							</tr>
							<tr>
								<td>3. CSP headers</td>
								<td>Block inline scripts with nonces</td>
								<td>90% - stops most XSS attempts</td>
							</tr>
							<tr>
								<td>4. Trusted Types</td>
								<td>Enforce safe DOM APIs (Chrome only)</td>
								<td>95% - catches violations at runtime</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<!-- DOMPurify Configuration -->
			<div class="fix-section">
				<h3>DOMPurify configuration</h3>
				<p>DOMPurify works out of the box, but you can customize it for stricter security:</p>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">javascript</span>
					</div>
					<pre><code>{`import DOMPurify from 'dompurify';

// Strict configuration - removes all attributes
const clean = DOMPurify.sanitize(dirty, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
  ALLOWED_ATTR: ['href']
});

// Allow custom tags but sanitize attributes
const clean = DOMPurify.sanitize(dirty, {
  ADD_TAGS: ['custom-element'],
  FORBID_ATTR: ['onerror', 'onclick']
});

// Return plain text only
const clean = DOMPurify.sanitize(dirty, {
  ALLOWED_TAGS: []
});

// Use hooks for custom logic
DOMPurify.addHook('afterSanitizeAttributes', function(node) {
  // Force all links to open in new tab
  if (node.tagName === 'A') {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
});`}</code></pre>
				</div>
			</div>

			<!-- CSP Implementation -->
			<div class="fix-section">
				<h3>Content Security Policy implementation</h3>
				<p>CSP blocks XSS attacks by restricting where scripts can come from. Here's how to deploy it:</p>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">CSP Header Examples</span>
					</div>
					<pre><code>{`# Strict CSP (recommended)
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{random}';
  style-src 'self' 'nonce-{random}';
  img-src 'self' https:;
  object-src 'none';
  base-uri 'self';

# Next.js middleware
// middleware.ts
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const cspHeader = \`
    default-src 'self';
    script-src 'self' 'nonce-\${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-\${nonce}';
    object-src 'none';
  \`;

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', cspHeader);
  return response;
}

# Express server
app.use((req, res, next) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  res.locals.nonce = nonce;
  res.setHeader(
    'Content-Security-Policy',
    \`default-src 'self'; script-src 'self' 'nonce-\${nonce}';\`
  );
  next();
});

# HTML with nonce
<script nonce="<%= nonce %>">
  // Your inline script
</script>`}</code></pre>
				</div>

				<p>
					<strong>Important:</strong> Never use <code>'unsafe-inline'</code> or <code>'unsafe-eval'</code> in CSP.
					They defeat the entire purpose of CSP and leave you vulnerable.
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
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">Database injection via unsanitized queries</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Cross-Site Scripting (XSS)</div>
					<p class="related-card-description">Reflected and stored XSS attacks</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated code</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find DOM XSS before attackers do</h2>
			<p>Client-side vulnerabilities hide in plain sight. Server tools can't see them.</p>
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
