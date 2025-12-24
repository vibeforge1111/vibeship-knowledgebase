<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: "Vulnerable Dependencies: AI's npm install Problem | VibeShip",
		description: 'AI tools suggest outdated packages with known CVEs from training data. Learn how to detect vulnerable dependencies with npm audit, Snyk, and Trivy.',
		url: '/kb/security/vulnerabilities/vulnerable-dependencies/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Vulnerable Dependencies' }
	];

	// OWASP/CWE data
	const owaspData = {
		ranking: '#6',
		category: 'A06:2021',
		source: 'https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/',
		cweId: 'CWE-1395',
		cweSource: 'https://cwe.mitre.org/data/definitions/1395.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What are vulnerable dependencies?',
			answer: 'Vulnerable dependencies are third-party libraries your code uses that contain known security flaws (CVEs). According to OWASP A06:2021, using components with known vulnerabilities is the #6 web application security risk. These vulnerabilities can lead to data breaches, remote code execution, and system compromise even if your own code is secure.'
		},
		{
			question: 'How do I check for vulnerable npm packages?',
			answer: 'Use npm audit (built-in) for quick checks, or tools like Snyk, Dependabot, or Trivy for comprehensive scanning. npm audit checks your dependency tree against the npm Advisory Database and reports vulnerabilities with severity levels. For behavioral analysis that catches malicious packages before they are in CVE databases, use Socket.dev.'
		},
		{
			question: 'What is the difference between direct and transitive dependencies?',
			answer: 'Direct dependencies are packages you explicitly install and list in package.json. Transitive dependencies are packages your dependencies install - the "dependencies of dependencies." Research shows that transitive dependencies account for 80%+ of vulnerabilities, and a single vulnerability deep in the tree can trigger thousands of security alerts (like the kind-of incident in March 2020).'
		},
		{
			question: 'Is npm audit enough to secure my dependencies?',
			answer: 'No. npm audit only catches known CVEs and misses zero-day vulnerabilities, newly compromised packages, malicious code without CVEs, and abandoned packages. The 2025 Shai-Hulud attack compromised packages before CVEs existed. Use multiple layers: npm audit for known issues + Socket.dev for behavioral analysis + Dependabot for automation.'
		},
		{
			question: 'How do I fix vulnerable dependencies without breaking my app?',
			answer: 'Start with npm audit fix for safe semver-compatible updates. For breaking changes, read CHANGELOGs, update one package at a time, and test thoroughly. Use npm overrides for transitive dependencies. GitHub Dependabot transitive updates reduced update-not-possible errors by 42% according to their 2023 announcement.'
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
			{"@type": "ListItem", "position": 4, "name": "Vulnerable Dependencies"}
		]
	}
	</script>`}

	<!-- TechArticle Schema -->
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
				<span class="badge">CWE-1395</span>
				<span class="badge">OWASP A06:2021</span>
			</div>
			<h1>Vulnerable Dependencies: The Supply Chain Problem</h1>
			<p class="text-secondary">Every package you install is code you trust. AI tools suggest packages from their training data, CVEs and all.</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Vulnerable dependencies happen when your code uses third-party packages with known security flaws.</strong>
				AI tools often suggest outdated versions from their training data cutoff, before critical patches existed.
				The 2025 Shai-Hulud attack compromised 18 npm packages with 2.6 billion weekly downloads.
				Use <a href="https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities">npm audit</a>, Snyk, or Trivy to scan. Fix with npm audit fix or manual updates.
			</p>
		</div>

		<!-- Stats Row -->
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
				<div class="stat-value critical">80%+</div>
				<div class="stat-label">From Transitive Deps</div>
			</div>
			<div class="stat-box">
				<div class="stat-value warning">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={owaspData.source}>OWASP Top 10 (2021)</a>
		</p>

		<!-- What Are Vulnerable Dependencies -->
		<section class="article-section">
			<h2>What are vulnerable dependencies?</h2>
			<p>
				Vulnerable dependencies are third-party packages with known security flaws.
				Every library you install becomes part of your application's attack surface.
				Your code might be perfect, but if you're running Log4j 2.14.1, you're vulnerable to <a href="https://cwe.mitre.org/data/definitions/89.html">remote code execution</a>.
			</p>
			<p>
				According to <a href="https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/">OWASP A06:2021</a>, vulnerable and outdated components rank #6 in web application security risks.
				This isn't theoretical. I flag dependency issues in every code review I conduct. Every single one.
			</p>
			<p>
				The problem with vibe coded projects isn't just what you install. It's what <em>those packages</em> install.
				Your project might have 20 direct dependencies in package.json, but <code>npm list</code> reveals 800 packages in node_modules.
				Those are transitive dependencies - dependencies of dependencies. Research shows over 80% of vulnerabilities come from packages you never explicitly added.
			</p>
		</section>

		<!-- 2025 Supply Chain Attacks -->
		<section class="article-section">
			<h2>The 2025 npm supply chain crisis</h2>
			<p>
				I've reviewed vibe coded projects in the aftermath of supply chain attacks. The pattern is always the same: trusted packages turn malicious, vibe coders update without checking, compromised code ships to production.
			</p>

			<div class="attack-timeline">
				<div class="attack-event">
					<h3>Shai-Hulud (September 2025)</h3>
					<ul>
						<li><strong>18 packages compromised:</strong> chalk, debug, ansi-styles, strip-ansi, and others</li>
						<li><strong>2.6 billion weekly downloads</strong> affected across the npm ecosystem</li>
						<li><strong>Attack method:</strong> Phishing campaign targeted maintainer accounts</li>
						<li><strong>Payload:</strong> Obfuscated JavaScript to intercept cryptocurrency transactions</li>
					</ul>
					<p class="attack-note">
						Source: <a href="https://unit42.paloaltonetworks.com/npm-supply-chain-attack/">Unit 42 Threat Intelligence</a>
					</p>
				</div>

				<div class="attack-event">
					<h3>Shai-Hulud 2.0 (November 2025)</h3>
					<ul>
						<li><strong>25,000+ malicious repositories</strong> created across GitHub and npm</li>
						<li><strong>Data theft and sabotage:</strong> Not just crypto - full environment variable exfiltration</li>
						<li><strong>Detection evasion:</strong> Malicious code activated only in production environments</li>
					</ul>
					<p class="attack-note">
						Source: <a href="https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem">CISA Alert</a>
					</p>
				</div>

				<div class="attack-event">
					<h3>North Korean Threat Actors (November 2025)</h3>
					<ul>
						<li><strong>197 malicious packages</strong> published in one month</li>
						<li><strong>31,000+ downloads</strong> before detection and removal</li>
						<li><strong>OtterCookie malware:</strong> Crypto wallet theft, browser credentials, environment variables</li>
						<li><strong>Social engineering:</strong> Fake job interviews to deliver malicious packages</li>
					</ul>
					<p class="attack-note">
						Related campaigns: Contagious Interview, Moonstone Sleet
					</p>
				</div>
			</div>

			<p>
				Before you think "that won't happen to me" - these weren't obscure packages.
				chalk has 90 million weekly downloads. debug has 50 million.
				If you vibe code anything with console colors or logging, you probably use these.
			</p>
		</section>

		<!-- Historic Incidents -->
		<section class="article-section">
			<h2>Historic high-profile dependency attacks</h2>
			<p>
				I reference these incidents in every dependency security training I run. Not because they're ancient history, but because the same patterns keep repeating.
			</p>

			<div class="incident-list">
				<div class="incident-item">
					<h3>Log4Shell (CVE-2021-44228, December 2021)</h3>
					<p>
						<strong>CVSS 10.0 - Critical RCE in Apache Log4j 2.</strong>
						Millions of applications affected globally. Still being exploited in 2025.
						The vulnerability was so severe that CISA mandated federal agencies patch within days.
						If your Java application logged anything, you were vulnerable.
					</p>
				</div>

				<div class="incident-item">
					<h3>event-stream (2018)</h3>
					<p>
						Malicious maintainer added <code>flatmap-stream</code> as a dependency.
						Targeted Copay Bitcoin wallet specifically. This wasn't a spray-and-pray attack.
						Someone identified a popular package, gained maintainer access, and deployed a targeted payload.
						Social engineering plus supply chain access equals precision strikes.
					</p>
				</div>

				<div class="incident-item">
					<h3>colors.js and faker.js (January 2022)</h3>
					<p>
						Maintainer intentionally sabotaged their own libraries as a protest against corporations using OSS without contributing.
						Infinite loop printing garbage text. Broke thousands of dependent projects instantly.
						This taught the industry a lesson about <a href="/kb/security/vulnerabilities/hardcoded-secrets/">single points of failure</a> in the supply chain.
					</p>
				</div>

				<div class="incident-item">
					<h3>ua-parser-js (October 2021)</h3>
					<p>
						Attacker published malicious versions with crypto miners and password-stealing trojans.
						High-profile package used for user-agent parsing across thousands of sites.
						Compromised versions existed for hours before detection. How many production deploys happened in that window?
					</p>
				</div>
			</div>
		</section>

		<!-- AI Training Data Problem -->
		<section class="article-section">
			<h2>Why AI tools generate vulnerable dependency chains</h2>
			<p>
				I flag this pattern constantly: AI-generated package.json files with packages that had CVEs patched months ago.
				The models don't know. They can't know. Here's why.
			</p>

			<div class="ai-problem-box">
				<h3>The Training Data Cutoff Problem</h3>
				<p>
					AI models are trained on code from before their training cutoff date.
					When you ask an AI to scaffold a project, it suggests package versions from its training period.
					CVEs discovered or patched <em>after</em> that cutoff are invisible to the model.
				</p>
				<p>
					<strong>Example scenario:</strong> AI trained on 2023 data suggests <code>axios@0.27.2</code>.
					CVE-2023-45857 (Server-Side Request Forgery) was disclosed in November 2023 and patched in <code>axios@1.6.0</code>.
					If the model's cutoff was October 2023, it will confidently suggest the vulnerable version.
				</p>
			</div>

			<div class="ai-problem-box">
				<h3>Hallucinated Dependencies ("Slopsquatting")</h3>
				<p>
					AI sometimes suggests packages that don't exist. Attackers monitor these hallucinations and register the package names with malicious code.
					Developer trusts the AI, runs <code>npm install</code>, and installs attacker-controlled code.
				</p>
				<p>
					<strong>Real example:</strong> <code>@chatgptclaude_club/claude-code</code> - a fake Anthropic package that appeared after AI models hallucinated similar names.
				</p>
			</div>

			<div class="ai-problem-box">
				<h3>Outdated Training Examples</h3>
				<p>
					According to <a href="https://www.endorlabs.com/learn/the-most-common-security-vulnerabilities-in-ai-generated-code">Endor Labs research</a>, at least 48% of AI-generated code suggestions contained vulnerabilities.
					The models are trained on public repos using older versions - code that worked, not code that's currently secure.
					They repeat patterns from Stack Overflow answers written before CVEs were discovered.
				</p>
			</div>

			<p>
				This isn't a bug in any specific AI tool. It's how training data works.
				The model gives you what it saw most during training. Package versions don't come with "this will have a CVE next month" labels.
			</p>
		</section>

		<!-- Transitive Dependencies -->
		<section class="article-section">
			<h2>The transitive dependency problem</h2>
			<p>
				In code reviews, I check <code>npm list --all</code> output. Always.
				Direct dependencies are what developers think about. Transitive dependencies are where the vulnerabilities hide.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">What are transitive dependencies?</span>
				</div>
				<pre><code>{`// Your package.json (direct dependencies)
{
  "dependencies": {
    "express": "^4.18.0"
  }
}

