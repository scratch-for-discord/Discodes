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

	export let workspace: Blockly.WorkspaceSvg;
	export let options: typeof OPTIONS;
	export let toolbox: Blockly.utils.toolbox.ToolboxDefinition;

	Blockly.setLocale({
		...En
	});

	onMount(async () => {
		await loadBlocks();
		workspace = Blockly.inject("blocklyDiv", { ...options, toolbox: toolbox });

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
			if (LOG_CODE) {
				const code = javascriptGenerator.workspaceToCode(workspace);
				console.log("Generated code: \n", code);
			}
			if (LOG_WARNINGS) {
				console.log("Warnings", warnings);
			}
		}
		workspace.addChangeListener(updateCode);
	});
</script>

<div id="blocklyDiv" class="w-full h-dvh" />
