<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Cursor AI: The Complete Guide for Beginners & Power Users (2025)',
		description:
			'Master Cursor AI in 2025. Learn Tab autocomplete, Composer, Agent mode, .cursorrules, MCP servers, keyboard shortcuts, and advanced workflows. From first install to power user.',
		url: '/kb/vibe-coding-tools/cursor/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Vibe Coding Tools', href: '/kb/vibe-coding-tools' },
		{ label: 'Cursor' }
	];

	// Table of contents
	const toc = [
		{ id: 'what-is-cursor', label: 'What is Cursor?' },
		{ id: 'getting-started', label: 'Getting Started' },
		{ id: 'tab-autocomplete', label: 'Tab Autocomplete' },
		{ id: 'chat-mode', label: 'Chat Mode (Cmd+L)' },
		{ id: 'composer', label: 'Composer (Cmd+I)' },
		{ id: 'agent-mode', label: 'Agent Mode' },
		{ id: 'inline-edit', label: 'Inline Edit (Cmd+K)' },
		{ id: 'cursorrules', label: '.cursorrules & Rules' },
		{ id: 'mcp-servers', label: 'MCP Servers' },
		{ id: 'keyboard-shortcuts', label: 'Keyboard Shortcuts' },
		{ id: 'models', label: 'Models & Pricing' },
		{ id: 'advanced-tips', label: 'Advanced Tips' },
		{ id: 'youtube-tutorials', label: 'Video Tutorials' },
		{ id: 'resources', label: 'Resources' },
		{ id: 'vs-alternatives', label: 'vs Alternatives' },
		{ id: 'faq', label: 'FAQ' }
	];

	// Keyboard shortcuts
	const shortcuts = [
		{ keys: 'Cmd/Ctrl + L', action: 'Open Chat', description: 'Start a new conversation with AI' },
		{ keys: 'Cmd/Ctrl + I', action: 'Open Composer', description: 'Multi-file editing and code generation' },
		{ keys: 'Cmd/Ctrl + K', action: 'Inline Edit', description: 'Edit selected code or generate at cursor' },
		{ keys: 'Cmd/Ctrl + Shift + L', action: 'Add to Chat', description: 'Add selected code to chat context' },
		{ keys: 'Tab', action: 'Accept Suggestion', description: 'Accept the current autocomplete' },
		{ keys: 'Cmd/Ctrl + →', action: 'Accept Word', description: 'Accept one word of the suggestion' },
		{ keys: 'Escape', action: 'Dismiss', description: 'Dismiss suggestion or close panel' },
		{ keys: 'Cmd/Ctrl + /', action: 'Toggle Comment', description: 'Comment/uncomment selection' },
		{ keys: 'Cmd/Ctrl + Enter', action: 'Run/Submit', description: 'Submit chat or run command' },
		{ keys: '@', action: 'Context Menu', description: 'Reference files, docs, or symbols in chat' }
	];

	// YouTube tutorials
	const tutorials = [
		{
			title: 'Full Cursor AI Tutorial for Beginners',
			author: 'Lee Robinson (Vercel)',
			duration: '50 minutes',
			url: 'https://www.youtube.com/watch?v=gqUQbjsYZLQ',
			description: 'Comprehensive walkthrough from the Vercel VP of Product. Covers Tab, Chat, Composer, and real-world workflows.'
		},
		{
			title: 'Build a Full Stack App with Cursor',
			author: 'Nat Eliason',
			duration: '30 minutes',
			url: 'https://www.youtube.com/watch?v=Ki_PMLqV4ak',
			description: 'End-to-end tutorial building a complete application. Great for understanding practical workflows.'
		},
		{
			title: 'Cursor vs Copilot: Which is Better?',
			author: 'Fireship',
			duration: '8 minutes',
			url: 'https://www.youtube.com/watch?v=QC80jAPjeZs',
			description: 'Quick comparison of the two most popular AI coding tools. Good for understanding trade-offs.'
		},
		{
			title: 'Cursor Agent Mode Deep Dive',
			author: 'AI Explained',
			duration: '25 minutes',
			url: 'https://www.youtube.com/watch?v=yk9lXobJ95E',
			description: 'Advanced tutorial on Agent mode for autonomous multi-step coding tasks.'
		},
		{
			title: 'Building a SaaS with Cursor in 1 Hour',
			author: 'Greg Isenberg',
			duration: '60 minutes',
			url: 'https://www.youtube.com/watch?v=VzxDHDwmmGc',
			description: 'Live coding session building a complete SaaS application from scratch.'
		}
	];

	// FAQ data
	const faqs = [
		{
			question: 'Is Cursor free to use?',
			answer: 'Yes, Cursor has a free Hobby tier that includes 2,000 code completions per month and 50 slow premium requests. This is enough for casual use or trying out the editor. For serious development, the Pro tier at $20/month is the sweet spot, offering unlimited completions and 500 fast premium requests.'
		},
		{
			question: 'What is the difference between Chat, Composer, and Agent mode?',
			answer: 'Chat (Cmd+L) is for asking questions and getting code suggestions you copy manually. Composer (Cmd+I) writes code directly into your files and can edit multiple files at once. Agent mode is Composer with autonomous capabilities - it can run terminal commands, create files, and iterate until your goal is complete.'
		},
		{
			question: 'Should I use Cursor or GitHub Copilot?',
			answer: 'Cursor has stronger multi-file editing capabilities through Composer and Agent mode. Copilot has better IDE integration (JetBrains, Neovim) and GitHub ecosystem features like PR reviews. Many developers use Cursor for greenfield projects and Copilot for maintenance work. See our detailed comparison at /kb/vibe-coding-tools/cursor-vs-copilot/'
		},
		{
			question: 'What are .cursorrules files?',
			answer: 'A .cursorrules file in your project root gives Cursor persistent context about your codebase - coding standards, framework choices, and project-specific patterns. Think of it as a system prompt that applies to all AI interactions in that project. The newer .cursor/rules folder allows for more organized, modular rules.'
		},
		{
			question: 'Which AI model should I use in Cursor?',
			answer: 'Claude 3.5 Sonnet is the default and best for most coding tasks - fast and accurate. Use GPT-4o for complex reasoning or when Claude struggles. Use cursor-small for simple completions to save premium requests. For very complex problems, o1 provides chain-of-thought reasoning but is slower.'
		},
		{
			question: 'Can Cursor access the internet or external documentation?',
			answer: 'Yes. Use @Docs in chat to reference official documentation Cursor has indexed. You can also add custom documentation URLs for frameworks Cursor does not know. For real-time web access, you can set up MCP servers to give Cursor browsing capabilities.'
		},
		{
			question: 'Is my code sent to third parties?',
			answer: 'By default, yes - code is sent to AI providers (Anthropic, OpenAI) for processing. In Cursor Settings, you can enable Privacy Mode which adds end-to-end encryption and prevents your code from being used for training. Enterprise plans offer additional compliance features.'
		},
		{
			question: 'What are Background Agents?',
			answer: 'Background Agents (Pro+ and above) let Cursor work on tasks asynchronously. You can have up to 8 agents running in parallel, each in its own Git worktree. You can close Cursor and check back later when agents complete their work. Think of it as assigning tasks to AI teammates.'
		}
	];

	// Comparison tools
	const comparisons = [
		{ name: 'GitHub Copilot', href: '/kb/vibe-coding-tools/cursor-vs-copilot/', summary: 'Better IDE support, PR reviews, GitHub integration' },
		{ name: 'Claude Code', href: '/kb/vibe-coding-tools/claude-code-vs-cursor/', summary: 'Terminal-based, better for complex refactoring' },
		{ name: 'Windsurf', href: '/kb/vibe-coding-tools/windsurf-vs-cursor/', summary: 'Cascade flow system, JetBrains support' }
	];

	// Resources
	const resources = [
		{ name: 'Official Cursor Documentation', url: 'https://docs.cursor.com/', description: 'Complete feature documentation and guides' },
		{ name: 'cursor.directory', url: 'https://cursor.directory/', description: 'Community-curated .cursorrules collection for every framework' },
		{ name: 'awesome-cursorrules', url: 'https://github.com/PatrickJS/awesome-cursorrules', description: 'GitHub repository of best .cursorrules examples' },
		{ name: 'Cursor Changelog', url: 'https://cursor.com/changelog', description: 'Latest updates and new features' },
		{ name: 'Cursor Forum', url: 'https://forum.cursor.com/', description: 'Community discussions and troubleshooting' },
		{ name: 'MCP Servers Directory', url: 'https://github.com/modelcontextprotocol/servers', description: 'Official Model Context Protocol server implementations' }
	];

	// Composer vs Chat comparison
	const composerVsChat = [
		{ useCase: 'Implementing new features', composer: true },
		{ useCase: 'Asking questions about code', composer: false },
		{ useCase: 'Refactoring across files', composer: true },
		{ useCase: 'Understanding architecture', composer: false },
		{ useCase: 'Creating components/modules', composer: true },
		{ useCase: 'Debugging (discussion mode)', composer: false },
		{ useCase: 'Writing tests for code', composer: true },
		{ useCase: 'Learning new concepts', composer: false },
		{ useCase: 'Adding integrations', composer: true },
		{ useCase: 'Exploring options before committing', composer: false }
	];

	// Tool comparison data
	const toolComparison = [
		{ feature: 'Multi-file editing', cursor: 'Composer', copilot: 'Limited', claudeCode: 'Full codebase', cursorWin: true, claudeWin: true },
		{ feature: 'Agent mode', cursor: 'Yes', copilot: 'No', claudeCode: 'Yes', cursorWin: true, claudeWin: true },
		{ feature: 'IDE support', cursor: 'Cursor only', copilot: 'All IDEs', claudeCode: 'Terminal', copilotWin: true },
		{ feature: 'Model choice', cursor: 'Multiple', copilot: 'GPT-4 only', claudeCode: 'Claude only', cursorWin: true },
		{ feature: 'Free tier', cursor: 'Generous', copilot: 'Limited', claudeCode: 'Free', cursorWin: true, claudeWin: true }
	];
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={meta.url} />
	<meta property="og:type" content="article" />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />

	<!-- BreadcrumbList Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{"@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb"},
			{"@type": "ListItem", "position": 2, "name": "Vibe Coding Tools", "item": "https://vibeship.co/kb/vibe-coding-tools"},
			{"@type": "ListItem", "position": 3, "name": "Cursor"}
		]
	}
	</script>`}

	<!-- TechArticle Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": "${meta.title}",
		"description": "${meta.description}",
		"author": {
			"@type": "Organization",
			"name": "Vibeship"
		},
		"publisher": {
			"@type": "Organization",
			"name": "Vibeship",
			"logo": {
				"@type": "ImageObject",
				"url": "https://vibeship.co/logo.png"
			}
		},
		"datePublished": "2025-12-20",
		"dateModified": "2025-12-20"
	}
	</script>`}

	<!-- FAQ Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": ${JSON.stringify(
			faqs.map((faq) => ({
				'@type': 'Question',
				name: faq.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: faq.answer
				}
			}))
		)}
	}
	</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<!-- Header -->
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-featured">Complete Guide</span>
				<span class="badge">AI Code Editor</span>
				<span class="badge">2025</span>
			</div>
			<h1>Cursor AI: The Complete Guide</h1>
			<p class="subtitle">
				Master vibe coding with Cursor - from your first autocomplete to Background Agents and MCP
				servers. Everything beginners and power users need to know.
			</p>
			<p class="reading-time">~25 minute read | Last updated December 2025</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Cursor is an AI-powered code editor</strong> built on VS Code that offers Tab
				autocomplete, multi-file editing via Composer, and autonomous Agent mode. It supports Claude,
				GPT-4, and other models. Free tier available, Pro is $20/month. Best for: greenfield projects,
				rapid prototyping, and developers who want AI to write code directly into their files.
			</p>
		</div>

		<!-- Table of Contents -->
		<nav class="toc">
			<div class="toc-header">Table of Contents</div>
			<ul class="toc-list">
				{#each toc as item}
					<li><a href="#{item.id}">{item.label}</a></li>
				{/each}
			</ul>
		</nav>

		<!-- What is Cursor -->
		<section id="what-is-cursor" class="article-section">
			<h2>What is Cursor?</h2>
			<p>
				Cursor is an AI-first code editor that has quickly become the go-to tool for vibe coding.
				Built on VS Code, it feels instantly familiar to millions of developers while adding powerful
				AI capabilities that go far beyond simple autocomplete. Where GitHub Copilot suggests code
				line by line, Cursor can edit entire files, run terminal commands, and complete multi-step
				tasks autonomously.
			</p>
			<p>
				The company behind Cursor raised $60 million in 2024 at a $400 million valuation, with backing
				from OpenAI and Andreessen Horowitz. By late 2024, Cursor reported reaching $100 million ARR -
				remarkable growth that reflects how many developers have embraced AI-assisted coding.
			</p>
			<p>
				What makes Cursor different from other AI coding tools is its integrated approach. Rather than
				being a plugin to an existing editor, Cursor was designed from the ground up around AI
				interaction patterns. Features like Composer (multi-file editing) and Agent mode (autonomous
				task completion) are first-class citizens, not afterthoughts.
			</p>

			<div class="callout callout-info">
				<strong>Why "vibe coding"?</strong> The term describes building software by describing what
				you want to the AI rather than writing every line yourself. Cursor is one of the most popular
				tools in this new paradigm, letting developers "vibe" their way through coding tasks while
				the AI handles implementation details.
			</div>

			<h3>Who is Cursor for?</h3>
			<ul>
				<li><strong>Beginners learning to code</strong> - Cursor explains concepts, suggests solutions, and helps you understand patterns as you build</li>
				<li><strong>Professional developers</strong> - Accelerate routine tasks like writing boilerplate, tests, and documentation</li>
				<li><strong>Indie hackers and entrepreneurs</strong> - Ship MVPs and prototypes dramatically faster</li>
				<li><strong>Teams building new products</strong> - Composer and Agent mode excel at greenfield development</li>
			</ul>
		</section>

		<!-- Getting Started -->
		<section id="getting-started" class="article-section">
			<h2>Getting Started with Cursor</h2>
			<p>
				Setting up Cursor takes about 5 minutes. The experience is nearly identical to VS Code, so
				if you have used VS Code before, you will feel right at home.
			</p>

			<h3>Installation</h3>
			<ol class="numbered-list">
				<li>
					<strong>Download Cursor</strong>
					<p>Visit <a href="https://cursor.com" target="_blank" rel="noopener">cursor.com</a> and download for your platform (Mac, Windows, or Linux).</p>
				</li>
				<li>
					<strong>Import VS Code settings</strong>
					<p>On first launch, Cursor offers to import your existing VS Code extensions, themes, and settings. Accept this to maintain your workflow.</p>
				</li>
				<li>
					<strong>Create a Cursor account</strong>
					<p>Sign up for free to get 2,000 completions/month and 50 premium requests. No credit card required.</p>
				</li>
				<li>
					<strong>Open a project</strong>
					<p>Open any folder or clone a repository. Cursor indexes your codebase automatically for context-aware suggestions.</p>
				</li>
			</ol>

			<h3>Your first AI interaction</h3>
			<p>
				The fastest way to experience Cursor is to start typing in any file. Within seconds, you will
				see gray "ghost text" suggesting what comes next. Press <kbd>Tab</kbd> to accept, or keep
				typing to ignore.
			</p>
			<p>
				For more complex tasks, press <kbd>Cmd+L</kbd> (Mac) or <kbd>Ctrl+L</kbd> (Windows/Linux) to
				open Chat. Ask questions like "How do I add authentication to this app?" or "Explain what this
				function does." Cursor sees your entire codebase as context.
			</p>

			<div class="callout callout-tip">
				<strong>Tip:</strong> Start with Chat mode to get comfortable with AI interactions. Once you
				understand how Cursor thinks, graduate to Composer for more powerful multi-file editing.
			</div>
		</section>

		<!-- Tab Autocomplete -->
		<section id="tab-autocomplete" class="article-section">
			<h2>Tab Autocomplete: The Foundation</h2>
			<p>
				Tab autocomplete is Cursor's most basic feature - and the one you will use thousands of times
				a day. As you type, Cursor predicts what you are trying to write and shows suggestions as
				gray "ghost text" that you accept with Tab.
			</p>
			<p>
				Unlike traditional autocomplete that only suggests variable names or function signatures,
				Cursor's Tab completion can suggest entire code blocks, function implementations, or even
				multiple lines at once. It understands your project's patterns and coding style.
			</p>

			<h3>How Tab works under the hood</h3>
			<p>
				Cursor uses a custom model called "cursor-small" for most Tab completions. This model is
				optimized for speed - suggestions appear in under 100ms. For more complex completions,
				Cursor may use Claude or GPT-4, though this counts against your premium request quota.
			</p>
			<p>
				In late 2024, Cursor released its "Tab model" trained specifically for multi-line suggestions.
				The company claims it produces 21% fewer suggestions but with 28% higher accept rates - meaning
				it is better at predicting what you actually want.
			</p>

			<h3>Mastering Tab autocomplete</h3>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Tab Autocomplete Tips</span>
				</div>
				<pre><code>// 1. Write a clear comment, then Tab for implementation
// Function to validate email format and check domain
function validateEmail(email) // Press Tab here

// 2. Start a pattern, Tab completes the rest
const routes = [
  &#123; path: '/', component: Home &#125;,
  // Cursor predicts remaining routes from context

// 3. Partial accept with Cmd+Right
// Accept one word at a time for more control

// 4. Continue typing to refine
// If suggestion is close but not right, keep typing
// Cursor will adjust its prediction</code></pre>
			</div>

			<h3>Tab settings to know</h3>
			<ul>
				<li><strong>Cursor Prediction</strong> - Enable to see cursor position after accepting (shows where you will be typing next)</li>
				<li><strong>Partial Accepts</strong> - Use Cmd/Ctrl+Right to accept word by word</li>
				<li><strong>Tab in comments</strong> - Cursor can complete comments too, not just code</li>
			</ul>
		</section>

		<!-- Chat Mode -->
		<section id="chat-mode" class="article-section">
			<h2>Chat Mode (Cmd+L): Your AI Pair Programmer</h2>
			<p>
				Chat mode opens a conversational interface where you can ask questions, discuss architecture,
				and get code suggestions. Unlike Composer, Chat does not edit your files directly - it shows
				code that you can copy or apply manually. This makes it safer for exploring ideas.
			</p>
			<p>
				Press <kbd>Cmd+L</kbd> (Mac) or <kbd>Ctrl+L</kbd> (Windows) to open Chat. The panel appears
				on the right side of your editor with a text input at the bottom.
			</p>

			<h3>Using @ references</h3>
			<p>
				The <code>@</code> symbol is how you give Chat specific context. Instead of describing files,
				reference them directly:
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">@ References</span>
				</div>
				<pre><code>@Files      - Reference specific files in your project
@Folders    - Include entire folder contents
@Code       - Reference specific code symbols (functions, classes)
@Docs       - Search indexed documentation
@Web        - Search the web for current information
@Git        - Reference git diff, commits, or history
@Codebase   - Search your entire codebase semantically

Examples:
"@schema.prisma add a Post model with title and content"
"Explain what @utils/auth.ts does"
"@Docs Next.js how do I add API routes?"
"@Codebase where is user authentication handled?"</code></pre>
			</div>

			<h3>Chat best practices</h3>
			<ul>
				<li><strong>Add context with Cmd+Shift+L</strong> - Select code and press this shortcut to add it to Chat automatically</li>
				<li><strong>Be specific about what you want</strong> - "Add error handling to this function" beats "improve this"</li>
				<li><strong>Ask follow-up questions</strong> - Chat maintains conversation history, so you can iterate</li>
				<li><strong>Use @Codebase for discovery</strong> - Great for understanding unfamiliar codebases</li>
			</ul>

			<div class="callout callout-tip">
				<strong>Pro tip:</strong> If you select code before pressing Cmd+L, that code is automatically
				added as context. This is faster than typing @Files references manually.
			</div>
		</section>

		<!-- Composer -->
		<section id="composer" class="article-section">
			<h2>Composer (Cmd+I): Multi-File Editing</h2>
			<p>
				Composer is where Cursor truly shines. Press <kbd>Cmd+I</kbd> to open Composer, describe what
				you want, and Cursor writes code directly into your files. It can create new files, modify
				existing ones, and coordinate changes across your entire codebase.
			</p>
			<p>
				Think of Composer as Chat with superpowers. Instead of showing you code to copy, it applies
				changes for you. You see a diff view of proposed edits and can accept or reject each change.
			</p>

			<h3>Composer 2.0 (October 2024)</h3>
			<p>
				The Cursor team released a major Composer update in late 2024. Key improvements include:
			</p>
			<ul>
				<li><strong>4x faster than comparable models</strong> - The new speculative edits system dramatically reduces latency</li>
				<li><strong>Better multi-file coordination</strong> - Changes across files are more consistent</li>
				<li><strong>Improved diff interface</strong> - Clearer visualization of what is changing</li>
				<li><strong>Background processing</strong> - Composer can work while you do other things</li>
			</ul>

			<h3>Composer workflow</h3>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Composer Workflow</span>
				</div>
				<pre><code>1. Press Cmd+I to open Composer

2. Describe your goal clearly:
   "Create a user registration form with email/password
    validation, integrate with the existing auth.ts,
    and add a new API route at /api/auth/register"

3. Review the diff view:
   - Green = additions
   - Red = deletions
   - Click file tabs to see each change

4. Accept or reject:
   - Cmd+Enter accepts all changes
   - Click individual hunks to accept/reject parts
   - Type follow-up to refine

5. Iterate:
   "Also add password confirmation field"
   "Use zod for validation instead"</code></pre>
			</div>

			<h3>When to use Composer vs Chat</h3>
			<div class="comparison-stack">
				{#each composerVsChat as row}
					<div class="comparison-row">
						<div class="comparison-label">{row.useCase}</div>
						<div class="comparison-values">
							<div class="comparison-cell" class:highlight-win={row.composer}>
								<span class="cell-tool">Composer</span>
								<span class="cell-value">{row.composer ? 'Best choice' : '-'}</span>
							</div>
							<div class="comparison-cell" class:highlight-win={!row.composer}>
								<span class="cell-tool">Chat</span>
								<span class="cell-value">{!row.composer ? 'Best choice' : '-'}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Agent Mode -->
		<section id="agent-mode" class="article-section">
			<h2>Agent Mode: Autonomous Coding</h2>
			<p>
				Agent mode takes Composer further by giving AI the ability to execute terminal commands,
				read command output, and iterate until your goal is complete. Instead of just writing code,
				Agent can run tests, check for errors, and fix problems autonomously.
			</p>
			<p>
				Enable Agent mode by toggling the "Agent" switch in Composer or using the keyboard shortcut.
				You will see a "thinking" indicator as Agent plans its approach, then watch as it executes
				commands and edits files.
			</p>

			<h3>What Agent mode can do</h3>
			<ul>
				<li><strong>Run terminal commands</strong> - npm install, git operations, test runners</li>
				<li><strong>Read command output</strong> - Parse errors and fix them automatically</li>
				<li><strong>Create and delete files</strong> - Full filesystem access within your project</li>
				<li><strong>Install dependencies</strong> - Add packages and configure them</li>
				<li><strong>Run builds and tests</strong> - Verify changes work before completing</li>
				<li><strong>Multi-step planning</strong> - Break complex tasks into subtasks</li>
			</ul>

			<div class="callout callout-warning">
				<strong>Caution:</strong> Agent mode runs real commands on your system. Always review what
				Agent is doing, especially for destructive operations like rm or database modifications.
				Consider using a Git branch so you can easily revert.
			</div>

			<h3>Background Agents (Pro+ feature)</h3>
			<p>
				With a Pro+ subscription ($60/month), you get access to Background Agents. These run
				asynchronously - you can start an agent, close Cursor, and check back later. Key features:
			</p>
			<ul>
				<li><strong>Up to 8 parallel agents</strong> - Work on multiple features simultaneously</li>
				<li><strong>Git worktree isolation</strong> - Each agent works in its own branch</li>
				<li><strong>Progress tracking</strong> - See status and logs for each agent</li>
				<li><strong>Async workflow</strong> - Assign work and come back when complete</li>
			</ul>

			<h3>Agent mode best practices</h3>
			<ol class="numbered-list">
				<li>
					<strong>Start with a clear goal</strong>
					<p>"Add user authentication with email/password login, session management, and protected routes"</p>
				</li>
				<li>
					<strong>Provide constraints</strong>
					<p>"Use the existing database schema, don't install new dependencies unless necessary"</p>
				</li>
				<li>
					<strong>Work on a branch</strong>
					<p>Agent makes many changes quickly. A dedicated branch lets you review and revert easily.</p>
				</li>
				<li>
					<strong>Monitor progress</strong>
					<p>Watch the terminal output. If Agent seems stuck or doing something wrong, interrupt early.</p>
				</li>
			</ol>
		</section>

		<!-- Inline Edit -->
		<section id="inline-edit" class="article-section">
			<h2>Inline Edit (Cmd+K): Quick Edits</h2>
			<p>
				Inline edit is the fastest way to make small, targeted changes. Select some code, press
				<kbd>Cmd+K</kbd>, describe your change, and Cursor rewrites the selection in place.
				No separate panel, no context switching.
			</p>
			<p>
				You can also use Cmd+K without a selection to generate code at your cursor position.
				This is useful for quickly generating a function, adding a code block, or filling in
				implementation details.
			</p>

			<h3>Inline edit examples</h3>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Cmd+K Examples</span>
				</div>
				<pre><code>// Select a function, Cmd+K:
"Add error handling with try/catch"
"Convert to async/await"
"Add TypeScript types"
"Make this more performant"

// Cursor on empty line, Cmd+K:
"Write a function to validate email"
"Create a React component for user cards"
"Add a test for the above function"

// Select variable, Cmd+K:
"Rename to camelCase"
"Convert to const with destructuring"</code></pre>
			</div>

			<h3>When to use Cmd+K vs Composer</h3>
			<p>
				Use Cmd+K for quick, localized changes - a single function, a few lines, a quick refactor.
				Use Composer when changes span multiple files or require more complex coordination.
				The mental model: Cmd+K is a surgical tool, Composer is for construction projects.
			</p>
		</section>

		<!-- .cursorrules -->
		<section id="cursorrules" class="article-section">
			<h2>.cursorrules: Project Context That Persists</h2>
			<p>
				A <code>.cursorrules</code> file in your project root gives Cursor persistent context about
				your codebase. Instead of repeating the same instructions in every prompt, define them once
				and Cursor applies them to all AI interactions in that project.
			</p>
			<p>
				Think of .cursorrules as a system prompt for your project. It can include coding standards,
				architectural decisions, common patterns, and things to avoid.
			</p>

			<h3>Example .cursorrules file</h3>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">.cursorrules</span>
				</div>
				<pre><code># Project: E-commerce Platform

## Tech Stack
- Next.js 14 with App Router
- TypeScript strict mode
- Tailwind CSS for styling
- Prisma with PostgreSQL
- NextAuth for authentication

## Coding Standards
- Use functional components with hooks
- Prefer named exports over default exports
- Use async/await, never .then() chains
- Add TypeScript types to all functions
- Error handling: always use try/catch with specific error types

## File Organization
- Components in /components with index.ts barrel exports
- API routes in /app/api following REST conventions
- Database queries in /lib/db with Prisma

## Security Requirements
- Always use parameterized queries (never template literals for SQL)
- Validate all user input with zod
- Check authentication and authorization on all API routes
- Never expose sensitive data in client components

## Things to Avoid
- Don't use 'any' type
- Don't install new dependencies without asking
- Don't use inline styles, use Tailwind
- Don't create new folders without following existing structure</code></pre>
			</div>

			<h3>The new .cursor/rules folder</h3>
			<p>
				Cursor now supports a <code>.cursor/</code> folder with modular rule files using the
				<code>.mdc</code> extension. This allows for better organization:
			</p>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Folder Structure</span>
				</div>
				<pre><code>.cursor/
├── rules/
│   ├── general.mdc      # Project-wide rules
│   ├── frontend.mdc     # React/UI rules
│   ├── backend.mdc      # API/database rules
│   └── testing.mdc      # Test patterns
└── settings.json        # Cursor-specific settings</code></pre>
			</div>

			<h3>Finding good .cursorrules</h3>
			<p>
				You do not need to write rules from scratch. The community has created extensive collections:
			</p>
			<ul>
				<li><a href="https://cursor.directory/" target="_blank" rel="noopener">cursor.directory</a> - Searchable database of rules for every framework and language</li>
				<li><a href="https://github.com/PatrickJS/awesome-cursorrules" target="_blank" rel="noopener">awesome-cursorrules</a> - Curated GitHub collection with quality examples</li>
				<li>Our guide: <a href="/kb/prompts/awesome-cursor-rules/">Awesome Cursor Rules: A Curated Collection</a></li>
			</ul>

			<div class="callout callout-tip">
				<strong>Tip:</strong> Start with a rules file from cursor.directory for your stack, then
				customize based on your team's conventions. A good .cursorrules file saves hours of repeated
				instructions.
			</div>
		</section>

		<!-- MCP Servers -->
		<section id="mcp-servers" class="article-section">
			<h2>MCP Servers: Extending Cursor's Capabilities</h2>
			<p>
				Model Context Protocol (MCP) is an open standard that lets AI tools connect to external
				services. In Cursor, MCP servers extend what AI can access - databases, APIs, file systems,
				browsers, and more.
			</p>
			<p>
				MCP was developed by Anthropic and adopted by Cursor, Claude Code, and other tools. It
				provides a standard way for AI to safely interact with external systems without giving
				unrestricted access.
			</p>

			<h3>Setting up MCP servers</h3>
			<ol class="numbered-list">
				<li>
					<strong>Open Cursor Settings</strong>
					<p>Go to Cursor Settings > Features > MCP Servers</p>
				</li>
				<li>
					<strong>Add a server configuration</strong>
					<p>Click "Add New MCP Server" and configure the server command and arguments</p>
				</li>
				<li>
					<strong>Test the connection</strong>
					<p>Cursor shows server status. Green means connected and ready.</p>
				</li>
			</ol>

			<h3>Popular MCP servers</h3>
			<ul>
				<li><strong>Filesystem</strong> - Extended file operations beyond your project</li>
				<li><strong>PostgreSQL/MySQL</strong> - Direct database access and queries</li>
				<li><strong>GitHub</strong> - Create issues, PRs, read repositories</li>
				<li><strong>Slack</strong> - Send messages and read channels</li>
				<li><strong>Browser</strong> - Web browsing and scraping</li>
				<li><strong>Puppeteer</strong> - Browser automation for testing</li>
			</ul>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">MCP Configuration Example</span>
				</div>
				<pre><code>// In Cursor settings or .cursor/mcp.json
&#123;
  "mcpServers": &#123;
    "filesystem": &#123;
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    &#125;,
    "github": &#123;
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": &#123;
        "GITHUB_TOKEN": "your-github-token"
      &#125;
    &#125;
  &#125;
&#125;</code></pre>
			</div>

			<p>
				For more on MCP, see the <a href="https://github.com/modelcontextprotocol/servers" target="_blank" rel="noopener">official MCP servers repository</a> with implementations and documentation.
			</p>
		</section>

		<!-- Keyboard Shortcuts -->
		<section id="keyboard-shortcuts" class="article-section">
			<h2>Keyboard Shortcuts: Speed Up Your Workflow</h2>
			<p>
				Mastering shortcuts is the difference between a casual user and a power user. Cursor inherits
				all VS Code shortcuts and adds AI-specific ones. Here are the essential Cursor shortcuts:
			</p>

			<div class="shortcuts-grid">
				{#each shortcuts as shortcut}
					<div class="shortcut-item">
						<kbd class="shortcut-key">{shortcut.keys}</kbd>
						<div class="shortcut-info">
							<strong>{shortcut.action}</strong>
							<span>{shortcut.description}</span>
						</div>
					</div>
				{/each}
			</div>

			<h3>The "power user" shortcut flow</h3>
			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Efficient Workflow</span>
				</div>
				<pre><code>1. Navigate to file:           Cmd+P (quick open)
2. Find in file:               Cmd+F
3. Select code:                Shift+Arrow or Cmd+Shift+L (select line)
4. Quick edit:                 Cmd+K (inline edit)
5. Multi-file change:          Cmd+I (Composer)
6. Ask question:               Cmd+L (Chat)
7. Add context:                Cmd+Shift+L (add selection to chat)
8. Accept suggestion:          Tab
9. Accept word:                Cmd+Right
10. Navigate back:             Cmd+Alt+Left

Combine for speed:
Select → Cmd+Shift+L → Ask question → Apply fix → Tab → Done</code></pre>
			</div>
		</section>

		<!-- Models & Pricing -->
		<section id="models" class="article-section">
			<h2>Models and Pricing</h2>
			<p>
				Cursor supports multiple AI models from different providers, and you can switch models
				per-request. Premium models count against your monthly quota, while the built-in cursor
				models are optimized for speed and cost.
			</p>

			<h3>Available models</h3>
			<p>Cursor offers models from multiple providers:</p>
			<ul>
				<li><strong>Anthropic Claude models</strong> - Generally the default and best for most coding tasks</li>
				<li><strong>OpenAI GPT models</strong> - Good alternative when you need different reasoning patterns</li>
				<li><strong>OpenAI o1 models</strong> - Chain-of-thought reasoning for complex problems, slower but powerful</li>
				<li><strong>Google Gemini models</strong> - Additional option with different strengths</li>
				<li><strong>cursor-small</strong> - Cursor's own fast model optimized for Tab autocomplete</li>
			</ul>
			<p>
				Model availability and versions change frequently. Check
				<a href="https://docs.cursor.com/settings/models" target="_blank" rel="noopener">Cursor's model documentation</a>
				for the current list of available models and their capabilities.
			</p>

			<h3>Pricing overview</h3>
			<p>
				Cursor offers a free tier and three paid plans. The <strong>Hobby tier is free</strong> with
				2,000 completions/month and 50 slow premium requests - enough to try it out. <strong>Pro
				at $20/month</strong> is the sweet spot for most developers, with unlimited completions and
				500 fast premium requests.
			</p>
			<p>
				Power users can upgrade to <strong>Pro+ at $60/month</strong> for unlimited fast requests
				and Background Agents, or <strong>Ultra at $200/month</strong> for heavy enterprise use with
				o1-pro access. Teams pricing starts at $40/user/month with centralized billing and admin
				controls.
			</p>
			<p>
				Check <a href="https://cursor.com/pricing" target="_blank" rel="noopener">cursor.com/pricing</a> for current pricing and feature details.
			</p>
		</section>

		<!-- Advanced Tips -->
		<section id="advanced-tips" class="article-section">
			<h2>Advanced Tips for Power Users</h2>
			<p>
				Once you are comfortable with the basics, these advanced techniques will take your Cursor
				workflow to the next level.
			</p>

			<h3>1. Use @Codebase strategically</h3>
			<p>
				The @Codebase reference does a semantic search across your entire project. Use it to find
				related code, understand patterns, and ensure consistency. But use sparingly - it consumes
				more tokens and is slower than specific @Files references.
			</p>

			<h3>2. Create custom documentation indexes</h3>
			<p>
				In Cursor Settings > Features > Docs, you can add custom documentation URLs. Cursor indexes
				these and makes them available via @Docs. Add your framework's docs, internal wikis, or API
				references.
			</p>

			<h3>3. Chain Composer tasks</h3>
			<p>
				Instead of one massive prompt, break work into steps. First: "Create the data model."
				Review and accept. Then: "Add API routes for CRUD operations." Review. Then: "Add the
				frontend components." This gives you control points and better results.
			</p>

			<h3>4. Use Notepads for context</h3>
			<p>
				Cursor Notepads are scratchpads that persist across sessions. Use them to store:
			</p>
			<ul>
				<li>Architecture decisions and rationale</li>
				<li>API documentation for external services</li>
				<li>Code snippets you reference often</li>
				<li>Meeting notes and requirements</li>
			</ul>
			<p>Reference notepads in Chat with @Notepads.</p>

			<h3>5. Debug with the terminal</h3>
			<p>
				When Agent mode runs commands, watch the terminal output carefully. If you see errors,
				you can often catch problems before Agent starts fixing the wrong thing. Sometimes
				interrupting early and refining your prompt is faster than letting Agent struggle.
			</p>

			<h3>6. Leverage git branches</h3>
			<p>
				For any significant Agent task, create a branch first. Agent makes many changes quickly,
				and having a clean branch means you can easily diff, review, and revert if needed.
			</p>

			<h3>7. Combine with Claude Code</h3>
			<p>
				Some developers use Cursor for visual editing and Claude Code (terminal-based) for
				complex refactoring or when they need more control. The tools complement each other -
				Claude Code has unlimited context and better file handling for large changes.
			</p>
		</section>

		<!-- YouTube Tutorials -->
		<section id="youtube-tutorials" class="article-section">
			<h2>Video Tutorials</h2>
			<p>
				Sometimes watching someone use Cursor is more helpful than reading about it. These YouTube
				tutorials cover everything from getting started to advanced workflows.
			</p>

			<div class="tutorials-grid">
				{#each tutorials as tutorial}
					<a href={tutorial.url} target="_blank" rel="noopener" class="card card-interactive tutorial-card">
						<div class="tutorial-meta">
							<span class="tutorial-duration">{tutorial.duration}</span>
							<span class="tutorial-author">{tutorial.author}</span>
						</div>
						<h4>{tutorial.title}</h4>
						<p>{tutorial.description}</p>
					</a>
				{/each}
			</div>

			<div class="callout callout-tip">
				<strong>Recommended learning path:</strong> Start with Lee Robinson's 50-minute tutorial for
				a complete overview, then watch Nat Eliason's full-stack build for practical application.
				Come back to the Fireship comparison and Agent deep-dive as you advance.
			</div>
		</section>

		<!-- Resources -->
		<section id="resources" class="article-section">
			<h2>Resources</h2>
			<p>
				Bookmark these resources for when you need help, inspiration, or the latest updates.
			</p>

			<div class="resources-grid">
				{#each resources as resource}
					<a href={resource.url} target="_blank" rel="noopener" class="card card-interactive resource-item">
						<strong>{resource.name}</strong>
						<span class="resource-url">{resource.url}</span>
						<p>{resource.description}</p>
					</a>
				{/each}
			</div>

			<h3>Security considerations</h3>
			<p>
				Like all AI coding tools, Cursor can generate code with security vulnerabilities. We maintain
				a dedicated guide on <a href="/kb/vibe-coding-tools/cursor-security/">Cursor Security Patterns</a>
				covering common issues like SQL injection, missing authentication, and hardcoded secrets.
			</p>
		</section>

		<!-- vs Alternatives -->
		<section id="vs-alternatives" class="article-section">
			<h2>Cursor vs Alternatives</h2>
			<p>
				Cursor is not the only AI coding tool. Here is how it compares to the main alternatives:
			</p>

			<div class="comparison-cards">
				{#each comparisons as tool}
					<a href={tool.href} class="card card-interactive comparison-link">
						<h4>Cursor vs {tool.name}</h4>
						<p>{tool.summary}</p>
						<span class="read-more">Read full comparison →</span>
					</a>
				{/each}
			</div>

			<h3>Quick comparison summary</h3>
			<div class="comparison-stack">
				{#each toolComparison as row}
					<div class="comparison-row">
						<div class="comparison-label">{row.feature}</div>
						<div class="comparison-values triple">
							<div class="comparison-cell" class:highlight-win={row.cursorWin}>
								<span class="cell-tool">Cursor</span>
								<span class="cell-value">{row.cursor}</span>
							</div>
							<div class="comparison-cell" class:highlight-win={row.copilotWin}>
								<span class="cell-tool">Copilot</span>
								<span class="cell-value">{row.copilot}</span>
							</div>
							<div class="comparison-cell" class:highlight-win={row.claudeWin}>
								<span class="cell-tool">Claude Code</span>
								<span class="cell-value">{row.claudeCode}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- FAQ -->
		<section id="faq" class="article-section">
			<h2>Frequently Asked Questions</h2>
			<div class="faq-list">
				{#each faqs as faq}
					<div class="faq-item">
						<h3>{faq.question}</h3>
						<p>{faq.answer}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- CTA Box -->
		<div class="cta-box">
			<p><strong>Ready to start vibe coding with Cursor?</strong></p>
			<p class="cta-subtext">Download free at cursor.com and follow this guide to get productive fast.</p>
			<div class="cta-buttons">
				<a href="https://cursor.com" target="_blank" rel="noopener" class="btn btn-green">
					Download Cursor
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M7 17L17 7M17 7H7M17 7V17"/>
					</svg>
				</a>
				<a href="/kb/vibe-coding-tools/cursor-security/" class="btn btn-secondary">
					Security Guide
				</a>
			</div>
		</div>

		<!-- Related -->
		<section class="article-section">
			<h2>Related Content</h2>
			<div class="related-grid">
				<a href="/kb/vibe-coding-tools/cursor-security/" class="card card-interactive">
					<span class="related-card-category">Security</span>
					<h3 class="related-card-title">Cursor Security Patterns</h3>
					<p class="related-card-desc">Common vulnerabilities in Cursor-generated code and how to fix them</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor-vs-copilot/" class="card card-interactive">
					<span class="related-card-category">Comparison</span>
					<h3 class="related-card-title">Cursor vs GitHub Copilot</h3>
					<p class="related-card-desc">Detailed comparison of features, pricing, and use cases</p>
				</a>
				<a href="/kb/prompts/awesome-cursor-rules/" class="card card-interactive">
					<span class="related-card-category">Resource</span>
					<h3 class="related-card-title">Awesome Cursor Rules</h3>
					<p class="related-card-desc">Curated collection of .cursorrules files for every stack</p>
				</a>
			</div>
		</section>
	</article>
</div>

<style>
	/* Badge row */
	.badge-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.badge-featured {
		background: var(--green);
		color: var(--bg-primary);
	}

	.subtitle {
		font-size: 1.25rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin-top: 1rem;
	}

	.reading-time {
		font-size: 0.875rem;
		color: var(--text-tertiary);
		margin-top: 0.5rem;
	}

	/* Table of contents */
	.toc {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 2rem 0;
	}

	.toc-header {
		font-weight: 600;
		margin-bottom: 1rem;
		color: var(--text-primary);
	}

	.toc-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.toc-list a {
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.9rem;
	}

	.toc-list a:hover {
		color: var(--green);
	}

	/* Callout boxes */
	.callout {
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
		border-left: 3px solid;
		background: var(--bg-secondary);
	}

	.callout-info { border-color: var(--blue); }
	.callout-tip { border-color: var(--green); }
	.callout-warning { border-color: var(--orange); }

	/* Numbered list */
	.numbered-list {
		counter-reset: step;
		list-style: none;
		padding: 0;
	}

	.numbered-list li {
		position: relative;
		padding-left: 2.5rem;
		margin-bottom: 1.5rem;
	}

	.numbered-list li::before {
		counter-increment: step;
		content: counter(step);
		position: absolute;
		left: 0;
		top: 0;
		width: 1.75rem;
		height: 1.75rem;
		background: var(--bg-tertiary);
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		font-weight: 600;
	}

	.numbered-list li strong {
		display: block;
		margin-bottom: 0.25rem;
	}

	.numbered-list li p {
		margin: 0;
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	/* Mobile-friendly comparison stack */
	.comparison-stack {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1.5rem 0;
	}

	.comparison-row {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: 1rem;
		padding: 0.75rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
	}

	@media (max-width: 700px) {
		.comparison-row {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}
	}

	.comparison-label {
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.9rem;
	}

	.comparison-values {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	.comparison-values.triple {
		grid-template-columns: 1fr 1fr 1fr;
	}

	@media (max-width: 700px) {
		.comparison-values,
		.comparison-values.triple {
			grid-template-columns: 1fr;
		}
	}

	.comparison-cell {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.5rem;
		background: var(--bg-tertiary);
	}

	.comparison-cell.highlight-win {
		border-left: 2px solid var(--green-muted);
	}

	.comparison-cell.highlight-win .cell-value {
		color: var(--green-muted);
		font-weight: 500;
	}

	.cell-tool {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-tertiary);
	}

	.cell-value {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Shortcuts grid */
	.shortcuts-grid {
		display: grid;
		gap: 0.5rem;
		margin: 1.5rem 0;
	}

	.shortcut-item {
		display: flex;
		gap: 1rem;
		padding: 0.75rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		align-items: flex-start;
	}

	@media (max-width: 500px) {
		.shortcut-item {
			flex-direction: column;
			gap: 0.5rem;
		}
	}

	.shortcut-key {
		background: var(--bg-tertiary);
		border: 1px solid var(--border);
		padding: 0.3rem 0.6rem;
		font-family: monospace;
		font-size: 0.8rem;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.shortcut-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.shortcut-info strong {
		color: var(--text-primary);
	}

	.shortcut-info span {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Tutorials grid */
	.tutorials-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.tutorial-card {
		padding: 1.25rem;
	}

	.tutorial-meta {
		display: flex;
		gap: 1rem;
		font-size: 0.8rem;
		color: var(--text-tertiary);
		margin-bottom: 0.5rem;
	}

	.tutorial-duration {
		background: var(--bg-tertiary);
		padding: 0.2rem 0.5rem;
	}

	.tutorial-card h4 {
		margin: 0 0 0.5rem;
		color: var(--text-primary);
	}

	.tutorial-card p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	/* Resources grid */
	.resources-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 0.75rem;
		margin: 1.5rem 0;
	}

	.resource-item {
		padding: 1rem 1.25rem;
	}

	.resource-item strong {
		color: var(--text-primary);
		display: block;
		margin-bottom: 0.25rem;
	}

	.resource-url {
		font-size: 0.8rem;
		color: var(--green-dim);
		font-family: monospace;
	}

	.resource-item p {
		margin: 0.5rem 0 0;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	/* Comparison cards */
	.comparison-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.comparison-link {
		padding: 1.25rem;
	}

	.comparison-link h4 {
		margin: 0 0 0.5rem;
		color: var(--text-primary);
	}

	.comparison-link p {
		margin: 0 0 0.75rem;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.read-more {
		font-size: 0.875rem;
		color: var(--green-dim);
	}

	/* CTA Box */
	.cta-box {
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		padding: 2rem;
		text-align: center;
		margin: 2rem 0;
	}

	.cta-box p {
		margin: 0 0 0.5rem;
		color: var(--text-primary);
	}

	.cta-subtext {
		color: var(--text-secondary) !important;
		font-size: 0.9rem;
		margin-bottom: 1.5rem !important;
	}

	.cta-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn-secondary {
		background: var(--bg-tertiary);
		color: var(--text-primary);
		border: 1px solid var(--border);
	}

	.btn-secondary:hover {
		border-color: var(--text-secondary);
	}

	/* Related cards */
	.related-card-category {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--green-dim);
		display: block;
		margin-bottom: 0.5rem;
	}

	.related-card-title {
		font-weight: 600;
		margin: 0 0 0.5rem;
		font-size: 1rem;
	}

	.related-card-desc {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin: 0;
	}

	@media (max-width: 768px) {
		.toc-list {
			grid-template-columns: 1fr 1fr;
		}

		.cta-buttons {
			flex-direction: column;
		}
	}

	@media (max-width: 500px) {
		.toc-list {
			grid-template-columns: 1fr;
		}
	}
</style>
