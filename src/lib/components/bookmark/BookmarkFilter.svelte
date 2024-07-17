<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { bookmarkFilterSchema, type BookmarkFilterSchema } from '$lib/schemas/bookmark-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '../ui/input';
	import { queryWritable } from '../../../store';
	import Button from '../ui/button/button.svelte';

	export let data: SuperValidated<Infer<BookmarkFilterSchema>>;

	const form = superForm(data, {
		validators: zodClient(bookmarkFilterSchema)
	});

	const { enhance: filterEnhance } = form;

	let queryString: string;

	function setFilter() {
		if (queryString === undefined) {
			queryString = '';
		}
		$queryWritable = queryString;
	}
	function removeFilter() {
		$queryWritable = '';
		queryString = '';
	}
</script>

<form
	method="post"
	use:filterEnhance
	action="?/filterBookmarks"
	on:submit={() => setFilter()}
	class="flex flex-col justify-between items-center w-full h-fit"
>
	<Form.Field {form} name="query" class="w-full flex flex-col justify-center items-center">
		<Form.Control let:attrs>
			<Input
				{...attrs}
				bind:value={queryString}
				class="w-full"
				placeholder="Filter bookmark by name..."
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<div
		id="filter-button-group"
		class="justify-center gap-4 items-center flex w-full"
	>
		<Form.Button>Filter Bookmarks</Form.Button>
		<Button variant="destructive" on:click={() => removeFilter()}>Remove Filter</Button>
	</div>
</form>
