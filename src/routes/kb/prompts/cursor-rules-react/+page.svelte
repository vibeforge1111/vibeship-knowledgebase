<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'Cursor Rules for React: Components, Hooks & Best Practices',
		description: 'Copy-paste cursor rules for React 18+. Component patterns, hooks rules, TypeScript integration, and security guidelines for vibe coders.',
		url: '/kb/prompts/cursor-rules-react/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'Cursor Rules React' }
	];

	let copiedId: string | null = $state(null);

	function copyCode(id: string) {
		const el = document.getElementById(id);
		if (el) {
			navigator.clipboard.writeText(el.textContent || '').then(() => {
				copiedId = id;
				setTimeout(() => { copiedId = null; }, 2000);
			});
		}
	}

	const faqs = [
		{
			question: 'What cursor rules do I need for React?',
			answer: 'At minimum: functional components only, hooks rules (dependencies, conditional usage), TypeScript with proper types, and XSS prevention. The complete template in this guide covers React 18+ patterns that AI commonly gets wrong.'
		},
		{
			question: 'Should I put React rules in .cursorrules or .cursor/rules/?',
			answer: 'For React-only projects, a single .cursorrules file works well. For projects mixing React with other frameworks (like a React frontend with Node backend), use .cursor/rules/ folder with separate files. This lets Cursor load only relevant rules per context.'
		},
		{
			question: 'How do I stop Cursor from using class components?',
			answer: 'Add an explicit rule: "Always use functional components. Never use class components or lifecycle methods." Include examples showing the correct hook equivalents for componentDidMount, componentDidUpdate, and componentWillUnmount.'
		},
		{
			question: 'What hooks rules are most important?',
			answer: 'Three critical rules: (1) Exhaustive dependency arrays in useEffect/useCallback/useMemo, (2) Never call hooks conditionally, (3) Custom hooks must start with "use". These prevent the most common bugs in AI-generated React code.'
		},
		{
			question: 'How do I prevent XSS in React cursor rules?',
			answer: 'Add rules against dangerouslySetInnerHTML and for sanitizing any user content before rendering. Specify that HTML entities should be escaped by default (which React does) and never bypass this protection. Include examples of safe and unsafe patterns.'
		}
	];

	const ruleSections = [
		{ name: 'Project Context', description: 'Stack and file structure' },
		{ name: 'Component Rules', description: 'Functional components, naming' },
		{ name: 'Hooks Patterns', description: 'useEffect, custom hooks' },
		{ name: 'TypeScript', description: 'Types, interfaces, generics' },
		{ name: 'State Management', description: 'Local state, context, reducers' },
		{ name: 'Security', description: 'XSS prevention, input handling' }
	];
</script>

<svelte:head>
	<title>{meta.title} | VibeShip</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href="https://vibeship.co{meta.url}" />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content="https://vibeship.co{meta.url}" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Header {breadcrumbs} />

