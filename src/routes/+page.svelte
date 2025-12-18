<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let theme = $state('dark');

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', theme);
		}
	}

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', theme);
		}
	});

	// Cursor blink
	let showCursor = $state(true);
	onMount(() => {
		const interval = setInterval(() => {
			showCursor = !showCursor;
		}, 530);
		return () => clearInterval(interval);
	});

	// IDE-style tool selector
	type ToolId = 'scanner' | 'mind' | 'spawner' | 'kb';
	let selectedTool = $state<ToolId>('scanner');

	interface Tool {
		id: ToolId;
		name: string;
		description: string;
		category: string;
		status: 'live' | 'alpha' | 'coming';
		url: string | null;
		github: string;
		terminal: {
			command: string;
			output: string[];
		};
	}

	const tools: Tool[] = [
		{
			id: 'scanner',
			name: 'scan()',
			description: 'Security scanning and fix prompts for AI generated code',
			category: 'SECURITY',
			status: 'live',
			url: 'https://scanner.vibeship.co',
			github: 'https://github.com/vibeforge1111/vibeship-scanner',
			terminal: {
				command: '$ vibeship scan ./src',
				output: [
					'',
					'## 2000+ rules | OWASP Top 10',
					'  └─ opengrep, trivy, gitleaks',
					'',
					'Scanning 142 files...',
					'',
					'## 3 Vulnerabilities Found',
					'',
					'[CRITICAL] SQL Injection - src/api/users.ts:47',
					'[HIGH] XSS - src/components/Comment.tsx:23',
					'[MEDIUM] Hardcoded API key - src/config/api.ts:12',
					'',
					'## Master Fix Prompt generated',
					'Copy to Claude/Cursor to fix all.',
				]
			}
		},
		{
			id: 'mind',
			name: 'recall()',
			description: 'Persistent long term and short term memory for Claude Code',
			category: 'MEMORY',
			status: 'live',
			url: 'https://mind.vibeship.co',
			github: 'https://github.com/vibeforge1111/vibeship-mind',
			terminal: {
				command: '$ mind_recall()',
				output: [
					'',
					'## Long-term Memory',
					'  └─ Decisions, learnings, gotchas preserved',
					'',
					'## Short-term Session',
					'  └─ Current blockers, assumptions, progress',
					'',
					'## Smart Reminders',
					'  └─ "Remind me about auth when we touch login"',
					'',
					'## Self-Improvement',
					'  └─ Tracks your preferences & blind spots',
					'',
					'## Continue From',
					'Last: implementing payment flow',
					'',
					'Never start from zero. Build on what you learned.',
				]
			}
		},
		{
			id: 'spawner',
			name: 'spawn()',
			description: 'Claude Skills & agents tailored for you for better outputs',
			category: 'AGENTS',
			status: 'coming',
			url: null,
			github: 'https://github.com/vibeforge1111/vibeship-spawner',
			terminal: {
				command: '$ spawner init',
				output: [
					'',
					'## Analyzing your codebase...',
					'  └─ Stack: SvelteKit, TypeScript, Supabase',
					'  └─ Patterns: 12 components, 4 API routes',
					'',
					'## Generating custom skills...',
					'',
					'[Skill] svelte-component-writer',
					'  └─ Matches your naming conventions',
					'',
					'[Skill] supabase-rls-helper',
					'  └─ Aligned with your auth patterns',
					'',
					'[Skill] brainstorm-to-code',
					'  └─ Refines ideas before implementation',
					'',
					'## Ready to spawn agents',
					'Skills adapt as your codebase evolves.',
				]
			}
		},
		{
			id: 'kb',
			name: 'learn()',
			description: 'Security guides, checklists, prompts, and more for vibe coders',
			category: 'LEARN',
			status: 'live',
			url: '/kb',
			github: 'https://github.com/vibeforge1111/vibeship-knowledgebase',
			terminal: {
				command: '$ vibeship kb search "sql injection"',
				output: [
					'',
					'## 3 Results Found',
					'',
					'[1] SQL Injection in Vibe-Coded Apps',
					'    /kb/security/vulnerabilities/sql-injection',
					'    └─ What it is, why AI generates it, how to fix',
					'',
					'[2] Parameterized Queries Guide',
					'    /kb/security/fixes/parameterized-queries',
					'    └─ Copy-paste fix for any framework',
					'',
					'[3] Database Security Checklist',
					'    /kb/security/checklists/database',
					'    └─ 12-point pre-deploy checklist',
					'',
					'50+ articles. Written for vibe coders.',
				]
			}
		}
	];

	const selectedToolData = $derived(tools.find(t => t.id === selectedTool)!);

	// Typing animation for terminal
	let displayedLines = $state<string[]>([]);
	let isTyping = $state(false);
	let cancelToken = { cancelled: false };

	$effect(() => {
		// Track dependency on selectedTool
		const toolId = selectedTool;
		const tool = tools.find(t => t.id === toolId)!;

		// Cancel previous animation
		cancelToken.cancelled = true;
		const currentToken = { cancelled: false };
		cancelToken = currentToken;

		// Reset terminal
		displayedLines = [tool.terminal.command];
		isTyping = true;
		let lineIndex = 0;

		const typeNextLine = () => {
			if (currentToken.cancelled) return;

			if (lineIndex < tool.terminal.output.length) {
				displayedLines = [...displayedLines, tool.terminal.output[lineIndex]];
				lineIndex++;
				setTimeout(typeNextLine, 50);
			} else {
				isTyping = false;
			}
		};

		const timeoutId = setTimeout(typeNextLine, 200);

		return () => {
			currentToken.cancelled = true;
			clearTimeout(timeoutId);
		};
	});

	const products = [
		{
			name: 'Scanner',
			tagline: 'Security for vibe-coded apps',
			description: 'Catch vulnerabilities in AI-generated code before they ship. OWASP Top 10 coverage.',
			url: 'https://scanner.vibeship.co',
			github: 'https://github.com/vibeforge1111/vibeship-scanner',
			status: 'live',
			icon: 'shield',
			stats: '2000+ vulnerability types'
		},
		{
			name: 'Mind',
			tagline: 'Memory for Claude Code',
			description: 'Decisions, learnings, and context that persist across sessions. Never start blank.',
			url: 'https://mind.vibeship.co',
			github: 'https://github.com/vibeforge1111/vibeship-mind',
			status: 'live',
			icon: 'brain',
			stats: '12 MCP tools'
		},
		{
			name: 'Spawner',
			tagline: 'Skills & agents for Claude',
			description: 'Analyzes your codebase, brainstorms ideas, and generates custom skills that match how you build.',
			url: null,
			github: 'https://github.com/vibeforge1111/vibeship-spawner',
			status: 'coming',
			icon: 'spawn',
			stats: 'Coming in a few days'
		},
		{
			name: 'Knowledge Base',
			tagline: 'Vibe coding education',
			description: 'Security guides, tool comparisons, and best practices. Learn to ship safely.',
			url: '/kb',
			github: 'https://github.com/vibeforge1111/vibeship-knowledgebase',
			status: 'live',
			icon: 'book',
			stats: '50+ articles'
		}
	];

	let activeProduct = $state<string | null>(null);
