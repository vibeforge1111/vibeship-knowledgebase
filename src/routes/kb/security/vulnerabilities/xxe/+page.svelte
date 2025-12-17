<script lang="ts">
	import { onMount } from 'svelte';

	// FAQ accordion state using Svelte 5 runes
	let openFaq = $state<number | null>(null);

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}

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

	// Schema.org structured data
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

		const script = document.createElement('script');
		script.type = 'application/ld+json';
		script.textContent = JSON.stringify(schemaData);
		document.head.appendChild(script);

		return () => {
			script.remove();
		};
	});
</script>

<svelte:head>
	<title>XXE: How AI Code Lets Attackers Read Your Server Files | vibeship</title>
	<meta
		name="description"
		content="XML External Entity (XXE) attacks let attackers read /etc/passwd and internal files. AI generates vulnerable XML parsers by default. Learn secure patterns for Node.js, Python, and Java."
	/>
	<meta
		name="keywords"
		content="XXE vulnerability, XML external entity, CWE-611, XML injection, billion laughs attack, vibe coding"
	/>
	<link rel="canonical" href="https://vibeship.co/kb/security/vulnerabilities/xxe/" />

	<!-- Open Graph -->
	<meta property="og:title" content="XXE: How AI Code Lets Attackers Read Your Server Files" />
	<meta
		property="og:description"
		content="XXE attacks let attackers read server files via XML parsers. Learn secure patterns for your vibe coded apps."
	/>
	<meta property="og:url" content="https://vibeship.co/kb/security/vulnerabilities/xxe/" />
	<meta property="og:type" content="article" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="XXE: How AI Code Lets Attackers Read Your Server Files" />
	<meta
		name="twitter:description"
		content="XXE attacks exploit XML parsers. AI generates vulnerable code by default."
	/>
</svelte:head>

