<script>
	import { enhance } from '$app/forms';
	import PageContainer from '$lib/components/PageContainer.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

</script>

<PageContainer>
	<Card.Root class="">
		<Card.Header class="flex justify-center items-center">
			<Card.Title>Signout</Card.Title>
			<Card.Description>Do you wish to sign out?</Card.Description>
		</Card.Header>
		<Card.CardContent>
			<form use:enhance method="post" class="flex justify-between items-center">
				<Button variant="destructive" type="submit">Yes</Button>
				<Button variant="secondary" class="p-0 flex justify-center items-center">
					<a href="/" class="p-4 py-2 flex justify-center items-center">No</a>
				</Button>
			</form>
		</Card.CardContent>
		<Card.Footer class="flex justify-center items-center w-full"></Card.Footer>
	</Card.Root>
</PageContainer>
