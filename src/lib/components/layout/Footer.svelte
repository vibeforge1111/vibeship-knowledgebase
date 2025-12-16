<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="footer-content">
		<div class="footer-brand">
			<div class="footer-brand-logo">
				<span class="font-serif" style="font-size: 1.25rem;">VibeShip</span>
			</div>
			<p class="footer-brand-description">
				Security for AI-generated code. Scan, understand, and fix vulnerabilities in code written by Cursor, Claude Code, Bolt, and other AI tools.
			</p>
		</div>

		<div>
			<h4 class="footer-column-title">Knowledge Base</h4>
			<ul class="footer-links">
				<li><a href="/kb/vulnerabilities">Vulnerabilities</a></li>
				<li><a href="/kb/ai-patterns">AI Patterns</a></li>
				<li><a href="/kb/stacks">Stacks</a></li>
				<li><a href="/kb/fixes">Fix Prompts</a></li>
				<li><a href="/kb/glossary">Glossary</a></li>
			</ul>
		</div>

		<div>
			<h4 class="footer-column-title">Research</h4>
			<ul class="footer-links">
				<li><a href="/research/vulnerability-index">Vulnerability Index</a></li>
				<li><a href="/research/ai-tool-comparison">AI Tool Comparison</a></li>
				<li><a href="/research/methodology">Methodology</a></li>
				<li><a href="/blog">Blog</a></li>
			</ul>
		</div>

		<div>
			<h4 class="footer-column-title">Products</h4>
			<ul class="footer-links">
				<li><a href="https://scanner.vibeship.co" target="_blank" rel="noopener">Scanner</a></li>
				<li><a href="https://mind.vibeship.co" target="_blank" rel="noopener">Mind</a></li>
				<li><a href="/tools">All Tools</a></li>
			</ul>
		</div>
	</div>

	<div class="footer-bottom">
		<p>&copy; {currentYear} VibeShip. All rights reserved.</p>
		<div class="flex gap-4">
			<a href="/privacy">Privacy</a>
			<a href="/terms">Terms</a>
			<a href="https://github.com/vibeforge1111" target="_blank" rel="noopener">GitHub</a>
		</div>
	</div>
</footer>
