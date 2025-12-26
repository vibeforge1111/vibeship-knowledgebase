<script lang="ts">
	import { Header } from '$lib/components/layout';

	// Page metadata
	const meta = {
		title: 'LDAP Injection: Enterprise Auth Vulnerabilities',
		description: 'LDAP injection lets attackers bypass Active Directory authentication. AI tools generate vulnerable patterns. Get Node.js + Python fixes here.',
		url: '/kb/security/vulnerabilities/ldap-injection/'
	};

	// Breadcrumbs
	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'LDAP Injection' }
	];

	// Security references
	const securityData = {
		severity: 'High',
		cweId: 'CWE-90',
		cweSource: 'https://cwe.mitre.org/data/definitions/90.html',
		owaspCategory: 'A03:2021',
		owaspSource: 'https://owasp.org/Top10/A03_2021-Injection/'
	};

	// FAQ data for schema
	const faqs = [
		{
			question: 'What is LDAP injection?',
			answer: 'LDAP injection is a vulnerability where attackers manipulate LDAP queries by inserting special characters into user input fields. It targets enterprise directory services like Active Directory, Azure AD, and OpenLDAP. Classified as CWE-90, it allows authentication bypass, privilege escalation, and data exfiltration from corporate directories. The attack exploits unescaped user input in LDAP filter strings.'
		},
		{
			question: 'How does LDAP injection work?',
			answer: 'LDAP injection works by inserting special characters like *, (, ), &, and | into LDAP filter queries. For authentication bypass, an attacker enters "admin)(&" as a username. This transforms the filter from (&(uid=admin)(&)(userPassword=secret)) into a query that always returns true, bypassing password verification. The closing parenthesis truncates the original query.'
		},
		{
			question: 'What is the difference between SQL injection and LDAP injection?',
			answer: 'SQL injection targets relational databases using SQL syntax like single quotes and semicolons. LDAP injection targets directory services using LDAP filter syntax with characters like *, (, ), and &. SQL injection steals database records. LDAP injection bypasses enterprise authentication and accesses directory data. Both exploit unvalidated user input, but the query language and target systems differ.'
		},
		{
			question: 'How do I prevent LDAP injection?',
			answer: 'Prevent LDAP injection by escaping special characters before including user input in LDAP filters. In Node.js, use ldapjs parseFilter with EqualityFilter objects instead of string concatenation. In Python, use ldap3 escape_filter_chars(). Also validate input against an allowlist, limit input length, and use least-privilege LDAP binding accounts with read-only access where possible.'
		},
		{
			question: 'Is Active Directory vulnerable to LDAP injection?',
			answer: 'Yes. Active Directory uses the LDAP protocol for queries and is vulnerable when applications build LDAP filters with unescaped user input. Recent CVEs include CVE-2024-49113 (CVSS 9.8, Windows LDAP RCE) and CVE-2025-54918 (NTLM LDAP authentication bypass). Enterprise apps integrating with AD for SSO must validate and escape all user-provided values.'
		},
		{
			question: 'What characters are used in LDAP injection?',
			answer: 'The dangerous LDAP special characters are: * (wildcard matching any value), ( and ) (filter grouping), & (AND operator), | (OR operator), ! (NOT operator), \\ (escape character), and NUL (null byte). Attackers use these to modify filter logic, bypass authentication, or enumerate directory entries. All must be escaped in user input.'
		},
		{
			question: 'Can LDAP injection bypass authentication?',
			answer: 'Yes. LDAP injection commonly bypasses authentication. The classic attack uses "admin)(&" as a username with any password. This modifies the filter to (&(uid=admin)(&)(userPassword=anything)), which evaluates to true because the password check is truncated. The attacker gains access as the admin user without knowing the actual password.'
		}
	];

	// Comparison table data
	const comparisonData = [
		{ aspect: 'Target', sql: 'Relational databases', nosql: 'Document stores (MongoDB)', ldap: 'Directory services (Active Directory)' },
		{ aspect: 'Query Language', sql: 'SQL syntax', nosql: 'JSON/operators', ldap: 'LDAP filter syntax' },
		{ aspect: 'Attack Characters', sql: "' \" ; --", nosql: '{"$ne": ""}', ldap: '* ( ) & | ! \\' },
		{ aspect: 'Primary Impact', sql: 'Data breach', nosql: 'Auth bypass', ldap: 'Enterprise auth bypass' },
		{ aspect: 'Prevention', sql: 'Parameterized queries', nosql: 'Type validation', ldap: 'Filter escaping' }
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
			{"@type": "ListItem", "position": 4, "name": "LDAP Injection"}
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
				<span class="badge">CWE-90</span>
				<span class="badge">OWASP A03:2021</span>
			</div>
			<h1>LDAP Injection in Vibe Coded Apps</h1>
			<p class="text-secondary">How to find and fix enterprise authentication vulnerabilities in Active Directory integrations</p>
		</header>

		<!-- Quick Answer - Under 50 words -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>LDAP injection exploits unescaped user input in directory service queries like Active Directory.</strong>
				Attackers send payloads like <code>admin)(&</code> to bypass authentication entirely.
				Ranked under <a href="https://owasp.org/Top10/A03_2021-Injection/">OWASP A03:2021 Injection</a>.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">#3</div>
				<div class="stat-label">OWASP Ranking</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">9.8</div>
				<div class="stat-label"><a href="https://nvd.nist.gov/vuln/detail/CVE-2024-49113">CVE CVSS</a></div>
			</div>
			<div class="stat-box">
				<div class="stat-value">88%</div>
				<div class="stat-label">Credential Breaches</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">High</div>
				<div class="stat-label">Severity</div>
			</div>
		</div>
		<p class="data-source">
			Source: <a href={securityData.owaspSource}>OWASP Top 10 (2021)</a> |
			<a href={securityData.cweSource}>CWE-90</a> |
			<a href="https://www.verizon.com/business/resources/reports/dbir/">Verizon 2025 DBIR</a>
		</p>

		<!-- What Is It -->
		<section class="article-section">
			<h2>What is LDAP injection?</h2>
			<p>
				LDAP injection is a vulnerability where attackers manipulate Lightweight Directory Access Protocol queries by inserting special characters into user input fields.
				It targets enterprise directory services like Active Directory, Azure AD (now Entra ID), and OpenLDAP.
			</p>
			<p>
				Think of it like <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a>, but for enterprise authentication systems.
				Instead of attacking a database with <code>' OR '1'='1</code>, attackers use LDAP filter syntax with characters like <code>*</code>, <code>(</code>, <code>)</code>, <code>&</code>, and <code>|</code>.
			</p>
			<p>
				According to the <a href="https://www.verizon.com/business/resources/reports/dbir/">Verizon 2025 Data Breach Investigations Report</a>, 88% of breaches involve compromised credentials.
				LDAP injection is one way attackers bypass credential verification entirely.
				<a href="https://cwe.mitre.org/data/definitions/90.html">CWE-90</a> classifies this as "Improper Neutralization of Special Elements used in an LDAP Query."
			</p>
		</section>

		<!-- Why It Matters -->
		<section class="article-section">
			<h2>Why does LDAP injection matter for enterprise apps?</h2>
			<p>
				LDAP powers authentication for millions of enterprise applications through Active Directory, SSO systems, and employee directories.
				If you're vibe coding enterprise SaaS with SSO or building internal tools that authenticate against corporate directories, LDAP injection directly affects you.
			</p>
			<p>
				Recent high-profile vulnerabilities demonstrate the severity:
			</p>
			<ul class="consequences-list">
				<li><strong><a href="https://nvd.nist.gov/vuln/detail/CVE-2024-49113">CVE-2024-49113</a> (CVSS 9.8):</strong> Windows LDAP remote code execution vulnerability known as "LDAPNightmare"</li>
				<li><strong><a href="https://www.crowdstrike.com/en-us/blog/analyzing-ntlm-ldap-authentication-bypass-vulnerability/">CVE-2025-54918</a>:</strong> NTLM LDAP authentication bypass enabling SYSTEM-level escalation</li>
				<li><strong><a href="https://nvd.nist.gov/vuln/detail/CVE-2024-37782">CVE-2024-37782</a>:</strong> Gladinet CentreStack LDAP injection through username field</li>
			</ul>
		</section>

		<!-- How It Works -->
		<section class="article-section">
			<h2>How does LDAP injection work?</h2>
			<p>
				LDAP injection works by inserting special characters that modify the structure of LDAP filter queries.
				The most common attack bypasses authentication by truncating the filter logic.
			</p>

			<div class="attack-example">
				<h3>Authentication Bypass</h3>
				<p>The classic LDAP injection attack uses <code>admin)(&</code> as a username:</p>
				<div class="code-block">
					<pre><code>{`// Vulnerable LDAP filter with user input
const filter = \`(&(uid=\${username})(userPassword=\${password}))\`

// Normal input:
// username = "admin", password = "secret123"
// Filter: (&(uid=admin)(userPassword=secret123))

// Attack input:
// username = "admin)(&", password = "anything"
// Filter: (&(uid=admin)(&)(userPassword=anything))
//                       ^ Always true! Password check ignored`}</code></pre>
				</div>
				<p>
					The closing parenthesis <code>)</code> terminates the uid check, and <code>(&</code> creates an always-true condition.
					The password verification is effectively bypassed.
				</p>
			</div>

			<div class="attack-example">
				<h3>Special Character Exploitation</h3>
				<p>LDAP has several dangerous characters that attackers exploit:</p>
				<div class="special-chars">
					<div class="char-item">
						<span class="char">*</span>
						<span class="char-desc">Wildcard - matches any value</span>
					</div>
					<div class="char-item">
						<span class="char">( )</span>
						<span class="char-desc">Filter grouping - controls query structure</span>
					</div>
					<div class="char-item">
						<span class="char">&</span>
						<span class="char-desc">AND operator - combines conditions</span>
					</div>
					<div class="char-item">
						<span class="char">|</span>
						<span class="char-desc">OR operator - alternative conditions</span>
					</div>
					<div class="char-item">
						<span class="char">!</span>
						<span class="char-desc">NOT operator - negates conditions</span>
					</div>
					<div class="char-item">
						<span class="char">\</span>
						<span class="char-desc">Escape character</span>
					</div>
					<div class="char-item">
						<span class="char">NUL</span>
						<span class="char-desc">Null byte - terminates strings</span>
					</div>
				</div>
			</div>

			<div class="attack-example">
				<h3>Wildcard Enumeration</h3>
				<p>Attackers use wildcards to enumerate users or bypass exact matching:</p>
				<div class="code-block">
					<pre><code>{`// Attack payload: username = "*"
// Filter: (&(uid=*)(userPassword=anything))
// Result: Matches ANY user in the directory

// Attack payload: username = "a*"
// Filter: (&(uid=a*)(userPassword=test))
// Result: Enumerate all users starting with 'a'`}</code></pre>
				</div>
			</div>
		</section>

		<!-- AI Tool Patterns -->
		<section class="article-section">
			<h2>Why do AI tools generate vulnerable LDAP code?</h2>
			<p>
				AI tools generate insecure LDAP authentication because their training data includes enterprise examples without proper escaping.
				When you ask Cursor or Claude Code to build Active Directory authentication, they generate string concatenation patterns.
			</p>

			<div class="tool-patterns-box">
				<h3>Common AI-generated vulnerable patterns</h3>
				<div class="code-block">
					<pre><code>{`// What Cursor typically generates (VULNERABLE)
async function authenticate(username, password) {
  const filter = \`(&(uid=\${username})(userPassword=\${password}))\`
  const result = await ldapClient.search('ou=users,dc=example,dc=com', {
    filter: filter
  })
  return result.searchEntries.length > 0
}

// What Bolt generates for quick auth endpoints (VULNERABLE)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body
  const filter = \`(&(cn=\${username})(userPassword=\${password}))\`
  const result = await ldap.search('dc=example,dc=com', { filter })
  res.json({ authenticated: result.length > 0 })
})`}</code></pre>
				</div>
			</div>

			<p><strong>Why this happens:</strong></p>
			<ul class="reason-list">
				<li><strong>Training data bias:</strong> Enterprise auth examples in training data rarely show LDAP-specific escaping</li>
				<li><strong>LDAP obscurity:</strong> Less documentation about LDAP injection than <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a></li>
				<li><strong>String concatenation is simpler:</strong> AI generates the most straightforward working code</li>
				<li><strong>No security context:</strong> AI doesn't know your code handles untrusted user input</li>
			</ul>
		</section>

		<!-- What Could Happen -->
		<section class="article-section">
			<h2>What could happen if I have LDAP injection?</h2>
			<p>
				LDAP injection against enterprise directories can compromise your entire organization's authentication system.
			</p>
			<ul class="consequences-list">
				<li><strong>Authentication bypass:</strong> Log in as any user without knowing their password using <code>admin)(&</code></li>
				<li><strong>Privilege escalation:</strong> Access admin accounts or modify group memberships</li>
				<li><strong>Data exfiltration:</strong> Extract employee records, emails, and organizational data from the directory</li>
				<li><strong>Lateral movement:</strong> Use compromised credentials to access other enterprise systems</li>
				<li><strong>Directory enumeration:</strong> Map all users, groups, and organizational structure</li>
			</ul>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How do I detect LDAP injection?</h2>
			<p>
				Detect LDAP injection by searching for code that builds LDAP filters using string concatenation or template literals with user input.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Patterns to search for</span>
				</div>
				<pre><code>{`// String interpolation in LDAP filters (DANGEROUS)
\`(&(uid=\${username})\`
\`(cn=\${user})\`
filter = f"(&(uid={username})"

// Template literals with req.body (DANGEROUS)
filter: \`(&(uid=\${req.body.username})\`

// No escaping before filter construction (DANGEROUS)
ldapClient.search(baseDN, { filter: userInput })

// Regex patterns to find these:
// \\(\\s*(&|\\|)\\s*\\([^)]*\\$\\{
// ldap.*search.*\\$\\{
// filter.*=.*[fF]".*\\{`}</code></pre>
			</div>

			<p><strong>Quick manual test:</strong> Enter <code>admin)(&</code> as a username in your login form. If authentication succeeds with any password, you have LDAP injection.</p>

			<div class="cta-box">
				<p><strong>Don't want to test manually?</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your enterprise auth code
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How do I fix LDAP injection?</h2>
			<p>
				Fix LDAP injection by escaping special characters before including user input in LDAP filters.
				Use library-provided methods instead of building filter strings manually.
			</p>

			<!-- AI Fix Prompt -->
			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this prompt into Cursor, Claude Code, or Bolt to automatically fix LDAP injection in your codebase:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Fix all LDAP injection vulnerabilities in my codebase.

## What to look for

Search for these vulnerable patterns in LDAP authentication code:

1. String concatenation in LDAP filters:
   - Template literals: \`(&(uid=\${username})(userPassword=\${password}))\`
   - String interpolation: f"(&(uid={username})"
   - Concatenation: "(&(uid=" + username + ")"

2. Missing input escaping:
   - User input passed directly to ldapClient.search()
   - No escaping of LDAP special characters: * ( ) & | ! \\ NUL
   - req.body or request.json() values in filter strings

3. Dangerous filter construction:
   - Building filters with string operations instead of library methods
   - No use of parseFilter, EqualityFilter, or escape_filter_chars
   - Accepting wildcards (*) from user input

## How to fix

### Node.js (ldapjs) - Use Filter Objects:
\`\`\`typescript
// Before (vulnerable)
const filter = \`(&(uid=\${username})(userPassword=\${password}))\`
const result = await ldapClient.search(baseDN, { filter })

// After (secure) - Use EqualityFilter objects
import { EqualityFilter, AndFilter } from 'ldapjs'

const filter = new AndFilter({
  filters: [
    new EqualityFilter({ attribute: 'uid', value: username }),
    new EqualityFilter({ attribute: 'userPassword', value: password })
  ]
})
const result = await ldapClient.search(baseDN, { filter: filter.toString() })
\`\`\`

### Node.js - Manual Escaping Function:
\`\`\`typescript
function escapeLdap(input: string): string {
  return input
    .replace(/\\\\/g, '\\\\5c')
    .replace(/\\*/g, '\\\\2a')
    .replace(/\\(/g, '\\\\28')
    .replace(/\\)/g, '\\\\29')
    .replace(/\\x00/g, '\\\\00')
}

const safeUsername = escapeLdap(username)
const filter = \`(&(uid=\${safeUsername})(userPassword=\${escapeLdap(password)}))\`
\`\`\`

### Python (ldap3):
\`\`\`python
# Before (vulnerable)
filter = f"(&(uid={username})(userPassword={password}))"
conn.search(base_dn, filter)

# After (secure) - Use escape_filter_chars
from ldap3.utils.conv import escape_filter_chars

safe_user = escape_filter_chars(username)
safe_pass = escape_filter_chars(password)
filter = f"(&(uid={safe_user})(userPassword={safe_pass}))"
conn.search(base_dn, filter)
\`\`\`

## Additional security measures

1. Add input validation with allowlist:
\`\`\`typescript
const usernameRegex = /^[a-zA-Z0-9._-]+$/
if (!usernameRegex.test(username)) {
  throw new Error('Invalid username format')
}
\`\`\`

2. Use least-privilege LDAP binding account
3. Implement rate limiting on auth attempts
4. Log failed authentication attempts

## After fixing

1. Search for remaining patterns: \\$\\{.*\\}.*ldap|ldap.*\\$\\{
2. Test with payload: admin)(& as username
3. List all files modified with before/after snippets

Please proceed systematically through my codebase.`}</div>
				</div>
			</div>

			<!-- Manual Fix -->
			<div class="fix-section">
				<h3>Manual Fix - Node.js (ldapjs)</h3>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`// String interpolation - DANGEROUS
async function authenticate(username, password) {
  const filter = \`(&(uid=\${username})(userPassword=\${password}))\`
  const result = await ldapClient.search(
    'ou=users,dc=example,dc=com',
    { filter: filter }
  )
  return result.searchEntries.length > 0
}

// Attack: username="admin)(&" bypasses auth`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`// Use Filter objects - SAFE
import { EqualityFilter, AndFilter } from 'ldapjs'

async function authenticate(username, password) {
  // Validate input format first
  if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
    throw new Error('Invalid username format')
  }

  const filter = new AndFilter({
    filters: [
      new EqualityFilter({ attribute: 'uid', value: username }),
      new EqualityFilter({ attribute: 'userPassword', value: password })
    ]
  })

  const result = await ldapClient.search(
    'ou=users,dc=example,dc=com',
    { filter: filter.toString() }
  )
  return result.searchEntries.length > 0
}`}</code></pre>
					</div>
				</div>

				<h3>Manual Fix - Python (ldap3)</h3>
				<div class="code-comparison">
					<div class="code-block vulnerable">
						<div class="code-block-header">
							<span class="code-block-lang status-bad">VULNERABLE</span>
						</div>
						<pre><code>{`# f-string interpolation - DANGEROUS
def authenticate(username, password):
    filter = f"(&(uid={username})(userPassword={password}))"
    conn.search(base_dn, filter)
    return len(conn.entries) > 0

# Attack: username="admin)(&" bypasses auth`}</code></pre>
					</div>

					<div class="code-block secure">
						<div class="code-block-header">
							<span class="code-block-lang status-good">SECURE</span>
						</div>
						<pre><code>{`# Use escape_filter_chars - SAFE
from ldap3.utils.conv import escape_filter_chars
import re

def authenticate(username, password):
    # Validate input format first
    if not re.match(r'^[a-zA-Z0-9._-]+$', username):
        raise ValueError('Invalid username format')

    safe_user = escape_filter_chars(username)
    safe_pass = escape_filter_chars(password)
    filter = f"(&(uid={safe_user})(userPassword={safe_pass}))"

    conn.search(base_dn, filter)
    return len(conn.entries) > 0`}</code></pre>
					</div>
				</div>
			</div>

			<!-- Prevention Methods -->
			<div class="fix-section">
				<h3>Prevention methods by priority</h3>
				<div class="prevention-grid">
					<div class="prevention-card">
						<div class="prevention-priority">1</div>
						<h4>Use Filter Objects</h4>
						<p>Use library-provided Filter objects instead of string concatenation. They handle escaping automatically.</p>
						<div class="code-block mini">
							<pre><code>{`new EqualityFilter({ attribute: 'uid', value: username })`}</code></pre>
						</div>
					</div>
					<div class="prevention-card">
						<div class="prevention-priority">2</div>
						<h4>Escape Special Characters</h4>
						<p>If you must build filter strings, escape all LDAP special characters: * ( ) & | ! \\ NUL</p>
						<div class="code-block mini">
							<pre><code>{`escape_filter_chars(username)`}</code></pre>
						</div>
					</div>
					<div class="prevention-card">
						<div class="prevention-priority">3</div>
						<h4>Validate Input Format</h4>
						<p>Allowlist valid characters for usernames before any LDAP operation.</p>
						<div class="code-block mini">
							<pre><code>{`/^[a-zA-Z0-9._-]+$/.test(username)`}</code></pre>
						</div>
					</div>
					<div class="prevention-card">
						<div class="prevention-priority">4</div>
						<h4>Least Privilege Binding</h4>
						<p>Use read-only LDAP binding accounts with minimal permissions.</p>
						<div class="code-block mini">
							<pre><code>{`// Bind with service account, not admin`}</code></pre>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Comparison Table -->
		<section class="article-section">
			<h2>How does LDAP injection compare to other injection attacks?</h2>
			<p>
				LDAP injection follows the same principle as <a href="/kb/security/vulnerabilities/sql-injection/">SQL</a> and <a href="/kb/security/vulnerabilities/nosql-injection/">NoSQL</a> injection - exploiting unvalidated user input in queries.
				The main difference is the query language and target system.
			</p>

			<div class="comparison-table-wrapper">
				<table class="comparison-table">
					<thead>
						<tr>
							<th>Aspect</th>
							<th>SQL Injection</th>
							<th>NoSQL Injection</th>
							<th>LDAP Injection</th>
						</tr>
					</thead>
					<tbody>
						{#each comparisonData as row}
							<tr>
								<td><strong>{row.aspect}</strong></td>
								<td>{row.sql}</td>
								<td>{row.nosql}</td>
								<td>{row.ldap}</td>
							</tr>
						{/each}
					</tbody>
				</table>
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
					<p class="related-card-description">The classic database injection attack for comparison</p>
				</a>
				<a href="/kb/security/vulnerabilities/nosql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">NoSQL Injection</div>
					<p class="related-card-description">MongoDB and Firestore operator injection patterns</p>
				</a>
				<a href="/kb/security/vulnerabilities/command-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Command Injection</div>
					<p class="related-card-description">OS command injection in shell executions</p>
				</a>
				<a href="/kb/security/vulnerabilities/missing-auth/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Missing Authentication</div>
					<p class="related-card-description">When authentication checks are missing entirely</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive related-card">
					<div class="related-card-category">AI Tool</div>
					<div class="related-card-title">Cursor Security Patterns</div>
					<p class="related-card-description">Common vulnerabilities in Cursor-generated code</p>
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
			<h2>Scan your enterprise auth code for LDAP injection</h2>
			<p>Check your Active Directory integration and LDAP authentication for injection vulnerabilities.</p>
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

	/* Attack Examples */
	.attack-example {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.attack-example h3 {
		margin: 0 0 0.75rem;
		font-size: 1.0625rem;
		color: var(--text-primary);
	}

	.attack-example > p {
		margin: 0 0 1rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Special Characters Grid */
	.special-chars {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.char-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem;
		background: var(--bg-tertiary);
	}

	.char {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--red);
		min-width: 2.5rem;
	}

	.char-desc {
		font-size: 0.8125rem;
		color: var(--text-secondary);
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

	.consequences-list a {
		color: var(--green);
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

	/* Comparison Table */
	.comparison-table-wrapper {
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	.comparison-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
	}

	.comparison-table th,
	.comparison-table td {
		padding: 0.75rem 1rem;
		text-align: left;
		border: 1px solid var(--border);
	}

	.comparison-table th {
		background: var(--bg-secondary);
		font-weight: 600;
		color: var(--text-primary);
	}

	.comparison-table td {
		color: var(--text-secondary);
	}

	.comparison-table td strong {
		color: var(--text-primary);
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

		.special-chars {
			grid-template-columns: 1fr;
		}

		.faq-item h3 {
			font-size: 1rem;
		}

		.comparison-table {
			font-size: 0.8125rem;
		}

		.comparison-table th,
		.comparison-table td {
			padding: 0.5rem;
		}
	}
</style>