</script>

<svelte:head>
	<title>Vibeship - Tools for Vibe Coders</title>
	<meta name="description" content="The ecosystem for building with AI. Security scanning, persistent memory, agent orchestration, and education for vibe-coded applications." />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
</svelte:head>

<nav>
	<div class="nav-content">
		<a href="/" class="logo">
			<img src="/logo.png" alt="vibeship" class="logo-icon" />
			<span class="logo-text">vibeship</span>
		</a>
		<div class="nav-right">
			<a href="https://github.com/vibeforge1111" target="_blank" class="github-cta">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
				</svg>
				GitHub
			</a>
			<button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle theme">
				{#if theme === 'dark'}
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="5"/>
						<line x1="12" y1="1" x2="12" y2="3"/>
						<line x1="12" y1="21" x2="12" y2="23"/>
						<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
						<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
						<line x1="1" y1="12" x2="3" y2="12"/>
						<line x1="21" y1="12" x2="23" y2="12"/>
						<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
						<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
					</svg>
				{:else}
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
					</svg>
				{/if}
			</button>
		</div>
	</div>
</nav>

<main>
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-intro">
			<div class="hero-badge">THE VIBE CODING ECOSYSTEM</div>
			<h1>
				ship better <span class="highlight">vibe coded<span class="underline-accent orange"></span></span> products
			</h1>
			<p class="hero-subtitle">
				Tools to scan and secure your codebase, remember what you built, and spawn skilled agents - all to help you ship products you're proud of.
			</p>
		</div>

		<!-- IDE-style Tool Explorer -->
		<div class="ide-explorer">
			<!-- File Tree Sidebar -->
			<div class="ide-sidebar">
				<div class="sidebar-header">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
					</svg>
					<span>VIBESHIP</span>
				</div>

				{#each ['SECURITY', 'MEMORY', 'AGENTS', 'LEARN'] as category}
					{@const categoryTools = tools.filter(t => t.category === category)}
					<div class="sidebar-category">
						<div class="category-label">
							<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
								<path d="M7 10l5 5 5-5z"/>
							</svg>
							{category}
						</div>
						{#each categoryTools as tool}
							<button
								class="tool-item"
								class:active={selectedTool === tool.id}
								onclick={() => selectedTool = tool.id}
							>
								<span class="tool-icon">
									{#if tool.id === 'scanner'}
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
										</svg>
									{:else if tool.id === 'mind'}
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<circle cx="12" cy="12" r="10"/>
											<path d="M12 6v6l4 2"/>
										</svg>
									{:else if tool.id === 'spawner'}
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<circle cx="12" cy="12" r="3"/>
											<path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
										</svg>
									{:else}
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
											<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
										</svg>
									{/if}
								</span>
								<span class="tool-name">{tool.name}</span>
								{#if tool.status === 'live'}
									<span class="tool-status live"></span>
								{:else if tool.status === 'coming'}
									<span class="tool-status-text">soon</span>
								{/if}
							</button>
						{/each}
					</div>
				{/each}

				<div class="sidebar-footer">
					<a href={selectedToolData.github} target="_blank" class="github-footer-link">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
						</svg>
						View source
					</a>
				</div>
			</div>

			<!-- Terminal Panel -->
			<div class="ide-terminal">
				<!-- Mobile Tabs -->
				<div class="mobile-tabs">
					{#each tools as tool}
						<button
							class="mobile-tab"
							class:active={selectedTool === tool.id}
							onclick={() => selectedTool = tool.id}
						>
							{#if tool.id === 'scanner'}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
								</svg>
							{:else if tool.id === 'mind'}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
									<path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
								</svg>
							{:else if tool.id === 'spawner'}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<circle cx="12" cy="12" r="3"/>
									<path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
								</svg>
							{:else}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
									<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
								</svg>
							{/if}
							<span>{tool.id === 'kb' ? 'KB' : tool.id.charAt(0).toUpperCase() + tool.id.slice(1)}</span>
							{#if tool.status === 'live'}
								<span class="tab-status"></span>
							{/if}
						</button>
					{/each}
				</div>

				<div class="terminal-header">
					<div class="terminal-dots">
						<span class="terminal-dot red"></span>
						<span class="terminal-dot yellow"></span>
						<span class="terminal-dot green"></span>
					</div>
					<span class="terminal-title">{selectedToolData.name}</span>
					<div class="terminal-actions">
						{#if selectedToolData.url}
							<a href={selectedToolData.url} target={selectedToolData.url.startsWith('http') ? '_blank' : undefined} class="terminal-action">
								Open →
							</a>
						{:else}
							<span class="terminal-action disabled">Coming Soon</span>
						{/if}
					</div>
				</div>
				<div class="terminal-body">
					{#each displayedLines as line}
						{#if line.startsWith('$')}
							<div class="line command">{line}</div>
						{:else if line.startsWith('##')}
							<div class="line heading">{line.replace('## ', '')}</div>
						{:else if line.startsWith('[CRITICAL]')}
							<div class="line critical">{line}</div>
						{:else if line.startsWith('[HIGH]')}
							<div class="line high">{line}</div>
						{:else if line.startsWith('[MEDIUM]')}
							<div class="line medium">{line}</div>
						{:else if line.startsWith('[Agent')}
							<div class="line agent">{line}</div>
						{:else if line.startsWith('[1]') || line.startsWith('[2]') || line.startsWith('[3]')}
							<div class="line result">{line}</div>
						{:else if line.includes('└─')}
							<div class="line detail">{line}</div>
						{:else if line.startsWith('-')}
							<div class="line item">{line}</div>
						{:else if line.includes('✓')}
							<div class="line success">{line}</div>
						{:else if line.startsWith('Run') || line.startsWith('Coordinating') || line.includes('available') || line.includes('articles')}
							<div class="line hint">{line}</div>
						{:else}
							<div class="line">{line}</div>
						{/if}
					{/each}
					{#if isTyping}
						<span class="cursor" class:visible={showCursor}>_</span>
					{/if}
				</div>
				<div class="terminal-footer">
					<span class="footer-hint">{selectedToolData.description}</span>
				</div>
			</div>
		</div>

		<div class="hero-cta">
			<a href="https://mind.vibeship.co" class="btn btn-primary btn-glow" target="_blank">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
					<path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
					<path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
					<path d="M12 18v4"/>
				</svg>
				<span>Install Your LLM a Mind</span>
			</a>
			<a href="https://scanner.vibeship.co" class="btn btn-secondary" target="_blank">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
					<path d="M9 12l2 2 4-4"/>
				</svg>
				<span>Scan & Fix Vulnerabilities</span>
			</a>
		</div>
	</section>

	<!-- Ship Funnel -->
	<section class="ship-funnel">
		<h2>From Idea to Shipped</h2>
		<p class="section-subtitle">Every tool helps you ship with confidence.</p>

		<div class="funnel">
			<!-- Top: Input -->
			<div class="funnel-stage input">
				<div class="stage-box wide">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
						<circle cx="12" cy="7" r="4"/>
					</svg>
					<span>You + Your Idea + Your LLM + Vibeship</span>
				</div>
			</div>

			<div class="funnel-arrow">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 5v14M5 12l7 7 7-7"/>
				</svg>
			</div>

			<!-- Stage 1: Mind -->
			<div class="funnel-stage">
				<div class="stage-box medium">
					<div class="stage-icon">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
							<path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
							<path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
							<path d="M12 18v4"/>
						</svg>
					</div>
					<div class="stage-content">
						<span class="stage-name">Mind</span>
						<span class="stage-desc">Context that persists</span>
					</div>
					<span class="stage-tag">REMEMBER</span>
				</div>
			</div>

			<div class="funnel-connector"></div>

			<!-- Stage 2: Spawner -->
			<div class="funnel-stage">
				<div class="stage-box medium">
					<div class="stage-icon">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<circle cx="12" cy="12" r="3"/>
							<circle cx="4" cy="4" r="2"/>
							<circle cx="20" cy="4" r="2"/>
							<circle cx="4" cy="20" r="2"/>
							<circle cx="20" cy="20" r="2"/>
							<line x1="12" y1="9" x2="12" y2="4"/>
							<line x1="9" y1="12" x2="4" y2="12"/>
							<line x1="15" y1="12" x2="20" y2="12"/>
							<line x1="12" y1="15" x2="12" y2="20"/>
						</svg>
					</div>
					<div class="stage-content">
						<span class="stage-name">Spawner</span>
						<span class="stage-desc">Skills tailored to your code</span>
					</div>
					<span class="stage-tag">ADAPT</span>
				</div>
			</div>

			<div class="funnel-connector"></div>

			<!-- Stage 3: Scanner -->
			<div class="funnel-stage">
				<div class="stage-box medium">
					<div class="stage-icon">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
							<path d="M9 12l2 2 4-4"/>
						</svg>
					</div>
					<div class="stage-content">
						<span class="stage-name">Scanner</span>
						<span class="stage-desc">Vulnerabilities caught</span>
					</div>
					<span class="stage-tag">SECURE</span>
				</div>
			</div>

			<div class="funnel-connector final"></div>

			<!-- Output -->
			<div class="funnel-stage output">
				<div class="stage-box narrow shipped">
					<span class="shipped-text">Ship with confidence</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Products Grid -->
	<section class="products">
		<h2>The Tools</h2>
		<div class="products-grid">
			{#each products as product}
				<a
					href={product.url || product.github}
					target={product.url?.startsWith('http') ? '_blank' : undefined}
					class="product-card"
					class:coming={product.status === 'coming'}
					onmouseenter={() => activeProduct = product.name}
					onmouseleave={() => activeProduct = null}
				>
					<div class="product-header">
						<div class="product-icon" class:active={activeProduct === product.name}>
							{#if product.icon === 'shield'}
								<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
									<path d="M9 12l2 2 4-4"/>
								</svg>
							{:else if product.icon === 'brain'}
								<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
									<path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
									<path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
									<path d="M12 18v4"/>
								</svg>
							{:else if product.icon === 'spawn'}
								<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<circle cx="12" cy="12" r="3"/>
									<circle cx="4" cy="4" r="2"/>
									<circle cx="20" cy="4" r="2"/>
									<circle cx="4" cy="20" r="2"/>
									<circle cx="20" cy="20" r="2"/>
									<line x1="12" y1="9" x2="12" y2="4"/>
									<line x1="9" y1="12" x2="4" y2="12"/>
									<line x1="15" y1="12" x2="20" y2="12"/>
									<line x1="12" y1="15" x2="12" y2="20"/>
								</svg>
							{:else if product.icon === 'book'}
								<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
									<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
									<path d="M8 7h8"/>
									<path d="M8 11h6"/>
								</svg>
							{/if}
						</div>
						<div class="product-status" class:live={product.status === 'live'}>
							{#if product.status === 'live'}
								<span class="status-dot"></span>
								Live
							{:else}
								Soon
							{/if}
						</div>
					</div>

					<h3>{product.name}</h3>
					<p class="product-tagline">{product.tagline}</p>
					<p class="product-description">{product.description}</p>

					<div class="product-footer">
						<span class="product-stats">{product.stats}</span>
						<span class="product-arrow">→</span>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Why Section -->
	<section class="why">
		<div class="why-inner">
			<h2>Why Vibeship?</h2>
			<p class="section-subtitle">Ship products you're actually proud of.</p>

			<div class="why-list">
				<div class="why-item">
					<div class="why-number">01</div>
					<div class="why-content">
						<h3>Vibe Fast, Ship Safe</h3>
						<p>Catch vulnerabilities before your users do. Security that understands how you actually build.</p>
					</div>
				</div>

				<div class="why-divider"></div>

				<div class="why-item">
					<div class="why-number">02</div>
					<div class="why-content">
						<h3>Never Start From Zero</h3>
						<p>Your context persists. Decisions, learnings, and reminders follow you across sessions.</p>
					</div>
				</div>

				<div class="why-divider"></div>

				<div class="why-item">
					<div class="why-number">03</div>
					<div class="why-content">
						<h3>Scale With Agents</h3>
						<p>Spawn parallel agents for complex tasks. Build faster without burning out.</p>
					</div>
				</div>

				<div class="why-divider"></div>

				<div class="why-item">
					<div class="why-number">04</div>
					<div class="why-content">
						<h3>Open Source Core</h3>
						<p>Every tool on GitHub. See exactly what's running. Full transparency, no surprises.</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Stats Section -->
	<section class="stats">
		<div class="stats-grid">
			<div class="stat">
				<div class="stat-value">2000+</div>
				<div class="stat-label">Vulnerability Types</div>
				<div class="stat-sub">OWASP Top 10 + AI-specific</div>
			</div>
			<div class="stat">
				<div class="stat-value">12</div>
				<div class="stat-label">MCP Tools</div>
				<div class="stat-sub">Memory, reminders, search</div>
			</div>
			<div class="stat">
				<div class="stat-value">50+</div>
				<div class="stat-label">Articles & Guides</div>
				<div class="stat-sub">Written for vibe coders</div>
			</div>
			<div class="stat">
				<div class="stat-value">100%</div>
				<div class="stat-label">Free For Now</div>
				<div class="stat-sub">No strings attached</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="final-cta">
		<div class="cta-content">
			<h2>Ready to ship <span class="highlight">better, safer, stronger?</span></h2>
			<div class="cta-buttons">
				<a href="https://mind.vibeship.co" class="btn btn-primary btn-glow btn-lg" target="_blank">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
						<path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
						<path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
						<path d="M12 18v4"/>
					</svg>
					Install Mind
				</a>
				<a href="https://scanner.vibeship.co" class="btn btn-secondary btn-lg" target="_blank">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
						<path d="M9 12l2 2 4-4"/>
					</svg>
					Scan Your Code
				</a>
			</div>
		</div>
	</section>
</main>

<footer>
	<div class="footer-content">
		<div class="footer-upper">
			<div class="footer-products">
				<a href="https://scanner.vibeship.co" target="_blank">Scanner</a>
				<a href="https://mind.vibeship.co" target="_blank">Mind</a>
				<a href="/kb">Knowledge Base</a>
			</div>
			<div class="footer-social">
				<a href="https://github.com/vibeforge1111" target="_blank" class="github-btn">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
					</svg>
					GitHub
				</a>
				<a href="https://x.com/vibeshipco" target="_blank" class="x-link" aria-label="X">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
						<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
					</svg>
				</a>
			</div>
		</div>
		<div class="footer-lower">
			<a href="/" class="footer-logo">
				<img src="/logo.png" alt="vibeship" class="footer-logo-icon" />
				<span>vibeship</span>
			</a>
			<div class="footer-legal">
				<a href="/terms">Terms</a>
				<span class="footer-dot">·</span>
				<a href="/privacy">Privacy</a>
				<span class="footer-dot">·</span>
				<span>Vibe coded. For vibe coders.</span>
			</div>
		</div>
	</div>
</footer>

<style>
	/* Base */
	:global(html) {
		overflow-x: hidden;
	}

	:global(body) {
		font-family: 'JetBrains Mono', monospace;
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}

	/* Navigation */
	nav {
		height: 52px;
		border-bottom: 1px solid var(--border);
		background: var(--bg-primary);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.nav-content {
		height: 100%;
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1.5rem;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		text-decoration: none;
	}

	.logo-icon {
		width: 24px;
		height: 24px;
		filter: invert(var(--logo-invert, 0));
	}

	.logo-text {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: 1.25rem;
		color: var(--text-primary);
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.github-cta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.75rem;
		font-size: 0.75rem;
		color: var(--text-secondary);
		text-decoration: none;
		border: 1px solid var(--border);
		transition: all 0.15s;
	}

	.github-cta:hover {
		border-color: var(--green-dim);
		color: var(--green-dim);
	}

	.theme-toggle {
		background: transparent;
		border: 1px solid var(--border);
		color: var(--text-secondary);
		width: 32px;
		height: 32px;
		padding: 0;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s;
	}

	.theme-toggle:hover {
		border-color: var(--green-dim);
		color: var(--green-dim);
	}

	/* Main */
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
		overflow-x: hidden;
	}

	/* Hero */
	.hero {
		padding: 4rem 0 3rem;
		text-align: center;
	}

	.hero-intro {
		margin-bottom: 2.5rem;
	}

	.hero-badge {
		display: inline-block;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--green-dim);
		border: 1px solid var(--green-dim);
		padding: 0.4rem 1rem;
		margin-bottom: 1.5rem;
	}

	.hero h1 {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: 3.5rem;
		font-weight: 400;
		line-height: 1.1;
		margin-bottom: 1rem;
	}

	.highlight {
		color: var(--green-dim);
		position: relative;
		display: inline-block;
	}

	.underline-accent {
		position: absolute;
		bottom: -0.15em;
		left: -3%;
		width: 106%;
		height: 4px;
		background: linear-gradient(90deg, transparent 0%, var(--green-dim) 10%, var(--green-dim) 90%, transparent 100%);
		transform: rotate(-1.5deg);
		border-radius: 2px;
	}

	.underline-accent.green {
		background: linear-gradient(90deg, transparent 0%, var(--green-dim) 10%, var(--green-dim) 90%, transparent 100%);
	}

	.underline-accent.orange {
		background: linear-gradient(90deg, transparent 0%, #E27B58 8%, #D97757 50%, #CC6B4A 92%, transparent 100%);
		height: 3px;
		transform: rotate(-1deg) skewX(-2deg);
	}

	.hero-subtitle {
		font-size: 1.1rem;
		color: var(--text-secondary);
		max-width: 500px;
		margin: 0 auto;
		line-height: 1.6;
	}

	/* IDE Explorer */
	.ide-explorer {
		display: flex;
		max-width: 900px;
		margin: 0 auto 3rem;
		border: 1px solid var(--green-dim);
		box-shadow: 0 0 40px rgba(0, 196, 154, 0.12), 0 20px 60px rgba(0, 0, 0, 0.3);
		text-align: left;
	}

	/* IDE Sidebar */
	.ide-sidebar {
		width: 220px;
		background: var(--bg-tertiary);
		border-right: 1px solid var(--border);
		display: flex;
		flex-direction: column;
	}

	.sidebar-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border);
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-secondary);
	}

	.sidebar-category {
		padding: 0.5rem 0;
	}

	.category-label {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.4rem 1rem;
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-tertiary);
	}

	.category-label svg {
		opacity: 0.6;
	}

	.tool-item {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		width: 100%;
		padding: 0.6rem 1rem 0.6rem 1.75rem;
		background: transparent;
		border: none;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.8rem;
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.15s;
		text-align: left;
	}

	.tool-item:hover {
		background: var(--bg-secondary);
		color: var(--text-primary);
	}

	.tool-item.active {
		background: var(--bg-secondary);
		color: var(--green-dim);
		border-left: 2px solid var(--green-dim);
		padding-left: calc(1.75rem - 2px);
	}

	.tool-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.7;
	}

	.tool-item.active .tool-icon {
		opacity: 1;
		color: var(--green-dim);
	}

	.tool-name {
		flex: 1;
	}

	.tool-status {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--text-tertiary);
	}

	.tool-status.live {
		background: var(--green-dim);
		box-shadow: 0 0 6px var(--green-dim);
		animation: pulse 2s infinite;
	}

	.tool-status-text {
		font-size: 0.6rem;
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.sidebar-footer {
		margin-top: auto;
		padding: 0.75rem 1rem;
		border-top: 1px solid var(--border);
	}

	.github-footer-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.7rem;
		color: var(--text-tertiary);
		text-decoration: none;
		transition: color 0.15s;
	}

	.github-footer-link:hover {
		color: var(--green-dim);
	}

	/* Mobile Tabs - hidden on desktop */
	.mobile-tabs {
		display: none;
	}

	/* IDE Terminal */
	.ide-terminal {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: var(--bg-secondary);
	}

	.terminal-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		background: var(--bg-tertiary);
		border-bottom: 1px solid var(--border);
	}

	.terminal-dots {
		display: flex;
		gap: 0.4rem;
	}

	.terminal-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.terminal-dot.red { background: #ff5f56; }
	.terminal-dot.yellow { background: #ffbd2e; }
	.terminal-dot.green { background: #27c93f; }

	.terminal-title {
		flex: 1;
		font-size: 0.8rem;
		color: var(--green-dim);
		font-weight: 500;
	}

	.terminal-actions {
		display: flex;
		gap: 0.5rem;
	}

	.terminal-action {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--green-dim);
		text-decoration: none;
		padding: 0.3rem 0.6rem;
		border: 1px solid var(--green-dim);
		transition: all 0.15s;
	}

	.terminal-action:hover {
		background: var(--green-dim);
		color: var(--bg-primary);
	}

	.terminal-action.disabled {
		color: var(--text-tertiary);
		border-color: var(--border);
		cursor: default;
	}

	.terminal-body {
		padding: 1.25rem;
		flex: 1;
		min-height: 420px;
		font-size: 0.8rem;
		overflow-y: auto;
	}

	.line {
		line-height: 1.8;
		color: var(--text-secondary);
		white-space: pre;
	}

	.line.command {
		color: var(--green-dim);
		font-weight: 500;
	}

	.line.heading {
		color: var(--text-primary);
		font-weight: 600;
		margin-top: 0.25rem;
	}

	.line.critical {
		color: #ff5f56;
	}

	.line.high {
		color: var(--orange, #D97757);
	}

	.line.medium {
		color: #ffbd2e;
	}

	.line.agent {
		color: var(--blue, #3399FF);
	}

	.line.result {
		color: var(--text-primary);
	}

	.line.detail {
		color: var(--text-tertiary);
	}

	.line.item {
		padding-left: 0.5rem;
	}

	.line.success {
		color: var(--green-dim);
	}

	.line.hint {
		color: var(--green-dim);
		font-style: italic;
		margin-top: 0.25rem;
	}

	.cursor {
		color: var(--green-dim);
		opacity: 0;
		transition: opacity 0.1s;
	}

	.cursor.visible {
		opacity: 1;
	}

	.terminal-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.6rem 1rem;
		border-top: 1px solid var(--border);
		background: var(--bg-tertiary);
	}

	.footer-hint {
		font-size: 0.7rem;
		color: var(--text-tertiary);
	}

	.footer-link {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.7rem;
		color: var(--text-tertiary);
		text-decoration: none;
		transition: color 0.15s;
	}

	.footer-link:hover {
		color: var(--green-dim);
	}

	/* Hero CTA */
	.hero-cta {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.875rem 1.75rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-decoration: none;
		border: 1px solid;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-lg {
		padding: 1rem 2rem;
		font-size: 0.9rem;
	}

	.btn-primary {
		border-color: var(--green-dim);
		color: var(--green-dim);
		background: transparent;
	}

	.btn-primary:hover {
		background: var(--green-dim);
		color: var(--bg-primary);
	}

	.btn-glow {
		box-shadow: 0 0 20px rgba(0, 196, 154, 0.2);
	}

	.btn-glow:hover {
		box-shadow: 0 0 30px rgba(0, 196, 154, 0.4);
	}

	.btn-secondary {
		border-color: var(--text-primary);
		color: var(--text-primary);
		background: transparent;
		box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
	}

	.btn-secondary:hover {
		border-color: var(--text-primary);
		background: var(--text-primary);
		color: var(--bg-primary);
		box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
	}

	/* Ship Funnel */
	.ship-funnel {
		padding: 5rem 0;
		border-top: 1px solid var(--border);
	}

	.ship-funnel h2, .products h2, .why h2, .final-cta h2 {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: 2.5rem;
		font-weight: 400;
		text-align: center;
		margin-bottom: 0.5rem;
	}

	.section-subtitle {
		text-align: center;
		color: var(--text-secondary);
		margin-bottom: 3rem;
		font-size: 1rem;
	}

	.funnel {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0;
		max-width: 480px;
		margin: 0 auto;
	}

	.funnel-stage {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.stage-box {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.25rem 1.5rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		transition: all 0.2s;
		position: relative;
	}

	.stage-box:hover {
		border-color: var(--green-dim);
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
	}

	.stage-box.wide {
		width: 100%;
		border-color: var(--orange, #D97757);
		color: var(--text-primary);
		justify-content: center;
		margin-bottom: 1rem;
		font-size: 0.85rem;
	}

	.funnel-arrow {
		margin-top: -0.5rem;
	}

	.stage-box.medium {
		width: 88%;
	}

	.stage-box.narrow {
		width: 72%;
		justify-content: center;
	}

	.stage-box.shipped {
		border-color: var(--green-dim);
		background: linear-gradient(135deg, rgba(0, 196, 154, 0.04) 0%, rgba(0, 196, 154, 0.01) 100%);
		box-shadow: 0 0 12px rgba(0, 196, 154, 0.08);
	}

	.stage-icon {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-tertiary);
		border: 1px solid var(--border);
		flex-shrink: 0;
	}

	.stage-box:hover .stage-icon {
		border-color: var(--green-dim);
		background: rgba(0, 196, 154, 0.1);
	}

	.stage-icon svg {
		color: var(--green-dim);
	}

	.stage-content {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		flex: 1;
	}

	.stage-name {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: 1.1rem;
		font-weight: 400;
		color: var(--text-primary);
	}

	.stage-desc {
		font-size: 0.8rem;
		color: var(--text-secondary);
	}

	.stage-tag {
		font-size: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--text-tertiary);
		padding: 0.25rem 0.5rem;
		background: var(--bg-tertiary);
		border: 1px solid var(--border);
	}

	.funnel-connector {
		width: 1px;
		height: 24px;
		background: linear-gradient(180deg, var(--border) 0%, var(--green-dim) 100%);
		opacity: 0.5;
	}

	.funnel-connector.final {
		background: var(--green-dim);
		opacity: 0.8;
		height: 28px;
	}

	.shipped-text {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: 1.4rem;
		color: var(--text-primary);
	}

	/* Products Grid */
	.products {
		padding: 5rem 0;
		border-top: 1px solid var(--border);
	}

	.products-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.product-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 2rem;
		text-decoration: none;
		color: inherit;
		transition: all 0.2s;
		display: flex;
		flex-direction: column;
	}

	.product-card:hover {
		border-color: var(--green-dim);
		transform: translateY(-4px);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
	}

	.product-card.coming {
		opacity: 0.7;
	}

	.product-card.coming:hover {
		opacity: 1;
	}

	.product-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}

	.product-icon {
		color: var(--text-tertiary);
		transition: color 0.2s;
	}

	.product-icon.active,
	.product-card:hover .product-icon {
		color: var(--green-dim);
	}

	.product-status {
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 0.3rem 0.6rem;
		border: 1px solid var(--border);
		color: var(--text-tertiary);
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.product-status.live {
		border-color: var(--green-dim);
		color: var(--green-dim);
	}

	.status-dot {
		width: 6px;
		height: 6px;
		background: var(--green-dim);
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
	}

	.product-card h3 {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: 1.75rem;
		font-weight: 400;
		margin-bottom: 0.25rem;
	}

	.product-tagline {
		font-size: 0.875rem;
		color: var(--green-dim);
		margin-bottom: 1rem;
	}

	.product-description {
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.7;
		flex-grow: 1;
	}

	.product-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px dashed var(--border);
	}

	.product-stats {
		font-size: 0.75rem;
		color: var(--text-tertiary);
	}

	.product-arrow {
		font-size: 1.25rem;
		color: var(--text-tertiary);
		transition: transform 0.2s, color 0.2s;
	}

	.product-card:hover .product-arrow {
		color: var(--green-dim);
		transform: translateX(4px);
	}

	/* Why Section */
	.why {
		background: #f8f9fa;
		padding: 5rem 0;
	}

	.why-inner {
		max-width: 800px;
		margin: 0 auto;
	}

	.why h2 {
		color: #1a1a1a;
	}

	.why .section-subtitle {
		color: #5a5a5a;
	}

	.why-list {
		margin-top: 3rem;
	}

	.why-item {
		display: flex;
		align-items: flex-start;
		gap: 2rem;
		padding: 1.5rem 0;
	}

	.why-number {
		font-size: 1.5rem;
		font-family: 'Instrument Serif', Georgia, serif;
		color: #0d847a;
		font-weight: 400;
		flex-shrink: 0;
		width: 2.5rem;
	}

	.why-content {
		flex: 1;
	}

	.why-content h3 {
		font-family: 'JetBrains Mono', monospace;
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: #1a1a1a;
	}

	.why-content p {
		font-size: 0.9rem;
		color: #5a5a5a;
		line-height: 1.6;
	}

	.why-divider {
		height: 1px;
		background: #d4d4d4;
	}

	/* Stats Section */
	.stats {
		padding: 4rem 0;
		border-top: 1px solid #d4d4d4;
		border-bottom: 1px solid #d4d4d4;
		background: linear-gradient(180deg, transparent 0%, rgba(0, 196, 154, 0.03) 100%);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
		text-align: center;
	}

	.stat-value {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: 3rem;
		color: var(--green-dim);
		line-height: 1;
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--text-primary);
		margin-top: 0.5rem;
		font-weight: 500;
	}

	.stat-sub {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin-top: 0.25rem;
	}

	/* Final CTA */
	.final-cta {
		padding: 6rem 0;
		border-top: 1px solid var(--border);
		text-align: center;
	}

	.final-cta h2 {
		margin-bottom: 2rem;
	}

	.final-cta p {
		color: var(--text-secondary);
		margin-bottom: 2rem;
		font-size: 1.1rem;
	}

	.cta-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	/* Footer */
	footer {
		border-top: 1px solid var(--border);
		padding: 1.5rem;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.footer-upper {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.footer-products {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.footer-products a {
		font-size: 0.8rem;
		color: var(--text-secondary);
		text-decoration: none;
		transition: color 0.15s;
	}

	.footer-products a:hover {
		color: var(--green-dim);
	}

	.footer-social {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.github-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.75rem;
		font-size: 0.75rem;
		color: var(--text-secondary);
		text-decoration: none;
		border: 1px solid var(--border);
		transition: all 0.15s;
	}

	.github-btn:hover {
		border-color: var(--green-dim);
		color: var(--green-dim);
	}

	.x-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		color: var(--text-secondary);
		border: 1px solid var(--border);
		transition: all 0.15s;
	}

	.x-link:hover {
		border-color: var(--green-dim);
		color: var(--green-dim);
	}

	.footer-lower {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 1rem;
		border-top: 1px solid var(--border);
	}

	.footer-logo {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		text-decoration: none;
	}

	.footer-logo-icon {
		width: 18px;
		height: 18px;
		filter: invert(var(--logo-invert, 0));
	}

	.footer-logo span {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.footer-legal {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.65rem;
		color: var(--text-tertiary);
	}

	.footer-legal a {
		color: var(--text-tertiary);
		text-decoration: none;
		transition: color 0.15s;
	}

	.footer-legal a:hover {
		color: var(--green-dim);
	}

	.footer-dot {
		opacity: 0.5;
	}

	/* Responsive */
	@media (max-width: 900px) {
		.hero h1 {
			font-size: 2.75rem;
		}

		.ide-explorer {
			flex-direction: column;
		}

		.ide-sidebar {
			display: none;
		}

		.mobile-tabs {
			display: flex;
			background: var(--bg-tertiary);
			border-bottom: 1px solid var(--border);
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
		}

		.mobile-tab {
			display: flex;
			align-items: center;
			gap: 0.4rem;
			padding: 0.75rem 1rem;
			background: transparent;
			border: none;
			border-bottom: 2px solid transparent;
			font-family: 'JetBrains Mono', monospace;
			font-size: 0.75rem;
			color: var(--text-secondary);
			cursor: pointer;
			white-space: nowrap;
			transition: all 0.15s;
		}

		.mobile-tab:hover {
			color: var(--text-primary);
			background: var(--bg-secondary);
		}

		.mobile-tab.active {
			color: var(--green-dim);
			border-bottom-color: var(--green-dim);
			background: var(--bg-secondary);
		}

		.mobile-tab svg {
			flex-shrink: 0;
		}

		.tab-status {
			width: 5px;
			height: 5px;
			background: var(--green-dim);
			border-radius: 50%;
			margin-left: 0.2rem;
		}

		.terminal-body {
			height: 320px;
			min-height: 320px;
			max-height: 320px;
			padding: 1rem;
			font-size: 0.75rem;
			overflow-y: auto;
		}

		.ide-explorer {
			border-radius: 8px;
			overflow: hidden;
		}

		.mobile-tabs {
			border-radius: 8px 8px 0 0;
		}

		.terminal-footer {
			padding: 0.5rem 1rem;
		}

		.footer-hint {
			font-size: 0.65rem;
		}

		.products-grid {
			grid-template-columns: 1fr;
		}

		.why {
			padding: 5rem 1.5rem;
		}

		.why-item {
			gap: 1rem;
		}

		.why-number {
			font-size: 1.25rem;
			width: 2.5rem;
			min-width: 2.5rem;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.funnel {
			max-width: 100%;
		}

		.footer-upper {
			flex-direction: column;
			gap: 1rem;
		}

		.footer-products {
			flex-wrap: wrap;
			justify-content: center;
		}

		.footer-lower {
			flex-direction: column;
			gap: 1rem;
		}

		.footer-legal {
			flex-wrap: wrap;
			justify-content: center;
		}
	}

	@media (max-width: 600px) {
		.hero h1 {
			font-size: 2.25rem;
		}

		.ide-explorer {
			margin-left: 0;
			margin-right: 0;
			border-radius: 4px;
		}

		.hero-cta {
			flex-direction: column;
			align-items: stretch;
		}

		.btn {
			width: 100%;
		}

		.stats-grid {
			grid-template-columns: 1fr 1fr;
			gap: 1.5rem;
		}

		.stat-value {
			font-size: 2.5rem;
		}

		.why-item {
			gap: 0.75rem;
		}

		.why-number {
			font-size: 1.1rem;
			width: 2rem;
			min-width: 2rem;
		}

		.why-content h3 {
			font-size: 0.9rem;
		}

		.why-content p {
			font-size: 0.85rem;
		}
	}
</style>
