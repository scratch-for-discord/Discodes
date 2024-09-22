<script lang="ts">
	import { cn } from "$lib/utils";
	import * as Dropdown from "$lib/components/ui/dropdown-menu"
	import ChevronLeft from "lucide-svelte/icons/chevron-left";

	export let toolBoxWidth;
	/* eslint-disable-next-line */
	export let workspace: any; // Im just too lazy for this

	import Warnings from "$lib/components/Warnings.svelte";
	import { createEventDispatcher } from "svelte";

	import { Button } from "$lib/components/ui/button";
	// import { showNavbar } from "$lib/stores/navbarStore";
	// import Page from "../../routes/editor/+page.svelte";

	import { generateJavascriptCode } from "$lib/utils/BlockGen/Blockly/Generators/GenerateCode";

	let isShowing = true;
	let isFilesShowing = false;

	const dispatch = createEventDispatcher();

	function wait(n: number) {
		return new Promise((res) => setTimeout(res, n));
	}
</script>

<div
	class="absolute top-4 w-full z-20 pr-5 flex justify-end"
	style={`padding-left: ${toolBoxWidth + 20}px`}
>
	<div
		class={cn(
			!isShowing && "w-[56px]",
			isShowing && "w-full",
			"bg-background flex p-1 px-2 rounded-md shadow-xl border-gray-200 dark:border-neutral-700 py-2 transition-all"
		)}
	>
		{#if isShowing}
			{#await wait(50) then}
				<Button variant="link" class="h-8 mx-1" href="/">Home</Button>
				<div on:blur={() => {
					isFilesShowing = false
				}}>
					<Dropdown.Root>
						<Dropdown.Trigger><Button class="h-8 mx-1" variant="default">File</Button></Dropdown.Trigger>
						<Dropdown.Content class="outline-none border-none px-3">
							<Dropdown.Label>File Menu</Dropdown.Label>
							<Dropdown.Separator />
							<Dropdown.Item class="cursor-pointer" on:click={() => {
								const code = generateJavascriptCode()
								console.log(code)
							}}>Export to JavaScript</Dropdown.Item>
							<Dropdown.Item class="cursor-pointer" on:click={() => {
								const code = generateJavascriptCode()
								if(code) {
									navigator.clipboard.writeText(code)
								}
							}}>Copy to clipboard</Dropdown.Item>
							<Dropdown.Separator />
							<Dropdown.Item class="cursor-pointer" on:click={() => {
								dispatch("save")
							}}>Save file</Dropdown.Item>
							<Dropdown.Item class="cursor-pointer" on:click={() => {
								dispatch("load")
							}}>Load File</Dropdown.Item>
						</Dropdown.Content>
					</Dropdown.Root>
				</div>
				<Warnings bind:workspace />
			{/await}
		{/if}
		<Button
			variant="default"
			class="h-8 ml-auto flex items-center w-[40.02px] p-0"
			on:click={() => {
				isShowing = !isShowing;
			}}
		>
			<ChevronLeft class={cn(isShowing && "rotate-180", !isShowing && "", "transition-all")} />
		</Button>
	</div>
</div>
