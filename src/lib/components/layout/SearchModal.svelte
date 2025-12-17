<script lang="ts">
	import { goto } from '$app/navigation';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
	}

	let { isOpen, onClose }: Props = $props();
	let searchQuery = $state('');
	let inputElement: HTMLInputElement;
	let selectedIndex = $state(0);

	// All searchable content
	const searchableContent = [
		// Vulnerabilities
		{ title: 'SQL Injection', href: '/kb/security/vulnerabilities/sql-injection', category: 'Vulnerability', keywords: ['database', 'query', 'parameterized'] },
		{ title: 'Cross-Site Scripting (XSS)', href: '/kb/security/vulnerabilities/xss', category: 'Vulnerability', keywords: ['script', 'html', 'sanitize'] },
		{ title: 'Hardcoded Secrets', href: '/kb/security/vulnerabilities/hardcoded-secrets', category: 'Vulnerability', keywords: ['api key', 'password', 'credentials', 'env'] },
		{ title: 'Missing Authentication', href: '/kb/security/vulnerabilities/missing-auth', category: 'Vulnerability', keywords: ['auth', 'login', 'protect'] },
		{ title: 'IDOR', href: '/kb/security/vulnerabilities/idor', category: 'Vulnerability', keywords: ['insecure direct object reference', 'authorization'] },
		{ title: 'Broken Access Control', href: '/kb/security/vulnerabilities/broken-access-control', category: 'Vulnerability', keywords: ['authorization', 'permissions', 'rbac'] },
		{ title: 'CSRF', href: '/kb/security/vulnerabilities/csrf', category: 'Vulnerability', keywords: ['cross-site request forgery', 'token'] },
		{ title: 'Insecure CORS', href: '/kb/security/vulnerabilities/insecure-cors', category: 'Vulnerability', keywords: ['cross-origin', 'headers'] },
		{ title: 'Missing Rate Limiting', href: '/kb/security/vulnerabilities/missing-rate-limiting', category: 'Vulnerability', keywords: ['throttle', 'brute force', 'dos'] },
		{ title: 'Sensitive Data Exposure', href: '/kb/security/vulnerabilities/sensitive-data-exposure', category: 'Vulnerability', keywords: ['pii', 'encryption', 'logging'] },
		{ title: 'Insecure Deserialization', href: '/kb/security/vulnerabilities/insecure-deserialization', category: 'Vulnerability', keywords: ['json', 'pickle', 'yaml'] },
		{ title: 'JWT Vulnerabilities', href: '/kb/security/vulnerabilities/jwt-vulnerabilities', category: 'Vulnerability', keywords: ['token', 'algorithm', 'none'] },
		{ title: 'Mass Assignment', href: '/kb/security/vulnerabilities/mass-assignment', category: 'Vulnerability', keywords: ['object', 'whitelist', 'dto'] },
		{ title: 'Open Redirect', href: '/kb/security/vulnerabilities/open-redirect', category: 'Vulnerability', keywords: ['url', 'phishing'] },
		{ title: 'Path Traversal', href: '/kb/security/vulnerabilities/path-traversal', category: 'Vulnerability', keywords: ['file', 'directory', '../'] },
		{ title: 'SSRF', href: '/kb/security/vulnerabilities/ssrf', category: 'Vulnerability', keywords: ['server-side request forgery', 'internal'] },
		{ title: 'SSTI', href: '/kb/security/vulnerabilities/ssti', category: 'Vulnerability', keywords: ['server-side template injection', 'jinja', 'handlebars'] },
		{ title: 'XXE', href: '/kb/security/vulnerabilities/xxe', category: 'Vulnerability', keywords: ['xml external entities', 'parser'] },
		{ title: 'Command Injection', href: '/kb/security/vulnerabilities/command-injection', category: 'Vulnerability', keywords: ['shell', 'exec', 'system'] },
		{ title: 'Race Conditions', href: '/kb/security/vulnerabilities/race-conditions', category: 'Vulnerability', keywords: ['toctou', 'concurrent', 'async'] },

		// AI Tools
		{ title: 'Cursor', href: '/kb/vibe-coding-tools/cursor', category: 'AI Tool', keywords: ['vscode', 'editor', 'composer'] },
		{ title: 'Claude Code', href: '/kb/vibe-coding-tools/claude-code', category: 'AI Tool', keywords: ['anthropic', 'terminal', 'cli'] },
		{ title: 'Bolt', href: '/kb/vibe-coding-tools/bolt', category: 'AI Tool', keywords: ['stackblitz', 'browser', 'fullstack'] },
		{ title: 'v0 by Vercel', href: '/kb/vibe-coding-tools/v0', category: 'AI Tool', keywords: ['react', 'nextjs', 'ui'] },
		{ title: 'Replit', href: '/kb/vibe-coding-tools/replit', category: 'AI Tool', keywords: ['online', 'ide', 'hosting'] },
		{ title: 'GitHub Copilot', href: '/kb/vibe-coding-tools/github-copilot', category: 'AI Tool', keywords: ['openai', 'autocomplete'] },
		{ title: 'Windsurf', href: '/kb/vibe-coding-tools/windsurf', category: 'AI Tool', keywords: ['codeium', 'agentic'] },
		{ title: 'Lovable', href: '/kb/vibe-coding-tools/lovable', category: 'AI Tool', keywords: ['app builder', 'fullstack'] },

		// Stack Guides
		{ title: 'Next.js + Supabase', href: '/kb/security/stacks/nextjs-supabase', category: 'Stack Guide', keywords: ['rls', 'postgres', 'auth'] },
		{ title: 'Next.js + Prisma', href: '/kb/security/stacks/nextjs-prisma', category: 'Stack Guide', keywords: ['orm', 'database', 'typescript'] },
		{ title: 'SvelteKit + Supabase', href: '/kb/security/stacks/sveltekit-supabase', category: 'Stack Guide', keywords: ['svelte', 'postgres', 'auth'] },

		// Checklists
		{ title: 'Pre-Launch Security Checklist', href: '/kb/security/checklists/pre-launch', category: 'Checklist', keywords: ['deploy', 'production', 'review'] },

		// Guides
		{ title: 'Secure Vibe Coding Guide', href: '/kb/vibe-coding/secure-vibe-coding-guide', category: 'Guide', keywords: ['best practices', 'ai', 'security'] },
		{ title: 'MCP Server Security', href: '/kb/agents/security/mcp-servers', category: 'Guide', keywords: ['model context protocol', 'claude', 'tools'] },

		// Hub Pages
		{ title: 'Security Knowledge Base', href: '/kb/security', category: 'Hub', keywords: ['overview', 'security'] },
		{ title: 'All Vulnerabilities', href: '/kb/security/vulnerabilities', category: 'Hub', keywords: ['list', 'owasp'] },
		{ title: 'AI Tool Patterns', href: '/kb/vibe-coding-tools', category: 'Hub', keywords: ['ai tools', 'patterns'] },
		{ title: 'Stack Guides', href: '/kb/security/stacks', category: 'Hub', keywords: ['frameworks', 'databases'] },
		{ title: 'Checklists', href: '/kb/security/checklists', category: 'Hub', keywords: ['todos', 'verify'] },
	];

	const filteredResults = $derived(() => {
		if (!searchQuery.trim()) return [];
		const query = searchQuery.toLowerCase();
		return searchableContent.filter(item => {
			const titleMatch = item.title.toLowerCase().includes(query);
			const categoryMatch = item.category.toLowerCase().includes(query);
			const keywordMatch = item.keywords.some(k => k.toLowerCase().includes(query));
			return titleMatch || categoryMatch || keywordMatch;
		}).slice(0, 10);
	});

	function handleKeydown(e: KeyboardEvent) {
		const results = filteredResults();
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, 0);
		} else if (e.key === 'Enter' && results.length > 0) {
			e.preventDefault();
			goto(results[selectedIndex].href);
			closeAndReset();
		} else if (e.key === 'Escape') {
			closeAndReset();
		}
	}

	function closeAndReset() {
		searchQuery = '';
		selectedIndex = 0;
		onClose();
	}

	function selectResult(href: string) {
		goto(href);
		closeAndReset();
	}

	$effect(() => {
		if (isOpen && inputElement) {
			inputElement.focus();
		}
	});

	$effect(() => {
		// Reset selection when results change
		selectedIndex = 0;
	});
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="search-overlay" onclick={closeAndReset} onkeydown={handleKeydown}>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="search-modal" onclick={(e) => e.stopPropagation()}>
			<div class="search-header">
				<svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<circle cx="11" cy="11" r="8"/>
					<path d="m21 21-4.35-4.35"/>
				</svg>
				<input
					bind:this={inputElement}
					bind:value={searchQuery}
					type="text"
					class="search-modal-input"
					placeholder="Search vulnerabilities, tools, guides..."
					onkeydown={handleKeydown}
				/>
				<button class="search-close" onclick={closeAndReset}>
					<span class="search-esc">ESC</span>
				</button>
			</div>

			{#if filteredResults().length > 0}
				<div class="search-results">
					{#each filteredResults() as result, i}
						<button
							class="search-result"
							class:selected={i === selectedIndex}
							onclick={() => selectResult(result.href)}
						>
							<span class="result-category">{result.category}</span>
							<span class="result-title">{result.title}</span>
						</button>
					{/each}
				</div>
			{:else if searchQuery.trim()}
				<div class="search-empty">
					<p>No results found for "{searchQuery}"</p>
				</div>
			{:else}
				<div class="search-hints">
					<p class="hints-title">Quick searches:</p>
					<div class="hints-tags">
						<button class="hint-tag" onclick={() => searchQuery = 'sql'}>SQL Injection</button>
						<button class="hint-tag" onclick={() => searchQuery = 'xss'}>XSS</button>
						<button class="hint-tag" onclick={() => searchQuery = 'cursor'}>Cursor</button>
						<button class="hint-tag" onclick={() => searchQuery = 'supabase'}>Supabase</button>
					</div>
				</div>
			{/if}

			<div class="search-footer">
				<span class="search-hint"><kbd>↑↓</kbd> to navigate</span>
				<span class="search-hint"><kbd>↵</kbd> to select</span>
				<span class="search-hint"><kbd>esc</kbd> to close</span>
			</div>
		</div>
	</div>
{/if}

<style>
	.search-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding-top: 15vh;
		z-index: 1000;
		backdrop-filter: blur(4px);
	}

	.search-modal {
		width: 100%;
		max-width: 560px;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
	}

	.search-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem;
		border-bottom: 1px solid var(--border);
	}

	.search-icon {
		color: var(--text-tertiary);
		flex-shrink: 0;
	}

	.search-modal-input {
		flex: 1;
		background: transparent;
		border: none;
		font-size: 1rem;
		color: var(--text-primary);
		outline: none;
	}

	.search-modal-input::placeholder {
		color: var(--text-tertiary);
	}

	.search-close {
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.search-esc {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.65rem;
		color: var(--text-tertiary);
		background: var(--bg-primary);
		padding: 0.2rem 0.4rem;
		border: 1px solid var(--border);
	}

	.search-results {
		max-height: 400px;
		overflow-y: auto;
	}

	.search-result {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		background: transparent;
		border: none;
		text-align: left;
		cursor: pointer;
		transition: background 0.1s;
	}

	.search-result:hover,
	.search-result.selected {
		background: var(--bg-primary);
	}

	.result-category {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--green-dim);
		background: rgba(34, 197, 94, 0.1);
		padding: 0.15rem 0.4rem;
		border: 1px solid rgba(34, 197, 94, 0.3);
		flex-shrink: 0;
	}

	.result-title {
		font-size: 0.9rem;
		color: var(--text-primary);
	}

	.search-empty {
		padding: 2rem 1rem;
		text-align: center;
		color: var(--text-tertiary);
	}

	.search-hints {
		padding: 1.5rem 1rem;
	}

	.hints-title {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin-bottom: 0.75rem;
	}

	.hints-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.hint-tag {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		color: var(--text-secondary);
		background: var(--bg-primary);
		border: 1px solid var(--border);
		padding: 0.35rem 0.6rem;
		cursor: pointer;
		transition: all 0.15s;
	}

	.hint-tag:hover {
		border-color: var(--text-tertiary);
		color: var(--text-primary);
	}

	.search-footer {
		display: flex;
		gap: 1rem;
		padding: 0.75rem 1rem;
		border-top: 1px solid var(--border);
		background: var(--bg-primary);
	}

	.search-hint {
		font-size: 0.7rem;
		color: var(--text-tertiary);
	}

	.search-hint kbd {
		font-family: 'JetBrains Mono', monospace;
		background: var(--bg-secondary);
		padding: 0.1rem 0.3rem;
		border: 1px solid var(--border);
		margin-right: 0.25rem;
	}
</style>
