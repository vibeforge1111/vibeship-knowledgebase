<script lang="ts">
  import { onMount } from 'svelte';

  let title = "How to Use Cursor Rules: Complete Beginner Tutorial";
  let description = "Step-by-step tutorial: Create .cursor/rules folder, add markdown rules, test in 2 minutes. Includes security templates, troubleshooting, and examples for vibe coders.";
</script>

<svelte:head>
  <title>{title} | VibeShip</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="article" />
  <link rel="canonical" href="https://vibeship.co/kb/prompts/how-to-use-cursor-rules/" />
</svelte:head>

<article class="kb-article">
  <header class="article-header">
    <div class="breadcrumb">
      <a href="/kb">Knowledge Base</a> /
      <a href="/kb/prompts">Prompts</a> /
      <span>How to Use Cursor Rules</span>
    </div>

    <h1>How to Use Cursor Rules: Complete Beginner Tutorial</h1>

    <div class="article-meta">
      <span class="reading-time">8 min read</span>
      <span class="last-updated">Updated December 2024</span>
    </div>
  </header>

  <div class="quick-answer">
    <strong>Create a <code>.cursor/rules/</code> folder in your project root, add markdown files with your rules, and Cursor will automatically apply them.</strong> Takes 2 minutes to set up. Rules guide Cursor's AI code generation to follow your security standards, coding style, and framework patterns.
  </div>

  <section>
    <h2>What Are Cursor Rules?</h2>

    <p>Cursor rules are markdown files that tell Cursor AI how to generate code for your specific project. They define your security requirements, coding standards, framework patterns, and project conventions. Think of them as instructions that Cursor reads before writing any code.</p>

    <p>For vibe coders, rules are critical because they prevent AI tools from generating insecure defaults. Without rules, Cursor might create SQL injection vulnerabilities, hardcoded secrets, or missing authentication checks. With proper rules, you can enforce <a href="/kb/security/">security best practices</a> automatically.</p>

    <p>Cursor supports two formats: the modern <code>.cursor/rules/</code> folder (recommended) and the legacy <code>.cursorrules</code> file. This tutorial covers both, with focus on the folder approach since it allows organizing rules across multiple files. Learn more about <a href="/kb/prompts/cursor-rules/">what Cursor rules are and why they matter</a>.</p>
  </section>

  <section>
    <h2>Step 1: Create Your Rules Folder</h2>

    <p>Cursor rules live in a <code>.cursor/rules/</code> folder at your project root. Create this folder in the same directory as your <code>package.json</code>, <code>README.md</code>, or other root-level files.</p>

    <div class="code-example">
      <div class="code-header">
        <span class="filename">Terminal</span>
      </div>
      <pre><code class="language-bash"># Navigate to your project root
cd /path/to/your/project

# Create the rules folder
mkdir -p .cursor/rules

# Verify it was created
ls -la .cursor/</code></pre>
    </div>

    <p>You should see output like:</p>

    <div class="code-example">
      <pre><code>drwxr-xr-x  2 user  staff   64 Dec 17 10:30 rules</code></pre>
    </div>

    <p><strong>Alternative: Legacy .cursorrules file</strong> - If you prefer a single file instead of a folder, create <code>.cursorrules</code> (no extension) at your project root. This works but doesn't support multiple organized rule files.</p>

    <div class="code-example">
      <div class="code-header">
        <span class="filename">Terminal</span>
      </div>
      <pre><code class="language-bash"># Create legacy single file
touch .cursorrules</code></pre>
    </div>
  </section>

  <section>
    <h2>Step 2: Write Your First Rule</h2>

    <p>Create your first rule file with basic frontmatter metadata and instructions. Start with a general coding standards file that applies to your entire project.</p>

    <div class="code-example">
      <div class="code-header">
        <span class="filename">.cursor/rules/coding-standards.md</span>
      </div>
      <pre><code class="language-markdown">---
description: General coding standards for this project
tags: [typescript, style]
---

# Coding Standards

## TypeScript Requirements
- Use TypeScript for all new files
- Enable strict mode in tsconfig.json
- Prefer explicit types over 'any'
- Use interfaces for object shapes

## Code Style
- Use meaningful variable names (no x, y, temp)
- Add JSDoc comments for all exported functions
- Keep functions under 50 lines
- Extract magic numbers to named constants

