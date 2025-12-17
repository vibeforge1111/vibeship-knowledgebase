<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Next.js + Prisma Security: 5 Hidden Risks',
		description: 'Secure your Next.js + Prisma vibe coded app. Learn $queryRaw injection risks, operator injection, and connection string security. Copy-paste fixes included.',
		url: '/kb/security/stacks/nextjs-prisma/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Stacks', href: '/kb/security/stacks' },
		{ label: 'Next.js + Prisma' }
	];

	// Security patterns
	const patterns = [
		{
			name: 'The $queryRaw Confusion',
			severity: 'Critical',
			description: 'Prisma has confusingly named functions: $queryRaw with tagged templates is SAFE, but $queryRawUnsafe and Prisma.raw() with user input are DANGEROUS. AI tools often generate the unsafe patterns.',
			vulnerableCode: `// VULNERABLE: $queryRawUnsafe with string interpolation
const email = req.body.email

const users = await prisma.$queryRawUnsafe(
  \`SELECT * FROM "User" WHERE email = '\${email}'\`
)
// Attacker input: ' OR '1'='1

// ALSO VULNERABLE: Prisma.raw() defeats protection
const users = await prisma.$queryRaw\`
  SELECT * FROM "User" WHERE email = \${Prisma.raw(email)}
\``,
			secureCode: `// SAFE: Tagged template literal (auto-parameterized)
const email = req.body.email

const users = await prisma.$queryRaw\`
  SELECT * FROM "User" WHERE email = \${email}
\`
// Prisma automatically creates prepared statement

// If you MUST use $queryRawUnsafe, use placeholders:
const users = await prisma.$queryRawUnsafe(
  'SELECT * FROM "User" WHERE email = $1',
  email  // Passed as parameter, not interpolated
)`,
			link: '/kb/security/vulnerabilities/sql-injection/',
			cweLink: 'https://cwe.mitre.org/data/definitions/89.html'
		},
		{
			name: 'Operator Injection Auth Bypass',
			severity: 'Critical',
			description: 'Passing req.body directly to Prisma queries allows attackers to inject query operators. Sending password: {"not": ""} bypasses password checks because "not empty string" matches everything.',
			vulnerableCode: `// VULNERABLE: Direct object passthrough
const { email, password } = req.body

// Attacker sends: { password: { "not": "" } }
const user = await prisma.user.findFirst({
  where: { email, password }
})
// password: { not: "" } matches ANY non-empty password!

if (user) {
  // Attacker bypasses authentication!
  return signIn(user)
}`,
			secureCode: `// SECURE: Type-cast all inputs to primitives
const { email, password } = req.body

const user = await prisma.user.findFirst({
  where: {
    email: String(email),
    password: String(password)  // Rejects objects
  }
})

// BETTER: Use Zod for validation
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const validated = loginSchema.parse(req.body)
const user = await prisma.user.findFirst({
  where: validated
})`,
			link: '/kb/security/vulnerabilities/missing-auth/',
			cweLink: 'https://cwe.mitre.org/data/definitions/20.html'
		},
		{
			name: 'ORM Leak via Filter Passthrough',
			severity: 'High',
			description: 'Passing req.query or req.body filters directly to Prisma allows attackers to access related model fields. They can leak sensitive data like password reset tokens through startsWith attacks.',
			vulnerableCode: `// VULNERABLE: Direct filter passthrough
// Attacker: GET /api/posts?filter[author][resetToken][startsWith]=abc

export async function GET(req: Request) {
  const { filter } = req.query

  const posts = await prisma.post.findMany({
    where: filter  // Attacker controls ENTIRE filter!
  })
  // Can probe resetToken values through response timing
}`,
			secureCode: `// SECURE: Whitelist allowed filter fields
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title')
  const published = searchParams.get('published')

  const posts = await prisma.post.findMany({
    where: {
      ...(title && { title: { contains: String(title) } }),
      ...(published && { published: published === 'true' })
    }
  })
  // Only explicitly allowed fields can be filtered
}`,
			link: '/kb/security/vulnerabilities/idor/',
			cweLink: 'https://cwe.mitre.org/data/definitions/639.html'
		},
		{
			name: 'Database URL Exposure',
			severity: 'Critical',
			description: 'AI tools sometimes hardcode DATABASE_URL or commit .env files to git. Your database connection string contains credentials that grant full database access.',
			vulnerableCode: `// VULNERABLE: Hardcoded in source
// lib/prisma.ts
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://user:password123@db.example.com:5432/mydb'
    }
  }
})

// VULNERABLE: .env committed to git
// .env (in repo)
DATABASE_URL="postgresql://user:password123@db.example.com:5432/mydb"`,
			secureCode: `// SECURE: Use environment variables
// .env.local (gitignored - NEVER commit)
DATABASE_URL="postgresql://user:password123@db.example.com:5432/mydb"

// .gitignore
.env.local
.env*.local
.env

// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// Prisma reads DATABASE_URL from environment automatically
const prisma = new PrismaClient()

export default prisma`,
			link: '/kb/security/vulnerabilities/hardcoded-secrets/',
			cweLink: 'https://cwe.mitre.org/data/definitions/798.html'
		},
		{
			name: 'Missing Authorization in Server Actions',
			severity: 'High',
			description: 'Prisma handles query building, not access control. AI-generated Server Actions often perform database operations without checking if the user owns the resource they are modifying.',
			vulnerableCode: `// VULNERABLE: No ownership check
'use server'

export async function updatePost(postId: string, content: string) {
  // Anyone can update any post!
  await prisma.post.update({
    where: { id: postId },
    data: { content }
  })
}`,
			secureCode: `// SECURE: Always verify ownership
'use server'

import { auth } from '@/lib/auth'

export async function updatePost(postId: string, content: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Not authenticated')
  }

  // Verify user owns this post
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true }
  })

  if (post?.authorId !== session.user.id) {
    throw new Error('Not authorized')
  }

  await prisma.post.update({
    where: { id: postId },
    data: { content }
  })
}`,
			link: '/kb/security/vulnerabilities/missing-auth/',
			cweLink: 'https://cwe.mitre.org/data/definitions/862.html'
		}
	];

	// FAQ data
	const faqs = [
		{
			question: 'Is Prisma safe from SQL injection?',
			answer: 'Yes, when used correctly. Prisma\'s standard query methods (findMany, create, update) use parameterized queries. The danger is in $queryRawUnsafe, $executeRawUnsafe, and using Prisma.raw() with user input. According to OWASP, ORMs shift SQL injection risk but don\'t eliminate it entirely.'
		},
		{
			question: 'What is the difference between $queryRaw and $queryRawUnsafe?',
			answer: '$queryRaw with tagged templates automatically creates prepared statements - it\'s safe. $queryRawUnsafe takes a plain string and does NO escaping - you must use parameterized placeholders ($1, $2). The "Unsafe" suffix is a deliberate warning from Prisma.'
		},
		{
			question: 'How do I secure my DATABASE_URL in Next.js?',
			answer: 'Never commit DATABASE_URL to git. Use .env.local for local development (gitignored by default in Next.js). For production, set environment variables in your hosting platform (Vercel, Railway, etc.). Prisma reads DATABASE_URL automatically - no need to pass it explicitly.'
		},
		{
			question: 'Can Prisma be hacked?',
			answer: 'Prisma itself is secure, but misuse creates vulnerabilities. The main risks are: $queryRawUnsafe with string interpolation, operator injection via object inputs, passing req.body directly to queries, and exposed DATABASE_URL. All are preventable with proper coding patterns.'
		},
		{
			question: 'Should I use raw SQL queries with Prisma?',
			answer: 'Only when necessary - for complex queries, database-specific features, or performance optimization. When you do, use $queryRaw with tagged templates (safe) not $queryRawUnsafe with string interpolation (dangerous). Never use Prisma.raw() with user-controlled values.'
		}
	];

	// AI Fix Prompt
	const aiFixPrompt = `Review my Next.js + Prisma codebase for these security issues and fix them:

## 1. Raw Query Audit
Search for dangerous patterns:
- \`$queryRawUnsafe\` - should use parameterized placeholders ($1, $2), never string interpolation
- \`$executeRawUnsafe\` - same as above
- \`Prisma.raw(\` with variables - should only contain hardcoded values, never user input

## 2. Operator Injection Check
Find patterns where req.body or req.query is passed directly to Prisma:
- \`prisma.*.findFirst({ where: req.body })\`
- \`prisma.*.findMany({ where: filter })\` where filter comes from request
- \`prisma.*.updateMany({ where: { ...req.body } })\`

Fix by type-casting: \`String(input)\`, \`Number(input)\`, or use Zod validation.

## 3. Database URL Security
- Search for \`DATABASE_URL\` or \`postgresql://\` in any .ts, .js, or .env file that's committed
- Verify .env, .env.local, .env*.local are in .gitignore
- Check no datasources.db.url is hardcoded in prisma.ts

## 4. Server Action Authorization
For each file with \`'use server'\`:
- Verify authentication check: \`auth()\`, \`getServerSession()\`, or similar
- Verify ownership check before update/delete operations
- Check that postId, userId, etc. are validated against current user

## 5. Input Validation
Add Zod schemas for all Prisma query inputs:
\`\`\`typescript
import { z } from 'zod'
const schema = z.object({ id: z.string().uuid() })
const validated = schema.parse(input)
\`\`\`

After fixing, run these verification commands:
\`\`\`bash
grep -r "queryRawUnsafe" --include="*.ts" --include="*.js"
grep -r "Prisma.raw" --include="*.ts" --include="*.js"
grep -r "DATABASE_URL" --include="*.ts" --include="*.js"
\`\`\`

List all files you modified with before/after snippets.`;

	// Checklist items
	const checklistItems = [
		{ category: 'Raw Queries', item: 'No $queryRawUnsafe with string interpolation', critical: true },
		{ category: 'Raw Queries', item: 'No Prisma.raw() with user input', critical: true },
		{ category: 'Raw Queries', item: '$queryRaw uses tagged templates only', critical: false },
		{ category: 'Inputs', item: 'All findFirst/findMany inputs type-cast or validated', critical: true },
		{ category: 'Inputs', item: 'No req.body passed directly to where clauses', critical: true },
		{ category: 'Inputs', item: 'Zod schemas for all user inputs', critical: false },
		{ category: 'Secrets', item: 'DATABASE_URL not in committed files', critical: true },
		{ category: 'Secrets', item: '.env files in .gitignore', critical: true },
		{ category: 'Auth', item: 'Server Actions check authentication', critical: true },
		{ category: 'Auth', item: 'Update/delete operations verify ownership', critical: true }
	];

	let copied = $state(false);
	let copiedIndex = $state(-1);
	let promptCopied = $state(false);

	function copyCode(code: string, index: number) {
		navigator.clipboard.writeText(code);
		copied = true;
		copiedIndex = index;
		setTimeout(() => {
			copied = false;
			copiedIndex = -1;
		}, 2000);
	}

	function copyPrompt() {
		navigator.clipboard.writeText(aiFixPrompt);
		promptCopied = true;
		setTimeout(() => {
			promptCopied = false;
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

	<!-- Schema.org structured data -->
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
		"datePublished": "2025-12-17",
		"dateModified": "2025-12-17"
	}
	</script>`}

	<!-- FAQ Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": ${JSON.stringify(faqs.map(faq => ({
			"@type": "Question",
			"name": faq.question,
			"acceptedAnswer": {
				"@type": "Answer",
				"text": faq.answer
			}
		})))}
	}
	</script>`}

	<!-- Breadcrumb Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{ "@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb" },
			{ "@type": "ListItem", "position": 2, "name": "Security", "item": "https://vibeship.co/kb/security" },
			{ "@type": "ListItem", "position": 3, "name": "Stacks", "item": "https://vibeship.co/kb/security/stacks" },
			{ "@type": "ListItem", "position": 4, "name": "Next.js + Prisma" }
		]
	}
	</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<!-- Header -->
		<header class="article-header">
			<div class="badge-row">
				<span class="badge">Stack Guide</span>
				<span class="badge">Next.js</span>
				<span class="badge">Prisma</span>
			</div>
			<h1>Next.js + Prisma Security</h1>
			<p class="text-secondary">5 hidden security risks in the popular type-safe stack</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Prisma is type-safe by default, but has hidden risks: <code>$queryRawUnsafe</code> enables <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a>, operator injection bypasses auth in <code>findMany</code> queries, and passing <code>req.body</code> directly to queries leaks data.</strong>
				AI tools often generate these patterns. Use tagged templates and type-cast all inputs.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">Type-Safe</div>
				<div class="stat-label">By Default</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">5</div>
				<div class="stat-label">Hidden Risks</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">#1 ORM</div>
				<div class="stat-label">TypeScript</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Copy-Paste</div>
				<div class="stat-label">Fixes Included</div>
			</div>
		</div>

		<!-- Why Prisma Security Matters -->
		<section class="article-section">
			<h2>Why does Prisma security matter?</h2>
			<p>
				Prisma is the most popular ORM for Next.js and TypeScript projects. AI tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/bolt/">Bolt</a>, and <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> love generating Prisma code because it's type-safe and produces clean, readable queries.
			</p>
			<p>
				But type safety creates a <strong>false sense of security</strong>. TypeScript types are compile-time checks - they don't protect you at runtime. According to <a href="https://cwe.mitre.org/data/definitions/564.html" target="_blank" rel="noopener">CWE-564</a>, ORMs shift SQL injection risk but don't eliminate it. The attack surface moves from raw SQL to ORM-specific vulnerabilities.
			</p>
			<p>
				For vibe coders, this is especially dangerous because vibe coded apps look safe (type errors would show in the IDE), but the runtime vulnerabilities remain invisible until exploited.
			</p>
		</section>

		<!-- What Makes Prisma Different -->
		<section class="article-section">
			<h2>What makes Prisma different from raw SQL?</h2>
			<p>
				Think of Prisma as a translator between your TypeScript code and SQL. Most of the time, this translator is safe - it automatically uses parameterized queries. But you can force it to say dangerous things.
			</p>
			<p>
				Prisma has two main attack surfaces that vibe coded apps need to watch for:
			</p>
			<ul>
				<li><strong>Raw query dangers:</strong> <code>$queryRawUnsafe</code> and <code>Prisma.raw()</code> bypass Prisma's safety mechanisms</li>
				<li><strong>Operator injection:</strong> Passing objects instead of primitives to queries allows attackers to inject query operators</li>
			</ul>
			<p>
				According to the <a href="https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html" target="_blank" rel="noopener">OWASP SQL Injection Prevention Cheat Sheet</a>, parameterized queries are the primary defense. Prisma does this automatically - unless you opt out with unsafe functions.
			</p>
		</section>

		<!-- Security Patterns -->
		<section class="article-section">
			<h2>What are the 5 hidden security risks?</h2>
			<p>These patterns are commonly generated by AI tools in vibe coded Next.js + Prisma apps:</p>

			{#each patterns as pattern, i}
				<div class="pattern-card">
					<div class="pattern-header">
						<h3>{pattern.name}</h3>
						<span class="badge badge-{pattern.severity.toLowerCase()}">{pattern.severity}</span>
					</div>
					<p class="pattern-description">
						{pattern.description}
						Reference: <a href={pattern.cweLink} target="_blank" rel="noopener">{pattern.cweLink.match(/(\d+)\.html/)?.[1] ? `CWE-${pattern.cweLink.match(/(\d+)\.html/)[1]}` : 'CWE'}</a>
					</p>

					<div class="code-comparison">
						<div class="code-block vulnerable">
							<div class="code-block-header">
								<span class="code-block-lang status-bad">VULNERABLE</span>
							</div>
							<pre><code>{pattern.vulnerableCode}</code></pre>
						</div>

						<div class="code-block secure">
							<div class="code-block-header">
								<span class="code-block-lang status-good">SECURE</span>
								<button class="copy-btn small" onclick={() => copyCode(pattern.secureCode, i)}>
									{copied && copiedIndex === i ? 'Copied!' : 'Copy'}
								</button>
							</div>
							<pre><code>{pattern.secureCode}</code></pre>
						</div>
					</div>

					<a href={pattern.link} class="pattern-link">
						Learn more about this vulnerability
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M5 12h14M12 5l7 7-7 7"/>
						</svg>
					</a>
				</div>
			{/each}
		</section>

		<!-- AI Fix Prompt -->
		<section class="article-section">
			<h2>AI fix prompt for Next.js + Prisma security</h2>
			<p>Copy this prompt and paste it into <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, or <a href="/kb/vibe-coding-tools/bolt/">Bolt</a> to automatically find and fix security vulnerabilities in your vibe coded project:</p>

			<div class="prompt-box">
				<div class="prompt-header">
					<span class="prompt-label">AI Security Fix Prompt</span>
					<button class="copy-btn" onclick={copyPrompt}>
						{promptCopied ? 'Copied!' : 'Copy prompt'}
					</button>
				</div>
				<pre class="prompt-content">{aiFixPrompt}</pre>
			</div>

			<p class="prompt-note">
				For more context on raw query security, see the <a href="https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries" target="_blank" rel="noopener">Prisma Raw Queries Documentation</a>.
			</p>
		</section>

		<!-- Security Checklist -->
		<section class="article-section">
			<h2>5-minute Prisma security audit</h2>
			<p>Use this checklist before deploying your vibe coded Next.js + Prisma app:</p>

			<div class="checklist">
				{#each ['Raw Queries', 'Inputs', 'Secrets', 'Auth'] as category}
					<div class="checklist-category">
						<h4>{category}</h4>
						{#each checklistItems.filter(item => item.category === category) as item}
							<label class="checklist-item" class:critical={item.critical}>
								<input type="checkbox" />
								<span>{item.item}</span>
								{#if item.critical}
									<span class="critical-badge">Critical</span>
								{/if}
							</label>
						{/each}
					</div>
				{/each}
			</div>

			<p class="checklist-note">
				For automated detection, run <a href="https://scanner.vibeship.co">Vibeship Scanner</a> to catch these issues in your codebase.
			</p>
		</section>

		<!-- CTA Box -->
		<div class="cta-box">
			<p><strong>Scan your Next.js + Prisma app</strong></p>
			<p class="cta-subtext">Find raw query vulnerabilities, operator injection, and exposed secrets automatically</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green">
				Scan your code free
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>

		<!-- FAQ -->
		<section class="article-section">
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

		<!-- Related -->
		<section class="article-section">
			<h2>Related content</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">Database query manipulation attacks</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase</div>
					<p class="related-card-description">RLS and key management security</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">Database URLs and API keys in code</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor</div>
					<p class="related-card-description">Security patterns in Cursor generated code</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">Unprotected API routes and Server Actions</p>
				</a>
				<a href="/kb/security/vulnerabilities/idor/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">IDOR</div>
					<p class="related-card-description">Authorization bypass via object references</p>
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

	/* Pattern Card */
	.pattern-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.pattern-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	.pattern-header h3 {
		margin: 0;
		font-size: 1.1rem;
	}

	.pattern-description {
		color: var(--text-secondary);
		margin-bottom: 1rem;
	}

	.pattern-description a,
	.pattern-description code {
		color: var(--green-dim);
	}

	.pattern-description a:hover {
		color: var(--green);
	}

	.pattern-description code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.85em;
	}

	.pattern-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--green-dim);
		font-size: 0.875rem;
		text-decoration: none;
		margin-top: 1rem;
	}

	.pattern-link:hover {
		color: var(--green);
	}

	/* Code Comparison */
	.code-comparison {
		display: grid;
		gap: 1rem;
		margin: 1rem 0;
	}

	.code-block.vulnerable .code-block-header {
		border-left: 3px solid var(--red);
	}

	.code-block.secure .code-block-header {
		border-left: 3px solid var(--green);
	}

	.status-bad {
		color: var(--red);
	}

	.status-good {
		color: var(--green);
	}

	.copy-btn.small {
		font-size: 0.7rem;
		padding: 0.25rem 0.5rem;
	}

	/* Prompt Box */
	.prompt-box {
		background: var(--bg-tertiary);
		border: 1px solid var(--border);
		margin: 1.5rem 0;
	}

	.prompt-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border);
	}

	.prompt-label {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--green);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.prompt-content {
		padding: 1rem;
		margin: 0;
		font-size: 0.85rem;
		line-height: 1.6;
		color: var(--text-secondary);
		white-space: pre-wrap;
		font-family: 'JetBrains Mono', monospace;
		overflow-x: auto;
	}

	.prompt-note {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-top: 0.75rem;
	}

	/* Checklist */
	.checklist {
		display: grid;
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	.checklist-category h4 {
		margin: 0 0 0.75rem;
		font-size: 0.9rem;
		color: var(--text-primary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.checklist-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0;
		cursor: pointer;
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	.checklist-item input[type="checkbox"] {
		width: 1.25rem;
		height: 1.25rem;
		accent-color: var(--green);
	}

	.checklist-item span {
		flex: 1;
	}

	.critical-badge {
		font-size: 0.7rem;
		padding: 0.125rem 0.5rem;
		background: var(--red);
		color: white;
		border-radius: 0.25rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.checklist-note {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-top: 1rem;
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

	/* FAQ */
	.faq-list {
		margin-top: 1rem;
	}

	.faq-item {
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--border);
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-item h3 {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
		font-size: 1.0625rem;
		font-weight: 600;
		margin: 0 0 0.5rem;
		color: var(--text-primary);
		line-height: 1.5;
		letter-spacing: -0.01em;
	}

	.faq-item p {
		margin: 0;
		font-size: 0.9375rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	/* Severity badges */
	.badge-critical {
		background: var(--red);
		color: white;
	}

	.badge-high {
		background: var(--orange, #f97316);
		color: white;
	}

	.badge-medium {
		background: var(--yellow, #eab308);
		color: black;
	}

	@media (max-width: 768px) {
		.pattern-header {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
