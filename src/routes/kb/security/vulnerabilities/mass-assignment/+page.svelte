<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Mass Assignment: When Users Modify Fields They Shouldn\'t',
		description: 'Mass assignment lets attackers set admin privileges by adding unexpected fields to API requests. Common in Node.js and AI-generated code. Learn safe update patterns.',
		url: '/kb/security/vulnerabilities/mass-assignment/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Mass Assignment' }
	];

	// Real external data sources
	const owaspData = {
		ranking: 'API Top 10',
		category: 'API3:2023 - Broken Object Property Level Authorization',
		source: 'https://owasp.org/API-Security/editions/2023/en/0xa3-broken-object-property-level-authorization/',
		cweId: 'CWE-915',
		cweSource: 'https://cwe.mitre.org/data/definitions/915.html'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is mass assignment vulnerability?',
			answer: 'Mass assignment (CWE-915) happens when your API accepts all fields from a request and updates the database without checking which fields users are allowed to modify. Attackers add extra fields like isAdmin: true to gain elevated privileges. It was API6:2019 in OWASP and is now part of API3:2023.'
		},
		{
			question: 'How do I prevent mass assignment in Node.js?',
			answer: 'Use an allowlist of permitted fields. Instead of Object.assign(user, req.body), explicitly pick allowed fields: const { name, email } = req.body. Use validation libraries like Zod that strip unknown fields by default. Never pass req.body directly to ORM update methods.'
		},
		{
			question: 'What is the difference between mass assignment and IDOR?',
			answer: 'IDOR is about accessing the wrong record (changing user ID 123 to 456). Mass assignment is about modifying the wrong fields on your own record (adding isAdmin: true). IDOR is horizontal access control; mass assignment is vertical privilege escalation. Both can exist in the same endpoint.'
		},
		{
			question: 'Can mass assignment lead to privilege escalation?',
			answer: 'Yes, privilege escalation is the primary risk. Attackers add fields like isAdmin, role, permissions, or balance to API requests. If your server blindly saves all fields, attackers become admins, change their subscription tier, or modify their account balance. Always use field allowlists.'
		},
		{
			question: 'How do I safely update objects in JavaScript?',
			answer: 'Destructure only allowed fields: const { name, email } = req.body. Or use an explicit allowlist: const allowed = ["name", "email"]. For TypeScript, define DTOs (Data Transfer Objects) that specify exactly which fields are accepted. Validation libraries like Zod automatically strip unknown fields.'
		}
	];

	// State
	let showAIPrompt = $state(false);
	let copySuccess = $state(false);
	let expandedFaq = $state<string | null>(null);

	// AI Fix prompt
	const aiFixPrompt = `You are a security auditor. Scan this codebase for Mass Assignment vulnerabilities (CWE-915).

## What to Search For

### 1. Direct Object Merging with Request Data
Search for patterns that merge request body directly into database objects:
- Object.assign(user, req.body)
- { ...user, ...req.body }
- Object.assign(obj, req.body)
- _.merge(obj, req.body)
- _.assign(obj, req.body)

### 2. ORM/ODM Updates with Unsanitized Input
Look for database updates passing req.body directly:

**Prisma:**
\`\`\`javascript
prisma.user.update({ where: { id }, data: req.body }) // VULNERABLE
prisma.user.create({ data: req.body }) // VULNERABLE
\`\`\`

**Mongoose:**
\`\`\`javascript
User.findByIdAndUpdate(id, req.body) // VULNERABLE
User.updateOne({ _id: id }, req.body) // VULNERABLE
user.set(req.body) // VULNERABLE
\`\`\`

**Sequelize:**
\`\`\`javascript
User.update(req.body, { where: { id } }) // VULNERABLE
user.update(req.body) // VULNERABLE
\`\`\`

### 3. Sensitive Fields in Schemas
Look for these dangerous fields that should never be user-modifiable:
- isAdmin, admin, is_admin
- role, roles, permissions
- verified, emailVerified, isVerified
- balance, credits, subscription
- password, passwordHash (in update operations)
- createdAt, updatedAt
- id, _id, userId

### 4. Framework-Specific Patterns

**Express:**
\`\`\`javascript
app.put('/user/:id', (req, res) => {
  User.update(req.body) // VULNERABLE - no field filtering
})
\`\`\`

**Next.js API Routes:**
\`\`\`typescript
export async function PUT(request: Request) {
  const data = await request.json()
  await prisma.user.update({ data }) // VULNERABLE
}
\`\`\`

**Next.js Server Actions:**
\`\`\`typescript
async function updateUser(formData: FormData) {
  'use server'
  const data = Object.fromEntries(formData)
  await prisma.user.update({ data }) // VULNERABLE
}
\`\`\`

## Validation Requirements

For any update operation, verify field allowlist exists:

\`\`\`javascript
// SECURE Pattern 1: Explicit destructuring
const { name, email, avatar } = req.body
await prisma.user.update({
  where: { id },
  data: { name, email, avatar }
})

// SECURE Pattern 2: Field allowlist
const ALLOWED_FIELDS = ['name', 'email', 'avatar']
const data = {}
for (const field of ALLOWED_FIELDS) {
  if (req.body[field] !== undefined) {
    data[field] = req.body[field]
  }
}

// SECURE Pattern 3: Zod validation (strips unknown fields)
const UpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
})
const data = UpdateSchema.parse(req.body)
\`\`\`

## Report Format

For each finding, report:
1. File and line number
2. The vulnerable code pattern
3. What ORM/method is being used
4. What sensitive fields exist in the schema
5. Whether any field filtering exists
6. Severity (Critical if admin/role fields exist, High otherwise)
7. Specific fix with code

## Fix Template

\`\`\`javascript
// Option 1: Explicit allowlist (recommended)
const ALLOWED_UPDATE_FIELDS = ['name', 'email', 'avatar']

function sanitizeUpdate(input) {
  const sanitized = {}
  for (const field of ALLOWED_UPDATE_FIELDS) {
    if (input[field] !== undefined) {
      sanitized[field] = input[field]
    }
  }
  return sanitized
}

app.put('/api/user/:id', async (req, res) => {
  const data = sanitizeUpdate(req.body)
  await prisma.user.update({ where: { id }, data })
})

// Option 2: Zod schema (strips unknown automatically)
const UpdateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  avatar: z.string().url().optional(),
})

app.put('/api/user/:id', async (req, res) => {
  const data = UpdateUserSchema.parse(req.body)
  await prisma.user.update({ where: { id }, data })
})
\`\`\`

Begin your audit. Find all database update operations, check what fields exist in schemas, and verify proper field filtering exists.`;

	async function copyPrompt() {
		try {
			await navigator.clipboard.writeText(aiFixPrompt);
			copySuccess = true;
			setTimeout(() => copySuccess = false, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	function toggleFaq(id: string) {
		expandedFaq = expandedFaq === id ? null : id;
	}
</script>

<svelte:head>
	<title>{meta.title} | VibeShip</title>
	<meta name="description" content={meta.description} />
	<meta name="keywords" content="mass assignment vulnerability, API security, CWE-915, object injection, privilege escalation, Node.js security" />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />

	<!-- Open Graph -->
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://vibeship.co{meta.url}" />

	<!-- Schema.org TechArticle -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": meta.title,
		"description": meta.description,
		"author": {
			"@type": "Organization",
			"name": "VibeShip",
			"url": "https://vibeship.co"
		},
		"publisher": {
			"@type": "Organization",
			"name": "VibeShip",
			"url": "https://vibeship.co"
		},
		"datePublished": "2025-01-15",
		"dateModified": "2025-01-15",
		"mainEntityOfPage": "https://vibeship.co" + meta.url,
		"keywords": ["mass assignment", "API security", "CWE-915", "privilege escalation", "Node.js"],
		"about": {
			"@type": "Thing",
			"name": "Mass Assignment Vulnerability",
			"sameAs": "https://cwe.mitre.org/data/definitions/915.html"
		}
	})}</script>`}

	<!-- Schema.org FAQPage -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": faqs.map(faq => ({
			"@type": "Question",
			"name": faq.question,
			"acceptedAnswer": {
				"@type": "Answer",
				"text": faq.answer
			}
		}))
	})}</script>`}

	<!-- Schema.org BreadcrumbList -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": breadcrumbs.map((crumb, index) => ({
			"@type": "ListItem",
			"position": index + 1,
			"name": crumb.label,
			"item": crumb.href ? "https://vibeship.co" + crumb.href : undefined
		}))
	})}</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<!-- Header Section -->
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-high">High Severity</span>
				<a href={owaspData.cweSource} target="_blank" rel="noopener noreferrer" class="badge">{owaspData.cweId}</a>
				<a href={owaspData.source} target="_blank" rel="noopener noreferrer" class="badge">OWASP API3:2023</a>
			</div>
			<h1>{meta.title}</h1>
			<p class="article-subtitle">AI tools generate clean-looking code that lets attackers modify any field</p>
		</header>

		<!-- Quick Answer Box -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Mass assignment happens when your API accepts all fields from a request and updates the database without checking which fields users are allowed to modify.</strong> Attackers add fields like <code>isAdmin: true</code> to gain elevated privileges. Always use allowlists for updateable fields.
			</p>
		</div>

		<!-- Main Content -->
		<section class="article-section" id="what-is">
			<h2>What is Mass Assignment?</h2>
			<p>
				Mass assignment (<a href="https://cwe.mitre.org/data/definitions/915.html" target="_blank" rel="noopener noreferrer">CWE-915</a>) happens when your server blindly saves all fields from a request to the database. Users send extra fields they shouldn't be able to modify, and your server accepts them.
			</p>
			<p>
				Think of it like an employment form where applicants can write in their own salary. The form accepts whatever they write because nobody checked which fields employees are allowed to fill in.
			</p>
			<p>
				This vulnerability is so common that it was <a href="https://owasp.org/API-Security/editions/2019/en/0xa6-mass-assignment/" target="_blank" rel="noopener noreferrer">API6:2019</a> in OWASP's original API Security Top 10, and has been merged into <a href="https://owasp.org/API-Security/editions/2023/en/0xa3-broken-object-property-level-authorization/" target="_blank" rel="noopener noreferrer">API3:2023 (Broken Object Property Level Authorization)</a> in the updated list.
			</p>
		</section>

		<section class="article-section" id="why-dangerous">
			<h2>Why This Is Devastating</h2>

			<div class="impact-grid">
				<div class="impact-item">
					<h4>Privilege Escalation</h4>
					<p>Attackers add <code>isAdmin: true</code> or <code>role: "superuser"</code> to become administrators.</p>
				</div>

				<div class="impact-item">
					<h4>Financial Manipulation</h4>
					<p>Modify <code>balance</code>, <code>credits</code>, or <code>price</code> fields to steal money or get free services.</p>
				</div>

				<div class="impact-item">
					<h4>Data Corruption</h4>
					<p>Overwrite <code>createdAt</code>, <code>ownerId</code>, or other system fields to manipulate records.</p>
				</div>

				<div class="impact-item">
					<h4>Account Takeover</h4>
					<p>Change <code>email</code> without verification, or set <code>emailVerified: true</code> to bypass confirmation.</p>
				</div>
			</div>

			<p>
				Real-world example: In 2012, a mass assignment vulnerability in GitHub allowed users to push to any repository by adding their public key to any user's authorized keys list (<a href="https://blog.github.com/2012-03-04-public-key-security-vulnerability-and-mitigation/" target="_blank" rel="noopener noreferrer">CVE-2012-2054</a>).
			</p>
		</section>

		<section class="article-section" id="ai-patterns">
			<h2>Why AI Tools Generate This Pattern</h2>
			<p>
				When you ask AI tools to "create a user update endpoint," they generate the cleanest, most readable code. And in JavaScript, that means <code>Object.assign()</code> or the spread operator. The code looks modern and professional - that's the trap.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">
						<span class="status-icon">&#10060;</span> AI GENERATES THIS
					</div>
					<pre><code>// Clean, modern, vulnerable code
