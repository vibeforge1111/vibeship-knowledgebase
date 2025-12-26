<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'GraphQL DoS: Detect & Fix Guide',
		description: 'GraphQL DoS attacks exhaust server resources via nested queries and batching. Learn to implement depth limits, complexity analysis, and rate limiting.',
		url: '/kb/security/vulnerabilities/graphql-dos/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'GraphQL DoS' }
	];

	const faqs = [
		{
			question: 'What is GraphQL DoS?',
			answer: 'GraphQL DoS attacks exploit the flexible query nature of GraphQL to exhaust server resources. Attackers craft deeply nested queries, use circular relationships, or batch many queries together. A single malicious request can consume massive CPU/memory and crash your server.'
		},
		{
			question: 'How do I prevent GraphQL depth attacks?',
			answer: 'Implement query depth limiting. Set a maximum depth (typically 5-10 levels) and reject queries that exceed it. Libraries like graphql-depth-limit for Node.js or built-in options in Apollo Server make this straightforward.'
		},
		{
			question: 'What is query complexity analysis?',
			answer: 'Query complexity assigns a cost to each field based on how expensive it is to resolve. Complex fields (like lists or database lookups) cost more. The total query cost is calculated before execution. If it exceeds the limit, the query is rejected without running.'
		},
		{
			question: 'Should I disable GraphQL batching?',
			answer: 'Consider limiting rather than disabling. Batching is useful for legitimate clients. Set a maximum batch size (e.g., 10 queries) and apply rate limiting per batch, not per query. This allows normal use while preventing abuse.'
		},
		{
			question: 'How do circular references cause DoS?',
			answer: 'If User has Posts and Post has Author (a User), attackers can query: user { posts { author { posts { author... } } } }. Each level doubles the data fetched. 10 levels = 1024x amplification. Without depth limits, this crashes servers quickly.'
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

	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": meta.title,
		"description": meta.description,
		"author": {"@type": "Organization", "name": "VibeShip"},
		"publisher": {"@type": "Organization", "name": "VibeShip"}
	})}</script>`}

	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": faqs.map(faq => ({
			"@type": "Question",
			"name": faq.question,
			"acceptedAnswer": {"@type": "Answer", "text": faq.answer}
		}))
	})}</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-high">High Severity</span>
				<span class="badge">CWE-400</span>
				<span class="badge">OWASP A05</span>
			</div>
			<h1>GraphQL DoS in Vibe Coded Apps</h1>
			<p class="text-secondary">When one query can crash your entire server</p>
		</header>

		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>GraphQL's flexibility is also its weakness.</strong>
				Attackers can craft deeply nested queries or batch thousands of requests. Without limits, a single request can exhaust server resources. Fix: implement query depth limits (max 5-10), complexity analysis, and rate limiting per query.
			</p>
		</div>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">Depth</div>
				<div class="stat-label">Nested query attack</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Batch</div>
				<div class="stat-label">Multiple queries at once</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Circular</div>
				<div class="stat-label">Self-referencing types</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">1024x</div>
				<div class="stat-label">10-level amplification</div>
			</div>
		</div>

		<section class="article-section">
			<h2>What is GraphQL DoS?</h2>
			<p>
				GraphQL lets clients request exactly what they need. That flexibility becomes a weapon when attackers craft queries designed to consume maximum resources.
			</p>

			<div class="attack-types">
				<div class="attack-type">
					<h3>Depth Attack</h3>
					<div class="code-block">
						<pre><code>{`query DeepNesting {
  user {
    posts {
      author {
        posts {
          author {
            posts {
              # ...20 more levels
            }
          }
        }
      }
    }
  }
}`}</code></pre>
					</div>
					<p>Each level multiplies database queries. 20 levels = exponential load.</p>
				</div>

				<div class="attack-type">
					<h3>Batching Attack</h3>
					<div class="code-block">
						<pre><code>{`[
  { "query": "{ user(id: 1) { email } }" },
  { "query": "{ user(id: 2) { email } }" },
  // ...10,000 more queries in one request
]`}</code></pre>
					</div>
					<p>One HTTP request, thousands of GraphQL operations.</p>
				</div>

				<div class="attack-type">
					<h3>Alias Attack</h3>
					<div class="code-block">
						<pre><code>{`query AliasFlood {
  u1: user(id: 1) { email }
  u2: user(id: 2) { email }
  u3: user(id: 3) { email }
  # ...1000 aliases
}`}</code></pre>
					</div>
					<p>Aliases let attackers multiply fields within a single query.</p>
				</div>
			</div>
		</section>

		<section class="article-section">
			<h2>Why vibe coded apps are vulnerable</h2>
			<p>
				AI generates GraphQL schemas fast. It creates the types, resolvers, and relationships. But it doesn't add the security layer that protects against abuse.
			</p>

			<div class="code-comparison">
				<div class="code-block code-bad">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable - No query limits</span>
						<span class="code-label-bad">DoS possible</span>
					</div>
					<pre><code>{`// Apollo Server without protections
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // No depth limit
  // No complexity limit
  // No rate limiting
  // Batching enabled by default
});

