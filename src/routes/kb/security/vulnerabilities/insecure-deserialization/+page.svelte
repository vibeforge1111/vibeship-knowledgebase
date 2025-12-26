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
		{ label: 'Insecure Deserialization' }
	];

	const faqs = [
		{
			question: 'What is insecure deserialization?',
			answer:
				'Insecure deserialization happens when your application converts untrusted data back into objects without validation. Attackers craft malicious serialized data that executes code when deserialized. According to <a href="https://cwe.mitre.org/data/definitions/502.html">CWE-502</a>, this can lead to Remote Code Execution (RCE), giving attackers complete control of your server.'
		},
		{
			question: 'Is JSON.parse() safe from deserialization attacks?',
			answer:
				'Yes, JSON.parse() is safe from code execution attacks because JSON is a data-only format - it cannot contain executable code. However, you should still validate the parsed data with a schema validator like Zod to ensure it matches expected structure. The danger comes from unsafe deserializers like eval(), pickle.loads(), or node-serialize that can execute embedded code.'
		},
		{
			question: 'Why is yaml.load() dangerous in Python?',
			answer:
				'Python\'s yaml.load() without SafeLoader can execute arbitrary Python code embedded in YAML. Attackers use payloads like <code>!!python/object/apply:os.system ["rm -rf /"]</code>. This was exploitable until PyYAML 5.4 (<a href="https://nvd.nist.gov/vuln/detail/CVE-2020-14343">CVE-2020-14343</a>). Always use yaml.safe_load() - it has always been safe and handles most use cases.'
		},
		{
			question: 'How do I prevent deserialization vulnerabilities in Node.js?',
			answer:
				'Never use eval(), new Function(), or unsafe libraries like node-serialize with user input. Use JSON.parse() for data deserialization - it cannot execute code. For math expressions, use safe parsers like mathjs. Always validate parsed data with Zod or Yup before processing. Check the <a href="https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html">OWASP Deserialization Cheat Sheet</a> for complete guidance.'
		},
		{
			question: "What's the difference between deserialization and prototype pollution?",
			answer:
				'Deserialization attacks execute code when converting serialized data back to objects (eval, pickle, yaml.load). Prototype pollution modifies JavaScript\'s Object.prototype through unsafe merging of objects with __proto__ keys, affecting all objects in your application. Both can lead to RCE, but through different mechanisms. Use <a href="https://github.com/fastify/secure-json-parse">secure-json-parse</a> to prevent both.'
		}
	];

	let schemaData: object;

	onMount(() => {
		schemaData = {
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'TechArticle',
					headline: 'Insecure Deserialization: When AI Code Lets Attackers Execute Commands',
					description:
						'AI tools generate unsafe eval(), yaml.load(), and deserialize patterns that lead to RCE. Learn CWE-502 patterns and safe alternatives for Node.js and Python.',
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
						'@id': 'https://vibeship.co/kb/security/vulnerabilities/insecure-deserialization/'
					},
					about: [
						{
							'@type': 'Thing',
							name: 'Insecure Deserialization',
							sameAs: 'https://cwe.mitre.org/data/definitions/502.html'
						},
						{
							'@type': 'Thing',
							name: 'CWE-502',
							sameAs: 'https://cwe.mitre.org/data/definitions/502.html'
						}
					],
					keywords:
						'insecure deserialization, CWE-502, deserialization vulnerability, yaml.load security, node.js deserialization, prototype pollution, vibe coding security'
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
							name: 'Insecure Deserialization',
							item: 'https://vibeship.co/kb/security/vulnerabilities/insecure-deserialization/'
						}
					]
				}
			]
		};
	});
</script>

