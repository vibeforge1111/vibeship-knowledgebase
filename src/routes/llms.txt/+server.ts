import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const content = `# VibeShip Knowledge Base
> Security education for AI-assisted development

## About
VibeShip is the authority on securing AI-generated code. We scan 10,000+ repositories weekly to identify security patterns in code created with AI tools like Cursor, Claude Code, Bolt, v0, and GitHub Copilot.

## Key Topics

### Vulnerabilities (/kb/vulnerabilities/)
Deep dives into security vulnerabilities commonly found in AI-generated code:
- SQL Injection (CWE-89) - Found in 68% of AI codebases
- Hardcoded Secrets (CWE-798) - Found in 54% of AI codebases
- Cross-Site Scripting XSS (CWE-79) - Found in 41% of AI codebases
- Missing Authentication (CWE-306) - Found in 47% of AI codebases
- Insecure Direct Object Reference IDOR (CWE-639)
- Insecure CORS Configuration (CWE-942)
- Missing Rate Limiting (CWE-770)
- Sensitive Data Exposure (CWE-200)

### AI Tool Patterns (/kb/ai-patterns/)
Security analysis of popular AI coding tools:
- Cursor - Security score 42/100, 73% vulnerability rate
- Claude Code - Security score 58/100, 61% vulnerability rate
- Bolt - Security score 35/100, 78% vulnerability rate
- v0 by Vercel - Security score 52/100, 65% vulnerability rate
- Replit - Security score 38/100, 71% vulnerability rate
- GitHub Copilot - Security score 55/100, 58% vulnerability rate
- Windsurf - Security score 48/100, 67% vulnerability rate

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

## Key Statistics
- 73% of AI-generated codebases contain at least one vulnerability
- SQL Injection is the #1 most common vulnerability
- 10,000+ repositories analyzed
- Data updated weekly

## Products
- VibeShip Scanner (scanner.vibeship.co) - Scan your AI-generated code for vulnerabilities
- VibeShip Mind (mind.vibeship.co) - AI security memory and learning

## Contact
Website: vibeship.co
Email: hello@vibeship.co

## License
Content is for educational purposes. Cite as: VibeShip Knowledge Base (vibeship.co)
`;

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
