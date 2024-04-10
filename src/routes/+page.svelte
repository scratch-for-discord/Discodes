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
		console.log(toolboxJson);
	});
</script>

<button class="btn" on:click={saveWorkspace}>SAVE</button>
<button class="btn" on:click={loadWorkspace}>LOAD</button>
<Warnings bind:workspace />
<Workspace bind:workspace options={OPTIONS} bind:toolbox={toolboxJson} />

<!-- <script lang="ts">

</script>

<main class="flex flex-col h-screen items-center justify-center ml-52 mr-52 pb-96 mt-10">
	<h1 class="font-bold text-3xl">Generate a bot at <span class="text-yellow-400">lightning speed</span></h1>
	The comparaison is here 
	<div class="diff aspect-[1/1] ">
		<div class="diff-item-1">
			<img alt="javascript code preview" src="images/code_preview.png" />
		</div>
		<div class="diff-item-2">
			<img alt="blockly code preview" src="images/blockly_code_preview.png" />
		</div>
		<div class="diff-resizer"></div>
	</div>
</main> -->
