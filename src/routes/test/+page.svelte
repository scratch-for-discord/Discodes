<script lang="ts">
    import Blockly from "blockly/core"
    import En from "blockly/msg/en";
    import "blockly/blocks"
	import { onMount } from "svelte";
    import pkg from 'blockly/javascript';
    const { javascriptGenerator } = pkg;
    import type { Abstract } from "blockly/core/events/events_abstract";
    import { OPTIONS } from "$lib/constants/workspace";

    let workspace: Blockly.WorkspaceSvg;

    Blockly.setLocale({
        ...En
    })

    onMount(async () => {
        workspace = Blockly.inject("blocklyDiv", {...OPTIONS});
        
        const supportedEvents = new Set([
            Blockly.Events.BLOCK_CHANGE,
            Blockly.Events.BLOCK_CREATE,
            Blockly.Events.BLOCK_DELETE,
            Blockly.Events.BLOCK_MOVE,
        ]);

        function updateCode(event: Abstract) {
            if (workspace.isDragging()) return; // Don't update while changes are happening.
            if (!supportedEvents.has(event.type)) return;

            const code = javascriptGenerator.workspaceToCode(workspace);
            console.log(code);
        }
        workspace.addChangeListener(updateCode);
    })
</script>

<div id="blocklyDiv" class="w-full h-dvh"/>
