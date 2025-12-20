<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Supabase Cursor Rules: RLS, Auth & Database Security Guide',
		description: 'Production-ready cursor rules for Supabase. Copy-paste .cursorrules for Row Level Security, auth patterns, and database queries. Prevent the vulnerabilities AI tools generate.',
		url: '/kb/prompts/supabase-cursor-rules/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Supabase Cursor Rules' }
	];

	// FAQ data
	const faqs = [
		{
			question: 'What cursor rules are essential for Supabase projects?',
			answer: 'Three critical areas: (1) Row Level Security enforcement - never bypass RLS with service role on client, (2) Auth patterns - use getUser() not getSession() for server validation, (3) Client vs server Supabase client usage. The template in this guide covers all essential patterns.'
		},
		{
			question: 'Why does AI-generated Supabase code often have security issues?',
			answer: 'AI tools learn from tutorials that often skip security for simplicity. They generate code that works but uses service_role keys in browsers, bypasses RLS, or trusts client-side session data. Cursor rules prevent these patterns by establishing secure defaults.'
		},
		{
			question: 'What is the difference between anon key and service_role key?',
			answer: 'The anon key respects Row Level Security - queries only return data the user is allowed to see. The service_role key bypasses ALL RLS and has full database access. Never expose service_role to browsers. Use anon key for client code, service_role only in trusted server environments.'
		},
		{
			question: 'Should I use getSession() or getUser() for authentication?',
			answer: 'Use getUser() for server-side auth validation. getSession() reads from cookies which can be spoofed. getUser() makes a request to Supabase to verify the token is valid. For client-side display, getSession() is fine, but server operations must use getUser().'
		},
		{
			question: 'How do I structure RLS policies in cursor rules?',
			answer: 'Include examples of common RLS patterns: users reading own data (auth.uid() = user_id), public read with authenticated write, and role-based access. Show both the SQL policy and the expected query behavior so Cursor understands the security model.'
		},
		{
			question: 'Can I use raw SQL with Supabase in cursor rules?',
			answer: 'Yes, but with strict rules. Use Supabase query builder for most operations - it prevents SQL injection. If you must use raw SQL via rpc(), always use parameterized queries and validate inputs with Zod first. Never interpolate user input into SQL strings.'
		}
	];

	// Rule sections for navigation
	const ruleSections = [
		{ name: 'RLS Enforcement', description: 'Row Level Security patterns' },
		{ name: 'Auth Patterns', description: 'Client vs server authentication' },
		{ name: 'Client Setup', description: 'Browser vs server clients' },
		{ name: 'Database Queries', description: 'Safe query patterns' },
		{ name: 'Storage Rules', description: 'File upload security' },
		{ name: 'Edge Functions', description: 'Serverless function patterns' }
	];

	// Common mistakes
	const commonMistakes = [
		{
			mistake: 'Using service_role in browser',
			fix: 'Only use anon key client-side, service_role in server only'
		},
		{
			mistake: 'Trusting getSession() for auth',
			fix: 'Use getUser() for server-side validation'
		},
		{
			mistake: 'Bypassing RLS accidentally',
			fix: 'Always use the correct client (anon vs service)'
		},
		{
			mistake: 'Raw SQL with user input',
			fix: 'Use query builder or parameterized rpc()'
		},
		{
			mistake: 'Missing RLS policies',
			fix: 'Enable RLS on every table, add explicit policies'
		},
		{
			mistake: 'Exposing user IDs from client',
			fix: 'Use auth.uid() in RLS, never trust client user_id'
		}
	];
</script>

