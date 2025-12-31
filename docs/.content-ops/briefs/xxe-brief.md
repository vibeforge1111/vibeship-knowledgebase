# Content Brief: XML External Entity (XXE)

## Status

```yaml
status: READY
created_at: 2025-12-17T22:00:00Z
created_by: Research Agent
claimed_by: null
claimed_at: null
completed_at: null
```

---

## Article Metadata

```yaml
type: vulnerability
slug: xxe
url: /kb/security/vulnerabilities/xxe/
title: "XXE: How AI Code Lets Attackers Read Your Server Files"
meta_description: "XML External Entity (XXE) attacks let attackers read /etc/passwd and internal files. AI generates vulnerable XML parsers by default. Learn secure patterns for Node.js, Python, and Java."
cwe: CWE-611
cwe_parent: CWE-610
owasp: A05:2021-Security Misconfiguration
owasp_url: https://owasp.org/Top10/A05_2021-Security_Misconfiguration/
cwe_url: https://cwe.mitre.org/data/definitions/611.html
severity: High
word_count: 1400-1700
```

---

## Executive Summary

XXE (XML External Entity) attacks exploit XML parsers that process external entity references. Attackers can read sensitive files like `/etc/passwd`, perform SSRF attacks, and in some cases achieve remote code execution. Many XML parsers are vulnerable by default, and AI tools generate code using these defaults. This article shows vibe coders how to identify and disable dangerous XML features.

---

## Core Data

### Security References
- **CWE ID:** CWE-611 (Improper Restriction of XML External Entity Reference)
- **Parent CWE:** CWE-610 (Externally Controlled Reference to a Resource)
- **Related CWE:** CWE-827 (Improper Control of Document Type Definition)
- **OWASP Category:** A05:2021 - Security Misconfiguration
- **Previous OWASP:** A4:2017 - XML External Entities (XXE) - had its own category
- **Severity:** High to Critical (enables file disclosure, SSRF, sometimes RCE)

### Key Statistics

| Statistic | Value | Source |
|-----------|-------|--------|
| OWASP Ranking | A05:2021 (was A4:2017) | OWASP Top 10 |
| Detection | SAST tools highly effective | CWE Profile |
| Default Vulnerability | Many parsers vulnerable by default | OWASP Cheat Sheet |
| PHP 8.0+ | Safe by default | PHP Documentation |
| libxml2 2.9+ | External entities disabled by default | libxml2 |

### Attack Capabilities

| Attack Type | Impact | Technique |
|-------------|--------|-----------|
| File Disclosure | Read /etc/passwd, config files | file:// protocol |
| SSRF | Access internal services | http:// to internal IPs |
| DoS (Billion Laughs) | Server resource exhaustion | Nested entity expansion |
| Port Scanning | Enumerate internal services | Error-based detection |
| RCE (rare) | Code execution | PHP expect://, Java gadgets |

---

## How XXE Attacks Work

### The Vulnerability
XML allows defining entities in the Document Type Definition (DTD). External entities can reference files or URLs:

```xml
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<data>&xxe;</data>
```

When the XML parser processes `&xxe;`, it reads `/etc/passwd` and includes its contents in the document.

### Attack Examples

**File Disclosure:**
```xml
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<user>&xxe;</user>
```

**SSRF to Internal Services:**
```xml
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "http://169.254.169.254/latest/meta-data/">
]>
<data>&xxe;</data>
```

**Billion Laughs DoS:**
```xml
<?xml version="1.0"?>
<!DOCTYPE lolz [
  <!ENTITY lol "lol">
  <!ENTITY lol2 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
  <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
  <!-- ... exponential expansion -->
]>
<lolz>&lol9;</lolz>
```

---

## Why AI Tools Generate Vulnerable Code

### Default Parser Configurations
Most XML parsing code AI generates uses default configurations that allow external entities:

```javascript
// VULNERABLE: AI's default XML parsing (Node.js)
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
parser.parseString(userInput, (err, result) => {
  // External entities processed by default in some versions
})
```

```python
# VULNERABLE: AI's default XML parsing (Python)
import xml.etree.ElementTree as ET
tree = ET.parse(user_file)  # Vulnerable to Billion Laughs
```

```java
// VULNERABLE: AI's default XML parsing (Java)
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
DocumentBuilder db = dbf.newDocumentBuilder();
Document doc = db.parse(userInput);  // XXE enabled by default!
```

### Why This Happens
1. AI learns from older tutorials without security hardening
2. Default configurations prioritize functionality
3. XXE protection requires explicit disabling of features
4. Training data includes vulnerable examples from Stack Overflow

