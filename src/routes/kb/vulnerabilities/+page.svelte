<script lang="ts">
	import { Header } from '$lib/components/layout';

	const vulnerabilities = [
		{
			slug: 'sql-injection',
			title: 'SQL Injection',
			description: 'Attackers manipulate database queries through user input. Found in 68% of AI-generated codebases.',
			severity: 'critical',
			cwe: 'CWE-89',
			aiRate: '68%'
		},
		{
			slug: 'hardcoded-secrets',
			title: 'Hardcoded Secrets',
			description: 'API keys, passwords, and tokens committed directly in code. Exposed in public repositories.',
			severity: 'critical',
			cwe: 'CWE-798',
			aiRate: '54%'
		},
		{
			slug: 'xss',
			title: 'Cross-Site Scripting (XSS)',
			description: 'Malicious scripts injected into web pages viewed by other users. Enables session hijacking.',
			severity: 'high',
			cwe: 'CWE-79',
			aiRate: '41%'
		},
		{
			slug: 'missing-auth',
			title: 'Missing Authentication',
			description: 'API routes and endpoints accessible without proper authentication checks.',
			severity: 'critical',
			cwe: 'CWE-306',
			aiRate: '47%'
		},
		{
			slug: 'idor',
			title: 'Insecure Direct Object Reference',
			description: 'Users can access other users\' data by manipulating IDs or references.',
			severity: 'high',
			cwe: 'CWE-639',
			aiRate: '38%'
		},
		{
			slug: 'insecure-cors',
			title: 'Insecure CORS Configuration',
			description: 'Overly permissive cross-origin settings allowing unauthorized API access.',
			severity: 'medium',
			cwe: 'CWE-942',
			aiRate: '29%'
		},
		{
			slug: 'missing-rate-limiting',
			title: 'Missing Rate Limiting',
			description: 'No protection against brute force attacks or API abuse.',
			severity: 'medium',
			cwe: 'CWE-770',
			aiRate: '62%'
		},
		{
			slug: 'sensitive-data-exposure',
			title: 'Sensitive Data Exposure',
			description: 'Personal or sensitive information exposed in logs, errors, or responses.',
			severity: 'high',
			cwe: 'CWE-200',
			aiRate: '35%'
		}
	];

	function getSeverityClass(severity: string): string {
		switch (severity) {
			case 'critical': return 'badge-critical';
			case 'high': return 'badge-high';
			case 'medium': return 'badge-medium';
			default: return '';
		}
	}
</script>

<svelte:head>
	<title>Security Vulnerabilities in AI-Generated Code | VibeShip Knowledge Base</title>
	<meta name="description" content="Comprehensive guide to security vulnerabilities found in AI-generated code. Learn about SQL injection, XSS, hardcoded secrets, and more.">
</svelte:head>

<Header breadcrumbs={[
	{ label: 'Knowledge Base', href: '/kb' },
	{ label: 'Vulnerabilities' }
]} />

