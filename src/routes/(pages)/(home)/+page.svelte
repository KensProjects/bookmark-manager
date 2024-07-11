<script lang="ts">
	import { queryWritable } from '../../../store';
	import BookmarkFilter from '$lib/components/bookmark/BookmarkFilter.svelte';
	import BookmarkForm from '$lib/components/bookmark/BookmarkForm.svelte';
	import Bookmarks from '$lib/components/bookmark/Bookmarks.svelte';
	import type { PageData } from './$types';
	import PageContainer from '$lib/components/PageContainer.svelte';
	import CreateBookmarkButton from '$lib/components/bookmark/CreateBookmarkButton.svelte';

	export let data: PageData;

	let query: string;

	queryWritable.subscribe((value) => {
		query = value;
	});

	$: bookmarks = data.profile!.bookmarks.filter((bookmark) => bookmark.name.includes(query));

	$: count = data.count;

	$: page = data.page;

	$: filteredBookmarksCount = bookmarks.length

</script>

<PageContainer>
	<CreateBookmarkButton data={data.createForm} />
	<BookmarkForm data={data.createForm} />
	<BookmarkFilter data={data.filterForm} />
	<Bookmarks {count} {bookmarks} data={data.deleteForm} pageNumber={page} {filteredBookmarksCount} />
</PageContainer>
