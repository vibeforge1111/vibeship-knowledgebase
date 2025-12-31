# Content Brief: GraphQL Security

**Generated:** 2025-12-17
**Target Publish:** 2025-12-20
**Priority:** P0
**Status:** Ready for Writer

---

## 1. Core Data

### Scanner Statistics
| Metric | Value | Source |
|--------|-------|--------|
| Prevalence | Data coming soon | Scanner DB (pending collection) |
| Repos Scanned | Data coming soon | Scanner DB (pending collection) |
| Week-over-Week | Data coming soon | Scanner DB (pending collection) |
| Most Affected Tool | Data coming soon | Scanner DB (pending collection) |

**Note:** VibeShip Scanner is actively collecting data on GraphQL security issues in AI-generated code. This brief uses external authoritative sources until Scanner data is available.

### Tool Breakdown
| Tool | Vulnerability Rate | Sample Size |
|------|-------------------|-------------|
| Cursor | Data pending | Scanner DB |
| Bolt | Data pending | Scanner DB |
| Claude Code | Data pending | Scanner DB |
| v0 | Data pending | Scanner DB |
| Replit | Data pending | Scanner DB |
| Copilot | Data pending | Scanner DB |

### Security References
- **CWE ID:** CWE-89 (SQL Injection), CWE-20 (Improper Input Validation), CWE-116 (Improper Encoding), CWE-200 (Information Disclosure), CWE-799 (Improper Control of Interaction Frequency)
- **CWE URLs:**
  - [CWE-89: SQL Injection](https://cwe.mitre.org/data/definitions/89.html)
  - [CWE-20: Improper Input Validation](https://cwe.mitre.org/data/definitions/20.html)
  - [CWE-200: Information Disclosure](https://cwe.mitre.org/data/definitions/200.html)
  - [CWE-799: Improper Control of Interaction Frequency](https://cwe.mitre.org/data/definitions/799.html)
- **OWASP Category:**
  - A03:2021 - Injection
  - API4:2023 - Unrestricted Resource Consumption
  - API2:2023 - Broken Authentication
  - API1:2023 - Broken Object Level Authorization
- **OWASP URLs:**
  - [OWASP Top 10 2021: A03 Injection](https://owasp.org/Top10/A03_2021-Injection/)
  - [OWASP API Security Top 10 2023](https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/)
  - [OWASP GraphQL Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html)
- **Severity:** High to Critical (varies by attack type)

### External Research Data
- **Escape Tech (2024):** Research involving a scan of over 1,500 GraphQL endpoints revealed 46,000+ security issues and sensitive data leaks, all accessible without authentication, with 10% classified as critical
- **Escape Tech (July 2024):** Analysis of 13,000 GraphQL API issues from 160 public GraphQL services (3,835 operations total)
- **Common Issues:**
  - Introspection enabled in production (most common misconfiguration)
  - Missing query depth/complexity limits
  - Lack of rate limiting on mutations
  - Authorization bypass via batching attacks
  - Debug mode enabled in production

---

## 2. SEO Strategy

### Target Keywords
| Keyword | Est. Volume | Difficulty | Intent |
|---------|-------------|------------|--------|
| graphql security | 1,200 | 45 | Informational |
| graphql vulnerabilities | 450 | 38 | Informational |
| graphql injection | 250 | 42 | Informational |
| graphql introspection | 300 | 35 | Informational |
| graphql dos attack | 100 | 32 | Informational |
| secure graphql api | 150 | 40 | Transactional |

### People Also Ask
1. "What are the main security risks with GraphQL?"
2. "Should I disable GraphQL introspection in production?"
3. "How do I prevent GraphQL DoS attacks?"
4. "What is a GraphQL batching attack?"
5. "How do I secure a GraphQL API?"
6. "Is GraphQL more secure than REST?"
7. "What is GraphQL introspection and why is it dangerous?"
8. "How do I implement rate limiting in GraphQL?"

### Search Intent Analysis
- **Primary intent:** Informational (understanding GraphQL security risks)
- **User goal:** Learn about GraphQL vulnerabilities and how to secure their APIs
- **Content need:** Comprehensive overview of attack vectors, real-world examples, and practical fixes

---

## 3. Competitive Analysis

### Current Top 3 Results for "graphql security"

**1. [PortSwigger Web Security Academy: GraphQL API vulnerabilities](https://portswigger.net/web-security/graphql)**
- Title: "GraphQL API vulnerabilities | Web Security Academy"
- Word count: ~2,500
- Strengths: Excellent technical depth, real attack examples, hands-on labs
- Weaknesses: No AI tool context, no code fix examples for modern frameworks
- Our advantage: AI tool patterns showing WHY these vulnerabilities are generated, copy-paste fix prompts

**2. [OWASP GraphQL Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html)**
- Title: "GraphQL - OWASP Cheat Sheet Series"
- Word count: ~3,000
- Strengths: Comprehensive coverage, authoritative source, detailed mitigation strategies
- Weaknesses: Technical reference format (not beginner-friendly), no AI-specific angle
- Our advantage: Plain English for vibe coders, AI tool comparison showing which tools generate which vulnerabilities

**3. [Apollo GraphQL: 9 Ways To Secure your GraphQL API](https://www.apollographql.com/blog/9-ways-to-secure-your-graphql-api-security-checklist)**
- Title: "9 Ways To Secure your GraphQL API — GraphQL Security Checklist"
- Word count: ~1,800
- Strengths: Practical checklist format, Apollo-specific guidance, production-ready
- Weaknesses: Apollo-centric (not framework-agnostic), no vulnerability examples, no AI tool context
- Our advantage: Multi-framework approach (Apollo, Hasura, custom), vibe coding angle showing common AI generation patterns

### Content Gaps (Our Opportunities)
1. **AI Tool Patterns:** No competitor addresses WHY AI tools generate these vulnerabilities (introspection enabled by default, no depth limits, missing rate limiting)
2. **Vibe Coder Audience:** All content assumes experienced developers - we target non-technical founders
3. **Real-World Impact:** Missing concrete examples of what attackers can do (steal entire database, DoS with single query)
4. **Copy-Paste Fixes:** No AI fix prompts or ready-to-use code for common stacks
5. **Tool Comparison:** No data on which AI tools (Cursor, Bolt, etc.) generate which GraphQL vulnerabilities

---

## 4. Content Structure

### Recommended Sections

```
H1: GraphQL Security: Introspection, DoS, and Query Attacks

Quick Answer Box (Under 50 words):
GraphQL APIs have unique attack vectors: introspection exposes your entire schema,
nested queries cause DoS, and batching bypasses rate limits. These vulnerabilities
are ranked under [OWASP API Security Top 10 2023](https://owasp.org/API-Security/editions/2023/).
Research shows 46,000+ security issues in 1,500 GraphQL endpoints.

H2: What is GraphQL Security?
    - GraphQL vs REST security paradigm
    - Flexibility = larger attack surface
    - Why GraphQL requires different security thinking
    Target: 100-150 words

H2: 5 Critical GraphQL Attack Vectors
    H3: 1. Introspection Attacks (CWE-200)
        - Schema exposure via __schema query
        - What attackers learn from your schema
        - Field suggestion attacks (alternative to introspection)
    H3: 2. Deep/Nested Query DoS (CWE-799)
        - Circular query attacks
        - Resource exhaustion
        - Examples: 100-level deep friend-of-friend queries
    H3: 3. Batching Attacks
        - Rate limit bypass
        - Password/OTP brute force
        - Credential stuffing
    H3: 4. Injection Attacks (CWE-89, CWE-116)
        - SQL injection via resolvers
        - NoSQL injection
        - Command injection
    H3: 5. Authorization Bypass (API1:2023)
        - BOLA/IDOR in GraphQL context
        - Missing field-level authorization
    Target: 600-800 words total

H2: Why AI Tools Generate GraphQL Vulnerabilities
    - AI enables introspection by default (developer experience)
    - No depth limits in generated schemas
    - Missing rate limiting on mutations
    - Resolver functions skip input validation
    - Tool comparison: Cursor vs Bolt vs Claude Code patterns
    Target: 200-250 words

H2: What Attackers Can Do
    - Steal entire database schema (introspection)
    - Crash your API with single query (DoS)
    - Brute force passwords via batching
    - Bypass authentication/authorization
    - Enumerate users and resources
    Target: 100-150 words

H2: How to Detect GraphQL Vulnerabilities
    - Test introspection with __schema query
    - Check for depth/complexity limits
    - Test batching support
    - Scan for missing rate limiting
    - Scanner CTA: "Scan your GraphQL API →"
    Target: 150-200 words

H2: How to Secure Your GraphQL API
    H3: AI Fix Prompt
        - Complete prompt (300-400 words)
        - Covers all 5 attack vectors
        - Framework-agnostic
    H3: Manual Fixes
        H4: Disable Introspection (Production)
            - Apollo Server example
            - Hasura example
            - GraphQL Yoga example
        H4: Add Depth & Complexity Limits
            - graphql-depth-limit
            - graphql-query-complexity
            - graphql-armor
        H4: Implement Rate Limiting
            - Per-operation rate limits
            - Batching restrictions
            - Apollo example
        H4: Validate Inputs
            - Resolver-level validation
            - Scalar validation
            - Allowlisting
        H4: Field-Level Authorization
            - @requiresScopes directive (Apollo)
            - Custom directives
            - Resolver checks
    Target: 600-800 words total

H2: Framework-Specific Security
    H3: Apollo Server
        - Built-in security features
        - graphql-shield integration
    H3: Hasura
        - Role-based access control
        - Allowed operations lists
    H3: GraphQL Yoga
        - Security plugins
    Target: 200-250 words

H2: FAQ
    - 8 questions from PAA
    - 50-100 words each
    Target: 400-800 words

H2: Related Vulnerabilities & Tools
    - Link to related articles
    Target: 50-75 words
```

### Required Elements Checklist
- [ ] Quick answer in first 50 words
- [ ] External research stats (Escape Tech data)
- [ ] 5 attack vectors with examples
- [ ] Complete AI fix prompt (300-400 words)
- [ ] Before/after code examples (introspection, depth limits, rate limiting)
- [ ] 8 FAQ entries matching PAA
- [ ] Scanner CTA
- [ ] 8-12 internal links
- [ ] CWE/OWASP references with links

---

## 5. Internal Linking

### Must Link TO (Parent/Authority Pages)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/ | "API security vulnerabilities" |
| /kb/security/vulnerabilities/missing-rate-limiting/ | "rate limiting" |
| /kb/security/vulnerabilities/sql-injection/ | "SQL injection in resolvers" |
| /kb/security/vulnerabilities/broken-access-control/ | "authorization bypass" |

### Should Link TO (Related Content)
| Page | Suggested Anchor Text |
|------|----------------------|
| /kb/security/vulnerabilities/nosql-injection/ | "NoSQL injection" |
| /kb/security/vulnerabilities/sensitive-data-exposure/ | "schema exposure" |
| /kb/security/vulnerabilities/missing-auth/ | "missing authentication" |
| /kb/vibe-coding-tools/cursor/ | "Cursor security patterns" |
| /kb/vibe-coding-tools/bolt/ | "Bolt GraphQL vulnerabilities" |
| /kb/security/stacks/nextjs-supabase/ | "Next.js + Supabase GraphQL" |

### External Authority Links
| Source | Purpose | URL |
|--------|---------|-----|
| OWASP GraphQL Cheat Sheet | Official GraphQL security guidance | https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html |
| OWASP API Security Top 10 2023 | API security rankings | https://owasp.org/API-Security/editions/2023/ |
| CWE-89 | SQL Injection definition | https://cwe.mitre.org/data/definitions/89.html |
| CWE-200 | Information Disclosure definition | https://cwe.mitre.org/data/definitions/200.html |
| CWE-799 | Improper Control of Interaction Frequency | https://cwe.mitre.org/data/definitions/799.html |
| PortSwigger GraphQL Vulnerabilities | Attack examples and labs | https://portswigger.net/web-security/graphql |
| Apollo GraphQL Security | Framework-specific best practices | https://www.apollographql.com/blog/9-ways-to-secure-your-graphql-api-security-checklist |
| GraphQL.org Security | Official GraphQL security guidance | https://graphql.org/learn/security/ |
| Escape Tech State of GraphQL Security 2024 | Research statistics | https://escape.tech/blog/the-state-of-graphql-security-2024/ |
| How to GraphQL Security Tutorial | Depth/complexity analysis tutorial | https://www.howtographql.com/advanced/4-security/ |

---

## 6. Unique Angle

### Our Differentiator
**Only GraphQL security guide written specifically for vibe coders using AI tools.** Explains WHY AI tools generate these vulnerabilities (prioritize working code over secure code) and provides copy-paste AI fix prompts.

### Key Message
GraphQL's flexibility makes it powerful but also creates unique security risks. AI tools generate vulnerable GraphQL APIs by default because they prioritize "it works" over "it's secure." Introspection, missing depth limits, and no rate limiting are the top three issues.

### Data-Driven Claims to Highlight
1. "Research of 1,500 GraphQL endpoints found 46,000+ security issues, with 10% classified as critical" (Escape Tech)
2. "GraphQL APIs have 5 unique attack vectors not found in REST APIs: introspection, nested query DoS, batching attacks, field suggestion, and resolver injection"
3. "Introspection is enabled by default in most GraphQL implementations for developer experience, but should be disabled in production" (OWASP)
4. "Batching attacks can bypass rate limiting by sending 10,000 login attempts in a single HTTP request"
5. "Without depth limits, a single 100-level nested query can crash your entire API"

---

## 7. Meta Information

### Suggested Title Tag (under 60 chars)
```
GraphQL Security: DoS, Introspection & Fixes | VibeShip
```

### Suggested Meta Description (150-160 chars)
```
GraphQL has 5 unique attack vectors: introspection, DoS, batching, injection, and authorization bypass. Secure your AI-generated GraphQL API today.
```

### Target URL
```
/kb/security/vulnerabilities/graphql-injection/
```

### Related URLs to Create (Future)
- /kb/security/fixes/graphql/apollo/
- /kb/security/fixes/graphql/hasura/
- /kb/vibe-coding-tools/cursor/graphql/

---

## 8. Writer Notes

### Tone Guidance
- **Challenge:** GraphQL security is complex with multiple attack vectors - don't overwhelm
- **Approach:** Break into 5 clear categories, use hotel room analogy for introspection
- **Balance:** Technical enough to be credible, simple enough for non-technical founders

### Technical Accuracy Notes
- **Introspection:** Clarify that it's a feature, not a bug - it's about misconfiguration
- **Field Suggestion:** Explain this as "introspection without introspection" - lesser-known but equally dangerous
- **Batching:** Distinguish between JSON list batching and query aliasing (both are batching)
- **Rate Limiting:** GraphQL requires operation-level rate limiting, not just HTTP-level
- **Apollo vs Hasura:** Different security models - Apollo is DIY, Hasura has RBAC built-in

### Things to Avoid
- Don't claim "GraphQL is less secure than REST" - it's different, not worse
- Don't recommend blacklisting for depth limits - use allowlisting (positive security model)
- Don't suggest disabling batching entirely - just limit the number of operations
- Don't conflate introspection with field suggestion - explain both

### Real-World Attack Examples to Include
```graphql
# 1. Introspection query (schema exposure)
{
  __schema {
    types {
      name
      fields {
        name
        type {
          name
        }
      }
    }
  }
}

# 2. Deep nested query (DoS)
query {
  user(id: "1") {
    friends {
      friends {
        friends {
          friends {
            # ... 100 levels deep
          }
        }
      }
    }
  }
}

# 3. Batching attack (rate limit bypass)
[
  {"query": "mutation { login(email:\"user@example.com\", password:\"pass1\") { token } }"},
  {"query": "mutation { login(email:\"user@example.com\", password:\"pass2\") { token } }"},
  # ... 10,000 attempts in single request
]

# 4. Circular fragment (DoS)
query {
  user(id: "1") {
    ...UserFragment
  }
}

fragment UserFragment on User {
  friends {
    ...UserFragment
  }
}

# 5. Field duplication (DoS)
query {
  user(id: "1") {
    name
    name
    name
    # ... repeated 10,000 times
  }
}
```

### Secure Implementation Examples

**Disable Introspection (Apollo Server):**
```typescript
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageLocalDefault(),
  ],
});
```

**Add Depth Limit:**
```typescript
import depthLimit from 'graphql-depth-limit';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(10)],
});
```

**Add Complexity Limit:**
```typescript
import { createComplexityLimitRule } from 'graphql-validation-complexity';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [
    createComplexityLimitRule(1000, {
      scalarCost: 1,
      objectCost: 5,
      listFactor: 10,
    }),
  ],
});
```

**Limit Batching:**
```typescript
import { ApolloServer } from '@apollo/server';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  allowBatchedHttpRequests: true, // Enable batching
  plugins: [{
    async requestDidStart() {
      return {
        async didResolveOperation(requestContext) {
          // Limit to 5 operations per batch
          if (Array.isArray(requestContext.request.query) &&
              requestContext.request.query.length > 5) {
            throw new Error('Batch size limit exceeded');
          }
        },
      };
    },
  }],
});
```

**Field-Level Authorization (Apollo):**
```typescript
import { GraphQLError } from 'graphql';

const resolvers = {
  Query: {
    user: async (parent, { id }, context) => {
      // Check authentication
      if (!context.user) {
        throw new GraphQLError('Unauthenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      // Check authorization (prevent IDOR)
      if (context.user.id !== id && !context.user.isAdmin) {
        throw new GraphQLError('Forbidden', {
          extensions: { code: 'FORBIDDEN' },
        });
      }

      return getUserById(id);
    },
  },
};
```

### Reference Materials
- [OWASP GraphQL Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html)
- [OWASP API Security Top 10 2023](https://owasp.org/API-Security/editions/2023/)
- [PortSwigger GraphQL Vulnerabilities](https://portswigger.net/web-security/graphql)
- [Apollo GraphQL Security Best Practices](https://www.apollographql.com/blog/9-ways-to-secure-your-graphql-api-security-checklist)
- [Hasura Security Best Practices](https://hasura.io/docs/latest/deployment/best-practices/security/)
- [GraphQL.org Security Guide](https://graphql.org/learn/security/)
- [Escape Tech: State of GraphQL Security 2024](https://escape.tech/blog/the-state-of-graphql-security-2024/)
- [How to GraphQL: Security Tutorial](https://www.howtographql.com/advanced/4-security/)
- [PortSwigger: Protecting against deeply-nested GraphQL queries](https://jauntyjake.medium.com/protecting-against-deeply-nested-graphql-queries-9f6db003002e)
- [Checkmarx: GraphQL Batching Attack](https://checkmarx.com/blog/didnt-notice-your-rate-limiting-graphql-batching-attack/)

### AI Tool Patterns Research
Based on search results, AI tools commonly generate:
1. **Introspection enabled by default** - All tools generate working GraphQL servers with introspection for developer experience
2. **No depth limits** - Cursor, Bolt, v0 generate schemas without depth validation
3. **Missing rate limiting** - AI focuses on functional mutations, skips rate limiting implementation
4. **Resolver injection** - Template literals used in resolvers (SQL/NoSQL injection risk)
5. **Missing field-level authorization** - Authentication checks present, but not authorization at field level

No AI tool currently adds GraphQL security by default unless explicitly prompted.

---

**Brief Status:** ✅ Complete - Ready for Writer Agent

**Next Steps:**
1. Hand off to Writer Agent with VIBESHIP-SECURITY-WRITER-AGENT-PROMPT.md
2. Writer creates Svelte component following content formula
3. QA against qa-checklist.md
4. Publish to /kb/security/vulnerabilities/graphql-injection/
