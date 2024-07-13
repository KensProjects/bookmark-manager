<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { bookmarkIdSchema, type BookmarkIdSchema } from '$lib/schemas/bookmark-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '../ui/input';
	import { Button } from '../ui/button/';
	import * as Pagination from '$lib/components/ui/pagination';
	import { queryWritable } from '../../../store';

	export let data: SuperValidated<Infer<BookmarkIdSchema>>;
	export let bookmarks;
	export let count: number;
	export let filteredBookmarksCount: number;
	export let pageNumber: number;
	let query: string;

	queryWritable.subscribe((value) => {
		query = value;
	});

	$: bookmarksAreFiltered = filteredBookmarksCount > 0 && query !== '';

	const form = superForm(data, {
		validators: zodClient(bookmarkIdSchema)
	});

	const { enhance: deleteEnhance } = form;
</script>

{#if bookmarks}
	<h2>Total Bookmarks: {count}</h2>
	{#if bookmarksAreFiltered}
		<h2>Bookmarks in filter: {filteredBookmarksCount}</h2>
	{/if}
	<Pagination.Root {count} perPage={10} let:pages let:currentPage>
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton asChild class="p-0">
					<a
						href={`/?page=${pageNumber - 1}`}
						class="p-0 w-full h-full flex justify-center items-center px-4 py-2">Previous</a
					>
				</Pagination.PrevButton>
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item class="p-0 w-full h-full">
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item class="p-0 ">
						<Pagination.Link
							{page}
							isActive={currentPage == page.value}
							class="p-0 flex justify-center items-center"
						>
							<a
								href={`/?page=${page.value}`}
								class=" w-full h-full flex justify-center items-center">{page.value}</a
							>
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton asChild class="p-0">
					<a
						href={`/?page=${pageNumber + 1}`}
						class="w-full h-full flex justify-center items-center px-4 py-2">Next</a
					>
				</Pagination.NextButton>
			</Pagination.Item>
		</Pagination.Content>
	</Pagination.Root>
	<ul
		class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center m-4 w-full h-full"
	>
		{#each bookmarks as { id, name, url } (id)}
			<li class="flex justify-center items-center w-full h-full">
				<Card.Root class="w-full h-full flex flex-col justify-between items-start overflow-auto">
					<Card.Header class="overflow-auto">
						<Card.Title>{name}</Card.Title>
						<Card.Description class="">{url}</Card.Description>
					</Card.Header>

					<Card.Footer class="flex justify-center items-center w-full">
						<Button variant="outline" class="p-0 flex justify-center items-center">
							<a
								href={url}
								class="w-full h-full flex justify-center items-center p-2"
								target="_blank">Open Bookmark</a
							>
						</Button>
						<form
							action="?/deleteBookmark"
							method="POST"
							use:deleteEnhance
							class="flex justify-end items-center w-full h-fit"
						>
							<Form.Field {form} name="id">
								<Form.Control let:attrs>
									<Input {...attrs} bind:value={id} type="hidden" />
								</Form.Control>

								<Form.FieldErrors />
							</Form.Field>

							<Form.Button variant="destructive">Delete</Form.Button>
						</form>
					</Card.Footer>
				</Card.Root>
			</li>
		{/each}
	</ul>
{:else}
	<p>Sorry, no bookmarks!</p>
{/if}
