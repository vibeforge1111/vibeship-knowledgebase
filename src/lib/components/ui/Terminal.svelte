<script lang="ts">
	import { onMount } from 'svelte';

	interface TerminalLine {
		type: 'command' | 'output' | 'welcome' | 'topic' | 'info' | 'status' | 'stat' | 'cta' | 'link';
		text: string;
		href?: string;
		delay?: number;
	}

	const terminalContent: TerminalLine[] = [
		{ type: 'command', text: '$ vibeship init --vibe-coder', delay: 0 },
		{ type: 'output', text: '', delay: 400 },
		{ type: 'welcome', text: 'Welcome to VibeShip Knowledge Base', delay: 700 },
		{ type: 'info', text: 'Your guide to shipping secure AI-generated code', delay: 1000 },
		{ type: 'output', text: '', delay: 1400 },
		{ type: 'status', text: 'Loading topics...', delay: 1600 },
		{ type: 'output', text: '', delay: 2000 },
		{ type: 'topic', text: '→ SQL Injection', delay: 2200 },
		{ type: 'topic', text: '→ Hardcoded Secrets', delay: 2400 },
		{ type: 'topic', text: '→ XSS & Input Validation', delay: 2600 },
		{ type: 'topic', text: '→ Auth & Access Control', delay: 2800 },
		{ type: 'topic', text: '→ AI Tool Patterns', delay: 3000 },
		{ type: 'topic', text: '→ Stack Security Guides', delay: 3200 },
		{ type: 'output', text: '', delay: 3600 },
		{ type: 'stat', text: 'AI tools generate insecure patterns by default', delay: 3800 },
		{ type: 'cta', text: 'Learn what they miss. Explore this knowledge base and use our free scanner.', delay: 4200 }
	];

	let visibleLines: TerminalLine[] = $state([]);
	let isComplete = $state(false);

	onMount(() => {
		terminalContent.forEach((line, index) => {
			setTimeout(() => {
				visibleLines = [...visibleLines, line];
				if (index === terminalContent.length - 1) {
					isComplete = true;
				}
			}, line.delay || 0);
		});
	});

	function getLineClass(type: string): string {
		switch (type) {
			case 'command': return 'line-command';
			case 'welcome': return 'line-welcome';
			case 'topic': return 'line-topic';
			case 'info': return 'line-info';
			case 'status': return 'line-status';
			case 'stat': return 'line-stat';
			case 'cta': return 'line-cta';
			case 'link': return 'line-link';
			default: return '';
		}
	}
</script>

<div class="terminal">
	<div class="terminal-header">
		<div class="terminal-header-left">
			<div class="terminal-dots">
				<span class="dot dot-red"></span>
				<span class="dot dot-yellow"></span>
				<span class="dot dot-green"></span>
			</div>
			<span class="terminal-title">vibeship_kb()</span>
		</div>
		<a href="https://scanner.vibeship.co" class="terminal-cta">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
			</svg>
			Scan your code free
		</a>
	</div>
	<div class="terminal-body">
		{#each visibleLines as line}
			{#if line.href}
				<a href={line.href} class="terminal-line {getLineClass(line.type)}">{line.text}</a>
			{:else}
				<div class="terminal-line {getLineClass(line.type)}">{line.text}&nbsp;</div>
			{/if}
		{/each}
		{#if !isComplete}
			<span class="cursor">_</span>
		{/if}
	</div>
</div>

<style>
	.terminal {
		background: var(--bg-tertiary);
		border: 1px solid var(--border);
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.8rem;
		overflow: hidden;
	}

	.terminal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border);
	}

	.terminal-header-left {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.terminal-dots {
		display: flex;
		gap: 0.35rem;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.dot-red { background: #ff5f57; }
	.dot-yellow { background: #febc2e; }
	.dot-green { background: #28c840; }

	.terminal-title {
		color: var(--text-tertiary);
		font-size: 0.75rem;
	}

	.terminal-body {
		padding: 1rem;
		height: 360px;
		line-height: 1.6;
		overflow: hidden;
	}

	.terminal-line {
		display: block;
		white-space: pre;
	}

	.line-command {
		color: var(--text-primary);
	}

	.line-welcome {
		color: var(--text-primary);
		font-weight: 600;
		font-size: 0.9rem;
	}

	.line-topic {
		color: var(--green-dim);
		padding-left: 0.5rem;
	}

	.line-info {
		color: var(--text-tertiary);
	}

	.line-status {
		color: var(--text-primary);
	}

	.line-stat {
		color: var(--text-primary);
	}

	.line-cta {
		color: var(--green-dim);
	}

	.line-link {
		color: var(--green-dim);
		text-decoration: none;
		cursor: pointer;
	}

	.line-link:hover {
		color: var(--green);
		text-decoration: underline;
	}

	.cursor {
		color: var(--green);
		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	.terminal-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--green-dim);
		font-size: 0.7rem;
		text-decoration: none;
		transition: color 0.15s;
	}

	.terminal-cta:hover {
		color: var(--green);
		text-decoration: none;
	}

	@media (max-width: 768px) {
		.terminal-body {
			height: 340px;
			font-size: 0.7rem;
		}

		.line-welcome {
			font-size: 0.8rem;
		}

		.terminal-cta {
			font-size: 0.6rem;
		}

		.terminal-cta svg {
			width: 12px;
			height: 12px;
		}
	}
</style>
