<script lang="ts">
	import { onMount } from 'svelte';
	import { Header } from '$lib/components/layout';

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Vibe Coding Tools', href: '/kb/vibe-coding-tools' },
		{ label: 'Lovable' }
	];

	const faqs = [
		{
			question: 'Is Lovable AI safe to use?',
			answer:
				'Lovable can be safe IF you manually configure security. The critical issue is that Lovable-generated apps often have <a href="/kb/security/vulnerabilities/broken-access-control/">broken access control</a> due to missing or weak Row Level Security policies. CVE-2025-48757 exposed 170+ apps because of this. Before publishing any Lovable app, audit every Supabase table, enable RLS, and create proper policies. The built-in security scanner helps but isn\'t comprehensive.'
		},
		{
			question: 'What is CVE-2025-48757?',
			answer:
				'CVE-2025-48757 (CVSS 9.3 Critical) is a severe vulnerability affecting Lovable-generated apps. Researchers found 303 vulnerable endpoints across 170+ apps (10.3% of analyzed projects) where missing <a href="https://supabase.com/docs/guides/auth/row-level-security">Row Level Security</a> policies allowed anyone to read and write database data. Exposed data included emails, addresses, API keys, and financial records. The CVE was published May 29, 2025 after a 45-day disclosure window.'
		},
		{
			question: 'How do I fix RLS issues in Lovable apps?',
			answer:
				'First, enable RLS on every table: <code>ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;</code>. Then create policies that restrict access: <code>CREATE POLICY "user_isolation" ON your_table FOR ALL USING (auth.uid() = user_id);</code>. Check your Supabase dashboard under Authentication > Policies. Every table with user data needs a policy filtering by <code>auth.uid()</code>. Don\'t trust "authenticated" alone - that only means logged in, not authorized.'
		},
		{
			question: 'Can Lovable be used for phishing?',
			answer:
				'Yes. <a href="https://thehackernews.com/2025/04/lovable-ai-found-most-vulnerable-to.html">Guardio Labs research</a> tested AI tools\' resistance to generating phishing content. Lovable scored 1.8/10 (worst among tested, vs ChatGPT at 8.0/10). Attackers can generate pixel-perfect login pages mimicking Microsoft, Google, or banks, auto-deploy them to trusted *.lovable.app subdomains, and harvest credentials. This "VibeScamming" risk makes Lovable apps appear legitimate to victims.'
		},
		{
			question: 'How does Lovable compare to other AI tools for security?',
			answer:
				'Lovable has unique risks because it deploys full-stack apps with databases. <a href="/kb/vibe-coding-tools/bolt/">Bolt</a> and <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> generate code but you deploy it - security is your responsibility from the start. <a href="/kb/vibe-coding-tools/v0/">v0</a> only generates UI components. Lovable\'s convenience (chat-to-deployed-app) means security decisions are made for you, often incorrectly. The tradeoff is speed vs security awareness.'
		}
	];

	// Schema.org structured data
	let schemaData: object;

	onMount(() => {
		schemaData = {
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'TechArticle',
					headline: 'Lovable Security: CVE-2025-48757, RLS Failures, and VibeScamming Risks',
					description:
						"Lovable's CVE-2025-48757 exposed 170+ apps due to missing RLS policies. Learn why Lovable scored 1.8/10 on security benchmarks and how to protect your vibe coded apps.",
					author: {
						'@type': 'Organization',
						name: 'vibeship',
						url: 'https://vibeship.co'
					},
					publisher: {
						'@type': 'Organization',
						name: 'vibeship',
						url: 'https://vibeship.co'
					},
					datePublished: '2025-12-17',
					dateModified: '2025-12-17',
					mainEntityOfPage: {
						'@type': 'WebPage',
						'@id': 'https://vibeship.co/kb/vibe-coding-tools/lovable/'
					},
					about: [
						{
							'@type': 'SoftwareApplication',
							name: 'Lovable',
							url: 'https://lovable.dev'
						}
					],
					keywords:
						'lovable security, lovable.dev vulnerabilities, CVE-2025-48757, lovable RLS, is lovable safe, vibe coding security'
				},
				{
					'@type': 'FAQPage',
					mainEntity: faqs.map((faq) => ({
						'@type': 'Question',
						name: faq.question,
						acceptedAnswer: {
							'@type': 'Answer',
							text: faq.answer.replace(/<[^>]*>/g, '')
						}
					}))
				},
				{
					'@type': 'BreadcrumbList',
					itemListElement: [
						{
							'@type': 'ListItem',
							position: 1,
							name: 'Home',
							item: 'https://vibeship.co'
						},
						{
							'@type': 'ListItem',
							position: 2,
							name: 'Knowledge Base',
							item: 'https://vibeship.co/kb/'
						},
						{
							'@type': 'ListItem',
							position: 3,
							name: 'Vibe Coding Tools',
							item: 'https://vibeship.co/kb/vibe-coding-tools/'
						},
						{
							'@type': 'ListItem',
							position: 4,
							name: 'Lovable',
							item: 'https://vibeship.co/kb/vibe-coding-tools/lovable/'
						}
					]
				}
			]
		};

		const script = document.createElement('script');
		script.type = 'application/ld+json';
		script.textContent = JSON.stringify(schemaData);
		document.head.appendChild(script);

		return () => {
			script.remove();
		};
	});
