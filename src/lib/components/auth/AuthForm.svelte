<script lang="ts">
	import { enhance } from '$app/forms';
	export let type;

	const formClass =
		'w-1/2 h-full border-4 border-blue-600 flex flex-col justify-between items-center p-2 rounded-xl';
	const inputClass = 'w-3/4 p-1 border-none ring-1 rounded-md';
	const formControlClass = 'flex flex-col justify-center items-center w-full gap-2';
	const buttonClass = 'w-40 h-10 bg-blue-800 hover:bg-blue-700 rounded-lg text-white';
</script>

<form method="post" use:enhance class={formClass}>
	<div class={formControlClass}>
		<label for="username">Username</label>
		<input class={inputClass} name="username" id="username-input" required /><br />
	</div>

	<div class={formControlClass}>
		<label for="password">Password</label>
		<input class={inputClass} type="password" name="password" id="password-input" required /><br />
	</div>
	<button class={buttonClass}>{type}</button>
</form>
