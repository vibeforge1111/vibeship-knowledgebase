<script>
  import { onMount } from 'svelte';

  let defined = $state(false);
  let showFixPrompt = $state(false);
  let copySuccess = $state(false);
  let expandedFaq = $state(null);

  onMount(() => {
    defined = true;
  });

  const pageData = {
    title: "CSRF: Why AI Tools Skip This Critical Protection",
    description: "CSRF lets attackers trick users into performing unwanted actions. Learn why Next.js Server Actions have built-in protection but custom API routes don't.",
    slug: "csrf",
    cwe: "CWE-352",
    cweUrl: "https://cwe.mitre.org/data/definitions/352.html",
    owasp: "CSRF Prevention",
    owaspName: "CSRF Prevention Cheat Sheet",
    owaspUrl: "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html",
    severity: "High",
    publishedAt: "2025-12-17",
    updatedAt: "2025-12-17"
  };

  const faqItems = [
    {
      question: "What is CSRF and how does it work?",
      answer: "CSRF (Cross-Site Request Forgery) tricks your browser into making requests you didn't intend. An attacker creates a malicious page with a hidden form that submits to a legitimate site where you're logged in. Your browser automatically includes your cookies, so the request appears to come from you. Per OWASP, this allows attackers to perform actions using your authenticated session."
    },
    {
      question: "Do Next.js Server Actions need CSRF protection?",
      answer: "No, Server Actions have built-in CSRF protection. According to Next.js documentation, they enforce POST-only requests, validate Origin headers, use encrypted action IDs, and rely on SameSite cookies. You don't need to add CSRF tokens to Server Actions. However, custom Route Handlers (/api routes) do NOT have this protection and need manual implementation."
    },
    {
      question: "How do I add CSRF protection to my API routes?",
      answer: "For Next.js Route Handlers, you have three options: 1) Validate the Origin header against an allowlist, 2) Implement CSRF tokens using a library like csrf-csrf, or 3) Convert to Server Actions which have built-in protection. Origin validation is simplest for most cases. The OWASP CSRF Prevention Cheat Sheet recommends the Synchronizer Token Pattern for complex apps."
    },
    {
      question: "Does React protect against CSRF?",
      answer: "React itself doesn't protect against CSRF - that's a server-side concern. However, if you're using Next.js Server Actions, they have built-in CSRF protection. For custom API endpoints or other frameworks, you need to implement protection manually. Modern browsers' SameSite cookie defaults provide partial protection but aren't a complete solution."
    },
    {
      question: "Is SameSite cookie enough for CSRF protection?",
      answer: "SameSite=Lax (the browser default since 2020) provides partial CSRF protection by blocking cross-site POST requests that include cookies. However, it's not complete: GET requests can still leak data, subdomains may be trusted, and some scenarios bypass it. For sensitive operations like financial transactions, add explicit CSRF protection using tokens or Origin validation."
    }
  ];

  function toggleFaq(index) {
    expandedFaq = expandedFaq === index ? null : index;
  }

  const aiFixPrompt = `Review my Next.js code for CSRF vulnerabilities:

1. IDENTIFY ROUTE HANDLERS WITH MUTATIONS: Find all app/api/**/route.ts files with POST, PUT, DELETE, or PATCH handlers that modify data.
   - Pattern: export async function POST/PUT/DELETE/PATCH
   - These routes need CSRF protection if they're not Server Actions

2. CHECK FOR CSRF PROTECTION: For each mutating Route Handler, verify one of:
   - Origin header validation against allowlist
   - CSRF token validation via middleware
   - The route is read-only (GET) and doesn't mutate data

3. SERVER ACTIONS ARE SAFE: Files with 'use server' at the top have built-in CSRF protection from Next.js - no changes needed.

4. CHECK COOKIE SETTINGS: Verify authentication cookies use secure settings:
   - SameSite: 'Strict' or 'Lax' (not 'None' without good reason)
   - Secure: true (required for HTTPS)
   - HttpOnly: true (prevents JS access)

5. FORM SUBMISSIONS: Check that forms either:
   - Use Server Actions (action={serverAction})
   - Send requests to CSRF-protected Route Handlers
   - Include CSRF tokens in headers

For each vulnerable Route Handler found:
- Show the current code with file path
- Explain why it's vulnerable to CSRF
- Recommend: Origin validation (simplest), CSRF tokens, or conversion to Server Action
- Provide secure implementation code`;

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(aiFixPrompt);
      copySuccess = true;
      setTimeout(() => copySuccess = false, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
</script>

<svelte:head>
  <title>{pageData.title} | vibeship</title>
  <meta name="description" content={pageData.description} />
  <meta name="keywords" content="CSRF protection, cross-site request forgery, Next.js CSRF, Server Actions security, CSRF token, SameSite cookies" />
  <link rel="canonical" href="https://vibeship.co/kb/security/vulnerabilities/csrf/" />

  <meta property="og:title" content={pageData.title} />
  <meta property="og:description" content={pageData.description} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://vibeship.co/kb/security/vulnerabilities/csrf/" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageData.title} />
  <meta name="twitter:description" content={pageData.description} />

  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": pageData.title,
    "description": pageData.description,
    "author": {
      "@type": "Organization",
      "name": "vibeship",
      "url": "https://vibeship.co"
    },
    "publisher": {
      "@type": "Organization",
      "name": "vibeship",
      "url": "https://vibeship.co"
    },
    "datePublished": pageData.publishedAt,
    "dateModified": pageData.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://vibeship.co/kb/security/vulnerabilities/csrf/"
    },
    "about": {
      "@type": "Thing",
      "name": "Cross-Site Request Forgery",
      "description": "CSRF vulnerability and protection patterns"
    }
  })}</script>`}

  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  })}</script>`}

  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://vibeship.co"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Knowledge Base",
        "item": "https://vibeship.co/kb/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Security",
        "item": "https://vibeship.co/kb/security/"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Vulnerabilities",
        "item": "https://vibeship.co/kb/security/vulnerabilities/"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "CSRF",
        "item": "https://vibeship.co/kb/security/vulnerabilities/csrf/"
      }
    ]
  })}</script>`}
</svelte:head>

<div class="vulnerability-page">
  <nav class="breadcrumb">
    <a href="/">Home</a>
    <span class="separator">/</span>
    <a href="/kb">Knowledge Base</a>
    <span class="separator">/</span>
    <a href="/kb/security">Security</a>
    <span class="separator">/</span>
    <a href="/kb/security/vulnerabilities">Vulnerabilities</a>
    <span class="separator">/</span>
    <span class="current">CSRF</span>
  </nav>

  <header class="page-header">
    <div class="meta-badges">
      <a href={pageData.cweUrl} target="_blank" rel="noopener noreferrer" class="badge cwe">{pageData.cwe}</a>
      <a href={pageData.owaspUrl} target="_blank" rel="noopener noreferrer" class="badge owasp">{pageData.owasp}</a>
      <span class="badge severity high">{pageData.severity}</span>
    </div>
    <h1>{pageData.title}</h1>
    <p class="subtitle">
      CSRF tricks your browser into making requests you didn't intend. Next.js Server Actions are protected, but AI-generated Route Handlers typically aren't.
    </p>
  </header>

  <div class="quick-answer">
    <strong>Quick Answer:</strong> CSRF (Cross-Site Request Forgery) tricks users into performing unwanted actions on sites where they're logged in. Next.js Server Actions have built-in protection, but custom API routes don't. AI tools typically generate vulnerable Route Handlers because CSRF protection isn't needed for code to "work."
  </div>

  <section class="content-section">
    <h2>What is CSRF?</h2>
    <p>
      CSRF (Cross-Site Request Forgery) is an attack where a malicious website tricks your browser into making requests to a legitimate site where you're authenticated. Your browser automatically includes your session cookies, so the target site thinks the request came from you.
    </p>
    <p>
      Think of it like someone forging your signature on a check while you're logged into your bank. The bank sees your valid credentials and processes the transaction - even though you never intended to make it.
    </p>
    <p>
      According to <a href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/" target="_blank" rel="noopener noreferrer">OWASP's A01:2021 Broken Access Control</a>, CSRF falls under this category because it allows attackers to bypass access controls by exploiting authenticated user sessions.
    </p>
  </section>

  <section class="content-section">
    <h2>How Do CSRF Attacks Work?</h2>
    <p>
      Here's a typical CSRF attack scenario:
    </p>
    <ol>
      <li><strong>User logs into</strong> legitimate-bank.com and gets a session cookie</li>
      <li><strong>User visits</strong> malicious-site.com (via phishing email or ad)</li>
      <li><strong>Malicious site contains</strong> a hidden form that POSTs to legitimate-bank.com/transfer</li>
      <li><strong>Form auto-submits</strong> when the page loads</li>
      <li><strong>Browser includes</strong> the user's bank session cookies automatically</li>
      <li><strong>Bank processes</strong> the transfer - user never knew it happened</li>
    </ol>
    <p>
      The attack works because browsers automatically include cookies for any request to a domain, regardless of which site initiated the request. Per the <a href="https://owasp.org/www-community/attacks/csrf" target="_blank" rel="noopener noreferrer">OWASP CSRF attack documentation</a>, this is why cookie-based authentication needs additional protection.
    </p>
  </section>

  <section class="content-section">
    <h2>What Are Modern Browser Protections?</h2>
    <p>
      Modern browsers provide partial CSRF protection through SameSite cookies. According to <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value" target="_blank" rel="noopener noreferrer">MDN's SameSite documentation</a>, here's how the settings work:
    </p>
    <ul>
      <li><strong>SameSite=Lax</strong> (browser default since 2020): Blocks cross-site POST requests with cookies. Allows GET requests for navigation.</li>
      <li><strong>SameSite=Strict</strong>: Blocks ALL cross-site requests with cookies. Most secure but can break legitimate flows.</li>
      <li><strong>SameSite=None</strong>: No protection. Must be paired with Secure flag (HTTPS only).</li>
    </ul>
    <p>
      <strong>Important:</strong> SameSite=Lax helps but isn't complete protection. GET requests can still leak sensitive data, and subdomains may bypass restrictions. For sensitive operations in vibe coded apps, add explicit CSRF protection.
    </p>
  </section>

  <section class="content-section">
    <h2>How Do Next.js Server Actions Handle CSRF?</h2>
    <p>
      According to <a href="https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#security" target="_blank" rel="noopener noreferrer">Next.js documentation</a>, Server Actions have built-in CSRF protection through multiple mechanisms:
    </p>
    <ul>
      <li><strong>POST-only:</strong> Server Actions only accept POST requests, preventing GET-based attacks</li>
      <li><strong>Origin validation:</strong> Validates the Origin header matches your domain</li>
      <li><strong>Encrypted action IDs:</strong> Action endpoints aren't enumerable or guessable</li>
      <li><strong>SameSite cookies:</strong> Works with default browser protections</li>
    </ul>

    <div class="info-box safe">
      <h4>Server Actions Are Safe</h4>
      <p>If you're using <code>'use server'</code> functions in Next.js App Router, you don't need to add CSRF tokens. The framework handles it.</p>
    </div>

    <div class="code-example">
      <div class="code-header secure">
        <span class="status-badge">SECURE</span>
        <span>Server Action with built-in CSRF protection</span>
      </div>
      <pre><code>{`// app/actions/transfer.ts