<div class="article-container">
	<!-- Breadcrumb Navigation -->
	<nav class="breadcrumb" aria-label="Breadcrumb">
		<ol>
			<li><a href="/">Home</a></li>
			<li><a href="/kb/">Knowledge Base</a></li>
			<li><a href="/kb/security/">Security</a></li>
			<li><a href="/kb/security/vulnerabilities/">Vulnerabilities</a></li>
			<li><span aria-current="page">XXE</span></li>
		</ol>
	</nav>

	<article class="vulnerability-article">
		<!-- Article Header -->
		<header class="article-header">
			<div class="meta-badges">
				<span class="badge badge-high">High Severity</span>
				<span class="badge badge-owasp"
					><a
						href="https://owasp.org/Top10/A05_2021-Security_Misconfiguration/"
						target="_blank"
						rel="noopener">OWASP A05:2021</a
					></span
				>
				<span class="badge badge-cwe"
					><a href="https://cwe.mitre.org/data/definitions/611.html" target="_blank" rel="noopener"
						>CWE-611</a
					></span
				>
			</div>

			<h1>XXE: How AI Code Lets Attackers Read Your Server Files</h1>

			<p class="subtitle">
				XML External Entity attacks exploit parsers to read /etc/passwd, perform SSRF, or crash your server.
			</p>

			<!-- Quick Answer Box -->
			<div class="quick-answer">
				<strong>Quick Answer:</strong>
				XXE (XML External Entity) attacks exploit XML parsers to read server files, access internal services, or crash your application. AI tools generate XML parsing code with dangerous defaults enabled. The fix is simple: <strong>disable DTD processing</strong> and external entities in your XML parser configuration.
			</div>
		</header>

		<!-- Attack Capabilities Box -->
		<div class="capabilities-box">
			<h4>XXE Attack Capabilities</h4>
			<div class="capability-grid">
				<div class="capability">
					<span class="capability-icon">📁</span>
					<span class="capability-name">File Disclosure</span>
					<span class="capability-desc">Read /etc/passwd, config files, credentials</span>
				</div>
				<div class="capability">
					<span class="capability-icon">🌐</span>
					<span class="capability-name">SSRF</span>
					<span class="capability-desc">Access internal services, AWS metadata</span>
				</div>
				<div class="capability">
					<span class="capability-icon">💥</span>
					<span class="capability-name">DoS</span>
					<span class="capability-desc">Billion Laughs attack exhausts memory</span>
				</div>
				<div class="capability">
					<span class="capability-icon">⚡</span>
					<span class="capability-name">RCE (rare)</span>
					<span class="capability-desc">Code execution via PHP expect://</span>
				</div>
			</div>
		</div>

		<!-- Table of Contents -->
		<nav class="toc">
			<h2>Contents</h2>
			<ol>
				<li><a href="#what-is-xxe">What is XXE?</a></li>
				<li><a href="#how-attacks-work">How XXE Attacks Work</a></li>
				<li><a href="#why-ai-generates-vulnerable-code">Why AI Generates Vulnerable Code</a></li>
				<li><a href="#language-specific-fixes">Language-Specific Fixes</a></li>
				<li><a href="#when-to-use-json">When to Use JSON Instead</a></li>
				<li><a href="#ai-fix-prompt">AI Fix Prompt</a></li>
				<li><a href="#faq">FAQ</a></li>
			</ol>
		</nav>

		<!-- Section 1: What is XXE? -->
		<section id="what-is-xxe">
			<h2>What is XXE?</h2>

			<p>
				XXE (XML External Entity) is a vulnerability in XML parsers that process external entity references. When you parse XML, the parser can be instructed to fetch and include content from external files or URLs. Attackers exploit this to read sensitive files like <code>/etc/passwd</code>, AWS credentials, database configs - anything the server can access.
			</p>

			<p>
				According to <a href="https://owasp.org/www-community/vulnerabilities/XML_External_Entity_(XXE)_Processing" target="_blank" rel="noopener">OWASP</a>, XXE was significant enough to have its own category in the 2017 Top 10 (A4:2017). In 2021, it was merged into Security Misconfiguration (A05:2021) because the root cause is parser misconfiguration.
			</p>

			<p>
				For vibe coders, the risk is real: AI tools often generate XML parsing code using default configurations that allow external entities. Unless you explicitly disable these features, your code is vulnerable.
			</p>

			<div class="warning-box">
				<strong>Related Attack:</strong> XXE can enable <a href="/kb/security/vulnerabilities/ssrf/">SSRF attacks</a> by fetching internal URLs. If your parser allows <code>http://</code> entities, attackers can access <code>http://169.254.169.254/</code> (AWS metadata) or internal services.
			</div>
		</section>

		<!-- Section 2: How XXE Attacks Work -->
		<section id="how-attacks-work">
			<h2>How XXE Attacks Work</h2>

			<p>
				XML allows defining "entities" in the Document Type Definition (DTD). An entity is like a variable that gets replaced when the XML is processed. External entities reference files or URLs:
			</p>

			<h3>Basic File Disclosure Attack</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">XML - Malicious Payload</span>
				</div>
				<pre><code>{`<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<user>&xxe;</user>`}</code></pre>
			</div>

			<p>
				When the parser processes <code>&xxe;</code>, it reads <code>/etc/passwd</code> and substitutes its content. If the application returns the parsed XML or includes it in a response, the attacker sees your server's user list.
			</p>

			<h3>SSRF via XXE</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">XML - SSRF Attack</span>
				</div>
				<pre><code>{`<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "http://169.254.169.254/latest/meta-data/iam/security-credentials/">
]>
<data>&xxe;</data>`}</code></pre>
			</div>

			<p>
				This fetches AWS instance credentials from the metadata service - the same attack vector as direct <a href="/kb/security/vulnerabilities/ssrf/">SSRF</a>.
			</p>

			<h3>Billion Laughs (DoS)</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">XML - DoS Attack</span>
				</div>
				<pre><code>{`<?xml version="1.0"?>
<!DOCTYPE lolz [
  <!ENTITY lol "lol">
  <!ENTITY lol2 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
  <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
  <!ENTITY lol4 "&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;">
  <!-- Continues to lol9... -->
]>
<lolz>&lol9;</lolz>`}</code></pre>
			</div>

			<p>
				The nested entity expansion creates exponential growth - a tiny XML file expands to gigabytes, exhausting server memory. This doesn't require external access, just entity expansion.
			</p>
		</section>

		<!-- Section 3: Why AI Generates Vulnerable Code -->
		<section id="why-ai-generates-vulnerable-code">
			<h2>Why AI Generates Vulnerable Code</h2>

			<p>
				AI tools like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> and <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> generate XML parsing code using default configurations. These defaults prioritize functionality over security, leaving external entities enabled.
			</p>

			<h3>Java - Vulnerable by Default</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">Java - VULNERABLE (AI Default)</span>
				</div>
				<pre><code>{`// What AI typically generates - XXE enabled by default!
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
DocumentBuilder db = dbf.newDocumentBuilder();
Document doc = db.parse(userInput);`}</code></pre>
			</div>

			<h3>Python - Partially Vulnerable</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">Python - VULNERABLE to Billion Laughs</span>
				</div>
				<pre><code>{`# AI's default - vulnerable to DoS, partially safe from external entities
import xml.etree.ElementTree as ET
tree = ET.parse(user_file)  # Billion Laughs can crash this`}</code></pre>
			</div>

			<h3>Node.js - Configuration-Dependent</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">JavaScript - POTENTIALLY VULNERABLE</span>
				</div>
				<pre><code>{`// Some Node.js parsers allow external entities
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
parser.parseString(userInput, (err, result) => {
  // Depends on underlying libxml2 version
})`}</code></pre>
			</div>

			<h3>Why This Happens</h3>

			<ul>
				<li>AI learns from older tutorials without security hardening</li>
				<li>Default configurations prioritize compatibility</li>
				<li>XXE protection requires <em>explicit</em> disabling of features</li>
				<li>Training data includes vulnerable Stack Overflow answers</li>
			</ul>
		</section>

		<!-- Section 4: Language-Specific Fixes -->
		<section id="language-specific-fixes">
			<h2>Language-Specific Fixes</h2>

			<p>
				The fix is always the same concept: <strong>disable DTD processing and external entities</strong>. The syntax varies by language and parser.
			</p>

			<h3>Java</h3>

			<p>Java is the most dangerous because <code>DocumentBuilderFactory</code> is vulnerable by default.</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">Java - SECURE Configuration</span>
				</div>
				<pre><code>{`// Disable DTD and external entities completely
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
Document doc = db.parse(userInput);`}</code></pre>
			</div>

			<h3>Python</h3>

			<p>
				Use <a href="https://pypi.org/project/defusedxml/" target="_blank" rel="noopener">defusedxml</a> as a drop-in replacement for the standard library.
			</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">Python - SECURE with defusedxml</span>
				</div>
				<pre><code>{`# pip install defusedxml
from defusedxml import ElementTree as ET

# Safe from XXE and Billion Laughs
tree = ET.parse(user_file)
root = tree.getroot()

# Also available:
from defusedxml import minidom
from defusedxml import sax`}</code></pre>
			</div>

			<h3>Node.js</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">JavaScript - SECURE Configuration</span>
				</div>
				<pre><code>{`// Using libxmljs2 with safe options
const libxmljs = require('libxmljs2')

const doc = libxmljs.parseXml(xmlString, {
  noent: false,     // Don't expand entities
  dtdload: false,   // Don't load external DTD
  dtdvalid: false,  // Don't validate against DTD
  nonet: true       // No network access
})

// Or better: just use JSON if possible`}</code></pre>
			</div>

			<h3>PHP (8.0+)</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">PHP - SAFE by Default (8.0+)</span>
				</div>
				<pre><code>{`// PHP 8.0+ disables external entities by default
$xml = simplexml_load_string($userInput);

// For older PHP versions:
libxml_set_external_entity_loader(function () {
    return null;  // Prevent external entity loading
});`}</code></pre>
			</div>

			<h3>.NET</h3>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">C# - SECURE Configuration</span>
				</div>
				<pre><code>{`// .NET 4.5.2+ XmlReader is safe by default
// For older versions or XmlDocument:
XmlReaderSettings settings = new XmlReaderSettings();
settings.DtdProcessing = DtdProcessing.Prohibit;
settings.XmlResolver = null;

using (XmlReader reader = XmlReader.Create(stream, settings))
{
    // Safe XML processing
}`}</code></pre>
			</div>

			<div class="info-box">
				<strong>Key Message:</strong> The configuration varies, but the goal is always the same - disable DTD processing and external entity resolution. When in doubt, consult the <a href="https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html" target="_blank" rel="noopener">OWASP XXE Prevention Cheat Sheet</a> for your specific parser.
			</div>
		</section>

		<!-- Section 5: When to Use JSON -->
		<section id="when-to-use-json">
			<h2>When to Use JSON Instead</h2>

			<p>
				The simplest fix for XXE? <strong>Don't use XML.</strong> JSON has no entity mechanism, making XXE attacks impossible.
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
				If you're building a new vibe coded API, use JSON. Only reach for XML when you have a specific requirement that demands it - and when you do, disable DTD processing immediately.
			</p>
		</section>

		<!-- Section 6: AI Fix Prompt -->
		<section id="ai-fix-prompt">
			<h2>AI Fix Prompt: Audit for XXE</h2>

			<p>Copy this prompt into <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>, <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, or any AI assistant:</p>

			<div class="code-block">
				<div class="code-header">
					<span class="code-lang">AI Security Audit Prompt</span>
					<button
						class="copy-btn"
						onclick={(e) =>
							navigator.clipboard.writeText(
								e.currentTarget.parentElement?.nextElementSibling?.textContent || ''
							)}
					>
						Copy
					</button>
				</div>
				<pre><code>{`Review my codebase for XML External Entity (XXE) vulnerabilities (CWE-611):

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
- { noent: false, dtdload: false, dtdvalid: false, nonet: true }

PHP 7.x - Add before parsing:
- libxml_set_external_entity_loader(function() { return null; });

## Output Format
For each vulnerability:
1. File path and line number
2. The vulnerable parser instantiation
3. Attack scenario (what an attacker could access)
4. Language-specific secure configuration

Prioritize by: User input → XML parser = Critical`}</code></pre>
			</div>
		</section>

		<!-- FAQ Section -->
		<section id="faq" class="faq-section">
			<h2>Frequently Asked Questions</h2>

			<div class="faq-list">
				{#each faqs as faq, index}
					<div class="faq-item" class:open={openFaq === index}>
						<button
							class="faq-question"
							onclick={() => toggleFaq(index)}
							aria-expanded={openFaq === index}
						>
							<span>{faq.question}</span>
							<svg
								class="faq-icon"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M5 7.5L10 12.5L15 7.5"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
						{#if openFaq === index}
							<div class="faq-answer">
								<p>{@html faq.answer}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>

		<!-- Related Content -->
		<section class="related-content">
			<h2>Related Articles</h2>

			<div class="related-grid">
				<a href="/kb/security/vulnerabilities/ssrf/" class="related-card">
					<h3>SSRF Vulnerabilities</h3>
					<p>XXE can enable SSRF by fetching internal URLs. Understand the connection.</p>
				</a>
				<a href="/kb/security/vulnerabilities/insecure-deserialization/" class="related-card">
					<h3>Insecure Deserialization</h3>
					<p>Another injection vector that can lead to RCE, similar attack patterns.</p>
				</a>
				<a href="/kb/security/vulnerabilities/command-injection/" class="related-card">
					<h3>Command Injection</h3>
					<p>When XXE enables code execution, command injection patterns apply.</p>
				</a>
				<a href="/kb/security/vulnerabilities/path-traversal/" class="related-card">
					<h3>Path Traversal</h3>
					<p>XXE file disclosure uses similar path patterns to access sensitive files.</p>
				</a>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="cta-section">
			<div class="cta-box">
				<h2>Scan Your Vibe Coded Project</h2>
				<p>
					vibeship scanner detects XXE vulnerabilities by identifying XML parsers without security configuration - before attackers find them.
				</p>
				<a href="https://scanner.vibeship.co" class="cta-button">Try vibeship scanner Free →</a>
			</div>
		</section>
	</article>
</div>

<style>
	/* Article Container */
	.article-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	/* Breadcrumb */
	.breadcrumb ol {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
		margin: 0 0 2rem 0;
		font-size: 0.875rem;
	}

	.breadcrumb li:not(:last-child)::after {
		content: '/';
		margin: 0 0.5rem;
		color: #6b7280;
	}

	.breadcrumb a {
		color: #3b82f6;
		text-decoration: none;
	}

	.breadcrumb a:hover {
		text-decoration: underline;
	}

	.breadcrumb span[aria-current] {
		color: #6b7280;
	}

	/* Article Header */
	.article-header {
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
		text-transform: uppercase;
	}

	.badge a {
		color: inherit;
		text-decoration: none;
	}

	.badge a:hover {
		text-decoration: underline;
	}

	.badge-high {
		background-color: #fef3c7;
		color: #92400e;
		border: 1px solid #fcd34d;
	}

	.badge-owasp {
		background-color: #fefce8;
		color: #ca8a04;
		border: 1px solid #fef08a;
	}

	.badge-cwe {
		background-color: #f0f9ff;
		color: #0284c7;
		border: 1px solid #bae6fd;
	}

	h1 {
		font-size: 2.25rem;
		font-weight: 800;
		line-height: 1.2;
		margin: 0 0 1rem 0;
		color: #111827;
	}

	.subtitle {
		font-size: 1.25rem;
		color: #4b5563;
		margin: 0 0 1.5rem 0;
	}

	/* Quick Answer Box */
	.quick-answer {
		background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
		border: 1px solid #93c5fd;
		border-radius: 0.75rem;
		padding: 1.25rem;
		margin-bottom: 2rem;
	}

	.quick-answer strong {
		color: #1e40af;
	}

	.quick-answer a {
		color: #2563eb;
	}

	/* Capabilities Box */
	.capabilities-box {
		background-color: #fef2f2;
		border: 1px solid #fecaca;
		border-radius: 0.75rem;
		padding: 1.25rem;
		margin-bottom: 2rem;
	}

	.capabilities-box h4 {
		margin: 0 0 1rem 0;
		color: #991b1b;
	}

	.capability-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.capability {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.capability-icon {
		font-size: 1.5rem;
	}

	.capability-name {
		font-weight: 600;
		color: #991b1b;
	}

	.capability-desc {
		font-size: 0.875rem;
		color: #7f1d1d;
	}

	/* Table of Contents */
	.toc {
		background-color: #f9fafb;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.toc h2 {
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
		color: #374151;
	}

	.toc ol {
		margin: 0;
		padding-left: 1.25rem;
	}

	.toc li {
		margin-bottom: 0.5rem;
	}

	.toc a {
		color: #3b82f6;
		text-decoration: none;
	}

	.toc a:hover {
		text-decoration: underline;
	}

	/* Sections */
	section {
		margin-bottom: 3rem;
	}

	section h2 {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0 0 1rem 0;
		color: #111827;
		padding-top: 1rem;
	}

	section h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 1.5rem 0 0.75rem 0;
		color: #1f2937;
	}

	section p {
		color: #374151;
		line-height: 1.75;
		margin-bottom: 1rem;
	}

	section ul,
	section ol {
		color: #374151;
		line-height: 1.75;
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}

	section li {
		margin-bottom: 0.5rem;
	}

	section a {
		color: #2563eb;
		text-decoration: none;
	}

	section a:hover {
		text-decoration: underline;
	}

	section code {
		background-color: #f3f4f6;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.875em;
		font-family: 'Fira Code', 'Consolas', monospace;
	}

	/* Warning Box */
	.warning-box {
		background-color: #fef3c7;
		border: 1px solid #f59e0b;
		border-left: 4px solid #f59e0b;
		border-radius: 0.5rem;
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	.warning-box strong {
		color: #92400e;
	}

	.warning-box a {
		color: #b45309;
	}

	/* Info Box */
	.info-box {
		background-color: #f0f9ff;
		border: 1px solid #bae6fd;
		border-left: 4px solid #0284c7;
		border-radius: 0.5rem;
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
	}

	.info-box strong {
		color: #0369a1;
	}

	.info-box a {
		color: #0284c7;
	}

	/* Code Block */
	.code-block {
		margin: 1.5rem 0;
		border-radius: 0.75rem;
		overflow: hidden;
		background-color: #1f2937;
	}

	.code-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background-color: #374151;
	}

	.code-lang {
		font-size: 0.75rem;
		font-weight: 600;
		color: #9ca3af;
		text-transform: uppercase;
	}

	.copy-btn {
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: #d1d5db;
		background-color: #4b5563;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.copy-btn:hover {
		background-color: #6b7280;
	}

	.code-block pre {
		margin: 0;
		padding: 1.25rem;
		overflow-x: auto;
	}

	.code-block code {
		font-family: 'Fira Code', 'Consolas', monospace;
		font-size: 0.875rem;
		line-height: 1.6;
		color: #e5e7eb;
		background: none;
		padding: 0;
	}

	/* FAQ Section */
	.faq-section {
		margin-top: 3rem;
	}

	.faq-list {
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		overflow: hidden;
	}

	.faq-item {
		border-bottom: 1px solid #e5e7eb;
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-question {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.25rem;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		font-size: 1rem;
		font-weight: 600;
		color: #111827;
		transition: background-color 0.2s;
	}

	.faq-question:hover {
		background-color: #f9fafb;
	}

	.faq-icon {
		flex-shrink: 0;
		transition: transform 0.2s;
		color: #6b7280;
	}

	.faq-item.open .faq-icon {
		transform: rotate(180deg);
	}

	.faq-answer {
		padding: 0 1.25rem 1.25rem;
		color: #4b5563;
		line-height: 1.75;
	}

	.faq-answer p {
		margin: 0;
	}

	.faq-answer a {
		color: #2563eb;
	}

	.faq-answer code {
		background-color: #f3f4f6;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.875em;
	}

	/* Related Content */
	.related-content {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid #e5e7eb;
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}

	.related-card {
		display: block;
		padding: 1.25rem;
		background-color: #f9fafb;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		text-decoration: none;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}

	.related-card:hover {
		border-color: #3b82f6;
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
	}

	.related-card h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #111827;
		margin: 0 0 0.5rem 0;
	}

	.related-card p {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 0;
		line-height: 1.5;
	}

	/* CTA Section */
	.cta-section {
		margin-top: 3rem;
	}

	.cta-box {
		background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
		border-radius: 1rem;
		padding: 2rem;
		text-align: center;
		color: white;
	}

	.cta-box h2 {
		color: white;
		margin: 0 0 0.75rem 0;
		padding-top: 0;
	}

	.cta-box p {
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 1.5rem;
	}

	.cta-button {
		display: inline-block;
		padding: 0.875rem 2rem;
		background-color: white;
		color: #1e40af;
		font-weight: 600;
		text-decoration: none;
		border-radius: 0.5rem;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	/* Responsive */
	@media (max-width: 640px) {
		.article-container {
			padding: 1rem;
		}

		h1 {
			font-size: 1.75rem;
		}

		.subtitle {
			font-size: 1.1rem;
		}

		.capability-grid {
			grid-template-columns: 1fr;
		}

		.code-block pre {
			padding: 1rem;
		}

		.code-block code {
			font-size: 0.75rem;
		}

		.related-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
