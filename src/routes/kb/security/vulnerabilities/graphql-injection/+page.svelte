<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'GraphQL Security: DoS, Introspection & Fixes',
		description: 'GraphQL has 5 unique attack vectors: introspection, DoS, batching, injection, and authorization bypass. Secure your AI-generated GraphQL API today.',
		url: '/kb/security/vulnerabilities/graphql-injection/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'GraphQL Security' }
	];

	// Security references
	const securityData = {
		severity: 'High',
		cweIds: ['CWE-89', 'CWE-200', 'CWE-799'],
		owaspCategory: 'API4:2023',
		source: 'https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What are the main security risks with GraphQL?',
			answer: 'The five main GraphQL security risks are: introspection attacks (exposing your entire schema), nested query DoS (crashing your API with deep queries), batching attacks (bypassing rate limits), injection via resolvers (SQL/NoSQL injection in database calls), and authorization bypass (accessing data without proper permissions). Research by Escape Tech found 46,000+ security issues across 1,500 GraphQL endpoints, with 10% classified as critical.'
		},
		{
			question: 'Should I disable GraphQL introspection in production?',
			answer: 'Yes. Disable introspection in production environments. Introspection exposes your entire API schema including all types, fields, mutations, and their relationships. Attackers use this to understand your data model and find attack vectors. In Apollo Server, set introspection: false for production. Keep it enabled in development for tooling like GraphQL Playground.'
		},
		{
			question: 'How do I prevent GraphQL DoS attacks?',
			answer: 'Prevent GraphQL DoS by implementing three controls: query depth limits (max 10-15 levels), query complexity limits (calculate cost based on fields and lists), and rate limiting per operation. Use libraries like graphql-depth-limit and graphql-query-complexity. Also limit batch sizes to prevent batching attacks. A single malicious query without these limits can crash your entire API.'
		},
		{
			question: 'What is a GraphQL batching attack?',
			answer: 'A GraphQL batching attack sends multiple operations in a single HTTP request to bypass rate limiting. Attackers bundle thousands of login attempts or OTP guesses into one request, evading per-request rate limits. For example, 10,000 password attempts arrive as one HTTP request. Prevent this by limiting batch sizes to 5-10 operations and implementing per-operation rate limiting, not just per-request.'
		},
		{
			question: 'Is GraphQL more secure than REST?',
			answer: 'GraphQL is not inherently more or less secure than REST - it has different security challenges. GraphQL exposes more attack surface through introspection and flexible queries. REST has simpler access control because endpoints map to resources. GraphQL requires field-level authorization, while REST uses endpoint-level. Both need proper authentication, authorization, and input validation.'
		},
		{
			question: 'What is GraphQL introspection and why is it dangerous?',
			answer: 'GraphQL introspection is a built-in feature that lets clients query the schema structure using the __schema query. It returns all types, fields, mutations, and their relationships. This is dangerous in production because attackers can map your entire API without documentation. They discover hidden fields, internal types, and potential injection points. Disable it using your GraphQL server settings.'
		},
		{
			question: 'How do I implement rate limiting in GraphQL?',
			answer: 'Implement GraphQL rate limiting at the operation level, not just HTTP request level. Use query complexity scoring where each field has a cost. Set maximum complexity per request (e.g., 1000). Limit batch sizes to 5-10 operations. Apply different limits for mutations versus queries. Consider using persisted queries in production to whitelist allowed operations entirely.'
		},
		{
			question: 'How do I secure a GraphQL API?',
			answer: 'Secure your GraphQL API with these steps: disable introspection in production, add query depth limits (10-15 max), implement complexity limits, restrict batch sizes, add field-level authorization checks in resolvers, validate all inputs before database queries, use HTTPS, implement proper authentication, and consider persisted queries for public APIs.'
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
			{"@type": "ListItem", "position": 4, "name": "GraphQL Security"}
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
		"datePublished": "2025-12-18",
		"dateModified": "2025-12-18"
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
				<span class="badge badge-critical">High</span>
				<span class="badge">CWE-200</span>
				<span class="badge">CWE-799</span>
				<span class="badge">OWASP API4:2023</span>
			</div>
			<h1>GraphQL Security in Vibe Coded Apps</h1>
			<p class="text-secondary">How to find and fix introspection, DoS, batching, and injection attacks in GraphQL APIs</p>
		</header>

		<!-- Quick Answer - Under 50 words -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>GraphQL APIs have unique attack vectors that REST doesn't.</strong>
				Introspection exposes your schema, nested queries cause DoS, and batching bypasses rate limits.
				Research found <a href="https://escape.tech/blog/the-state-of-graphql-security-2024/">46,000+ security issues in 1,500 GraphQL endpoints</a>, with 10% critical.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">46K+</div>
				<div class="stat-label">Issues Found</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">1,500</div>
				<div class="stat-label">APIs Scanned</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">10%</div>
				<div class="stat-label">Critical Severity</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">5</div>
				<div class="stat-label">Attack Vectors</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href="https://escape.tech/blog/the-state-of-graphql-security-2024/">Escape Tech State of GraphQL Security (2024)</a> |
			<a href="https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/">OWASP API Security Top 10</a>
		</p>

		<!-- What Is GraphQL Security -->
		<section class="article-section">
			<h2>What is GraphQL security?</h2>
			<p>
				GraphQL security addresses the unique vulnerabilities in GraphQL APIs that don't exist in REST.
				While REST exposes fixed endpoints, GraphQL lets clients request exactly what they want - which creates new attack surfaces.
			</p>
			<p>
				Think of REST like a restaurant with a fixed menu - you order item #5 and get what's listed.
				GraphQL is like a chef who'll cook anything you ask for. More flexible, but also more ways to abuse it if you don't set boundaries.
			</p>
			<p>
				The <a href="https://owasp.org/API-Security/editions/2023/">OWASP API Security Top 10 (2023)</a> identifies several categories relevant to GraphQL:
				<a href="https://cwe.mitre.org/data/definitions/799.html">CWE-799</a> (Improper Control of Interaction Frequency) for DoS attacks,
				<a href="https://cwe.mitre.org/data/definitions/200.html">CWE-200</a> (Information Disclosure) for introspection leaks, and
				<a href="https://cwe.mitre.org/data/definitions/89.html">CWE-89</a> (SQL Injection) for resolver vulnerabilities.
			</p>
		</section>

		<!-- 5 Attack Vectors -->
		<section class="article-section">
			<h2>What are the 5 critical GraphQL attack vectors?</h2>
			<p>
				GraphQL has five unique attack vectors that vibe coders need to understand.
				Each exploits GraphQL's flexibility in a different way.
			</p>

			<div class="attack-vector">
				<h3>1. Introspection attacks (CWE-200)</h3>
				<p>
					Introspection attacks exploit GraphQL's built-in schema discovery feature.
					The <code>__schema</code> query returns your entire API structure - every type, field, mutation, and relationship.
				</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Introspection Query</span>
					</div>
					<pre><code>{`# Attacker sends this to discover your entire schema
{
  __schema {
    types {
      name
      fields {
        name
        type { name }
      }
    }
  }
}

# Response reveals: User, AdminUser, InternalConfig, etc.
# Attackers now know exactly what to target`}</code></pre>
				</div>
				<p>
					Even if introspection is disabled, attackers can use <strong>field suggestion</strong> - sending invalid field names and analyzing error messages that suggest valid alternatives.
				</p>
			</div>

			<div class="attack-vector">
				<h3>2. Deep/nested query DoS (CWE-799)</h3>
				<p>
					Nested query attacks send deeply recursive queries that exhaust server resources.
					Without depth limits, a single malicious query can crash your entire API.
				</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">DoS Attack Query</span>
					</div>
					<pre><code>{`# Single query that crashes your server
query {
  user(id: "1") {
    friends {
      friends {
        friends {
          friends {
            # ... 100 levels deep
            # Each level multiplies database queries
          }
        }
      }
    }
  }
}

# Result: Database overwhelmed, API crashes`}</code></pre>
				</div>
				<p>
					Circular fragments are equally dangerous - they reference themselves, creating infinite recursion.
				</p>
			</div>

			<div class="attack-vector">
				<h3>3. Batching attacks</h3>
				<p>
					Batching attacks bypass rate limiting by sending thousands of operations in a single HTTP request.
					Your rate limiter sees one request; the server processes 10,000 operations.
				</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Batching Attack</span>
					</div>
					<pre><code>{`// Single HTTP request with 10,000 login attempts
[
  {"query": "mutation { login(email:\\"user@x.com\\", pass:\\"pass1\\") { token } }"},
  {"query": "mutation { login(email:\\"user@x.com\\", pass:\\"pass2\\") { token } }"},
  {"query": "mutation { login(email:\\"user@x.com\\", pass:\\"pass3\\") { token } }"},
  // ... 9,997 more attempts
]

// Rate limiter: "1 request, looks fine!"
// Server: processes all 10,000 login attempts`}</code></pre>
				</div>
				<p>
					This enables brute force attacks on passwords, OTPs, and any mutation with predictable inputs.
				</p>
			</div>

			<div class="attack-vector">
				<h3>4. Injection via resolvers (CWE-89)</h3>
				<p>
					<a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a> and <a href="/kb/security/vulnerabilities/nosql-injection/">NoSQL injection</a> happen in GraphQL resolvers just like REST endpoints.
					The difference is that GraphQL's flexibility makes it easier to inject malicious input.
				</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Resolver Injection</span>
					</div>
					<pre><code>{`// Vulnerable resolver
const resolvers = {
  Query: {
    user: async (_, { id }) => {
      // VULNERABLE: Template literal in SQL
      return db.query(\`SELECT * FROM users WHERE id = '\${id}'\`)
    }
  }
}

// Attack query
query {
  user(id: "' OR '1'='1") {
    email
    password_hash
  }
}

// Result: Returns ALL users in database`}</code></pre>
				</div>
			</div>

			<div class="attack-vector">
				<h3>5. Authorization bypass (BOLA/IDOR)</h3>
				<p>
					<a href="/kb/security/vulnerabilities/broken-access-control/">Broken access control</a> in GraphQL often happens at the field level.
					Resolvers check authentication but skip authorization - letting users access other users' data.
				</p>
				<div class="code-block">
					<div class="code-block-header">
						<span class="code-block-lang">Authorization Bypass</span>
					</div>
					<pre><code>{`// Vulnerable resolver - checks auth but not authorization
const resolvers = {
  Query: {
    user: async (_, { id }, context) => {
      if (!context.user) throw new Error('Not authenticated')
      // MISSING: Check if context.user.id === id
      return getUserById(id)  // Returns ANY user
    }
  }
}

// Logged in as user 123, request user 456's data
query {
  user(id: "456") {
    email
    ssn
    bankAccount
  }
}`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Why AI Tools Generate These -->
		<section class="article-section">
			<h2>Why do AI tools generate vulnerable GraphQL code?</h2>
			<p>
				AI tools generate insecure GraphQL APIs because they optimize for "working code" not "secure code."
				When you ask for a GraphQL API, the AI focuses on functionality - schemas, resolvers, mutations that work.
			</p>

			<div class="tool-patterns-box">
				<h3>Common AI-generated vulnerable patterns</h3>
				<div class="code-block">
					<pre><code>{`// What Cursor, Bolt, Claude Code typically generate:

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // introspection: true (default - VULNERABLE)
  // No depth limits (VULNERABLE)
  // No complexity limits (VULNERABLE)
  // No batch limits (VULNERABLE)
})

// Resolvers without authorization:
user: async (_, { id }) => getUserById(id)  // No auth check

// Resolvers with injection:
users: async (_, { search }) => {
  return db.query(\`SELECT * FROM users WHERE name LIKE '%\${search}%'\`)
}`}</code></pre>
				</div>
			</div>

			<p><strong>Why this happens:</strong></p>
			<ul class="reason-list">
				<li><strong>Developer experience priority:</strong> Introspection enabled by default for GraphQL tooling</li>
				<li><strong>No security in training data:</strong> Most GraphQL tutorials skip security configuration</li>
				<li><strong>Complexity of proper auth:</strong> Field-level authorization requires significant boilerplate</li>
				<li><strong>Focus on happy path:</strong> AI generates code that works, not code that's hardened</li>
			</ul>
		</section>

		<!-- What Attackers Can Do -->
		<section class="article-section">
			<h2>What could happen if my GraphQL API is vulnerable?</h2>
			<p>
				Vulnerable GraphQL APIs expose you to multiple attack scenarios, each with serious consequences.
			</p>
			<ul class="consequences-list">
				<li><strong>Complete schema exposure:</strong> Attackers map your entire data model, finding hidden admin fields and internal types</li>
				<li><strong>API denial of service:</strong> A single malicious query crashes your entire API, affecting all users</li>
				<li><strong>Brute force attacks:</strong> Batching bypasses rate limits, enabling password and OTP cracking</li>
				<li><strong>Database compromise:</strong> Injection through resolvers leads to full database access</li>
				<li><strong>Data theft:</strong> Authorization bypass lets attackers access any user's sensitive data</li>
				<li><strong>User enumeration:</strong> Error message differences reveal which users exist</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect GraphQL vulnerabilities?</h2>
			<p>
				Detect GraphQL security issues by testing each of the five attack vectors against your API.
				Start with introspection, then check for missing limits.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Detection Tests</span>
				</div>
				<pre><code>{`# 1. Test introspection (should return error in production)
curl -X POST your-api.com/graphql \\
  -H "Content-Type: application/json" \\
  -d '{"query": "{ __schema { types { name } } }"}'

# 2. Test depth limits (should be rejected)
# Send a 50-level nested query

# 3. Test batching (should be limited)
# Send array of 100+ queries in single request

# 4. Test authorization
# As user A, request user B's data

# 5. Check resolver code for:
# - Template literals in database queries
# - Missing context.user checks`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>Don't want to test manually?</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your GraphQL API
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How do I secure my GraphQL API?</h2>
			<p>
				Secure your GraphQL API by implementing protections for all five attack vectors.
				Use the AI fix prompt below or apply manual fixes per framework.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to automatically secure your GraphQL API:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Secure my GraphQL API against all 5 attack vectors.

## What to look for

Search for these security issues in my GraphQL code:

1. Introspection enabled in production:
   - ApolloServer without introspection: false
   - graphql-yoga without disabled introspection
   - Any GraphQL server in production mode

2. Missing depth limits:
   - No graphql-depth-limit or similar
   - No validationRules array
   - Schemas with recursive types (User -> friends -> User)

3. Missing complexity limits:
   - No graphql-query-complexity or graphql-validation-complexity
   - No cost calculation on fields
   - List fields without pagination limits

4. Unrestricted batching:
   - allowBatchedHttpRequests: true without limits
   - No per-operation rate limiting
   - Express/Apollo accepting array queries

5. Resolver vulnerabilities:
   - Template literals in database queries
   - Missing context.user checks
   - No field-level authorization

## How to fix

### Disable introspection in production (Apollo Server):
\`\`\`typescript
import { ApolloServer } from '@apollo/server';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
});
\`\`\`

### Add depth and complexity limits:
\`\`\`typescript
import depthLimit from 'graphql-depth-limit';
import { createComplexityLimitRule } from 'graphql-validation-complexity';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [
    depthLimit(10),
    createComplexityLimitRule(1000, {
      scalarCost: 1,
      objectCost: 5,
      listFactor: 10,
    }),
  ],
});
\`\`\`

### Limit batching:
\`\`\`typescript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  allowBatchedHttpRequests: true,
});

// Add middleware to limit batch size
app.use('/graphql', (req, res, next) => {
  if (Array.isArray(req.body) && req.body.length > 5) {
    return res.status(400).json({ error: 'Batch size limit exceeded' });
  }
  next();
});
\`\`\`

### Add field-level authorization:
\`\`\`typescript
import { GraphQLError } from 'graphql';

const resolvers = {
  Query: {
    user: async (_, { id }, context) => {
      if (!context.user) {
        throw new GraphQLError('Unauthenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }
      if (context.user.id !== id && !context.user.isAdmin) {
        throw new GraphQLError('Forbidden', {
          extensions: { code: 'FORBIDDEN' },
        });
      }
      return getUserById(id);
    },
  },
};
\`\`\`

### Fix resolver injection:
\`\`\`typescript
// Before (vulnerable)
users: async (_, { search }) => {
  return db.query(\`SELECT * FROM users WHERE name LIKE '%\${search}%'\`)
}

// After (secure) - Use parameterized queries
users: async (_, { search }) => {
  return db.query('SELECT * FROM users WHERE name LIKE $1', [\`%\${search}%\`])
}
\`\`\`

## Install required packages
\`\`\`bash
npm install graphql-depth-limit graphql-validation-complexity
\`\`\`

## After fixing

1. Test introspection is disabled in production
2. Verify depth limit rejects nested queries
3. Confirm batch requests are limited
4. Check all resolvers have authorization
5. List all files you modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fixes -->
			<div class="fix-section">
				<h3>Manual fixes by framework</h3>

				<h4>Apollo Server</h4>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// Default Apollo Server - all vulnerabilities
import { ApolloServer } from '@apollo/server';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // introspection: true (default)
  // No depth limits
  // No complexity limits
});`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// Hardened Apollo Server
import { ApolloServer } from '@apollo/server';
import depthLimit from 'graphql-depth-limit';
import { createComplexityLimitRule } from 'graphql-validation-complexity';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  validationRules: [
    depthLimit(10),
    createComplexityLimitRule(1000),
  ],
});`}</code></pre>
					</div>
				</div>

				<h4>Hasura</h4>
				<p>
					Hasura has built-in security features. Configure in your console or metadata:
				</p>
				<div class="code-block">
					<pre><code>{`# Disable introspection for non-admin roles
# In hasura metadata or console:
{
  "introspection_options": {
    "disabled_for_roles": ["user", "anonymous"]
  }
}

# Use allowlists in production
# Only pre-approved queries can execute
{
  "allow_list": {
    "enabled": true
  }
}`}</code></pre>
				</div>

				<h4>GraphQL Yoga</h4>
				<div class="code-block">
					<pre><code>{`import { createYoga, useDisableIntrospection } from 'graphql-yoga';
import { useDepthLimit } from '@envelop/depth-limit';

const yoga = createYoga({
  schema,
  plugins: [
    process.env.NODE_ENV === 'production' && useDisableIntrospection(),
    useDepthLimit({ maxDepth: 10 }),
  ].filter(Boolean),
});`}</code></pre>
				</div>
			</div>

			<!-- Prevention Methods -->
			<div class="fix-section">
				<h3>Prevention methods by priority</h3>
				<div class="prevention-grid">
					<div class="prevention-card">
						<div class="prevention-priority">1</div>
						<h4>Disable Introspection</h4>
						<p>Turn off schema discovery in production. Keep enabled for development tooling only.</p>
						<div class="code-block mini">
							<pre><code>{`introspection: process.env.NODE_ENV !== 'production'`}</code></pre>
						</div>
					</div>
					<div class="prevention-card">
						<div class="prevention-priority">2</div>
						<h4>Add Depth Limits</h4>
						<p>Prevent nested query DoS by limiting query depth to 10-15 levels maximum.</p>
						<div class="code-block mini">
							<pre><code>{`validationRules: [depthLimit(10)]`}</code></pre>
						</div>
					</div>
					<div class="prevention-card">
						<div class="prevention-priority">3</div>
						<h4>Add Complexity Limits</h4>
						<p>Calculate query cost based on fields. Reject queries exceeding your threshold.</p>
						<div class="code-block mini">
							<pre><code>{`createComplexityLimitRule(1000)`}</code></pre>
						</div>
					</div>
					<div class="prevention-card">
						<div class="prevention-priority">4</div>
						<h4>Limit Batching</h4>
						<p>Restrict batch size to 5-10 operations. Implement per-operation rate limiting.</p>
						<div class="code-block mini">
							<pre><code>{`if (req.body.length > 5) reject()`}</code></pre>
						</div>
					</div>
					<div class="prevention-card">
						<div class="prevention-priority">5</div>
						<h4>Field Authorization</h4>
						<p>Check authorization in every resolver, not just authentication at the gateway.</p>
						<div class="code-block mini">
							<pre><code>{`if (context.user.id !== id) throw Forbidden`}</code></pre>
						</div>
					</div>
					<div class="prevention-card">
						<div class="prevention-priority">6</div>
						<h4>Parameterized Queries</h4>
						<p>Never use template literals in database queries. Use parameterized queries.</p>
						<div class="code-block mini">
							<pre><code>{`db.query('...WHERE id = $1', [id])`}</code></pre>
						</div>
					</div>
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

		<!-- Related -->
		<section class="article-section">
			<h2>Related content</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">The resolver injection attack that affects GraphQL APIs</p>
				</a>
				<a href="/kb/security/vulnerabilities/nosql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">NoSQL Injection</div>
					<p class="related-card-description">MongoDB and Firestore injection in GraphQL resolvers</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-rate-limiting/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Rate Limiting</div>
					<p class="related-card-description">Why batching attacks bypass traditional rate limits</p>
				</a>
				<a href="/kb/security/vulnerabilities/broken-access-control/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Broken Access Control</div>
					<p class="related-card-description">Authorization bypass and BOLA in GraphQL</p>
				</a>
				<a href="/kb/security/vulnerabilities/sensitive-data-exposure/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Sensitive Data Exposure</div>
					<p class="related-card-description">When introspection reveals too much</p>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">Secure Vibe Coding Guide</div>
					<p class="related-card-description">Comprehensive security for AI-assisted development</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Scan your GraphQL API for vulnerabilities</h2>
			<p>Check for introspection leaks, missing limits, and resolver injection in your vibe coded GraphQL API.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Try Vibeship Scanner
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
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	/* Data Source Attribution */
	.data-source {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		margin: 0.5rem 0 1.5rem;
	}

	.data-source a {
		color: var(--text-secondary);
	}

	/* Attack Vectors */
	.attack-vector {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.attack-vector h3 {
		margin: 0 0 0.75rem;
		font-size: 1.0625rem;
		color: var(--text-primary);
	}

	.attack-vector > p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.attack-vector > p:last-of-type {
		margin-bottom: 0;
	}

	/* Tool Patterns Box */
	.tool-patterns-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.tool-patterns-box h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
	}

	/* Reason List */
	.reason-list {
		list-style: none;
		padding: 0;
		margin: 1rem 0 0;
	}

	.reason-list li {
		padding: 0.5rem 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.reason-list strong {
		color: var(--text-primary);
	}

	/* Consequences List */
	.consequences-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.consequences-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.consequences-list li:last-child {
		border-bottom: none;
	}

	.consequences-list strong {
		color: var(--text-primary);
	}

	/* CTA Box */
	.cta-box {
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		padding: 1.5rem;
		text-align: center;
		margin: 2rem 0;
	}

	.cta-box p {
		margin: 0 0 1rem;
		color: var(--text-primary);
	}

	/* Fix Sections */
	.fix-section {
		margin: 2rem 0;
	}

	.fix-section h3 {
		margin-bottom: 0.75rem;
	}

	.fix-section h4 {
		margin: 1.5rem 0 0.75rem;
		font-size: 1rem;
		color: var(--text-primary);
	}

	/* Code Comparison */
	.code-comparison {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
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

	/* Prevention Grid */
	.prevention-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-top: 1rem;
	}

	.prevention-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
		position: relative;
	}

	.prevention-priority {
		position: absolute;
		top: -0.5rem;
		left: -0.5rem;
		width: 1.5rem;
		height: 1.5rem;
		background: var(--purple);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.prevention-card h4 {
		margin: 0 0 0.5rem;
		font-size: 0.9375rem;
		color: var(--text-primary);
	}

	.prevention-card p {
		margin: 0 0 0.75rem;
		font-size: 0.8125rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.code-block.mini {
		margin: 0;
	}

	.code-block.mini pre {
		padding: 0.75rem;
		font-size: 0.75rem;
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

	/* Related Grid */
	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}

	.related-card {
		padding: 1.25rem;
	}

	.related-card-category {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.25rem;
	}

	.related-card-title {
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
	}

	.related-card-description {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin: 0;
		line-height: 1.5;
	}

	/* Final CTA */
	.final-cta {
		text-align: center;
		padding: 3rem 2rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		margin-top: 3rem;
	}

	.final-cta h2 {
		margin-bottom: 0.75rem;
	}

	.final-cta p {
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.prevention-grid {
			grid-template-columns: 1fr;
		}

		.related-grid {
			grid-template-columns: 1fr;
		}

		.faq-item h3 {
			font-size: 1rem;
		}
	}
</style>
