<script lang="ts">
    import "blockly/blocks";
    import Blockly from "blockly/core";

    import { OPTIONS } from "$lib/constants/workspace";
	import Workspace from "$lib/components/Workspace.svelte";
	import Toolbox from "$lib/utils/ToolboxGen/Toolbox";
	import { onMount } from "svelte";

    let workspace: Blockly.WorkspaceSvg;

    onMount(async () => {
        let t = new Toolbox()
        await t.generate()
    })
</script>

<Workspace bind:workspace={workspace} options={OPTIONS}/>
