<script lang="ts">
	import Blockly from "blockly/core";
	import { warnings } from "$lib/utils/BlockGen/Warnings/WarningsList";

	import * as Dialog from "$lib/components/ui/dialog";
	import Button from "./ui/button/button.svelte";
	import * as Accordion from "$lib/components/ui/accordion";

	export let workspace: Blockly.WorkspaceSvg;

	let dialogOpen = false;

	interface WarningMessage {
		message: string;
		blockName: string | undefined;
	}
	let displayWarnings: Record<string, WarningMessage[]> = {};

	function getBlock(id: string): Blockly.Block | null {
		return workspace.getBlockById(id);
	}

	async function gotoBlock(id: string): Promise<void> {
		if (getBlock(id)) {
			workspace.centerOnBlock(id);
			workspace.highlightBlock(id, true);
			dialogOpen = false;
			await new Promise((res) => setTimeout(res, 2000));
			workspace.highlightBlock(id, false);
		}
	}

	function modalOpen() {
		for (const id in warnings) {
			if (!Blockly.getMainWorkspace().getBlockById(id)) delete warnings[id];
		}

		displayWarnings = {};
		for (const id in warnings) {
			displayWarnings[id] = [];
			for (const warning in warnings[id]) {
				displayWarnings[id].push({ message: warnings[id][warning], blockName: getBlock(id)?.type });
			}
		}
	}
</script>

<Dialog.Root bind:open={dialogOpen} onOpenChange={() => modalOpen()}>
	<Dialog.Trigger>
		<Button class="h-8">Check warnings</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="font-bold text-lg">
				Cannot export, your code has <span class="text-orange-400">warnings!</span>
			</Dialog.Title>
			<Dialog.Description
				>You can click on the block name to reveal it in the workspace</Dialog.Description
			>
			<Accordion.Root>
				<div class="overflow-y-auto max-h-[82vh]">
					{#each Object.keys(displayWarnings) as id, index}
						<Accordion.Item value={String(index)}>
							<Accordion.Trigger
								>Block: {displayWarnings[id][0].blockName?.toUpperCase()}</Accordion.Trigger
							>
							<Accordion.Content>
								{#each displayWarnings[id] as warning}
									<p><span class="font-bold text-orange-400">Warning:</span> {warning.message}</p>
								{/each}<Button
									class="mt-3"
									on:click={async () => {
										await gotoBlock(id);
									}}>Go to block</Button
								></Accordion.Content
							>
						</Accordion.Item>
					{/each}
				</div>
			</Accordion.Root>
			<div class="flex justify-end w-full">
				<Dialog.Close><Button class="btn">Close</Button></Dialog.Close>
			</div>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>

<!-- <button
	class="btn"
	on:click={() => {
		openModal();
	}}>open modal</button
>
<dialog id="warningsModal" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<header>
			<h2 class="font-bold text-lg text-white">
				Cannot export, your code has <span class="text-orange-400">warnings!</span>
			</h2>
			<p>You can click on the block name to reveal it in the workspace</p>
		</header>

		{#each Object.keys(displayWarnings) as id}
			<div class="divider"></div>

			<div class="flex mb-3">
				<h3 class="text-base font-bold text-white">Block:</h3>
				<form method="dialog">
					<button
						class="link link-info ml-2"
						on:click={async () => {
							await gotoBlock(id);
						}}>{displayWarnings[id][0].blockName?.toUpperCase()}</button
					>
				</form>
			</div>

			<div class="collapse collapse-arrow bg-base-200">
				<input type="checkbox" name="my-accordion-2" />
				<div class="collapse-title text-xl font-medium">
					<span class="font-bold text-red-500">Errors:</span>
				</div>
				<div class="collapse-content">
					{#each displayWarnings[id] as warning}
						<p><span class="font-bold text-orange-400">Warning:</span> {warning.message}</p>
					{/each}
				</div>
			</div>
		{/each}
		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog> -->
