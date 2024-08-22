<script lang="ts">
	export let toolBoxWidth;
	export let workspace: any; // Im just too lazy for this

	import Warnings from "$lib/components/Warnings.svelte";
	import { createEventDispatcher } from "svelte";

	import { Button } from "$lib/components/ui/button";
	// import { showNavbar } from "$lib/stores/navbarStore";
	// import Page from "../../routes/editor/+page.svelte";

	let isShowing = true

	const dispatch = createEventDispatcher();
</script>

<div class={`absolute top-4 ${isShowing ? "w-full" : "w-[15%] justify-center flex items-center"} transition-all z-20 pr-5`} style={`padding-left: ${toolBoxWidth + 20}px`}>
	<div
		class="w-full bg-background flex p-1 px-2 rounded-md shadow-xl border-gray-200 dark:border-neutral-700 py-2"
	>
		{#if isShowing}
			<Button
				variant="outline"
				class="h-8 mx-1"
				on:click={() => {
					dispatch("save");
				}}>SAVE</Button
			>
			<Button
				variant="outline"
				class="h-8 mx-1"
				on:click={() => {
					dispatch("load");
				}}
			>
				LOAD
			</Button>
			<Button variant="link" class="h-8 mx-1" href='/'>
				Home
			</Button>
			<Warnings bind:workspace />
		{/if}
		<Button
			variant="default"
			class="h-8 ml-auto flex items-center"
			on:click={() => {
				isShowing = !isShowing
			}}
		>
			{isShowing ? "<" : ">"}
		</Button>
	</div>
</div>
