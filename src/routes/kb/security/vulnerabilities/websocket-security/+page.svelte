<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'WebSocket Security: Detect & Fix Guide',
		description: 'WebSocket vulnerabilities let attackers hijack connections and steal data. Learn to detect CSWSH and implement secure WebSocket authentication patterns.',
		url: '/kb/security/vulnerabilities/websocket-security/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'WebSocket Security' }
	];

	const securityData = {
		cweId: 'CWE-1385',
		cweName: 'Missing Origin Validation in WebSockets',
		cweSource: 'https://cwe.mitre.org/data/definitions/1385.html',
		relatedCwe: 'CWE-346',
		owaspCategory: 'A01:2021 - Broken Access Control',
		owaspSource: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/',
		severity: 'High',
		cvssScore: '7.0-8.5'
	};

	const faqs = [
		{
			question: 'How do I secure WebSocket connections?',
			answer: 'Validate the Origin header on connection to prevent CSWSH. Authenticate the user during the WebSocket upgrade handshake using a token. Verify authorization on every message, not just at connection time. Use wss:// (TLS) to encrypt the connection. Implement rate limiting to prevent abuse.'
		},
		{
			question: 'What is Cross-Site WebSocket Hijacking (CSWSH)?',
			answer: 'CSWSH is the WebSocket equivalent of CSRF. A malicious page opens a WebSocket to your server, and the browser sends cookies automatically. Without Origin validation, the server accepts the connection. The attacker can then send/receive messages as the victim. Unlike CSRF, WebSocket connections are persistent—ongoing data theft.'
		},
		{
			question: 'Should WebSockets have authentication?',
			answer: 'Yes. Authenticate during the WebSocket upgrade handshake AND verify authorization on each message. The upgrade request can include auth tokens in headers or query params. But connections can last hours—user permissions may change. Message-level auth ensures current authorization, not just connection-time auth.'
		},
		{
			question: 'How do I validate WebSocket origin?',
			answer: 'Check the Origin header during the upgrade handshake. Compare it against your allowlist of trusted domains. Reject connections from unknown origins. Note: Origin can be null for some clients, so decide how to handle that. Never skip validation because "it works in testing."'
		},
		{
			question: 'Are WebSockets vulnerable to XSS?',
			answer: 'WebSockets don\'t prevent XSS—they can make it worse. If XSS exists, attackers can open WebSockets as the victim, steal tokens, and maintain persistent access. The WebSocket connection survives page navigation. Always sanitize data received via WebSocket before rendering it in the DOM.'
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

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{"@type": "ListItem", "position": 1, "name": "Knowledge Base", "item": "https://vibeship.co/kb"},
			{"@type": "ListItem", "position": 2, "name": "Security", "item": "https://vibeship.co/kb/security"},
			{"@type": "ListItem", "position": 3, "name": "Vulnerabilities", "item": "https://vibeship.co/kb/security/vulnerabilities"},
			{"@type": "ListItem", "position": 4, "name": "WebSocket Security"}
		]
	}
	</script>`}

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "TechArticle",
		"headline": "${meta.title}",
		"description": "${meta.description}",
		"author": {"@type": "Organization", "name": "VibeShip"},
		"publisher": {"@type": "Organization", "name": "VibeShip"},
		"datePublished": "2024-12-26",
		"dateModified": "2024-12-26"
	}
	</script>`}

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": ${JSON.stringify(faqs.map(faq => ({
			"@type": "Question",
			"name": faq.question,
			"acceptedAnswer": {"@type": "Answer", "text": faq.answer}
		})))}
	}
	</script>`}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<header class="article-header">
			<div class="badge-row">
				<span class="badge badge-high">High Severity</span>
				<span class="badge">{securityData.cweId}</span>
				<span class="badge">OWASP A01</span>
			</div>
			<h1>WebSocket Security in Vibe Coded Apps</h1>
			<p class="text-secondary">When persistent connections bypass your security</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>WebSockets bypass normal browser security protections.</strong>
				Without Origin validation, attackers can hijack connections from other sites (CSWSH). Without message-level auth, a single stolen token grants persistent access. The fix: validate Origin on upgrade, authenticate with tokens not cookies, and verify authorization per-message.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">CSWSH</div>
				<div class="stat-label">WebSocket CSRF variant</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Persistent</div>
				<div class="stat-label">Connection stays open</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Bypasses</div>
				<div class="stat-label">CORS protections</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">wss://</div>
				<div class="stat-label">Encryption, not auth</div>
			</div>
		</div>

		<!-- What Is It - @flaggedthis voice (auditor, methodical) -->
		<section class="article-section">
			<h2>What are WebSocket vulnerabilities?</h2>
			<p>
				WebSockets are like leaving a phone line open. Anyone who knows the number can listen in—unless you verify who's on the other end for every message. Most vibe coded apps only check identity when the call starts.
			</p>

			<div class="audit-findings">
				<div class="audit-finding">
					<div class="finding-severity high">HIGH</div>
					<div class="finding-content">
						<h3>Cross-Site WebSocket Hijacking (CSWSH)</h3>
						<p>Malicious site opens WebSocket to your server. Browser sends cookies automatically. No Origin check = connection accepted. Attacker sends/receives as victim.</p>
					</div>
				</div>
				<div class="audit-finding">
					<div class="finding-severity high">HIGH</div>
					<div class="finding-content">
						<h3>Missing Upgrade Authentication</h3>
						<p>WebSocket upgrade happens without token validation. Connection established before auth checked. Anyone can connect, even without credentials.</p>
					</div>
				</div>
				<div class="audit-finding">
					<div class="finding-severity medium">MEDIUM</div>
					<div class="finding-content">
						<h3>No Message-Level Authorization</h3>
						<p>Auth checked at connection time only. Permissions change, connection persists. Stale auth for hours-long sessions.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Why Vibe Coded Apps -->
		<section class="article-section">
			<h2>Why vibe coded apps are vulnerable</h2>
			<p>
				AI generates the WebSocket upgrade but forgets the security. The connection works. The real-time features work. The security doesn't.
			</p>

			<div class="code-comparison">
				<div class="code-block code-bad">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable - Typical AI-generated WebSocket</span>
						<span class="code-label-bad">No origin check, no auth</span>
					</div>
					<pre><code>{`// AI generates this pattern
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  // No origin validation - CSWSH possible
  // No authentication - anyone can connect

  ws.on('message', (data) => {
    const message = JSON.parse(data);
    // No authorization check per message
    // Process whatever is sent
    broadcastToAll(message);
  });
});

