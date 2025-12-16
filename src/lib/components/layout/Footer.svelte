<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer>
	<p>&copy; {currentYear} <a href="https://vibeship.co" target="_blank">vibeship</a></p>
</footer>

<style>
	footer {
		padding: 2rem 1.5rem;
		border-top: 1px solid var(--border);
		text-align: center;
		max-width: 800px;
		margin: 0 auto;
	}

	footer p {
		font-size: 0.85rem;
		color: var(--text-tertiary);
		margin: 0;
	}

	footer a {
		color: var(--text-secondary);
		text-decoration: none;
		transition: color 0.15s;
	}

	footer a:hover {
		color: var(--text-primary);
	}
</style>