## Error Handling
- Always handle async errors with try/catch
- Never use empty catch blocks
- Return typed errors, not string messages
- Log errors before re-throwing</code></pre>
    </div>

    <p>The frontmatter (content between <code>---</code> markers) is optional but helpful for organization. The <code>description</code> field explains what the rule does, and <code>tags</code> help categorize rules when you have many files.</p>

    <p>Save this file, then verify Cursor loaded it by opening Cursor's chat panel (Cmd+L on Mac, Ctrl+L on Windows) and asking:</p>

    <div class="code-example">
      <pre><code>"What are my project's coding standards?"</code></pre>
    </div>

    <p>Cursor should reference your rule file in its response.</p>
  </section>

  <section>
    <h2>Step 3: Add Security Rules (Critical)</h2>

    <p>Security rules are the most important rules for vibe coders because AI tools generate <a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a>, <a href="/kb/security/vulnerabilities/hardcoded-secrets/">hardcoded secrets</a>, and <a href="/kb/security/vulnerabilities/xss/">XSS vulnerabilities</a> by default. Add a dedicated security rule file to prevent these issues.</p>

    <div class="code-example">
      <div class="code-header">
        <span class="filename">.cursor/rules/security.md</span>
      </div>
      <pre><code class="language-markdown">---
description: Security requirements - READ THIS BEFORE GENERATING CODE
tags: [security, critical]
---

# Security Rules (MANDATORY)

## Database Queries
- NEVER use string concatenation or template literals in SQL queries
- ALWAYS use parameterized queries with $1, $2 placeholders
- NEVER trust user input in database queries
- Example (PostgreSQL):
  ```typescript
  // ❌ NEVER DO THIS
  const user = await db.query(`SELECT * FROM users WHERE id = ${userId}`)

  // ✅ ALWAYS DO THIS
  const user = await db.query('SELECT * FROM users WHERE id = $1', [userId])
  ```

## Secrets Management
- NEVER hardcode API keys, passwords, or tokens
- ALWAYS use environment variables via process.env
- Store secrets in .env file (add to .gitignore)
- Use dotenv package to load environment variables
- Example:
  ```typescript
  // ❌ NEVER DO THIS
  const apiKey = "sk_live_abcd1234"

  // ✅ ALWAYS DO THIS
  const apiKey = process.env.STRIPE_API_KEY
  ```

## Authentication
- NEVER skip authentication checks
- ALWAYS verify user session/token before data access
- Use middleware for route protection
- Check user permissions, not just authentication

## Input Validation
- NEVER trust user input
- ALWAYS validate and sanitize input on the server
- Use validation libraries (zod, joi, yup)
- Reject invalid input with clear error messages

## XSS Prevention
- NEVER use dangerouslySetInnerHTML without sanitization
- ALWAYS escape user content in HTML
- Use framework defaults (React escapes by default)
- Sanitize with DOMPurify if HTML is required

## Error Messages
- NEVER expose stack traces to users
- NEVER include sensitive data in error messages
- Log detailed errors server-side only
- Return generic messages to clients</code></pre>
    </div>

    <p>This security template covers the most common vulnerabilities found in AI-generated code. According to research on <a href="/kb/vibe-coding-tools/cursor/">Cursor security patterns</a>, these rules reduce security issues by preventing the exact patterns Cursor generates by default.</p>

    <p>After adding this file, test it by asking Cursor to generate a database query. It should automatically use parameterized queries instead of string concatenation.</p>
  </section>

  <section>
    <h2>Step 4: Test Your Rules</h2>

    <p>Test that Cursor is reading and applying your rules by generating code that should follow them. Open Cursor's chat (Cmd+L / Ctrl+L) and request code that involves your rules.</p>

    <p><strong>Test 1: Database Query</strong></p>
    <div class="code-example">
      <pre><code>Prompt: "Write a function to fetch a user by ID from PostgreSQL"</code></pre>
    </div>

    <p>Expected result: Cursor should generate parameterized queries with <code>$1</code> placeholders, not string concatenation.</p>

    <p><strong>Test 2: API Key Usage</strong></p>
    <div class="code-example">
      <pre><code>Prompt: "Create a Stripe payment function"</code></pre>
    </div>

    <p>Expected result: Cursor should use <code>process.env.STRIPE_API_KEY</code>, not hardcoded keys.</p>

    <p><strong>Test 3: Verify Rules Are Loaded</strong></p>
    <div class="code-example">
      <pre><code>Prompt: "What are my project's security rules?"</code></pre>
    </div>

    <p>Cursor should list your security requirements from the rule file. If it doesn't mention your rules, check these common issues:</p>

    <ul>
      <li>File is in wrong location (must be <code>.cursor/rules/</code> at project root)</li>
      <li>File has wrong extension (must be <code>.md</code>)</li>
      <li>Restart Cursor to reload rules</li>
      <li>Check for syntax errors in frontmatter</li>
    </ul>
  </section>

  <section>
    <h2>Step 5: Iterate and Improve</h2>

    <p>Rules aren't one-and-done. Update them as you encounter issues or find patterns Cursor consistently gets wrong. Add rules iteratively based on what you actually need.</p>

    <p><strong>When to update rules:</strong></p>
    <ul>
      <li>Cursor generates the same mistake multiple times</li>
      <li>You find a security issue in generated code</li>
      <li>Your team adopts new coding standards</li>
      <li>You switch frameworks or libraries</li>
    </ul>

    <p><strong>When to split into multiple files:</strong> Split rules when a single file exceeds 500 lines or covers unrelated topics. Organization examples:</p>

    <div class="file-structure">
      <pre><code>.cursor/rules/
