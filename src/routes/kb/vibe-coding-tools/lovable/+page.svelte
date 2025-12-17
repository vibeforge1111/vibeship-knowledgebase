<script lang="ts">
	import { onMount } from 'svelte';

	// FAQ accordion state using Svelte 5 runes
	let openFaq = $state<number | null>(null);

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}

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
	<title>Lovable Security: CVE-2025-48757, RLS Failures, and VibeScamming Risks | vibeship</title>
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

<div class="article-container">
	<!-- Breadcrumb Navigation -->
	<nav class="breadcrumb" aria-label="Breadcrumb">
		<ol>
			<li><a href="/">Home</a></li>
			<li><a href="/kb/">Knowledge Base</a></li>
			<li><a href="/kb/vibe-coding-tools/">Vibe Coding Tools</a></li>
			<li><span aria-current="page">Lovable</span></li>
		</ol>
	</nav>

	<article class="tool-article">
		<!-- Article Header -->
		<header class="article-header">
			<div class="meta-badges">
				<span class="badge badge-critical">Critical CVE</span>
				<span class="badge badge-tool">AI Tool</span>
				<span class="badge badge-warning">Security Risk</span>
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
		<div class="stats-box">
			<div class="stat-item">
				<span class="stat-value">$1.8B</span>
				<span class="stat-label">Valuation</span>
			</div>
			<div class="stat-item">
				<span class="stat-value bad">170+</span>
				<span class="stat-label">Apps Exposed</span>
			</div>
			<div class="stat-item">
				<span class="stat-value bad">1.8/10</span>
				<span class="stat-label">Phishing Resist</span>
			</div>
			<div class="stat-item">
				<span class="stat-value bad">10.3%</span>
				<span class="stat-label">Vuln Rate</span>
			</div>
		</div>

		<!-- Table of Contents -->
		<nav class="toc">
			<h2>Contents</h2>
			<ol>
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
		<section id="what-is-lovable">
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

			<div class="info-box">
				<strong>Lovable Stack:</strong> React + TypeScript + Tailwind + Vite + Shadcn UI + Supabase
			</div>
		</section>

		<!-- Section 2: CVE-2025-48757 -->
		<section id="cve-2025-48757">
			<h2>The CVE-2025-48757 Disaster</h2>

			<p>
				In March 2025, security researcher Matt Palmer discovered a critical vulnerability in Lovable-generated apps. The root cause: <a href="https://supabase.com/docs/guides/auth/row-level-security" target="_blank" rel="noopener">Row Level Security (RLS)</a> was either not enabled or implemented incorrectly on Supabase tables.
			</p>

			<h3>What Went Wrong</h3>

			<p>
				When you create a table in Supabase, RLS is disabled by default. Without RLS policies, anyone with the Supabase <code>anon_key</code> (which is always public in the frontend) can query the database directly. Lovable-generated apps often shipped without proper RLS configuration, exposing all user data.
			</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">Attack Flow</span>
				</div>
				<pre><code>{`1. Attacker finds Lovable-built app (*.lovable.app)
2. Views page source → finds Supabase URL and anon_key
3. Connects to Supabase directly with the anon_key
4. Missing RLS = full read/write access to ALL data`}</code></pre>
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

			<div class="warning-box">
				<strong>Important:</strong> Lovable's security scanner checks if RLS <em>exists</em>, not if it's <em>correct</em>. A policy that allows all authenticated users to see all data passes the scanner but is still a <a href="/kb/security/vulnerabilities/broken-access-control/">broken access control</a> vulnerability.
			</div>
		</section>

		<!-- Section 3: VibeScamming -->
		<section id="vibescamming">
			<h2>VibeScamming: The Phishing Risk</h2>

			<p>
				Beyond database security, Lovable has another problem: it's highly susceptible to generating phishing content. <a href="https://thehackernews.com/2025/04/lovable-ai-found-most-vulnerable-to.html" target="_blank" rel="noopener">Guardio Labs</a> tested AI tools' resistance to malicious prompts and developed a "VibeScamming Benchmark."
			</p>

			<h3>Benchmark Results</h3>

			<div class="comparison-table-container">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>AI Tool</th>
							<th>Score</th>
							<th>Assessment</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>ChatGPT</td>
							<td><span class="score-good">8.0/10</span></td>
							<td>Most cautious, high pushback on malicious requests</td>
						</tr>
						<tr>
							<td>Claude</td>
							<td><span class="score-medium">4.3/10</span></td>
							<td>Initial resistance, persuadable with "security research" framing</td>
						</tr>
						<tr>
							<td>Lovable</td>
							<td><span class="score-bad">1.8/10</span></td>
							<td>Highest exploitability, minimal guardrails</td>
						</tr>
					</tbody>
				</table>
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
		<section id="security-issues">
			<h2>Common Security Issues in Lovable Apps</h2>

			<h3>Issue 1: Missing RLS Policies</h3>

			<p>The most critical issue. When RLS is disabled, anyone can query your database.</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">SQL - VULNERABLE</span>
				</div>
				<pre><code>{`-- Table created without RLS
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT,
  created_at TIMESTAMPTZ
);
-- RLS not enabled = anyone can read ALL users`}</code></pre>
			</div>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">SQL - SECURE</span>
				</div>
				<pre><code>{`-- Enable RLS and create proper policy
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access own data"
ON users
FOR ALL
USING (auth.uid() = id);`}</code></pre>
			</div>

			<h3>Issue 2: Overly Permissive RLS</h3>

			<p>
				Having RLS enabled isn't enough - the policy must actually restrict access. This is a classic <a href="/kb/security/vulnerabilities/idor/">IDOR vulnerability</a>.
			</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">SQL - VULNERABLE</span>
				</div>
				<pre><code>{`-- Policy allows too much access
CREATE POLICY "Allow all authenticated"
ON sensitive_data
FOR SELECT
USING (auth.role() = 'authenticated');
-- ANY logged-in user sees ALL data - not just their own`}</code></pre>
			</div>

			<h3>Issue 3: Exposed API Keys</h3>

			<p>
				Lovable apps expose Supabase credentials in frontend code. The <code>anon_key</code> is designed to be public, but real API keys (Google Maps, Stripe, etc.) should never be in client code. This relates to <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a> vulnerabilities.
			</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">JavaScript - Frontend Code</span>
				</div>
				<pre><code>{`// Lovable exposes these (by design - this is expected)
const supabase = createClient(
  'https://xxx.supabase.co',
  'eyJhbG...' // anon key - ALWAYS public
)

// Security depends ENTIRELY on RLS policies
// If RLS is missing or weak, this key = full access`}</code></pre>
			</div>

			<h3>Issue 4: Client-Side Validation Only</h3>

			<p>
				Lovable often generates validation only in the frontend, which attackers bypass by calling the API directly.
			</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">JavaScript - VULNERABLE</span>
				</div>
				<pre><code>{`// Client-side validation only - easily bypassed
const handleSubmit = (data) => {
  if (data.amount > 0) {  // Attacker skips this check
    await supabase.from('transactions').insert(data)
  }
}`}</code></pre>
			</div>
		</section>

		<!-- Section 5: How to Secure -->
		<section id="how-to-secure">
			<h2>How to Secure Your Lovable App</h2>

			<h3>Step 1: Audit Every Table</h3>

			<p>Go to your Supabase dashboard and check RLS status for all tables:</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">SQL - Audit Query</span>
				</div>
				<pre><code>{`-- List all tables and their RLS status
SELECT
  schemaname,
  tablename,
  rowsecurity as "RLS Enabled"
FROM pg_tables
WHERE schemaname = 'public';`}</code></pre>
			</div>

			<h3>Step 2: Enable RLS on ALL Tables</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">SQL</span>
				</div>
				<pre><code>{`-- Enable RLS on each table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
-- Repeat for EVERY table with user data`}</code></pre>
			</div>

			<h3>Step 3: Create Proper Policies</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">SQL - Common Policy Patterns</span>
				</div>
				<pre><code>{`-- Users can only see their own data
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
);`}</code></pre>
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

			<div class="checklist">
				<h4>Security Checklist for Lovable Apps</h4>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>RLS enabled on ALL tables with user data</span>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Every policy uses <code>auth.uid()</code> to filter by user</span>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>No "authenticated" policies without user filtering</span>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>No real API keys in frontend code</span>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Sensitive operations in Edge Functions</span>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Asked Lovable to "review my app's security"</span>
				</label>
				<label class="checklist-item">
					<input type="checkbox" />
					<span>Manual verification of all policies in Supabase dashboard</span>
				</label>
			</div>
		</section>

		<!-- Section 6: Tool Comparison -->
		<section id="tool-comparison">
			<h2>Lovable vs Other AI Tools</h2>

			<div class="comparison-table-container">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Tool</th>
							<th>RLS Handling</th>
							<th>Security Scanner</th>
							<th>Deployment</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>Lovable</strong></td>
							<td><span class="risk-high">Often missing</span></td>
							<td>Yes (limited)</td>
							<td>Auto-deploys full apps</td>
						</tr>
						<tr>
							<td><a href="/kb/vibe-coding-tools/bolt/">Bolt</a></td>
							<td><span class="risk-medium">User responsibility</span></td>
							<td>No</td>
							<td>Generates code, you deploy</td>
						</tr>
						<tr>
							<td><a href="/kb/vibe-coding-tools/v0/">v0</a></td>
							<td><span class="risk-low">N/A (UI only)</span></td>
							<td>Deployment blocks</td>
							<td>UI components only</td>
						</tr>
						<tr>
							<td><a href="/kb/vibe-coding-tools/cursor/">Cursor</a></td>
							<td><span class="risk-medium">User responsibility</span></td>
							<td>No</td>
							<td>Generates code, you deploy</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p>
				The key difference: Lovable deploys full-stack apps with databases. Other tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> and <a href="/kb/vibe-coding-tools/bolt/">Bolt</a> generate code that you deploy yourself, so you're forced to think about database configuration. Lovable's convenience hides this complexity - and the security decisions it makes for you are often wrong.
			</p>

			<p>
				For Supabase-specific security, see our guides on <a href="/kb/security/stacks/nextjs-supabase/">Next.js + Supabase security</a> and <a href="/kb/security/stacks/sveltekit-supabase/">SvelteKit + Supabase security</a>.
			</p>
		</section>

		<!-- Section 7: AI Fix Prompt -->
		<section id="ai-fix-prompt">
			<h2>AI Fix Prompt: Audit Your Lovable App</h2>

			<p>Copy this prompt into Lovable or any AI assistant to audit your app:</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">AI Security Audit Prompt</span>
					<button
						class="copy-btn"
						onclick={(e) =>
							navigator.clipboard.writeText(
								e.currentTarget.parentElement?.nextElementSibling?.textContent || ''
							)}
					>
						Copy
					</button>
				</div>
				<pre><code>{`Review my Lovable-generated app for security vulnerabilities:

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

Prioritize by severity. Provide copy-paste fixes.`}</code></pre>
			</div>
		</section>

		<!-- FAQ Section -->
		<section id="faq" class="faq-section">
			<h2>Frequently Asked Questions</h2>

			<div class="faq-list">
				{#each faqs as faq, index}
					<div class="faq-item" class:open={openFaq === index}>
						<button
							class="faq-question"
							onclick={() => toggleFaq(index)}
							aria-expanded={openFaq === index}
						>
							<span>{faq.question}</span>
							<svg
								class="faq-icon"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M5 7.5L10 12.5L15 7.5"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
						{#if openFaq === index}
							<div class="faq-answer">
								<p>{@html faq.answer}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>

		<!-- Related Content -->
		<section class="related-content">
			<h2>Related Articles</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/broken-access-control/" class="related-card">
					<h3>Broken Access Control</h3>
					<p>The #1 OWASP vulnerability. Missing RLS is a form of broken access control.</p>
				</a>
				<a href="/kb/security/vulnerabilities/idor/" class="related-card">
					<h3>IDOR Vulnerabilities</h3>
					<p>When weak RLS policies let users access each other's data.</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="related-card">
					<h3>Next.js + Supabase Security</h3>
					<p>Complete guide to RLS policies and Supabase security configuration.</p>
				</a>
				<a href="/kb/vibe-coding-tools/bolt/" class="related-card">
					<h3>Bolt Security Patterns</h3>
					<p>How Bolt compares to Lovable for security-conscious vibe coding.</p>
				</a>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="cta-section">
			<div class="cta-box">
				<h2>Scan Your Lovable App</h2>
				<p>
					vibeship scanner detects missing RLS policies, exposed API keys, and other vulnerabilities in your vibe coded apps - including those built with Lovable.
				</p>
				<a href="https://scanner.vibeship.co" class="cta-button">Try vibeship scanner Free →</a>
			</div>
		</section>
	</article>
</div>

<style>
	/* Article Container */
	.article-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	/* Breadcrumb */
	.breadcrumb ol {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
		margin: 0 0 2rem 0;
		font-size: 0.875rem;
	}

	.breadcrumb li:not(:last-child)::after {
		content: '/';
		margin: 0 0.5rem;
		color: #6b7280;
	}

	.breadcrumb a {
		color: #3b82f6;
		text-decoration: none;
	}

	.breadcrumb a:hover {
		text-decoration: underline;
	}

	.breadcrumb span[aria-current] {
		color: #6b7280;
	}

	/* Article Header */
	.article-header {
		margin-bottom: 2rem;
	}

	.meta-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.badge-critical {
		background-color: #fef2f2;
		color: #dc2626;
		border: 1px solid #fecaca;
	}

	.badge-tool {
		background-color: #f0f9ff;
		color: #0284c7;
		border: 1px solid #bae6fd;
	}

	.badge-warning {
		background-color: #fefce8;
		color: #ca8a04;
		border: 1px solid #fef08a;
	}

	h1 {
		font-size: 2.25rem;
		font-weight: 800;
		line-height: 1.2;
		margin: 0 0 1rem 0;
		color: #111827;
	}

	.subtitle {
		font-size: 1.25rem;
		color: #4b5563;
		margin: 0 0 1.5rem 0;
	}

	/* Quick Answer Box */
	.quick-answer {
		background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
		border: 1px solid #93c5fd;
		border-radius: 0.75rem;
		padding: 1.25rem;
		margin-bottom: 2rem;
	}

	.quick-answer strong {
		color: #1e40af;
	}

	.quick-answer a {
		color: #2563eb;
	}

	/* CVE Alert Box */
	.cve-alert {
		background-color: #fef2f2;
		border: 2px solid #dc2626;
		border-radius: 0.75rem;
		padding: 1.25rem;
		margin-bottom: 2rem;
	}

	.cve-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.cve-id {
		font-size: 1.25rem;
		font-weight: 700;
		color: #991b1b;
	}

	.cve-score {
		background-color: #dc2626;
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 0.375rem;
		font-weight: 600;
		font-size: 0.875rem;
	}

	.cve-details p {
		margin: 0.5rem 0;
		color: #7f1d1d;
	}

	.cve-details strong {
		color: #991b1b;
	}

	/* Stats Box */
	.stats-box {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		background-color: #f9fafb;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.stat-item {
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 1.5rem;
		font-weight: 800;
		color: #111827;
	}

	.stat-value.bad {
		color: #dc2626;
	}

	.stat-label {
		display: block;
		font-size: 0.75rem;
		color: #6b7280;
		text-transform: uppercase;
		margin-top: 0.25rem;
	}

	/* Table of Contents */
	.toc {
		background-color: #f9fafb;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.toc h2 {
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
		color: #374151;
	}

	.toc ol {
		margin: 0;
		padding-left: 1.25rem;
	}

	.toc li {
		margin-bottom: 0.5rem;
	}

	.toc a {
		color: #3b82f6;
		text-decoration: none;
	}

	.toc a:hover {
		text-decoration: underline;
	}

	/* Sections */
	section {
		margin-bottom: 3rem;
	}

	section h2 {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0 0 1rem 0;
		color: #111827;
		padding-top: 1rem;
	}

	section h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 1.5rem 0 0.75rem 0;
		color: #1f2937;
	}

	section h4 {
		font-size: 1.1rem;
		font-weight: 600;
		margin: 1.25rem 0 0.5rem 0;
		color: #374151;
	}

	section p {
		color: #374151;
		line-height: 1.75;
		margin-bottom: 1rem;
	}

	section ul,
	section ol {
		color: #374151;
		line-height: 1.75;
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}

	section li {
		margin-bottom: 0.5rem;
	}

	section a {
		color: #2563eb;
		text-decoration: none;
	}

	section a:hover {
		text-decoration: underline;
	}

	section code {
		background-color: #f3f4f6;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.875em;
		font-family: 'Fira Code', 'Consolas', monospace;
	}

	/* Info Box */
	.info-box {
		background-color: #f0f9ff;
		border: 1px solid #bae6fd;
		border-left: 4px solid #0284c7;
		border-radius: 0.5rem;
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	.info-box strong {
		color: #0369a1;
	}

	/* Warning Box */
	.warning-box {
		background-color: #fef3c7;
		border: 1px solid #f59e0b;
		border-left: 4px solid #f59e0b;
		border-radius: 0.5rem;
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	.warning-box strong {
		color: #92400e;
	}

	.warning-box a {
		color: #b45309;
	}

	/* Timeline */
	.timeline {
		border-left: 2px solid #e5e7eb;
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
		background-color: #3b82f6;
		border-radius: 50%;
	}

	.timeline-date {
		display: block;
		font-size: 0.875rem;
		font-weight: 600;
		color: #3b82f6;
	}

	.timeline-event {
		color: #374151;
	}

	/* Comparison Table */
	.comparison-table-container {
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	.comparison-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
	}

	.comparison-table th,
	.comparison-table td {
		padding: 0.75rem 1rem;
		text-align: left;
		border-bottom: 1px solid #e5e7eb;
	}

	.comparison-table th {
		background-color: #f9fafb;
		font-weight: 600;
		color: #374151;
	}

	.comparison-table td a {
		color: #2563eb;
	}

	.score-good {
		color: #16a34a;
		font-weight: 600;
	}

	.score-medium {
		color: #ca8a04;
		font-weight: 600;
	}

	.score-bad {
		color: #dc2626;
		font-weight: 600;
	}

	.risk-low {
		display: inline-block;
		padding: 0.125rem 0.5rem;
		background-color: #dcfce7;
		color: #166534;
		border-radius: 0.25rem;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.risk-medium {
		display: inline-block;
		padding: 0.125rem 0.5rem;
		background-color: #fef3c7;
		color: #92400e;
		border-radius: 0.25rem;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.risk-high {
		display: inline-block;
		padding: 0.125rem 0.5rem;
		background-color: #fee2e2;
		color: #991b1b;
		border-radius: 0.25rem;
		font-size: 0.75rem;
		font-weight: 600;
	}

	/* Checklist */
	.checklist {
		background-color: #f9fafb;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		padding: 1.25rem;
		margin: 1rem 0;
	}

	.checklist h4 {
		margin-top: 0;
		color: #111827;
	}

	.checklist-item {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 0.5rem 0;
		cursor: pointer;
		color: #374151;
	}

	.checklist-item input[type='checkbox'] {
		margin-top: 0.25rem;
		width: 1rem;
		height: 1rem;
		cursor: pointer;
	}

	.checklist-item span {
		flex: 1;
		line-height: 1.5;
	}

	.checklist-item code {
		background-color: #e5e7eb;
	}

	/* Code Block */
	.code-block {
		margin: 1.5rem 0;
		border-radius: 0.75rem;
		overflow: hidden;
		background-color: #1f2937;
	}

	.code-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background-color: #374151;
	}

	.code-lang {
		font-size: 0.75rem;
		font-weight: 600;
		color: #9ca3af;
		text-transform: uppercase;
	}

	.copy-btn {
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: #d1d5db;
		background-color: #4b5563;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.copy-btn:hover {
		background-color: #6b7280;
	}

	.code-block pre {
		margin: 0;
		padding: 1.25rem;
		overflow-x: auto;
	}

	.code-block code {
		font-family: 'Fira Code', 'Consolas', monospace;
		font-size: 0.875rem;
		line-height: 1.6;
		color: #e5e7eb;
		background: none;
		padding: 0;
	}

	/* FAQ Section */
	.faq-section {
		margin-top: 3rem;
	}

	.faq-list {
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		overflow: hidden;
	}

	.faq-item {
		border-bottom: 1px solid #e5e7eb;
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-question {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.25rem;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		font-size: 1rem;
		font-weight: 600;
		color: #111827;
		transition: background-color 0.2s;
	}

	.faq-question:hover {
		background-color: #f9fafb;
	}

	.faq-icon {
		flex-shrink: 0;
		transition: transform 0.2s;
		color: #6b7280;
	}

	.faq-item.open .faq-icon {
		transform: rotate(180deg);
	}

	.faq-answer {
		padding: 0 1.25rem 1.25rem;
		color: #4b5563;
		line-height: 1.75;
	}

	.faq-answer p {
		margin: 0;
	}

	.faq-answer a {
		color: #2563eb;
	}

	.faq-answer code {
		background-color: #f3f4f6;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.875em;
	}

	/* Related Content */
	.related-content {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid #e5e7eb;
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}

	.related-card {
		display: block;
		padding: 1.25rem;
		background-color: #f9fafb;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		text-decoration: none;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}

	.related-card:hover {
		border-color: #3b82f6;
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
	}

	.related-card h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #111827;
		margin: 0 0 0.5rem 0;
	}

	.related-card p {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 0;
		line-height: 1.5;
	}

	/* CTA Section */
	.cta-section {
		margin-top: 3rem;
	}

	.cta-box {
		background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
		border-radius: 1rem;
		padding: 2rem;
		text-align: center;
		color: white;
	}

	.cta-box h2 {
		color: white;
		margin: 0 0 0.75rem 0;
		padding-top: 0;
	}

	.cta-box p {
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 1.5rem;
	}

	.cta-button {
		display: inline-block;
		padding: 0.875rem 2rem;
		background-color: white;
		color: #1e40af;
		font-weight: 600;
		text-decoration: none;
		border-radius: 0.5rem;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	/* Responsive */
	@media (max-width: 640px) {
		.article-container {
			padding: 1rem;
		}

		h1 {
			font-size: 1.75rem;
		}

		.subtitle {
			font-size: 1.1rem;
		}

		.meta-badges {
			gap: 0.375rem;
		}

		.badge {
			font-size: 0.7rem;
			padding: 0.2rem 0.5rem;
		}

		.stats-box {
			grid-template-columns: repeat(2, 1fr);
		}

		.cve-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.code-block pre {
			padding: 1rem;
		}

		.code-block code {
			font-size: 0.75rem;
		}

		.related-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
