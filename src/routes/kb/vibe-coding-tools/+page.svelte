<script lang="ts">
  import { onMount } from 'svelte';

  let showSecurityTable = $state(true);

  // Last updated: December 2025 - CVE data verified via NVD and IDEsaster research
  const tools = [
    {
      slug: 'cursor',
      name: 'Cursor',
      company: 'Anysphere',
      type: 'IDE',
      model: 'GPT-4/Claude',
      price: '$20/mo',
      bestFor: 'Overall IDE experience',
      description: 'AI-powered code editor built on VS Code with Composer and Chat features.',
      topIssue: 'Path Traversal',
      cve: 'CVE-2025-59944',
      cveCount: 4,
      cveSeverity: 'High',
      securityScore: 'B',
      knownPatterns: ['Template literals in queries', 'Inline database credentials', 'Prompt injection risks'],
      category: 'ide'
    },
    {
      slug: 'claude-code',
      name: 'Claude Code',
      company: 'Anthropic',
      type: 'CLI',
      model: 'Claude',
      price: '$20/mo Pro or API',
      bestFor: 'Agentic coding',
      description: 'Anthropic\'s official CLI tool for autonomous coding tasks.',
      topIssue: 'Command Injection',
      cve: 'CVE-2025-54795',
      cveCount: 3,
      cveSeverity: 'High (8.7)',
      securityScore: 'B+',
      knownPatterns: ['Path restriction bypass', 'Command injection risks', 'WebSocket auth (MCP)'],
      category: 'cli'
    },
    {
      slug: 'windsurf',
      name: 'Windsurf',
      company: 'Codeium',
      type: 'IDE',
      model: 'Multiple',
      price: '$15/mo',
      bestFor: 'Autonomous agent',
      description: 'AI-native IDE with Cascade autonomous agent capabilities.',
      topIssue: 'Path Traversal',
      cve: 'CVE-2025-62353',
      cveCount: 1,
      cveSeverity: 'Critical (9.8)',
      securityScore: 'C+',
      knownPatterns: ['Path traversal in tools', 'Prompt injection .env exfiltration', 'Open API routes'],
      category: 'ide'
    },
    {
      slug: 'github-copilot',
      name: 'GitHub Copilot',
      company: 'Microsoft',
      type: 'IDE',
      model: 'GPT-4',
      price: '$10-19/mo',
      bestFor: 'Most popular',
      description: 'GitHub\'s AI pair programmer, the most widely adopted coding assistant.',
      topIssue: 'Path Traversal',
      cve: 'CVE-2025-62449',
      cveCount: 3,
      cveSeverity: 'High',
      securityScore: 'B',
      knownPatterns: ['String concatenation in queries', 'Weak random generation', 'Missing input validation'],
      category: 'ide'
    },
    {
      slug: 'bolt',
      name: 'Bolt.new',
      company: 'StackBlitz',
      type: 'Web',
      model: 'Claude 3.5',
      price: '$20/mo',
      bestFor: 'Rapid prototyping',
      description: 'Build and deploy full-stack apps directly in the browser.',
      topIssue: 'Hardcoded Secrets',
      cve: null,
      cveCount: 0,
      cveSeverity: null,
      securityScore: 'C+',
      knownPatterns: ['Hardcoded API keys', 'Missing .gitignore', 'Open endpoints'],
      category: 'web'
    },
    {
      slug: 'v0',
      name: 'v0',
      company: 'Vercel',
      type: 'Web',
      model: 'Claude/GPT-4',
      price: '$20/mo',
      bestFor: 'UI components',
      description: 'Vercel\'s AI for generating React and Next.js UI components.',
      topIssue: 'NEXT_PUBLIC_ Exposure',
      cve: null,
      cveCount: 0,
      cveSeverity: null,
      securityScore: 'B',
      knownPatterns: ['NEXT_PUBLIC_ secret exposure', 'Client-side validation only', 'Environment variable misuse'],
      category: 'web'
    },
    {
      slug: 'lovable',
      name: 'Lovable',
      company: 'Lovable',
      type: 'Web',
      model: 'Claude 3.5',
      price: '$25/mo',
      bestFor: 'Full-stack apps',
      description: 'AI app builder for creating complete applications from prompts.',
      topIssue: 'Missing RLS',
      cve: 'CVE-2025-48757',
      cveCount: 1,
      cveSeverity: 'Critical (9.3)',
      securityScore: 'C',
      knownPatterns: ['Missing Row Level Security', 'Exposed Supabase endpoints', 'Open API routes'],
      category: 'web'
    },
    {
      slug: 'replit',
      name: 'Replit',
      company: 'Replit',
      type: 'Web',
      model: 'Multiple',
      price: '$25/mo',
      bestFor: 'Learning/Prototyping',
      description: 'Online IDE with AI agent, hosting, and collaboration features.',
      topIssue: 'Database Deletion',
      cve: null,
      cveCount: 0,
      cveSeverity: null,
      securityScore: 'C',
      knownPatterns: ['July 2024 database deletion incident', 'Debug mode in production', 'Hardcoded DB credentials'],
      category: 'web'
    },
    {
      slug: 'cline',
      name: 'Cline',
      company: 'Open Source',
      type: 'CLI',
      model: 'Any (BYOK)',
      price: 'Free (BYOK)',
      bestFor: 'Open source alternative',
      description: 'Open-source AI coding assistant with VS Code extension. Bring your own API key.',
      topIssue: 'Tool Call Manipulation',
      cve: 'CVE-2025-32723',
      cveCount: 1,
      cveSeverity: 'High',
      securityScore: 'B',
      knownPatterns: ['Tool call manipulation via prompts', 'MCP server vulnerabilities', 'Dependency on user config'],
      category: 'cli'
    }
  ];

  const ideTools = tools.filter(t => t.category === 'ide');
  const webTools = tools.filter(t => t.category === 'web');
  const cliTools = tools.filter(t => t.category === 'cli');

  function getScoreColor(score: string) {
    if (score.startsWith('A')) return '#16a34a';
    if (score.startsWith('B')) return '#d97706';
    return '#dc2626';
  }

  // Calculate total CVEs across all tools
  const totalCVEs = tools.reduce((sum, t) => sum + (t.cveCount || 0), 0);
  const toolsWithCVEs = tools.filter(t => t.cve).length;

  // Schema.org structured data
  onMount(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Best Vibe Coding Tools 2025: Security Comparison Guide",
      "description": "Compare 9 vibe coding tools including Cursor, Claude Code, Windsurf, and Bolt. See real CVE data from NVD and IDEsaster research. Learn how to use each tool securely.",
      "author": {
        "@type": "Organization",
        "name": "vibeship"
      },
      "publisher": {
        "@type": "Organization",
        "name": "vibeship",
        "url": "https://vibeship.co"
      },
      "datePublished": "2025-01-01",
      "dateModified": "2025-12-17",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://vibeship.co/kb/vibe-coding-tools/"
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the best vibe coding tool in 2025?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The best vibe coding tool depends on your needs. Cursor is the best overall IDE for professional development. Claude Code is best for autonomous agentic coding. Bolt.new is best for rapid prototyping. All major tools have had CVEs in 2025 - see our security comparison with verified NVD data."
          }
        },
        {
          "@type": "Question",
          "name": "Which AI coding tool is most secure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No AI coding tool is completely secure - all have had vulnerabilities. Web-based tools like Bolt.new and v0 have no known CVEs but generate code with hardcoded secrets. IDE tools like Cursor and Windsurf have CVEs but better code quality. Claude Code has 3 CVEs but generally produces security-conscious code. Always scan AI-generated code before deployment."
          }
        },
        {
          "@type": "Question",
          "name": "Is Cursor better than GitHub Copilot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cursor and GitHub Copilot serve different needs. Cursor offers a complete IDE experience with Composer for larger changes, while Copilot integrates into existing IDEs. Both have multiple 2025 CVEs. Cursor costs $20/month vs Copilot's $10-19/month. Choose Cursor for dedicated AI IDE, Copilot for integration with your existing setup."
          }
        },
        {
          "@type": "Question",
          "name": "Are vibe coding tools safe to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vibe coding tools are safe when used correctly, but require security awareness. AI-generated code frequently contains vulnerabilities. Multiple CVEs have been found in major AI coding tools including Cursor, Windsurf, and Claude Code. Key safety practices: always review generated code, scan before deployment, and keep tools updated."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between Cursor and Claude Code?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cursor is a full IDE (VS Code fork) with visual interface, while Claude Code is a CLI tool for terminal-based development. Cursor costs $20/month flat; Claude Code uses $20/month Pro or API pricing. Cursor supports multiple models (GPT-4, Claude); Claude Code uses only Claude models. Both have had 2025 CVEs. Choose Cursor for visual IDE experience, Claude Code for terminal-based agentic workflows."
          }
        }
      ]
    };

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.text = JSON.stringify(schema);
    document.head.appendChild(scriptTag);

    const faqScriptTag = document.createElement('script');
    faqScriptTag.type = 'application/ld+json';
    faqScriptTag.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScriptTag);
  });