</script>

<svelte:head>
	<title>Lovable Security: CVE & RLS Risks | VibeShip</title>
	<meta
		name="description"
		content="Lovable's CVE-2025-48757 exposed 170+ apps due to missing RLS policies. Learn why Lovable scored 1.8/10 on security benchmarks and how to protect your vibe coded apps."
	/>
	<meta
		name="keywords"
		content="lovable security, lovable.dev vulnerabilities, CVE-2025-48757, lovable RLS, is lovable safe, vibe coding"
	/>
	<link rel="canonical" href="https://vibeship.co/kb/vibe-coding-tools/lovable/" />

	<!-- Open Graph -->
	<meta property="og:title" content="Lovable Security: CVE-2025-48757, RLS Failures, and VibeScamming Risks" />
	<meta
		property="og:description"
		content="Lovable's CVE-2025-48757 exposed 170+ apps. Learn about RLS failures and how to secure your Lovable apps."
	/>
	<meta property="og:url" content="https://vibeship.co/kb/vibe-coding-tools/lovable/" />
	<meta property="og:type" content="article" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Lovable Security: CVE-2025-48757, RLS Failures, and VibeScamming Risks" />
	<meta
		name="twitter:description"
		content="CVE-2025-48757 exposed 170+ Lovable apps. Learn how to secure your vibe coded apps."
	/>
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<!-- Article Header -->
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-critical">Critical CVE</span>
				<span class="badge badge-info">AI Tool</span>
				<span class="badge badge-high">Security Risk</span>
			</div>

			<h1>Lovable Security: CVE-2025-48757, RLS Failures, and VibeScamming Risks</h1>

			<p class="subtitle">
				A $1.8B vibe coding tool with a CVSS 9.3 Critical vulnerability and the worst phishing resistance score among tested AI tools.
			</p>

			<!-- Quick Answer Box -->
			<div class="quick-answer">
				<strong>Quick Answer:</strong>
				<a href="https://lovable.dev" target="_blank" rel="noopener">Lovable</a> is a popular AI app builder, but
				<a href="https://www.superblocks.com/blog/lovable-vulnerabilities" target="_blank" rel="noopener">CVE-2025-48757</a>
				exposed 170+ apps due to missing database security. It also scored worst (1.8/10) on phishing resistance tests. Before publishing any Lovable app, enable Row Level Security on ALL Supabase tables and verify policies restrict access properly.
			</div>
		</header>

		<!-- CVE Alert Box -->
		<div class="cve-alert">
			<div class="cve-header">
				<span class="cve-id">CVE-2025-48757</span>
				<span class="cve-score">CVSS 9.3 (Critical)</span>
			</div>
			<div class="cve-details">
				<p><strong>Vulnerability:</strong> Missing Row Level Security in Lovable-generated Supabase apps</p>
				<p><strong>Impact:</strong> 170+ apps exposed, 303 vulnerable endpoints, unauthorized data access</p>
				<p><strong>Status:</strong> Partially addressed - manual security review required</p>
			</div>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<span class="stat-value">$1.8B</span>
				<span class="stat-label">Valuation</span>
			</div>
			<div class="stat-box">
				<span class="stat-value critical">170+</span>
				<span class="stat-label">Apps Exposed</span>
			</div>
			<div class="stat-box">
				<span class="stat-value critical">1.8/10</span>
				<span class="stat-label">Phishing Resist</span>
			</div>
			<div class="stat-box">
				<span class="stat-value critical">10.3%</span>
				<span class="stat-label">Vuln Rate</span>
			</div>
		</div>

		<!-- Table of Contents -->
		<nav class="toc">
			<div class="toc-title">Contents</div>
			<ol class="toc-list">
				<li><a href="#what-is-lovable">What is Lovable?</a></li>
				<li><a href="#cve-2025-48757">The CVE-2025-48757 Disaster</a></li>
				<li><a href="#vibescamming">VibeScamming: The Phishing Risk</a></li>
				<li><a href="#security-issues">Common Security Issues</a></li>
				<li><a href="#how-to-secure">How to Secure Your Lovable App</a></li>
				<li><a href="#tool-comparison">Lovable vs Other AI Tools</a></li>
				<li><a href="#ai-fix-prompt">AI Fix Prompt</a></li>
				<li><a href="#faq">FAQ</a></li>
			</ol>
		</nav>

		<!-- Section 1: What is Lovable? -->
		<section id="what-is-lovable" class="article-section">
			<h2>What is Lovable?</h2>

			<p>
				<a href="https://lovable.dev" target="_blank" rel="noopener">Lovable</a> (formerly GPT Engineer) is an AI tool that lets you build full-stack web apps by chatting with AI. Describe what you want, and Lovable generates a complete React + TypeScript application with a Supabase backend. One-click deployment gets your app live on a *.lovable.app subdomain.
			</p>

			<p>
				The appeal is obvious for vibe coders: go from idea to deployed app in minutes without writing code. Lovable hit a $1.8B valuation in February 2025, making it one of the most valuable AI coding startups. The tech stack is modern: React, TypeScript, Tailwind CSS, Vite, Shadcn UI, and Supabase for database, auth, and storage.
			</p>

			<p>
				The problem? Lovable's speed-first approach means security often comes second. When you don't see the database configuration, you don't think about it - and that's exactly where things go wrong.
			</p>

			<div class="alert alert-info">
				<div class="alert-title">Lovable Stack</div>
				<p>React + TypeScript + Tailwind + Vite + Shadcn UI + Supabase</p>
			</div>
		</section>

		<!-- Section 2: CVE-2025-48757 -->
		<section id="cve-2025-48757" class="article-section">
			<h2>The CVE-2025-48757 Disaster</h2>

			<p>
				In March 2025, security researcher Matt Palmer discovered a critical vulnerability in Lovable-generated apps. The root cause: <a href="https://supabase.com/docs/guides/auth/row-level-security" target="_blank" rel="noopener">Row Level Security (RLS)</a> was either not enabled or implemented incorrectly on Supabase tables.
			</p>

			<h3>What Went Wrong</h3>

			<p>
				When you create a table in Supabase, RLS is disabled by default. Without RLS policies, anyone with the Supabase <code>anon_key</code> (which is always public in the frontend) can query the database directly. Lovable-generated apps often shipped without proper RLS configuration, exposing all user data.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Attack Flow</span>
				</div>
				<pre><code>1. Attacker finds Lovable-built app (*.lovable.app)
