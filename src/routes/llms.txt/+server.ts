import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const content = `# vibeship knowledge base
> Security education for AI-assisted development (vibe coding)

## About
vibeship is the authority on securing AI-generated code. We document security patterns in code created with AI tools like Cursor, Claude Code, Bolt, v0, and GitHub Copilot. Our content is written for vibe coders - developers using AI tools to build products.

## Key Topics

### Vulnerabilities (/kb/vulnerabilities/)
Deep dives into security vulnerabilities commonly found in vibe coded apps:
- SQL Injection (CWE-89, OWASP A03:2021) - Template literals instead of parameterized queries
- Hardcoded Secrets (CWE-798, OWASP A07:2021) - API keys embedded in code
- Cross-Site Scripting XSS (CWE-79, OWASP A03:2021) - dangerouslySetInnerHTML, v-html, @html
- Missing Authentication (CWE-306) - AI skips auth unless explicitly requested
- Insecure Direct Object Reference IDOR (CWE-639)
- Insecure CORS Configuration (CWE-942)
- Missing Rate Limiting (CWE-770)
- Sensitive Data Exposure (CWE-200)

### AI Tool Patterns (/kb/vibe-coding-tools/)
Security patterns specific to each AI coding tool:
- Cursor - Top issue: SQL Injection (template literals in queries)
- Claude Code - Top issue: Missing Auth (trusts user input)
- Bolt - Top issue: Hardcoded Secrets (inline API keys for "ready to run")
- v0 by Vercel - Top issue: XSS (client-side validation only)
- Replit - Top issue: Missing Rate Limiting (open endpoints)
- GitHub Copilot - Top issue: SQL Injection (string concatenation)
- Windsurf - Top issue: Missing Auth (skips authentication setup)

### Stack Security Guides (/kb/stacks/)
Security patterns for popular tech stacks:
- Next.js + Supabase
- SvelteKit + Supabase
- Remix + Prisma
- Express + MongoDB
- FastAPI + PostgreSQL
- Django + PostgreSQL

### Fix Prompts (/kb/fixes/)
Copy-paste prompts to help AI tools fix vulnerabilities:
- SQL Injection fixes
- XSS Prevention
- Authentication fixes
- Secrets management
- Rate limiting
- CORS configuration

### Glossary (/kb/glossary/)
Plain English definitions of security terms including SQL Injection, XSS, CSRF, JWT, OAuth, RLS, CSP, CORS, and more.

### Checklists (/kb/checklists/)
Security checklists for developers:
- Pre-Launch Security Checklist
- API Security Checklist
- Authentication Checklist
- Database Security Checklist
- Frontend Security Checklist
- AI-Generated Code Review Checklist

## Key Insights
- AI tools prioritize working code over secure code
- SQL Injection, Hardcoded Secrets, and XSS are the most common issues
- All AI tools share similar security blind spots
- Most vulnerabilities can be fixed with copy-paste prompts

## Products
- vibeship scanner (scanner.vibeship.co) - Scan your vibe coded projects for vulnerabilities
- vibeship mind (mind.vibeship.co) - AI security memory and learning

## Contact
Website: vibeship.co
Email: hello@vibeship.co

## License
Content is for educational purposes. Cite as: vibeship knowledge base (vibeship.co)
`;

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
