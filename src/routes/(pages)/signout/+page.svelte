<script>
	import { enhance } from "$app/forms";
	import PageContainer from "$lib/components/PageContainer.svelte";
</script>

<PageContainer>
    <form method="post" use:enhance>
        <p>SignOut?</p>
        <div id="signout-button-group">
            <button type="submit">Yes</button>
            <a href="/">No</a>
        </div>
    </form>
</PageContainer>