2. Views page source → finds Supabase URL and anon_key
3. Connects to Supabase directly with the anon_key
4. Missing RLS = full read/write access to ALL data</code></pre>
			</div>

			<h3>The Scale of Exposure</h3>

			<p>
				Researchers scanned 1,645 projects from Lovable's "Lovable Launched" showcase and found:
			</p>

			<ul>
				<li><strong>303 vulnerable endpoints</strong> across 170 projects</li>
				<li><strong>10.3%</strong> of analyzed applications had inadequate security</li>
				<li>Exposed data included: emails, phone numbers, home addresses, personal debt amounts, API keys (Google Maps, Gemini, eBay), Stripe credentials, financial transactions</li>
			</ul>

			<h3>Disclosure Timeline</h3>

			<div class="timeline">
				<div class="timeline-item">
					<span class="timeline-date">March 20, 2025</span>
					<span class="timeline-event">Matt Palmer reports vulnerability to Lovable</span>
				</div>
				<div class="timeline-item">
					<span class="timeline-date">April 14, 2025</span>
					<span class="timeline-event">Palantir engineer independently discovers and tweets exploit</span>
				</div>
				<div class="timeline-item">
					<span class="timeline-date">April 24, 2025</span>
					<span class="timeline-event">Lovable 2.0 released with security scanner</span>
				</div>
				<div class="timeline-item">
					<span class="timeline-date">May 29, 2025</span>
					<span class="timeline-event">CVE-2025-48757 published (45-day window expired)</span>
				</div>
			</div>

			<div class="alert alert-warning">
				<div class="alert-title">Important</div>
				<p>Lovable's security scanner checks if RLS <em>exists</em>, not if it's <em>correct</em>. A policy that allows all authenticated users to see all data passes the scanner but is still a <a href="/kb/security/vulnerabilities/broken-access-control/">broken access control</a> vulnerability.</p>
			</div>
		</section>

		<!-- Section 3: VibeScamming -->
		<section id="vibescamming" class="article-section">
			<h2>VibeScamming: The Phishing Risk</h2>

			<p>
				Beyond database security, Lovable has another problem: it's highly susceptible to generating phishing content. <a href="https://thehackernews.com/2025/04/lovable-ai-found-most-vulnerable-to.html" target="_blank" rel="noopener">Guardio Labs</a> tested AI tools' resistance to malicious prompts and developed a "VibeScamming Benchmark."
			</p>

			<h3>Benchmark Results</h3>

			<div class="benchmark-stack">
				<div class="benchmark-row">
					<span class="benchmark-tool">ChatGPT</span>
					<span class="benchmark-score score-good">8.0/10</span>
					<span class="benchmark-assessment">Most cautious, high pushback on malicious requests</span>
				</div>
				<div class="benchmark-row">
					<span class="benchmark-tool">Claude</span>
					<span class="benchmark-score score-medium">4.3/10</span>
					<span class="benchmark-assessment">Initial resistance, persuadable with "security research" framing</span>
				</div>
				<div class="benchmark-row highlight-bad">
					<span class="benchmark-tool">Lovable</span>
					<span class="benchmark-score score-bad">1.8/10</span>
					<span class="benchmark-assessment">Highest exploitability, minimal guardrails</span>
				</div>
			</div>

			<h3>What Attackers Can Build</h3>

			<ul>
				<li><strong>Pixel-perfect phishing pages:</strong> Login pages mimicking Microsoft, Google, banks</li>
				<li><strong>Auto-deployment:</strong> Instantly hosted on trusted *.lovable.app subdomains</li>
				<li><strong>Credential harvesting:</strong> Forms that capture and exfiltrate login data</li>
				<li><strong>Admin dashboards:</strong> Real-time monitoring of stolen credentials</li>
				<li><strong>Data exfiltration:</strong> Send data to Firebase, Telegram, or external servers</li>
			</ul>

			<p>
				The risk for legitimate vibe coders? Your app shares infrastructure with potential phishing pages. And if you're building auth flows, Lovable might generate patterns similar to what attackers use - meaning your legitimate login page could look suspicious to security tools.
			</p>
		</section>

		<!-- Section 4: Common Security Issues -->
		<section id="security-issues" class="article-section">
			<h2>Common Security Issues in Lovable Apps</h2>

			<h3>Issue 1: Missing RLS Policies</h3>

			<p>The most critical issue. When RLS is disabled, anyone can query your database.</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable</div>
					<pre><code>-- Table created without RLS
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT,
  created_at TIMESTAMPTZ
);
-- RLS not enabled = anyone can read ALL users</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure</div>
					<pre><code>-- Enable RLS and create proper policy
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access own data"
ON users
FOR ALL
USING (auth.uid() = id);</code></pre>
				</div>
			</div>

			<h3>Issue 2: Overly Permissive RLS</h3>

			<p>
				Having RLS enabled isn't enough - the policy must actually restrict access. This is a classic <a href="/kb/security/vulnerabilities/idor/">IDOR vulnerability</a>.
			</p>

			<div class="code-block vulnerable">
				<div class="code-label">Vulnerable</div>
				<pre><code>-- Policy allows too much access
