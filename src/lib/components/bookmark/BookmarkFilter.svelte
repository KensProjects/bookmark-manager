<script lang="ts">
	import { queryWritable } from '../../../store';

	let queryString: string;

	function setFilter() {
		if (queryString === undefined) {
			queryString = '';
		}
		$queryWritable = queryString;
		queryString = '';
	}
	function removeFilter() {
		$queryWritable = '';
		queryString = '';
	}
</script>

<div id="filters" class="flex flex-col justify-between items-center bg-red-100 p-1 w-full">
	<h2>Filter Bookmarks by Name</h2>
	<form
		on:submit|preventDefault={() => setFilter()}
		method="get"
		class="flex justify-center items-center"
	>
		<input type="text" name="query" id="bookmark-filter-form" bind:value={queryString} />
		<button type="submit">Filter</button>
	</form>
	<form on:submit|preventDefault={() => removeFilter()} method="get">
		<button type="submit">Remove</button>
	</form>
</div>
