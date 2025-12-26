<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Typosquatting: The Hidden Threat in AI-Generated Dependencies',
		description: 'Typosquatting attacks hijack your app through misspelled package names. ua-parser-js, event-stream, crossenv - learn from famous npm attacks. Fix prompts for vibe coders.',
		url: '/kb/security/vulnerabilities/typosquatting/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Typosquatting' }
	];

	// Real external data sources
	const cweData = {
		cweId: 'CWE-1357',
		cweName: 'Reliance on Uncontrolled Component',
		cweSource: 'https://cwe.mitre.org/data/definitions/1357.html',
		severity: 'High'
	};

	// Famous incidents for @breachlore persona
	const incidents = [
		{
			name: 'event-stream',
			year: '2018',
			impact: 'Bitcoin wallet theft',
			details: 'Malicious maintainer injected cryptocurrency-stealing code'
		},
		{
			name: 'ua-parser-js',
			year: '2021',
			impact: '7.8M weekly downloads compromised',
			details: 'Cryptominer and password stealer injected into legitimate package'
		},
		{
			name: 'crossenv',
			year: '2017',
			impact: 'Credential theft',
			details: 'Typosquat of cross-env harvested npm credentials'
		}
	];

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is typosquatting in npm and PyPI?',
			answer: 'Typosquatting is when attackers register package names that look like popular libraries but with slight misspellings. lodahs instead of lodash, reqeusts instead of requests. When developers mistype or when AI tools hallucinate package names, the malicious package gets installed. The code runs with full system access during npm install or pip install.'
		},
		{
			question: 'Why do AI coding tools make typosquatting worse?',
			answer: 'AI tools hallucinate package names that sound right but do not exist. They also suggest packages based on training data that may include malicious or deprecated packages. When vibe coding, developers often copy-paste AI suggestions without verifying the package exists or checking its legitimacy. Speed replaces verification.'
		},
		{
			question: 'How do I check if a package is legitimate?',
			answer: 'Check the package on npm or PyPI directly. Look at weekly downloads, last publish date, GitHub repository link, and maintainer history. Legitimate packages have consistent download numbers, active maintenance, and verified repository links. Suspicious packages often have very low downloads, recent creation dates, and missing or fake repository links.'
		},
		{
			question: 'Can typosquatting attacks steal my credentials?',
			answer: 'Yes. Malicious packages run arbitrary code during installation. They can read environment variables containing API keys, access .env files, scan for SSH keys, exfiltrate npm tokens, and install persistent backdoors. The crossenv attack in 2017 specifically targeted npm credentials. Your CI/CD environment is especially vulnerable.'
		},
		{
			question: 'What tools detect typosquatting packages?',
			answer: 'Use lockfile auditing with npm audit and pip-audit. Enable package-lock.json and Pipfile.lock to prevent version drift. Tools like Socket.dev detect suspicious install scripts. VibeShip Scanner flags AI-suggested packages against known typosquats. Always review new dependencies before installing.'
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
			{"@type": "ListItem", "position": 4, "name": "Typosquatting"}
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
				<span class="badge badge-high">High</span>
				<span class="badge">{cweData.cweId}</span>
				<span class="badge">Supply Chain</span>
			</div>
			<h1>Typosquatting in AI-Generated Dependencies</h1>
			<p class="text-secondary">When a single typo installs malware: lessons from event-stream, ua-parser-js, and crossenv</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Typosquatting attacks exploit misspelled package names to install malicious code on your machine.</strong>
				When AI tools suggest <code>lodashs</code> instead of <code>lodash</code>, or when vibe coders rush through installation, attackers win.
				The <a href="https://blog.npmjs.org/post/163723642530/crossenv-malware-on-the-npm-registry">crossenv incident (2017)</a> stole npm credentials.
				The <a href="https://github.com/advisories/GHSA-pjwm-rvh2-c64f">ua-parser-js attack (2021)</a> hit 7.8 million weekly downloads.
				This is supply chain security at its most dangerous.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{cweData.cweId}</div>
				<div class="stat-label"><a href={cweData.cweSource}>CWE ID</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">700+</div>
				<div class="stat-label">Typosquats Removed (2023)</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">7.8M</div>
				<div class="stat-label">ua-parser-js Downloads/Week</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Sources: <a href="https://cwe.mitre.org/data/definitions/1357.html">MITRE CWE-1357</a>, <a href="https://blog.phylum.io/npm-typosquatting-attacks-surge-in-2023/">Phylum Research 2023</a>
		</p>

		<!-- Historical Timeline - @breachlore signature -->
		<section class="article-section">
			<h2>A brief history of dependency disasters</h2>
			<p>
				November 2018. A developer named Dominic Tarr handed over maintenance of event-stream to a stranger on GitHub. Within months, that stranger injected code targeting the Copay Bitcoin wallet. Millions in cryptocurrency, gone. The attack hid in plain sight for weeks before anyone noticed.
			</p>
			<p>
				October 2021. The maintainer account for ua-parser-js got compromised. This package, downloaded 7.8 million times per week, suddenly started installing cryptominers and password stealers. Companies like Amazon, Google, and Microsoft had it in their dependency trees. The malicious versions were live for hours before detection.
			</p>
			<p>
				July 2017. Someone registered <code>crossenv</code> on npm, a typosquat of the popular <code>cross-env</code> package. When developers mistyped the install command, they got credential-stealing malware. The package harvested npm tokens and sent them to an external server.
			</p>
			<p>
				Different years. Different attack vectors. Same lesson: your dependencies are only as trustworthy as the weakest link in the supply chain. And when AI tools generate your package.json, that chain gets longer.
			</p>

			<div class="timeline-box">
				<h3>Notable typosquatting incidents</h3>
				<div class="timeline-grid">
					{#each incidents as incident}
						<div class="timeline-item">
							<div class="timeline-year">{incident.year}</div>
							<div class="timeline-content">
								<strong class="timeline-package">{incident.name}</strong>
								<span class="timeline-impact">{incident.impact}</span>
								<p class="timeline-details">{incident.details}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is typosquatting?</h2>
			<p>
				Typosquatting is social engineering meets package registries. Attackers register package names that look almost identical to popular libraries. <code>reqeusts</code> instead of <code>requests</code>. <code>lodashs</code> instead of <code>lodash</code>. <code>electorn</code> instead of <code>electron</code>. One keystroke difference, completely different code.
			</p>
			<p>
				The malicious package contains real functionality, often copied from the legitimate package. But it also contains extra code that runs during installation. By the time npm install finishes, the damage is done. Environment variables exfiltrated. SSH keys copied. Backdoors installed. All with the permissions of whoever ran the install command.
			</p>
			<p>
				This vulnerability maps to <a href="https://cwe.mitre.org/data/definitions/1357.html">CWE-1357: Reliance on Uncontrolled Component</a>. Your application depends on external code you do not control, from sources you cannot fully verify. The package registry model assumes good faith. Attackers do not operate in good faith.
			</p>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>How do AI tools cause typosquatting vulnerabilities?</h2>
			<p>
				AI coding tools introduce a new attack surface: hallucinated packages. When Claude Code or Cursor generates a package.json, it suggests packages that sound right based on training data. Sometimes those packages do not exist. Sometimes they are typosquats waiting to be installed.
			</p>

			<div class="tool-patterns-box">
				<h3>The pattern behind vibe coded supply chain attacks</h3>
				<p>Ask an AI tool to set up a project. This is what can happen:</p>
				<div class="code-block">
					<pre><code>{`// AI-generated package.json (problematic suggestions)
{
  "dependencies": {
    "lodahs": "^4.17.21",        // Typo - lodash
    "colour": "^3.2.1",          // UK spelling - real package but different from colors
    "electorn": "^28.0.0",       // Typo - electron
    "cross-env ": "^7.0.3"       // Trailing space - could be exploited
  }
}`}</code></pre>
				</div>
				<p class="pattern-note">
					AI tools optimize for plausible-sounding names, not verified packages.
					The model has seen thousands of package.json files in training. It generates statistically likely names, not validated ones.
					Vibe coders copy and paste without checking.
				</p>
			</div>

			<p>
				<strong>Why AI makes this worse:</strong> Traditional typosquatting required developers to mistype. AI tools generate typos automatically. They also suggest packages from training data that may have been removed for being malicious. The speed of vibe coding means less verification. One prompt, one paste, one compromised machine.
			</p>

			<p>
				Cursor, Claude Code, Bolt, GitHub Copilot. Every major AI coding tool can suggest packages that do not exist or are malicious variants. The model has no way to verify against the live npm registry. It generates based on patterns, not reality.
			</p>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What happens when you install a typosquat?</h2>
			<p>
				The event-stream attack showed exactly what happens. Cryptocurrency theft. But typosquatting attacks can do much more.
			</p>
			<ul class="consequences-list">
				<li><strong>Credential exfiltration:</strong> The crossenv attack harvested npm tokens during install. Those tokens provide publish access to every package you maintain. Attackers can inject malware into your legitimate packages.</li>
				<li><strong>Cryptomining:</strong> The ua-parser-js compromise installed cryptominers that ran in the background. Your CI/CD machines become someone else's mining farm. CPU usage spikes. Builds slow down. You pay the electricity.</li>
				<li><strong>Backdoor installation:</strong> Malicious packages can add SSH keys, create new user accounts, or install remote access tools. The package uninstalls, but the backdoor remains.</li>
				<li><strong>Source code theft:</strong> Packages run with your permissions. They can read your entire codebase, find API keys in .env files, and exfiltrate proprietary code to external servers.</li>
				<li><strong>Supply chain propagation:</strong> If you publish packages, compromised dependencies become part of your published code. Your users install the malware through you.</li>
			</ul>
			<p>
				The 2018 event-stream attack went undetected for weeks. The malicious code only activated for Copay wallet users, making it harder to discover. By the time anyone noticed, the cryptocurrency was gone.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect typosquatting packages?</h2>
			<p>
				Manual review catches obvious typos. Automated tools catch the rest. The goal is verification before installation, not incident response after.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Detection methods</span>
				</div>
				<pre><code>{`# Audit existing dependencies
npm audit
pip-audit

# Check package before installing
npm info <package-name>
pip show <package-name>

# Verify package existence and legitimacy
# - Check weekly downloads on npmjs.com
# - Compare GitHub stars and activity
# - Look for verified maintainer badges
# - Check publish history for suspicious patterns

# Use lockfiles to prevent drift
# Always commit package-lock.json and Pipfile.lock`}</code></pre>
			</div>

			<h3>Red flags to watch for</h3>
			<ul class="detection-list">
				<li>Package created recently with name similar to popular package</li>
				<li>Very low download count for a supposedly common library</li>
				<li>Missing or fake GitHub repository link</li>
				<li>Install scripts that make network requests</li>
				<li>Obfuscated code in postinstall hooks</li>
			</ul>

			<div class="cta-box">
				<p><strong>Scan your dependencies automatically</strong></p>
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
			<h2>How do I prevent typosquatting attacks?</h2>
			<p>
				Prevention requires verification at every step. When vibe coding, slow down at the dependency installation phase. This is where supply chain attacks enter your codebase.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Use this prompt to audit AI-generated dependencies before installing:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Audit my package.json for typosquatting risks and dependency safety.

## What to check

For each dependency in package.json:

1. Verify the package exists on npm:
   - Search npmjs.com for the exact package name
   - Check if the name matches common typosquats (missing letters, swapped letters, extra characters)

2. Check legitimacy indicators:
   - Weekly downloads (legitimate packages typically have consistent download patterns)
   - Last publish date (abandoned packages may be takeover targets)
   - Maintainer history (sudden maintainer changes are red flags)
   - GitHub repository link (should exist and match the package)

3. Flag suspicious patterns:
   - Packages with names very similar to popular packages
   - Packages with postinstall scripts that make network requests
   - Packages with obfuscated code
   - Recently created packages with names of deprecated packages

## Common typosquats to check

These popular packages have known typosquats:
- lodash (lodahs, lodashs, loadash)
- express (expres, expresss, expess)
- react (reakt, reactt, raect)
- axios (axois, axio, axioss)
- moment (momment, moement, monment)
- webpack (webpck, wepback, webpackk)
- electron (electorn, electronn, eletron)
- cross-env (crossenv, cross_env)

## Output format

For each package, provide:
- Package name
- Verification status (verified/suspicious/unknown)
- Weekly downloads
- Last publish date
- Any red flags found

Flag any packages that need manual verification before proceeding.`}</div>
				</div>
			</div>

			<!-- Prevention Steps -->
			<div class="fix-section">
				<h3>Prevention checklist</h3>
				<div class="prevention-steps">
					<div class="step-item">
						<span class="step-number">1</span>
						<div class="step-content">
							<strong>Verify before installing</strong>
							<p>Check npmjs.com or pypi.org directly. Look at downloads, maintainers, and repository links before running install commands.</p>
						</div>
					</div>
					<div class="step-item">
						<span class="step-number">2</span>
						<div class="step-content">
							<strong>Use lockfiles</strong>
							<p>Always commit package-lock.json, yarn.lock, or Pipfile.lock. This prevents version drift and ensures reproducible installs.</p>
						</div>
					</div>
					<div class="step-item">
						<span class="step-number">3</span>
						<div class="step-content">
							<strong>Enable registry security features</strong>
							<p>npm has 2FA for publishing. Enable it. Use npm audit regularly. Consider using a private registry for critical projects.</p>
						</div>
					</div>
					<div class="step-item">
						<span class="step-number">4</span>
						<div class="step-content">
							<strong>Review AI-generated dependencies</strong>
							<p>When vibe coding generates a package.json, verify every dependency before installing. AI tools hallucinate package names.</p>
						</div>
					</div>
					<div class="step-item">
						<span class="step-number">5</span>
						<div class="step-content">
							<strong>Use dependency scanning tools</strong>
							<p>Tools like Socket.dev, Snyk, and VibeShip Scanner detect suspicious packages before they enter your codebase.</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Code Example -->
			<div class="fix-section">
				<h3>Secure dependency practices</h3>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">RISKY</span>
						</div>
						<pre><code>{`# Installing without verification
npm install lodahs axios electorn

# Trusting AI-generated package.json blindly
npm install

# Installing with --ignore-scripts (hides malware but also breaks legitimate packages)
npm install --ignore-scripts`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`# Verify package exists first
npm info lodash
npm info axios
npm info electron

# Install verified packages
npm install lodash axios electron

# Audit after installation
npm audit

# Use exact versions in production
npm install lodash@4.17.21 --save-exact`}</code></pre>
					</div>
				</div>

				<p>
					<strong>The difference:</strong> Verification happens before installation, not after. Check that the package name is correct, that the package exists, and that it comes from a trusted source. Lockfiles ensure the same verified packages install in every environment.
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
				<a href="/kb/security/vulnerabilities/vulnerable-dependencies/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Vulnerable Dependencies</div>
					<p class="related-card-description">Known CVEs in your dependency tree</p>
				</a>
				<a href="/kb/security/vulnerabilities/command-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Command Injection</div>
					<p class="related-card-description">When package scripts run arbitrary commands</p>
				</a>
				<a href="/kb/security/checklists/pre-launch/" class="card card-interactive related-card">
					<div class="related-card-category">Checklist</div>
					<div class="related-card-title">Pre-Launch Security</div>
					<p class="related-card-description">Complete security review before shipping</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>The event-stream attack hid for weeks</h2>
			<p>Find supply chain vulnerabilities before attackers exploit them.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan your dependencies now
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

	/* Timeline Box - @breachlore signature */
	.timeline-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.timeline-box h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
	}

	.timeline-grid {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.timeline-item {
		display: flex;
		gap: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border);
	}

	.timeline-item:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}

	.timeline-year {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--orange);
		min-width: 3rem;
	}

	.timeline-content {
		flex: 1;
	}

	.timeline-package {
		display: block;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.875rem;
		color: var(--text-primary);
	}

	.timeline-impact {
		font-size: 0.8rem;
		color: var(--red);
	}

	.timeline-details {
		margin: 0.25rem 0 0;
		font-size: 0.875rem;
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

	/* Detection List */
	.detection-list {
		list-style: disc;
		padding-left: 1.5rem;
		margin: 1rem 0;
		color: var(--text-secondary);
	}

	.detection-list li {
		margin-bottom: 0.5rem;
		line-height: 1.6;
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

	/* Prevention Steps */
	.prevention-steps {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.step-item {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	.step-number {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		background: var(--bg-tertiary);
		border: 1px solid var(--border);
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--green-dim);
		flex-shrink: 0;
	}

	.step-content {
		flex: 1;
	}

	.step-content strong {
		display: block;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.step-content p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
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
		.timeline-item {
			flex-direction: column;
			gap: 0.25rem;
		}

		.step-item {
			flex-direction: column;
			gap: 0.5rem;
		}

		.step-number {
			width: 1.75rem;
			height: 1.75rem;
			font-size: 0.75rem;
		}
	}
</style>
