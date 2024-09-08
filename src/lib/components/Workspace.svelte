<script lang="ts">
	import Blockly from "blockly/core";
	import En from "blockly/msg/en";
	import "blockly/blocks";
	import { onMount } from "svelte";
	import pkg from "blockly/javascript";
	const { javascriptGenerator } = pkg;
	import type { Abstract } from "blockly/core/events/events_abstract";
	import { OPTIONS } from "$lib/constants/workspace";
	import { LOG_CODE, LOG_WARNINGS } from "$lib/constants/debug";
	import loadBlocks from "$lib/utils/helpers/loadBlocks";
	import { warnings } from "$lib/utils/BlockGen/Warnings/WarningsList";
	import { imports, wipeImports } from "$lib/utils/BlockGen/Blocks/importsList";
	import type Toolbox from "$lib/utils/ToolboxGen/Toolbox";

	export let workspace: Blockly.WorkspaceSvg;
	export let options: typeof OPTIONS;
	export let toolboxJson: Blockly.utils.toolbox.ToolboxDefinition;
	export let toolbox: Toolbox;

	Blockly.setLocale({
		...En
	});

	onMount(async() => {
        await loadBlocks();
        workspace = Blockly.inject("blocklyDiv", { ...options, toolbox: toolboxJson });
		toolbox.registerCallbacks(workspace)
        // workspace.refreshToolboxSelection();
		// Only console log the code and warnings when debug mode is enabled.
		const supportedEvents = new Set([
			Blockly.Events.BLOCK_CHANGE,
			Blockly.Events.BLOCK_CREATE,
			Blockly.Events.BLOCK_DELETE,
			Blockly.Events.BLOCK_MOVE
		]);

		function updateCode(event: Abstract) {
			if (workspace.isDragging()) return; // Don't update while changes are happening.
			if (!supportedEvents.has(event.type)) return;

			// Needed to remove the deleted block imports from the imports list.
			if (event.type === Blockly.Events.BLOCK_DELETE) wipeImports();

			if (LOG_CODE) {
				function exportToJson() {
      const json = Blockly.serialization.workspaces.save(workspace);
      const jsonString = JSON.stringify(json, null, 2); // Convert JSON to string with pretty printing
      console.log(jsonString);  // Output the JSON string to the console
    }
				const code = javascriptGenerator.workspaceToCode(workspace);
				console.log("Generated code: \n", code);
				// exportToJson()
				console.warn("Imports: ", imports);
			}
			if (LOG_WARNINGS) {
				console.info("Warnings", warnings);
			}
		}
		workspace.addChangeListener(updateCode);

	});
</script>

<div id="blocklyDiv" class="w-full h-dvh" />
