<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'v0 Prompts: Best Prompts for v0.dev UI Generation (2025)',
		description: 'Get the best v0 prompts for generating secure UI components. Copy-paste prompt templates for Next.js, React, and Tailwind with built-in security patterns.',
		url: '/kb/prompts/v0-prompts/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'v0 Prompts' }
	];

	const faqs = [
		{
			question: 'What are the best prompts for v0?',
			answer: 'The best v0 prompts are specific about component structure, include security requirements, and reference shadcn/ui patterns. Start with "Create a [component] using shadcn/ui with [specific features]". Add security context like "with server-side validation" to avoid common vulnerabilities in generated code.'
		},
		{
			question: 'How do I write good v0 prompts?',
			answer: 'Be specific about what you want: component type, styling framework, data handling, and security requirements. Include constraints like "use Server Actions" or "validate with Zod". Reference existing components with @-mentions. Avoid vague prompts like "make a login page" - instead specify auth provider, validation, and error handling.'
		},
		{
			question: 'Can v0 generate secure code?',
			answer: 'v0 can generate more secure code with the right prompts. Explicitly request server-side validation, environment variables for secrets, and auth checks. However, always review generated code - v0 optimizes for working UI, not hardened security. Common issues include NEXT_PUBLIC_ secret exposure and missing server validation.'
		},
		{
			question: 'What should I include in v0 prompts?',
			answer: 'Include: component purpose, UI framework (shadcn/ui, Tailwind), data requirements, security needs (validation, auth), error states, loading states, and mobile responsiveness. The more specific your prompt, the better the output. Security requirements are especially important since v0 defaults to client-side patterns.'
		},
		{
			question: 'How do I get v0 to use Server Actions?',
			answer: 'Explicitly request Server Actions in your prompt: "Create a form that submits via Server Action with Zod validation". v0 often defaults to client-side fetch. Specify "use server directive" and "validate on server" to get server-first patterns. Review generated code to ensure the "use server" directive is present.'
		},
		{
			question: 'Why does v0 expose my API keys?',
			answer: 'v0 often uses NEXT_PUBLIC_ prefix for environment variables to make code work in client components quickly. This exposes secrets to the browser. Always specify in prompts: "use server-side environment variables, not NEXT_PUBLIC_". Review generated code for any NEXT_PUBLIC_ variables containing sensitive keys.'
		},
		{
			question: 'Can I use v0 prompts in other AI tools?',
			answer: 'v0 prompts are optimized for v0.dev but work in other tools with modifications. v0-specific features like shadcn/ui component references and Vercel deployment context may need adjustment. The security-focused parts of prompts (validation, auth patterns) translate well to Cursor, Claude Code, and Bolt.'
		}
	];

	const promptTemplates = [
		{
			name: 'Secure Form with Server Action',
			category: 'Forms',
			description: 'Contact form with server-side validation and CSRF protection',
			prompt: `Create a contact form component with:

UI:
- shadcn/ui form components (Input, Textarea, Button)
- Loading state on submit button
- Error messages below each field
- Success toast on completion
- Mobile-responsive layout

Security:
- Server Action for form submission (use server directive)
- Zod validation on server (not client-only)
- Rate limiting placeholder comment
- No console.log of user data
- Sanitize inputs before display

Fields: name, email, message
Include TypeScript types for form data.`
		},
		{
			name: 'Auth-Protected Dashboard',
			category: 'Pages',
			description: 'Dashboard with session check and protected data fetching',
			prompt: `Create a dashboard page component with:

Auth:
- Check session at top of Server Component
- Redirect to /login if not authenticated
- Use auth() from your auth library pattern

Data:
- Fetch user data server-side only
- Never expose user IDs in client bundle
- Show loading skeleton while data loads

UI:
- Stats cards row (4 metrics)
- Recent activity list
- shadcn/ui components throughout
- Responsive grid layout

Security:
- No client-side data fetching for sensitive data
- Server Component by default
- Use session.user.id, not URL params for user lookup`
		},
		{
			name: 'Secure File Upload',
			category: 'Forms',
			description: 'File upload with type validation and size limits',
			prompt: `Create a file upload component with:

Validation:
- Accept only images (jpg, png, webp)
- Max file size 5MB
- Validate MIME type on server, not just extension
- Reject files with suspicious names

Upload:
- Server Action for upload handling
- Show upload progress
- Preview uploaded image
- Delete/replace option

Security:
- Never trust client-side file type
- Generate random filename on server
- Store outside public directory
- Return signed URL for display

UI:
- Drag and drop zone
- shadcn/ui styling
- Error states for invalid files
- Mobile-friendly touch targets`
		},
		{
			name: 'Data Table with Pagination',
			category: 'Components',
			description: 'Server-side paginated table with search',
			prompt: `Create a data table component with:

Data Handling:
- Server-side pagination (not client filtering)
- URL-based page state (searchParams)
- Server Component data fetching
- Never send full dataset to client

Features:
- Search with debounced input
- Sortable columns (server-side)
- Page size selector (10, 20, 50)
- Loading states between pages

Security:
- Validate page/limit params on server
- Sanitize search input before query
- Limit maximum page size to 100
- No SQL injection in sort column

UI:
- shadcn/ui Table components
- Pagination controls
- Empty state
- Responsive with horizontal scroll on mobile`
		},
		{
			name: 'Environment-Safe API Integration',
			category: 'Integration',
			description: 'Third-party API call with proper secret handling',
			prompt: `Create a component that fetches data from an external API:

API Setup:
- API key in server-side env var (NOT NEXT_PUBLIC_)
- Fetch in Server Component or Route Handler
- Never expose API key to client bundle

Error Handling:
- Handle API rate limits gracefully
- Show user-friendly error messages
- Log errors server-side only (no stack traces to client)
- Retry logic with exponential backoff

Caching:
- Use Next.js fetch caching appropriately
- Revalidate on reasonable interval
- Show stale data while revalidating

UI:
- Loading skeleton matching data shape
- Error state with retry button
- shadcn/ui card for data display`
		}
	];

	const securityPromptAddons = [
		{
			issue: 'NEXT_PUBLIC_ Exposure',
			addon: 'Use server-side environment variables only. Never prefix sensitive keys with NEXT_PUBLIC_.',
			why: 'v0 defaults to client-accessible env vars for quick demos'
		},
		{
			issue: 'Missing Server Validation',
			addon: 'Validate all inputs on the server with Zod. Client validation is for UX only, not security.',
			why: 'v0 often generates client-side validation only'
		},
		{
			issue: 'Unprotected Server Actions',
			addon: 'Check authentication at the start of every Server Action before processing.',
			why: 'v0 generates Server Actions without auth checks'
		},
		{
			issue: 'Client Data Fetching',
			addon: 'Fetch sensitive data in Server Components only. Use useEffect for non-sensitive data only.',
			why: 'v0 defaults to client-side fetch patterns'
		},
		{
			issue: 'Debug Logging',
			addon: 'Remove all console.log statements. Never log user data or errors with stack traces.',
			why: 'v0 includes debug logs that may expose data in production'
		}
	];

	const promptPatterns = [
		{
			pattern: 'Be Specific About Stack',
			bad: 'Create a login form',
			good: 'Create a login form using shadcn/ui, react-hook-form, and Zod validation with Server Action submission',
			why: 'Vague prompts get generic, often insecure output'
		},
		{
			pattern: 'Request Security Explicitly',
			bad: 'Add authentication',
			good: 'Check auth() session at component top, redirect to /login if null, never trust client-side auth state',
			why: 'v0 won\'t add security unless you ask'
		},
		{
			pattern: 'Specify Server vs Client',
			bad: 'Fetch user data',
			good: 'Fetch user data in Server Component using session.user.id, never expose userId in client bundle',
			why: 'v0 defaults to client patterns that expose data'
		},
		{
			pattern: 'Include Error States',
			bad: 'Add form validation',
			good: 'Add Zod validation with field-level errors, form-level error banner, and loading state on submit',
			why: 'Complete specs get complete implementations'
		}
	];

	let copied = $state(false);
	let copiedSection = $state('');

	function copyCode(code: string, section: string) {
		navigator.clipboard.writeText(code);
		copied = true;
		copiedSection = section;
		setTimeout(() => {
			copied = false;
			copiedSection = '';
		}, 2000);
	}
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={meta.url} />
	<meta property="og:type" content="article" />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{"@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb"},
			{"@type": "ListItem", "position": 2, "name": "Prompts", "item": "https://vibeship.co/kb/prompts"},
			{"@type": "ListItem", "position": 3, "name": "v0 Prompts"}
		]
	}
	</script>`}

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": "${meta.title}",
		"description": "${meta.description}",
		"author": { "@type": "Organization", "name": "Vibeship" },
		"publisher": { "@type": "Organization", "name": "Vibeship" },
		"datePublished": "2025-12-20",
		"dateModified": "2025-12-20"
	}
	</script>`}

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": ${JSON.stringify(faqs.map(faq => ({
			"@type": "Question",
			"name": faq.question,
			"acceptedAnswer": { "@type": "Answer", "text": faq.answer }
		})))}
	}
	</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-green">Prompts Guide</span>
				<span class="badge">v0</span>
				<span class="badge">UI Generation</span>
			</div>
			<h1>v0 Prompts: Write Better Prompts for Secure UI</h1>
			<p class="text-secondary">Generate beautiful components that don't ship with security holes</p>
		</header>

		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>The best v0 prompts are specific about security, not just UI.</strong>
				v0 generates stunning components but often exposes secrets via NEXT_PUBLIC_ and skips server validation. Add security requirements to every prompt: "use Server Actions", "validate with Zod on server", "no NEXT_PUBLIC_ for API keys". Copy the templates below to get secure components from the start.
			</p>
		</div>

		<section>
			<h2>Why v0 prompts need security context</h2>
			<p>
				<a href="/kb/vibe-coding-tools/v0/">v0</a> excels at generating beautiful UI fast. It uses shadcn/ui components, handles responsive design, and creates production-ready React code. The problem: v0 optimizes for "works in the demo," not "secure in production."
			</p>
			<p>
				According to <a href="https://vercel.com/blog/v0-vibe-coding-securely" target="_blank" rel="noopener">Vercel's own blog</a>, they've blocked over 17,000 deployments in a single month for exposed secrets. Most were NEXT_PUBLIC_ environment variables that v0 suggested. The fix isn't avoiding v0 - it's prompting it correctly.
			</p>
			<p>
				Vibe coders who add security requirements to their prompts get the same beautiful UI with safer defaults. The templates below bake in the security patterns that v0 skips.
			</p>
		</section>

		<section>
			<h2>Copy-paste v0 prompt templates</h2>
			<p>
				These prompts have been tested to generate more secure code. Each includes explicit security requirements that prevent common <a href="/kb/vibe-coding-tools/v0/">v0 security patterns</a>.
			</p>

			{#each promptTemplates as template}
				<div class="template-card">
					<div class="template-header">
						<div class="template-info">
							<span class="template-category">{template.category}</span>
							<h3>{template.name}</h3>
							<p class="text-secondary">{template.description}</p>
						</div>
						<button
							class="copy-btn"
							onclick={() => copyCode(template.prompt, template.name)}
						>
							{copied && copiedSection === template.name ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="code-block">
						<pre><code>{template.prompt}</code></pre>
					</div>
				</div>
			{/each}
		</section>

		<section>
			<h2>Security add-ons for any v0 prompt</h2>
			<p>
				Add these lines to any v0 prompt to prevent specific vulnerabilities. Each addresses a common pattern in v0-generated code.
			</p>

			<div class="addon-list">
				{#each securityPromptAddons as addon}
					<div class="addon-card">
						<div class="addon-header">
							<span class="addon-issue">{addon.issue}</span>
						</div>
						<div class="addon-content">
							<code class="addon-text">{addon.addon}</code>
							<p class="addon-why">Why: {addon.why}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<section>
			<h2>Prompt patterns that work</h2>
			<p>
				The difference between a vague prompt and a specific one is often the difference between vulnerable code and secure code.
			</p>

			<div class="patterns-list">
				{#each promptPatterns as pattern}
					<div class="pattern-card">
						<h4>{pattern.pattern}</h4>
						<div class="pattern-comparison">
							<div class="pattern-bad">
								<span class="pattern-label">Vague prompt</span>
								<code>{pattern.bad}</code>
							</div>
							<div class="pattern-good">
								<span class="pattern-label">Secure prompt</span>
								<code>{pattern.good}</code>
							</div>
						</div>
						<p class="pattern-why">{pattern.why}</p>
					</div>
				{/each}
			</div>
		</section>

		<section>
			<h2>After v0: what to check</h2>
			<p>
				Even with good prompts, review v0 output before shipping. This checklist catches what prompts miss.
			</p>

			<div class="checklist">
				<div class="check-item">
					<span class="check-icon">1</span>
					<div class="check-content">
						<strong>Search for NEXT_PUBLIC_</strong>
						<p>Any NEXT_PUBLIC_ variable with "KEY", "SECRET", or "TOKEN" is exposed to browsers. Move to server-only env vars.</p>
					</div>
				</div>
				<div class="check-item">
					<span class="check-icon">2</span>
					<div class="check-content">
						<strong>Verify "use server" directive</strong>
						<p>Server Actions need "use server" at the top. v0 sometimes forgets it, making your "server" code run on client.</p>
					</div>
				</div>
				<div class="check-item">
					<span class="check-icon">3</span>
					<div class="check-content">
						<strong>Check auth in Server Actions</strong>
						<p>Every Server Action should check auth() before doing anything. No auth check = anyone can call it.</p>
					</div>
				</div>
				<div class="check-item">
					<span class="check-icon">4</span>
					<div class="check-content">
						<strong>Find client-side fetches</strong>
						<p>useEffect + fetch for user data is usually wrong. Sensitive data should come from Server Components.</p>
					</div>
				</div>
				<div class="check-item">
					<span class="check-icon">5</span>
					<div class="check-content">
						<strong>Remove console.log</strong>
						<p>v0 adds debug logs. In production, these may expose user data or error details to attackers.</p>
					</div>
				</div>
			</div>
		</section>

		<section>
			<h2>Frequently asked questions</h2>
			<div class="faq-list">
				{#each faqs as faq}
					<div class="faq-item">
						<h3>{faq.question}</h3>
						<p>{faq.answer}</p>
					</div>
				{/each}
			</div>
		</section>

		<section>
			<h2>Related guides</h2>
			<div class="related-grid">
				<a href="/kb/vibe-coding-tools/v0/" class="card card-interactive">
					<h3>v0 Security Patterns</h3>
					<p>Deep dive into security issues in v0-generated code</p>
				</a>
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive">
					<h3>Cursor Rules Guide</h3>
					<p>Configure Cursor AI for secure code generation</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive">
					<h3>Hardcoded Secrets</h3>
					<p>Fix NEXT_PUBLIC_ exposure and other secret leaks</p>
				</a>
				<a href="/kb/prompts/bolt-prompts/" class="card card-interactive">
					<h3>Bolt Prompts</h3>
					<p>Security-focused prompts for Bolt.new</p>
				</a>
			</div>
		</section>

		<section class="cta-box">
			<h2>Scan your v0 project</h2>
			<p>Catch NEXT_PUBLIC_ exposure, missing auth, and other v0 patterns before deployment.</p>
			<a href="https://scanner.vibeship.co" class="cta-button">Scan Your Code Free</a>
		</section>
	</article>
</div>

<style>
	.article-header {
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	.badge-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.badge-green {
		background: var(--green-muted);
		color: var(--green);
	}

	.text-secondary {
		color: var(--text-secondary);
	}

	/* Template Cards */
	.template-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		margin: 1.5rem 0;
		overflow: hidden;
	}

	.template-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 1rem;
		border-bottom: 1px solid var(--border);
		gap: 1rem;
	}

	.template-info {
		flex: 1;
	}

	.template-category {
		display: inline-block;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--green);
		margin-bottom: 0.25rem;
	}

	.template-info h3 {
		margin: 0 0 0.25rem;
		font-size: 1rem;
	}

	.template-info p {
		margin: 0;
		font-size: 0.875rem;
	}

	/* copy-btn uses global styles from components.css */

	.code-block {
		background: var(--bg-primary);
	}

	.code-block pre {
		margin: 0;
		padding: 1rem;
		font-size: 0.8rem;
		line-height: 1.6;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	.code-block code {
		background: none;
		padding: 0;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	/* Addon List */
	.addon-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.addon-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--orange);
	}

	.addon-header {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border);
	}

	.addon-issue {
		font-weight: 600;
		font-size: 0.9rem;
		color: var(--orange);
	}

	.addon-content {
		padding: 1rem;
	}

	.addon-text {
		display: block;
		background: var(--bg-primary);
		padding: 0.75rem;
		font-size: 0.8rem;
		margin-bottom: 0.5rem;
		white-space: pre-wrap;
	}

	.addon-why {
		margin: 0;
		font-size: 0.8rem;
		color: var(--text-tertiary);
	}

	/* Pattern Cards */
	.patterns-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	.pattern-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem;
	}

	.pattern-card h4 {
		margin: 0 0 1rem;
		font-size: 0.95rem;
	}

	.pattern-comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	.pattern-bad, .pattern-good {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.pattern-label {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.pattern-bad .pattern-label {
		color: var(--red);
	}

	.pattern-good .pattern-label {
		color: var(--green);
	}

	.pattern-bad code, .pattern-good code {
		display: block;
		background: var(--bg-primary);
		padding: 0.5rem;
		font-size: 0.75rem;
		border-left: 2px solid;
	}

	.pattern-bad code {
		border-color: var(--red);
	}

	.pattern-good code {
		border-color: var(--green);
	}

	.pattern-why {
		margin: 0;
		font-size: 0.8rem;
		color: var(--text-tertiary);
	}

	/* Checklist */
	.checklist {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.check-item {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem;
	}

	.check-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		background: var(--green);
		color: var(--bg-primary);
		border-radius: 50%;
		font-weight: 600;
		font-size: 0.85rem;
		flex-shrink: 0;
	}

	.check-content {
		flex: 1;
	}

	.check-content strong {
		display: block;
		margin-bottom: 0.25rem;
	}

	.check-content p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Mobile */
	@media (max-width: 768px) {
		.template-header {
			flex-direction: column;
		}

		.copy-btn {
			width: 100%;
		}

		.pattern-comparison {
			grid-template-columns: 1fr;
		}

		.check-item {
			flex-direction: column;
			gap: 0.75rem;
		}
	}
</style>
