<script lang="ts">
    import "blockly/blocks";
    import Blockly from "blockly/core";

    import { OPTIONS } from "$lib/constants/workspace";
	import Workspace from "$lib/components/Workspace.svelte";
	import Warnings from "$lib/components/Warnings.svelte";
	import { onMount } from "svelte";
	import Toolbox from "$lib/utils/ToolboxGen/Toolbox";
	import type { ToolboxItemInfo } from "blockly/core/utils/toolbox";

    let workspace: Blockly.WorkspaceSvg;
    let toolboxJson: Blockly.utils.toolbox.ToolboxDefinition

    
    onMount(async () => {
        const toolbox = new Toolbox()
        toolboxJson = await toolbox.generate()
    })  

</script>
<Warnings bind:workspace={workspace}/>
<Workspace bind:workspace={workspace} options={OPTIONS} bind:toolbox={toolboxJson}/>
