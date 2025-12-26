<script lang="ts">
	import { Header } from '$lib/components/layout';
	import { onMount } from 'svelte';

	function copyPrompt(event: MouseEvent) {
		const button = event.currentTarget as HTMLButtonElement;
		const pre = button.closest('.fix-prompt')?.querySelector('pre');
		if (pre) {
			navigator.clipboard.writeText(pre.textContent || '');
			const originalText = button.textContent;
			button.textContent = 'Copied!';
			setTimeout(() => button.textContent = originalText, 2000);
		}
	}

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Security', href: '/kb/security' },
		{ label: 'Vulnerabilities', href: '/kb/security/vulnerabilities' },
		{ label: 'XXE' }
	];

	const faqs = [
		{
			question: 'What is an XXE vulnerability?',
			answer:
				'XXE (XML External Entity) is a vulnerability where XML parsers process references to external files or URLs embedded in XML documents. Attackers can exploit this to read sensitive files like <code>/etc/passwd</code>, access internal services (<a href="/kb/security/vulnerabilities/ssrf/">SSRF</a>), or crash servers. According to <a href="https://owasp.org/www-community/vulnerabilities/XML_External_Entity_(XXE)_Processing">OWASP</a>, XXE was significant enough to have its own Top 10 category (A4:2017) before being merged into Security Misconfiguration.'
		},
		{
			question: 'How do XXE attacks work?',
			answer:
				'XML allows defining "entities" in the Document Type Definition (DTD). External entities reference files (<code>file:///etc/passwd</code>) or URLs (<code>http://internal-server/</code>). When the parser processes the XML, it fetches and includes the entity content. Attackers craft XML with malicious entity definitions, submit it to your application, and the parser reveals secrets. The "Billion Laughs" variant uses nested entity expansion to exhaust server memory.'
		},
		{
			question: 'Is JSON safer than XML for APIs?',
			answer:
				'Yes, significantly. JSON has no entity mechanism, so XXE attacks are impossible. This is one reason modern APIs prefer JSON over XML. If you don\'t need XML-specific features (namespaces, DTD validation, XSLT), use JSON instead. XML is still necessary for SOAP services, SVG files, Office documents (DOCX/XLSX are XML-based), and legacy systems. When XML is required, always disable DTD processing.'
		},
		{
			question: 'How do I prevent XXE in Java?',
			answer:
				'Java\'s <code>DocumentBuilderFactory</code> is vulnerable by default. Add these settings: <code>dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true)</code> and <code>dbf.setFeature("http://xml.org/sax/features/external-general-entities", false)</code>. Also set <code>setXIncludeAware(false)</code> and <code>setExpandEntityReferences(false)</code>. The <a href="https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html">OWASP XXE Prevention Cheat Sheet</a> has complete configurations for each Java parser.'
		},
		{
			question: 'Are modern XML parsers safe by default?',
			answer:
				'Some are, many aren\'t. PHP 8.0+ and libxml2 2.9+ (used by many parsers) disable external entities by default. .NET 4.5.2+ <code>XmlReader</code> is safe by default. But Java\'s <code>DocumentBuilder</code>, Python\'s standard <code>xml</code> module (for Billion Laughs), and older libraries remain vulnerable unless explicitly configured. Always check your specific parser\'s documentation and test with a malicious XML payload.'
		}
	];

	let schemaData: object;

	onMount(() => {
		schemaData = {
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'TechArticle',
					headline: 'XXE: How AI Code Lets Attackers Read Your Server Files',
					description:
						'XML External Entity (XXE) attacks let attackers read /etc/passwd and internal files. AI generates vulnerable XML parsers by default. Learn secure patterns for Node.js, Python, and Java.',
					author: {
						'@type': 'Organization',
						name: 'vibeship',
						url: 'https://vibeship.co'
					},
					publisher: {
						'@type': 'Organization',
						name: 'vibeship',
						url: 'https://vibeship.co'
					},
					datePublished: '2025-12-17',
					dateModified: '2025-12-17',
					mainEntityOfPage: {
						'@type': 'WebPage',
						'@id': 'https://vibeship.co/kb/security/vulnerabilities/xxe/'
					},
					about: [
						{
							'@type': 'Thing',
							name: 'XML External Entity Vulnerability',
							sameAs: 'https://cwe.mitre.org/data/definitions/611.html'
						}
					],
					keywords:
						'XXE vulnerability, XML external entity, CWE-611, XML injection, billion laughs, vibe coding security'
				},
				{
					'@type': 'FAQPage',
					mainEntity: faqs.map((faq) => ({
						'@type': 'Question',
						name: faq.question,
						acceptedAnswer: {
							'@type': 'Answer',
							text: faq.answer.replace(/<[^>]*>/g, '')
						}
					}))
				},
				{
					'@type': 'BreadcrumbList',
					itemListElement: [
						{
							'@type': 'ListItem',
							position: 1,
							name: 'Home',
							item: 'https://vibeship.co'
						},
						{
							'@type': 'ListItem',
							position: 2,
							name: 'Knowledge Base',
							item: 'https://vibeship.co/kb/'
						},
						{
							'@type': 'ListItem',
							position: 3,
							name: 'Security',
							item: 'https://vibeship.co/kb/security/'
						},
						{
							'@type': 'ListItem',
							position: 4,
							name: 'Vulnerabilities',
							item: 'https://vibeship.co/kb/security/vulnerabilities/'
						},
						{
							'@type': 'ListItem',
							position: 5,
							name: 'XXE',
							item: 'https://vibeship.co/kb/security/vulnerabilities/xxe/'
						}
					]
				}
			]
		};
	});
