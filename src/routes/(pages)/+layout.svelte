<script lang="ts">
	import type { LayoutData } from './$types';
	import '../../app.css';
	import Button from '$lib/components/ui/button/button.svelte';
	export let data: LayoutData;
	const buttonStyle = 'p-0 flex justify-center items-center';
	const anchorStyle = 'flex justify-center items-center px-4 py-2';
</script>

<header class="bg-blue-200 flex justify-between items-center p-4 mb-4">
	<a href="/" class="w-full h-full flex">Bookmark Manager</a>
	<nav>
		<Button class={buttonStyle}>
			{#if data.id}
				<a class={anchorStyle} target="_blank" href="/signout">Signout</a>
			{:else}
				<a class={anchorStyle} target="_blank" href="/login">Login</a>
			{/if}
		</Button>
	</nav>
</header>

<slot />
