<script lang="ts">
	export let href;
	export let text;
	const redirectButtonClass = 'w-40 h-10 bg-green-500 hover:bg-green-400 text-white rounded-xl flex justify-center items-center mt-4';
</script>

<a class={redirectButtonClass} {href}>{text} Instead?</a>