</script>

<svelte:head>
	<title>XXE in AI-Generated Code | VibeShip</title>
	<meta
		name="description"
		content="XML External Entity (XXE) attacks let attackers read /etc/passwd and internal files. AI generates vulnerable XML parsers by default. Learn secure patterns for Node.js, Python, and Java."
	/>
	<meta
		name="keywords"
		content="XXE vulnerability, XML external entity, CWE-611, XML injection, billion laughs attack, vibe coding"
	/>
	<link rel="canonical" href="https://vibeship.co/kb/security/vulnerabilities/xxe/" />
	<meta property="og:title" content="XXE: How AI Code Lets Attackers Read Your Server Files" />
	<meta
		property="og:description"
		content="XXE attacks let attackers read server files via XML parsers. Learn secure patterns for your vibe coded apps."
	/>
	<meta property="og:url" content="https://vibeship.co/kb/security/vulnerabilities/xxe/" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="XXE: How AI Code Lets Attackers Read Your Server Files" />
	<meta
		name="twitter:description"
		content="XXE attacks exploit XML parsers. AI generates vulnerable code by default."
	/>
	{#if schemaData}
		{@html `<script type="application/ld+json">${JSON.stringify(schemaData)}</script>`}
	{/if}
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<header class="article-header">
			<div class="meta-badges">
				<span class="badge badge-high">High Severity</span>
				<span class="badge badge-owasp">OWASP A05:2021</span>
				<span class="badge badge-cwe">CWE-611</span>
			</div>
			<h1>XXE: How AI Code Lets Attackers Read Your Server Files</h1>

			<div class="quick-answer">
				<strong>Quick Answer:</strong> XXE (XML External Entity) attacks exploit XML parsers to read
				server files, access internal services, or crash your application. AI tools generate XML
				parsing code with dangerous defaults enabled. The fix is simple:
				<strong>disable DTD processing</strong> and external entities in your XML parser configuration.
			</div>
		</header>

		<div class="capabilities-box">
			<h4>XXE Attack Capabilities</h4>
			<div class="capability-grid">
				<div class="capability">
					<span class="capability-name">File Disclosure</span>
					<span class="capability-desc">Read /etc/passwd, config files, credentials</span>
				</div>
				<div class="capability">
					<span class="capability-name">SSRF</span>
					<span class="capability-desc">Access internal services, AWS metadata</span>
				</div>
				<div class="capability">
					<span class="capability-name">DoS</span>
					<span class="capability-desc">Billion Laughs attack exhausts memory</span>
				</div>
				<div class="capability">
					<span class="capability-name">RCE (rare)</span>
					<span class="capability-desc">Code execution via PHP expect://</span>
				</div>
			</div>
		</div>

		<section class="content-section">
			<h2>What is XXE?</h2>

			<p>
				XXE (XML External Entity) is a vulnerability in XML parsers that process external entity
				references. When you parse XML, the parser can be instructed to fetch and include content
				from external files or URLs. Attackers exploit this to read sensitive files like
				<code>/etc/passwd</code>, AWS credentials, database configs - anything the server can access.
			</p>

			<p>
				According to <a
					href="https://owasp.org/www-community/vulnerabilities/XML_External_Entity_(XXE)_Processing"
					>OWASP</a
				>, XXE was significant enough to have its own category in the 2017 Top 10 (A4:2017). In
				2021, it was merged into Security Misconfiguration (A05:2021) because the root cause is
				parser misconfiguration.
			</p>

			<p>
				For vibe coders, the risk is real: AI tools often generate XML parsing code using default
				configurations that allow external entities. Unless you explicitly disable these features,
				your code is vulnerable.
			</p>

			<div class="warning-box">
				<strong>Related Attack:</strong> XXE can enable
				<a href="/kb/security/vulnerabilities/ssrf/">SSRF attacks</a> by fetching internal URLs. If your
				parser allows <code>http://</code> entities, attackers can access
				<code>http://169.254.169.254/</code> (AWS metadata) or internal services.
			</div>
		</section>

		<section class="content-section">
			<h2>How XXE Attacks Work</h2>

			<p>
				XML allows defining "entities" in the Document Type Definition (DTD). An entity is like a
				variable that gets replaced when the XML is processed. External entities reference files or
				URLs:
			</p>

			<h3>Basic File Disclosure Attack</h3>

			<div class="code-block">
				<div class="code-label">XML - Malicious Payload</div>
				<pre><code>&lt;?xml version="1.0"?&gt;
&lt;!DOCTYPE foo [
  &lt;!ENTITY xxe SYSTEM "file:///etc/passwd"&gt;
]&gt;
&lt;user&gt;&amp;xxe;&lt;/user&gt;</code></pre>
			</div>

			<p>
				When the parser processes <code>&amp;xxe;</code>, it reads <code>/etc/passwd</code> and
				substitutes its content. If the application returns the parsed XML or includes it in a
				response, the attacker sees your server's user list.
			</p>

			<h3>SSRF via XXE</h3>

			<div class="code-block">
				<div class="code-label">XML - SSRF Attack</div>
				<pre><code>&lt;?xml version="1.0"?&gt;
&lt;!DOCTYPE foo [
  &lt;!ENTITY xxe SYSTEM "http://169.254.169.254/latest/meta-data/iam/security-credentials/"&gt;
]&gt;
&lt;data&gt;&amp;xxe;&lt;/data&gt;</code></pre>
			</div>

			<p>
				This fetches AWS instance credentials from the metadata service - the same attack vector as
				direct <a href="/kb/security/vulnerabilities/ssrf/">SSRF</a>.
			</p>

			<h3>Billion Laughs (DoS)</h3>

			<div class="code-block">
				<div class="code-label">XML - DoS Attack</div>
				<pre><code>&lt;?xml version="1.0"?&gt;
&lt;!DOCTYPE lolz [
  &lt;!ENTITY lol "lol"&gt;
  &lt;!ENTITY lol2 "&amp;lol;&amp;lol;&amp;lol;&amp;lol;&amp;lol;&amp;lol;&amp;lol;&amp;lol;&amp;lol;&amp;lol;"&gt;
  &lt;!ENTITY lol3 "&amp;lol2;&amp;lol2;&amp;lol2;&amp;lol2;&amp;lol2;&amp;lol2;&amp;lol2;&amp;lol2;&amp;lol2;&amp;lol2;"&gt;
  &lt;!ENTITY lol4 "&amp;lol3;&amp;lol3;&amp;lol3;&amp;lol3;&amp;lol3;&amp;lol3;&amp;lol3;&amp;lol3;&amp;lol3;&amp;lol3;"&gt;
  &lt;!-- Continues to lol9... --&gt;
]&gt;
&lt;lolz&gt;&amp;lol9;&lt;/lolz&gt;</code></pre>
			</div>

			<p>
				The nested entity expansion creates exponential growth - a tiny XML file expands to
				gigabytes, exhausting server memory. This doesn't require external access, just entity
				expansion.
			</p>
		</section>

		<section class="content-section">
			<h2>Why AI Generates Vulnerable Code</h2>

			<p>
				AI tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> and
				<a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> generate XML parsing code using
				default configurations. These defaults prioritize functionality over security, leaving external
				entities enabled.
			</p>

			<h3>Java - Vulnerable by Default</h3>

			<div class="code-block vulnerable">
				<div class="code-label">Java - VULNERABLE (AI Default)</div>
				<pre><code>// What AI typically generates - XXE enabled by default!
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
DocumentBuilder db = dbf.newDocumentBuilder();
Document doc = db.parse(userInput);</code></pre>
			</div>

			<h3>Python - Partially Vulnerable</h3>

			<div class="code-block vulnerable">
				<div class="code-label">Python - VULNERABLE to Billion Laughs</div>
				<pre><code># AI's default - vulnerable to DoS, partially safe from external entities
import xml.etree.ElementTree as ET
tree = ET.parse(user_file)  # Billion Laughs can crash this</code></pre>
			</div>

			<h3>Node.js - Configuration-Dependent</h3>

			<div class="code-block vulnerable">
				<div class="code-label">JavaScript - POTENTIALLY VULNERABLE</div>
				<pre><code>// Some Node.js parsers allow external entities
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
parser.parseString(userInput, (err, result) => &#123;
  // Depends on underlying libxml2 version
&#125;)</code></pre>
			</div>

			<h3>Why This Happens</h3>

			<ul>
				<li>AI learns from older tutorials without security hardening</li>
				<li>Default configurations prioritize compatibility</li>
				<li>XXE protection requires <em>explicit</em> disabling of features</li>
				<li>Training data includes vulnerable Stack Overflow answers</li>
			</ul>
		</section>

		<section class="content-section">
			<h2>Language-Specific Fixes</h2>

			<p>
				The fix is always the same concept: <strong>disable DTD processing and external entities</strong
				>. The syntax varies by language and parser.
			</p>

			<h3>Java</h3>

			<p>
				Java is the most dangerous because <code>DocumentBuilderFactory</code> is vulnerable by default.
			</p>

			<div class="code-block secure">
				<div class="code-label">Java - SECURE Configuration</div>
				<pre><code>// Disable DTD and external entities completely
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

// Disable DTDs entirely
dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);

// Disable external entities
dbf.setFeature("http://xml.org/sax/features/external-general-entities", false);
dbf.setFeature("http://xml.org/sax/features/external-parameter-entities", false);

// Disable XInclude
dbf.setXIncludeAware(false);

// Don't expand entity references
dbf.setExpandEntityReferences(false);

DocumentBuilder db = dbf.newDocumentBuilder();
Document doc = db.parse(userInput);</code></pre>
			</div>

			<h3>Python</h3>

			<p>
				Use <a href="https://pypi.org/project/defusedxml/">defusedxml</a> as a drop-in replacement for
				the standard library.
			</p>

			<div class="code-block secure">
				<div class="code-label">Python - SECURE with defusedxml</div>
				<pre><code># pip install defusedxml
from defusedxml import ElementTree as ET

# Safe from XXE and Billion Laughs
tree = ET.parse(user_file)
root = tree.getroot()

# Also available:
from defusedxml import minidom
from defusedxml import sax</code></pre>
			</div>

			<h3>Node.js</h3>

			<div class="code-block secure">
				<div class="code-label">JavaScript - SECURE Configuration</div>
				<pre><code>// Using libxmljs2 with safe options
const libxmljs = require('libxmljs2')

const doc = libxmljs.parseXml(xmlString, &#123;
  noent: false,     // Don't expand entities
  dtdload: false,   // Don't load external DTD
  dtdvalid: false,  // Don't validate against DTD
  nonet: true       // No network access
&#125;)

// Or better: just use JSON if possible</code></pre>
			</div>

			<h3>PHP (8.0+)</h3>

			<div class="code-block secure">
				<div class="code-label">PHP - SAFE by Default (8.0+)</div>
				<pre><code>// PHP 8.0+ disables external entities by default
$xml = simplexml_load_string($userInput);

// For older PHP versions:
libxml_set_external_entity_loader(function () &#123;
    return null;  // Prevent external entity loading
&#125;);</code></pre>
			</div>

			<h3>.NET</h3>

			<div class="code-block secure">
				<div class="code-label">C# - SECURE Configuration</div>
				<pre><code>// .NET 4.5.2+ XmlReader is safe by default
// For older versions or XmlDocument:
XmlReaderSettings settings = new XmlReaderSettings();
settings.DtdProcessing = DtdProcessing.Prohibit;
settings.XmlResolver = null;

using (XmlReader reader = XmlReader.Create(stream, settings))
&#123;
    // Safe XML processing
&#125;</code></pre>
			</div>

			<div class="info-box">
				<strong>Key Message:</strong> The configuration varies, but the goal is always the same - disable
				DTD processing and external entity resolution. When in doubt, consult the
				<a href="https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html"
					>OWASP XXE Prevention Cheat Sheet</a
				> for your specific parser.
			</div>
		</section>

		<section class="content-section">
			<h2>When to Use JSON Instead</h2>

			<p>
				The simplest fix for XXE? <strong>Don't use XML.</strong> JSON has no entity mechanism, making
				XXE attacks impossible.
			</p>

			<h3>When JSON is Better</h3>

			<ul>
				<li><strong>REST APIs:</strong> Modern APIs almost universally use JSON</li>
				<li><strong>Configuration files:</strong> JSON, YAML, or TOML are safer alternatives</li>
				<li><strong>Data interchange:</strong> JSON is simpler and widely supported</li>
				<li><strong>Frontend-backend communication:</strong> JavaScript native JSON support</li>
			</ul>

			<h3>When XML is Still Required</h3>

			<ul>
				<li><strong>SOAP web services:</strong> Legacy enterprise systems</li>
				<li><strong>SVG files:</strong> Vector graphics are XML-based</li>
				<li><strong>Office documents:</strong> DOCX, XLSX are XML archives</li>
				<li><strong>RSS/Atom feeds:</strong> Syndication formats</li>
				<li><strong>Legacy integrations:</strong> Systems that only speak XML</li>
			</ul>

			<p>
				If you're building a new vibe coded API, use JSON. Only reach for XML when you have a
				specific requirement that demands it - and when you do, disable DTD processing immediately.
			</p>
		</section>

		<section class="content-section">
			<h2>AI Fix Prompt: Audit for XXE</h2>

			<p>
				Copy this prompt into <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>,
				<a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, or any AI assistant:
			</p>

			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span>AI Security Audit Prompt</span>
					<button class="copy-btn" onclick={copyPrompt}>Copy</button>
				</div>
				<pre>Review my codebase for XML External Entity (XXE) vulnerabilities (CWE-611):

## Check 1: XML Parser Usage
Search for XML parsing patterns:
- Java: DocumentBuilderFactory, SAXParserFactory, XMLReader, XMLInputFactory
- Python: xml.etree, xml.sax, lxml, xml.dom
- Node.js: xml2js, libxmljs, fast-xml-parser, xml-parser
- PHP: simplexml_load_string, simplexml_load_file, DOMDocument
- .NET: XmlDocument, XmlReader, XDocument

## Check 2: DTD/External Entity Configuration
For each parser found, verify:
- Is DTD processing disabled?
- Are external general entities disabled?
- Are external parameter entities disabled?
- Is entity expansion limited (Billion Laughs protection)?

Flag: Parsers created without explicit security configuration

## Check 3: User Input to XML
Trace data flow:
- Does user input reach XML parsing?
- Are uploaded files (XML, SVG, DOCX, XLSX) parsed?
- Are SOAP/XML-RPC endpoints present?
- Does any external data get parsed as XML?

## Secure Configurations Required

Java - Add these features:
- setFeature("http://apache.org/xml/features/disallow-doctype-decl", true)
- setFeature("http://xml.org/sax/features/external-general-entities", false)
- setFeature("http://xml.org/sax/features/external-parameter-entities", false)
- setXIncludeAware(false), setExpandEntityReferences(false)

Python - Replace with:
- from defusedxml import ElementTree (instead of xml.etree.ElementTree)

Node.js - Set parser options:
- {'{'} noent: false, dtdload: false, dtdvalid: false, nonet: true {'}'}

PHP 7.x - Add before parsing:
- libxml_set_external_entity_loader(function() {'{'} return null; {'}'});

## Output Format
For each vulnerability:
1. File path and line number
2. The vulnerable parser instantiation
3. Attack scenario (what an attacker could access)
4. Language-specific secure configuration

Prioritize by: User input → XML parser = Critical</pre>
			</div>
		</section>

		<section class="content-section">
			<h2>Frequently Asked Questions</h2>
			<div class="faq-list">
				{#each faqs as faq}
					<div class="faq-item">
						<h3>{faq.question}</h3>
						<p>{@html faq.answer}</p>
					</div>
				{/each}
			</div>
		</section>

		<section class="content-section">
			<h2>Related Security Topics</h2>
			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/ssrf/" class="card card-interactive">
					<h3>SSRF Vulnerabilities</h3>
					<p>XXE can enable SSRF by fetching internal URLs. Understand the connection.</p>
				</a>
				<a href="/kb/security/vulnerabilities/insecure-deserialization/" class="card card-interactive">
					<h3>Insecure Deserialization</h3>
					<p>Another injection vector that can lead to RCE, similar attack patterns.</p>
				</a>
				<a href="/kb/security/vulnerabilities/command-injection/" class="card card-interactive">
					<h3>Command Injection</h3>
					<p>When XXE enables code execution, command injection patterns apply.</p>
				</a>
				<a href="/kb/security/vulnerabilities/path-traversal/" class="card card-interactive">
					<h3>Path Traversal</h3>
					<p>XXE file disclosure uses similar path patterns to access sensitive files.</p>
				</a>
			</div>
		</section>

		<section class="final-cta">
			<h2>Scan Your Vibe Coded Project</h2>
			<p>
				vibeship scanner detects XXE vulnerabilities by identifying XML parsers without security
				configuration - before attackers find them.
			</p>
			<a href="https://scanner.vibeship.co" class="cta-button">Try vibeship scanner Free</a>
		</section>
	</article>
</div>

<style>
	.article-header {
		margin-bottom: 2rem;
	}

	.meta-badges {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.badge-high {
		background: var(--orange);
		color: var(--bg-primary);
	}

	.badge-owasp {
		background: var(--violet);
		color: var(--bg-primary);
	}

	.badge-cwe {
		background: var(--blue);
		color: var(--bg-primary);
	}

	.capabilities-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--red);
		padding: 1.25rem;
		margin-bottom: 2rem;
	}

	.capabilities-box h4 {
		margin: 0 0 1rem 0;
		color: var(--text-primary);
	}

	.capability-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	@media (max-width: 640px) {
		.capability-grid {
			grid-template-columns: 1fr;
		}
	}

	.capability {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.capability-name {
		font-weight: 600;
		color: var(--text-primary);
	}

	.capability-desc {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.content-section {
		margin-bottom: 2.5rem;
	}

	.warning-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--orange);
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	.info-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--blue);
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	.code-block {
		margin: 1.5rem 0;
		border: 1px solid var(--border);
		overflow: hidden;
	}

	.code-block.vulnerable {
		border-color: var(--red);
	}

	.code-block.secure {
		border-color: var(--green);
	}

	.code-label {
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		font-weight: 600;
		background: var(--bg-secondary);
		color: var(--text-primary);
	}

	.code-block.vulnerable .code-label {
		color: var(--red);
	}

	.code-block.secure .code-label {
		color: var(--green);
	}

	.code-block pre {
		margin: 0;
		padding: 1rem;
		background: var(--bg-tertiary);
		overflow-x: auto;
	}

	.code-block code {
		font-size: 0.8125rem;
		line-height: 1.6;
	}

	.fix-prompt {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		margin: 1.5rem 0;
	}

	.fix-prompt-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background: var(--bg-tertiary);
		border-bottom: 1px solid var(--border);
	}

	.fix-prompt-header span {
		font-weight: 600;
		color: var(--text-primary);
	}

	.copy-btn {
		padding: 0.25rem 0.75rem;
		background: var(--green-dim);
		color: var(--bg-primary);
		border: none;
		font-size: 0.75rem;
		cursor: pointer;
	}

	.copy-btn:hover {
		background: var(--green);
	}

	.fix-prompt pre {
		margin: 0;
		padding: 1rem;
		background: var(--bg-tertiary);
		font-size: 0.8125rem;
		line-height: 1.6;
		overflow-x: auto;
		white-space: pre-wrap;
	}
</style>
