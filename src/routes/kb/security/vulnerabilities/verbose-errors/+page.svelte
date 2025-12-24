<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'Verbose Errors: Stack Traces Expose Secrets | VibeShip',
		description: 'Verbose errors expose file paths, framework versions, and database structure. Fix debug mode in Django, Flask, Express, Next.js. CWE-209 explained.',
		url: '/kb/security/vulnerabilities/verbose-errors/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'Verbose Error Messages' }
	];

	// CWE/OWASP data
	const securityData = {
		cweId: 'CWE-209',
		cweSource: 'https://cwe.mitre.org/data/definitions/209.html',
		owaspCategory: 'A05:2021 - Security Misconfiguration',
		owaspSource: 'https://owasp.org/Top10/A05_2021-Security_Misconfiguration/'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What information can stack traces reveal to attackers?',
			answer: 'Stack traces enumerate your entire tech stack in seconds. File paths show your directory structure and module organization. Framework versions enable targeted CVE searches. Database error messages expose query structure for SQL injection. Internal IP addresses reveal network architecture. Method names and parameter values leak business logic. All of this reconnaissance data helps attackers craft precise exploits without guessing.'
		},
		{
			question: 'How do I disable debug mode in production?',
			answer: 'It depends on your framework. Django: set DEBUG = False in settings.py and configure ALLOWED_HOSTS. Flask: remove app.run(debug=True) and set app.config[\'DEBUG\'] = False. Express: set NODE_ENV=production and use environment-based error handlers. Next.js: set productionBrowserSourceMaps to false in next.config.js. Always verify with a test deployment before going live.'
		},
		{
			question: 'What is CWE-209?',
			answer: 'CWE-209 is "Generation of Error Message Containing Sensitive Information." It covers verbose errors, stack traces, and debug pages that expose internal details. Ranked in OWASP A05:2021 Security Misconfiguration. The vulnerability isn\'t the error itself but what the error reveals to unauthenticated users who shouldn\'t see framework versions, file paths, or database schemas.'
		},
		{
			question: 'Why are verbose error messages dangerous?',
			answer: 'Because they turn reconnaissance from weeks into minutes. Attackers normally spend hours probing to identify your stack. Verbose errors hand them a complete blueprint: framework versions with known CVEs, file paths for traversal attacks, database types for injection syntax, middleware chains showing auth patterns. Every detail helps them craft attacks that actually work.'
		},
		{
			question: 'How do I configure error handling for production?',
			answer: 'Three layers: client-facing errors show generic messages only, server-side logging captures full details for debugging, environment checks ensure debug mode never runs in production. Use custom error handlers that check NODE_ENV or DEBUG flags. Log stack traces to secure monitoring tools, not response bodies. Configure custom 404/500 pages that don\'t expose tech stack details.'
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
			{"@type": "ListItem", "position": 4, "name": "Verbose Error Messages"}
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
				<span class="badge badge-medium">Medium</span>
				<span class="badge">CWE-209</span>
				<span class="badge">OWASP A05:2021</span>
			</div>
			<h1>Verbose Error Messages: Stack Traces That Reveal Secrets</h1>
			<p class="text-secondary">Let's trace how debug mode and detailed errors expose your entire tech stack to attackers</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>Verbose error messages expose internal system details through stack traces, debug pages, and detailed error responses.</strong>
				They reveal file paths, framework versions, database structure, and internal IPs. Categorized as <a href={securityData.cweSource}>CWE-209</a> and part of <a href={securityData.owaspSource}>OWASP A05:2021 Security Misconfiguration</a>.
				AI tools leave debug mode enabled because helpful errors make development easier, but production deployments need generic error messages that don't leak reconnaissance data.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">CWE-209</div>
				<div class="stat-label"><a href={securityData.cweSource}>CWE Category</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">A05:2021</div>
				<div class="stat-label"><a href={securityData.owaspSource}>OWASP Category</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Medium</div>
				<div class="stat-label">Severity</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">40,003</div>
				<div class="stat-label">CVEs in 2024</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href="https://nvd.nist.gov/">National Vulnerability Database</a>, <a href={securityData.owaspSource}>OWASP</a>
		</p>

		<!-- What Is It - @danawhy voice (Debugger - curious, diagnostic) -->
		<section class="article-section">
			<h2>What are verbose error messages?</h2>
			<p>
				Verbose error messages are what happens when your error handler tells attackers too much.
				Instead of "Something went wrong," they see full stack traces with file paths, framework versions, query structure, and internal architecture.
				It's like debugging in production, except the person reading your debug output is trying to break in.
			</p>
			<p>
				Think of it this way: when your app crashes, do you want users to see "Server error, please try again" or a detailed trace showing exactly which Django middleware failed, which Postgres query broke, and where your authentication logic lives?
				One of those is helpful for attackers. The other is just good error handling.
			</p>
			<p>
				According to <a href={securityData.cweSource}>CWE-209</a>, this vulnerability occurs when error messages contain "sensitive information" like system data, session IDs, or configuration details.
				The <a href="https://nvd.nist.gov/">National Vulnerability Database</a> recorded 40,003 CVEs in 2024 (a 39% increase from 2023).
				Verbose errors help attackers map which vulnerabilities actually apply to your stack without guessing.
			</p>
		</section>

		<!-- What Stack Traces Reveal -->
		<section class="article-section">
			<h2>What information do stack traces reveal?</h2>
			<p>
				Let's trace what attackers learn from a single verbose error. This is the reconnaissance data that normally takes hours of probing, handed over in one failed request.
			</p>

			<div class="disclosure-grid">
				<div class="disclosure-item">
					<h3>File paths and directory structure</h3>
					<p><code>/home/app/src/middleware/auth.js</code> tells them exactly where authentication lives, what your project structure looks like, and which files to target for path traversal.</p>
				</div>

				<div class="disclosure-item">
					<h3>Framework and library versions</h3>
					<p>Stack traces include version numbers: "Express 4.17.1" or "Django 3.2.4." Attackers search CVE databases for known exploits targeting those exact versions.</p>
				</div>

				<div class="disclosure-item">
					<h3>Database types and query structure</h3>
					<p>Error messages like "column 'users.email' does not exist" expose table names, column schemas, and SQL syntax, enabling precise SQL injection attempts.</p>
				</div>

				<div class="disclosure-item">
					<h3>Middleware and authentication stack</h3>
					<p>Full traces enumerate every middleware layer, showing auth flow, session handling, and validation order. Attackers identify which layer to bypass.</p>
				</div>

				<div class="disclosure-item">
					<h3>Internal IP addresses and architecture</h3>
					<p>Error messages can leak private IPs (192.168.x.x, 10.x.x.x), server names, and network topology that shouldn't be externally visible.</p>
				</div>

				<div class="disclosure-item">
					<h3>Method names and parameter values</h3>
					<p>Stack traces show function signatures and sometimes parameter values, revealing API design, business logic, and validation patterns.</p>
				</div>
			</div>

			<p>
				Every piece of this data shortens the attack timeline. According to <a href="https://blackhatevents.com/">Black Hat MEA 2024 research</a>, debug mode vulnerabilities in staging environments frequently enable attackers to extract secrets and access internal APIs before production deployment.
			</p>
		</section>

		<!-- How AI Tools Generate Verbose Errors -->
		<section class="article-section">
			<h2>How do AI tools generate verbose errors?</h2>
			<p>
				Here's the pattern we see in vibe coded projects: AI tools optimize for developer experience, not production security.
				Helpful error messages make debugging faster during development, so AI enables verbose errors by default.
				The problem is these settings persist when code ships to production.
			</p>

			<div class="pattern-box">
				<h3>The debug mode pattern</h3>
				<p>Ask any AI tool to generate a Flask or Django app. Check the configuration it gives you:</p>
				<div class="code-block">
					<pre><code>{`# Django settings.py - Cursor, Claude Code, Bolt all generate this
DEBUG = True  # Helpful during development, dangerous in production

# Flask app.py - Same pattern
app = Flask(__name__)
app.run(debug=True)  # Auto-reload and detailed errors enabled

# Express error handler - Generic AI output
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,     // Exposes internal error details
    stack: err.stack        // Full stack trace to client
  })
})`}</code></pre>
				</div>
				<p class="pattern-note">
					These configurations make sense during development. Full stack traces help you debug faster.
					But when vibe coders deploy directly from dev to production without environment-specific configs, attackers get the same helpful error messages.
				</p>
			</div>

			<p>
				<strong>Why AI does this:</strong> The models are trained on tutorial code and public repositories.
				Tutorials prioritize "make it work and understand errors" over "deploy securely."
				Public repos often have debug settings in version control.
				AI gives you what works now, not what's safe later.
			</p>
		</section>

		<!-- Real-World Examples -->
		<section class="article-section">
			<h2>Real-world examples</h2>

			<h3>Django DEBUG=True</h3>
			<p>
				When <code>DEBUG = True</code> in production, Django's error pages become reconnaissance goldmines.
				Full stack traces show every middleware, all installed apps, complete file paths, and a "Local vars" section that can expose environment variables including database credentials.
			</p>
			<p>
				The 404 page is especially dangerous, listing all valid URL patterns. Attackers enumerate every endpoint without guessing.
				<a href="https://www.admirationnews.com/2024/10/02/why-djangos-debugtrue-is-a-goldmine-for-hackers/">Research shows</a> how DEBUG=True enables full tech stack enumeration in minutes.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable</div>
					<pre><code>{`# settings.py - Exposes everything
DEBUG = True
ALLOWED_HOSTS = ['*']

# Attacker triggers error, sees:
# - All middleware classes
# - Installed apps list
# - File paths: /app/myproject/middleware/auth.py
# - Local variables (can include secrets)
# - Request/response details`}</code></pre>
				</div>

				<div class="code-block secure">
					<div class="code-label">Secure</div>
					<pre><code>{`# settings.py - Production config
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com']

# Custom error handlers in urls.py
handler404 = 'myapp.views.custom_404'
handler500 = 'myapp.views.custom_500'

# Attacker triggers error, sees:
# - Generic "Server error occurred"
# - No stack trace, no file paths
# - No internal details`}</code></pre>
				</div>
			</div>

			<h3>Flask debug mode</h3>
			<p>
				Flask's debug mode enables an interactive debugger accessible through the browser.
				Even with PIN protection, <a href="https://blog.vidocsecurity.com/blog/escalation-of-debug-mode-in-django">bypass techniques exist</a>.
				Automatic code reloading reveals module structure and dependencies.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable</div>
					<pre><code>{`# Flask app with debug enabled
from flask import Flask
app = Flask(__name__)

if __name__ == '__main__':
    app.run(debug=True)  # Interactive debugger enabled

# Also dangerous: leaving app.config['DEBUG'] = True`}</code></pre>
				</div>

				<div class="code-block secure">
					<div class="code-label">Secure</div>
					<pre><code>{`# Flask production config
from flask import Flask
app = Flask(__name__)
app.config['DEBUG'] = False

@app.errorhandler(500)
def handle_500(error):
    # Log full error server-side
    app.logger.error(f'Server error: {error}', exc_info=True)
    # Return generic message to client
    return {'error': 'Internal server error'}, 500`}</code></pre>
				</div>
			</div>

			<h3>Express/Node.js</h3>
			<p>
				The default Express error handler exposes stack traces to clients.
				Environment checks often get skipped in vibe coded projects, leaving <code>NODE_ENV=development</code> in production.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable</div>
					<pre><code>{`// Express - Exposes stack traces
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    stack: err.stack,  // Full trace to client
    details: err       // Entire error object
  })
})`}</code></pre>
				</div>

				<div class="code-block secure">
					<div class="code-label">Secure</div>
					<pre><code>{`// Express - Environment-based error handling
app.use((err, req, res, next) => {
  // Log full error server-side
  console.error('Error:', err)

  // Send minimal info to client
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message  // Detailed only in development
  })
})`}</code></pre>
				</div>
			</div>

			<h3>Next.js</h3>
			<p>
				Next.js production builds can still leak information if source maps are enabled or API route errors aren't handled properly.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable</div>
					<pre><code>{`// next.config.js - Exposes source code structure
module.exports = {
  productionBrowserSourceMaps: true,  // Source maps in production
}

// API route - Unhandled errors expose traces
export default async function handler(req, res) {
  const data = await db.query(...)  // Error shows full trace
  res.json(data)
}`}</code></pre>
				</div>

				<div class="code-block secure">
					<div class="code-label">Secure</div>
					<pre><code>{`// next.config.js - Disabled source maps
module.exports = {
  productionBrowserSourceMaps: false,
}

// API route - Error handling
export default async function handler(req, res) {
  try {
    const data = await db.query(...)
    res.json(data)
  } catch (error) {
    console.error('API error:', error)  // Log server-side
    res.status(500).json({ error: 'Request failed' })
  }
}`}</code></pre>
				</div>
			</div>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen with verbose errors?</h2>
			<ul class="impact-list">
				<li><strong>Reconnaissance acceleration:</strong> Attackers map your entire tech stack in minutes instead of hours. They know exactly which frameworks, versions, and libraries to target.</li>
				<li><strong>Targeted exploit selection:</strong> Framework version "Express 4.16.0" in an error? Search CVE database for known exploits. No trial and error needed.</li>
				<li><strong>SQL injection assistance:</strong> Database error messages reveal query structure, table names, column types. Attackers craft precise injection payloads.</li>
				<li><strong>Path traversal attacks:</strong> File paths like <code>/app/uploads/user_files/</code> enable directory navigation attacks to access sensitive files.</li>
				<li><strong>Credential exposure:</strong> Stack traces can include environment variables or config values. Sometimes secrets leak in "Local vars" sections.</li>
			</ul>

			<p>
				Real example: <a href="https://github.com/advisories/GHSA-p9p4-97g9-wcrh">CVE-2025-61959 (Hospital Manager)</a> exposed ASP.NET framework version, detailed stack traces, and internal file paths through verbose error pages, enabling unauthenticated reconnaissance.
				The <a href="https://github.com/playframework/playframework/security/advisories/GHSA-p9p4-97g9-wcrh">Play Framework security advisory</a> documents similar issues where development error handlers ran in production.
			</p>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect verbose error messages?</h2>
			<p>
				Let's trace through detection. The patterns are consistent across frameworks, so searching is systematic.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Detection patterns</span>
				</div>
				<pre><code>{`# Search for debug flags
grep -r "DEBUG = True" .
grep -r "debug=True" .
grep -r "app.run(debug" .

# Check production configs
grep -r "NODE_ENV" .
grep -r "FLASK_ENV" .
grep -r "DJANGO_SETTINGS_MODULE" .

# Find error handlers returning stack traces
grep -r "error.stack" .
grep -r "err.stack" .
grep -r "exc_info" .

# Manual testing
# Trigger errors (404, 500, invalid input) and check responses
# Look for file paths, version numbers, stack traces in output`}</code></pre>
			</div>

			<div class="cta-box">
				<p><strong>VibeShip Scanner detects debug mode and verbose error configurations automatically.</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your code
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How do I fix verbose error messages?</h2>
			<p>
				The fix is environment-based configuration. Debug mode and detailed errors are essential during development but need to be disabled before production deployment.
				Here's the systematic approach vibe coders should follow.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to fix verbose error configurations across your codebase:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">AI Fix Prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Review my codebase for verbose error message vulnerabilities (CWE-209).

## 1. Debug Mode Configuration

Find configuration files and check:
- Django: Is DEBUG = True in settings.py?
- Flask: Is app.config['DEBUG'] = True or app.run(debug=True)?
- Express: Is NODE_ENV set to 'production' in deployment?
- Next.js: Is productionBrowserSourceMaps enabled in next.config.js?

For each finding:
- Show the current configuration
- Show the secure production configuration
- Explain what information is exposed by leaving debug enabled

## 2. Error Handlers Exposing Stack Traces

Search for try/catch blocks or error handlers that return:
- error.message to clients
- error.stack to clients
- Full error objects in JSON responses
- Detailed exception information

For each finding:
- Show the vulnerable error handler
- Replace with generic client-facing message
- Add server-side logging for debugging
- Use environment checks: only expose details in development

## 3. Framework Default Error Pages

Check if custom error handlers are configured:
- Django: handler404, handler500 in urls.py
- Flask: @app.errorhandler decorators
- Express: Custom error middleware
- Next.js: Custom error pages (app/error.tsx or pages/_error.js)

If missing, create custom handlers that return generic messages.

## 4. Database Error Exposure

Find database queries where errors might expose:
- SQL syntax in error messages
- Table names and schema structure
- Query parameters

Replace with generic "Database error occurred" messages.
Log full errors server-side only.

## 5. Production Deployment Checklist

Create a pre-deployment checklist:
- [ ] All DEBUG flags set to False/false
- [ ] NODE_ENV=production
- [ ] Custom error pages configured
- [ ] Error handlers return generic messages to clients
- [ ] Detailed errors logged server-side only
- [ ] Source maps disabled in production builds
- [ ] 404/500 pages don't reveal tech stack

For each issue found, provide:
- File path and line number
- Vulnerable code snippet
- Secure replacement code
- Explanation of information disclosure risk
- CWE-209 reference

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Framework-Specific Fixes -->
			<div class="fix-section">
				<h3>Framework-specific fixes</h3>

				<h4>Django</h4>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable</div>
						<pre><code>{`# settings.py
DEBUG = True
ALLOWED_HOSTS = []

# No custom error handlers
# 404 pages list all URL patterns
# 500 pages show full stack traces`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure</div>
						<pre><code>{`# settings.py
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']

# urls.py - Custom error handlers
handler404 = 'myapp.views.custom_404'
handler500 = 'myapp.views.custom_500'

# views.py
def custom_500(request):
    return render(request, '500.html', status=500)`}</code></pre>
					</div>
				</div>

				<h4>Flask</h4>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable</div>
						<pre><code>{`# app.py
app = Flask(__name__)
app.run(debug=True)  # Interactive debugger enabled`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure</div>
						<pre><code>{`# app.py
app = Flask(__name__)
app.config['DEBUG'] = False

@app.errorhandler(404)
def not_found(error):
    return {'error': 'Not found'}, 404

@app.errorhandler(500)
def internal_error(error):
    app.logger.error(f'Server error: {error}', exc_info=True)
    return {'error': 'Internal server error'}, 500`}</code></pre>
					</div>
				</div>

				<h4>Express</h4>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable</div>
						<pre><code>{`// Default error handler exposes stack
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    stack: err.stack
  })
})`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure</div>
						<pre><code>{`// Environment-based error handling
app.use((err, req, res, next) => {
  console.error('Error:', err)

  const isProd = process.env.NODE_ENV === 'production'
  res.status(err.status || 500).json({
    error: isProd ? 'Internal server error' : err.message
    // Never send stack traces to clients
  })
})`}</code></pre>
					</div>
				</div>

				<h4>Next.js</h4>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-label">Vulnerable</div>
						<pre><code>{`// next.config.js
module.exports = {
  productionBrowserSourceMaps: true,  // Exposes source
}

// API route without error handling
export default async function handler(req, res) {
  const data = await db.query(...)  // Errors expose traces
  res.json(data)
}`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-label">Secure</div>
						<pre><code>{`// next.config.js
module.exports = {
  productionBrowserSourceMaps: false,
}

// API route with error handling
export default async function handler(req, res) {
  try {
    const data = await db.query(...)
    res.json(data)
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({ error: 'Request failed' })
  }
}`}</code></pre>
					</div>
				</div>
			</div>
		</section>

		<!-- Production Deployment Checklist -->
		<section class="article-section">
			<h2>Production deployment checklist</h2>
			<p>Before deploying any vibe coded app, verify these configuration items:</p>

			<div class="checklist-box">
				<ul class="checklist">
					<li>
						<span class="check-icon">☐</span>
						<strong>DEBUG/debug flags set to False/false</strong> - Search all config files for DEBUG = True, debug=True, or debug: true
					</li>
					<li>
						<span class="check-icon">☐</span>
						<strong>NODE_ENV=production</strong> - Verify environment variable is set in deployment platform
					</li>
					<li>
						<span class="check-icon">☐</span>
						<strong>Custom error pages configured</strong> - 404 and 500 pages don't expose framework details
					</li>
					<li>
						<span class="check-icon">☐</span>
						<strong>Error handlers return generic messages</strong> - No stack traces, file paths, or version numbers to clients
					</li>
					<li>
						<span class="check-icon">☐</span>
						<strong>Source maps disabled</strong> - productionBrowserSourceMaps: false in Next.js config
					</li>
					<li>
						<span class="check-icon">☐</span>
						<strong>Stack traces logged server-side only</strong> - Use logging services, not response bodies
					</li>
					<li>
						<span class="check-icon">☐</span>
						<strong>Environment variables not exposed in errors</strong> - Verify "Local vars" sections don't leak secrets
					</li>
				</ul>
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
					<p class="related-card-description">Verbose errors reveal query structure for precise injection attacks</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Hardcoded Secrets</div>
					<p class="related-card-description">Stack traces can expose environment variables with credentials</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">How Cursor generates debug-enabled configurations</p>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Claude Code Security</div>
					<p class="related-card-description">Verbose error patterns in Claude-generated apps</p>
				</a>
				<a href="/kb/security/stacks/nextjs-supabase/" class="card card-interactive related-card">
					<div class="related-card-category">Stack Guide</div>
					<div class="related-card-title">Next.js + Supabase Security</div>
					<p class="related-card-description">Production configuration checklist for Next.js apps</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Find debug mode before attackers do</h2>
			<p>Production deployments with debug enabled are reconnaissance gifts to attackers.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan your code now
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

	/* Disclosure Grid */
	.disclosure-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.disclosure-item {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.25rem;
	}

	.disclosure-item h3 {
		font-size: 0.9rem;
		font-weight: 600;
		margin: 0 0 0.5rem;
		color: var(--text-primary);
	}

	.disclosure-item p {
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--text-secondary);
	}

	.disclosure-item code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
		border-radius: 4px;
	}

	/* Pattern Box */
	.pattern-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.pattern-box h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
	}

	.pattern-box > p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
	}

	.pattern-note {
		margin: 1rem 0 0 !important;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	/* Impact List */
	.impact-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.impact-list li {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.impact-list li:last-child {
		border-bottom: none;
	}

	.impact-list strong {
		color: var(--text-primary);
	}

	.impact-list code {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		font-size: 0.8125rem;
		border-radius: 4px;
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

	/* Code Comparison - Stacked layout */
	.code-comparison {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.code-block.vulnerable {
		border-left: 3px solid var(--red);
	}

	.code-block.secure {
		border-left: 3px solid var(--green);
	}

	.code-label {
		padding: 0.5rem 1rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border);
	}

	.vulnerable .code-label {
		color: var(--red);
	}

	.secure .code-label {
		color: var(--green);
	}

	/* Checklist Box */
	.checklist-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.checklist {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.checklist li {
		display: flex;
		gap: 0.75rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		line-height: 1.6;
	}

	.checklist li:last-child {
		border-bottom: none;
	}

	.check-icon {
		color: var(--text-tertiary);
		font-family: monospace;
		flex-shrink: 0;
	}

	.checklist strong {
		color: var(--text-primary);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.disclosure-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
