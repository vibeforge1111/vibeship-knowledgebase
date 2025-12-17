<script lang="ts">
	import { Header } from '$lib/components/layout';

	const vulnerabilities = [
		{
			slug: 'sql-injection',
			name: 'SQL Injection',
			severity: 'Critical',
			owasp: 'A03:2021',
			description: 'Attackers manipulate database queries through user input to steal or destroy data.'
		},
		{
			slug: 'hardcoded-secrets',
			name: 'Hardcoded Secrets',
			severity: 'Critical',
			owasp: 'A02:2021',
			description: 'API keys and passwords embedded directly in source code, exposed in repositories.'
		},
		{
			slug: 'xss',
			name: 'Cross-Site Scripting (XSS)',
			severity: 'High',
			owasp: 'A03:2021',
			description: 'Malicious scripts injected into web pages, stealing user data or hijacking sessions.'
		},
		{
			slug: 'missing-auth',
			name: 'Missing Authentication',
			severity: 'Critical',
			owasp: 'A07:2021',
			description: 'Endpoints accessible without login, exposing sensitive data or functionality.'
		},
		{
			slug: 'idor',
			name: 'IDOR',
			severity: 'High',
			owasp: 'A01:2021',
			description: 'Users access other users\' data by changing IDs in URLs or requests.'
		},
		{
			slug: 'broken-access-control',
			name: 'Broken Access Control',
			severity: 'Critical',
			owasp: 'A01:2021',
			description: 'Users perform actions or access data beyond their permissions.'
		},
		{
			slug: 'csrf',
			name: 'CSRF',
			severity: 'Medium',
			owasp: 'A01:2021',
			description: 'Attackers trick users into performing unwanted actions on authenticated sites.'
		},
		{
			slug: 'insecure-cors',
			name: 'Insecure CORS',
			severity: 'Medium',
			owasp: 'A05:2021',
			description: 'Overly permissive cross-origin settings allow unauthorized data access.'
		},
		{
			slug: 'missing-rate-limiting',
			name: 'Missing Rate Limiting',
			severity: 'Medium',
			owasp: 'A04:2021',
			description: 'No limits on API requests, enabling brute force and DoS attacks.'
		},
		{
			slug: 'sensitive-data-exposure',
			name: 'Sensitive Data Exposure',
			severity: 'High',
			owasp: 'A02:2021',
			description: 'Personal or financial data transmitted or stored without proper protection.'
		},
		{
			slug: 'insecure-deserialization',
			name: 'Insecure Deserialization',
			severity: 'High',
			owasp: 'A08:2021',
			description: 'Untrusted data deserialized without validation, enabling code execution.'
		},
		{
			slug: 'jwt-vulnerabilities',
			name: 'JWT Vulnerabilities',
			severity: 'High',
			owasp: 'A02:2021',
			description: 'Weak JWT implementation allowing token forgery or session hijacking.'
		},
		{
			slug: 'mass-assignment',
			name: 'Mass Assignment',
			severity: 'Medium',
			owasp: 'A04:2021',
			description: 'Users modify restricted fields by adding extra parameters to requests.'
		},
		{
			slug: 'open-redirect',
			name: 'Open Redirect',
			severity: 'Low',
			owasp: 'A01:2021',
			description: 'Attackers redirect users to malicious sites via trusted URLs.'
		},
		{
			slug: 'path-traversal',
			name: 'Path Traversal',
			severity: 'High',
			owasp: 'A01:2021',
			description: 'Attackers access files outside intended directories using ../ sequences.'
		},
		{
			slug: 'ssrf',
			name: 'SSRF',
			severity: 'High',
			owasp: 'A10:2021',
			description: 'Server makes requests to attacker-controlled URLs, accessing internal resources.'
		},
		{
			slug: 'ssti',
			name: 'SSTI',
			severity: 'Critical',
			owasp: 'A03:2021',
			description: 'User input in templates enables server-side code execution.'
		},
		{
			slug: 'xxe',
			name: 'XXE',
			severity: 'High',
			owasp: 'A05:2021',
			description: 'Malicious XML exploits parsers to read files or make server requests.'
		},
		{
			slug: 'command-injection',
			name: 'Command Injection',
			severity: 'Critical',
			owasp: 'A03:2021',
			description: 'User input executed as system commands, giving attackers server access.'
		}
	];

	function getSeverityClass(severity: string): string {
		switch (severity) {
			case 'Critical': return 'severity-critical';
			case 'High': return 'severity-high';
			case 'Medium': return 'severity-medium';
			default: return 'severity-low';
		}
	}