<svelte:head>
	<title>{meta.title} | VibeShip</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<!-- Quick Answer -->
		<div class="quick-answer">
			<p>
				<strong>Supabase cursor rules</strong> must enforce Row Level Security, use the correct client (anon vs service_role), and validate auth with getUser() not getSession(). AI tools frequently generate insecure Supabase patterns - copy the template below to prevent them.
			</p>
		</div>

		<!-- Badge -->
		<span class="badge badge-supabase">Supabase</span>

		<h1>Supabase Cursor Rules: RLS, Auth & Database Security Guide</h1>

		<p class="intro">
			Supabase makes backend development fast, but its security model requires understanding Row Level Security, client types, and auth validation. Without proper cursor rules, AI tools generate code that bypasses RLS, exposes service keys, or trusts spoofable session data. This guide provides battle-tested rules for secure Supabase development.
		</p>

		<!-- Stats Row -->
		<div class="stats-row">
			<div class="stat-card">
				<div class="stat-number">6</div>
				<div class="stat-label">Rule Sections</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">100%</div>
				<div class="stat-label">Copy-Paste Ready</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">RLS</div>
				<div class="stat-label">Security Model</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">3</div>
				<div class="stat-label">Client Types</div>
			</div>
		</div>

		<!-- Rule Sections Overview -->
		<div class="sections-grid">
			{#each ruleSections as section}
				<div class="section-card">
					<div class="section-name">{section.name}</div>
					<div class="section-desc">{section.description}</div>
				</div>
			{/each}
		</div>

		<h2>Quick Start: Complete .cursorrules Template</h2>

		<p>
			Copy this entire template into your project root as <code>.cursorrules</code> or save as <code>.cursor/rules/supabase.md</code>. Works with Next.js, SvelteKit, and other frameworks.
		</p>

		<div class="code-block">
			<div class="code-header">
				<span class="code-title">.cursorrules (Complete Supabase Template)</span>
				<span class="code-lang">markdown</span>
			</div>
			<pre><code>{`# Supabase Cursor Rules

## Project Context

This project uses Supabase for authentication, database, and storage.

### Supabase Features Used
- Authentication (email/password, OAuth)
- PostgreSQL database with Row Level Security
- Storage for file uploads
- Edge Functions (optional)

### Key Directories
\`\`\`
lib/
├── supabase/
│   ├── client.ts        # Browser client (anon key)
│   ├── server.ts        # Server client (cookie-based)
│   └── admin.ts         # Admin client (service_role - server only!)
├── auth.ts              # Auth utilities
└── db/
    └── queries.ts       # Type-safe queries
\`\`\`

---

## Row Level Security (CRITICAL)

### RLS Must Be Enabled
EVERY table must have RLS enabled. No exceptions.

\`\`\`sql
-- Enable RLS on table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Without policies, RLS blocks ALL access (secure default)
\`\`\`

### Never Bypass RLS Accidentally
The service_role key bypasses ALL RLS. Only use it in trusted server contexts.

\`\`\`typescript
// CORRECT - Browser client respects RLS
import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!  // anon key = RLS enforced
)

// DANGEROUS - Never use service_role in browser
const supabase = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!)
// This bypasses ALL RLS - never expose to client
\`\`\`

### Common RLS Policy Patterns

Users can only read/write their own data:
\`\`\`sql
-- Select policy
CREATE POLICY "Users can view own data"
ON user_profiles FOR SELECT
USING (auth.uid() = user_id);

-- Insert policy
CREATE POLICY "Users can insert own data"
ON user_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Update policy
CREATE POLICY "Users can update own data"
ON user_profiles FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Delete policy
CREATE POLICY "Users can delete own data"
ON user_profiles FOR DELETE
USING (auth.uid() = user_id);
\`\`\`

Public read, authenticated write:
\`\`\`sql
-- Anyone can read
CREATE POLICY "Public read access"
ON posts FOR SELECT
USING (true);

-- Only authenticated users can insert
CREATE POLICY "Authenticated users can insert"
ON posts FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = author_id);
\`\`\`

### Trust auth.uid(), Not Client Data
NEVER trust user IDs from the client. Always use auth.uid() in policies:

\`\`\`sql
-- CORRECT - Uses auth.uid() from JWT
CREATE POLICY "Users see own posts"
ON posts FOR SELECT
USING (auth.uid() = author_id);

-- The policy automatically filters by authenticated user
-- No need to pass user_id from client
\`\`\`

---

## Authentication Patterns

### Server-Side Auth: Use getUser()
For server-side auth validation, ALWAYS use getUser(), not getSession().

\`\`\`typescript
// CORRECT - getUser() verifies the token with Supabase
const { data: { user }, error } = await supabase.auth.getUser()

if (!user) {
  throw new Error('Unauthorized')
}

// DANGEROUS - getSession() reads from cookies (can be spoofed)
const { data: { session } } = await supabase.auth.getSession()
// Session could be forged - don't trust for server operations
\`\`\`

### When to Use Each Method

| Method | Use Case | Security Level |
|--------|----------|----------------|
| getUser() | Server actions, API routes | High - validates with Supabase |
| getSession() | Client-side UI display | Low - reads local cookies |
| onAuthStateChange() | Client-side auth state | Low - for UI reactivity only |

### Protected Server Actions

\`\`\`typescript
// lib/auth.ts
import { createServerClient } from '@/lib/supabase/server'

export async function requireAuth() {
  const supabase = await createServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    throw new Error('Unauthorized')
  }

  return user
}

// Usage in Server Action
async function createPost(formData: FormData) {
  'use server'

  const user = await requireAuth()

  await supabase.from('posts').insert({
    title: formData.get('title'),
    author_id: user.id  // Use verified user ID
  })
}
\`\`\`

### Sign Out Properly
Always sign out on both client and server:

\`\`\`typescript
async function signOut() {
  const supabase = createBrowserClient(...)
  await supabase.auth.signOut()

  // Also clear server-side session
  await fetch('/api/auth/signout', { method: 'POST' })
}
\`\`\`

---

## Supabase Client Setup

### Three Client Types

1. **Browser Client** - For client-side code, uses anon key
2. **Server Client** - For server code, reads auth from cookies
3. **Admin Client** - For admin operations, bypasses RLS (server only!)

### Browser Client (React/Next.js Client Components)

\`\`\`typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
\`\`\`

### Server Client (Server Components, Actions, API Routes)

\`\`\`typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Handle in middleware
          }
        },
      },
    }
  )
}
\`\`\`

### Admin Client (Server-Only, Bypasses RLS)

\`\`\`typescript
// lib/supabase/admin.ts
// WARNING: This client bypasses ALL RLS
// Only use in trusted server contexts (webhooks, cron jobs, admin APIs)

import { createClient } from '@supabase/supabase-js'

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,  // Never expose this key
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
\`\`\`

### Never Do This

\`\`\`typescript
// DANGEROUS - service_role in client-side code
'use client'
import { createClient } from '@supabase/supabase-js'

// This exposes your admin key to browsers!
const supabase = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!)
\`\`\`

---

## Database Query Patterns

### Use Query Builder (Not Raw SQL)
The Supabase query builder prevents SQL injection:

\`\`\`typescript
// SAFE - Query builder is parameterized
const { data, error } = await supabase
  .from('posts')
  .select('id, title, author:users(name)')
  .eq('status', 'published')
  .order('created_at', { ascending: false })
  .limit(10)
\`\`\`

### Type-Safe Queries
Use generated types for type safety:

\`\`\`typescript
import { Database } from '@/lib/database.types'

type Post = Database['public']['Tables']['posts']['Row']

const { data } = await supabase
  .from('posts')
  .select('*')
  .returns<Post[]>()
\`\`\`

### Filtering Best Practices

\`\`\`typescript
// Multiple conditions
const { data } = await supabase
  .from('posts')
  .select('*')
  .eq('status', 'published')
  .gte('created_at', startDate)
  .lte('created_at', endDate)

// OR conditions
const { data } = await supabase
  .from('posts')
  .select('*')
  .or('status.eq.published,status.eq.featured')

// Full-text search
const { data } = await supabase
  .from('posts')
  .select('*')
  .textSearch('title', searchQuery)
\`\`\`

### If You Must Use Raw SQL

\`\`\`typescript
// Use rpc() with parameterized functions
const { data, error } = await supabase.rpc('search_posts', {
  search_term: userInput  // Passed as parameter, not interpolated
})

// The function is defined in Postgres:
// CREATE FUNCTION search_posts(search_term text)
// RETURNS SETOF posts AS $$
//   SELECT * FROM posts WHERE title ILIKE '%' || search_term || '%'
// $$ LANGUAGE sql SECURITY DEFINER;
\`\`\`

### Error Handling

\`\`\`typescript
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .single()

if (error) {
  if (error.code === 'PGRST116') {
    // No rows returned
    return null
  }
  throw new Error(\`Database error: \${error.message}\`)
}

return data
\`\`\`

---

## Storage Security

### Storage Policies Required
Like tables, storage buckets need RLS-style policies:

\`\`\`sql
-- Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload own files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public read of avatars
CREATE POLICY "Public avatar read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');
\`\`\`

### Upload Pattern

\`\`\`typescript
async function uploadAvatar(file: File) {
  const user = await requireAuth()

  const fileExt = file.name.split('.').pop()
  const filePath = \`\${user.id}/avatar.\${fileExt}\`

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      upsert: true,
      contentType: file.type
    })

  if (error) throw error
  return data.path
}
\`\`\`

### Validate File Types

\`\`\`typescript
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

async function uploadAvatar(file: File) {
  // Validate type
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type')
  }

  // Validate size
  if (file.size > MAX_SIZE) {
    throw new Error('File too large')
  }

  // Proceed with upload...
}
\`\`\`

---

## Edge Functions

### Authentication in Edge Functions

\`\`\`typescript
// supabase/functions/my-function/index.ts
import { createClient } from '@supabase/supabase-js'

Deno.serve(async (req) => {
  // Get auth header
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Create client with user's JWT
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    {
      global: {
        headers: { Authorization: authHeader }
      }
    }
  )

  // Verify the user
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    return new Response('Invalid token', { status: 401 })
  }

  // RLS is now enforced based on user
  const { data } = await supabase.from('posts').select('*')

  return Response.json(data)
})
\`\`\`

### Using Service Role in Edge Functions
Only use service_role when RLS must be bypassed (admin operations):

\`\`\`typescript
// For admin operations only
const adminClient = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// This bypasses RLS - use carefully
const { data } = await adminClient.from('users').select('*')
\`\`\`

---

## Environment Variables

### Required Variables

\`\`\`bash
# .env.local

# Public - safe for browser
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Private - server only
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # Never expose!
\`\`\`

### Never Hardcode Keys

\`\`\`typescript
// WRONG - hardcoded key
const supabase = createClient(
  'https://xxx.supabase.co',
  'eyJhbGciOiJIUzI1NiIs...'  // Never do this
)

// CORRECT - environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
\`\`\`

---

## Common Patterns

### Upsert (Insert or Update)

\`\`\`typescript
const { data, error } = await supabase
  .from('user_settings')
  .upsert({
    user_id: user.id,
    theme: 'dark',
    notifications: true
  }, {
    onConflict: 'user_id'  // Update if user_id exists
  })
\`\`\`

### Transactions (Use RPC)

\`\`\`typescript
// Define function in Postgres
// CREATE FUNCTION transfer_credits(from_id uuid, to_id uuid, amount int)
// RETURNS void AS $$
// BEGIN
//   UPDATE users SET credits = credits - amount WHERE id = from_id;
//   UPDATE users SET credits = credits + amount WHERE id = to_id;
// END;
// $$ LANGUAGE plpgsql SECURITY DEFINER;

const { error } = await supabase.rpc('transfer_credits', {
  from_id: fromUser.id,
  to_id: toUser.id,
  amount: 100
})
\`\`\`

### Realtime Subscriptions

\`\`\`typescript
const channel = supabase
  .channel('posts-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'posts',
      filter: \`author_id=eq.\${user.id}\`
    },
    (payload) => {
      console.log('Change:', payload)
    }
  )
  .subscribe()

// Cleanup
return () => supabase.removeChannel(channel)
\`\`\``}</code></pre>
		</div>

		<h2>Common Mistakes This Template Fixes</h2>

		<div class="mistakes-grid">
			{#each commonMistakes as item}
				<div class="mistake-card">
					<div class="mistake-problem">{item.mistake}</div>
					<div class="mistake-solution">{item.fix}</div>
				</div>
			{/each}
		</div>

		<h2>Understanding Supabase Security Model</h2>

		<p>
			Supabase security is built on Row Level Security (RLS) - a PostgreSQL feature that filters data at the database level. Understanding this model is critical for writing secure cursor rules.
		</p>

		<h3>How RLS Works</h3>

		<div class="concept-box">
			<p>
				When RLS is enabled on a table, PostgreSQL adds a filter to EVERY query automatically. If a policy says "users can only see their own data," then <code>SELECT * FROM posts</code> actually executes as <code>SELECT * FROM posts WHERE author_id = current_user_id</code>.
			</p>
		</div>

		<p>
			This means security is enforced at the database level, not the application level. Even if your code has bugs, the database won't return unauthorized data. But this only works if:
		</p>

		<ol>
			<li>RLS is enabled on every table</li>
			<li>Policies are correctly defined</li>
			<li>You're using the anon key (not service_role)</li>
		</ol>

		<h3>The Service Role Escape Hatch</h3>

		<p>
			The <code>service_role</code> key bypasses ALL RLS. It's the admin backdoor for operations like:
		</p>

		<ul>
			<li>Webhooks that need to modify any user's data</li>
			<li>Background jobs without user context</li>
			<li>Admin dashboards for support teams</li>
		</ul>

		<p>
			<strong>Never expose service_role to browsers.</strong> If it leaks, attackers have full database access.
		</p>

		<h3>Auth Validation Flow</h3>

		<div class="code-block">
			<div class="code-header">
				<span class="code-title">Correct Auth Validation Pattern</span>
				<span class="code-lang">typescript</span>
			</div>
			<pre><code>{`// Server-side: Always use getUser()
async function protectedAction(formData: FormData) {
  'use server'

  const supabase = await createServerClient()

  // 1. Verify user with Supabase (not just cookies)
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return { error: 'Unauthorized' }
  }

  // 2. User is verified - RLS will filter by auth.uid()
  const { data } = await supabase
    .from('posts')
    .select('*')
    // No need to filter by user_id - RLS does it

  return { data }
}`}</code></pre>
		</div>

		<h2>Framework-Specific Notes</h2>

		<h3>Next.js App Router</h3>

		<p>
			Use <code>@supabase/ssr</code> package for cookie-based auth. Server Components can access the server client directly. See our <a href="/kb/prompts/cursor-rules-nextjs/">Next.js Cursor Rules</a> for complete patterns.
		</p>

		<h3>SvelteKit</h3>

		<p>
			Use hooks for auth middleware. Create server client in <code>+page.server.ts</code> load functions. See our <a href="/kb/security/stacks/sveltekit-supabase/">SvelteKit + Supabase Security Guide</a>.
		</p>

		<h3>React (Vite)</h3>

		<p>
			For client-side only React apps, remember that ALL Supabase calls happen in the browser. RLS is your only protection - there's no server layer to add validation.
		</p>

		<h2>Combining with Other Rules</h2>

		<p>
			This Supabase template works alongside framework-specific rules. For a complete setup:
		</p>

		<div class="combine-grid">
			<a href="/kb/prompts/cursor-rules-nextjs/" class="combine-card">
				<div class="combine-name">+ Next.js Rules</div>
				<div class="combine-desc">Server Components, Server Actions</div>
			</a>
			<a href="/kb/prompts/cursor-rules-fullstack/" class="combine-card">
				<div class="combine-name">+ Full-Stack Rules</div>
				<div class="combine-desc">Complete multi-layer patterns</div>
			</a>
		</div>

		<!-- FAQ Section -->
		<section class="article-section">
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

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related Content</h2>
			<div class="related-grid">
				<a href="/kb/prompts/cursor-rules-nextjs/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js Cursor Rules</div>
					<p class="related-card-description">App Router patterns and security</p>
				</a>
				<a href="/kb/prompts/cursor-rules-fullstack/" class="card card-interactive related-card">
					<div class="related-card-category">Pillar Guide</div>
					<div class="related-card-title">Full-Stack Cursor Rules</div>
					<p class="related-card-description">Complete multi-layer patterns</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Security</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Stack-specific vulnerabilities</p>
				</a>
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">Cursor Rules Basics</div>
					<p class="related-card-description">Fundamentals of .cursorrules</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Security</div>
					<div class="related-card-title">SQL Injection Prevention</div>
					<p class="related-card-description">Database security patterns</p>
				</a>
				<a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="card card-interactive related-card">
					<div class="related-card-category">Pillar Guide</div>
					<div class="related-card-title">Secure Vibe Coding Guide</div>
					<p class="related-card-description">Ship fast without security nightmares</p>
				</a>
			</div>
		</section>
	</article>
</div>

<style>
	.intro {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin-bottom: 2rem;
		line-height: 1.7;
	}

	.badge-supabase {
		background: linear-gradient(135deg, #3ECF8E, #1c7c54);
		color: white;
		font-weight: 600;
	}

	.stats-row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.stat-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1.25rem;
		text-align: center;
	}

	.stat-number {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--green);
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-top: 0.25rem;
	}

	/* Sections Grid */
	.sections-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin: 1.5rem 0 2rem;
	}

	.section-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1rem;
	}

	.section-name {
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.section-desc {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Mistakes Grid */
	.mistakes-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.mistake-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--red);
		border-radius: 8px;
		padding: 1rem;
	}

	.mistake-problem {
		font-weight: 600;
		color: var(--red);
		margin-bottom: 0.5rem;
		font-size: 0.95rem;
	}

	.mistake-solution {
		color: var(--text-secondary);
		font-size: 0.875rem;
	}

	/* Concept Box */
	.concept-box {
		background: rgba(16, 185, 129, 0.1);
		border: 1px solid var(--green);
		border-radius: 8px;
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	.concept-box p {
		margin: 0;
	}

	/* Combine Grid */
	.combine-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.combine-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1.25rem;
		text-decoration: none;
		transition: border-color 0.2s;
	}

	.combine-card:hover {
		border-color: var(--green);
	}

	.combine-name {
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.combine-desc {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.stats-row {
			grid-template-columns: repeat(2, 1fr);
		}

		.sections-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.mistakes-grid,
		.combine-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 480px) {
		.sections-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
