<script lang="ts">
	export let toolBoxWidth;
	export let workspace: any; // Im just too lazy for this

	import Warnings from "$lib/components/Warnings.svelte";
	import { createEventDispatcher, onMount } from "svelte";

	import { Button } from "$lib/components/ui/button";

	const dispatch = createEventDispatcher();
</script>

<div class="navbarDiv" style={`padding-left: ${toolBoxWidth + 20}px`}>
	<div
		class="w-full bg-background p-1 px-2 rounded-md shadow-xl border-gray-200 dark:border-neutral-700 py-2"
	>
		<Button
			variant="outline"
			class="h-8"
			on:click={() => {
				dispatch("save");
			}}>SAVE</Button
		>
		<Button
			variant="outline"
			class="h-8"
			on:click={() => {
				dispatch("load");
			}}>LOAD</Button
		>
		<Warnings bind:workspace />
	</div>
</div>

<style>
	.navbarDiv {
		position: absolute;
		top: 6rem; /* Adjust as needed */
		width: 100%;
		z-index: 20;
		padding-right: 20px;
	}
</style>