// Schema with circular references
type User {
  id: ID!
  posts: [Post!]!  # Can have thousands
}

type Post {
  id: ID!
  author: User!    # Back to User
  comments: [Comment!]!
}

type Comment {
  author: User!    # Back to User again
}`}</code></pre>
				</div>
				<div class="code-block code-good">
					<div class="code-block-header">
						<span class="code-block-lang">Secure - Protected GraphQL</span>
						<span class="code-label-good">Fixed</span>
					</div>
					<pre><code>{`import depthLimit from 'graphql-depth-limit';
import { createComplexityLimitRule } from 'graphql-validation-complexity';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [
    // Limit query depth to 5 levels
    depthLimit(5),
    // Limit query complexity
    createComplexityLimitRule(1000, {
      scalarCost: 1,
      objectCost: 10,
      listFactor: 20,
    })
  ],
  // Limit batching
  allowBatchedHttpRequests: true,
  plugins: [{
    async requestDidStart() {
      return {
        async didResolveOperation({ request }) {
          // Reject batches > 10 queries
          if (Array.isArray(request.query) && request.query.length > 10) {
            throw new Error('Batch limit exceeded');
          }
        }
      };
    }
  }]
});`}</code></pre>
				</div>
			</div>
		</section>

		<section class="article-section">
			<h2>How to detect GraphQL DoS vulnerabilities</h2>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Testing for GraphQL DoS</span>
				</div>
				<pre><code>{`# Test depth limit
curl -X POST https://api.target.com/graphql \\
  -H "Content-Type: application/json" \\
  -d '{"query": "{ user { posts { author { posts { author { id } } } } } }"}'
# If 20 levels works: NO DEPTH LIMIT

# Test batching
curl -X POST https://api.target.com/graphql \\
  -H "Content-Type: application/json" \\
  -d '[{"query": "{ __typename }"},{"query": "{ __typename }"},...repeat 100x]'
# If all execute: NO BATCH LIMIT

# Test aliases
curl -X POST https://api.target.com/graphql \\
  -H "Content-Type: application/json" \\
  -d '{"query": "{ a1:user(id:1){id} a2:user(id:2){id} ...a100 }"}'