app.put('/api/user/:id', async (req, res) =&gt; &#123;
  const user = await User.findById(req.params.id)
  Object.assign(user, req.body) // "Clean" code
  await user.save()
  res.json(user)
&#125;)</code></pre>
				</div>
			</div>

			<p>
				The AI optimizes for readability and brevity. Security requires extra code that the AI won't add unless you specifically ask. This is classic vibe coding risk - the generated code works perfectly until someone malicious tests it.
			</p>

			<p>
				Common vibe coded patterns with mass assignment:
			</p>
			<ul>
				<li><strong>User profile updates</strong> - "Let users update their profile"</li>
				<li><strong>Settings pages</strong> - "Add user preferences"</li>
				<li><strong>Admin panels</strong> - "Create CRUD for users"</li>
				<li><strong>API endpoints</strong> - "Build REST API for posts"</li>
			</ul>
		</section>

		<section class="article-section" id="vulnerable-code">
			<h2>Vulnerable Code Examples</h2>

			<h3>Pattern 1: Object.assign (AI Default)</h3>
			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">
						<span class="status-icon">&#10060;</span> VULNERABLE
					</div>
					<pre><code>// AI generates this for "update user profile"
app.put('/api/user/:id', async (req, res) =&gt; &#123;
  const user = await User.findById(req.params.id)
  Object.assign(user, req.body) // DANGEROUS!
  await user.save()
  res.json(user)
&#125;)

// Attacker sends:
// &#123; "name": "John", "isAdmin": true, "role": "superuser" &#125;
// All fields get saved, including isAdmin!</code></pre>
				</div>
			</div>
			<p class="code-explanation">
				Object.assign copies ALL properties from request body. Attacker can modify any field in the schema.
			</p>

			<h3>Pattern 2: Spread Operator</h3>
			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">
						<span class="status-icon">&#10060;</span> VULNERABLE
					</div>
					<pre><code>// Spread operator is just as dangerous
app.put('/api/user/:id', async (req, res) =&gt; &#123;
  const user = await User.findById(req.params.id)
  const updated = &#123; ...user.toObject(), ...req.body &#125; // DANGEROUS!
  await User.findByIdAndUpdate(req.params.id, updated)
  res.json(updated)
&#125;)

// Same attack vector as Object.assign</code></pre>
				</div>
			</div>
			<p class="code-explanation">
				The spread operator (...) merges objects the same way. No protection against extra fields.
			</p>

			<h3>Pattern 3: Prisma Update</h3>
			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">
						<span class="status-icon">&#10060;</span> VULNERABLE
					</div>
					<pre><code>// Passing request body directly to Prisma
app.put('/api/user/:id', async (req, res) =&gt; &#123;
  const user = await prisma.user.update(&#123;
    where: &#123; id: req.params.id &#125;,
    data: req.body, // DANGEROUS!
  &#125;)
  res.json(user)
&#125;)

// Attacker can set any column in the users table</code></pre>
				</div>
			</div>
			<p class="code-explanation">
				Prisma accepts any fields matching the schema. No automatic field filtering.
			</p>
		</section>

		<section class="article-section" id="secure-patterns">
			<h2>How to Fix Mass Assignment</h2>

			<h3>Secure Pattern: Explicit Allowlist</h3>
			<div class="code-comparison">
				<div class="code-block secure">
					<div class="code-label">
						<span class="status-icon">&#9989;</span> SECURE
					</div>
					<pre><code>// Explicitly pick allowed fields
const ALLOWED_UPDATE_FIELDS = ['name', 'email', 'avatar']

app.put('/api/user/:id', async (req, res) =&gt; &#123;
  const user = await User.findById(req.params.id)

  // Only copy allowed fields
  for (const field of ALLOWED_UPDATE_FIELDS) &#123;
    if (req.body[field] !== undefined) &#123;
      user[field] = req.body[field]
    &#125;
  &#125;

  await user.save()
  res.json(user)
&#125;)

// Attacker's isAdmin: true is ignored</code></pre>
				</div>
			</div>
			<p class="code-explanation">
				Explicitly define which fields users can modify. Ignore everything else.
			</p>

			<h3>Secure Pattern: Zod Validation</h3>
			<div class="code-comparison">
				<div class="code-block secure">
					<div class="code-label">
						<span class="status-icon">&#9989;</span> SECURE
					</div>
					<pre><code>// Use Zod to define and validate allowed fields
import &#123; z &#125; from 'zod'

const UpdateUserSchema = z.object(&#123;
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  avatar: z.string().url().optional(),
&#125;)

app.put('/api/user/:id', async (req, res) =&gt; &#123;
  // Parse and validate - strips unknown fields
  const data = UpdateUserSchema.parse(req.body)

  const user = await prisma.user.update(&#123;
    where: &#123; id: req.params.id &#125;,
    data, // Only contains allowed, validated fields
  &#125;)

  res.json(user)
&#125;)</code></pre>
				</div>
			</div>
			<p class="code-explanation">
				<a href="https://zod.dev/" target="_blank" rel="noopener noreferrer">Zod</a> strips unknown fields by default. Only schema-defined fields pass through.
			</p>

			<h3>Secure Pattern: Destructuring</h3>
			<div class="code-comparison">
				<div class="code-block secure">
					<div class="code-label">
						<span class="status-icon">&#9989;</span> SECURE
					</div>
					<pre><code>// Destructure only allowed fields
app.put('/api/user/:id', async (req, res) =&gt; &#123;
  const &#123; name, email, avatar &#125; = req.body

  const user = await prisma.user.update(&#123;
    where: &#123; id: req.params.id &#125;,
    data: &#123;
      // Only set fields you explicitly allow
      ...(name && &#123; name &#125;),
      ...(email && &#123; email &#125;),
      ...(avatar && &#123; avatar &#125;),
    &#125;,
  &#125;)

  res.json(user)
&#125;)</code></pre>
				</div>
			</div>
			<p class="code-explanation">
				Destructure specific fields from the request. Only those fields can be updated.
			</p>

			<h3>Secure Pattern: Next.js Server Actions</h3>
			<div class="code-comparison">
				<div class="code-block secure">
					<div class="code-label">
						<span class="status-icon">&#9989;</span> SECURE
					</div>
					<pre><code>// Next.js Server Action with field allowlist
'use server'

import &#123; z &#125; from 'zod'

const UpdateProfileSchema = z.object(&#123;
  name: z.string().min(1).max(100),
  bio: z.string().max(500).optional(),
&#125;)

export async function updateProfile(formData: FormData) &#123;
  const rawData = Object.fromEntries(formData)

  // Validate and strip unknown fields
  const data = UpdateProfileSchema.parse(rawData)

  await prisma.user.update(&#123;
    where: &#123; id: session.userId &#125;,
    data,
  &#125;)
&#125;</code></pre>
				</div>
			</div>
			<p class="code-explanation">
				Server Actions with Zod validation ensure only allowed fields are processed.
			</p>

			<h3>Key Security Points</h3>
			<ul>
				<li><strong>Always use allowlists</strong> - explicitly list which fields are updateable</li>
				<li><strong>Never use blocklists</strong> - "block isAdmin" misses new dangerous fields</li>
				<li><strong>Validate with schemas</strong> - Zod strips unknown fields automatically</li>
				<li><strong>Different allowlists per role</strong> - admins may update more fields than users</li>
				<li><strong>Audit sensitive fields</strong> - role, isAdmin, balance, permissions need extra protection</li>
			</ul>
		</section>

		<section class="article-section" id="ai-fix">
			<h2>AI Fix Prompt</h2>
			<p>
				Copy this prompt to your AI tool to scan your codebase for mass assignment vulnerabilities:
			</p>

			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span class="fix-prompt-title">Mass Assignment Audit Prompt</span>
					<button
						class="copy-button"
						onclick={copyPrompt}
						disabled={copySuccess}
					>
						{#if copySuccess}
							<span class="copy-success">&#10003; Copied!</span>
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
							Copy Prompt
						{/if}
					</button>
				</div>
				<div class="fix-prompt-preview">
					<button
						class="expand-button"
						onclick={() => showAIPrompt = !showAIPrompt}
					>
						{showAIPrompt ? 'Hide' : 'Show'} Full Prompt ({aiFixPrompt.length} characters)
					</button>
					{#if showAIPrompt}
						<pre class="fix-prompt-content">{aiFixPrompt}</pre>
					{/if}
				</div>
			</div>
		</section>

		<section class="article-section" id="faq">
			<h2>Frequently Asked Questions</h2>

			<div class="faq-list">
				{#each faqs as faq, i}
					<div class="faq-item" class:expanded={expandedFaq === `faq-${i}`}>
						<button
							class="faq-question"
							onclick={() => toggleFaq(`faq-${i}`)}
							aria-expanded={expandedFaq === `faq-${i}`}
						>
							<span>{faq.question}</span>
							<span class="faq-icon">{expandedFaq === `faq-${i}` ? '−' : '+'}</span>
						</button>
						{#if expandedFaq === `faq-${i}`}
							<div class="faq-answer">
								<p>{faq.answer}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>

		<section class="article-section" id="related">
			<h2>Related content</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/idor/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">IDOR</div>
					<p class="related-card-description">Related authorization flaw - accessing wrong records vs wrong fields</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">Mass assignment is worse without authentication</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">Another input validation vulnerability</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Object.assign patterns in Cursor-generated code</p>
				</a>
				<a href="/kb/vibe-coding-tools/bolt/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Bolt.new Security</div>
					<p class="related-card-description">API endpoint patterns from Bolt</p>
				</a>
				<a href="/kb/security/stacks/nextjs-prisma/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Prisma Security</div>
					<p class="related-card-description">Secure Prisma update patterns</p>
				</a>
			</div>
		</section>

		<section class="article-section" id="resources">
			<h2>External Resources</h2>
			<ul class="resource-list">
				<li>
					<a href="https://cwe.mitre.org/data/definitions/915.html" target="_blank" rel="noopener noreferrer">CWE-915: Mass Assignment</a> - Official vulnerability definition
				</li>
				<li>
					<a href="https://owasp.org/API-Security/editions/2023/en/0xa3-broken-object-property-level-authorization/" target="_blank" rel="noopener noreferrer">OWASP API3:2023</a> - Broken Object Property Level Authorization
				</li>
				<li>
					<a href="https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html" target="_blank" rel="noopener noreferrer">OWASP Mass Assignment Cheat Sheet</a> - Prevention strategies
				</li>
				<li>
					<a href="https://owasp.org/API-Security/editions/2019/en/0xa6-mass-assignment/" target="_blank" rel="noopener noreferrer">OWASP API6:2019</a> - Original mass assignment category
				</li>
				<li>
					<a href="https://zod.dev/" target="_blank" rel="noopener noreferrer">Zod Documentation</a> - TypeScript-first schema validation
				</li>
			</ul>
		</section>

		<!-- CTA Section -->
		<section class="cta-box">
			<h2>Find Mass Assignment in Your Code</h2>
			<p>VibeShip Scanner automatically detects mass assignment vulnerabilities in your codebase, including Object.assign, spread operators, and direct ORM updates.</p>
			<a href="https://scanner.vibeship.co" class="cta-button">Scan Your Code Free</a>
		</section>
	</article>
</div>

<style>
	.article-header {
		margin-bottom: 2rem;
	}

	.badge-row {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-decoration: none;
		background: var(--bg-tertiary);
		color: var(--text-secondary);
		border: 1px solid var(--border);
	}

	.badge:hover {
		color: var(--green);
	}

	.badge-high {
		background: var(--bg-tertiary);
		color: var(--orange);
		border-color: var(--orange);
	}

	h1 {
		font-size: 2.25rem;
		font-weight: 800;
		color: var(--text-primary);
		margin: 0 0 0.75rem 0;
		line-height: 1.2;
	}

	.article-subtitle {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin: 0;
	}

	/* Impact Grid */
	.impact-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
		margin: 1rem 0;
	}

	.impact-item {
		padding: 1rem;
		background: var(--bg-tertiary);
		border-left: 3px solid var(--red);
	}

	.impact-item h4 {
		color: var(--red);
		margin: 0 0 0.5rem 0;
		font-size: 1rem;
		font-weight: 600;
	}

	.impact-item p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Code blocks */
	.code-comparison {
		margin: 1rem 0;
	}

	.code-block {
		overflow: hidden;
		margin-bottom: 1rem;
		border: 1px solid var(--border);
	}

	.code-block.vulnerable {
		border-color: var(--red);
	}

	.code-block.secure {
		border-color: var(--green-dim);
	}

	.code-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.code-block.vulnerable .code-label {
		background: var(--bg-tertiary);
		color: var(--red);
	}

	.code-block.secure .code-label {
		background: var(--bg-tertiary);
		color: var(--green-dim);
	}

	.code-block pre {
		margin: 0;
		padding: 1rem;
		background: var(--bg-primary);
		overflow-x: auto;
	}

	.code-block code {
		display: block;
		background: transparent;
		padding: 0;
		color: var(--text-primary);
		font-size: 0.875rem;
		line-height: 1.6;
		white-space: pre;
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
	}

	.code-explanation {
		font-size: 0.875rem;
		color: var(--text-secondary);
		font-style: italic;
		margin-top: 0.5rem;
	}

	/* Fix Prompt */
	.fix-prompt {
		background: var(--bg-tertiary);
		overflow: hidden;
		margin: 1.5rem 0;
		border: 1px solid var(--border);
	}

	.fix-prompt-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border);
	}

	.fix-prompt-title {
		color: var(--text-primary);
		font-weight: 600;
		font-size: 0.875rem;
	}

	.copy-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: var(--green-dim);
		color: var(--bg-primary);
		border: none;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s;
	}

	.copy-button:hover:not(:disabled) {
		background: var(--green);
	}

	.copy-button:disabled {
		background: var(--green);
	}

	.fix-prompt-preview {
		padding: 1rem;
	}

	.expand-button {
		display: block;
		width: 100%;
		padding: 0.75rem;
		background: var(--bg-secondary);
		color: var(--text-secondary);
		border: 1px solid var(--border);
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.expand-button:hover {
		background: var(--bg-tertiary);
		color: var(--text-primary);
	}

	.fix-prompt-content {
		margin: 1rem 0 0 0;
		padding: 1rem;
		background: var(--bg-secondary);
		color: var(--text-primary);
		font-size: 0.8125rem;
		line-height: 1.6;
		white-space: pre-wrap;
		overflow-x: auto;
		max-height: 400px;
		overflow-y: auto;
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
	}

	/* FAQ */
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.faq-item {
		border: 1px solid var(--border);
		overflow: hidden;
	}

	.faq-item.expanded {
		border-color: var(--green-dim);
	}

	.faq-question {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 1rem;
		background: var(--bg-secondary);
		border: none;
		cursor: pointer;
		text-align: left;
		font-size: 1rem;
		font-weight: 500;
		color: var(--text-primary);
		transition: background 0.2s;
	}

	.faq-question:hover {
		background: var(--bg-tertiary);
	}

	.faq-item.expanded .faq-question {
		background: var(--bg-tertiary);
	}

	.faq-icon {
		font-size: 1.25rem;
		color: var(--green-dim);
		font-weight: 300;
	}

	.faq-answer {
		padding: 1rem;
		background: var(--bg-primary);
		border-top: 1px solid var(--border);
	}

	.faq-answer p {
		margin: 0;
		color: var(--text-secondary);
	}

	/* Resource List */
	.resource-list {
		list-style: none;
		padding: 0;
	}

	.resource-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
	}

	.resource-list li:last-child {
		border-bottom: none;
	}

	.resource-list a {
		font-weight: 500;
		color: var(--green-dim);
	}

	.resource-list a:hover {
		color: var(--green);
	}

	/* CTA Box */
	.cta-box {
		margin-top: 3rem;
		padding: 2rem;
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		text-align: center;
	}

	.cta-box h2 {
		color: var(--text-primary);
		border-bottom: none;
		margin-bottom: 1rem;
	}

	.cta-box p {
		color: var(--text-secondary);
		font-size: 1rem;
		max-width: 600px;
		margin: 0 auto 1.5rem auto;
	}

	.cta-button {
		display: inline-block;
		padding: 1rem 2rem;
		background: var(--green-dim);
		color: var(--bg-primary);
		font-weight: 600;
		font-size: 1rem;
		text-decoration: none;
		transition: background 0.2s;
	}

	.cta-button:hover {
		background: var(--green);
	}

	/* Responsive */
	@media (max-width: 640px) {
		h1 {
			font-size: 1.75rem;
		}

		.fix-prompt-header {
			flex-direction: column;
			gap: 1rem;
		}

		.copy-button {
			width: 100%;
			justify-content: center;
		}

		.cta-box {
			padding: 1.5rem 1rem;
		}

		.impact-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