</script>

<svelte:head>
	<title>Security Vulnerabilities in AI-Generated Code | Vibeship KB</title>
	<meta name="description" content="Complete guide to security vulnerabilities found in vibe coded projects. SQL injection, XSS, hardcoded secrets, and more with AI fix prompts.">
</svelte:head>

<Header breadcrumbs={[
	{ label: 'Knowledge Base', href: '/kb' },
	{ label: 'Security' },
	{ label: 'Vulnerabilities' }
]} />

<div class="content-wrapper">
	<div class="content-main content-wide">
		<div class="article-header">
			<h1>Security Vulnerabilities</h1>
			<p class="text-secondary" style="font-size: 1.1rem; max-width: 650px;">
				Common security vulnerabilities in AI-generated code. Each guide includes detection methods, AI fix prompts, and framework-specific solutions.
			</p>
		</div>

		<div class="quick-answer">
			<div class="quick-answer-label">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
				</svg>
				Quick Answer
			</div>
			<p class="quick-answer-text">
				AI coding tools often generate vulnerable code patterns. The most common issues are SQL injection, hardcoded secrets, and missing authentication. Each vulnerability page below includes copy-paste AI fix prompts.
			</p>
		</div>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">18</div>
				<div class="stat-label">vulnerabilities covered</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">SQL Injection</div>
				<div class="stat-label">most common in AI code</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">OWASP Top 10</div>
				<div class="stat-label">aligned categories</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">AI Fix Prompts</div>
				<div class="stat-label">included for each</div>
			</div>
		</div>

		<section class="article-section">
			<h2>All Vulnerabilities</h2>
			<div class="vuln-grid">
				{#each vulnerabilities as vuln}
					<a href="/kb/security/vulnerabilities/{vuln.slug}" class="card card-interactive vuln-card">
						<div class="vuln-card-header">
							<h3>{vuln.name}</h3>
							<span class="badge {getSeverityClass(vuln.severity)}">{vuln.severity}</span>
						</div>
						<p class="vuln-description">{vuln.description}</p>
						<div class="vuln-meta">
							<span class="vuln-owasp">OWASP {vuln.owasp}</span>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<section class="article-section">
			<h2>How to Use These Guides</h2>
			<ol>
				<li><strong>Identify the vulnerability</strong> in your AI-generated code</li>
				<li><strong>Copy the AI fix prompt</strong> from the vulnerability page</li>
				<li><strong>Paste into your AI tool</strong> (Cursor, Claude Code, Bolt, etc.)</li>
				<li><strong>Review the changes</strong> before committing</li>
				<li><strong>Run a security scan</strong> with <a href="https://scanner.vibeship.co">Vibeship Scanner</a></li>
			</ol>
		</section>
	</div>
</div>

<style>
	.vuln-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.vuln-card {
		text-decoration: none;
		color: inherit;
	}

	.vuln-card:hover {
		text-decoration: none;
	}

	.vuln-card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.vuln-card h3 {
		margin: 0;
		font-size: 1.1rem;
		color: var(--text-primary);
	}

	.vuln-description {
		margin: 0.75rem 0;
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.vuln-meta {
		padding-top: 0.75rem;
		border-top: 1px solid var(--border);
	}

	.vuln-owasp {
		font-size: 0.7rem;
		font-family: 'JetBrains Mono', monospace;
		color: var(--text-tertiary);
	}

	.severity-critical {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
		border-color: rgba(239, 68, 68, 0.3);
	}

	.severity-high {
		background: rgba(249, 115, 22, 0.1);
		color: #f97316;
		border-color: rgba(249, 115, 22, 0.3);
	}

	.severity-medium {
		background: rgba(234, 179, 8, 0.1);
		color: #eab308;
		border-color: rgba(234, 179, 8, 0.3);
	}

	.severity-low {
		background: rgba(34, 197, 94, 0.1);
		color: #22c55e;
		border-color: rgba(34, 197, 94, 0.3);
	}
</style>
