<script lang="ts">
	import "blockly/blocks";
	import Blockly from "blockly/core";

	import { OPTIONS } from "$lib/constants/workspace";
	import Workspace from "$lib/components/Workspace.svelte";
	import Warnings from "$lib/components/Warnings.svelte";
	import { onMount } from "svelte";
	import Toolbox from "$lib/utils/ToolboxGen/Toolbox";

	let workspace: Blockly.WorkspaceSvg;
	let toolboxJson: Blockly.utils.toolbox.ToolboxDefinition;

	const saveWorkspace = () => {
		localStorage.setItem("w", JSON.stringify(Blockly.serialization.workspaces.save(workspace)));
	};
	const loadWorkspace = () => {
		Blockly.serialization.workspaces.load(JSON.parse(localStorage.getItem("w") || ""), workspace);
	};

	onMount(async() => {
		const toolbox = new Toolbox();
		toolboxJson = await toolbox.generate();
	});
</script>

<button class="btn" on:click={saveWorkspace}>SAVE</button>
<button class="btn" on:click={loadWorkspace}>LOAD</button>
<Warnings bind:workspace />
<Workspace bind:workspace options={OPTIONS} bind:toolbox={toolboxJson} />
