<script lang="ts">
	import type { LayoutData } from './$types';
	import '../../app.css';
	export let data: LayoutData;
</script>

<header class="bg-blue-200 flex justify-between p-4 mb-4">
	<a href="/">Bookmark Manager</a>
	<nav>
		{#if data.id}
			<a target="_blank" href="/signout">Signout</a>
		{:else}
			<a target="_blank" href="/login">Login</a>
		{/if}
	</nav>
</header>
<slot />