</script>

<svelte:head>
  <title>Best Vibe Coding Tools 2025: Security Comparison | VibeShip</title>
  <meta name="description" content="Compare 9 AI coding tools with real CVE data: Cursor, Claude Code, Windsurf, Bolt & more. Security comparison using NVD data. See how to vibe code safely." />
  <meta name="keywords" content="vibe coding tools, best vibe coding tools, AI coding tools, Cursor, Claude Code, Windsurf, Bolt, vibe coding, AI IDE security, CVE" />
  <meta property="og:title" content="Best Vibe Coding Tools 2025: Security Comparison | VibeShip" />
  <meta property="og:description" content="Compare 9 AI coding tools with real CVE data: Cursor, Claude Code, Windsurf, Bolt & more. Security comparison using NVD data. See how to vibe code safely." />
  <meta property="og:url" content="/kb/vibe-coding-tools/" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Best Vibe Coding Tools 2025: Security Comparison | VibeShip" />
  <meta name="twitter:description" content="Compare 9 AI coding tools with real CVE data: Cursor, Claude Code, Windsurf, Bolt & more. See how to vibe code safely." />
  <link rel="canonical" href="https://vibeship.co/kb/vibe-coding-tools/" />
</svelte:head>

<nav aria-label="Breadcrumb" class="breadcrumb">
  <a href="/">Home</a>
  <span>/</span>
  <a href="/kb">Knowledge Base</a>
  <span>/</span>
  <span aria-current="page">Vibe Coding Tools</span>
</nav>