CREATE POLICY "Allow all authenticated"
ON sensitive_data
FOR SELECT
USING (auth.role() = 'authenticated');
-- ANY logged-in user sees ALL data - not just their own</code></pre>
			</div>

			<h3>Issue 3: Exposed API Keys</h3>

			<p>
				Lovable apps expose Supabase credentials in frontend code. The <code>anon_key</code> is designed to be public, but real API keys (Google Maps, Stripe, etc.) should never be in client code. This relates to <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a> vulnerabilities.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">JavaScript - Frontend Code</span>
				</div>
				<pre><code>// Lovable exposes these (by design - this is expected)
const supabase = createClient(
  'https://xxx.supabase.co',
  'eyJhbG...' // anon key - ALWAYS public
)

// Security depends ENTIRELY on RLS policies
// If RLS is missing or weak, this key = full access</code></pre>
			</div>

			<h3>Issue 4: Client-Side Validation Only</h3>

			<p>
				Lovable often generates validation only in the frontend, which attackers bypass by calling the API directly.
			</p>

			<div class="code-block vulnerable">
				<div class="code-label">Vulnerable</div>
				<pre><code>// Client-side validation only - easily bypassed
const handleSubmit = (data) => {'{'}
  if (data.amount > 0) {'{'}  // Attacker skips this check
    await supabase.from('transactions').insert(data)
  {'}'}
{'}'}</code></pre>
			</div>
		</section>

		<!-- Section 5: How to Secure -->
		<section id="how-to-secure" class="article-section">
			<h2>How to Secure Your Lovable App</h2>

			<h3>Step 1: Audit Every Table</h3>

			<p>Go to your Supabase dashboard and check RLS status for all tables:</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">SQL - Audit Query</span>
				</div>
				<pre><code>-- List all tables and their RLS status