'use server'

import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function transferMoney(formData: FormData) {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const amount = formData.get('amount') as string
  const toAccount = formData.get('toAccount') as string

  // Server Action has built-in CSRF protection
  // No additional tokens needed!
  await executeTransfer(session.user.id, toAccount, parseFloat(amount))

  revalidatePath('/account')
  return { success: true }
}

// Usage in component:
// <form action={transferMoney}>
//   <input name="amount" />
//   <input name="toAccount" />
//   <button type="submit">Transfer</button>
// </form>`}</code></pre>
    </div>
  </section>

  <section class="content-section">
    <h2>Why Do AI Tools Generate Vulnerable Routes?</h2>
    <p>
      When you ask <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, or <a href="/kb/vibe-coding-tools/bolt/">Bolt</a> to "create an API endpoint," they generate Route Handlers, not Server Actions. Route Handlers are more flexible and familiar from Express.js patterns, but they lack Server Actions' built-in CSRF protection.
    </p>
    <p>
      The problem: AI-generated code works without CSRF protection. You can test it, deploy it, and it functions correctly - until an attacker exploits it. Vibe coders often don't realize the gap because CSRF attacks don't surface during normal development.
    </p>
    <p>
      This is different from <a href="/kb/security/vulnerabilities/missing-auth/">missing authentication</a> which fails obviously. CSRF vulnerabilities are silent - the code works, it just works for attackers too.
    </p>
  </section>

  <section class="content-section">
    <h2>Vulnerable vs Secure: Route Handler Examples</h2>

    <div class="code-example">
      <div class="code-header vulnerable">
        <span class="status-badge">VULNERABLE</span>
        <span>AI-generated Route Handler - no CSRF protection</span>
      </div>
      <pre><code>{`// app/api/transfer/route.ts
// VULNERABLE: AI generates this without CSRF protection
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { amount, toAccount } = await request.json()

  // Attacker can trigger this from malicious-site.com!
  // Browser will include session cookies automatically
  await transferMoney(session.user.id, toAccount, amount)

  return NextResponse.json({ success: true })
}`}</code></pre>
    </div>

    <div class="code-example">
      <div class="code-header secure">
        <span class="status-badge">SECURE</span>
        <span>Route Handler with Origin validation</span>
      </div>
      <pre><code>{`// app/api/transfer/route.ts
// SECURE: Validate Origin header
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getServerSession } from 'next-auth'

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_APP_URL,
  'https://yourdomain.com'
].filter(Boolean)

export async function POST(request: Request) {
  const headersList = headers()
  const origin = headersList.get('origin')

  // CSRF Protection: Reject requests from unknown origins
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { amount, toAccount } = await request.json()
  await transferMoney(session.user.id, toAccount, amount)

  return NextResponse.json({ success: true })
}`}</code></pre>
    </div>
  </section>

  <section class="content-section">
    <h2>Option: CSRF Tokens with Middleware</h2>
    <p>
      For complex applications requiring stricter protection, implement CSRF tokens using middleware. The <a href="https://www.npmjs.com/package/csrf-csrf" target="_blank" rel="noopener noreferrer">csrf-csrf</a> library (not the deprecated csurf) provides a double-submit cookie pattern.
    </p>

    <div class="code-example">
      <div class="code-header secure">
        <span class="status-badge">SECURE</span>
        <span>CSRF token middleware implementation</span>
      </div>
      <pre><code>{`// middleware.ts
import { doubleCsrf } from 'csrf-csrf'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const { generateToken, validateRequest } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET!,
  cookieName: '__Host-csrf',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    secure: true,
  },
})

export async function middleware(request: NextRequest) {
  // Skip CSRF for Server Actions (built-in protection)
  if (request.headers.get('next-action')) {
    return NextResponse.next()
  }

  // Validate CSRF for mutating requests to API routes
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      const isValid = await validateRequest(request)
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid CSRF token' },
          { status: 403 }
        )
      }
    }
  }

  return NextResponse.next()
}

// app/api/csrf/route.ts - Token endpoint
export async function GET() {
  const token = generateToken()
  return NextResponse.json({ token })
}`}</code></pre>
    </div>

    <p>
      <strong>When to use tokens:</strong> Financial transactions, account deletion, admin operations, or any action with irreversible consequences. For most CRUD operations in vibe coded apps, Origin validation is sufficient.
    </p>
  </section>

  <section class="content-section">
    <h2>When Should You Use Each Approach?</h2>
    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th>Approach</th>
            <th>Complexity</th>
            <th>Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Server Actions</strong></td>
            <td class="cell-safe">Low</td>
            <td>Most mutations - forms, data updates. Built-in protection.</td>
          </tr>
          <tr>
            <td><strong>Origin Validation</strong></td>
            <td class="cell-safe">Low</td>
            <td>Route Handlers that must remain as APIs. Simple to add.</td>
          </tr>
          <tr>
            <td><strong>CSRF Tokens</strong></td>
            <td class="cell-warning">Medium</td>
            <td>High-value operations, financial apps, compliance requirements.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      <strong>Best practice for vibe coders:</strong> Use Server Actions for mutations whenever possible. They're simpler, safer, and optimized for Next.js. Only use Route Handlers when you need streaming, webhooks, or third-party integrations - and add Origin validation.
    </p>
  </section>

  <section class="content-section">
    <h2>AI Fix Prompt for CSRF Vulnerabilities</h2>
    <p>
      Copy this prompt into <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> or <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> to scan for CSRF vulnerabilities:
    </p>

    <button class="expand-button" onclick={() => showFixPrompt = !showFixPrompt}>
      {showFixPrompt ? 'Hide' : 'Show'} AI Fix Prompt
    </button>

    {#if showFixPrompt}
      <div class="fix-prompt">
        <div class="fix-prompt-header">
          <span>AI Security Audit Prompt - CSRF</span>
          <button class="copy-button" onclick={copyPrompt}>
            {copySuccess ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre><code>{aiFixPrompt}</code></pre>
      </div>
    {/if}
  </section>

  <section class="faq-section">
    <h2>Frequently Asked Questions</h2>
    {#each faqItems as item, index}
      <div class="faq-item">
        <button
          class="faq-question"
          onclick={() => toggleFaq(index)}
          aria-expanded={expandedFaq === index}
        >
          <span>{item.question}</span>
          <span class="faq-icon">{expandedFaq === index ? '-' : '+'}</span>
        </button>
        {#if expandedFaq === index}
          <div class="faq-answer">
            <p>{item.answer}</p>
          </div>
        {/if}
      </div>
    {/each}
  </section>

  <section class="content-section">
    <h2>Related Vulnerabilities</h2>
    <div class="related-grid">
      <a href="/kb/security/vulnerabilities/missing-auth/" class="related-card">
        <h3>Missing Authentication</h3>
        <p>Routes without any auth checks</p>
      </a>
      <a href="/kb/security/vulnerabilities/xss/" class="related-card">
        <h3>XSS</h3>
        <p>Often paired with CSRF in attack chains</p>
      </a>
      <a href="/kb/security/vulnerabilities/idor/" class="related-card">
        <h3>IDOR</h3>
        <p>Related authorization vulnerability</p>
      </a>
      <a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="related-card">
        <h3>Hardcoded Secrets</h3>
        <p>CSRF secrets exposed in code</p>
      </a>
    </div>
  </section>

  <section class="content-section">
    <h2>External Resources</h2>
    <ul class="resource-list">
      <li>
        <a href="https://cwe.mitre.org/data/definitions/352.html" target="_blank" rel="noopener noreferrer">CWE-352: Cross-Site Request Forgery</a>
      </li>
      <li>
        <a href="https://owasp.org/www-community/attacks/csrf" target="_blank" rel="noopener noreferrer">OWASP CSRF Attack Description</a>
      </li>
      <li>
        <a href="https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html" target="_blank" rel="noopener noreferrer">OWASP CSRF Prevention Cheat Sheet</a>
      </li>
      <li>
        <a href="https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#security" target="_blank" rel="noopener noreferrer">Next.js Server Actions Security</a>
      </li>
      <li>
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value" target="_blank" rel="noopener noreferrer">MDN SameSite Cookies</a>
      </li>
      <li>
        <a href="https://www.npmjs.com/package/csrf-csrf" target="_blank" rel="noopener noreferrer">csrf-csrf npm package</a>
      </li>
      <li>
        <a href="https://expressjs.com/en/advanced/best-practice-security.html" target="_blank" rel="noopener noreferrer">Express Security Best Practices</a>
      </li>
    </ul>
  </section>

  <section class="cta-section">
    <h2>Scan Your Code for CSRF Vulnerabilities</h2>
    <p>
      vibeship scanner identifies Route Handlers without CSRF protection and recommends whether to add Origin validation, CSRF tokens, or convert to Server Actions. Get a security report in minutes.
    </p>
    <a href="https://scanner.vibeship.co" class="cta-button">
      Try vibeship scanner Free
    </a>
  </section>
</div>

<style>
  .vulnerability-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
    color: var(--text-primary, #e4e4e7);
  }

  .breadcrumb {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    font-size: 0.875rem;
    color: var(--text-secondary, #a1a1aa);
  }

  .breadcrumb a {
    color: var(--text-secondary, #a1a1aa);
    text-decoration: none;
    transition: color 0.2s;
  }

  .breadcrumb a:hover {
    color: var(--accent, #22d3ee);
  }

  .breadcrumb .separator {
    color: var(--text-muted, #52525b);
  }

  .breadcrumb .current {
    color: var(--text-primary, #e4e4e7);
  }

  .page-header {
    margin-bottom: 2rem;
  }

  .meta-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-decoration: none;
    transition: opacity 0.2s;
  }

  .badge:hover {
    opacity: 0.8;
  }

  .badge.cwe {
    background: rgba(139, 92, 246, 0.2);
    color: #a78bfa;
    border: 1px solid rgba(139, 92, 246, 0.3);
  }

  .badge.owasp {
    background: rgba(249, 115, 22, 0.2);
    color: #fb923c;
    border: 1px solid rgba(249, 115, 22, 0.3);
  }

  .badge.severity {
    border: 1px solid;
  }

  .badge.severity.high {
    background: rgba(249, 115, 22, 0.2);
    color: #fb923c;
    border-color: rgba(249, 115, 22, 0.3);
  }

  h1 {
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: var(--text-primary, #e4e4e7);
  }

  .subtitle {
    font-size: 1.125rem;
    color: var(--text-secondary, #a1a1aa);
    line-height: 1.6;
  }

  .quick-answer {
    background: linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(139, 92, 246, 0.1));
    border: 1px solid rgba(34, 211, 238, 0.2);
    border-radius: 0.75rem;
    padding: 1.25rem;
    margin-bottom: 2rem;
    font-size: 1rem;
    line-height: 1.6;
  }

  .quick-answer strong {
    color: var(--accent, #22d3ee);
  }

  .content-section {
    margin-bottom: 3rem;
  }

  .content-section h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary, #e4e4e7);
  }

  .content-section p {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: var(--text-secondary, #d4d4d8);
  }

  .content-section a {
    color: var(--accent, #22d3ee);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  .content-section a:hover {
    border-bottom-color: var(--accent, #22d3ee);
  }

  .content-section ul,
  .content-section ol {
    margin: 0 0 1rem 0;
    padding-left: 1.5rem;
    line-height: 1.7;
  }

  .content-section li {
    margin-bottom: 0.5rem;
    color: var(--text-secondary, #d4d4d8);
  }

  .content-section code {
    background: var(--bg-tertiary, #27272a);
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
    color: var(--accent, #22d3ee);
  }

  .info-box {
    padding: 1rem 1.25rem;
    border-radius: 0.5rem;
    margin: 1rem 0;
  }

  .info-box.safe {
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.2);
  }

  .info-box h4 {
    font-size: 0.9375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #4ade80;
  }

  .info-box p {
    margin: 0;
    font-size: 0.9375rem;
    line-height: 1.5;
    color: var(--text-secondary, #d4d4d8);
  }

  .code-example {
    margin: 1.5rem 0;
    border-radius: 0.75rem;
    overflow: hidden;
    border: 1px solid var(--border, #27272a);
  }

  .code-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .code-header.vulnerable {
    background: rgba(239, 68, 68, 0.1);
    border-bottom: 1px solid rgba(239, 68, 68, 0.2);
    color: #fca5a5;
  }

  .code-header.secure {
    background: rgba(34, 197, 94, 0.1);
    border-bottom: 1px solid rgba(34, 197, 94, 0.2);
    color: #86efac;
  }

  .status-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .code-header.vulnerable .status-badge {
    background: rgba(239, 68, 68, 0.2);
    color: #f87171;
  }

  .code-header.secure .status-badge {
    background: rgba(34, 197, 94, 0.2);
    color: #4ade80;
  }

  .code-example pre {
    margin: 0;
    padding: 1rem;
    background: var(--bg-secondary, #18181b);
    overflow-x: auto;
  }

  .code-example code {
    background: none;
    padding: 0;
    color: var(--text-secondary, #d4d4d8);
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .comparison-table {
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  .comparison-table table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 0.75rem 1rem;
    text-align: left;
    border: 1px solid var(--border, #27272a);
  }

  .comparison-table th {
    background: var(--bg-tertiary, #27272a);
    font-weight: 600;
    color: var(--text-primary, #e4e4e7);
  }

  .comparison-table td {
    background: var(--bg-secondary, #18181b);
  }

  .cell-safe {
    color: #4ade80;
  }

  .cell-warning {
    color: #fbbf24;
  }

  .expand-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--bg-tertiary, #27272a);
    color: var(--text-primary, #e4e4e7);
    border: 1px solid var(--border, #3f3f46);
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .expand-button:hover {
    background: var(--bg-secondary, #18181b);
    border-color: var(--accent, #22d3ee);
  }

  .fix-prompt {
    margin-top: 1rem;
    border-radius: 0.75rem;
    overflow: hidden;
    border: 1px solid var(--border, #27272a);
  }

  .fix-prompt-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: var(--bg-tertiary, #27272a);
    border-bottom: 1px solid var(--border, #3f3f46);
  }

  .fix-prompt-header span {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary, #e4e4e7);
  }

  .copy-button {
    padding: 0.375rem 0.75rem;
    background: var(--accent, #22d3ee);
    color: var(--bg-primary, #09090b);
    border: none;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .copy-button:hover {
    opacity: 0.9;
  }

  .fix-prompt pre {
    margin: 0;
    padding: 1rem;
    background: var(--bg-secondary, #18181b);
    overflow-x: auto;
  }

  .fix-prompt code {
    background: none;
    padding: 0;
    color: var(--text-secondary, #d4d4d8);
    font-size: 0.8125rem;
    line-height: 1.6;
    white-space: pre-wrap;
  }

  .faq-section {
    margin-bottom: 3rem;
  }

  .faq-section h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--text-primary, #e4e4e7);
  }

  .faq-item {
    border: 1px solid var(--border, #27272a);
    border-radius: 0.5rem;
    margin-bottom: 0.75rem;
    overflow: hidden;
  }

  .faq-question {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    background: var(--bg-secondary, #18181b);
    color: var(--text-primary, #e4e4e7);
    border: none;
    font-size: 1rem;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s;
  }

  .faq-question:hover {
    background: var(--bg-tertiary, #27272a);
  }

  .faq-icon {
    font-size: 1.25rem;
    font-weight: 300;
    color: var(--text-secondary, #a1a1aa);
  }

  .faq-answer {
    padding: 1rem 1.25rem;
    background: var(--bg-primary, #09090b);
    border-top: 1px solid var(--border, #27272a);
  }

  .faq-answer p {
    margin: 0;
    line-height: 1.7;
    color: var(--text-secondary, #d4d4d8);
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .related-card {
    display: block;
    padding: 1.25rem;
    background: var(--bg-secondary, #18181b);
    border: 1px solid var(--border, #27272a);
    border-radius: 0.75rem;
    text-decoration: none;
    transition: all 0.2s;
  }

  .related-card:hover {
    border-color: var(--accent, #22d3ee);
    transform: translateY(-2px);
  }

  .related-card h3 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary, #e4e4e7);
  }

  .related-card p {
    font-size: 0.875rem;
    color: var(--text-secondary, #a1a1aa);
    margin: 0;
    line-height: 1.5;
  }

  .resource-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .resource-list li {
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border, #27272a);
  }

  .resource-list li:last-child {
    border-bottom: none;
  }

  .resource-list a {
    color: var(--accent, #22d3ee);
    text-decoration: none;
    font-size: 0.9375rem;
    transition: opacity 0.2s;
  }

  .resource-list a:hover {
    opacity: 0.8;
  }

  .cta-section {
    background: linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(139, 92, 246, 0.1));
    border: 1px solid rgba(34, 211, 238, 0.2);
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
    margin-top: 3rem;
  }

  .cta-section h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--text-primary, #e4e4e7);
  }

  .cta-section p {
    color: var(--text-secondary, #a1a1aa);
    margin-bottom: 1.5rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.75rem;
    background: var(--accent, #22d3ee);
    color: var(--bg-primary, #09090b);
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
  }

  .cta-button:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  @media (max-width: 640px) {
    .vulnerability-page {
      padding: 1rem;
    }

    h1 {
      font-size: 1.75rem;
    }

    .content-section h2 {
      font-size: 1.25rem;
    }

    .code-example pre {
      padding: 0.75rem;
    }

    .code-example code {
      font-size: 0.8125rem;
    }

    .related-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
