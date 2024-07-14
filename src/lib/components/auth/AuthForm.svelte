<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '../ui/input';
	import { formSchema, type FormSchema } from '$lib/schemas/auth-schema';

	export let data: SuperValidated<Infer<FormSchema>>;
	export let type: 'Login' | 'Register';

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: authForm, enhance: authEnhance } = form;
	const inputClass = 'w-full';
</script>

<Card.Root class="w-full h-full flex flex-col justify-between items-center overflow-auto">
	<Card.Header class="overflow-auto flex flex-col justify-center items-center">
		<Card.Title>{type}</Card.Title>
		<Card.Description>Enter Credentials Below</Card.Description>
	</Card.Header>
	<Card.Content class="w-full h-full flex justify-center items-center">
		<form
			method="POST"
			use:authEnhance
			class="flex flex-col justify-between items-center w-full md:w-3/4 h-fit gap-4 px-4"
		>
			<Form.Field {form} name="username" class={inputClass}>
				<Form.Control let:attrs>
					<Form.Label>Username</Form.Label>
					<Input {...attrs} bind:value={$authForm.username} placeholder="Enter username" required />
				</Form.Control>
				<!-- <Form.Description>This is your public display name.</Form.Description> -->
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password" class={inputClass}>
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input
						{...attrs}
						bind:value={$authForm.password}
						placeholder="Enter password"
						required
						type="password"
					/>
				</Form.Control>
				<!-- <Form.Description>This is your public display name.</Form.Description> -->
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button>Submit</Form.Button>
		</form>
	</Card.Content>
	<Card.Footer class="flex justify-center items-center w-full"></Card.Footer>
</Card.Root>