---

## SEO Strategy

### Target Keywords

| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| XXE vulnerability | informational | Primary |
| XML external entity | informational | Primary |
| XXE attack | informational | Secondary |
| CWE-611 | informational | Secondary |
| XML injection | informational | Tertiary |
| billion laughs attack | informational | Tertiary |

### People Also Ask (FAQs)

1. What is an XXE vulnerability?
2. How do XXE attacks work?
3. Is JSON safer than XML for APIs?
4. How do I prevent XXE in Java?
5. Are modern XML parsers safe by default?

### Competitive Gap

**Top results analysis:**
- OWASP: Comprehensive but Java-heavy
- PortSwigger: Attack-focused, less on AI context
- Snyk: Package-specific, not architectural

**Our unique angle:**
- AI tool context: Why generated code is vulnerable
- Modern stack focus: Node.js, Python, not just Java
- Language-specific secure configurations
- Simple "disable DTD" message
- Copy-paste safe configurations

---

## Content Outline

### Quick Answer (50 words max)
XXE attacks exploit XML parsers to read server files, access internal services, or crash your application. AI tools generate XML parsing code with dangerous defaults enabled. The fix is simple: disable DTD processing and external entities in your XML parser configuration.

### Section 1: What is XXE? (100-150 words)
- Plain English: XML can include references to external files
- Parsers fetch and include those files automatically
- Attackers use this to read /etc/passwd, AWS credentials, etc.
- Was OWASP #4 in 2017, now part of A05:2021
- Related to SSRF (fetching internal URLs)

