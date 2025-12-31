<script lang="ts">
	import { Header } from '$lib/components/layout';

	const meta = {
		title: 'AI Python Coding: Prompts, Rules & Best Practices',
		description: 'Prompts and cursor rules for Python development with AI. FastAPI, Django, type hints, pytest, and security patterns for vibe coders.',
		url: '/kb/prompts/ai-python-coding/'
	};

	const breadcrumbs = [
		{ label: 'Knowledge Base', href: '/kb' },
		{ label: 'Prompts', href: '/kb/prompts' },
		{ label: 'AI Python Coding' }
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
			question: 'Do I need type hints in Python?',
			answer: 'For vibe coded projects, yes. Type hints catch bugs before runtime, enable IDE autocomplete, and make AI-generated code easier to understand. Without hints, you\'re debugging at runtime what TypeScript projects catch at compile time. FastAPI requires them anyway.'
		},
		{
			question: 'Should I use FastAPI or Django?',
			answer: 'FastAPI for APIs and microservices. Django for full web apps with admin, auth, and ORM built in. FastAPI is newer, faster, and AI generates cleaner FastAPI code. Django has more features out of the box. For MVPs, FastAPI + Supabase is lighter than Django.'
		},
		{
			question: 'How do I prevent SQL injection in Python?',
			answer: 'Use parameterized queries or an ORM (SQLAlchemy, Django ORM). Never use string formatting or f-strings with SQL. AI often generates vulnerable code like f"SELECT * FROM users WHERE id = {user_id}". Your cursor rules should explicitly ban this pattern.'
		},
		{
			question: 'What formatter should I use?',
			answer: 'Ruff. It\'s Black-compatible but much faster and includes linting. Set it up in pyproject.toml and configure your editor to format on save. Consistent formatting means fewer merge conflicts and code reviews focused on logic, not style.'
		},
		{
			question: 'How do I structure a Python AI project?',
			answer: 'Standard layout: src/ for code, tests/ for tests, pyproject.toml for dependencies. Use virtual environments always (uv, poetry, or pip + venv). Keep configuration in environment variables, not code. AI generates this structure when you ask explicitly.'
		}
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
				<strong>AI Python coding</strong> requires type hints, proper project structure, and security-aware patterns. Without cursor rules, AI generates Python 2 patterns, vulnerable SQL queries, and untyped code. These prompts and rules get you clean, modern Python from vibe coding sessions.
			</p>
		</div>

		<span class="badge badge-info">Python</span>

		<h1>AI Python Coding: Modern Patterns That Ship</h1>

		<p class="intro">
			Python is the second language for most vibe coders - after JavaScript. It powers backends, AI/ML projects, data processing, and automation. But AI tools generate wildly inconsistent Python: sometimes elegant, sometimes outdated, often insecure. These prompts and rules standardize your Python output.
		</p>

		<div class="stats-row">
			<div class="stat-box">
				<div class="stat-value">6</div>
				<div class="stat-label">Prompts</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Type</div>
				<div class="stat-label">Hints</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">FastAPI</div>
				<div class="stat-label">Django</div>
			</div>
			<div class="stat-box">
				<div class="stat-value">Pytest</div>
				<div class="stat-label">Ready</div>
			</div>
		</div>

		<!-- Cursor Rules Section -->
		<section class="article-section">
			<h2 id="rules">Python Cursor Rules Template</h2>

			<p>Copy this into <code>.cursorrules</code> for Python projects. These rules enforce modern Python patterns and catch common AI mistakes.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">.cursorrules</span>
					<button class="copy-btn" class:copied={copiedId === 'python-rules'} onclick={() => copyCode('python-rules')}>
						{copiedId === 'python-rules' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="python-rules">{`# Python Cursor Rules

## Project Context

This is a Python 3.11+ project with type hints and modern patterns.

### Project Structure
\`\`\`
project/
├── src/
│   └── project_name/
│       ├── __init__.py
│       ├── main.py
│       └── models.py
├── tests/
│   └── test_main.py
├── pyproject.toml
└── .python-version
\`\`\`

### Dependencies
- Python 3.11+
- Ruff for linting and formatting
- pytest for testing
- pydantic for validation
- [FastAPI / Django - specify which]

## Code Style

### Always
- Type hints on all functions and class attributes
- Docstrings on public functions and classes
- f-strings for string formatting
- pathlib.Path instead of os.path
- Context managers for file operations
- async/await for I/O operations

### Never
- Python 2 patterns (print without parens, % formatting)
- Bare except clauses
- Mutable default arguments
- Global variables for state
- String concatenation in loops
- os.path - use pathlib instead

## Type Hints

### Function Signatures
\`\`\`python
# ✅ Correct
def get_user(user_id: str) -> User | None:
    """Fetch user by ID."""
    return db.query(User).filter_by(id=user_id).first()

async def create_user(data: UserCreate) -> User:
    """Create a new user."""
    user = User(**data.model_dump())
    db.add(user)
    await db.commit()
    return user

# ❌ Wrong - no type hints
def get_user(user_id):
    return db.query(User).filter_by(id=user_id).first()
\`\`\`

### Common Types
\`\`\`python
from typing import TypeVar, Generic
from collections.abc import Sequence, Mapping

# Use union with | (Python 3.10+)
def process(value: str | int) -> str: ...

# Use None union for optional
def find(id: str) -> User | None: ...

# Use Sequence for read-only lists
def process_items(items: Sequence[Item]) -> None: ...

# Use list for mutable
def collect_items() -> list[Item]: ...
\`\`\`

## Pydantic Models

\`\`\`python
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime

class UserBase(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr

class UserCreate(UserBase):
    password: str = Field(min_length=8)

class User(UserBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True  # For ORM mode
\`\`\`

## Security Rules

### SQL Injection Prevention
\`\`\`python
# ❌ NEVER - vulnerable to SQL injection
query = f"SELECT * FROM users WHERE id = {user_id}"
cursor.execute(query)

# ❌ NEVER - string formatting
query = "SELECT * FROM users WHERE id = %s" % user_id

# ✅ Always use parameterized queries
cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))

# ✅ Or use an ORM
user = db.query(User).filter_by(id=user_id).first()
\`\`\`

### Input Validation
- All external input through Pydantic models
- File paths validated with pathlib
- Environment variables with pydantic-settings
- Never trust user input

### Secrets
- Environment variables for secrets
- Never hardcode API keys or passwords
- Use python-dotenv for local development

## Error Handling

\`\`\`python
# ✅ Specific exceptions
try:
    user = get_user(user_id)
except UserNotFoundError:
    return Response(status_code=404)
except DatabaseError as e:
    logger.error(f"Database error: {e}")
    return Response(status_code=500)

# ❌ Never bare except
try:
    user = get_user(user_id)
except:  # Catches everything including KeyboardInterrupt
    pass
\`\`\`

## Testing

- pytest for all tests
- Fixtures for shared setup
- Parameterized tests for variations
- Mock external services
- Test files mirror source structure

\`\`\`python
import pytest
from project_name.main import get_user

@pytest.fixture
def sample_user():
    return User(id="123", name="Test", email="test@example.com")

def test_get_user_returns_user(sample_user, mock_db):
    mock_db.query.return_value.filter_by.return_value.first.return_value = sample_user
    result = get_user("123")
    assert result == sample_user

def test_get_user_returns_none_when_not_found(mock_db):
    mock_db.query.return_value.filter_by.return_value.first.return_value = None
    result = get_user("nonexistent")
    assert result is None
\`\`\``}</code></pre>
			</div>
		</section>

		<!-- FastAPI Section -->
		<section class="article-section">
			<h2 id="fastapi">FastAPI Prompts</h2>

			<p>FastAPI is the modern Python API framework. These prompts generate clean, typed, secure endpoints.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">FastAPI Endpoint Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'fastapi-prompt'} onclick={() => copyCode('fastapi-prompt')}>
						{copiedId === 'fastapi-prompt' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="fastapi-prompt">{`Create a FastAPI endpoint for [describe what it does].

Requirements:
- Pydantic models for request and response
- Type hints on everything
- Proper HTTP status codes
- Error handling with HTTPException
- Dependency injection for database/auth
- Async if doing I/O

Example structure:
\`\`\`python
@router.post("/items", response_model=ItemResponse, status_code=201)
async def create_item(
    item: ItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> ItemResponse:
    ...
\`\`\`

Include the Pydantic models in the response.`}</code></pre>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">FastAPI CRUD Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'fastapi-crud'} onclick={() => copyCode('fastapi-crud')}>
						{copiedId === 'fastapi-crud' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="fastapi-crud">{`Create full CRUD endpoints for [resource name].

Include:
1. POST /[resources] - Create (201)
2. GET /[resources] - List with pagination
3. GET /[resources]/{id} - Get one (404 if not found)
4. PUT /[resources]/{id} - Full update
5. PATCH /[resources]/{id} - Partial update
6. DELETE /[resources]/{id} - Delete (204)

Each endpoint needs:
- Pydantic models (Create, Update, Response)
- SQLAlchemy model
- Async database operations
- Proper error handling
- Authentication via Depends

Database: [SQLAlchemy + PostgreSQL / SQLModel / etc.]`}</code></pre>
			</div>
		</section>

		<!-- Django Section -->
		<section class="article-section">
			<h2 id="django">Django Prompts</h2>

			<p>Django for full web apps. Vibe coding with Django means knowing what to ask for.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Django Model Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'django-model'} onclick={() => copyCode('django-model')}>
						{copiedId === 'django-model' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="django-model">{`Create a Django model for [describe the data].

Include:
- Appropriate field types with validation
- Meta class with ordering and indexes
- __str__ method
- Related manager methods if needed
- Property methods for computed fields

Security:
- Validate input at model level
- No SQL in string formatting
- Use Django's ORM methods

Also generate:
- Admin configuration
- ModelForm for validation
- Basic serializer if using DRF

Example fields:
[describe the fields you need]`}</code></pre>
			</div>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Django View Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'django-view'} onclick={() => copyCode('django-view')}>
						{copiedId === 'django-view' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="django-view">{`Create a Django [class-based/function] view for [describe what it does].

Requirements:
- Use [ListView/CreateView/etc.] as base
- Proper authentication (@login_required or LoginRequiredMixin)
- Form validation
- Success/error messages
- Redirect after POST

Template context should include:
[list what the template needs]

URL pattern:
[describe the URL structure]`}</code></pre>
			</div>
		</section>

		<!-- Testing Section -->
		<section class="article-section">
			<h2 id="testing">Testing Prompts</h2>

			<p>pytest is the standard. These prompts generate tests that actually catch bugs.</p>

			<div class="code-block">
				<div class="code-block-header">
					<span class="code-block-lang">Pytest Generation Prompt</span>
					<button class="copy-btn" class:copied={copiedId === 'pytest-prompt'} onclick={() => copyCode('pytest-prompt')}>
						{copiedId === 'pytest-prompt' ? 'Copied!' : 'Copy'}
					</button>
				</div>
				<pre><code id="pytest-prompt">{`Write pytest tests for this code:

[paste your code]

Requirements:
1. Test happy path (expected inputs)
2. Test edge cases (empty, None, boundary values)
3. Test error cases (invalid input, exceptions)
4. Use fixtures for shared setup
5. Use parametrize for similar test variations
6. Mock external dependencies

Structure:
\`\`\`python
@pytest.fixture
def sample_data(): ...

def test_function_with_valid_input(sample_data): ...
def test_function_with_empty_input(): ...
def test_function_raises_on_invalid(): ...

@pytest.mark.parametrize("input,expected", [...])
def test_function_variations(input, expected): ...
\`\`\``}</code></pre>
			</div>
		</section>

		<!-- Security Section -->
		<section class="article-section">
			<h2 id="security">Security Patterns</h2>

			<p>AI-generated Python often has security holes. These patterns prevent the common ones vibe coders encounter.</p>

			<div class="security-grid">
				<div class="card security-card">
					<h4>SQL Injection</h4>
					<p>AI loves f-strings in SQL. Always use parameterized queries or ORM methods.</p>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Safe Pattern</span>
						</div>
						<pre><code>{`# Use ORM
User.objects.filter(id=user_id)

# Or parameterized
cursor.execute(
    "SELECT * FROM users WHERE id = %s",
    (user_id,)
)`}</code></pre>
					</div>
				</div>

				<div class="card security-card">
					<h4>Command Injection</h4>
					<p>Never pass user input to shell commands. Use subprocess with list arguments.</p>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Safe Pattern</span>
						</div>
						<pre><code>{`# ❌ Vulnerable
os.system(f"ls {user_path}")

# ✅ Safe
subprocess.run(
    ["ls", user_path],
    check=True
)`}</code></pre>
					</div>
				</div>

				<div class="card security-card">
					<h4>Path Traversal</h4>
					<p>Validate paths don't escape allowed directories using pathlib.</p>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Safe Pattern</span>
						</div>
						<pre><code>{`base = Path("/uploads")
user_path = base / user_input
# Resolve and check
if not user_path.resolve()
  .is_relative_to(base):
    raise ValueError("Invalid")`}</code></pre>
					</div>
				</div>

				<div class="card security-card">
					<h4>Secrets in Code</h4>
					<p>Use environment variables, not hardcoded strings.</p>
					<div class="code-block">
						<div class="code-block-header">
							<span class="code-block-lang">Safe Pattern</span>
						</div>
						<pre><code>{`from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    api_key: str

    class Config:
        env_file = ".env"`}</code></pre>
					</div>
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
				<a href="/kb/prompts/cursor-rules-typescript/" class="card card-interactive related-card">
					<div class="related-card-category">Language</div>
					<div class="related-card-title">TypeScript Rules</div>
					<p class="related-card-description">Type-safe JavaScript patterns</p>
				</a>
				<a href="/kb/security/vulnerabilities/sql-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Security</div>
					<div class="related-card-title">SQL Injection</div>
					<p class="related-card-description">Prevention in Python and JS</p>
				</a>
				<a href="/kb/security/vulnerabilities/command-injection/" class="card card-interactive related-card">
					<div class="related-card-category">Security</div>
					<div class="related-card-title">Command Injection</div>
					<p class="related-card-description">Secure subprocess usage</p>
				</a>
			</div>
		</section>

		<div class="cta-box">
			<h3>Python Security Isn't Optional</h3>
			<p>AI-generated Python code often has SQL injection and path traversal vulnerabilities. VibeShip Scanner finds security issues in your vibe coded Python projects.</p>
			<a href="https://vibeship.co" class="btn btn-green">Scan Your Python Code</a>
		</div>
	</article>
</div>

<style>
	.intro { font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.7; }
	.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1.5rem 0 2rem; }

	/* Security Grid */
	.security-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0; }
	.security-card h4 { margin: 0 0 0.5rem; font-size: 0.95rem; color: var(--green); }
	.security-card > p { margin: 0 0 0.75rem; font-size: 0.875rem; color: var(--text-secondary); }

	@media (max-width: 768px) {
		.stats-row { grid-template-columns: repeat(2, 1fr); }
		.security-grid { grid-template-columns: 1fr; }
	}
	@media (max-width: 480px) { .stats-row { grid-template-columns: 1fr; } }
</style>