// Client side - token in URL (logged in server logs!)
const ws = new WebSocket('wss://api.example.com?token=' + jwt);`}</code></pre>
				</div>
				<div class="code-block code-good">
					<div class="code-block-header">
						<span class="code-block-lang">Secure - Complete WebSocket security</span>
						<span class="code-label-good">Fixed</span>
					</div>
					<pre><code>{`import WebSocket from 'ws';
import { verifyToken, checkPermission } from './auth';

const ALLOWED_ORIGINS = ['https://example.com', 'https://app.example.com'];

const wss = new WebSocket.Server({
  port: 8080,
  verifyClient: ({ origin, req }, callback) => {
    // 1. Validate Origin
    if (!ALLOWED_ORIGINS.includes(origin)) {
      callback(false, 403, 'Invalid origin');
      return;
    }

    // 2. Authenticate on upgrade (token in header, not URL)
    const token = req.headers['sec-websocket-protocol'];
    try {
      const user = verifyToken(token);
      (req as any).user = user;
      callback(true);
    } catch {
      callback(false, 401, 'Invalid token');
    }
  }
});

wss.on('connection', (ws, req) => {
  const user = (req as any).user;

  ws.on('message', async (data) => {
    const message = JSON.parse(data.toString());

    // 3. Authorize EVERY message
    if (!await checkPermission(user.id, message.action)) {
      ws.send(JSON.stringify({ error: 'Unauthorized' }));
      return;
    }

    // 4. Process authorized message
    handleMessage(user, message);
  });
});`}</code></pre>
				</div>
			</div>

			<div class="audit-note">
				<strong>Audit flag:</strong> Search your codebase for <code>new WebSocket.Server</code> without <code>verifyClient</code>. That's the vulnerability.
			</div>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect WebSocket vulnerabilities</h2>
			<p>
				Test for CSWSH and missing authentication systematically.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Testing for CSWSH</span>
				</div>
				<pre><code>{`# Test 1: CSWSH - Connect from different origin
# Create test.html on attacker.com:
<script>
  // This should FAIL if Origin is validated
  const ws = new WebSocket('wss://target.com/ws');
  ws.onopen = () => console.log('VULNERABLE: Connected from wrong origin');
  ws.onerror = () => console.log('SECURE: Connection rejected');
</script>

