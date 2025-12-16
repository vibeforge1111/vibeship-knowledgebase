<script lang="ts">
	import { onMount } from 'svelte';

	interface ScanLine {
		type: 'command' | 'output' | 'critical' | 'high' | 'medium' | 'info' | 'success' | 'link';
		text: string;
		href?: string;
		delay?: number;
	}

	const scanOutput: ScanLine[] = [
		{ type: 'command', text: '$ vibeship scan ./my-vibe-project', delay: 0 },
		{ type: 'output', text: '', delay: 300 },
		{ type: 'info', text: 'Scanning 47 files...', delay: 600 },
		{ type: 'output', text: '', delay: 1200 },
		{ type: 'critical', text: '[CRITICAL] SQL Injection detected', delay: 1400 },
		{ type: 'output', text: '  → src/api/users.ts:23', delay: 1600 },
		{ type: 'link', text: '  → Learn more', href: '/kb/vulnerabilities/sql-injection', delay: 1800 },
		{ type: 'output', text: '', delay: 2000 },
		{ type: 'high', text: '[HIGH] Hardcoded API Key', delay: 2200 },
		{ type: 'output', text: '  → .env.local:5', delay: 2400 },
		{ type: 'link', text: '  → Learn more', href: '/kb/vulnerabilities/hardcoded-secrets', delay: 2600 },
		{ type: 'output', text: '', delay: 2800 },
		{ type: 'medium', text: '[MEDIUM] Missing Rate Limiting', delay: 3000 },
		{ type: 'output', text: '  → src/routes/api/login.ts', delay: 3200 },
		{ type: 'link', text: '  → Learn more', href: '/kb/vulnerabilities/missing-rate-limiting', delay: 3400 },
		{ type: 'output', text: '', delay: 3600 },
		{ type: 'success', text: 'Scan complete: 3 issues found in 2.3s', delay: 3800 },
		{ type: 'output', text: '', delay: 4000 },
		{ type: 'info', text: 'Run a full scan at scanner.vibeship.co', delay: 4200 }
	];

	let visibleLines: ScanLine[] = $state([]);
	let isComplete = $state(false);

	onMount(() => {
		scanOutput.forEach((line, index) => {
			setTimeout(() => {
				visibleLines = [...visibleLines, line];
				if (index === scanOutput.length - 1) {
					isComplete = true;
				}
			}, line.delay || 0);
		});
	});

	function getLineClass(type: string): string {
		switch (type) {
			case 'command': return 'line-command';
			case 'critical': return 'line-critical';
			case 'high': return 'line-high';
			case 'medium': return 'line-medium';
			case 'info': return 'line-info';
			case 'success': return 'line-success';
			case 'link': return 'line-link';
			default: return '';
		}
	}
</script>

<div class="terminal">
	<div class="terminal-header">
		<div class="terminal-dots">
			<span class="dot dot-red"></span>
			<span class="dot dot-yellow"></span>
			<span class="dot dot-green"></span>
		</div>
		<span class="terminal-title">vibeship_scan()</span>
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
	<div class="terminal-footer">
		<a href="https://scanner.vibeship.co" class="terminal-cta">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
			</svg>
			Scan your code free
		</a>
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
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border);
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
		min-height: 280px;
		line-height: 1.6;
	}

	.terminal-line {
		display: block;
		white-space: pre;
	}

	.line-command {
		color: var(--green);
	}

	.line-critical {
		color: var(--red);
		font-weight: 600;
	}

	.line-high {
		color: var(--orange);
		font-weight: 600;
	}

	.line-medium {
		color: var(--blue);
		font-weight: 600;
	}

	.line-info {
		color: var(--text-tertiary);
	}

	.line-success {
		color: var(--green);
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

	.terminal-footer {
		padding: 0.75rem 1rem;
		border-top: 1px solid var(--border);
		background: var(--bg-secondary);
	}

	.terminal-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--green-dim);
		font-size: 0.75rem;
		text-decoration: none;
		transition: color 0.15s;
	}

	.terminal-cta:hover {
		color: var(--green);
	}

	@media (max-width: 768px) {
		.terminal-body {
			min-height: 240px;
			font-size: 0.7rem;
		}
	}
</style>
