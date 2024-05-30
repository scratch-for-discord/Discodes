<script lang="ts">
	import "blockly/blocks";
	import Blockly from "blockly/core";

	import { page } from "$app/stores";
	import Warnings from "$lib/components/Warnings.svelte";
	import Workspace from "$lib/components/Workspace.svelte";
	import { OPTIONS } from "$lib/constants/workspace";
	import Toolbox from "$lib/utils/ToolboxGen/Toolbox";
	import getLocalDB from "$lib/utils/localDB/manager";
	import { onMount } from "svelte";

	const localDB = getLocalDB();

	let workspace: Blockly.WorkspaceSvg;
	let toolboxJson: Blockly.utils.toolbox.ToolboxDefinition;
	let toolbox: Toolbox;
	let currentFile: string;
	let discodesWorkspaceID: string;

	const saveWorkspace = (currentFile: string) => {
		localDB.saveBlocklyInFile(
			currentFile,
			discodesWorkspaceID,
			Blockly.serialization.workspaces.save(workspace)
		);
	};
	const loadWorkspace = (currentFile: string) => {
		localDB.loadBlocklyFromFile(currentFile, discodesWorkspaceID, workspace);
	};

	onMount(async() => {
		toolbox = await new Toolbox();
		toolboxJson = await toolbox.generate();

		discodesWorkspaceID = $page.url.searchParams.get("id") || "1";
		const discodesWorksapce = localDB.getWorkspaceByID(discodesWorkspaceID);

		if (!discodesWorksapce) return;

		currentFile = discodesWorksapce.lastOpened;
	});
</script>

<button
	class="btn"
	on:click={() => {
		saveWorkspace(currentFile);
	}}>SAVE</button
>
<button
	class="btn"
	on:click={() => {
		loadWorkspace(currentFile);
	}}>LOAD</button
>
<Warnings bind:workspace />
<Workspace bind:workspace options={OPTIONS} bind:toolbox={toolbox} bind:toolboxJson={toolboxJson} />
