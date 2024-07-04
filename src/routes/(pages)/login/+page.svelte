<script lang="ts">
	import AuthForm from '$lib/components/auth/AuthForm.svelte';
	import RedirectButton from '$lib/components/auth/RedirectButton.svelte';
	import PageContainer from '$lib/components/PageContainer.svelte';
</script>

<PageContainer>
	<h1>Login</h1>
	<AuthForm type={'Login'} />
	<RedirectButton href="/register" text="Register" />
</PageContainer>