### Section 2: How XXE Attacks Work (150-200 words)
- DTD (Document Type Definition) allows entity definitions
- External entities reference files or URLs
- Parser resolves entities before processing
- Attack examples:
  - File disclosure (file://)
  - SSRF (http:// to internal IPs)
  - DoS (Billion Laughs)
  - RCE (rare, with PHP expect://)

### Section 3: Why AI Tools Generate Vulnerable Code (100-150 words)
- Default parser configurations allow external entities
- AI doesn't add security hardening unless asked
- Java's DocumentBuilder vulnerable by default
- Python's standard library partially vulnerable
- Training data includes insecure patterns

### Section 4: Language-Specific Fixes (300-400 words)

**Java (Most Dangerous Defaults):**
```java
// SECURE: Disable DTDs completely
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
dbf.setFeature("http://xml.org/sax/features/external-general-entities", false);
dbf.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
dbf.setXIncludeAware(false);
dbf.setExpandEntityReferences(false);
```

**Python:**
```python
# SECURE: Use defusedxml
from defusedxml import ElementTree as ET
tree = ET.parse(user_file)  # Safe from XXE and Billion Laughs

# Or configure standard library
import xml.etree.ElementTree as ET
# Note: Standard library safe from external entities but NOT Billion Laughs
```

**Node.js:**
```javascript
// SECURE: Use libxmljs2 with safe options
const libxmljs = require('libxmljs2')
const doc = libxmljs.parseXml(xmlString, {
  noent: false,    // Don't expand entities
  dtdload: false,  // Don't load external DTD
  dtdvalid: false  // Don't validate DTD
})

// Or simply use JSON instead of XML
```

**PHP 8.0+:**
```php
// PHP 8.0+ is safe by default
// For older versions:
libxml_set_external_entity_loader(null);
```

**.NET:**
```csharp
// SECURE: .NET 4.5.2+ - XmlReader safe by default
// For older versions:
XmlReaderSettings settings = new XmlReaderSettings();
settings.DtdProcessing = DtdProcessing.Prohibit;
settings.XmlResolver = null;
```

### Section 5: AI Fix Prompt (200-300 words)
```
Review my codebase for XML External Entity (XXE) vulnerabilities (CWE-611):

## Check 1: XML Parser Usage
Search for XML parsing patterns:
- Java: DocumentBuilderFactory, SAXParserFactory, XMLReader
- Python: xml.etree, xml.sax, lxml
- Node.js: xml2js, libxmljs, fast-xml-parser
- PHP: simplexml_load_string, DOMDocument
- .NET: XmlDocument, XmlReader

## Check 2: DTD/External Entity Configuration
For each parser found, verify:
- Is DTD processing disabled?
- Are external entities disabled?
- Is entity expansion limited?

Flag: Parsers without explicit security configuration

## Check 3: User Input to XML
Trace data flow:
- Does user input reach XML parsing?
- Are uploaded XML files parsed?
- Are SOAP/XML-RPC endpoints present?

## Secure Configurations by Language

Java:
- setFeature("http://apache.org/xml/features/disallow-doctype-decl", true)
- setFeature("http://xml.org/sax/features/external-general-entities", false)

Python:
- Use defusedxml library instead of standard xml module

Node.js:
- Set noent: false, dtdload: false in parser options

For each vulnerability:
- Show the vulnerable code
- Explain the attack scenario
- Provide language-specific secure configuration
```

### Section 6: When to Use JSON Instead (100-150 words)
- JSON has no entity mechanism - inherently safe from XXE
- Most modern APIs use JSON, not XML
- If you don't need XML features, use JSON
- XML still needed for: SOAP, SVG, Office documents, legacy systems

### Section 7: FAQ (5 questions, 50-100 words each)
- Use PAA questions above
- Direct answers first
- Include language-specific notes

### Section 8: Related Content
- Link to SSRF (related attack vector)
- Link to insecure deserialization
- Link to security misconfiguration patterns

---

## Internal Links (7-10 required)

| Anchor Text | URL | Context/Placement |
|-------------|-----|-------------------|
| SSRF | /kb/security/vulnerabilities/ssrf/ | Related attack (XXE enables SSRF) |
| insecure deserialization | /kb/security/vulnerabilities/insecure-deserialization/ | Related injection |
| command injection | /kb/security/vulnerabilities/command-injection/ | Related RCE vector |
| hardcoded secrets | /kb/security/vulnerabilities/hardcoded-secrets/ | Secrets in config files |
| path traversal | /kb/security/vulnerabilities/path-traversal/ | File access patterns |
| Cursor security patterns | /kb/vibe-coding-tools/cursor/ | AI tool context |
| Claude Code security patterns | /kb/vibe-coding-tools/claude-code/ | AI tool context |

---

## External Links (10-12 required)

| Anchor Text | URL | Tier | Placement |
|-------------|-----|------|-----------|
| CWE-611: XXE | https://cwe.mitre.org/data/definitions/611.html | 1 | Intro |
| OWASP A05:2021 Security Misconfiguration | https://owasp.org/Top10/A05_2021-Security_Misconfiguration/ | 1 | Intro |
| OWASP XXE Prevention Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html | 1 | Fix section |
| OWASP XXE Vulnerability | https://owasp.org/www-community/vulnerabilities/XML_External_Entity_(XXE)_Processing | 1 | What is section |
| PortSwigger XXE | https://portswigger.net/web-security/xxe | 2 | Attack examples |
| defusedxml Python | https://pypi.org/project/defusedxml/ | 6 | Python fix |
| libxmljs2 npm | https://www.npmjs.com/package/libxmljs2 | 6 | Node.js fix |
| CWE-827: DTD Control | https://cwe.mitre.org/data/definitions/827.html | 1 | Related CWE |

---

## Notes for Writer Agent

### Tone Guidance
- **Serious but not overwhelming:** XXE is dangerous but less common than SQLi
- **Language-specific:** Different parsers have different defaults
- **Practical:** Show the exact configuration options
- **Modern context:** JSON is often the better choice

### Technical Accuracy
- Java's DocumentBuilder is vulnerable by default - emphasize this
- Python's standard library is safe from external entities but vulnerable to Billion Laughs
- PHP 8.0+ is safe by default
- .NET 4.5.2+ XmlReader is safe by default
- libxml2 2.9+ disables external entities by default
- defusedxml is the recommended Python solution

### Things to Avoid
- Don't suggest all XML parsing is dangerous (only when processing untrusted input)
- Don't forget the Billion Laughs attack (DoS even without external entities)
- Don't assume readers know what DTD means
- Don't overcomplicate - "disable DTD" is the main message

### Vibe Coding Terms
Use these 3-5 times naturally:
- vibe coding / vibe coders
- AI-generated code
- AI tools

### Value Maximizers
- Language-specific configurations (most valuable)
- defusedxml as drop-in Python solution
- "Use JSON instead" as simplest fix
- Connection to SSRF (XXE is an SSRF vector)
- AI fix prompt for automated review

---

## Checklist Before Marking READY

- [x] All external links verified working
- [x] CWE/OWASP references correct (CWE-611, A05:2021)
- [x] 7 internal links identified
- [x] 5 PAA questions included
- [x] Competitive gap is specific
- [x] Language-specific examples (Java, Python, Node.js, PHP, .NET)
- [x] Attack examples included
- [x] AI fix prompt included
- [x] Billion Laughs DoS mentioned

---

**Brief Status:** READY for Writer Agent
