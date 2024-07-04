<script lang="ts">
	import { queryWritable } from '../../../store';
	import BookmarkFilter from '$lib/components/bookmark/BookmarkFilter.svelte';
	import BookmarkForm from '$lib/components/bookmark/BookmarkForm.svelte';
	import Bookmarks from '$lib/components/bookmark/Bookmarks.svelte';
	import type { PageData } from './$types';
	import PageContainer from '$lib/components/PageContainer.svelte';

	export let data: PageData;

	let query: string;

	queryWritable.subscribe((value) => {
		query = value;
	});

	$: bookmarks = data.profile!.bookmarks.filter((bookmark) => bookmark.name.includes(query));

	$: bookmarkCount = bookmarks.length;

	queryWritable.subscribe((value) => {
		query = value;
	});
</script>

<PageContainer>
	<BookmarkForm />
	<BookmarkFilter />
	<Bookmarks count={bookmarkCount} {bookmarks} />
</PageContainer>
