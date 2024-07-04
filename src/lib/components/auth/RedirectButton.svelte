<script lang="ts">
	export let href;
	export let text;
	const redirectButtonClass = 'w-40 h-32 bg-green-500 hover:bg-green-400 text-white rounded-lg';
</script>

<a class={redirectButtonClass} {href}>{text} Instead?</a>
