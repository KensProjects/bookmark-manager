<form
	method="post"
	action="?/createBookmark"
	class="bg-gray-200 flex flex-col sm:flex-row justify-center items-center w-full h-fit"
>
	<div id="form-fields" class="flex justify-center items-center w-full gap-1 p-4">
		<div class="form-control w-full flex justify-center items-center flex-col h-full">
			<label for="bookmark-name-form">Name</label>
			<input
				class="border-none ring-1 p-1 rounded-lg w-full"
				type="text"
				name="bookmark-name"
				id="bookmark-name-form"
				placeholder="name"
			/>
		</div>

		<div class="form-control w-full flex justify-center items-center flex-col h-full">
			<label for="bookmark-url-form">Url</label>
			<input
				class="border-none ring-1 p-1 rounded-lg w-full"
				type="url"
				name="bookmark-url"
				id="bookmark-url-form"
				required
				placeholder="url"
			/>
		</div>
	</div>

	<button type="submit" class="bg-green-400 hover:bg-green-500 h-10 w-40 rounded-xl text-white"
		>Create Bookmark</button
	>
</form>
