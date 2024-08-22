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
<<<<<<< HEAD

	import { createEventDispatcher } from "svelte";
	import "../utils/custom_category.js"
	import type Toolbox from "$lib/utils/ToolboxGen/Toolbox";
=======
>>>>>>> parent of 7dd02ae (Variable category, dynamic categories, buttons (#29))

	export let workspace: Blockly.WorkspaceSvg;
	export let options: typeof OPTIONS;
	export let toolbox: Blockly.utils.toolbox.ToolboxDefinition;

	const dispatch = createEventDispatcher();

	Blockly.setLocale({
		...En
	});

<<<<<<< HEAD
	onMount(async () => {
		await loadBlocks();
		workspace = Blockly.inject("blocklyDiv", { ...options, toolbox: toolboxJson });
		toolbox.registerCallbacks(workspace)
		dispatch("workspaceInject"); // May be useful in the future
		dispatch("updateNavbarPadding"); // Updates the padding-left property of the navbar (look at /routes/editor/+page.svelte)

=======
	onMount(async() => {
		await loadBlocks();
		workspace = Blockly.inject("blocklyDiv", { ...options, toolbox: toolbox });

		// Only console log the code and warnings when debug mode is enabled.
>>>>>>> parent of 7dd02ae (Variable category, dynamic categories, buttons (#29))
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
<<<<<<< HEAD

		workspace.addChangeListener((event: Abstract) => {
			// Updates the padding-left property of the navbar due to potential toolbox width change (look at /routes/editor/+page.svelte)
			if (event.type === "toolbox_item_select") dispatch("updateNavbarPadding");
		});
=======
>>>>>>> parent of 7dd02ae (Variable category, dynamic categories, buttons (#29))
	});
</script>

<div id="blocklyDiv" class="w-full h-dvh" />
