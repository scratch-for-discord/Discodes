import type { BlockDefinition } from "$lib/types/BlockDefinition";
import Block from "$lib/utils/BlockGen/Blocks/Block";

export default async function loadBlocks(): Promise<void> {
	// Get all files from blocks file
	const modules = import.meta.glob("../../blocks/**/**/*.ts");

	for (const path in modules) {
		// Initialize the exports
		const module = await modules[path]();
		// Get all the blocks from the files
		//! FIX THAT
		// @ts-expect-error Module is underfined and the red color pisses me off
		const blocksArray: BlockDefinition[] = module.default.blocks as BlockDefinition[];

		// Generate each block
		for (const blockDef of blocksArray) {
			const block = new Block(blockDef);
			block.generate();
		}
	}
}