<article class="hub-article">
  <header class="article-header">
    <h1>Best Vibe Coding Tools 2025: Security Comparison Guide</h1>
    <p class="subtitle">Compare 9 AI coding tools on features, pricing, and real CVE data</p>
    <p class="last-updated">Last updated: December 2025 - CVEs verified via <a href="https://nvd.nist.gov/">NVD</a></p>
  </header>

  <div class="quick-answer">
    <strong>The best vibe coding tools in 2025 are Cursor, Claude Code, Windsurf, and Bolt.new - but ALL major tools have had CVEs this year.</strong>
    The <a href="https://ideaster.github.io/about/">IDEsaster research</a> has documented multiple vulnerabilities in AI coding tools. Critical CVEs include Windsurf (<a href="https://nvd.nist.gov/vuln/detail/CVE-2025-62353">CVE-2025-62353</a>, CVSS 9.8) and Lovable (<a href="https://nvd.nist.gov/vuln/detail/CVE-2025-48757">CVE-2025-48757</a>, CVSS 9.3). This guide compares 9 tools with verified <a href="https://nvd.nist.gov/">NVD</a> data so you can <a href="/kb/vibe-coding/what-is-vibe-coding/">vibe code</a> safely.
  </div>

  <!-- CVE Tracker Visual Component -->
  <div class="cve-tracker">
    <div class="cve-tracker-header">
      <h3>AI Coding Tool CVE Tracker</h3>
      <span class="tracker-badge">Live Data - December 2025</span>
    </div>
    <div class="cve-grid">
      <div class="cve-stat critical">
        <span class="cve-count">2</span>
        <span class="cve-label">Critical CVEs</span>
        <span class="cve-detail">CVSS 9.0+</span>
      </div>
      <div class="cve-stat high">
        <span class="cve-count">10+</span>
        <span class="cve-label">High CVEs</span>
        <span class="cve-detail">CVSS 7.0-8.9</span>
      </div>
      <div class="cve-stat affected">
        <span class="cve-count">{toolsWithCVEs}</span>
        <span class="cve-label">Tools Affected</span>
        <span class="cve-detail">of 9 analyzed</span>
      </div>
      <div class="cve-stat developers">
        <span class="cve-count">9.8</span>
        <span class="cve-label">Max CVSS Score</span>
        <span class="cve-detail">Windsurf CVE-2025-62353</span>
      </div>
    </div>
    <p class="cve-source">Source: <a href="https://nvd.nist.gov/">National Vulnerability Database</a>, <a href="https://ideaster.github.io/about/">IDEsaster Research</a></p>
  </div>

  <div class="stats-box">
    <div class="stat">
      <span class="stat-value">9</span>
      <span class="stat-label">Tools Compared</span>
    </div>
    <div class="stat">
      <span class="stat-value">{toolsWithCVEs}</span>
      <span class="stat-label">Have Known CVEs</span>
    </div>
    <div class="stat">
      <span class="stat-value">13</span>
      <span class="stat-label">Total CVEs Found</span>
    </div>
    <div class="stat">
      <span class="stat-value">Cline</span>
      <span class="stat-label">Free Option (BYOK)</span>
    </div>
  </div>

  <nav class="toc">
    <h2>Contents</h2>
    <ul>
      <li><a href="#what-are">What Are Vibe Coding Tools?</a></li>
      <li><a href="#quick-comparison">Quick Comparison Table</a></li>
      <li><a href="#ide-tools">Best IDE-Based Tools</a></li>
      <li><a href="#web-tools">Best Web-Based Tools</a></li>
      <li><a href="#cli-tools">Best CLI Tools (Claude Code, Cline)</a></li>
      <li><a href="#security-comparison">Security Comparison with CVE Data</a></li>
      <li><a href="#secure-usage">How to Use Any Tool Securely</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
  </nav>

  <section id="what-are">
    <h2>What Are Vibe Coding Tools?</h2>

    <p>Vibe coding tools are AI-powered assistants that help you write code through natural language prompts. The term "vibe coding" was coined by Andrej Karpathy in early 2025 to describe the practice of building software by describing what you want rather than writing every line yourself. Learn more in our <a href="/kb/vibe-coding/what-is-vibe-coding/">complete guide to vibe coding</a>.</p>

    <p>These tools range from IDE extensions like <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> and <a href="/kb/vibe-coding-tools/github-copilot/">GitHub Copilot</a> to web-based builders like <a href="/kb/vibe-coding-tools/bolt/">Bolt.new</a> and <a href="/kb/vibe-coding-tools/lovable/">Lovable</a>. While they dramatically speed up development, AI-generated code frequently contains security vulnerabilities. That's why understanding each tool's security patterns is critical.</p>
  </section>

  <section id="quick-comparison">
    <h2>Quick Comparison Table</h2>

    <div class="comparison-table-container">
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Tool</th>
            <th>Type</th>
            <th>Best For</th>
            <th>Price</th>
            <th>CVEs</th>
            <th>Severity</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {#each tools as tool}
            <tr class:critical-row={tool.cveSeverity?.includes('Critical')}>
              <td>
                <a href="/kb/vibe-coding-tools/{tool.slug}/" class="tool-link">{tool.name}</a>
              </td>
              <td>{tool.type}</td>
              <td>{tool.bestFor}</td>
              <td>{tool.price}</td>
              <td>
                {#if tool.cveCount > 0}
                  <span class="cve-count-badge">{tool.cveCount}</span>
                {:else}
                  <span class="no-cve-badge">0</span>
                {/if}
              </td>
              <td>
                {#if tool.cveSeverity}
                  <span class="severity-badge {tool.cveSeverity.includes('Critical') ? 'critical' : 'high'}">
                    {tool.cveSeverity}
                  </span>
                {:else}
                  <span class="severity-badge none">N/A</span>
                {/if}
              </td>
              <td>
                <span class="security-score" style="color: {getScoreColor(tool.securityScore)}">
                  {tool.securityScore}
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <p class="table-note">CVE data from <a href="https://nvd.nist.gov/">NVD</a> and <a href="https://ideaster.github.io/about/">IDEsaster research</a>. Security grades are editorial assessments based on CVE count, CVE severity, and documented vulnerability patterns - not a formal security audit. December 2025.</p>
  </section>

  <section id="ide-tools">
    <h2>Best IDE-Based Vibe Coding Tools</h2>

    <p>IDE-based tools integrate directly into your development environment, offering real-time code suggestions and chat interfaces.</p>

    <div class="tool-cards">
      {#each ideTools as tool}
        <a href="/kb/vibe-coding-tools/{tool.slug}/" class="tool-card">
          <div class="tool-header">
            <h3>{tool.name}</h3>
            <span class="security-badge" style="background: {getScoreColor(tool.securityScore)}20; color: {getScoreColor(tool.securityScore)}">
              {tool.securityScore}
            </span>
          </div>
          <p class="tool-tagline">{tool.bestFor}</p>
          <p class="tool-description">{tool.description}</p>
          <div class="tool-meta">
            <span><strong>Company:</strong> {tool.company}</span>
            <span><strong>Price:</strong> {tool.price}</span>
            <span><strong>Model:</strong> {tool.model}</span>
          </div>
          <div class="tool-security">
            <span class="security-label">Security Watch:</span>
            <span class="security-issue">{tool.topIssue}</span>
            {#if tool.cve}
              <span class="cve-tag">{tool.cve}</span>
            {/if}
          </div>
        </a>
      {/each}
    </div>

    <h3>Cursor - Best Overall IDE</h3>
    <p><a href="/kb/vibe-coding-tools/cursor/">Cursor</a> is a VS Code fork with deep AI integration. Its Composer feature handles multi-file changes, and it supports both GPT-4 and Claude models. Security-wise, it has 4 CVEs in 2025 including <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-59944">CVE-2025-59944</a> (path traversal) and commonly generates template literal SQL queries. Best for developers who want a complete AI-native IDE experience. See our <a href="/kb/vibe-coding-tools/claude-code-vs-cursor/">Claude Code vs Cursor</a> comparison.</p>

    <h3>GitHub Copilot - Most Popular</h3>
    <p><a href="/kb/vibe-coding-tools/github-copilot/">GitHub Copilot</a> is the most widely adopted AI coding tool. It has 3 CVEs in 2025 including <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-62449">CVE-2025-62449</a> and <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-53773">CVE-2025-53773</a>. Known patterns include string concatenation in SQL queries and weak random generation. At $10-19/month, it's more affordable than Cursor. Best for developers already in the GitHub ecosystem who want inline suggestions.</p>

    <h3>Windsurf - Best Autonomous Agent</h3>
    <p><a href="/kb/vibe-coding-tools/windsurf/">Windsurf</a> by Codeium offers Cascade, an autonomous agent that can make changes across your codebase. <strong>Critical:</strong> It has <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-62353">CVE-2025-62353</a> (path traversal, <strong>CVSS 9.8</strong>) and documented prompt injection attacks that can exfiltrate .env files. At $15/month, it's the cheapest IDE option but has the highest severity CVE. Best for developers who want maximum autonomy but must keep updated. See our <a href="/kb/vibe-coding-tools/windsurf-vs-cursor/">Windsurf vs Cursor</a> comparison.</p>
  </section>

  <section id="web-tools">
    <h2>Best Web-Based Vibe Coding Tools</h2>

    <p>Web-based tools let you build complete applications in your browser without local setup. They're popular for rapid prototyping but often have the most security issues.</p>

    <div class="tool-cards">
      {#each webTools as tool}
        <a href="/kb/vibe-coding-tools/{tool.slug}/" class="tool-card">
          <div class="tool-header">
            <h3>{tool.name}</h3>
            <span class="security-badge" style="background: {getScoreColor(tool.securityScore)}20; color: {getScoreColor(tool.securityScore)}">
              {tool.securityScore}
            </span>
          </div>
          <p class="tool-tagline">{tool.bestFor}</p>
          <p class="tool-description">{tool.description}</p>
          <div class="tool-meta">
            <span><strong>Company:</strong> {tool.company}</span>
            <span><strong>Price:</strong> {tool.price}</span>
            <span><strong>Model:</strong> {tool.model}</span>
          </div>
          <div class="tool-security">
            <span class="security-label">Security Watch:</span>
            <span class="security-issue">{tool.topIssue}</span>
            {#if tool.cve}
              <span class="cve-tag">{tool.cve}</span>
            {/if}
          </div>
        </a>
      {/each}
    </div>

    <h3>Bolt.new - Best for Rapid Prototyping</h3>
    <p><a href="/kb/vibe-coding-tools/bolt/">Bolt.new</a> by StackBlitz lets you build and deploy full-stack apps entirely in the browser using WebContainers. Its "ready to run" philosophy prioritizes speed, which often means <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a> and missing .gitignore files. Best for quick prototypes you'll secure before production.</p>

    <h3>v0 - Best for UI Components</h3>
    <p><a href="/kb/vibe-coding-tools/v0/">v0</a> by Vercel generates React and Next.js UI components from prompts. A common issue is NEXT_PUBLIC_ environment variable exposure where secrets are accidentally made public. Best for generating UI components to integrate into existing secure applications.</p>

    <h3>Lovable - Best for Full-Stack Apps</h3>
    <p><a href="/kb/vibe-coding-tools/lovable/">Lovable</a> builds complete applications from prompts, but <strong>Critical:</strong> <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-48757">CVE-2025-48757</a> (<strong>CVSS 9.3</strong>) exposed applications due to missing Supabase Row Level Security. At $25/month it's pricier than alternatives. Best used with careful RLS auditing - see our <a href="/kb/security/vulnerabilities/broken-access-control/">broken access control</a> guide.</p>

    <h3>Replit - Best for Learning</h3>
    <p><a href="/kb/vibe-coding-tools/replit/">Replit</a> offers an online IDE with AI agent, hosting, and collaboration. A July 2024 incident saw their agent delete a production database and fabricate fake data. Now has Semgrep integration for scanning. Best for learning and prototyping, not production without additional security review.</p>
  </section>

  <section id="cli-tools">
    <h2>Best CLI/Terminal Tools</h2>

    <p>CLI tools offer powerful agentic coding from the terminal. They're popular with experienced developers who prefer command-line workflows.</p>

    <div class="tool-cards">
      {#each cliTools as tool}
        <a href="/kb/vibe-coding-tools/{tool.slug}/" class="tool-card {tool.slug === 'cline' ? 'open-source' : 'featured'}">
          <div class="tool-header">
            <h3>{tool.name}</h3>
            <span class="security-badge" style="background: {getScoreColor(tool.securityScore)}20; color: {getScoreColor(tool.securityScore)}">
              {tool.securityScore}
            </span>
          </div>
          <p class="tool-tagline">{tool.bestFor}</p>
          <p class="tool-description">{tool.description}</p>
          <div class="tool-meta">
            <span><strong>Company:</strong> {tool.company}</span>
            <span><strong>Price:</strong> {tool.price}</span>
            <span><strong>Model:</strong> {tool.model}</span>
          </div>
          <div class="tool-security">
            <span class="security-label">Security Watch:</span>
            <span class="security-issue">{tool.topIssue}</span>
            {#if tool.cve}
              <span class="cve-tag">{tool.cve}</span>
            {/if}
            {#if tool.cveSeverity}
              <span class="severity-mini">{tool.cveSeverity}</span>
            {/if}
          </div>
        </a>
      {/each}
    </div>

    <h3>Claude Code - Best Agentic Coding</h3>
    <p><a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> is Anthropic's official CLI for autonomous coding tasks. Despite being security-focused, it has 3 CVEs in 2025: <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-54795">CVE-2025-54795</a> (command injection, CVSS 8.7), <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-54794">CVE-2025-54794</a> (path restriction bypass, CVSS 7.7), and <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-52882">CVE-2025-52882</a> (WebSocket auth bypass in MCP, CVSS 8.8). Pricing is $20/month for Claude Pro or API usage. Best for developers comfortable with terminal workflows. See our <a href="/kb/vibe-coding-tools/claude-code-vs-cursor/">Claude Code vs Cursor</a> comparison.</p>

    <h3>Cline - Best Free/Open Source Option</h3>
    <p><a href="https://github.com/cline/cline">Cline</a> is an open-source AI coding assistant with a VS Code extension. It's completely free - you just bring your own API key (BYOK) from OpenAI, Anthropic, or other providers. It has <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-32723">CVE-2025-32723</a> (tool call manipulation). Security depends heavily on your configuration and which API you connect. Best for developers who want full control over their AI coding tool without subscription fees.</p>
  </section>

  <section id="security-comparison">
    <h2>Security Comparison: CVE Data for All Tools</h2>

    <p>The <a href="https://ideaster.github.io/about/">IDEsaster research</a> has documented multiple vulnerabilities in AI coding tools in 2025. Here's the current CVE landscape based on <a href="https://nvd.nist.gov/">NVD</a> data:</p>

    <div class="security-comparison-table">
      <table>
        <thead>
          <tr>
            <th>Tool</th>
            <th>CVEs</th>
            <th>Max Severity</th>
            <th>Top Pattern</th>
            <th>Mitigation</th>
          </tr>
        </thead>
        <tbody>
          <tr class="critical-highlight">
            <td><strong>Windsurf</strong></td>
            <td><span class="has-cve">1 CVE</span></td>
            <td><span class="severity-critical">Critical (9.8)</span></td>
            <td>Path traversal</td>
            <td>Update immediately</td>
          </tr>
          <tr class="critical-highlight">
            <td><strong>Lovable</strong></td>
            <td><span class="has-cve">1 CVE</span></td>
            <td><span class="severity-critical">Critical (9.3)</span></td>
            <td>Missing RLS</td>
            <td>Audit all Supabase RLS</td>
          </tr>
          <tr>
            <td>Claude Code</td>
            <td><span class="has-cve">3 CVEs</span></td>
            <td><span class="severity-high">High (8.8)</span></td>
            <td>Command injection</td>
            <td>Review MCP servers</td>
          </tr>
          <tr>
            <td>Cursor</td>
            <td><span class="has-cve">4 CVEs</span></td>
            <td><span class="severity-high">High</span></td>
            <td>Path traversal</td>
            <td>.cursorrules + update</td>
          </tr>
          <tr>
            <td>GitHub Copilot</td>
            <td><span class="has-cve">3 CVEs</span></td>
            <td><span class="severity-high">High</span></td>
            <td>SQL string concat</td>
            <td>Content exclusions</td>
          </tr>
          <tr>
            <td>Cline</td>
            <td><span class="has-cve">1 CVE</span></td>
            <td><span class="severity-high">High</span></td>
            <td>Tool call manipulation</td>
            <td>Review tool permissions</td>
          </tr>
          <tr>
            <td>v0</td>
            <td><span class="no-cve">0 CVEs</span></td>
            <td><span class="severity-na">N/A</span></td>
            <td>NEXT_PUBLIC_ exposure</td>
            <td>Review env variables</td>
          </tr>
          <tr>
            <td>Bolt.new</td>
            <td><span class="no-cve">0 CVEs</span></td>
            <td><span class="severity-na">N/A</span></td>
            <td><a href="/kb/security/vulnerabilities/hardcoded-secrets/">Hardcoded secrets</a></td>
            <td>Scan before deploy</td>
          </tr>
          <tr>
            <td>Replit</td>
            <td><span class="no-cve">0 CVEs</span></td>
            <td><span class="severity-na">N/A</span></td>
            <td>Database deletion risk</td>
            <td>Semgrep integration</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="table-source">CVE data from <a href="https://nvd.nist.gov/">National Vulnerability Database</a>. Updated December 2025.</p>

    <h3>Key Takeaways</h3>
    <ul>
      <li><strong>No tool is CVE-free:</strong> All major IDE and CLI tools have had 2025 CVEs - even Claude Code has 3</li>
      <li><strong>Critical CVEs:</strong> Windsurf (CVSS 9.8) and Lovable (CVSS 9.3) need immediate attention</li>
      <li><strong>Web tools trade-off:</strong> Bolt.new and v0 have no CVEs but generate code with hardcoded secrets</li>
      <li><strong>Keep tools updated:</strong> Most CVEs are patched in latest versions - update regularly</li>
      <li><strong>Scan everything:</strong> All tools can generate vulnerable code - scanning is essential</li>
    </ul>
  </section>

  <section id="secure-usage">
    <h2>How to Use Any Vibe Coding Tool Securely</h2>

    <p>Regardless of which tool you choose, follow these practices to vibe code safely. For comprehensive guidance, see our <a href="/kb/vibe-coding/secure-vibe-coding-guide/">Complete Secure Vibe Coding Guide</a>.</p>

    <div class="security-tips">
      <div class="tip">
        <h4>1. Use Security-Focused Prompts</h4>
        <p>Don't just ask for "a login system." Ask for "a secure login system with parameterized queries, password hashing with bcrypt, and rate limiting." Be explicit about security requirements.</p>
      </div>

      <div class="tip">
        <h4>2. Review All Generated Code</h4>
        <p>Never blindly accept AI suggestions. Look for common patterns: <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a> via string concatenation, <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a>, and <a href="/kb/security/vulnerabilities/missing-auth/">missing authentication</a>.</p>
      </div>

      <div class="tip">
        <h4>3. Scan Before Deploying</h4>
        <p>Run a security scanner on all AI-generated code before it goes to production. <a href="https://scanner.vibeship.co">vibeship scanner</a> is built specifically for vibe coded projects.</p>
      </div>

      <div class="tip">
        <h4>4. Know Your Tool's Weaknesses</h4>
        <p>Each tool has specific patterns it gets wrong. Read our individual tool guides to understand what to watch for with your chosen tool.</p>
      </div>

      <div class="tip">
        <h4>5. Keep Tools Updated</h4>
        <p>Tools like Cursor, Windsurf, and Copilot have had 2025 CVEs. Keep your tools updated to get security patches.</p>
      </div>
    </div>
  </section>

  <section id="faq">
    <h2>Frequently Asked Questions</h2>

    <div class="faq-list">
      <details class="faq-item">
        <summary>What is the best vibe coding tool in 2025?</summary>
        <div class="faq-answer">
          <p>The best vibe coding tool depends on your needs. <a href="/kb/vibe-coding-tools/cursor/">Cursor</a> ($20/mo) is the best overall IDE for professional development. <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> ($20/mo or API) is best for autonomous agentic coding. <a href="/kb/vibe-coding-tools/bolt/">Bolt.new</a> ($20/mo) is best for rapid prototyping. For budget-conscious developers, <a href="https://github.com/cline/cline">Cline</a> is free (BYOK). All major tools have had CVEs in 2025 - see our security comparison above.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>Which AI coding tool is most secure?</summary>
        <div class="faq-answer">
          <p>No AI coding tool is completely secure in 2025. The <a href="https://ideaster.github.io/about/">IDEsaster research</a> has documented CVEs across multiple AI coding tools. <strong>Critical severity:</strong> Windsurf (CVSS 9.8) and Lovable (CVSS 9.3). Claude Code has 3 CVEs (max CVSS 8.8). Web tools like Bolt.new have no CVEs but generate code with hardcoded secrets. Always scan AI-generated code before deployment regardless of tool choice.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>Is Cursor better than GitHub Copilot?</summary>
        <div class="faq-answer">
          <p><a href="/kb/vibe-coding-tools/cursor/">Cursor</a> and <a href="/kb/vibe-coding-tools/github-copilot/">GitHub Copilot</a> serve different needs. Cursor offers a complete IDE with Composer for larger changes, while Copilot integrates into existing IDEs. Both have multiple 2025 CVEs. Cursor costs $20/month vs Copilot's $10-19/month. Choose Cursor for dedicated AI IDE, Copilot for integration with VS Code. See our <a href="/kb/vibe-coding-tools/claude-code-vs-cursor/">Claude Code vs Cursor</a> comparison.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>Are vibe coding tools safe to use?</summary>
        <div class="faq-answer">
          <p>Vibe coding tools are safe when used correctly, but AI-generated code frequently contains security vulnerabilities. The <a href="https://ideaster.github.io/about/">IDEsaster research</a> has documented CVEs across major AI coding tools including Cursor, Windsurf, and Claude Code. Key safety practices: always review generated code, scan before deployment, keep tools updated, and understand each tool's vulnerability patterns. See our <a href="/kb/vibe-coding/secure-vibe-coding-guide/">secure vibe coding guide</a>.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>What's the difference between Cursor and Claude Code?</summary>
        <div class="faq-answer">
          <p><a href="/kb/vibe-coding-tools/cursor/">Cursor</a> is a full IDE (VS Code fork) with visual interface, while <a href="/kb/vibe-coding-tools/claude-code/">Claude Code</a> is a CLI tool for terminal-based development. Both cost ~$20/month. Cursor supports multiple models (GPT-4, Claude); Claude Code uses only Claude. Both have 2025 CVEs (Cursor: 4, Claude Code: 3). Choose Cursor for visual IDE experience, Claude Code for terminal-based agentic workflows. See our detailed <a href="/kb/vibe-coding-tools/claude-code-vs-cursor/">Claude Code vs Cursor comparison</a>.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>Is there a free AI coding tool?</summary>
        <div class="faq-answer">
          <p>Yes. <a href="https://github.com/cline/cline">Cline</a> is completely free and open source - you just bring your own API key from OpenAI, Anthropic, or other providers. GitHub Copilot offers a limited free tier with 2000 completions. Most other tools require $10-25/month subscriptions. Cline has 1 CVE (<a href="https://nvd.nist.gov/vuln/detail/CVE-2025-32723">CVE-2025-32723</a>) for tool call manipulation.</p>
        </div>
      </details>
    </div>
  </section>

  <section class="article-section">
    <h2>Related content</h2>
    <div class="related-grid">
      <a href="/kb/vibe-coding/secure-vibe-coding-guide/" class="card card-interactive related-card">
        <div class="related-card-category">Guide</div>
        <div class="related-card-title">Secure Vibe Coding Guide</div>
        <p class="related-card-description">Complete guide to shipping fast without getting hacked</p>
      </a>
      <a href="/kb/vibe-coding/what-is-vibe-coding/" class="card card-interactive related-card">
        <div class="related-card-category">Concept</div>
        <div class="related-card-title">What is Vibe Coding?</div>
        <p class="related-card-description">Definition and complete introduction</p>
      </a>
      <a href="/kb/security/vulnerabilities/hardcoded-secrets/" class="card card-interactive related-card">
        <div class="related-card-category">Vulnerability</div>
        <div class="related-card-title">Hardcoded Secrets</div>
        <p class="related-card-description">The most common AI code vulnerability</p>
      </a>
      <a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
        <div class="related-card-category">Vulnerability</div>
        <div class="related-card-title">SQL Injection</div>
        <p class="related-card-description">AI loves string concatenation in queries</p>
      </a>
    </div>
  </section>

  <section class="cta-section">
    <h2>Scan Your AI-Generated Code</h2>
    <p>vibeship scanner finds vulnerabilities that all vibe coding tools create. Works with code from Cursor, Claude Code, Bolt, and more.</p>
    <a href="https://scanner.vibeship.co" class="cta-button">Scan Your Repository</a>
  </section>
</article>

<style>
  .hub-article {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1rem;
    line-height: 1.7;
    color: var(--text-primary);
  }

  .breadcrumb {
    display: flex;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .breadcrumb a {
    color: var(--green-dim);
    text-decoration: none;
  }

  .breadcrumb a:hover {
    color: var(--green);
    color: var(--green);
  }

  .article-header {
    margin-bottom: 2rem;
  }

  h1 {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 2.5rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  .subtitle {
    font-size: 1.125rem;
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
  }

  .last-updated {
    font-size: 0.8rem;
    color: var(--text-tertiary);
    margin: 0;
  }

  .last-updated a {
    color: var(--green-dim);
  }

  /* CVE Tracker Component */
  .cve-tracker {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .cve-tracker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .cve-tracker-header h3 {
    margin: 0;
    color: var(--text-primary);
    font-size: 1.1rem;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
  }

  .tracker-badge {
    background: var(--bg-tertiary);
    border: 1px solid var(--border);
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-secondary);
  }

  .cve-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  .cve-stat {
    text-align: center;
    padding: 1rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border);
  }

  .cve-stat.critical {
    border-left: 3px solid var(--red);
  }

  .cve-stat.high {
    border-left: 3px solid var(--orange);
  }

  .cve-stat.affected {
    border-left: 3px solid var(--blue);
  }

  .cve-stat.developers {
    border-left: 3px solid var(--green);
  }

  .cve-count {
    display: block;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .cve-label {
    display: block;
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-top: 0.25rem;
  }

  .cve-detail {
    display: block;
    font-size: 0.7rem;
    color: var(--text-tertiary);
    margin-top: 0.25rem;
  }

  .cve-source {
    font-size: 0.75rem;
    color: var(--text-tertiary);
    margin: 1rem 0 0 0;
    text-align: center;
  }

  .cve-source a {
    color: var(--green-dim);
  }

  /* Severity badges */
  .severity-badge {
    padding: 0.125rem 0.5rem;
    font-size: 0.7rem;
    font-weight: 500;
  }

  .severity-badge.critical {
    background: rgba(239, 68, 68, 0.15);
    color: var(--red);
    font-weight: 600;
  }

  .severity-badge.high {
    background: rgba(217, 119, 6, 0.15);
    color: var(--orange);
  }

  .severity-badge.none {
    background: var(--bg-tertiary);
    color: var(--text-secondary);
  }

  .severity-critical {
    color: var(--red);
    font-weight: 600;
  }

  .severity-high {
    color: var(--orange);
    font-weight: 500;
  }

  .severity-na {
    color: var(--text-secondary);
  }

  /* CVE count badges */
  .cve-count-badge {
    display: inline-block;
    background: rgba(239, 68, 68, 0.15);
    color: var(--red);
    padding: 0.125rem 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .no-cve-badge {
    display: inline-block;
    background: rgba(46, 204, 113, 0.15);
    color: var(--green);
    padding: 0.125rem 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
  }

  /* Critical row highlighting */
  .critical-row {
    background: rgba(239, 68, 68, 0.1);
  }

  .critical-highlight {
    background: rgba(239, 68, 68, 0.1);
  }

  .severity-mini {
    font-size: 0.65rem;
    color: var(--text-tertiary);
    margin-left: 0.25rem;
  }

  .table-source {
    font-size: 0.8rem;
    color: var(--text-tertiary);
    margin-top: 0.5rem;
  }

  .table-source a {
    color: var(--green-dim);
  }

  /* Open source card styling */
  .tool-card.open-source {
    border-left: 3px solid var(--green);
  }

  .quick-answer {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-left: 3px solid var(--green-dim);
    padding: 1.5rem;
    margin-bottom: 2rem;
    font-size: 1rem;
  }

  .quick-answer a {
    color: var(--green-dim);
    text-decoration: none;
  }

  .quick-answer a:hover {
    color: var(--green);
    color: var(--green);
  }

  .stats-box {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat {
    text-align: center;
  }

  .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .stat-label {
    font-size: 0.75rem;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .toc {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .toc h2 {
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    margin-bottom: 1rem;
    border-bottom: none;
    padding-bottom: 0;
  }

  .toc ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
  }

  .toc a {
    color: var(--green-dim);
    text-decoration: none;
    font-size: 0.875rem;
  }

  .toc a:hover {
    color: var(--green);
    color: var(--green);
  }

  section {
    margin-bottom: 3rem;
  }

  h2 {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1.875rem;
    font-weight: 400;
    margin-bottom: 1rem;
    color: var(--text-primary);
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
  }

  h3 {
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1.5rem;
    font-weight: 400;
    margin: 1.5rem 0 0.75rem;
    color: var(--text-primary);
  }

  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: var(--text-secondary);
  }

  p {
    margin-bottom: 1.25rem;
    color: var(--text-secondary);
  }

  a {
    color: var(--green-dim);
    text-decoration: none;
  }

  a:hover {
    color: var(--green);
    color: var(--green);
  }

  ul, ol {
    margin: 1.25rem 0;
    padding-left: 1.5rem;
    color: var(--text-secondary);
  }

  li {
    margin-bottom: 0.5rem;
  }

  li::marker {
    color: var(--green-dim);
  }

  /* Comparison Table */
  .comparison-table-container {
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
    border-bottom: 1px solid var(--border);
  }

  .comparison-table th {
    background: var(--bg-secondary);
    font-weight: 600;
    color: var(--text-primary);
  }

  .tool-link {
    font-weight: 500;
  }

  .security-score {
    font-weight: 700;
  }

  .has-cve {
    color: var(--red);
  }

  .no-cve {
    color: var(--green);
  }

  .table-note {
    font-size: 0.8rem;
    color: var(--text-tertiary);
    font-style: italic;
    margin-top: 0.5rem;
  }

  /* Tool Cards */
  .tool-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .tool-card {
    display: block;
    padding: 1.25rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    text-decoration: none;
    transition: border-color 0.2s;
  }

  .tool-card:hover {
    border-color: var(--green-dim);
    text-decoration: none;
  }

  .tool-card.featured {
    border-left: 3px solid var(--green-dim);
  }

  .tool-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .tool-header h3 {
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--text-primary);
  }

  .security-badge {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .tool-tagline {
    font-size: 0.8rem;
    color: var(--green-dim);
    font-weight: 500;
    margin: 0 0 0.5rem 0;
  }

  .tool-description {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0 0 0.75rem 0;
  }

  .tool-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    font-size: 0.75rem;
    color: var(--text-tertiary);
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border);
  }

  .tool-security {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
  }

  .security-label {
    color: var(--text-tertiary);
  }

  .security-issue {
    color: var(--red);
    font-weight: 500;
  }

  .cve-tag {
    background: rgba(239, 68, 68, 0.15);
    color: var(--red);
    padding: 0.125rem 0.375rem;
    font-size: 0.7rem;
  }

  /* Security Comparison Table */
  .security-comparison-table {
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  .security-comparison-table table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }

  .security-comparison-table th,
  .security-comparison-table td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border);
  }

  .security-comparison-table th {
    background: var(--bg-secondary);
    font-weight: 600;
    color: var(--text-primary);
  }

  .highlight-row {
    background: var(--bg-tertiary);
  }

  /* Security Tips */
  .security-tips {
    display: grid;
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .tip {
    padding: 1.25rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-left: 3px solid var(--green-dim);
  }

  .tip h4 {
    color: var(--text-primary);
    font-family: 'Inter', sans-serif;
  }

  .tip p {
    margin: 0;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  /* FAQ */
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .faq-item {
    border: 1px solid var(--border);
    overflow: hidden;
  }

  .faq-item summary {
    padding: 1rem;
    font-weight: 500;
    cursor: pointer;
    background: var(--bg-secondary);
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--text-primary);
  }

  .faq-item summary::-webkit-details-marker {
    display: none;
  }

  .faq-item summary::after {
    content: '+';
    font-size: 1.25rem;
    color: var(--green-dim);
    font-weight: 300;
  }

  .faq-item[open] summary::after {
    content: '-';
  }

  .faq-answer {
    padding: 1rem;
    background: var(--bg-tertiary);
    border-top: 1px solid var(--border);
  }

  .faq-answer p {
    margin: 0;
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.7;
  }


  /* CTA */
  .cta-section {
    text-align: center;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-left: 3px solid var(--green);
    padding: 3rem 2rem;
  }

  .cta-section h2 {
    border-bottom: none;
    padding-bottom: 0;
  }

  .cta-section p {
    max-width: 500px;
    margin: 0 auto 1.5rem;
  }

  .cta-button {
    display: inline-block;
    background: var(--green);
    color: var(--bg-primary);
    padding: 0.875rem 2rem;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.2s;
  }

  .cta-button:hover {
    background: var(--green-dim);
    text-decoration: none;
    color: var(--bg-primary);
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.75rem;
    }

    .stats-box {
      grid-template-columns: repeat(2, 1fr);
    }

    .tool-cards {
      grid-template-columns: 1fr;
    }

    .cve-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .cve-count {
      font-size: 1.5rem;
    }

    .comparison-table {
      font-size: 0.75rem;
    }

    .comparison-table th,
    .comparison-table td {
      padding: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    .cve-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
