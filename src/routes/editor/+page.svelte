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

	const localDB = getLocalDB();

	let workspace: Blockly.WorkspaceSvg;
	let toolboxJson: Blockly.utils.toolbox.ToolboxDefinition;
	let toolbox: Toolbox;
	let isToolBoxHidden = false;
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

	onMount(async () => {
		toolbox = new Toolbox();
		toolboxJson = await toolbox.generate();

		discodesWorkspaceID = $page.url.searchParams.get("id") || "1";
		const discodesWorkspace = localDB.getWorkspaceByID(discodesWorkspaceID);

		if (!discodesWorkspace) return;

		currentFile = discodesWorkspace.lastOpened;
	});

	function updateNavbarPadding() {
		toolBoxWidth = (document.querySelector(".blocklyToolboxDiv") as HTMLDivElement)?.offsetWidth;
	}
</script>

<EditorNavbar
	{toolBoxWidth}
	{workspace}
	{isToolBoxHidden}
	on:save={() => saveWorkspace(currentFile)}
	on:load={() => loadWorkspace(currentFile)}
	on:toggle_toolbox={() => {
		if(workspace) {
			const toolbox = workspace.getToolbox();
			toolbox?.setVisible(isToolBoxHidden)
			isToolBoxHidden = !isToolBoxHidden
		}
	}}
/>
<Workspace
	bind:workspace
	options={OPTIONS}
	bind:toolboxJson
	on:updateNavbarPadding={updateNavbarPadding}
/>
