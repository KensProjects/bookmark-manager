<script lang="ts">
	import AuthForm from '$lib/components/auth/AuthForm.svelte';
	import RedirectButton from '$lib/components/auth/RedirectButton.svelte';
	import PageContainer from '$lib/components/PageContainer.svelte';

	export let data;
</script>

<PageContainer>
	<AuthForm type="Login" data={data.loginForm} />
	<RedirectButton href="/register" text="Register" />
</PageContainer>