<div class="content-wrapper">
	<article class="content-main content-wide">
		<div class="quick-answer">
			<p>
				<strong>Cursor rules for React</strong> should enforce functional components, proper hook dependencies, TypeScript types, and XSS prevention. Without these rules, AI generates class components, missing useEffect dependencies, and security vulnerabilities. Copy the template below for React 18+ projects.
			</p>
		</div>

		<span class="badge badge-info">React 18+</span>

		<h1>Cursor Rules for React: Component Patterns That Scale</h1>

		<p class="intro">
			React's flexibility is both a strength and a trap. AI tools can generate React code a dozen different ways - most of them outdated or subtly broken. Vibe coders who ship reliable React apps lock down the patterns with cursor rules. These rules aren't about style preferences; they're about preventing the bugs that waste hours of debugging.
		</p>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">6</div>
				<div class="stat-label">Rule Sections</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">React 18+</div>
				<div class="stat-label">Version</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Copy</div>
				<div class="stat-label">Paste Ready</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">TS</div>
				<div class="stat-label">TypeScript</div>
			</div>
		</div>

		<div class="sections-grid">
			{#each ruleSections as section}
				<div class="card section-card">
					<div class="section-name">{section.name}</div>
					<div class="section-desc">{section.description}</div>
				</div>
			{/each}
		</div>

		<!-- Complete Template Section -->
		<section class="article-section">
			<h2>Complete .cursorrules Template</h2>

			<p>Copy this into your project root as <code>.cursorrules</code> or save as <code>.cursor/rules/react.md</code>. Customize the project context section to match your stack.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">.cursorrules</span>
					<button class="copy-btn" class:copied={copiedId === 'complete-template'} onclick={() => copyCode('complete-template')}>
						{copiedId === 'complete-template' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="complete-template">{`# React Cursor Rules

## Project Context

This is a React 18+ project with TypeScript.

### Tech Stack
- React 18.x
- TypeScript (strict mode)
- Vite or Create React App
- [Your styling solution: Tailwind/CSS Modules/etc.]
- [Your state management: Context/Zustand/Redux/etc.]

### Directory Structure
\`\`\`
src/
├── components/        # Reusable UI components
│   ├── ui/           # Base UI components (Button, Input)
│   └── features/     # Feature-specific components
├── hooks/            # Custom hooks
├── contexts/         # React context providers
├── utils/            # Helper functions
├── types/            # TypeScript types
└── App.tsx           # Root component
\`\`\`

## Component Rules

### Always
- Use functional components exclusively
- Use named exports (no default exports)
- One component per file
- Name files same as component: Button.tsx contains Button
- Use TypeScript interfaces for props

### Never
- Class components or lifecycle methods
- Anonymous components or inline component definitions
- Prop drilling beyond 2 levels (use context instead)
- Export default

### Component Template
\`\`\`tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
    >
      {children}
    </button>
  );
}
\`\`\`

## Hooks Rules

### useEffect
- Always include exhaustive dependency arrays
- Cleanup functions for subscriptions and timers
- Split effects by concern (don't combine unrelated logic)
- Comment explaining what the effect does

\`\`\`tsx
// ✅ Correct
useEffect(() => {
  // Sync scroll position with URL hash
  const handleHashChange = () => {
    const element = document.getElementById(window.location.hash.slice(1));
    element?.scrollIntoView();
  };

  window.addEventListener('hashchange', handleHashChange);
  return () => window.removeEventListener('hashchange', handleHashChange);
}, []); // Empty array = run once on mount

// ❌ Wrong - missing cleanup
useEffect(() => {
  window.addEventListener('hashchange', handler);
}, []);
\`\`\`

### Custom Hooks
- Name must start with "use"
- Return objects for 3+ values, tuples for 2
- Handle loading, error, and data states
- Extract repeated logic into custom hooks

\`\`\`tsx
// ✅ Custom hook pattern
export function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      try {
        setLoading(true);
        const data = await getUser(userId);
        if (!cancelled) setUser(data);
      } catch (err) {
        if (!cancelled) setError(err as Error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchUser();
    return () => { cancelled = true; };
  }, [userId]);

  return { user, loading, error };
}
\`\`\`

### Hooks Order
1. useState
2. useRef
3. useContext
4. useEffect
5. Custom hooks
6. Event handlers
7. Render helpers

## TypeScript Rules

### Types
- Interface for object shapes, type for unions/primitives
- Explicit return types on all functions
- No 'any' - use 'unknown' and narrow
- Generic components for reusable patterns

\`\`\`tsx
// ✅ Correct typing
interface User {
  id: string;
  name: string;
  email: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

function formatUser(user: User): string {
  return \`\${user.name} <\${user.email}>\`;
}

// Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
\`\`\`

### Event Handlers
- Type event handlers explicitly
- Use React event types, not native DOM types

\`\`\`tsx
// ✅ Correct
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // ...
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

// ❌ Wrong - using native Event type
const handleClick = (e: Event) => { ... };
\`\`\`

## State Management Rules

### Local State
- useState for simple values
- useReducer for complex state logic
- Derived state via useMemo, not useState + useEffect

\`\`\`tsx
// ✅ Derived state with useMemo
const filteredItems = useMemo(
  () => items.filter(item => item.name.includes(search)),
  [items, search]
);

// ❌ Wrong - derived state with useEffect
const [filteredItems, setFilteredItems] = useState([]);
useEffect(() => {
  setFilteredItems(items.filter(item => item.name.includes(search)));
}, [items, search]);
\`\`\`

### Context
- Create context with explicit type
- Provide default that throws (catch missing provider)
- Split contexts by domain (AuthContext, ThemeContext, not AppContext)

\`\`\`tsx
interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
\`\`\`

## Security Rules

### XSS Prevention
- Never use dangerouslySetInnerHTML with user content
- Sanitize before rendering if HTML is required
- URL parameters must be validated before use

\`\`\`tsx
// ✅ Safe - React escapes by default
<p>{userInput}</p>

// ⚠️ Dangerous - only use with sanitized content
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />

// ❌ Never do this
<div dangerouslySetInnerHTML={{ __html: userInput }} />
\`\`\`

### Input Validation
- Validate form inputs client-side AND server-side
- Use Zod or similar for schema validation
- Never trust client-side validation alone

### Secrets
- Environment variables with VITE_ or REACT_APP_ prefix only
- Never hardcode API keys or secrets
- Server-side env vars stay on server

## Testing Rules

- Test user behavior, not implementation
- Use data-testid for test selectors
- Mock at network boundary, not internal functions
- One assertion per test (when possible)

\`\`\`tsx
// ✅ Good test
test('submits form with user input', async () => {
  render(<LoginForm onSubmit={mockSubmit} />);

  await userEvent.type(screen.getByLabelText(/email/i), 'user@test.com');
  await userEvent.type(screen.getByLabelText(/password/i), 'password123');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(mockSubmit).toHaveBeenCalledWith({
    email: 'user@test.com',
    password: 'password123'
  });
});
\`\`\``}</code></pre>
			</div>
		</section>

		<!-- Individual Rule Sections -->
		<section class="article-section">
			<h2>Rule Section Breakdown</h2>

			<p>Understanding why each rule exists helps you customize them for your project. Here's the reasoning behind key rules.</p>

			<h3>Why Functional Components Only?</h3>
			<p>Class components are legacy React. Hooks provide all the same capabilities with less boilerplate and better composition. AI tools trained on older code often generate class components - the rule prevents this. Vibe coded projects should use modern patterns exclusively.</p>

			<h3>Why Exhaustive Dependencies?</h3>
			<p>Missing dependencies cause stale closures - one of the hardest bugs to debug in React. The AI often suggests "add the warning to eslint ignore" instead of fixing the dependency. The rule forces proper solutions.</p>

			<h3>Why Named Exports?</h3>
			<p>Named exports are easier to refactor, search, and auto-import. Default exports let you rename on import, causing inconsistency across the codebase. One pattern, everywhere.</p>
		</section>

		<!-- Customization Section -->
		<section class="article-section">
			<h2>Customizing for Your Stack</h2>

			<p>The template is a starting point. Adapt these sections for your specific tools.</p>

			<div class="customization-grid">
				<div class="card">
					<h4>Next.js Projects</h4>
					<p>Add Server Component rules, use client directive patterns, and Server Action authentication. See <a href="/kb/prompts/cursor-rules-nextjs/">Cursor Rules for Next.js</a>.</p>
				</div>
				<div class="card">
					<h4>Redux Projects</h4>
					<p>Add slice patterns, selector rules, and RTK Query conventions. Specify that createSlice is preferred over manual reducers.</p>
				</div>
				<div class="card">
					<h4>React Native</h4>
					<p>Add platform-specific rules, native module patterns, and navigation conventions. Remove web-specific DOM assumptions.</p>
				</div>
				<div class="card">
					<h4>Testing Library</h4>
					<p>Expand testing rules with specific query priorities: getByRole > getByLabelText > getByText > getByTestId.</p>
				</div>
			</div>
		</section>

		<!-- FAQ Section -->
		<section class="article-section">
			<h2>Frequently Asked Questions</h2>
			<div class="faq-list">
				{#each faqs as faq}
					<div class="faq-item">
						<h3>{faq.question}</h3>
						<p>{faq.answer}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Related Content -->
		<section class="article-section">
			<h2>Related Guides</h2>
			<div class="related-grid">
				<a href="/kb/prompts/cursor-rules/" class="card card-interactive related-card">
					<div class="related-card-category">Guide</div>
					<div class="related-card-title">Cursor Rules</div>
					<p class="related-card-description">Complete cursor rules guide</p>
				</a>
				<a href="/kb/prompts/cursor-rules-nextjs/" class="card card-interactive related-card">
					<div class="related-card-category">Framework</div>
					<div class="related-card-title">Next.js Rules</div>
					<p class="related-card-description">Server Components & App Router</p>
				</a>
				<a href="/kb/prompts/cursor-rules-typescript/" class="card card-interactive related-card">
					<div class="related-card-category">Language</div>
					<div class="related-card-title">TypeScript Rules</div>
					<p class="related-card-description">Type-safe development patterns</p>
				</a>
				<a href="/kb/security/vulnerabilities/xss/" class="card card-interactive related-card">
					<div class="related-card-category">Security</div>
					<div class="related-card-title">XSS Prevention</div>
					<p class="related-card-description">Cross-site scripting protection</p>
				</a>
			</div>
		</section>

		<div class="cta-box">
			<h3>Cursor Rules Aren't Security Scans</h3>
			<p>Rules guide AI output, but they can't catch every vulnerability in vibe coded apps. VibeShip Scanner finds security issues your rules miss.</p>
			<a href="https://vibeship.co" class="btn btn-green">Scan Your React App</a>
		</div>
	</article>
</div>

<style>
	.intro { font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.7; }
	.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1.5rem 0 2rem; }

	/* Sections Grid */
	.sections-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin: 1.5rem 0 2rem; }
	.section-card { padding: 0.75rem; }
	.section-name { font-weight: 600; color: var(--green); font-size: 0.9rem; }
	.section-desc { font-size: 0.8rem; color: var(--text-tertiary); }

	/* Customization Grid */
	.customization-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0; }
	.customization-grid h4 { margin: 0 0 0.5rem; font-size: 0.95rem; }
	.customization-grid p { margin: 0; font-size: 0.875rem; color: var(--text-secondary); }

	@media (max-width: 900px) { .sections-grid { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 768px) {
		.stats-row { grid-template-columns: repeat(2, 1fr); }
		.customization-grid { grid-template-columns: 1fr; }
	}
	@media (max-width: 480px) {
		.stats-row { grid-template-columns: 1fr; }
		.sections-grid { grid-template-columns: 1fr; }
	}
</style>