# Test 2: Connect without authentication
# Should be rejected at upgrade
wscat -c wss://target.com/ws
# If connected: VULNERABLE - no auth required

# Test 3: Check token handling
# Token in URL? Check server logs for exposure
# Token in Sec-WebSocket-Protocol header? Better

# Test 4: Message authorization
# Connect as user A, send action for user B's data
# If it works: missing per-message authorization

# Test 5: Session invalidation
# Login, establish WebSocket
# Logout in another tab
# WebSocket should disconnect or reject messages`}</code></pre>
			</div>

			<div class="check-list">
				<h3>WebSocket security audit checklist</h3>
				<ul>
					<li>Origin header validated against allowlist?</li>
					<li>Authentication token verified on upgrade?</li>
					<li>Token passed in header, not URL?</li>
					<li>Authorization checked per message?</li>
					<li>Connection closed on logout/session end?</li>
					<li>Rate limiting on messages?</li>
					<li>Input validation on received data?</li>
				</ul>
			</div>

			<div class="cta-box">
				<p><strong>WebSocket security often gets overlooked.</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Audit your WebSockets
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to fix WebSocket security</h2>
			<p>
				Secure the upgrade, authenticate the connection, authorize every message.
			</p>

			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this into your AI coding tool to secure WebSocket implementations:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Audit my WebSocket implementation for security vulnerabilities.

## What to search for

