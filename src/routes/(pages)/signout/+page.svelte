<script>
	import { enhance } from "$app/forms";
	import PageContainer from "$lib/components/PageContainer.svelte";
    const signoutButtonSkeletonStyle = "w-full h-fit rounded-sm border border-black flex justify-center items-center"
</script>

<PageContainer>
    <form method="post" use:enhance class="w-40 h-20 border border-purple-600 flex flex-col justify-between items-center rounded-lg">
        <p>Signout?</p>
        <div id="signout-button-group" class="w-full h-fit justify-between items-center flex p-2">
            <button type="submit" class={`${signoutButtonSkeletonStyle} bg-green-300 `}>Yes</button>
            <a href="/" class={`${signoutButtonSkeletonStyle} bg-red-300`}>No</a>
        </div>
    </form>
</PageContainer>