SELECT
  schemaname,
  tablename,
  rowsecurity as "RLS Enabled"
FROM pg_tables
WHERE schemaname = 'public';</code></pre>
			</div>

			<h3>Step 2: Enable RLS on ALL Tables</h3>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">SQL</span>
				</div>
				<pre><code>-- Enable RLS on each table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
-- Repeat for EVERY table with user data</code></pre>
			</div>

			<h3>Step 3: Create Proper Policies</h3>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">SQL - Common Policy Patterns</span>
				</div>
				<pre><code>-- Users can only see their own data
CREATE POLICY "user_isolation" ON your_table
FOR ALL USING (auth.uid() = user_id);

-- Public read, authenticated write
CREATE POLICY "public_read" ON posts
FOR SELECT USING (true);

CREATE POLICY "auth_write" ON posts
FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Admin-only access
CREATE POLICY "admin_only" ON admin_data
FOR ALL USING (
  auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
);</code></pre>
			</div>

			<h3>Step 4: Protect Real API Keys</h3>

			<ul>
				<li>Never hardcode API keys (Google Maps, Stripe, etc.) in frontend</li>
				<li>Use Lovable's Secrets feature for sensitive values</li>
				<li>Move sensitive operations to Supabase Edge Functions</li>
			</ul>

			<h3>Step 5: Request Security Review</h3>

			<p>
				In Lovable, you can prompt: <strong>"review my app's security"</strong>. The AI will scan for common issues. But remember: this scanner has limitations. Manual review is still required.
			</p>

			<div class="security-checklist">
				<h4>Security Checklist for Lovable Apps</h4>
				<ul class="checklist">
					<li class="checklist-item">
						<span class="checklist-checkbox"></span>
						<span class="checklist-content">RLS enabled on ALL tables with user data</span>
					</li>
					<li class="checklist-item">
						<span class="checklist-checkbox"></span>
						<span class="checklist-content">Every policy uses <code>auth.uid()</code> to filter by user</span>
					</li>
					<li class="checklist-item">
						<span class="checklist-checkbox"></span>
						<span class="checklist-content">No "authenticated" policies without user filtering</span>
					</li>
					<li class="checklist-item">
						<span class="checklist-checkbox"></span>
						<span class="checklist-content">No real API keys in frontend code</span>
					</li>
					<li class="checklist-item">
						<span class="checklist-checkbox"></span>
						<span class="checklist-content">Sensitive operations in Edge Functions</span>
					</li>
					<li class="checklist-item">
						<span class="checklist-checkbox"></span>
						<span class="checklist-content">Asked Lovable to "review my app's security"</span>
					</li>
					<li class="checklist-item">
						<span class="checklist-checkbox"></span>
						<span class="checklist-content">Manual verification of all policies in Supabase dashboard</span>
					</li>
				</ul>
			</div>
		</section>

		<!-- Section 6: Tool Comparison -->
		<section id="tool-comparison" class="article-section">
			<h2>Lovable vs Other AI Tools</h2>

			<div class="comparison-stack">
				<div class="comparison-row highlight-bad">
					<div class="comparison-tool"><strong>Lovable</strong></div>
					<div class="comparison-details">
						<div class="comparison-item">
							<span class="comparison-label">RLS Handling</span>
							<span class="risk-high">Often missing</span>
						</div>
						<div class="comparison-item">
							<span class="comparison-label">Scanner</span>
							<span>Yes (limited)</span>
						</div>
						<div class="comparison-item">
							<span class="comparison-label">Deployment</span>
							<span>Auto-deploys full apps</span>
						</div>
					</div>
				</div>
				<div class="comparison-row">
					<div class="comparison-tool"><a href="/kb/vibe-coding-tools/bolt/">Bolt</a></div>
					<div class="comparison-details">
						<div class="comparison-item">
							<span class="comparison-label">RLS Handling</span>
							<span class="risk-medium">User responsibility</span>
						</div>
						<div class="comparison-item">
							<span class="comparison-label">Scanner</span>
							<span>No</span>
						</div>
						<div class="comparison-item">
							<span class="comparison-label">Deployment</span>
							<span>Generates code, you deploy</span>
						</div>
					</div>
				</div>
				<div class="comparison-row">
					<div class="comparison-tool"><a href="/kb/vibe-coding-tools/v0/">v0</a></div>
					<div class="comparison-details">
						<div class="comparison-item">
							<span class="comparison-label">RLS Handling</span>
							<span class="risk-low">N/A (UI only)</span>
						</div>
						<div class="comparison-item">
							<span class="comparison-label">Scanner</span>
							<span>Deployment blocks</span>
						</div>
						<div class="comparison-item">
							<span class="comparison-label">Deployment</span>
							<span>UI components only</span>
						</div>
					</div>
				</div>
				<div class="comparison-row">
					<div class="comparison-tool"><a href="/kb/vibe-coding-tools/cursor/">Cursor</a></div>
					<div class="comparison-details">
						<div class="comparison-item">
							<span class="comparison-label">RLS Handling</span>
							<span class="risk-medium">User responsibility</span>
						</div>
						<div class="comparison-item">
							<span class="comparison-label">Scanner</span>
							<span>No</span>
						</div>
						<div class="comparison-item">
							<span class="comparison-label">Deployment</span>
							<span>Generates code, you deploy</span>
						</div>
					</div>
				</div>
			</div>

			<p>
				The key difference: Lovable deploys full-stack apps with databases. Other tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> and <a href="/kb/vibe-coding-tools/bolt/">Bolt</a> generate code that you deploy yourself, so you're forced to think about database configuration. Lovable's convenience hides this complexity - and the security decisions it makes for you are often wrong.
			</p>

			<p>
				For Supabase-specific security, see our guides on <a href="/kb/security/stacks/nextjs-supabase/">Next.js + Supabase security</a> and <a href="/kb/security/stacks/sveltekit-supabase/">SvelteKit + Supabase security</a>.
			</p>
		</section>

		<!-- Section 7: AI Fix Prompt -->
		<section id="ai-fix-prompt" class="article-section">
			<h2>AI Fix Prompt: Audit Your Lovable App</h2>

			<p>Copy this prompt into Lovable or any AI assistant to audit your app:</p>

			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span class="fix-prompt-label">AI Security Audit Prompt</span>
					<button
						class="copy-btn"
						onclick={(e) => {
							const content = e.currentTarget.closest('.fix-prompt')?.querySelector('.fix-prompt-content')?.textContent || '';
							navigator.clipboard.writeText(content);
							e.currentTarget.textContent = 'Copied!';
							setTimeout(() => e.currentTarget.textContent = 'Copy', 2000);
						}}
					>
						Copy
					</button>
				</div>
				<div class="fix-prompt-content">Review my Lovable-generated app for security vulnerabilities:

## Check 1: Row Level Security
For every Supabase table:
- Is RLS enabled? (ALTER TABLE x ENABLE ROW LEVEL SECURITY)
- Are policies defined?
- Do policies properly restrict by auth.uid()?
- Flag: Tables with RLS disabled
- Flag: Policies using only 'authenticated' without user filtering

## Check 2: API Key Exposure
Search for:
- Hardcoded API keys in frontend code (Google Maps, Stripe, etc.)
- Keys in environment variables exposed to client
- Supabase anon_key is expected - real API keys are NOT
- Recommend: Move real API keys to Lovable Secrets + Edge Functions

## Check 3: Authentication Requirements
For sensitive operations:
- Is auth required before data access?
- Are there unprotected API endpoints?
- Flag: Operations that should require auth but don't

## Check 4: Data Exposure
Check if responses include:
- More data than necessary (over-fetching)
- Sensitive fields (passwords, tokens, PII)
- Recommend: Select only needed fields in queries

## Check 5: Input Validation
Verify:
- Server-side validation exists (not just client)
- Edge Functions validate before database operations
- Type checking on all user inputs

## Output Format
For each vulnerability found:
1. Location (file/table/endpoint)
2. The vulnerable code/config
3. Attack scenario (how an attacker exploits it)
4. Secure replacement code
5. Severity: Critical/High/Medium

