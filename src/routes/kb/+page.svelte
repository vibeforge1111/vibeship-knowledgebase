<script lang="ts">
	import { Header } from '$lib/components/layout';

	const categories = [
		{
			href: '/kb/vulnerabilities',
			icon: '🔓',
			title: 'Vulnerabilities',
			description: 'Deep dives into SQL injection, XSS, hardcoded secrets, and 20+ security vulnerabilities common in AI-generated code.',
			count: '25+ articles'
		},
		{
			href: '/kb/ai-patterns',
			icon: '🤖',
			title: 'AI Patterns',
			description: 'Security patterns specific to Cursor, Claude Code, Bolt, v0, and other AI coding tools. Our unique moat.',
			count: '7 tools'
		},
		{
			href: '/kb/stacks',
			icon: '📦',
			title: 'Stack Guides',
			description: 'Security guides for Next.js + Supabase, Express + PostgreSQL, SvelteKit, and other popular stacks.',
			count: '6 stacks'
		},
		{
			href: '/kb/fixes',
			icon: '🔧',
			title: 'Fix Prompts',
			description: 'Copy-paste AI prompts to fix vulnerabilities. Framework-specific, battle-tested, ready to use.',
			count: '50+ prompts'
		},
		{
			href: '/kb/glossary',
			icon: '📖',
			title: 'Glossary',
			description: 'Plain English definitions of security terms. No jargon, no gatekeeping.',
			count: '100+ terms'
		},
		{
			href: '/kb/checklists',
			icon: '✅',
			title: 'Checklists',
			description: 'Interactive security checklists for pre-launch, API security, authentication, and more.',
			count: '10+ checklists'
		}
	];
</script>

<svelte:head>
	<title>Knowledge Base | VibeShip</title>
	<meta name="description" content="The definitive knowledge base for AI-generated code security. Learn about vulnerabilities, AI coding patterns, and how to fix security issues.">
</svelte:head>

<Header breadcrumbs={[{ label: 'Knowledge Base' }]} />

<div class="content-wrapper">
	<div class="content-main content-wide">
		<div class="article-header">
			<h1>Knowledge Base</h1>
			<p class="text-secondary" style="font-size: 1.2rem; max-width: 600px;">
				Everything you need to know about security in AI-generated code. Written for vibe coders, backed by data.
			</p>
		</div>

		<div class="quick-answer">
			<div class="quick-answer-label">
				<span>💡</span> Quick Start
			</div>
			<p class="quick-answer-text">
				New here? Start with our <a href="/kb/vulnerabilities/sql-injection">SQL Injection guide</a> — the #1 vulnerability in AI-generated code. Then check out <a href="/kb/checklists/pre-launch">the pre-launch checklist</a> before shipping.
			</p>
		</div>

		<div class="hub-grid">
			{#each categories as cat}
				<a href={cat.href} class="card card-interactive">
					<div style="font-size: 2rem; margin-bottom: 0.75rem;">{cat.icon}</div>
					<h3 style="margin-top: 0; margin-bottom: 0.5rem;">{cat.title}</h3>
					<p style="margin-bottom: 0.75rem; color: var(--text-secondary);">{cat.description}</p>
					<span class="badge">{cat.count}</span>
				</a>
			{/each}
		</div>

		<div class="divider"></div>

		<section class="article-section">
			<h2>Why This Knowledge Base?</h2>
			<p>
				AI coding tools like Cursor, Claude Code, and Bolt are transforming how we build software. But they're also introducing new security patterns — and new vulnerabilities.
			</p>
			<p>
				We've scanned thousands of AI-generated repositories and found that <strong>73% contain at least one security vulnerability</strong>. The most common issues? SQL injection, hardcoded secrets, and missing authentication.
			</p>
			<p>
				This knowledge base exists to help you understand these vulnerabilities, why AI tools create them, and how to fix them — with copy-paste prompts you can use directly in your AI coding tool.
			</p>
		</section>

		<section class="article-section">
			<h2>What Makes Us Different</h2>
			<div class="stats-row" style="margin-top: 1.5rem;">
				<div class="stat-box">
					<div class="stat-value">73%</div>
					<div class="stat-label">AI repos with vulnerabilities</div>
				</div>
				<div class="stat-box">
					<div class="stat-value">10K+</div>
					<div class="stat-label">Repos scanned</div>
				</div>
				<div class="stat-box">
					<div class="stat-value">7</div>
					<div class="stat-label">AI tools analyzed</div>
				</div>
				<div class="stat-box">
					<div class="stat-value">Weekly</div>
					<div class="stat-label">Data updates</div>
				</div>
			</div>
		</section>
	</div>
</div>