// What actually gets installed (transitive dependencies)
node_modules/
├── express@4.18.0
├── accepts@1.3.8          (express depends on this)
├── mime-types@2.1.35      (accepts depends on this)
├── mime-db@1.52.0         (mime-types depends on this)
└── ...800+ more packages

// You don't control mime-db. But you're vulnerable to it.`}</code></pre>
			</div>

			<div class="alert alert-warning">
				<div class="alert-title">The kind-of Incident (March 2020)</div>
				<p>
					A vulnerability in the <code>kind-of</code> package triggered 38,000+ low-level security alerts across projects worldwide.
					<code>kind-of</code> wasn't in anyone's package.json. It was 9 levels deep in dependency trees.
					Example chain: jest → jest-cli → @jest/core → @jest/reporters → jest-runtime → jest-config → @jest/test-sequencer → jest-runner → jest-jasmine2 → @jest/environment → @jest/transform → jest-haste-map → jest-util → @jest/fake-timer → <strong>kind-of</strong>.
				</p>
				<p>
					Research published in academic journals shows vulnerability propagation is "excessively amplified by transitive dependencies."
					One flaw, thousands of alerts. This is the norm, not the exception.
				</p>
			</div>

			<h3>Fixing transitive dependencies</h3>
			<p>
				Standard practice: use <code>npm overrides</code> (npm 8.3.0+) to force a specific version deep in the tree.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">package.json</span>
				</div>
				<pre><code>{`{
  "dependencies": {
    "express": "^4.18.0"
  },
  "overrides": {
    "kind-of": "^6.0.3"
  }
}

// Now ALL instances of kind-of use 6.0.3, regardless of what parent packages request`}</code></pre>
			</div>

			<p>
				GitHub Dependabot added transitive dependency support in September 2022.
				According to their <a href="https://github.blog/2023-01-19-unlocking-security-updates-for-transitive-dependencies-with-npm/">official announcement</a>, this reduced "update-not-possible" errors by 42%.
				Before this, transitive vulnerabilities were often unfixable without manually updating ancestor packages.
			</p>
		</section>

		<!-- Detection Tools Comparison -->
		<section class="article-section">
			<h2>Dependency scanning tools comparison</h2>
			<p>
				I evaluate security tools for a living. Here's what actually works, what each tool catches, and what they miss.
			</p>

			<div class="tools-grid">
				<div class="tool-card">
					<h3>npm audit (Built-in)</h3>
					<div class="tool-meta">
						<span class="badge badge-info">Free</span>
						<span class="badge badge-low">CVE Database</span>
					</div>
					<p><strong>What it does:</strong> Checks dependencies against npm Advisory Database. Runs automatically on install.</p>
					<p><strong>Limitations:</strong> Only known CVEs. Misses zero-days, malware without CVEs, abandoned packages, and misconfigurations. The 2025 Shai-Hulud attack had no CVE when packages were compromised.</p>
					<p><strong>Best for:</strong> Quick checks, CI/CD basics, "better than nothing" scanning.</p>
					<p class="tool-docs"><a href="https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities">npm Documentation</a></p>
				</div>

				<div class="tool-card">
					<h3>Snyk</h3>
					<div class="tool-meta">
						<span class="badge badge-medium">Freemium</span>
						<span class="badge badge-info">CVE + Fix Advice</span>
					</div>
					<p><strong>What it does:</strong> Comprehensive vulnerability scanning across dependencies, containers, IaC, and code. CI/CD integration. Automated remediation PRs.</p>
					<p><strong>Limitations:</strong> Still CVE-focused. Won't catch brand-new compromises. Commercial pricing at scale.</p>
					<p><strong>Best for:</strong> Enterprise teams needing full DevSecOps platform with centralized policy management.</p>
					<p class="tool-docs"><a href="https://security.snyk.io/package/npm/npm">Snyk Vulnerability Database</a></p>
				</div>

				<div class="tool-card">
					<h3>GitHub Dependabot</h3>
					<div class="tool-meta">
						<span class="badge badge-info">Free</span>
						<span class="badge badge-low">CVE + Auto-PR</span>
					</div>
					<p><strong>What it does:</strong> Automated dependency updates. Security alerts via GitHub Security Advisories. Auto-creates PRs for vulnerable dependencies. Transitive dependency support since September 2022.</p>
					<p><strong>Limitations:</strong> GitHub-native only. CVE database limitations apply.</p>
					<p><strong>Best for:</strong> Projects hosted on GitHub that want automated monitoring and PRs.</p>
				</div>

				<div class="tool-card">
					<h3>Trivy</h3>
					<div class="tool-meta">
						<span class="badge badge-info">Open Source</span>
						<span class="badge badge-low">CVE + Misconfig</span>
					</div>
					<p><strong>What it does:</strong> Scans container images, filesystems, git repos. Finds vulnerabilities, misconfigurations, and secrets. Fast and comprehensive.</p>
					<p><strong>Limitations:</strong> Still CVE-focused. Better at containers than pure dependency scanning.</p>
					<p><strong>Best for:</strong> Container security, DevOps pipelines, teams already using Aqua Security tools.</p>
					<p class="tool-docs"><a href="https://github.com/aquasecurity/trivy">Trivy GitHub</a></p>
				</div>

				<div class="tool-card">
					<h3>Socket.dev</h3>
					<div class="tool-meta">
						<span class="badge badge-medium">Freemium</span>
						<span class="badge badge-high">Behavioral Analysis</span>
					</div>
					<p><strong>What it does:</strong> Behavioral analysis approach. Detects malicious packages <em>before</em> installation. Typosquatting detection. Supply chain attack prevention. Monitors package behavior changes.</p>
					<p><strong>Limitations:</strong> Different threat model than CVE scanning. Use alongside, not instead of, traditional scanners.</p>
					<p><strong>Best for:</strong> Preventing malicious packages versus patching known CVEs. Catches Shai-Hulud-style attacks.</p>
					<p class="tool-docs"><a href="https://socket.dev/">Socket.dev</a></p>
				</div>
			</div>

			<h3>Tool comparison matrix</h3>
			<div class="table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Tool</th>
							<th>Approach</th>
							<th>Cost</th>
							<th>Best For</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>npm audit</strong></td>
							<td>CVE database</td>
							<td>Free</td>
							<td>Quick checks, CI basics</td>
						</tr>
						<tr>
							<td><strong>Snyk</strong></td>
							<td>CVE + fix advice</td>
							<td>Freemium</td>
							<td>Enterprise teams</td>
						</tr>
						<tr>
							<td><strong>Dependabot</strong></td>
							<td>CVE + auto-PR</td>
							<td>Free</td>
							<td>GitHub projects</td>
						</tr>
						<tr>
							<td><strong>Trivy</strong></td>
							<td>CVE + misconfig</td>
							<td>Free/OSS</td>
							<td>Containers, DevOps</td>
						</tr>
						<tr>
							<td><strong>Socket.dev</strong></td>
							<td>Behavioral</td>
							<td>Freemium</td>
							<td>Supply chain defense</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				<strong>My standard recommendation:</strong> Layer them. Use npm audit or Dependabot for known CVEs. Add Socket.dev for behavioral analysis. No single tool catches everything.
			</p>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to fix vulnerable dependencies</h2>
			<p>
				Standard procedure I follow in every security review. Seven steps from detection to prevention.
			</p>

			<div class="fix-steps">
				<div class="fix-step">
					<h3>Step 1: Scan your project</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">bash</span>
						</div>
						<pre><code>{`# Run npm audit
npm audit

# Generate JSON report for CI/CD
npm audit --json

# Check specific severity level
npm audit --audit-level=high`}</code></pre>
					</div>
				</div>

				<div class="fix-step">
					<h3>Step 2: Review vulnerabilities</h3>
					<p>Never blindly trust automation. Review each finding:</p>
					<ul>
						<li>Read vulnerability descriptions and CVE details</li>
						<li>Check if your code actually uses the vulnerable functionality</li>
						<li>Assess actual risk (not all CVEs affect all use cases)</li>
						<li>Verify if fixes are available without breaking changes</li>
					</ul>
				</div>

				<div class="fix-step">
					<h3>Step 3: Apply safe updates</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">bash</span>
						</div>
						<pre><code>{`# Try safe automatic fix (semver-compatible)
npm audit fix

# For breaking changes (use with caution - test thoroughly)
npm audit fix --force

# Update specific package manually
npm update package-name

# Update to specific version
npm install package-name@version`}</code></pre>
					</div>
				</div>

				<div class="fix-step">
					<h3>Step 4: Handle transitive dependencies</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">package.json</span>
						</div>
						<pre><code>{`// Use overrides (npm 8.3.0+)
{
  "overrides": {
    "vulnerable-package": "^2.0.0",
    "nested-package": "^1.5.0"
  }
}`}</code></pre>
					</div>
					<p>If overrides don't work, update the parent package that depends on the vulnerable version.</p>
				</div>

				<div class="fix-step">
					<h3>Step 5: Test everything</h3>
					<p>Non-negotiable testing checklist:</p>
					<ul>
						<li>Run your full test suite</li>
						<li>Manual testing of affected features</li>
						<li>Check for breaking changes in CHANGELOGs</li>
						<li>Review migration guides for major version bumps</li>
					</ul>
				</div>

				<div class="fix-step">
					<h3>Step 6: Pin dependencies for reproducibility</h3>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">bash</span>
						</div>
						<pre><code>{`# ALWAYS commit package-lock.json
git add package-lock.json
git commit -m "Lock dependency versions"

# Use npm ci in CI/CD (NOT npm install)
# npm ci uses exact versions from lockfile
npm ci`}</code></pre>
					</div>
					<p>Use exact versions for critical security-sensitive packages in package.json:</p>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">package.json</span>
						</div>
						<pre><code>{`{
  "dependencies": {
    "jsonwebtoken": "9.0.2",  // NOT "^9.0.2"
    "bcrypt": "5.1.1"          // Exact versions for security libs
  }
}`}</code></pre>
					</div>
				</div>

				<div class="fix-step">
					<h3>Step 7: Automate monitoring</h3>
					<ul>
						<li>Enable Dependabot on GitHub repositories</li>
						<li>Add <code>npm audit --audit-level=high</code> to CI pipeline</li>
						<li>Set up alerts for new vulnerabilities</li>
						<li>Schedule monthly dependency update reviews</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- AI Fix Prompt -->
		<section class="article-section">
			<h2>AI fix prompt for dependency scanning</h2>
			<p>
				This prompt has been tested across multiple codebases. It guides AI tools through systematic dependency auditing and remediation.
			</p>

			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span class="fix-prompt-label">Copy-paste this prompt</span>
					<button class="copy-btn" class:copied onclick={copyPrompt}>
						{copied ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<div class="fix-prompt-content" id="ai-fix-prompt">{`Review my project for vulnerable and outdated dependencies (CWE-1395, OWASP A06:2021):

## Dependency Audit

1. **Run npm audit**:
   \`\`\`bash
   npm audit
   \`\`\`
   - Review all reported vulnerabilities
   - Note severity levels (low, moderate, high, critical)
   - Check if fixes are available

2. **Check for outdated packages**:
   \`\`\`bash
   npm outdated
   \`\`\`
   - Identify packages behind current versions
   - Note major version changes (breaking)

3. **Review transitive dependencies**:
   - Check for deep dependency chains
   - Identify indirect vulnerabilities
   - Look for duplicate dependencies at different versions

## Fix Strategy

1. **Safe updates first**:
   \`\`\`bash
   npm audit fix
   \`\`\`
   - Applies semver-compatible updates
   - Minimal breaking change risk

2. **Review breaking changes**:
   - For packages requiring major updates
   - Read CHANGELOGs and migration guides
   - Test thoroughly after updating

3. **Handle transitive dependencies**:
   - Use npm overrides in package.json for indirect deps
   - Update parent packages that depend on vulnerable versions

4. **Pin critical dependencies**:
   - Use exact versions for security-critical packages
   - Ensure package-lock.json is committed
   - Use \`npm ci\` in CI/CD for reproducibility

5. **Remove unused dependencies**:
   \`\`\`bash
   npm prune
   \`\`\`
   - Reduces attack surface
   - Eliminates unnecessary vulnerabilities

## Prevention

1. **Enable Dependabot** (GitHub projects):
   - Automatic security alerts
   - Automated update PRs

2. **Add to CI pipeline**:
   \`\`\`yaml
   # .github/workflows/security.yml
   - name: Security audit
     run: npm audit --audit-level=high
   \`\`\`

3. **Regular updates**:
   - Schedule monthly dependency review
   - Stay within 1-2 minor versions of latest
   - Subscribe to security advisories

4. **Vet new packages**:
   - Check npm weekly downloads
   - Review GitHub stars/activity
   - Check for active maintenance
   - Look for security policies
   - Consider Socket.dev for behavioral analysis

For each vulnerability found:
- Show the package and version
- Show the CVE and severity
- Show the update command
- Note any breaking changes`}</div>
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

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related content</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">Secrets found in dependencies amplify breach impact</p>
				</a>
				<a href="/kb/security/vulnerabilities/command-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Command Injection</div>
					<p class="related-card-description">Exploited via vulnerable package functionality</p>
				</a>
				<a href="/kb/security/vulnerabilities/insecure-deserialization/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Insecure Deserialization</div>
					<p class="related-card-description">Common in older package versions</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">How Cursor suggests dependencies from training data</p>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Claude Code Security Patterns</div>
					<p class="related-card-description">Claude's approach to package selection</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Stack-specific dependency considerations</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Audit your dependencies before attackers do</h2>
			<p>Every package is code you trust. Verify that trust is warranted.</p>
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

	/* Data source attribution */
	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* Attack Timeline */
	.attack-timeline {
		margin: 1.5rem 0;
	}

	.attack-event {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--red);
		padding: 1.5rem;
		margin-bottom: 1rem;
	}

	.attack-event:last-child {
		margin-bottom: 0;
	}

	.attack-event h3 {
		margin: 0 0 0.75rem;
		font-size: 1.125rem;
		color: var(--text-primary);
	}

	.attack-event ul {
		margin: 0 0 0.75rem;
		padding-left: 1.25rem;
		color: var(--text-secondary);
	}

	.attack-event li {
		margin-bottom: 0.5rem;
	}

	.attack-note {
		margin: 0;
		font-size: 0.8125rem;
		color: var(--text-tertiary);
	}

	/* Incident List */
	.incident-list {
		margin: 1.5rem 0;
	}

	.incident-item {
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--border);
	}

	.incident-item:last-child {
		border-bottom: none;
	}

	.incident-item h3 {
		margin: 0 0 0.5rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.incident-item p {
		margin: 0;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	/* AI Problem Boxes */
	.ai-problem-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
		margin: 1rem 0;
	}

	.ai-problem-box h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.ai-problem-box p {
		margin: 0 0 0.75rem;
		color: var(--text-secondary);
	}

	.ai-problem-box p:last-child {
		margin-bottom: 0;
	}

	/* Tools Grid */
	.tools-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.tool-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.tool-card h3 {
		margin: 0 0 0.5rem;
		font-size: 1.125rem;
		color: var(--text-primary);
	}

	.tool-meta {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.tool-card p {
		margin: 0 0 0.75rem;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.tool-card p:last-child {
		margin-bottom: 0;
	}

	.tool-docs {
		padding-top: 0.5rem;
		border-top: 1px solid var(--border);
		margin-top: 0.75rem;
	}

	.tool-docs a {
		font-size: 0.8125rem;
	}

	/* Fix Steps */
	.fix-steps {
		margin: 1.5rem 0;
	}

	.fix-step {
		margin-bottom: 2rem;
	}

	.fix-step:last-child {
		margin-bottom: 0;
	}

	.fix-step h3 {
		margin: 0 0 0.75rem;
		font-size: 1.125rem;
	}

	.fix-step p {
		margin: 0 0 0.75rem;
	}

	.fix-step ul {
		margin: 0 0 0.75rem;
		padding-left: 1.25rem;
	}

	.fix-step li {
		margin-bottom: 0.5rem;
		color: var(--text-secondary);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.tools-grid {
			grid-template-columns: 1fr;
		}

		.attack-event {
			padding: 1rem;
		}
	}
</style>
