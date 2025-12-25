<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Dependency Confusion: Stop Private Package Hijacking',
		description: 'Dependency confusion lets attackers hijack private package names in public registries. Learn how AI tools generate vulnerable configs and how to protect npm, PyPI, and Maven projects.',
		url: '/kb/security/vulnerabilities/dependency-confusion/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Dependency Confusion' }
	];

	// Real external data
	const owaspData = {
		category: 'A08:2021',
		name: 'Software and Data Integrity Failures',
		source: 'https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/',
		cweId: 'CWE-427',
		cweSource: 'https://cwe.mitre.org/data/definitions/427.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is dependency confusion?',
			answer: 'Dependency confusion is a supply chain attack where malicious actors upload packages to public registries (npm, PyPI, Maven) using the same names as private internal packages. Package managers prioritize by version number or public registry first, causing the malicious package to be installed instead. Documented as CWE-427, it breached 35+ companies in 2021 including Apple, Microsoft, and PayPal when researcher Alex Birsan demonstrated the technique.'
		},
		{
			question: 'How does a dependency confusion attack work?',
			answer: 'Attackers discover private package names (from GitHub, leaked configs, or forums), then upload malicious packages with identical names and very high version numbers (v999.999.999) to public registries. When developers run npm install or pip install, the package manager sees the public version as "newer" and installs it, executing the attacker\'s code during the build process. Alex Birsan\'s research shows code execution occurred within hours of upload at companies like Shopify.'
		},
		{
			question: 'How do I prevent dependency confusion in npm?',
			answer: 'Use scoped packages (@company/package) for all internal code and configure .npmrc to specify your private registry for that scope. Create a .npmrc file with @company:registry=https://registry.company.local/ and commit it to your repository. Claim your organization scope on public npm to prevent attackers from using it. GitHub\'s npm security guide recommends scoping as the primary defense.'
		},
		{
			question: 'What is the difference between dependency confusion and typosquatting?',
			answer: 'Typosquatting uses similar names (like "reqeusts" instead of "requests") to trick developers making typos. Dependency confusion uses exact name matches between public and private packages, exploiting package manager prioritization rules. Both are supply chain attacks, but confusion targets organizations with private packages while typosquatting targets individual developer mistakes. Dependency confusion requires knowledge of internal package names, while typosquatting is more opportunistic.'
		},
		{
			question: 'Do scoped packages prevent dependency confusion?',
			answer: 'Yes, when configured correctly. Scoped packages (@company/name) create a namespace that can be mapped to a specific registry via .npmrc, ensuring internal packages only come from your private registry. However, you must commit .npmrc to your repository and claim your scope on the public registry to prevent attackers from registering it. PyPI lacks scoping, making it more vulnerable - Python projects need repository-level configuration instead.'
		},
		{
			question: 'Why do AI coding tools generate vulnerable package names?',
			answer: 'AI suggests descriptive, generic names like "auth-utils" or "api-client" because that\'s what it learned from training data. The models don\'t know your company-specific naming conventions or that these names should be scoped. Without explicit prompting to use @company scope, AI generates unscoped packages that attackers can register publicly. This is especially problematic when vibe coding new projects from scratch.'
		}
	];

	let copied = $state(false);
	let copiedVulnerable = $state(false);
	let copiedSecure = $state(false);

	function copyPrompt() {
		const prompt = document.getElementById('ai-fix-prompt')?.textContent || '';
		navigator.clipboard.writeText(prompt);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}

	function copyVulnerable() {
		const code = `{
  "name": "api-client",
  "dependencies": {
    "auth-utils": "^1.0.0",
    "logger": "^2.0.0"
  }
}`;
		navigator.clipboard.writeText(code);
		copiedVulnerable = true;
		setTimeout(() => copiedVulnerable = false, 2000);
	}

	function copySecure() {
		const code = `{
  "name": "@mycompany/api-client",
  "dependencies": {
    "@mycompany/auth-utils": "^1.0.0",
    "@mycompany/logger": "^2.0.0"
  }
}`;
		navigator.clipboard.writeText(code);
		copiedSecure = true;
		setTimeout(() => copiedSecure = false, 2000);
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
			{"@type": "ListItem", "position": 4, "name": "Dependency Confusion"}
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
				<span class="badge badge-critical">Critical</span>
				<span class="badge">CWE-427</span>
				<span class="badge">OWASP A08:2021</span>
			</div>
			<h1>Dependency Confusion Attacks</h1>
			<p class="text-secondary">How attackers hijack private package names to compromise your build system</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Dependency confusion happens when attackers upload public packages with the same names as your private packages.</strong>
				Package managers download the malicious public version instead. Ranked in <a href="{owaspData.source}">OWASP A08:2021</a>.
				Prevent with scoped packages (@company/package) and .npmrc registry configuration. Alex Birsan earned $130,000+ in bug bounties breaching 35+ companies with this technique.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">35+</div>
				<div class="stat-label">Companies Breached</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">$130K+</div>
				<div class="stat-label">Bug Bounties Paid</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">49%</div>
				<div class="stat-label">Orgs Vulnerable</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE ID</a></div>
			</div>
		</div>
		<p class="data-source">
			Sources: <a href="https://medium.com/@alex.birsan/dependency-confusion-4a5d60fec610">Alex Birsan (Medium)</a>,
			<a href="https://portswigger.net/daily-swig/dependency-confusion-tops-the-portswigger-annual-web-hacking-list-for-2021">PortSwigger Research</a>
		</p>

		<!-- What Is It - @flaggedthis voice -->
		<section class="article-section">
			<h2>What is dependency confusion?</h2>
			<p>
				In my audits, this pattern shows up the same way every time: a leaked package.json, private package names exposed on GitHub,
				and no scoping protection. Dependency confusion is what happens when an attacker registers those private names on public registries
				before you do.
			</p>
			<p>
				Your package manager checks both your private registry and the public one. It sees two packages with the same name.
				One is your legitimate internal library at version 1.2.3. The other is an attacker's malicious package at version 999.999.999.
				The package manager picks the higher version number. Your build system downloads and executes the attacker's code.
			</p>
			<p>
				This isn't a theoretical vulnerability. Between 2020 and 2021, security researcher Alex Birsan used this technique to breach
				Apple, Microsoft, PayPal, Shopify, Netflix, Tesla, Uber, and 28 other companies. He earned over <a href="https://medium.com/@alex.birsan/dependency-confusion-4a5d60fec610">$130,000 in bug bounties</a>.
				<a href="https://portswigger.net/daily-swig/dependency-confusion-tops-the-portswigger-annual-web-hacking-list-for-2021">PortSwigger ranked it #1</a>
				in their 2021 Top 10 Web Hacking Techniques. In December 2022, PyTorch was compromised via the same method.
			</p>
			<p>
				The vulnerability is documented as <a href="{owaspData.cweSource}">CWE-427: Uncontrolled Search Path Element</a> and falls under
				<a href="{owaspData.source}">OWASP A08:2021 - Software and Data Integrity Failures</a>.
				2024 research shows 49% of organizations have at least one vulnerable asset, with 28% having 50+ exposed packages.
			</p>
		</section>

		<!-- The Original Attack -->
		<section class="article-section">
			<h2>The original attack: Alex Birsan (2021)</h2>
			<p>
				The attack started with a discovery by Justin Gardner in summer 2020. He found PayPal's package.json on GitHub.
				It contained a mix of public npm packages and private internal ones. The private packages didn't exist on the public registry.
			</p>
			<p>
				Alex Birsan realized the opportunity: "What if I register those names publicly with a higher version number?"
			</p>

			<h3>How the attack executed</h3>
			<ul class="attack-steps">
				<li>Collected private package names from GitHub repos, company forums, and leaked JavaScript files</li>
				<li>Uploaded malicious packages to npm, PyPI, and RubyGems with version 999.999.999</li>
				<li>Added preinstall scripts that logged hostname, username, and current path</li>
				<li>Exfiltrated data over DNS to avoid firewall blocks</li>
				<li>Packages automatically installed on internal build systems within hours</li>
			</ul>

			<h3>Companies breached</h3>
			<p>
				The attack worked on 35+ major companies. Every single one had the same pattern: unscoped private packages and missing .npmrc configuration.
			</p>
			<div class="breach-examples">
				<div class="breach-card">
					<div class="breach-company">Apple</div>
					<p>Executed on multiple machines in Apple ID authentication system. Internal build servers automatically installed the malicious package.</p>
				</div>
				<div class="breach-card">
					<div class="breach-company">Microsoft</div>
					<p>$40,000 bounty (highest amount). Microsoft published a <a href="https://github.blog/security/supply-chain-security/avoiding-npm-substitution-attacks/">security whitepaper</a> after the incident.</p>
				</div>
				<div class="breach-card">
					<div class="breach-company">PayPal</div>
					<p>$30,000 bounty. The leaked package names that started the entire research project.</p>
				</div>
				<div class="breach-card">
					<div class="breach-company">Shopify</div>
					<p>Build system auto-installed malicious Ruby gem hours after upload. Demonstrated cross-ecosystem vulnerability.</p>
				</div>
			</div>

			<p class="incident-note">
				All testing was done ethically with company permission through bug bounty programs. Total earnings: $130,000+ over 8 months.
			</p>
		</section>

		<!-- How Package Managers Prioritize -->
		<section class="article-section">
			<h2>How package managers choose between registries</h2>
			<p>
				The vulnerability exists because of how package managers resolve dependencies. In every incident I've reviewed,
				the root cause is the same default behavior.
			</p>

			<h3>npm (JavaScript)</h3>
			<p>
				Without .npmrc configuration, npm checks the public registry (registry.npmjs.org) first.
				When the same package name exists in both public and private registries, higher version numbers win.
				Default behavior: public registry takes precedence unless explicitly configured otherwise.
			</p>

			<h3>PyPI (Python)</h3>
			<p>
				The most vulnerable ecosystem. PyPI has no scoping mechanism like npm's @scope/package pattern.
				pip always prefers the official PyPI registry if the version number is higher. There's no built-in namespace protection.
				This is why the <a href="https://portswigger.net/daily-swig/dependency-confusion-attack-mounted-via-pypi-repo-exposes-flawed-package-installer-behavior">PyTorch breach in December 2022</a> happened.
			</p>

			<h3>Maven (Java)</h3>
			<p>
				Safer than npm or PyPI due to strict group ID verification. Maven Central requires DNS ownership to register a group ID.
				For example, only the owner of protsenko.dev can register dev.protsenko.* packages.
				However, internal repositories and secondary repos remain vulnerable to the same attack pattern.
			</p>

			<h3>RubyGems (Ruby)</h3>
			<p>
				Similar to npm. Checks RubyGems.org first by default. The Shopify incident used Ruby gem dependency confusion.
				Can configure with --source but defaults to public registry.
			</p>

			<h3>Exploitation pattern (all ecosystems)</h3>
			<ol class="exploitation-steps">
				<li>Attacker discovers private package name (leaked config, GitHub, company forums)</li>
				<li>Attacker uploads malicious package to public registry with same name</li>
				<li>Attacker uses very high version number (v999.999.999)</li>
				<li>Developer's build system checks public registry first or compares versions</li>
				<li>Public package has higher version than internal package</li>
				<li>Malicious package installed and executed during build</li>
			</ol>
		</section>

		<!-- AI Generated Vulnerabilities -->
		<section class="article-section">
			<h2>Why AI tools generate vulnerable configurations</h2>
			<p>
				In security audits of vibe coded projects, I see this pattern constantly. The AI suggests package names that are
				descriptive, generic, and completely unscoped. It's not a bug in any specific tool. It's how AI code generation works.
			</p>

			<h3>Generic package naming</h3>
			<p>
				AI suggests names like "auth-utils", "api-client", "database-helpers" because that's what exists in its training data.
				The models don't know your company-specific naming conventions. They optimize for clarity, not security.
				Result: package names that are likely to exist publicly or be registered by attackers monitoring GitHub.
			</p>

			<h3>Missing registry configuration</h3>
			<p>
				AI generates package.json without .npmrc files. It doesn't specify private registry scoping. It assumes default npm behavior
				(public registry first). The training data predates modern scoping best practices, so the AI doesn't know to include them.
			</p>

			<h3>No namespace awareness</h3>
			<p>
				AI doesn't generate @company-scope prefixes automatically. Training examples often lack scoping.
				You must explicitly prompt: "use @mycompany scope for all internal packages" or the AI will create unscoped names.
			</p>

			<h3>AI hallucinated dependencies (slopsquatting)</h3>
			<p>
				Even worse: AI suggests packages that don't exist anywhere. <a href="https://www.traxtech.com/blog/20-of-ai-generated-code-dependencies-dont-exist-creating-supply-chain-security-risks">Georgetown research shows 20% of AI-suggested dependencies are hallucinations</a>.
				Attackers register these hallucinated names with malicious code. When vibe coders trust the AI and run npm install,
				they download the attacker's package. This combination of dependency confusion + hallucination is called
				<a href="https://devops.com/ai-generated-code-packages-can-lead-to-slopsquatting-threat/">"slopsquatting"</a>.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">
						Vulnerable - AI Generated
						<button class="copy-btn" class:copied={copiedVulnerable} onclick={copyVulnerable}>
							{copiedVulnerable ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code>{`{
  "name": "api-client",
  "dependencies": {
    "auth-utils": "^1.0.0",
    "logger": "^2.0.0"
  }
}`}</code></pre>
				</div>

				<div class="code-block secure">
					<div class="code-label">
						Secure - Scoped
						<button class="copy-btn" class:copied={copiedSecure} onclick={copySecure}>
							{copiedSecure ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<pre><code>{`{
  "name": "@mycompany/api-client",
  "dependencies": {
    "@mycompany/auth-utils": "^1.0.0",
    "@mycompany/logger": "^2.0.0"
  }
}`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Real-World Incidents -->
		<section class="article-section">
			<h2>Recent incidents (2022-2025)</h2>
			<p>
				The threat didn't stop in 2021. Dependency confusion attacks continue because the fundamental vulnerability
				(unscoped packages + default registry behavior) remains widespread.
			</p>

			<h3>PyTorch Attack (December 2022)</h3>
			<p>
				Attacker uploaded malicious 'torchtriton' package to PyPI with the same name as PyTorch's internal dependency.
				PyPI took precedence over the internal source. Malicious package was pulled during installation.
				This demonstrated that even major open-source projects with security-conscious teams remain vulnerable.
			</p>

			<h3>Ongoing campaigns (2024-2025)</h3>
			<p>
				Current data shows the problem is getting worse, not better. 49% of organizations have at least one vulnerable asset.
				28% have 50+ vulnerable packages. Attackers monitor GitHub for leaked package names and proactively register likely
				internal names before companies claim them.
			</p>
		</section>

		<!-- Prevention -->
		<section class="article-section">
			<h2>Detection and prevention</h2>
			<p>
				Every dependency confusion incident I've investigated had the same fix: scoped packages and registry configuration.
				Here's how to implement both.
			</p>

			<h3>For npm (JavaScript/TypeScript)</h3>

			<h4>1. Use scoped packages</h4>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">package.json</span>
				</div>
				<pre><code>{`{
  "name": "@mycompany/project-name",
  "dependencies": {
    "@mycompany/internal-lib": "^1.0.0"
  }
}`}</code></pre>
			</div>

			<h4>2. Configure .npmrc with registry scoping</h4>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">.npmrc</span>
				</div>
				<pre><code>{`@mycompany:registry=https://registry.mycompany.local/

# Optional: Disable public fallback for all packages
registry=https://registry.mycompany.local/`}</code></pre>
			</div>

			<h4>3. Claim organization scope on public npm</h4>
			<p>
				Register @yourcompany on the public npm registry. This prevents attackers from using your scope.
				Mark the scope as private/placeholder. Don't publish anything sensitive, just claim the namespace.
			</p>

			<h4>4. Commit .npmrc to repository</h4>
			<p>
				Don't rely on developer machine configuration. Include .npmrc in git (not .gitignore).
				Make it part of the onboarding checklist. Every clone should have the correct registry settings.
			</p>

			<h3>For PyPI (Python)</h3>

			<h4>1. Use internal repository proxy</h4>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">pip.conf or .pypirc</span>
				</div>
				<pre><code>{`[global]
index-url = https://pypi.mycompany.local/simple/`}</code></pre>
			</div>

			<h4>2. Consider package name registration</h4>
			<p>
				Register placeholder packages on public PyPI. Use company prefix in package names since PyPI has no built-in scoping like npm.
			</p>

			<h4>3. Lockfiles are critical</h4>
			<p>
				Use requirements.txt with hashes (--require-hashes), poetry.lock, or Pipfile.lock.
				This prevents version number confusion by pinning exact package versions and checksums.
			</p>

			<h3>For Maven (Java)</h3>

			<h4>1. Control repository order</h4>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">pom.xml</span>
				</div>
				<pre><code>{`<repositories>
  <repository>
    <id>company-repo</id>
    <url>https://maven.mycompany.local</url>
  </repository>
  <!-- Maven Central comes after -->
</repositories>`}</code></pre>
			</div>

			<h4>2. Use controlled group IDs</h4>
			<p>
				Register group IDs with domains you own. com.mycompany.* requires DNS ownership verification,
				making it harder for attackers to register your namespace.
			</p>

			<h3>Detection tools</h3>
			<ul class="tool-list">
				<li><a href="https://github.com/visma-prodsec/confused">confused</a> - Scans requirements.txt, package.json, pom.xml, composer.json for vulnerable patterns</li>
				<li><a href="https://socket.dev">Socket.dev</a> - Behavioral analysis, catches confusion attempts in real-time</li>
				<li><a href="https://snyk.io/blog/detect-prevent-dependency-confusion-attacks-npm-supply-chain-security/">Snyk</a> - Supply chain security scanning</li>
				<li>OWASP Dependency-Check - Scans for known vulnerabilities in dependencies</li>
			</ul>
		</section>

		<!-- AI Fix Prompt -->
		<section class="article-section">
			<h2>AI Fix Prompt</h2>
			<p>
				Copy this prompt into Cursor, Claude Code, or any AI coding assistant to audit and fix dependency confusion vulnerabilities:
			</p>

			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span class="fix-prompt-label">Copy-paste this prompt</span>
					<button class="copy-btn" class:copied onclick={copyPrompt}>
						{copied ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<div class="fix-prompt-content" id="ai-fix-prompt">{`Review my project for dependency confusion vulnerabilities (CWE-427, OWASP A08:2021):

## For npm/Node.js Projects:

1. **Check if using scoped packages:**
   - All internal packages should use @company-scope format
   - Update package.json name field: "@mycompany/project-name"
   - Update all internal dependencies to use scoped names

2. **Create or update .npmrc:**
   \`\`\`ini
   # .npmrc in project root
   @mycompany:registry=https://registry.mycompany.local/

   # Optional: Force all packages through private registry
   registry=https://registry.mycompany.local/
   \`\`\`

3. **Verify registry configuration:**
   - Run: npm config list
   - Ensure private registry is configured for internal scope
   - Check that .npmrc is committed to git

4. **Claim public scope (if not already):**
   - Register @yourcompany on public npm
   - Prevents attackers from registering your scope

5. **Add to CI/CD checks:**
   \`\`\`yaml
   # Check for unscoped internal packages
   - name: Verify scoped packages
     run: |
       if grep -q '"name": "[^@]' package.json; then
         echo "Error: Internal package must be scoped"
         exit 1
       fi
   \`\`\`

## For Python/PyPI Projects:

1. **Configure pip to use internal registry first:**
   \`\`\`ini
   # pip.conf or ~/.pypirc
   [global]
   index-url = https://pypi.mycompany.local/simple/
   extra-index-url = https://pypi.org/simple/
   \`\`\`

2. **Use requirements.txt with hashes:**
   \`\`\`bash
   pip freeze --all --require-hashes > requirements.txt
   \`\`\`

3. **Consider package name registration:**
   - Register placeholder packages on public PyPI
   - Use company-specific prefixes

4. **Use lockfiles (poetry/pipenv):**
   - poetry.lock or Pipfile.lock
   - Commit lockfiles to repository

## For Maven/Java Projects:

1. **Control repository order in pom.xml:**
   \`\`\`xml
   <repositories>
     <repository>
       <id>company-internal</id>
       <url>https://maven.company.local</url>
     </repository>
   </repositories>
   \`\`\`

2. **Use verified group IDs:**
   - Ensure group IDs match domains you control
   - com.yourcompany.* requires DNS ownership

3. **Configure repository manager:**
   - Use Nexus or Artifactory
   - Proxy external repositories
   - Audit all dependency downloads

## Universal Checks:

1. **Scan for vulnerable patterns:**
   \`\`\`bash
   # Install confused tool
   go install github.com/visma-prodsec/confused@latest

   # Scan project
   confused -l npm package.json
   confused -l pip requirements.txt
   confused -l mvn pom.xml
   \`\`\`

2. **Review dependency sources:**
   - List all package sources
   - Verify private packages only from internal registry
   - Check for unexpected public packages

3. **Implement monitoring:**
   - Alert on new public packages matching internal names
   - Monitor npm/PyPI for namespace squatting
   - Use Socket.dev or similar for behavioral analysis

4. **Update AI prompting:**
   - Include: "Use @mycompany scope for all internal packages"
   - Include: "Configure .npmrc for private registry"
   - Include: "Never use generic unscoped names for internal code"

For each package found:
- Show package name and whether it's scoped
- Show registry source
- Flag potential confusion risks
- Suggest scoped alternative`}</div>
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
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">Secrets in compromised packages expose credentials</p>
				</a>
				<a href="/kb/security/vulnerabilities/command-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Command Injection</div>
					<p class="related-card-description">RCE via malicious package install scripts</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">How AI generates vulnerable package configs</p>
				</a>
				<a href="/kb/vibe-coding-tools/github-copilot/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">GitHub Copilot Security</div>
					<p class="related-card-description">AI hallucinations and dependency risks</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Scan your dependencies for confusion risks</h2>
			<p>VibeShip Scanner detects unscoped packages and missing registry configs.</p>
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
	/* Data Source Attribution */
	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* Attack Steps */
	.attack-steps {
		padding-left: 1.5rem;
		margin: 1rem 0;
	}

	.attack-steps li {
		margin-bottom: 0.5rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Breach Examples */
	.breach-examples {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.breach-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.breach-company {
		font-family: 'JetBrains Mono', monospace;
		font-weight: 600;
		font-size: 0.875rem;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
	}

	.breach-card p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.incident-note {
		margin-top: 1rem;
		font-size: 0.875rem;
		color: var(--text-tertiary);
		font-style: italic;
	}

	/* Exploitation Steps */
	.exploitation-steps {
		padding-left: 1.5rem;
		margin: 1rem 0;
	}

	.exploitation-steps li {
		margin-bottom: 0.5rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Code Comparison */
	.code-comparison {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-block.vulnerable {
		border-left: 3px solid var(--red);
	}

	.code-block.secure {
		border-left: 3px solid var(--green);
	}

	/* Custom styling for code-label with button */
	.code-comparison .code-label {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* Tool List */
	.tool-list {
		padding-left: 1.5rem;
		margin: 1rem 0;
	}

	.tool-list li {
		margin-bottom: 0.75rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.breach-examples {
			grid-template-columns: 1fr;
		}
	}
</style>
