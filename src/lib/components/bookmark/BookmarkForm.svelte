<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { bookmarkSchema, type BookmarkSchema } from '$lib/schemas/bookmark-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '../ui/input';

	export let data: SuperValidated<Infer<BookmarkSchema>>;

	const form = superForm(data, {
		validators: zodClient(bookmarkSchema)
	});

	const { form: createBookmarkForm, enhance: createEnhance } = form;
	const inputClass = 'w-full';
</script>

<form
	method="POST"
	use:createEnhance
	action="?/createBookmark"
	class="hidden sm:flex justify-between items-start w-full h-fit gap-4 px-4"
>
	<Form.Field {form} name="name" class={inputClass}>
		<Form.Control let:attrs>
			<Input
				{...attrs}
				bind:value={$createBookmarkForm.name}
				placeholder="Enter bookmark name (optional)"
				required={false}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="url" class={inputClass}>
		<Form.Control let:attrs>
			<Input
				{...attrs}
				bind:value={$createBookmarkForm.url}
				placeholder="Enter bookmark url (required)"
				required
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Create</Form.Button>
</form>