<div class="content-wrapper">
	<div class="content-main content-wide">
		<div class="article-header">
			<h1>Vulnerabilities</h1>
			<p class="text-secondary" style="font-size: 1.1rem; max-width: 650px;">
				Deep dives into SQL injection, XSS, hardcoded secrets, and 20+ security vulnerabilities common in AI-generated code. Each guide includes detection methods and AI fix prompts.
			</p>
		</div>

		<div class="quick-answer">
			<div class="quick-answer-label">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
				</svg>
				Key Finding
			</div>
			<p class="quick-answer-text">
				<strong>73% of AI-generated codebases</strong> contain at least one security vulnerability. SQL injection and hardcoded secrets are the most common, appearing in over half of all projects scanned.
			</p>
		</div>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">73%</div>
				<div class="stat-label">repos with vulnerabilities</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">25+</div>
				<div class="stat-label">vulnerability types tracked</div>
			</div>
			<div class="stat-box">
				<div class="stat-value critical">SQL</div>
				<div class="stat-label">#1 most common issue</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">10K+</div>
				<div class="stat-label">repos analyzed</div>
			</div>
		</div>

		<section class="article-section">
			<h2>All Vulnerabilities</h2>
			<div class="vulnerability-grid">
				{#each vulnerabilities as vuln}
					<a href="/kb/vulnerabilities/{vuln.slug}" class="card card-interactive vulnerability-card">
						<div class="vulnerability-card-header">
							<span class="badge {getSeverityClass(vuln.severity)}">{vuln.severity}</span>
							<span class="badge badge-info">{vuln.cwe}</span>
						</div>
						<h3>{vuln.title}</h3>
						<p>{vuln.description}</p>
						<div class="vulnerability-card-footer">
							<span class="ai-rate">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<rect x="4" y="4" width="16" height="16" rx="2"/>
									<rect x="9" y="9" width="6" height="6"/>
									<path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
								</svg>
								{vuln.aiRate} of AI repos
							</span>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<section class="article-section">
			<h2>By Severity</h2>
			<div class="severity-breakdown">
				<div class="severity-row">
					<div class="severity-label">
						<span class="badge badge-critical">Critical</span>
						<span class="severity-count">4 vulnerabilities</span>
					</div>
					<div class="severity-bar">
						<div class="severity-fill critical" style="width: 40%"></div>
					</div>
				</div>
				<div class="severity-row">
					<div class="severity-label">
						<span class="badge badge-high">High</span>
						<span class="severity-count">8 vulnerabilities</span>
					</div>
					<div class="severity-bar">
						<div class="severity-fill high" style="width: 60%"></div>
					</div>
				</div>
				<div class="severity-row">
					<div class="severity-label">
						<span class="badge badge-medium">Medium</span>
						<span class="severity-count">10 vulnerabilities</span>
					</div>
					<div class="severity-bar">
						<div class="severity-fill medium" style="width: 50%"></div>
					</div>
				</div>
			</div>
		</section>

		<section class="article-section">
			<h2>Start Here</h2>
			<p>New to security? These are the most important vulnerabilities to understand first:</p>
			<ol>
				<li><a href="/kb/vulnerabilities/sql-injection"><strong>SQL Injection</strong></a> — The #1 vulnerability in AI-generated code</li>
				<li><a href="/kb/vulnerabilities/hardcoded-secrets"><strong>Hardcoded Secrets</strong></a> — API keys exposed in your code</li>
				<li><a href="/kb/vulnerabilities/missing-auth"><strong>Missing Authentication</strong></a> — Unprotected API routes</li>
			</ol>
		</section>
	</div>
</div>

<style>
	.vulnerability-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.vulnerability-card {
		text-decoration: none;
		color: inherit;
	}

	.vulnerability-card:hover {
		text-decoration: none;
	}

	.vulnerability-card h3 {
		margin: 0.75rem 0 0.5rem;
		font-size: 1.1rem;
		color: var(--text-primary);
	}

	.vulnerability-card p {
		margin: 0;
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.vulnerability-card-header {
		display: flex;
		gap: 0.5rem;
	}

	.vulnerability-card-footer {
		margin-top: 1rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--border);
	}

	.ai-rate {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.75rem;
		font-family: 'JetBrains Mono', monospace;
		color: var(--text-tertiary);
	}

	.severity-breakdown {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1rem;
	}

	.severity-row {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.severity-label {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		min-width: 180px;
	}

	.severity-count {
		font-size: 0.8rem;
		color: var(--text-tertiary);
	}

	.severity-bar {
		flex: 1;
		height: 8px;
		background: var(--bg-tertiary);
		overflow: hidden;
	}

	.severity-fill {
		height: 100%;
	}

	.severity-fill.critical {
		background: var(--red);
	}

	.severity-fill.high {
		background: var(--orange);
	}

	.severity-fill.medium {
		background: var(--blue);
	}
</style>
