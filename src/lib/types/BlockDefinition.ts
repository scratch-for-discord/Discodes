import type { BlockShape, BlockType } from "$lib/enums/BlockTypes";
import type BaseInput from "$lib/utils/BlockGen/Inputs/BaseInput";
import type Mutator from "$lib/utils/BlockGen/Mutators/Mutator";
import type Warning from "$lib/utils/BlockGen/Warnings/Warning";
import type Placeholder from "$lib/utils/ToolboxGen/Placeholder";
import type { Order } from "blockly/javascript";

export type Argument = BaseInput;

export type BlockDefinition =
	| {
			id: string; // This is the "type" of the block
			label?: false; // To see if the definition is a label or not
			text: string; // This is "message0"
			output?: BlockType;
			shape: BlockShape; // The block shape
			args?: Argument[]; // This is "args0"
			warnings?: Warning[];
			placeholders?: Placeholder<unknown>[];
			inline: boolean; // This is "inputsInline"
			colour: string;
			tooltip: string;
			helpUrl: string;
			code: (args: Record<string, unknown>) => string | [string, Order];
			mutator?: Mutator;
			hidden?: boolean;
	}
	| {
			label: true;
			text: string;
	};

export type MutatorBlock = {
	// Name of the block that appears in the block list in the UI
	block: string;
	// What inputs it adds to the block
	adds: Argument[];
	// Can it only be added once in the UI
	once: boolean;
};
