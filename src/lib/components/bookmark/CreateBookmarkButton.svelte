<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Form from '$lib/components/ui/form';
	import { bookmarkSchema, type BookmarkSchema } from '$lib/schemas/bookmark-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '../ui/input';
	import { Pencil } from 'lucide-svelte';

	export let data: SuperValidated<Infer<BookmarkSchema>>;

	const form = superForm(data, {
		validators: zodClient(bookmarkSchema)
	});

	const { form: createBookmarkForm, enhance: createEnhance } = form;

	const inputClass = 'w-full';
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger
		class="flex sm:hidden fixed bottom-5 right-5  rounded-full w-20 h-20 justify-center items-center z-50 bg-blue-400 text-white"
	>
		<Pencil />
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Create Bookmark</AlertDialog.Title>
			<AlertDialog.Description class="flex flex-col justify-center items-center">
				<form
					method="POST"
					use:createEnhance
					action="?/createBookmark"
					class="flex justify-between items-center w-full h-fit flex-col"
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
						<!-- <Form.Description>This is your public display name.</Form.Description> -->
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
						<!-- <Form.Description>This is your public display name.</Form.Description> -->
						<Form.FieldErrors />
					</Form.Field>

					<AlertDialog.Footer>
						<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
						<AlertDialog.Action type="submit">Create</AlertDialog.Action>
					</AlertDialog.Footer>
				</form>
			</AlertDialog.Description>
		</AlertDialog.Header>
	</AlertDialog.Content>
</AlertDialog.Root>