<svelte:head>
	<title>Insecure Deserialization in AI Code | VibeShip</title>
	<meta
		name="description"
		content="AI tools generate unsafe eval(), yaml.load(), and deserialize patterns that lead to RCE. Learn CWE-502 patterns and safe alternatives for Node.js and Python."
	/>
	<meta
		name="keywords"
		content="insecure deserialization, CWE-502, deserialization vulnerability, yaml.load security, node.js deserialization, prototype pollution, vibe coding security"
	/>
	<link
		rel="canonical"
		href="https://vibeship.co/kb/security/vulnerabilities/insecure-deserialization/"
	/>
	<meta
		property="og:title"
		content="Insecure Deserialization: When AI Code Lets Attackers Execute Commands"
	/>
	<meta
		property="og:description"
		content="AI tools generate unsafe eval(), yaml.load(), and deserialize patterns that lead to RCE. Learn CWE-502 fixes."
	/>
	<meta property="og:type" content="article" />
	<meta
		property="og:url"
		content="https://vibeship.co/kb/security/vulnerabilities/insecure-deserialization/"
	/>
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content="Insecure Deserialization: When AI Code Lets Attackers Execute Commands"
	/>
	<meta
		name="twitter:description"
		content="AI tools generate unsafe eval(), yaml.load(), and deserialize patterns that lead to RCE."
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
				<span class="badge badge-critical">Critical</span>
				<span class="badge badge-cwe">CWE-502</span>
				<span class="badge badge-owasp">OWASP A08:2021</span>
			</div>
			<h1>Insecure Deserialization: When AI Code Lets Attackers Execute Commands</h1>

			<div class="quick-answer">
				<strong>Quick Answer:</strong> Insecure deserialization lets attackers execute code by manipulating
				data your app converts back into objects. AI tools generate vulnerable patterns like
				<code>eval()</code>, <code>yaml.load()</code>, and unsafe deserialize functions. Use
				<code>JSON.parse()</code>, <code>yaml.safe_load()</code>, and never deserialize untrusted data
				without validation. Ranked in the
				<a href="https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/"
					>OWASP Top 10 (A08:2021)</a
				>.
			</div>
		</header>

		<section class="content-section">
			<h2>What is Insecure Deserialization?</h2>
			<p>
				Insecure deserialization is a vulnerability where attackers inject malicious code through
				serialized data that your application converts back into objects. When you deserialize
				untrusted input without validation, that data can execute arbitrary commands on your server.
			</p>
			<p>
				Think of it like opening a package from an unknown sender - it could contain anything,
				including something dangerous. Serialization converts objects to strings (safe). <strong
					>Deserialization converts strings back to objects</strong
				> - and if an attacker controls that string, they control what gets created and executed.
			</p>
			<p>
				According to <a href="https://cwe.mitre.org/data/definitions/502.html"
					>CWE-502: Deserialization of Untrusted Data</a
				>, this vulnerability appears in the 2024 CWE Top 25 Most Dangerous Software Weaknesses. The
				impact is severe: Remote Code Execution (RCE) means attackers can run any command on your
				server, steal data, install backdoors, or delete everything.
			</p>
		</section>

		<section class="content-section">
			<h2>How Do Deserialization Attacks Work?</h2>
			<p>
				Deserialization attacks follow a predictable pattern. The attacker finds an endpoint that
				accepts serialized data from users. They craft a malicious payload that executes code when
				deserialized. Your server processes the payload, running the attacker's code with your
				application's privileges.
			</p>
			<p>The attack chain looks like this:</p>
			<ol>
				<li>Attacker identifies an endpoint accepting serialized input</li>
				<li>Attacker crafts a payload containing executable code</li>
				<li>Attacker sends the payload to your server</li>
				<li>
					Your server deserializes the payload, executing the malicious code with full server
					privileges
				</li>
			</ol>
			<p>
				Unlike <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a> that targets databases
				or <a href="/kb/security/vulnerabilities/xss/">XSS</a> that targets browsers, deserialization attacks
				target your server directly. Success typically means complete server compromise.
			</p>
		</section>

		<section class="content-section">
			<h2>Why Do AI Tools Generate Vulnerable Deserialization Code?</h2>
			<p>
				AI coding assistants like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>,
				<a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, and
				<a href="/kb/vibe-coding-tools/github-copilot/">GitHub Copilot</a>
				generate insecure deserialization patterns because they optimize for "working code" rather than
				secure code. When you ask for dynamic execution or flexible data handling, AI reaches for powerful
				but dangerous tools.
			</p>
			<p>
				AI generates <code>eval()</code> because it handles any expression. AI uses
				<code>yaml.load()</code> because older tutorials do. AI suggests node-serialize because it appears
				in training data from before the vulnerability was understood. The models don't distinguish between
				trusted internal data and untrusted user input.
			</p>
			<p>
				This is especially dangerous for vibe coders building quickly with AI tools. The generated
				code works perfectly during development - the vulnerability only becomes apparent when
				attackers exploit it in production.
			</p>
		</section>

		<section class="content-section">
			<h2>What Are the Dangerous JavaScript and Node.js Patterns?</h2>
			<p>
				JavaScript and Node.js have several patterns that lead to deserialization vulnerabilities. The
				most common is <code>eval()</code> with user input - AI generates this for "dynamic
				calculation" or "flexible execution" requests.
			</p>

			<h3>Pattern 1: eval() with User Input</h3>
			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable: eval() executes any code</div>
					<pre><code>// AI generates this for "dynamic calculator" requests
