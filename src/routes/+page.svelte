<script lang="ts">
	import "blockly/blocks";
	import Blockly from "blockly/core";

	import { OPTIONS } from "$lib/constants/workspace";
	import Workspace from "$lib/components/Workspace.svelte";
	import Warnings from "$lib/components/Warnings.svelte";
    import {createEventDispatcher, onMount} from "svelte";
	import Toolbox from "$lib/utils/ToolboxGen/Toolbox";
    import pkg from 'blockly/javascript';
    const {javascriptGenerator} = pkg;
    let workspace: Blockly.WorkspaceSvg;
	let toolboxJson: Blockly.utils.toolbox.ToolboxDefinition;
    let code: string = "";
    let showModal = false;
    const generateCode = () => {
        code = javascriptGenerator.workspaceToCode(workspace);
        showModal = true;
    };
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
<button class="btn" on:click={generateCode}>Show Code</button>

<Warnings bind:workspace />
<Workspace bind:workspace options={OPTIONS} bind:toolbox={toolboxJson} />
{#if showModal}
    <dialog id="code-modal">
        <div class="modal-content">
            <button class="close" on:click={() => showModal = false}>&times;</button>
            <textarea readonly bind:value={code}></textarea>
        </div>
    </dialog>

{/if}
<style>
    /* Style for the modal */
    .modal {
        display: block; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    /* Modal Content/Box */
    .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
    }

    /* Close Button */
    .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }

    textarea {
        width: 100%;
        height: 300px;
    }
</style>