# Monitor server resources during test`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>GraphQL APIs need special security testing.</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your GraphQL API
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<section class="article-section">
			<h2>How to fix GraphQL DoS</h2>

			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span class="fix-prompt-label">AI Fix Prompt</span>
					<button class="copy-btn" class:copied onclick={copyPrompt}>
						{copied ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<div class="fix-prompt-content" id="ai-fix-prompt">{`Add DoS protections to my GraphQL API.

## Required protections

### 1. Query depth limit
\`\`\`typescript
import depthLimit from 'graphql-depth-limit';

// Apollo Server
validationRules: [depthLimit(5)]

// Or manually check depth before execution
\`\`\`

### 2. Query complexity limit
\`\`\`typescript
import { createComplexityLimitRule } from 'graphql-validation-complexity';

validationRules: [
  createComplexityLimitRule(1000, {
    scalarCost: 1,
    objectCost: 10,
    listFactor: 20  // Lists multiply cost
  })
]
\`\`\`

### 3. Batch limiting
\`\`\`typescript
// Limit batch size
if (Array.isArray(queries) && queries.length > 10) {
  throw new Error('Maximum 10 queries per batch');
}
\`\`\`

### 4. Rate limiting
\`\`\`typescript
import rateLimit from 'express-rate-limit';

app.use('/graphql', rateLimit({
  windowMs: 60 * 1000,
  max: 100  // 100 requests per minute
}));
\`\`\`

### 5. Query timeout
\`\`\`typescript
// Add timeout to resolvers
const timeoutPromise = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('Query timeout')), 5000)
);

return Promise.race([resolver(), timeoutPromise]);
\`\`\``}</div>
			</div>

			<div class="protection-layers">
				<div class="layer">
					<span class="layer-name">Depth Limit</span>
					<span class="layer-value">Max 5-10 levels</span>
				</div>
				<div class="layer">
					<span class="layer-name">Complexity</span>
					<span class="layer-value">Max 1000 points</span>
				</div>
				<div class="layer">
					<span class="layer-name">Batch Size</span>
					<span class="layer-value">Max 10 queries</span>
				</div>
				<div class="layer">
					<span class="layer-name">Rate Limit</span>
					<span class="layer-value">100 req/min</span>
				</div>
				<div class="layer">
					<span class="layer-name">Timeout</span>
					<span class="layer-value">5 seconds</span>
				</div>
			</div>
		</section>

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

		<section class="article-section">
			<h2>Related content</h2>
			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/graphql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">GraphQL Injection</div>
					<p class="related-card-description">Query manipulation attacks</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-rate-limiting/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Rate Limiting</div>
					<p class="related-card-description">API abuse prevention</p>
				</a>
				<a href="/kb/security/vulnerabilities/redos/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">ReDoS</div>
					<p class="related-card-description">Resource exhaustion via regex</p>
				</a>
			</div>
		</section>

		<div class="final-cta">
			<h2>GraphQL power needs limits</h2>
			<p>One query shouldn't crash your server.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan for DoS vulnerabilities
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>
	</article>
</div>

<style>
	.badge-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.attack-types {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin: 1.5rem 0;
	}

	.attack-type h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
	}

	.attack-type p {
		margin: 0.75rem 0 0;
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

	.code-comparison {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-bad { border-left: 3px solid var(--red); }
	.code-good { border-left: 3px solid var(--green); }

	.code-label-bad, .code-label-good {
		font-size: 0.6875rem;
		padding: 0.125rem 0.5rem;
		text-transform: uppercase;
		font-weight: 600;
	}

	.code-label-bad { color: var(--red); background: rgba(255, 107, 107, 0.1); }
	.code-label-good { color: var(--green); background: rgba(0, 255, 136, 0.1); }

	.cta-box {
		background: var(--bg-secondary);
		border: 1px solid var(--green-dim);
		padding: 1.5rem;
		text-align: center;
		margin: 2rem 0;
	}

	.cta-box p { margin: 0 0 1rem; }

	.protection-layers {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1.5rem 0;
	}

	.layer {
		display: flex;
		justify-content: space-between;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 0.75rem 1rem;
	}

	.layer-name { font-weight: 600; }
	.layer-value { color: var(--green); font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; }

	.faq-list { margin-top: 1rem; }

	.faq-item {
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--border);
	}

	.faq-item:last-child { border-bottom: none; }

	.faq-item h3 {
		font-family: 'Inter', sans-serif;
		font-size: 1.0625rem;
		font-weight: 600;
		margin: 0 0 0.5rem;
	}

	.faq-item p {
		margin: 0;
		font-size: 0.9375rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	.final-cta {
		text-align: center;
		padding: 3rem 2rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		margin-top: 3rem;
	}

	.final-cta h2 { margin-bottom: 0.75rem; }
	.final-cta p { color: var(--text-secondary); margin-bottom: 1.5rem; }
</style>
