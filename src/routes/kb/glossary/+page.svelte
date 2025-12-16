<script lang="ts">
	import { Header } from '$lib/components/layout';

	const glossaryTerms = [
		{
			slug: 'sql-injection',
			term: 'SQL Injection',
			shortDef: 'Attack where malicious SQL is inserted into queries via user input.',
			category: 'vulnerability'
		},
		{
			slug: 'xss',
			term: 'Cross-Site Scripting (XSS)',
			shortDef: 'Attack that injects malicious scripts into web pages viewed by other users.',
			category: 'vulnerability'
		},
		{
			slug: 'csrf',
			term: 'Cross-Site Request Forgery (CSRF)',
			shortDef: 'Attack that tricks users into performing unwanted actions on authenticated sites.',
			category: 'vulnerability'
		},
		{
			slug: 'rls',
			term: 'Row-Level Security (RLS)',
			shortDef: 'Database feature that restricts which rows users can access.',
			category: 'defense'
		},
		{
			slug: 'jwt',
			term: 'JSON Web Token (JWT)',
			shortDef: 'Compact, URL-safe token format for securely transmitting claims.',
			category: 'authentication'
		},
		{
			slug: 'oauth',
			term: 'OAuth 2.0',
			shortDef: 'Authorization framework for secure third-party access without sharing passwords.',
			category: 'authentication'
		},
		{
			slug: 'parameterized-queries',
			term: 'Parameterized Queries',
			shortDef: 'Database queries that separate SQL code from user input to prevent injection.',
			category: 'defense'
		},
		{
			slug: 'csp',
			term: 'Content Security Policy (CSP)',
			shortDef: 'HTTP header that controls which resources browsers can load.',
			category: 'defense'
		},
		{
			slug: 'cors',
			term: 'Cross-Origin Resource Sharing (CORS)',
			shortDef: 'Mechanism that allows or restricts web page access to resources from other domains.',
			category: 'defense'
		},
		{
			slug: 'idor',
			term: 'Insecure Direct Object Reference (IDOR)',
			shortDef: 'Vulnerability where users access resources by manipulating IDs without authorization checks.',
			category: 'vulnerability'
		},
		{
			slug: 'rate-limiting',
			term: 'Rate Limiting',
			shortDef: 'Technique to control the number of requests a user can make in a time period.',
			category: 'defense'
		},
		{
			slug: 'sanitization',
			term: 'Input Sanitization',
			shortDef: 'Process of cleaning user input by removing or encoding potentially dangerous characters.',
			category: 'defense'
		},
		{
			slug: 'vibe-coding',
			term: 'Vibe Coding',
			shortDef: 'Rapid development using AI tools with natural language prompts instead of writing code manually.',
			category: 'concept'
		},
		{
			slug: 'hallucination',
			term: 'AI Hallucination',
			shortDef: 'When AI generates plausible but incorrect or insecure code patterns.',
			category: 'concept'
		},
		{
			slug: 'prompt-injection',
			term: 'Prompt Injection',
			shortDef: 'Attack that manipulates AI systems by crafting malicious input prompts.',
			category: 'vulnerability'
		}
	];

	const categories = [
		{ id: 'all', label: 'All Terms' },
		{ id: 'vulnerability', label: 'Vulnerabilities' },
		{ id: 'defense', label: 'Defenses' },
		{ id: 'authentication', label: 'Authentication' },
		{ id: 'concept', label: 'Concepts' }
	];

	let selectedCategory = 'all';

	$: filteredTerms = selectedCategory === 'all'
		? glossaryTerms
		: glossaryTerms.filter(t => t.category === selectedCategory);

	function getCategoryClass(category: string): string {
		switch (category) {
			case 'vulnerability': return 'badge-critical';
			case 'defense': return 'badge-info';
			case 'authentication': return 'badge-high';
			case 'concept': return 'badge-medium';
			default: return '';
		}
	}
</script>

<svelte:head>
	<title>Security Glossary | VibeShip Knowledge Base</title>
	<meta name="description" content="Plain English definitions of security terms. SQL injection, XSS, CSRF, JWT, and more explained for developers.">
</svelte:head>

<Header breadcrumbs={[
	{ label: 'Knowledge Base', href: '/kb' },
	{ label: 'Glossary' }
]} />

<div class="content-wrapper">
	<div class="content-main content-wide">
		<div class="article-header">
			<h1>Security Glossary</h1>
			<p class="text-secondary" style="font-size: 1.1rem; max-width: 650px;">
				Plain English definitions of security terms. No jargon, no assumptions. Just clear explanations for developers learning security.
			</p>
		</div>

		<div class="quick-answer">
			<div class="quick-answer-label">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
				</svg>
				Quick Reference
			</div>
			<p class="quick-answer-text">
				Each term includes a one-sentence definition for quick reference, with links to detailed explanations and practical examples.
			</p>
		</div>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">15+</div>
				<div class="stat-label">terms defined</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">4</div>
				<div class="stat-label">categories</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Plain</div>
				<div class="stat-label">English definitions</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Examples</div>
				<div class="stat-label">included</div>
			</div>
		</div>

		<section class="article-section">
			<div class="filter-row">
				<span class="filter-label">Filter by:</span>
				<div class="filter-buttons">
					{#each categories as cat}
						<button
							class="filter-btn"
							class:active={selectedCategory === cat.id}
							onclick={() => selectedCategory = cat.id}
						>
							{cat.label}
						</button>
					{/each}
				</div>
			</div>

			<div class="glossary-list">
				{#each filteredTerms as item}
					<a href="/kb/glossary/{item.slug}" class="card card-interactive glossary-card">
						<div class="glossary-header">
							<h3>{item.term}</h3>
							<span class="badge {getCategoryClass(item.category)}">{item.category}</span>
						</div>
						<p>{item.shortDef}</p>
					</a>
				{/each}
			</div>
		</section>

		<section class="article-section">
			<h2>How to Use This Glossary</h2>
			<p>This glossary is designed for:</p>
			<ul>
				<li><strong>Quick lookups:</strong> Find definitions while reading security reports</li>
				<li><strong>Learning:</strong> Each term links to detailed explanations with examples</li>
				<li><strong>AI context:</strong> Copy definitions into AI prompts for better understanding</li>
			</ul>
		</section>

		<section class="article-section">
			<h2>Suggest a Term</h2>
			<p>Missing a term? Let us know what security concepts you'd like explained.</p>
			<a href="mailto:hello@vibeship.co?subject=Glossary%20Term%20Suggestion" class="btn btn-secondary">
				Suggest a Term
			</a>
		</section>
	</div>
</div>

<style>
	.filter-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.filter-label {
		font-size: 0.85rem;
		color: var(--text-tertiary);
	}

	.filter-buttons {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.filter-btn {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		padding: 0.4rem 0.75rem;
		background: transparent;
		border: 1px solid var(--border);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.15s;
	}

	.filter-btn:hover {
		border-color: var(--text-primary);
		color: var(--text-primary);
	}

	.filter-btn.active {
		background: var(--text-primary);
		border-color: var(--text-primary);
		color: var(--bg-primary);
	}

	.glossary-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.glossary-card {
		text-decoration: none;
		color: inherit;
		padding: 1rem 1.25rem;
	}

	.glossary-card:hover {
		text-decoration: none;
	}

	.glossary-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 0.5rem;
	}

	.glossary-card h3 {
		margin: 0;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.glossary-card p {
		margin: 0;
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}
</style>