├── security.md          # Security requirements (keep this separate)
├── typescript.md        # TypeScript patterns and types
├── react.md            # React component patterns
├── database.md         # Database query patterns
├── api.md              # API route patterns
└── testing.md          # Test writing guidelines</code></pre>
    </div>

    <p><strong>Best practices for maintenance:</strong></p>
    <ul>
      <li>Add examples to rules (before/after code)</li>
      <li>Use "NEVER" and "ALWAYS" for critical rules</li>
      <li>Tag rules by framework/language for easy filtering</li>
      <li>Review rules quarterly and remove outdated ones</li>
      <li>Share rules file with your team via git</li>
    </ul>

    <p>Check <a href="/kb/prompts/cursor-rules-examples/">Cursor rules examples</a> for proven templates you can copy.</p>
  </section>

  <section>
    <h2>Troubleshooting Common Issues</h2>

    <h3>"My rules aren't being applied"</h3>
    <p><strong>Symptoms:</strong> Cursor generates code that violates your rules.</p>
    <p><strong>Fixes:</strong></p>
    <ul>
      <li>Verify file location: Rules must be in <code>.cursor/rules/</code> at project root (same level as package.json)</li>
      <li>Check file extension: Must be <code>.md</code> (markdown)</li>
      <li>Restart Cursor completely (Cmd+Q / Ctrl+Q, then reopen)</li>
      <li>Make rules more explicit: Use "NEVER" and "ALWAYS" with code examples</li>
      <li>Check frontmatter syntax: YAML must be valid between <code>---</code> markers</li>
    </ul>

    <h3>"Cursor ignores my security rules"</h3>
    <p><strong>Symptoms:</strong> Generated code still has SQL injection or hardcoded secrets.</p>
    <p><strong>Fixes:</strong></p>
    <ul>
      <li>Add "MANDATORY" or "CRITICAL" to security rule titles</li>
      <li>Place security rules first in file (Cursor reads top-to-bottom)</li>
      <li>Include before/after code examples in rules</li>
      <li>Use bold/caps for emphasis: <strong>NEVER concatenate SQL queries</strong></li>
      <li>Re-prompt with explicit security reminder: "Generate this using parameterized queries"</li>
    </ul>

    <h3>"Rules conflict with each other"</h3>
    <p><strong>Symptoms:</strong> Cursor follows one rule but breaks another.</p>
    <p><strong>Fixes:</strong></p>
    <ul>
      <li>Consolidate overlapping rules into one file</li>
      <li>Use hierarchy: Security rules should override style rules</li>
      <li>Add priority indicators: "Security rules take precedence"</li>
      <li>Remove contradictory rules (e.g., "use async/await" vs "use promises")</li>
    </ul>

    <h3>"Files too large / rules ignored"</h3>
    <p><strong>Symptoms:</strong> Cursor doesn't reference rules in large files.</p>
    <p><strong>Fixes:</strong></p>
    <ul>
      <li>Split into multiple files (keep each under 500 lines)</li>
      <li>Remove verbose examples (link to docs instead)</li>
      <li>Use concise language (bullet points, not paragraphs)</li>
      <li>Keep most critical rules in first 100 lines</li>
    </ul>

    <p>If issues persist, check Cursor's <a href="https://cursor.com/docs" target="_blank" rel="noopener noreferrer">official documentation</a> or the <a href="/kb/vibe-coding-tools/cursor/">Cursor security guide</a>.</p>
  </section>

  <section>
    <h2>Frequently Asked Questions</h2>

    <div class="faq-item">
      <h3>How long should rules be?</h3>
      <p><strong>Short answer: 200-500 lines per file.</strong> Cursor reads all rules but prioritizes content near the top. Keep critical security rules under 300 lines in a dedicated file. Split large rule sets across multiple files by topic (security.md, react.md, database.md). Each rule should include a brief example (10-20 lines of code max).</p>
    </div>

    <div class="faq-item">
      <h3>Can I have multiple rule files?</h3>
      <p><strong>Yes, that's recommended.</strong> Place multiple <code>.md</code> files in <code>.cursor/rules/</code> and Cursor will read all of them. Organize by concern: security, framework patterns, coding style, testing. All files are loaded automatically - no configuration needed. Name files descriptively (<code>security.md</code>, <code>nextjs-patterns.md</code>) for easy maintenance.</p>
    </div>

    <div class="faq-item">
      <h3>Do I need frontmatter?</h3>
      <p><strong>No, frontmatter is optional.</strong> Cursor reads the markdown content regardless of frontmatter. However, adding <code>description</code> and <code>tags</code> in frontmatter helps you organize rules and may help Cursor prioritize relevant rules. If you skip frontmatter, just start your file with a heading (<code># Security Rules</code>).</p>
    </div>

    <div class="faq-item">
      <h3>How do I share rules with my team?</h3>
      <p><strong>Commit <code>.cursor/</code> to git.</strong> The <code>.cursor/rules/</code> folder should be version controlled so your entire team uses the same rules. Add this to your <code>.gitignore</code> to exclude user-specific Cursor settings while keeping rules:</p>
      <div class="code-example">
        <div class="code-header">
          <span class="filename">.gitignore</span>
        </div>
        <pre><code>.cursor/*
!.cursor/rules/</code></pre>
      </div>
      <p>This ignores everything in <code>.cursor/</code> except the <code>rules/</code> folder, ensuring rules are shared but personal settings aren't.</p>
    </div>

    <div class="faq-item">
      <h3>Where are user-level rules stored?</h3>
      <p><strong>User-level rules apply to all projects.</strong> Create global rules that apply across every project you work on:</p>
      <ul>
        <li><strong>Mac:</strong> <code>~/.cursor/rules/</code></li>
        <li><strong>Windows:</strong> <code>C:\Users\YourName\.cursor\rules\</code></li>
        <li><strong>Linux:</strong> <code>~/.cursor/rules/</code></li>
      </ul>
      <p>Use user-level rules for personal preferences (variable naming, comment style) and project-level rules for team standards. Project rules override user rules when they conflict.</p>
    </div>
  </section>

  <section>
    <h2>Next Steps</h2>

    <p>Now that you know how to set up and use Cursor rules, here are resources to improve your implementation:</p>

    <ul>
      <li><strong><a href="/kb/prompts/cursor-rules-examples/">Cursor Rules Examples</a></strong> - Copy-paste templates for Next.js, React, Node.js, security, and more</li>
      <li><strong><a href="/kb/security/">Security Guides</a></strong> - Learn which vulnerabilities to prevent with rules (<a href="/kb/security/vulnerabilities/sql-injection/">SQL injection</a>, <a href="/kb/security/vulnerabilities/xss/">XSS</a>, <a href="/kb/security/vulnerabilities/hardcoded-secrets/">secrets leakage</a>)</li>
      <li><strong><a href="/kb/security/stacks/">Stack-Specific Guides</a></strong> - Security rules for Next.js + Supabase, Express + PostgreSQL, and other common stacks</li>
      <li><strong><a href="/kb/vibe-coding-tools/cursor/">Cursor Security Patterns</a></strong> - Research on which vulnerabilities Cursor generates most frequently</li>
      <li><strong><a href="/kb/prompts/">Prompt Engineering</a></strong> - Learn how to write better prompts that work with your rules</li>
    </ul>

    <div class="cta-box">
      <h3>Automatically Scan Your AI-Generated Code</h3>
      <p>Rules help prevent vulnerabilities, but they're not foolproof. Use <a href="https://scanner.vibeship.co">VibeShip Scanner</a> to automatically detect security issues in Cursor-generated code.</p>
      <a href="https://scanner.vibeship.co" class="cta-button">Scan Your Code →</a>
    </div>
  </section>

  <footer class="article-footer">
    <div class="related-articles">
      <h3>Related Articles</h3>
      <ul>
        <li><a href="/kb/prompts/cursor-rules/">What Are Cursor Rules?</a></li>
        <li><a href="/kb/prompts/cursor-rules-examples/">Cursor Rules Examples</a></li>
        <li><a href="/kb/vibe-coding-tools/cursor/">Cursor Security Guide</a></li>
        <li><a href="/kb/security/vulnerabilities/sql-injection/">SQL Injection Prevention</a></li>
        <li><a href="/kb/security/vulnerabilities/hardcoded-secrets/">Hardcoded Secrets</a></li>
      </ul>
    </div>

    <div class="last-updated">
      Last updated: December 17, 2024
    </div>
  </footer>
</article>

<style>
  .kb-article {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: system-ui, -apple-system, sans-serif;
    line-height: 1.7;
    color: #1a1a1a;
  }

  .article-header {
    margin-bottom: 2rem;
  }

  .breadcrumb {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 1rem;
  }

  .breadcrumb a {
    color: #0066cc;
    text-decoration: none;
  }

  .breadcrumb a:hover {
    text-decoration: underline;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.2;
    margin: 0 0 1rem 0;
    color: #000;
  }

  .article-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    color: #666;
  }

  .quick-answer {
    background: #f0f9ff;
    border-left: 4px solid #0066cc;
    padding: 1.25rem;
    margin: 2rem 0;
    font-size: 1rem;
  }

  .quick-answer code {
    background: #e0f2fe;
    padding: 0.125rem 0.375rem;
    border-radius: 3px;
    font-family: 'Monaco', 'Courier New', monospace;
    font-size: 0.9em;
  }

  section {
    margin: 3rem 0;
  }

  h2 {
    font-size: 1.875rem;
    font-weight: 600;
    margin: 2.5rem 0 1rem 0;
    color: #000;
  }

  h3 {
    font-size: 1.375rem;
    font-weight: 600;
    margin: 2rem 0 1rem 0;
    color: #1a1a1a;
  }

  p {
    margin: 1rem 0;
  }

  a {
    color: #0066cc;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  code {
    background: #f5f5f5;
    padding: 0.125rem 0.375rem;
    border-radius: 3px;
    font-family: 'Monaco', 'Courier New', monospace;
    font-size: 0.9em;
  }

  .code-example {
    background: #1e1e1e;
    color: #d4d4d4;
    border-radius: 6px;
    overflow: hidden;
    margin: 1.5rem 0;
  }

  .code-header {
    background: #2d2d2d;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    color: #888;
    border-bottom: 1px solid #404040;
  }

  .code-example pre {
    margin: 0;
    padding: 1rem;
    overflow-x: auto;
  }

  .code-example code {
    background: none;
    color: inherit;
    padding: 0;
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .file-structure {
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 1rem;
    margin: 1.5rem 0;
  }

  .file-structure pre {
    margin: 0;
    font-size: 0.875rem;
  }

  ul, ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin: 0.5rem 0;
  }

  .faq-item {
    margin: 2rem 0;
  }

  .faq-item h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .cta-box {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 8px;
    margin: 2rem 0;
    text-align: center;
  }

  .cta-box h3 {
    color: white;
    margin-top: 0;
  }

  .cta-box p {
    margin: 1rem 0;
  }

  .cta-box a {
    color: white;
  }

  .cta-button {
    display: inline-block;
    background: white;
    color: #667eea;
    padding: 0.75rem 2rem;
    border-radius: 6px;
    font-weight: 600;
    text-decoration: none;
    margin-top: 1rem;
    transition: transform 0.2s;
  }

  .cta-button:hover {
    transform: translateY(-2px);
    text-decoration: none;
  }

  .article-footer {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid #e0e0e0;
  }

  .related-articles h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  .related-articles ul {
    list-style: none;
    padding: 0;
  }

  .related-articles li {
    margin: 0.75rem 0;
  }

  .last-updated {
    margin-top: 2rem;
    font-size: 0.875rem;
    color: #666;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1.25rem;
    }

    .kb-article {
      padding: 1rem 0.5rem;
    }
  }
</style>
