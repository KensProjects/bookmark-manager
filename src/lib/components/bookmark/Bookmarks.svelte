<script lang="ts">
	export let bookmarks;
	export let count: number;
</script>

{#if bookmarks}
	<h2>Bookmark Count: {count}</h2>
	<ul
		class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center m-4 w-full h-full"
	>
		{#each bookmarks as { id, name, url } (id)}
			<li class="flex justify-center items-center w-full h-full">
				<div class="w-full h-40 flex flex-col justify-around items-center shadow-lg overflow-auto">
					<div id="info" class="flex flex-col justify-center items-center">
						<h2 class="overflow-auto">Name: {name}</h2>
						<a href={url} class="overflow-auto">{url}</a>
					</div>
					<form
						method="post"
						action="?/deleteBookmark"
						class="bg-red-500 hover:bg-red-400 w-40 rounded-xl flex justify-center items-center text-white h-10 overflow-hidden"
					>
						<input type="hidden" name="id" value={id} />
						<button type="submit" class="w-full h-full">Delete</button>
					</form>
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<p>Sorry, no bookmarks!</p>
{/if}
