<script lang="ts">
	import AuthForm from '$lib/components/auth/AuthForm.svelte';
	import RedirectButton from '$lib/components/auth/RedirectButton.svelte';
	import PageContainer from '$lib/components/PageContainer.svelte';
</script>

<PageContainer>
	<h1>Register</h1>
	<AuthForm type={'Register'} />
	<RedirectButton href="/login" text="Login" />
</PageContainer>
