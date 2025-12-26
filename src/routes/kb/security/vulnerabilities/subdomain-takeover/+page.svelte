<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Subdomain Takeover: Detect & Fix Guide',
		description: 'Subdomain takeover lets attackers hijack your subdomains via dangling DNS. 15,000 Azure subdomains vulnerable monthly. Audit and fix your cloud infrastructure.',
		url: '/kb/security/vulnerabilities/subdomain-takeover/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Subdomain Takeover' }
	];

	const securityData = {
		cweId: 'CWE-16',
		cweName: 'Configuration',
		cweSource: 'https://cwe.mitre.org/data/definitions/16.html',
		owaspCategory: 'A05:2021 - Security Misconfiguration',
		owaspSource: 'https://owasp.org/Top10/A05_2021-Security_Misconfiguration/',
		testingGuide: 'WSTG-CONF-10',
		severity: 'High',
		cvssScore: '7.3'
	};

	const faqs = [
		{
			question: 'What is subdomain takeover?',
			answer: 'Subdomain takeover occurs when a DNS record (usually a CNAME) points to an external service that no longer exists or is unclaimed. An attacker can register that service and gain control of your subdomain. They can then host malicious content, phish your users, or steal session cookies that are scoped to your parent domain.'
		},
		{
			question: 'How do I prevent subdomain takeover?',
			answer: 'Remove DNS records immediately when you decommission cloud services. Audit your DNS zones quarterly. Use automation to detect dangling records. For Azure, use alias records that automatically clean up. For AWS, ensure S3 bucket names match your DNS records and are not deleted without removing the CNAME first.'
		},
		{
			question: 'How do I check for subdomain takeover vulnerabilities?',
			answer: 'Check each CNAME record in your DNS zone. If the target returns NXDOMAIN or a cloud provider error page, you may be vulnerable. Tools like subjack, nuclei, and the can-i-take-over-xyz GitHub repository help identify which services are claimable. Automated scanning catches issues before attackers do.'
		},
		{
			question: 'What services are commonly vulnerable to subdomain takeover?',
			answer: 'AWS S3, Azure App Service, Azure CDN, Heroku, GitHub Pages, Shopify, Fastly, Pantheon, and many others. The can-i-take-over-xyz GitHub repository maintains a current list. Any service where you can claim a specific hostname or bucket name is potentially vulnerable if your DNS points to an unclaimed resource.'
		},
		{
			question: 'Is subdomain takeover illegal?',
			answer: 'Claiming someone else\'s subdomain without authorization is likely illegal under computer fraud laws in most jurisdictions. However, security researchers often discover these vulnerabilities and report them through responsible disclosure. Many bug bounty programs reward subdomain takeover findings. Always get explicit permission before testing.'
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

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{"@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb"},
			{"@type": "ListItem", "position": 2, "name": "Security", "item": "https://vibeship.co/kb/security"},
			{"@type": "ListItem", "position": 3, "name": "Vulnerabilities", "item": "https://vibeship.co/kb/security/vulnerabilities"},
			{"@type": "ListItem", "position": 4, "name": "Subdomain Takeover"}
		]
	}
	</script>`}

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": "${meta.title}",
		"description": "${meta.description}",
		"author": {"@type": "Organization", "name": "VibeShip"},
		"publisher": {"@type": "Organization", "name": "VibeShip"},
		"datePublished": "2024-12-26",
		"dateModified": "2024-12-26"
	}
	</script>`}

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": ${JSON.stringify(faqs.map(faq => ({
			"@type": "Question",
			"name": faq.question,
			"acceptedAnswer": {"@type": "Answer", "text": faq.answer}
		})))}
	}
	</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-high">High</span>
				<span class="badge">{securityData.cweId}</span>
				<span class="badge">OWASP A05:2021</span>
			</div>
			<h1>Subdomain Takeover in Vibe Coded Apps</h1>
			<p class="text-secondary">The forgotten DNS records that let attackers hijack your brand</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Subdomain takeover happens when a DNS record points to a cloud service you no longer control.</strong>
				Attackers claim that service and own your subdomain. They can phish your users, steal cookies, or deface your brand.
				According to <a href="https://www.keytos.io/blog/2023/05/23/azure-domains-still-vulnerable-to-subdomain-takeover.html">Keytos research</a>, approximately 15,000 Azure subdomains become vulnerable each month. The fix: audit and remove dangling DNS records.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">15K+</div>
				<div class="stat-label">Monthly vulnerable (Azure)</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">$148M</div>
				<div class="stat-label">Uber settlement (2016)</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">2%</div>
				<div class="stat-label">Orgs that fix when notified</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{securityData.cvssScore}</div>
				<div class="stat-label">CVSS Score</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href="https://www.keytos.io/blog/2023/05/23/azure-domains-still-vulnerable-to-subdomain-takeover.html">Keytos Research 2023</a>, <a href={securityData.owaspSource}>OWASP</a>
		</p>

		<!-- What Is It - @breachlore voice (historian) -->
		<section class="article-section">
			<h2>What is subdomain takeover?</h2>
			<p>
				Subdomain takeover is like canceling your mail forwarding but leaving the forwarding slip at the post office. Someone moves into your old address and receives all your mail. In DNS terms: your CNAME record points to a cloud service you deleted, and an attacker claims it.
			</p>
			<p>
				The vulnerability exists because cloud providers let anyone register resources with specific names. If your DNS says <code>blog.yourapp.com</code> points to <code>yourapp.herokuapp.com</code>, but you deleted that Heroku app, anyone can create a new app with that exact name and control your subdomain.
			</p>
			<p>
				According to the <a href="https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/10-Test_for_Subdomain_Takeover">OWASP Web Security Testing Guide (WSTG-CONF-10)</a>, successful exploitation enables phishing, credential theft, session hijacking via cookie scope, and malware distribution under your brand.
			</p>
		</section>

		<!-- History / Breaches - @breachlore strength -->
		<section class="article-section">
			<h2>The breach history nobody talks about</h2>
			<p>
				2016. Uber. An unclaimed AWS S3 bucket linked to a subdomain exposed sensitive data on drivers and passengers. The breach contributed to a $148 million settlement. Different year, same pattern that appears in vibe coded infrastructure today.
			</p>

			<div class="breach-timeline">
				<div class="breach-item">
					<div class="breach-year">2017</div>
					<div class="breach-details">
						<strong>Slack</strong> - Security researcher discovered *.status.slack.com pointing to unclaimed resource. Could have enabled credential phishing at scale.
					</div>
				</div>
				<div class="breach-item">
					<div class="breach-year">2017</div>
					<div class="breach-details">
						<strong>United Airlines</strong> - Subdomain takeover vulnerability discovered and reported. Could have been used for customer phishing.
					</div>
				</div>
				<div class="breach-item">
					<div class="breach-year">2020+</div>
					<div class="breach-details">
						<strong>Microsoft</strong> - Multiple microsoft.com subdomains found vulnerable. Even the biggest companies leave dangling DNS.
					</div>
				</div>
				<div class="breach-item">
					<div class="breach-year">2023</div>
					<div class="breach-details">
						<strong>Government agencies</strong> - Canadian government subdomain left unprotected. One admin told researchers "it's too much work to remove the DNS entry."
					</div>
				</div>
			</div>

			<p>
				The pattern repeats: a team spins up cloud infrastructure, iterates quickly, deletes resources, forgets the DNS. Months later, someone claims it.
			</p>
		</section>

		<!-- Why Vibe Coded Apps -->
		<section class="article-section">
			<h2>Why vibe coded apps are especially vulnerable</h2>
			<p>
				AI coding tools help you spin up cloud infrastructure in minutes. Heroku deploys, Vercel previews, S3 buckets, Azure functions. When you iterate and delete, the DNS records stay behind.
			</p>

			<div class="tool-patterns-box">
				<h3>The vibe coding pattern that creates risk</h3>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Common workflow</span>
					</div>
					<pre><code>{`# Week 1: AI helps you set up staging
staging.yourapp.com → yourapp-staging.herokuapp.com

# Week 3: You iterate, delete the Heroku app
# DNS record stays in place (forgotten)

# Month later: Attacker claims yourapp-staging on Heroku
# Now they control staging.yourapp.com`}</code></pre>
				</div>
				<p class="pattern-note">
					No cleanup automation. No DNS audit process. The subdomain sits vulnerable until someone claims it.
				</p>
			</div>

			<p>
				Managed platforms like Vercel and Netlify handle most of this internally. The risk is highest when you're using raw cloud services (AWS, Azure, Heroku) with manual DNS configuration.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect subdomain takeover risk</h2>
			<p>
				First, export your DNS zone. Check every CNAME record. If the target returns an error page or NXDOMAIN, you may be vulnerable.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Bash</span>
				</div>
				<pre><code>{`# Check if a subdomain's CNAME target exists
dig CNAME staging.yourapp.com +short
# Returns: yourapp-staging.herokuapp.com

# Check if that target is claimed
curl -I https://yourapp-staging.herokuapp.com
# 404 or "No such app" = VULNERABLE

# Bulk check with subfinder + httpx
subfinder -d yourapp.com -silent | httpx -sc -title

# Look for these vulnerable responses:
# - "There isn't a GitHub Pages site here"
# - "NoSuchBucket" (AWS S3)
# - "No such app" (Heroku)
# - "404 Site Not Found" (Azure)`}</code></pre>
			</div>

			<div class="resource-box">
				<h3>Essential resource</h3>
				<p>The <a href="https://github.com/EdOverflow/can-i-take-over-xyz">can-i-take-over-xyz</a> GitHub repository maintains a current list of vulnerable services and their fingerprints. Check if your cloud provider is listed.</p>
			</div>

			<div class="cta-box">
				<p><strong>Automated scanning catches what manual audits miss.</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your subdomains
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to fix subdomain takeover</h2>
			<p>
				The fix is deceptively simple: remove the DNS record. The hard part is finding all the dangling records and building a process to prevent new ones.
			</p>

			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this into your AI coding tool to audit DNS and cloud configurations:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Audit my infrastructure for subdomain takeover vulnerabilities.