Prioritize by severity. Provide copy-paste fixes.</div>
			</div>
		</section>

		<!-- FAQ Section -->
		<section id="faq" class="article-section">
			<h2>Frequently Asked Questions</h2>

			<div class="faq-list">
				{#each faqs as faq}
					<div class="faq-item">
						<h3>{faq.question}</h3>
						<p>{@html faq.answer}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related Articles</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/broken-access-control/" class="card card-interactive">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Broken Access Control</div>
					<p class="related-card-description">The #1 OWASP vulnerability. Missing RLS is a form of broken access control.</p>
				</a>
				<a href="/kb/security/vulnerabilities/idor/" class="card card-interactive">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">IDOR Vulnerabilities</div>
					<p class="related-card-description">When weak RLS policies let users access each other's data.</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Complete guide to RLS policies and Supabase security configuration.</p>
				</a>
				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive">
					<div class="related-card-category">Tool</div>
					<div class="related-card-title">Bolt Security Patterns</div>
					<p class="related-card-description">How Bolt compares to Lovable for security-conscious vibe coding.</p>
				</a>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="final-cta">
			<h2>Scan Your Lovable App</h2>
			<p>
				vibeship scanner detects missing RLS policies, exposed API keys, and other vulnerabilities in your vibe coded apps - including those built with Lovable.
			</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">Try vibeship scanner Free →</a>
		</section>
	</article>
</div>

<style>
	/* Stats Row - Sharp edges */
	.stats-row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin-bottom: 2rem;
	}

	/* CVE Alert Box - Sharp edges */
	.cve-alert {
		background: var(--bg-secondary);
		border: 1px solid var(--red);
		border-left: 3px solid var(--red);
		padding: 1.25rem;
		margin-bottom: 2rem;
	}

	.cve-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.cve-id {
		font-family: 'JetBrains Mono', monospace;
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--red);
	}

	.cve-score {
		background: var(--red);
		color: white;
		padding: 0.25rem 0.75rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.cve-details p {
		margin: 0.5rem 0;
		color: var(--text-secondary);
	}

	/* Timeline - Sharp edges */
	.timeline {
		border-left: 2px solid var(--border);
		margin: 1.5rem 0 1.5rem 1rem;
		padding-left: 1.5rem;
	}

	.timeline-item {
		position: relative;
		margin-bottom: 1rem;
	}

	.timeline-item::before {
		content: '';
		position: absolute;
		left: -1.75rem;
		top: 0.5rem;
		width: 0.75rem;
		height: 0.75rem;
		background: var(--green-dim);
	}

	.timeline-date {
		display: block;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--green-dim);
	}

	.timeline-event {
		color: var(--text-secondary);
	}

	/* Score badges */
	.score-good {
		color: var(--green);
		font-weight: 600;
	}

	.score-medium {
		color: var(--orange);
		font-weight: 600;
	}

	.score-bad {
		color: var(--red);
		font-weight: 600;
	}

	/* Risk badges */
	.risk-low {
		display: inline-block;
		padding: 0.125rem 0.5rem;
		background: transparent;
		border: 1px solid var(--green);
		color: var(--green);
		font-size: 0.75rem;
		font-weight: 600;
	}

	.risk-medium {
		display: inline-block;
		padding: 0.125rem 0.5rem;
		background: transparent;
		border: 1px solid var(--orange);
		color: var(--orange);
		font-size: 0.75rem;
		font-weight: 600;
	}

	.risk-high {
		display: inline-block;
		padding: 0.125rem 0.5rem;
		background: transparent;
		border: 1px solid var(--red);
		color: var(--red);
		font-size: 0.75rem;
		font-weight: 600;
	}

	/* Security Checklist */
	.security-checklist {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
		margin: 1.5rem 0;
	}

	.security-checklist h4 {
		margin-top: 0;
		margin-bottom: 1rem;
		color: var(--text-primary);
	}

	.security-checklist .checklist-checkbox {
		width: 16px;
		height: 16px;
		border: 2px solid var(--border-strong);
		flex-shrink: 0;
	}

	.security-checklist .checklist-content {
		color: var(--text-secondary);
		line-height: 1.5;
	}

	/* Benchmark Stack - Mobile Friendly */
	.benchmark-stack {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1.5rem 0;
	}

	.benchmark-row {
		display: grid;
		grid-template-columns: 100px 80px 1fr;
		gap: 1rem;
		padding: 0.75rem 1rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		align-items: center;
	}

	.benchmark-row.highlight-bad {
		border-left: 3px solid var(--red);
	}

	.benchmark-tool {
		font-weight: 600;
	}

	.benchmark-score {
		font-family: 'JetBrains Mono', monospace;
		font-weight: 600;
	}

	.benchmark-assessment {
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	@media (max-width: 600px) {
		.benchmark-row {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}
	}

	/* Comparison Stack - Mobile Friendly */
	.comparison-stack {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1.5rem 0;
	}

	.comparison-row {
		display: grid;
		grid-template-columns: 100px 1fr;
		gap: 1rem;
		padding: 1rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	.comparison-row.highlight-bad {
		border-left: 3px solid var(--red);
	}

	.comparison-tool {
		font-weight: 600;
	}

	.comparison-details {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.comparison-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.comparison-label {
		font-size: 0.7rem;
		text-transform: uppercase;
		color: var(--text-tertiary);
		letter-spacing: 0.05em;
	}

	@media (max-width: 700px) {
		.comparison-row {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}

		.comparison-details {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	@media (max-width: 480px) {
		.comparison-details {
			grid-template-columns: 1fr;
		}
	}

	/* Responsive */
	@media (max-width: 768px) {
		.stats-row {
			grid-template-columns: repeat(2, 1fr);
		}

		.cve-header {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	@media (max-width: 480px) {
		.stats-row {
			grid-template-columns: 1fr;
		}
	}
</style>
