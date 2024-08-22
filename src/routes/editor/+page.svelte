<script lang="ts">
	import "blockly/blocks";
	import Blockly from "blockly/core";

	import { page } from "$app/stores";
	import Workspace from "$lib/components/Workspace.svelte";
	import { OPTIONS } from "$lib/constants/workspace";
	import Toolbox from "$lib/utils/ToolboxGen/Toolbox";
	import getLocalDB from "$lib/utils/localDB/manager";
	import { onMount } from "svelte";
	import EditorNavbar from "$lib/components/EditorNavbar.svelte";

	import { showNavbar } from "$lib/stores/navbarStore";

	$showNavbar = false;

	const localDB = getLocalDB();

	let workspace: Blockly.WorkspaceSvg;
	let toolboxJson: Blockly.utils.toolbox.ToolboxDefinition;
	let toolbox: Toolbox;
	let currentFile: string;
	let discodesWorkspaceID: string;

	let toolBoxWidth: number;

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
		toolbox = new Toolbox();
		toolboxJson = await toolbox.generate();

		discodesWorkspaceID = $page.url.searchParams.get("id") || "1";
		const discodesWorksapce = localDB.getWorkspaceByID(discodesWorkspaceID);

		if (!discodesWorksapce) return;

		currentFile = discodesWorksapce.lastOpened;
	});

	function updateNavbarPadding() {
		toolBoxWidth = (document.querySelector(".blocklyToolboxDiv") as HTMLDivElement)?.offsetWidth;
	}
</script>

<div class="w-screen h-screen bg-gradient-to-b from-blue-950 to-gray-900"></div>
<div
	class="bg-blend-darken bg-blue-400 w-60 h-60 rounded-full blur-[140px] opacity-75 absolute top-10 left-10"
></div>
<EditorNavbar
	{toolBoxWidth}
	{workspace}
	on:save={() => saveWorkspace(currentFile)}
	on:load={() => loadWorkspace(currentFile)}
/>
<Workspace
	bind:workspace
	options={OPTIONS}
	bind:toolboxJson={toolboxJson}
	bind:toolbox={toolbox}
	on:updateNavbarPadding={updateNavbarPadding}
/>