## What to check

1. DNS zone files or DNS provider configuration
2. Cloud service configurations (AWS, Azure, Heroku, etc.)
3. Any CNAME records pointing to external services
4. A records pointing to IP addresses of decommissioned servers

## Files and configs to review

- DNS zone files (if self-hosted)
- Terraform/Pulumi/CDK infrastructure code
- Cloudflare/Route53/Azure DNS configurations
- package.json scripts that deploy to cloud services
- CI/CD workflows that create/destroy infrastructure
- docker-compose files with cloud service integrations

## Detection steps

1. List all CNAME records in my DNS
2. For each CNAME, check if the target is:
   - Returning NXDOMAIN (domain doesn't exist)
   - Showing a cloud provider error page
   - Showing "No such app/bucket/site" messages
3. Flag any record where the target appears unclaimed

## Vulnerable service fingerprints

- AWS S3: "NoSuchBucket" or "The specified bucket does not exist"
- Heroku: "No such app" or "There is no app configured at that hostname"
- GitHub Pages: "There isn't a GitHub Pages site here"
- Azure: "404 Web Site not found" with Azure styling
- Shopify: "Sorry, this shop is currently unavailable"
- Fastly: "Fastly error: unknown domain"

## How to fix

For each vulnerable subdomain:

1. OPTION A (Preferred): Remove the DNS record entirely
   \`\`\`
   # Delete the CNAME record from DNS
   # This is the safest approach
   \`\`\`

2. OPTION B: Reclaim the resource
   \`\`\`
   # If you need the subdomain, create the cloud resource
   # with the exact name your DNS expects
   \`\`\`

3. OPTION C: Point to a placeholder
   \`\`\`
   # Create a simple page explaining the subdomain is inactive
   # Better than leaving it claimable
   \`\`\`

## Prevention going forward

1. Create a DNS inventory with owners for each record
2. Add "delete DNS record" to your decommissioning checklist
3. Set up automated monitoring for CNAME targets
4. Use Azure alias records or AWS Route53 alias records where possible

## After fixing

List all DNS records you reviewed and their status (safe/removed/reclaimed).`}</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Quick fixes by service</h3>
				<div class="service-fixes">
					<div class="service-fix">
						<h4>AWS S3</h4>
						<p>Delete the CNAME, or create an S3 bucket with the exact name matching your subdomain. Bucket names are globally unique.</p>
					</div>
					<div class="service-fix">
						<h4>Heroku</h4>
						<p>Delete the CNAME from DNS. Heroku app names can be claimed by anyone if not in use.</p>
					</div>
					<div class="service-fix">
						<h4>Azure</h4>
						<p>Use Azure alias records instead of CNAMEs. They automatically clean up when the resource is deleted.</p>
					</div>
					<div class="service-fix">
						<h4>GitHub Pages</h4>
						<p>Delete the CNAME, or add a CNAME file to your repo to claim the subdomain.</p>
					</div>
				</div>
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
				<a href="/kb/security/vulnerabilities/dependency-confusion/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Dependency Confusion</div>
					<p class="related-card-description">Supply chain attacks via package registries</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-security-headers/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Security Headers</div>
					<p class="related-card-description">Essential HTTP headers for protection</p>
				</a>
				<a href="/kb/security/vulnerabilities/insecure-cors/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Insecure CORS</div>
					<p class="related-card-description">Cross-origin misconfigurations</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Dangling DNS is a ticking time bomb</h2>
			<p>Find forgotten subdomains before attackers claim them.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan your infrastructure
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>
	</article>