app.post('/calculate', (req, res) => &#123;
  const formula = req.body.formula
  const result = eval(formula) // RCE!
  res.json(&#123; result &#125;)
&#125;)

// Attack payload:
// formula = "require('child_process').execSync('cat /etc/passwd')"</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure: Use a safe expression parser</div>
					<pre><code>import &#123; evaluate &#125; from 'mathjs'

app.post('/calculate', (req, res) => &#123;
  const formula = req.body.formula
  try &#123;
    const result = evaluate(formula) // Safe math only
    res.json(&#123; result &#125;)
  &#125; catch (e) &#123;
    res.status(400).json(&#123; error: 'Invalid expression' &#125;)
  &#125;
&#125;)</code></pre>
				</div>
			</div>

			<h3>Pattern 2: node-serialize Package</h3>
			<p>
				The node-serialize package has a <a
					href="https://security.snyk.io/package/npm/node-serialize">known RCE vulnerability</a
				> (CVSS 9.8). AI tools suggest it because it appears in older tutorials and training data.
			</p>
			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable: node-serialize executes serialized functions</div>
					<pre><code>const serialize = require('node-serialize')

app.post('/save-state', (req, res) => &#123;
  // Deserializing untrusted input - RCE!
  const state = serialize.unserialize(req.body.state)
  // Attack payload can include functions that execute on unserialize
&#125;)</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure: Use JSON.parse() with validation</div>
					<pre><code>import &#123; z &#125; from 'zod'

const StateSchema = z.object(&#123;
  userId: z.string(),
  preferences: z.record(z.string())
&#125;)

app.post('/save-state', (req, res) => &#123;
  try &#123;
    const parsed = JSON.parse(req.body.state) // Safe
    const state = StateSchema.parse(parsed) // Validated
    res.json(&#123; success: true &#125;)
  &#125; catch (e) &#123;
    res.status(400).json(&#123; error: 'Invalid state' &#125;)
  &#125;
&#125;)</code></pre>
				</div>
			</div>

			<h3>Pattern 3: Function() Constructor</h3>
			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable: Function() is eval() in disguise</div>
					<pre><code>// AI generates this for "dynamic function execution"
app.post('/run', (req, res) => &#123;
  const fn = new Function('return ' + req.body.code) // RCE!
  const result = fn()
  res.json(&#123; result &#125;)
&#125;)</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure: Use predefined operations</div>
					<pre><code>const ALLOWED_OPERATIONS = &#123;
  sum: (a, b) => a + b,
  multiply: (a, b) => a * b,
  average: (arr) => arr.reduce((a, b) => a + b, 0) / arr.length
&#125;

app.post('/run', (req, res) => &#123;
  const &#123; operation, args &#125; = req.body
  const fn = ALLOWED_OPERATIONS[operation]
  if (!fn) return res.status(400).json(&#123; error: 'Unknown operation' &#125;)
  const result = fn(...args)
  res.json(&#123; result &#125;)
&#125;)</code></pre>
				</div>
			</div>
		</section>

		<section class="content-section">
			<h2>What Are the Dangerous Python Patterns?</h2>
			<p>
				Python's flexibility makes it particularly susceptible to deserialization attacks. Two
				patterns dominate AI-generated vulnerable code: <code>pickle.loads()</code> and
				<code>yaml.load()</code>.
			</p>

			<h3>Pattern 1: pickle.loads() with User Input</h3>
			<p>
				Python's pickle module can serialize and deserialize arbitrary Python objects - including
				objects that execute code when created. <strong
					>There is no "safe pickle" for untrusted data.</strong
				>
			</p>
			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable: pickle executes code on load</div>
					<pre><code>import pickle
import base64

@app.route('/load', methods=['POST'])
def load_data():
    data = request.json['data']
    # Deserializing untrusted pickle data - RCE!
    obj = pickle.loads(base64.b64decode(data))
    return jsonify(obj)

# Attack: Craft pickle payload that executes os.system()</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure: Use JSON instead</div>
					<pre><code>import json
from pydantic import BaseModel

class UserData(BaseModel):
    name: str
    preferences: dict

@app.route('/load', methods=['POST'])
def load_data():
    data = request.json['data']
    parsed = json.loads(data)  # Safe - JSON can't execute code
    validated = UserData(**parsed)  # Validated
    return jsonify(validated.dict())</code></pre>
				</div>
			</div>

			<h3>Pattern 2: yaml.load() Without SafeLoader</h3>
			<p>
				Before PyYAML 5.4, <code>yaml.load()</code> executed arbitrary Python code embedded in YAML
				files. This was fixed in <a href="https://nvd.nist.gov/vuln/detail/CVE-2020-14343"
					>CVE-2020-14343</a
				>, but AI tools still generate the vulnerable pattern.
			</p>
			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable: yaml.load() can execute code</div>
					<pre><code>import yaml

@app.route('/config', methods=['POST'])
def load_config():
    # yaml.load() without SafeLoader - RCE in PyYAML &lt; 5.4!
    config = yaml.load(request.data)
    return jsonify(config)

# Attack payload:
# !!python/object/apply:os.system ["rm -rf /"]</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure: Always use safe_load()</div>
					<pre><code>import yaml

@app.route('/config', methods=['POST'])
def load_config():
    # safe_load() has always been safe - use it!
    config = yaml.safe_load(request.data)
    return jsonify(config)</code></pre>
				</div>
			</div>

			<div class="info-box">
				<strong>Note:</strong> <code>yaml.safe_load()</code> has always been safe and handles most use
				cases. Only use <code>yaml.load()</code> with <code>Loader=yaml.SafeLoader</code> if you need
				explicit control, but prefer <code>safe_load()</code> for clarity.
			</div>
		</section>

		<section class="content-section">
			<h2>What is Prototype Pollution and How Does it Relate?</h2>
			<p>
				Prototype pollution is a related JavaScript vulnerability where attackers modify <code
					>Object.prototype</code
				>
				through unsafe object merging. While <code>JSON.parse()</code> itself is safe, merging parsed data
				without sanitization can pollute prototypes.
			</p>
			<p>
				According to <a href="https://portswigger.net/web-security/prototype-pollution"
					>PortSwigger's research</a
				>, prototype pollution has affected major libraries including lodash (CVE-2019-10744) and
				jQuery (CVE-2019-11358). The attack works by injecting <code>__proto__</code> keys that modify
				all JavaScript objects.
			</p>

			<div class="code-comparison">
				<div class="code-block vulnerable">
					<div class="code-label">Vulnerable: Recursive merge without key validation</div>
					<pre><code>function merge(target, source) &#123;
  for (let key in source) &#123;
    if (typeof source[key] === 'object') &#123;
      target[key] = merge(target[key] || &#123;&#125;, source[key])
    &#125; else &#123;
      target[key] = source[key] // __proto__ pollutes prototype!
    &#125;
  &#125;
  return target
&#125;

// Attack: &#123; "__proto__": &#123; "isAdmin": true &#125; &#125;
// Now EVERY object has isAdmin = true</code></pre>
				</div>
				<div class="code-block secure">
					<div class="code-label">Secure: Use secure-json-parse</div>
					<pre><code>import sjson from 'secure-json-parse'

// Rejects __proto__, constructor, and prototype keys
const data = sjson.parse(userInput)

// Or validate keys manually
function safeMerge(target, source) &#123;
  const FORBIDDEN = ['__proto__', 'constructor', 'prototype']
  for (let key in source) &#123;
    if (FORBIDDEN.includes(key)) continue
    if (typeof source[key] === 'object' && source[key] !== null) &#123;
      target[key] = safeMerge(target[key] || &#123;&#125;, source[key])
    &#125; else &#123;
      target[key] = source[key]
    &#125;
  &#125;
  return target
&#125;</code></pre>
				</div>
			</div>

			<p>
				The <a href="https://github.com/fastify/secure-json-parse">secure-json-parse</a> library from
				the Fastify team is a drop-in replacement for JSON.parse() that prevents prototype pollution.
				Use it for any user-supplied JSON.
			</p>
		</section>

		<section class="content-section">
			<h2>What Framework-Specific Guidance Applies?</h2>

			<h3>Next.js and React Server Components</h3>
			<p>
				CVE-2025-55182 affected React Server Components in React 19.0.0-19.2.0, allowing
				unauthenticated RCE via crafted requests to Server Function endpoints. This also impacted
				Next.js (CVE-2025-66478), React Router, Waku, and Expo.
			</p>
			<ul>
				<li>Update to React 19.2.1+ and Next.js 15.0.5+</li>
				<li>Validate all inputs to Server Actions with Zod</li>
				<li>
					Check your <a href="/kb/security/stacks/nextjs-supabase/">Next.js + Supabase</a> stack for additional
					patterns
				</li>
			</ul>

			<h3>Express.js</h3>
			<ul>
				<li>Never use <code>eval()</code> or <code>new Function()</code> with user input</li>
				<li>Use <code>JSON.parse()</code> with schema validation for deserialization</li>
				<li>Validate request bodies with Zod or Yup before processing</li>
				<li>
					See <a href="https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html"
						>OWASP Deserialization Cheat Sheet</a
					> for complete guidance
				</li>
			</ul>

			<h3>FastAPI and Flask</h3>
			<ul>
				<li>Always use <code>yaml.safe_load()</code> - never <code>yaml.load()</code></li>
				<li>Never use <code>pickle</code> with untrusted data - there is no safe way</li>
				<li>Use Pydantic models for request validation</li>
				<li>Prefer JSON for all data serialization</li>
			</ul>
		</section>

		<section class="content-section">
			<h2>How Do I Detect Deserialization Vulnerabilities?</h2>
			<p>
				Search your codebase for these dangerous patterns. Each one requires immediate attention if it
				processes user input.
			</p>

			<div class="detection-patterns">
				<h3>JavaScript/Node.js Detection</h3>
				<div class="code-block">
					<pre><code># Search for eval() usage
grep -rn "eval(" --include="*.js" --include="*.ts"

# Search for Function constructor
grep -rn "new Function(" --include="*.js" --include="*.ts"

# Search for node-serialize
grep -rn "node-serialize\|unserialize(" --include="*.js" --include="*.ts"

# Search for prototype pollution vectors
grep -rn "__proto__\|constructor\[" --include="*.js" --include="*.ts"</code></pre>
				</div>

				<h3>Python Detection</h3>
				<div class="code-block">
					<pre><code># Search for pickle usage
grep -rn "pickle.load\|pickle.loads" --include="*.py"

# Search for unsafe yaml
grep -rn "yaml.load(" --include="*.py"

# Check if SafeLoader is used
grep -rn "yaml.load" --include="*.py" | grep -v "SafeLoader\|safe_load"</code></pre>
				</div>
			</div>

			<div class="cta-box">
				<strong>Scan Your Vibe Coded Project:</strong> Manual searches miss context. vibeship scanner
				automatically detects deserialization vulnerabilities in AI-generated code and provides
				fix suggestions.
				<a href="https://scanner.vibeship.co" class="cta-link">Try vibeship scanner</a>
			</div>
		</section>

		<section class="content-section">
			<h2>AI Fix Prompt: Secure Deserialization Patterns</h2>
			<p>
				Copy this prompt into <a href="/kb/vibe-coding-tools/cursor/">Cursor</a>,
				<a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a>, or
				<a href="/kb/vibe-coding-tools/github-copilot/">GitHub Copilot</a> to fix deserialization vulnerabilities:
			</p>
			<div class="fix-prompt">
				<div class="fix-prompt-header">
					<span>AI Fix Prompt</span>
					<button class="copy-btn" onclick={copyPrompt}>Copy</button>
				</div>
				<pre>Review my codebase for insecure deserialization vulnerabilities (CWE-502):

## JavaScript/Node.js Checks

1. **Search for eval()**: Find any use of eval() with user input
   - Pattern: `eval(`, `new Function(`
   - Replace with: Safe expression parsers (mathjs) or predefined operations
   - If dynamic execution is truly needed, use a sandboxed VM

2. **Search for unsafe deserializers**:
   - Pattern: `serialize.unserialize`, `node-serialize`
   - Replace with: `JSON.parse()` + schema validation with Zod
   - REMOVE the node-serialize package entirely

3. **Check for prototype pollution**:
   - Pattern: Recursive merge functions, `__proto__` in object keys
   - Replace with: `secure-json-parse` from npm
   - Add key validation: reject __proto__, constructor, prototype

## Python Checks

1. **Search for pickle.loads()**:
   - Pattern: `pickle.loads(`, `pickle.load(`
   - Replace with: JSON - there is NO safe pickle for untrusted data
   - Only use pickle for trusted internal data

2. **Search for yaml.load()**:
   - Pattern: `yaml.load(` without `Loader=yaml.SafeLoader`
   - Replace with: `yaml.safe_load()`
   - Note: safe_load() has always been safe

## Framework Version Checks

1. **React/Next.js**: Verify React >= 19.2.1, Next.js >= 15.0.5 (CVE-2025-55182)
2. **PyYAML**: Verify version >= 5.4 (CVE-2020-14343)
3. **lodash**: Check for prototype pollution patches

## For Each Vulnerability Found

1. Show the dangerous code with line number
2. Explain why it's vulnerable (what an attacker could do)
3. Show the secure replacement using:
   - JSON.parse() + Zod for JavaScript
   - yaml.safe_load() or json.loads() + Pydantic for Python
4. Add schema validation if missing
5. Verify no user input reaches deserialization without validation</pre>
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
				<a href="/kb/security/vulnerabilities/command-injection/" class="card card-interactive">
					<h3>Command Injection</h3>
					<p>Another path to remote code execution through OS commands</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive">
					<h3>SQL Injection</h3>
					<p>Database-targeted injection attacks</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive">
					<h3>Cross-Site Scripting (XSS)</h3>
					<p>Client-side code injection vulnerabilities</p>
				</a>
				<a href="/kb/vibe-coding-tools/cursor/" class="card card-interactive">
					<h3>Cursor Security Patterns</h3>
					<p>Common Cursor-generated vulnerabilities</p>
				</a>
				<a href="/kb/vibe-coding-tools/claude-code/" class="card card-interactive">
					<h3>Claude Code Security</h3>
					<p>Claude Code security pitfalls</p>
				</a>
				<a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive">
					<h3>Hardcoded Secrets</h3>
					<p>Often combined with deserialization vulnerabilities</p>
				</a>
			</div>
		</section>

		<section class="final-cta">
			<h2>Secure Your Vibe Coded Project</h2>
			<p>
				Deserialization vulnerabilities can give attackers complete control of your server. Don't let
				AI-generated code expose your application to RCE attacks.
			</p>
			<a href="https://scanner.vibeship.co" class="cta-button">Scan Your Code Now</a>
		</section>

		<section class="content-section">
			<h2>External References</h2>
			<ul class="reference-list">
				<li>
					<a href="https://cwe.mitre.org/data/definitions/502.html">CWE-502: Deserialization of Untrusted Data</a> - MITRE definition
				</li>
				<li>
					<a href="https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/">OWASP A08:2021</a> - Software and Data Integrity Failures
				</li>
				<li>
					<a href="https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html">OWASP Deserialization Cheat Sheet</a> - Prevention guidance
				</li>
				<li>
					<a href="https://portswigger.net/web-security/prototype-pollution">PortSwigger Prototype Pollution</a> - Detailed technical guide
				</li>
				<li>
					<a href="https://github.com/fastify/secure-json-parse">secure-json-parse</a> - Safe JSON parsing library
				</li>
				<li>
					<a href="https://security.snyk.io/package/npm/node-serialize">Snyk: node-serialize Vulnerability</a> - Known RCE vulnerability
				</li>
			</ul>
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

	.badge-critical {
		background: var(--red);
		color: var(--bg-primary);
	}

	.badge-cwe {
		background: var(--blue);
		color: var(--bg-primary);
	}

	.badge-owasp {
		background: var(--violet);
		color: var(--bg-primary);
	}

	.content-section {
		margin-bottom: 2.5rem;
	}

	.code-comparison {
		display: grid;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	@media (min-width: 768px) {
		.code-comparison {
			grid-template-columns: 1fr 1fr;
		}
	}

	.code-block {
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

	.detection-patterns {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		padding: 1.5rem;
		margin: 1.5rem 0;
	}

	.detection-patterns h3 {
		margin-top: 0;
	}

	.detection-patterns .code-block {
		border-color: var(--border);
	}

	.info-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--blue);
		padding: 1rem 1.5rem;
		margin: 1.5rem 0;
	}

	.cta-box {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-left: 3px solid var(--green);
		padding: 1.5rem;
		margin: 2rem 0;
	}

	.cta-link {
		display: inline-block;
		margin-top: 0.75rem;
		color: var(--green-dim);
		font-weight: 600;
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

	.reference-list {
		list-style: none;
		padding: 0;
	}

	.reference-list li {
		margin-bottom: 0.75rem;
		padding-left: 1.5rem;
		position: relative;
	}

	.reference-list li::before {
		content: '→';
		position: absolute;
		left: 0;
		color: var(--green-dim);
	}
</style>