1. WebSocket server creation without verifyClient:
   \`\`\`
   new WebSocket.Server({
     // Missing verifyClient callback
   })
   \`\`\`

2. Missing Origin validation:
   \`\`\`
   // No check for request.headers.origin
   // Or accepting all origins
   \`\`\`

3. Token in URL (gets logged):
   \`\`\`
   new WebSocket('wss://example.com?token=')
   new WebSocket(\`wss://\${host}?jwt=\`)
   \`\`\`

4. No per-message authorization:
   \`\`\`
   ws.on('message', (data) => {
     // Direct processing without auth check
     handleMessage(JSON.parse(data));
   });
   \`\`\`

## Required fixes

### Fix 1: Add Origin validation
\`\`\`typescript
const ALLOWED_ORIGINS = [
  'https://yourdomain.com',
  'https://app.yourdomain.com'
];

const wss = new WebSocket.Server({
  server: httpServer,
  verifyClient: ({ origin, req }, callback) => {
    // Validate origin
    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
      console.warn(\`Rejected WebSocket from origin: \${origin}\`);
      callback(false, 403, 'Forbidden');
      return;
    }
    callback(true);
  }
});
\`\`\`

### Fix 2: Authenticate on upgrade (use header, not URL)
\`\`\`typescript
// Server: Token in subprotocol header
verifyClient: ({ req }, callback) => {
  const token = req.headers['sec-websocket-protocol'];

  if (!token) {
    callback(false, 401, 'No token');
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    (req as any).user = user;
    callback(true);
  } catch (err) {
    callback(false, 401, 'Invalid token');
  }
}

// Client: Pass token in subprotocol
const ws = new WebSocket('wss://api.example.com', [authToken]);
\`\`\`

### Fix 3: Authorize every message
\`\`\`typescript
ws.on('message', async (data) => {
  const message = JSON.parse(data.toString());
  const user = (req as any).user;

  // Re-verify user still has access (roles may have changed)
  const currentUser = await db.users.findById(user.id);
  if (!currentUser || currentUser.status !== 'active') {
    ws.close(4001, 'Session expired');
    return;
  }

  // Check authorization for this specific action
  if (!canPerform(currentUser, message.action, message.resource)) {
    ws.send(JSON.stringify({ error: 'Not authorized for this action' }));
    return;
  }

  // Now handle the message
  handleMessage(currentUser, message);
});
\`\`\`

### Fix 4: Handle session termination
\`\`\`typescript
// Track connections by user
const userConnections = new Map<string, WebSocket[]>();

// On login/connection
userConnections.get(userId)?.push(ws);

// On logout - close all user's connections
function onLogout(userId: string) {
  const connections = userConnections.get(userId) || [];
  connections.forEach(ws => ws.close(4000, 'Logged out'));
  userConnections.delete(userId);
}
\`\`\`

## Security checklist
- [ ] Origin validated against allowlist
- [ ] Token in header, not URL
- [ ] Token verified (not just decoded)
- [ ] Authorization checked per message
- [ ] Connections closed on logout
- [ ] Rate limiting implemented
- [ ] Input sanitized before DOM render
- [ ] wss:// used (TLS encryption)

## After fixing
1. Test CSWSH from different origin
2. Test connection without token
3. Test actions beyond user's permissions
4. Test logout invalidates WebSocket
5. Check server logs don't contain tokens`}</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Security layers</h3>
				<div class="security-layers">
					<div class="security-layer">
						<div class="layer-number">1</div>
						<div class="layer-content">
							<h4>Origin Validation</h4>
							<p>Verify the Origin header matches your allowed domains. Prevents CSWSH attacks.</p>
						</div>
					</div>
					<div class="security-layer">
						<div class="layer-number">2</div>
						<div class="layer-content">
							<h4>Upgrade Authentication</h4>
							<p>Verify JWT/token during the WebSocket handshake. Reject before connection establishes.</p>
						</div>
					</div>
					<div class="security-layer">
						<div class="layer-number">3</div>
						<div class="layer-content">
							<h4>Per-Message Authorization</h4>
							<p>Check permissions for every action. Roles change, connections persist. Don't trust stale auth.</p>
						</div>
					</div>
					<div class="security-layer">
						<div class="layer-number">4</div>
						<div class="layer-content">
							<h4>Session Lifecycle</h4>
							<p>Close WebSocket when session ends. Track connections per user. Logout = disconnect.</p>
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
				<a href="/kb/security/vulnerabilities/csrf/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">CSRF</div>
					<p class="related-card-description">Similar cross-site attack pattern</p>
				</a>
				<a href="/kb/security/vulnerabilities/jwt-vulnerabilities/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">JWT Vulnerabilities</div>
					<p class="related-card-description">Token security for WebSocket auth</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">XSS</div>
					<p class="related-card-description">WebSocket message sanitization</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>WebSockets need their own security review</h2>
			<p>Don't let persistent connections become persistent vulnerabilities.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan for WebSocket issues
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

	/* Audit Findings - @flaggedthis style */
	.audit-findings {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin: 1.5rem 0;
	}

	.audit-finding {
		display: flex;
		gap: 1rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem;
	}

	.finding-severity {
		font-size: 0.6875rem;
		font-weight: 700;
		padding: 0.25rem 0.5rem;
		text-transform: uppercase;
		height: fit-content;
		flex-shrink: 0;
	}

	.finding-severity.high {
		background: rgba(255, 107, 107, 0.15);
		color: var(--red);
	}

	.finding-severity.medium {
		background: rgba(255, 178, 55, 0.15);
		color: var(--orange);
	}

	.finding-content h3 {
		margin: 0 0 0.375rem;
		font-size: 0.9375rem;
	}

	.finding-content p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Code Comparison */
	.code-comparison {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-bad {
		border-left: 3px solid var(--red);
	}

	.code-good {
		border-left: 3px solid var(--green);
	}

	.code-label-bad,
	.code-label-good {
		font-size: 0.6875rem;
		padding: 0.125rem 0.5rem;
		text-transform: uppercase;
		font-weight: 600;
	}

	.code-label-bad {
		color: var(--red);
		background: rgba(255, 107, 107, 0.1);
	}

	.code-label-good {
		color: var(--green);
		background: rgba(0, 255, 136, 0.1);
	}

	/* Audit Note */
	.audit-note {
		background: var(--bg-tertiary);
		border-left: 3px solid var(--orange);
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
		font-size: 0.9375rem;
	}

	.audit-note code {
		background: var(--bg-secondary);
		padding: 0.125rem 0.375rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.875rem;
	}

	/* Check List */
	.check-list {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.check-list h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
	}

	.check-list ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.check-list li {
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border);
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

	.check-list li:last-child {
		border-bottom: none;
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

	/* Security Layers */
	.security-layers {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.security-layer {
		display: flex;
		gap: 1rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem 1.25rem;
	}

	.layer-number {
		width: 28px;
		height: 28px;
		background: var(--green-dim);
		color: var(--green);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.875rem;
		flex-shrink: 0;
	}

	.layer-content h4 {
		margin: 0 0 0.25rem;
		font-size: 0.9375rem;
	}

	.layer-content p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
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
	}

	.faq-item p {
		margin: 0;
		font-size: 0.9375rem;
		line-height: 1.7;
		color: var(--text-secondary);
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

	@media (max-width: 768px) {
		.audit-finding {
			flex-direction: column;
			gap: 0.5rem;
		}

		.security-layer {
			flex-direction: column;
			gap: 0.5rem;
		}

		.faq-item h3 {
			font-size: 1rem;
		}
	}
</style>
