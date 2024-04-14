<script lang="ts">
	import getLocalDB, { type DiscodesWorkspace } from "$lib/utils/localDB/manager";
	import { browser } from "$app/environment";
	import { onMount } from "svelte";
	import openEditor from "$lib/utils/helpers/openEditor";

	let workspaceArray: DiscodesWorkspace[];
	let loaded: boolean = false;
	let workspaceName: string | undefined;
	let workspaceDescription: string | undefined;
	let localDB = getLocalDB();
	let create_workspace: HTMLDialogElement;

	onMount(() => {
		workspaceArray = localDB.workspaces;
		loaded = true;
	});

	function refreshWorksapces(): void {
		workspaceArray = localDB.workspaces;
	}

	function createWorkspace(): void {
		const workspaceID = `${localDB.workspaces.length + 1}`;

		//? create the userID if it does't exist.
		localDB.userID = localDB.userID || window.crypto.randomUUID();

		localDB.addWorkspace({
			id: workspaceID,
			files: [
				{
					name: "index",
					createdAt: new Date(),
					lastEditedAt: new Date(),
					timeWasted: 0,
					blocklyWorkspaceSave: {
						workspaceSave: {},
						blockLength: 0
					},
					thumbnail: "" //TODO Add thumbnails later on
				}
			],
			createdAt: new Date(),
			lastEditedAt: new Date(),
			owner: localDB.userID as string,
			editors: [],
			viewers: [],
			name: workspaceName || "My workspace",
			description: workspaceDescription || "Awesome Discord bot!",
			timeWasted: 0,
			token: "",
			lastOpened: "index"
		});

		workspaceName = undefined;
		workspaceDescription = undefined;

		openEditor(workspaceID);
	}

	function deleteWorkspace(id: string) {
		localDB.deleteWorkspace(id);
		refreshWorksapces();
	}
</script>

<button
	class="btn btn-accent font-bold"
	on:click={() => {
		create_workspace.showModal();
	}}>Create Workspace</button
>

{#if browser && loaded}
	{#each workspaceArray as workspace}
		<div class="card w-96 bg-neutral text-neutral-content">
			<div class="card-body items-center text-center">
				<h2 class="card-title">{workspace.name}</h2>
				<p>{workspace.description}</p>

				<div class="card-actions justify-end">
					<button
						class="btn btn-primary"
						on:click={() => {
							openEditor(workspace.id);
						}}>Open</button
					>
					<button
						class="btn btn-ghost"
						on:click={() => {
							deleteWorkspace(workspace.id);
						}}>Delete</button
					>
				</div>
			</div>
		</div>
	{/each}
{/if}

<dialog
	bind:this={create_workspace}
	id="create_workspace"
	class="modal modal-bottom sm:modal-middle sm:mx-[50%] sm:translate-x-[-50%] sm:w-[420px]"
>
	<div class="modal-box">
		<h3 class="font-bold text-lg">Create a new workspace</h3>

		<label class="form-control w-full max-w-xs">
			<span class="label-text mt-5 mb-2">Name: </span>
			<input
				bind:value={workspaceName}
				type="text"
				placeholder="My workspace"
				class="input input-bordered w-full max-w-xs mb-3"
			/>
		</label>

		<label class="form-control w-full max-w-xs">
			<span class="label-text mt-5 mb-2">Description: </span>
			<input
				bind:value={workspaceDescription}
				type="text"
				placeholder="Awesome Discord bot!"
				class="input input-bordered w-full sm:max-w-xs mb-5"
			/>
		</label>

		<form method="dialog" class="flex gap-2">
			<!-- if there is a button in form, it will close the modal -->
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
			<button class="btn btn-accent" on:click={createWorkspace}>Create</button>
		</form>
	</div>
</dialog>
