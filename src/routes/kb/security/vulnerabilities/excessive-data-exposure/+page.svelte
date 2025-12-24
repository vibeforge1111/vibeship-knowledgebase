<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Excessive Data Exposure: APIs That Return Too Much | VibeShip',
		description: 'Excessive data exposure happens when APIs return full database objects including password hashes and tokens. Part of OWASP API3:2023. Learn to fix with DTOs and server-side filtering.',
		url: '/kb/security/vulnerabilities/excessive-data-exposure/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Excessive Data Exposure' }
	];

	// OWASP references
	const owaspData = {
		category: 'API3:2023',
		fullName: 'Broken Object Property Level Authorization (BOPLA)',
		legacyCategory: 'API3:2019 - Excessive Data Exposure',
		cweId: 'CWE-213',
		cweSource: 'https://cwe.mitre.org/data/definitions/213.html',
		owaspSource: 'https://owasp.org/API-Security/editions/2023/en/0xa3-broken-object-property-level-authorization/',
		legacySource: 'https://owasp.org/API-Security/editions/2019/en/0xa3-excessive-data-exposure/'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is excessive data exposure in APIs?',
			answer: 'Excessive data exposure is when your API returns full database objects with sensitive fields that the frontend doesn\'t need. Think of it like a doctor\'s office sending your entire medical file when you only asked for your address. Password hashes, tokens, and internal IDs leak through API responses. Attackers intercept these responses with browser DevTools and see everything your server sent, even if your UI only displays name and email.'
		},
		{
			question: 'How do I prevent excessive data exposure?',
			answer: 'Use server-side filtering and Data Transfer Objects (DTOs). Never send full database objects to the client. With Prisma, use the select option to specify exactly which fields to return. With Mongoose, use .select() for field projection. Create DTO functions that explicitly map internal models to public API shapes. The rule is simple: if the UI doesn\'t display it, the API shouldn\'t send it.'
		},
		{
			question: 'What is the difference between excessive data exposure and mass assignment?',
			answer: 'Excessive data exposure is about read operations - APIs returning too much data. Mass assignment is about write operations - APIs accepting too many fields from user input. Both are now part of OWASP API3:2023 BOPLA (Broken Object Property Level Authorization). Think of excessive data exposure as APIs over-sharing and mass assignment as APIs over-trusting.'
		},
		{
			question: 'What is broken object property level authorization (BOPLA)?',
			answer: 'BOPLA is the OWASP API3:2023 category that merged excessive data exposure and mass assignment. It covers both reading sensitive properties you shouldn\'t see and writing properties you shouldn\'t modify. The vulnerability is about insufficient property-level access control. Your API might check if a user can access an object, but it doesn\'t check which properties of that object they should see or modify.'
		},
		{
			question: 'How do I detect excessive data exposure in my API?',
			answer: 'Open your browser DevTools Network tab and inspect API responses. Compare what the API returns versus what your UI displays. If you see password hashes, tokens, or internal fields in the JSON response that aren\'t visible on screen, that\'s excessive data exposure. Look for res.json(user) patterns in code, Prisma queries without select, or SELECT * in raw SQL. These are the typical culprits in vibe coded apps.'
		}
	];

	let copied = $state(false);

	function copyPrompt() {
		const prompt = document.getElementById('ai-fix-prompt')?.textContent || '';
		navigator.clipboard.writeText(prompt);
		copied = true;
		setTimeout(() => copied = false, 2000);
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

	<!-- BreadcrumbList Schema -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{"@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb"},
			{"@type": "ListItem", "position": 2, "name": "Security", "item": "https://vibeship.co/kb/security"},
			{"@type": "ListItem", "position": 3, "name": "Vulnerabilities", "item": "https://vibeship.co/kb/security/vulnerabilities"},
			{"@type": "ListItem", "position": 4, "name": "Excessive Data Exposure"}
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
			"name": "VibeShip"
		},
		"publisher": {
			"@type": "Organization",
			"name": "VibeShip",
			"logo": {
				"@type": "ImageObject",
				"url": "https://vibeship.co/logo.png"
			}
		},
		"datePublished": "2025-12-25",
		"dateModified": "2025-12-25"
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
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<!-- Header -->
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-high">High</span>
				<span class="badge">{owaspData.cweId}</span>
				<span class="badge">{owaspData.category}</span>
			</div>
			<h1>Excessive Data Exposure: When Your API Overshares</h1>
			<p class="text-secondary">How vibe coded APIs leak password hashes, tokens, and sensitive fields through responses that return too much data</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Excessive data exposure happens when APIs return full database objects including sensitive fields like password hashes, tokens, and internal IDs.</strong>
				Your UI might only display name and email, but attackers who intercept responses see everything your server sent.
				Part of <a href={owaspData.owaspSource}>OWASP API3:2023 BOPLA</a>. Fix with server-side filtering and Data Transfer Objects (DTOs).
			</p>
		</div>

		<!-- Stats -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">{owaspData.category}</div>
				<div class="stat-label">OWASP API Security</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">{owaspData.cweId}</div>
				<div class="stat-label"><a href={owaspData.cweSource}>CWE Classification</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">200M+</div>
				<div class="stat-label">Users in Twitter Breach</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Sources: <a href={owaspData.owaspSource}>OWASP API Security Top 10 (2023)</a>, <a href="https://thenewstack.io/twitter-leak-shows-how-important-api-security-remains-in-2023/">Twitter API Breach (2023)</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is excessive data exposure?</h2>
			<p>
				Excessive data exposure is when your API returns more data than the client needs.
				Think of it like ordering a coffee and the barista hands you the entire inventory list along with your latte.
				You asked for one thing, but they gave you everything in the database.
			</p>
			<p>
				Here's a clearer example: You build a user profile page that displays name and email.
				Your API endpoint returns the full user object from the database - including password hash, session tokens, internal IDs, admin flags, and billing information.
				The frontend only displays name and email, so you think you're safe.
				But attackers don't use your UI. They intercept the API response with browser DevTools and see <em>everything</em> your server sent.
			</p>
			<p>
				This vulnerability is classified as <a href={owaspData.cweSource}>CWE-213 (Exposure of Sensitive Information Due to Incompatible Policies)</a> and is part of
				<a href={owaspData.owaspSource}>OWASP API3:2023 - Broken Object Property Level Authorization (BOPLA)</a>.
				In 2019, OWASP tracked this separately as "Excessive Data Exposure," but merged it with Mass Assignment in 2023 because both stem from the same root issue: insufficient property-level access control.
			</p>
		</section>

		<!-- Why This Is Dangerous -->
		<section class="article-section">
			<h2>Why is excessive data exposure dangerous?</h2>
			<p>
				Just because your UI doesn't display sensitive data doesn't mean attackers can't access it.
				Every field you return in an API response is visible to anyone who inspects the network traffic.
				Here's what leaks when APIs return full database objects:
			</p>

			<ul class="danger-list">
				<li><strong>Password hashes exposed:</strong> Even bcrypt hashes can be cracked offline if attackers have the hash. Security researchers have shown that weak passwords fall in hours. Attackers scrape API responses, collect hashes, and crack them in bulk.</li>
				<li><strong>Session tokens leaked:</strong> Reset tokens, email verification tokens, API keys returned in user objects. Attackers use these to hijack accounts without needing passwords.</li>
				<li><strong>PII oversharing:</strong> Social security numbers, phone numbers, addresses returned when only name was needed. Compliance nightmares. GDPR violations. Lawsuits.</li>
				<li><strong>Internal data visible:</strong> Database IDs, admin flags, permission levels, internal notes. Attackers map your system architecture and find privilege escalation paths.</li>
				<li><strong>Real breach example:</strong> In January 2023, <a href="https://thenewstack.io/twitter-leak-shows-how-important-api-security-remains-in-2023/">Twitter's API exposed 200+ million users' email addresses and phone numbers</a> through an endpoint that returned more data than necessary. Scrapers collected everything and sold the dataset publicly.</li>
			</ul>
		</section>

		<!-- How AI Tools Cause This -->
		<section class="article-section">
			<h2>How do AI tools cause excessive data exposure?</h2>
			<p>
				AI coding tools default to the simplest working pattern: fetch data from database, return it directly to client.
				No filtering. No field selection. Just <code>res.json(user)</code> and ship it.
				This is how vibe coded apps leak sensitive data constantly.
			</p>

			<div class="ai-pattern-box">
				<h3>The pattern AI generates</h3>
				<p>Ask Cursor, Bolt, or Claude Code to create a user profile endpoint. This is what you get:</p>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">JavaScript</span>
					</div>
					<pre><code>{`// AI generates this for "create user profile API endpoint"
app.get('/api/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(user) // Returns EVERYTHING from database
})

// What attackers see in the response:
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com",
  "passwordHash": "$2b$10$N9qo8uLOickgx2ZMRZoMye...", // EXPOSED
  "resetToken": "abc123-secret-token",              // EXPOSED
  "isAdmin": false,                                 // EXPOSED
  "stripeCustomerId": "cus_xxx",                    // EXPOSED
  "lastLoginIp": "192.168.1.1",                     // EXPOSED
  "emailVerificationToken": "verify-xyz"            // EXPOSED
}`}</code></pre>
				</div>

				<p class="pattern-note">
					Your frontend displays name and email. Attackers see password hashes, tokens, and admin flags.
					The code works perfectly from a functional perspective, which is why AI ships it and vibe coders don't catch it.
				</p>
			</div>

			<p>
				<strong>Why AI does this:</strong> Training data is full of tutorials where developers fetch data and return it directly.
				That's the pattern AI has seen most. It optimizes for "code that works" not "code that's secure."
				Field filtering requires extra code, so AI skips it unless you explicitly ask.
			</p>

			<p>
				<strong>Tool-specific patterns:</strong>
			</p>
			<ul>
				<li><strong>Cursor:</strong> Generates <code>res.json(user)</code> in Express endpoints. Clean, readable, vulnerable. Returns full Mongoose models without field projection.</li>
				<li><strong>Bolt:</strong> Creates Supabase client queries with <code>select('*')</code>. Even with Row Level Security, you're still fetching and transmitting unnecessary columns.</li>
				<li><strong>Claude Code:</strong> Takes prompts literally. "Get user data" means return all user fields. Doesn't assume you want filtering unless you specify it.</li>
				<li><strong>v0:</strong> UI-focused, generates API routes as an afterthought. Prioritizes frontend functionality over backend security.</li>
			</ul>
		</section>

		<!-- Common Patterns -->
		<section class="article-section">
			<h2>Common patterns in vibe coded apps</h2>
			<p>These are the code patterns that leak data in AI-generated codebases. If you see these, you have excessive data exposure:</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Pattern 1: Express + Mongoose</span>
				</div>
				<pre><code>{`// VULNERABLE: Returns full Mongoose model
app.get('/api/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(user) // Includes passwordHash, tokens, everything
})`}</code></pre>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Pattern 2: Next.js API Route + Prisma</span>
				</div>
				<pre><code>{`// VULNERABLE: Prisma returns all columns by default
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id }
    // No select: {} means ALL columns returned
  })
  return Response.json(user)
}`}</code></pre>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Pattern 3: GraphQL Resolver</span>
				</div>
				<pre><code>{`// VULNERABLE: Schema exposes sensitive fields
type User {
  id: ID!
  name: String!
  email: String!
  passwordHash: String!  // Should NEVER be in schema
  resetToken: String     // Attackers can query this
  isAdmin: Boolean
}

// Resolver returns everything in schema
Query: {
  user: async (_, { id }) => db.user.findOne({ id })
}`}</code></pre>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Pattern 4: Supabase Client Query</span>
				</div>
				<pre><code>{`// VULNERABLE: select('*') fetches all columns
const { data } = await supabase
  .from('users')
  .select('*') // Returns passwordHash, tokens, etc.
  .eq('id', userId)
  .single()`}</code></pre>
			</div>
		</section>

		<!-- How to Detect -->
		<section class="article-section">
			<h2>How do I detect excessive data exposure?</h2>
			<p>
				The easiest way to find this vulnerability: open your browser DevTools Network tab and inspect API responses.
				Compare what the API returns versus what your UI displays.
				If there's a mismatch, you're leaking data.
			</p>

			<div class="detection-steps">
				<h3>Manual testing steps</h3>
				<ol>
					<li>Open your app in Chrome/Firefox with DevTools</li>
					<li>Go to Network tab, filter by "Fetch/XHR"</li>
					<li>Load a page that displays user data</li>
					<li>Click the API request and inspect the Response tab</li>
					<li>Look for fields like <code>passwordHash</code>, <code>token</code>, <code>isAdmin</code>, <code>stripeCustomerId</code></li>
					<li>If you see sensitive fields that aren't displayed in UI, that's excessive data exposure</li>
				</ol>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Code patterns to search for</span>
				</div>
				<pre><code>{`// Search your codebase for these patterns:

// 1. res.json() with database variables
res.json(user)
res.json(result)
res.json(data)

// 2. Prisma queries without select
prisma.user.findUnique({ where: { id } })
prisma.user.findMany()

// 3. Mongoose without .select()
User.findById(id)
User.find({ email })

// 4. SELECT * in raw SQL
SELECT * FROM users
db.query('SELECT * FROM ...')

// 5. GraphQL schemas with sensitive field names
passwordHash: String
token: String
secret: String
apiKey: String`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Don't want to audit API responses manually?</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your codebase for free
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How do I fix excessive data exposure?</h2>
			<p>
				The fix is server-side filtering and Data Transfer Objects (DTOs).
				Never send full database objects to the client.
				Explicitly define which fields should be public, then map your internal models to that public shape.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to automatically fix excessive data exposure across your codebase:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">AI Fix Prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all excessive data exposure vulnerabilities in my API endpoints.

## What to look for

Search for these dangerous patterns where we return too much data:

1. API endpoints that return raw database objects:
   - res.json(user)
   - Response.json(result)
   - return data (without filtering)

2. Database queries without field selection:
   - Prisma: findUnique() or findMany() WITHOUT select: {}
   - Mongoose: findById() or find() WITHOUT .select()
   - SQL: SELECT * queries
   - Supabase: .select('*')

3. GraphQL schemas with sensitive fields:
   - passwordHash, password, token, secret, apiKey in type definitions
   - Resolvers that return full database objects

## How to fix

Implement Data Transfer Objects (DTOs) and server-side filtering:

### For Express + Mongoose:
\`\`\`javascript
// Before (vulnerable)
app.get('/api/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(user) // Returns EVERYTHING
})

// After (secure) - Option 1: DTO function
function toPublicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.createdAt
    // passwordHash, tokens NOT included
  }
}

app.get('/api/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(toPublicUser(user))
})

// After (secure) - Option 2: Field projection
app.get('/api/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('id name email avatar createdAt')
    .lean()
  res.json(user)
})
\`\`\`

### For Next.js + Prisma:
\`\`\`typescript
// Before (vulnerable)
const user = await prisma.user.findUnique({
  where: { id: params.id }
})
return Response.json(user)

// After (secure) - Use select
const user = await prisma.user.findUnique({
  where: { id: params.id },
  select: {
    id: true,
    name: true,
    email: true,
    avatar: true,
    createdAt: true
    // passwordHash, resetToken excluded by default
  }
})
return Response.json(user)
\`\`\`

### For Supabase:
\`\`\`typescript
// Before (vulnerable)
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)

// After (secure) - Specify columns
const { data } = await supabase
  .from('users')
  .select('id, name, email, avatar, created_at')
  .eq('id', userId)
\`\`\`

### For GraphQL:
\`\`\`typescript
// Before (vulnerable)
type User {
  id: ID!
  name: String!
  email: String!
  passwordHash: String! // NEVER expose this
  resetToken: String
}

// After (secure) - Separate public and private types
type User {
  id: ID!
  name: String!
  email: String!
  avatar: String
  // Sensitive fields NOT in schema
}

// Resolver returns DTO
Query: {
  user: async (_, { id }) => {
    const user = await db.user.findOne({ id })
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    }
  }
}
\`\`\`

## Framework-specific notes

- **Express:** Create DTO utility functions for consistent field filtering
- **Next.js API Routes:** Define TypeScript interfaces for public response types
- **Prisma:** Use \`select\` (allowlist) or \`omit\` (denylist) - prefer select
- **Mongoose:** Use \`.select('field1 field2')\` or \`.select('-sensitiveField')\`
- **GraphQL:** Never put sensitive fields in schema, use field-level resolvers
- **Supabase:** Specify columns explicitly, avoid \`select('*')\`

## After fixing

1. Test all API endpoints with DevTools Network tab
2. Verify responses contain ONLY fields your UI needs
3. Search for remaining \`res.json(\` patterns without DTOs
4. Add TypeScript types for API responses to enforce this pattern
5. List all files you modified with before/after snippets

Please proceed systematically through my API endpoints.`}</div>
				</div>
			</div>

			<!-- Manual Fixes -->
			<div class="fix-section">
				<h3>Manual fix: Data Transfer Objects (DTOs)</h3>
				<p>
					A DTO is a simple function that maps your internal database model to a public API response.
					It's an explicit allowlist of fields you're willing to send to clients.
					Here's the pattern across different frameworks:
				</p>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Express + Mongoose (DTO Pattern)</span>
					</div>
					<pre><code>{`// SECURE: Define public user interface
interface UserPublicDTO {
  id: string
  name: string
  email: string
  avatar: string | null
  createdAt: Date
}

function toPublicUser(user: any): UserPublicDTO {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.createdAt
    // passwordHash, resetToken, isAdmin NOT included
  }
}

app.get('/api/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(toPublicUser(user))
})`}</code></pre>
				</div>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Next.js + Prisma (Select Pattern)</span>
					</div>
					<pre><code>{`// SECURE: Prisma with explicit field selection
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      createdAt: true
      // All other fields excluded by default
    }
  })

  return Response.json(user)
}`}</code></pre>
				</div>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Mongoose (Field Projection)</span>
					</div>
					<pre><code>{`// SECURE: Mongoose with .select()
app.get('/api/user/:id', async (req, res) => {
  const user = await User
    .findById(req.params.id)
    .select('id name email avatar createdAt')
    .lean() // Returns plain object

  res.json(user)
})

// Alternative: Exclude sensitive fields with minus
const user = await User
  .findById(req.params.id)
  .select('-passwordHash -resetToken -sessionSecret')
  .lean()`}</code></pre>
				</div>

				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Supabase (Column Selection)</span>
					</div>
					<pre><code>{`// SECURE: Specify exact columns
const { data } = await supabase
  .from('users')
  .select('id, name, email, avatar, created_at')
  .eq('id', userId)
  .single()

// Don't use select('*') - too broad`}</code></pre>
				</div>
			</div>
		</section>

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

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related content</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/mass-assignment/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Mass Assignment</div>
					<p class="related-card-description">The write-operation counterpart to excessive data exposure, now both part of OWASP BOPLA</p>
				</a>

				<a href="/kb/security/vulnerabilities/broken-access-control/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Broken Access Control</div>
					<p class="related-card-description">Authorization flaws that let users access data they shouldn't see</p>
				</a>

				<a href="/kb/security/vulnerabilities/sensitive-data-exposure/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Sensitive Data Exposure</div>
					<p class="related-card-description">Broader category of data leakage vulnerabilities beyond APIs</p>
				</a>

				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated API endpoints</p>
				</a>

				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Bolt Security Patterns</div>
					<p class="related-card-description">How Bolt's Supabase integrations can leak data</p>
				</a>

				<a href="/kb/security/stacks/nextjs-prisma/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Prisma Security</div>
					<p class="related-card-description">Complete security checklist including field selection patterns</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Catch data leaks before they become breaches</h2>
			<p>Your API responses might be sharing more than you realize. Find out what's leaking.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan your APIs now
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>
	</article>
</div>

<style>
	/* Badge row */
	.badge-row {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	/* Data source attribution */
	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* AI Pattern Box */
	.ai-pattern-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.ai-pattern-box h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.ai-pattern-box > p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
	}

	.pattern-note {
		margin: 1rem 0 0 !important;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.pattern-note code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Danger list */
	.danger-list {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}

	.danger-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.danger-list li:last-child {
		border-bottom: none;
	}

	.danger-list strong {
		color: var(--text-primary);
	}

	/* Detection steps */
	.detection-steps {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.detection-steps h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	.detection-steps ol {
		margin: 0;
		padding-left: 1.5rem;
		color: var(--text-secondary);
	}

	.detection-steps li {
		margin-bottom: 0.5rem;
		line-height: 1.6;
	}

	.detection-steps code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
	}

	/* Fix sections */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}
</style>