</div>

<style>
	.badge-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* Breach Timeline */
	.breach-timeline {
		margin: 1.5rem 0;
		border-left: 2px solid var(--border);
		padding-left: 1.5rem;
	}

	.breach-item {
		position: relative;
		padding-bottom: 1.25rem;
	}

	.breach-item::before {
		content: '';
		position: absolute;
		left: -1.75rem;
		top: 0.25rem;
		width: 10px;
		height: 10px;
		background: var(--bg-primary);
		border: 2px solid var(--green);
	}

	.breach-year {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.breach-details {
		color: var(--text-secondary);
		font-size: 0.9375rem;
		line-height: 1.6;
	}

	.breach-details strong {
		color: var(--text-primary);
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

	.pattern-note {
		margin: 1rem 0 0 !important;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Resource Box */
	.resource-box {
		background: var(--bg-secondary);
		border-left: 3px solid var(--green);
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	.resource-box h3 {
		margin: 0 0 0.5rem;
		font-size: 0.9375rem;
	}

	.resource-box p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
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

	/* Service Fixes */
	.service-fixes {
		display: grid;
		gap: 1rem;
		margin-top: 1rem;
	}

	.service-fix {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem 1.25rem;
	}

	.service-fix h4 {
		margin: 0 0 0.5rem;
		font-size: 0.9375rem;
		color: var(--text-primary);
	}

	.service-fix p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
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
	}

	.faq-item p {
		margin: 0;
		font-size: 0.9375rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	/* Final CTA */
	.final-cta {
		text-align: center;
		padding: 3rem 2rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		margin-top: 3rem;
	}

	.final-cta h2 {
		margin-bottom: 0.75rem;
	}

	.final-cta p {
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}

	@media (max-width: 768px) {
		.faq-item h3 {
			font-size: 1rem;
		}

		.service-fixes {
			grid-template-columns: 1fr;
		}
	}
</style>
