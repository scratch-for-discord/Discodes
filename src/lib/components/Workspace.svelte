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
	import { createEventDispatcher } from "svelte";
	import "../utils/custom_category.js"

	export let workspace: Blockly.WorkspaceSvg;
	export let options: typeof OPTIONS;
	export let toolbox: Blockly.utils.toolbox.ToolboxDefinition;

	const dispatch = createEventDispatcher();

	Blockly.setLocale({
		...En
	});

	onMount(async () => {
		await loadBlocks();
		workspace = Blockly.inject("blocklyDiv", { ...options, toolbox: toolbox });
		dispatch("workspaceInject"); // May be useful in the future
		dispatch("updateNavbarPadding"); // Updates the padding-left property of the navbar (look at /routes/editor/+page.svelte)

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
				const code = javascriptGenerator.workspaceToCode(workspace);
				console.log("Generated code: \n", code);
				console.warn("Imports: ", imports);
			}
			if (LOG_WARNINGS) {
				console.info("Warnings", warnings);
			}
		}
		workspace.addChangeListener(updateCode);

		workspace.addChangeListener((event: Abstract) => {
			// Updates the padding-left property of the navbar due to potential toolbox width change (look at /routes/editor/+page.svelte)
			if (event.type === "toolbox_item_select") dispatch("updateNavbarPadding");
		});
	});
</script>

<div id="blocklyDiv" class="w-full h-dvh" />
