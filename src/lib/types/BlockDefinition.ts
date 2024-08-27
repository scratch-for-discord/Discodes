import type { BlockShape, BlockType } from "$lib/enums/BlockTypes";
import type Block from "$lib/utils/BlockGen/Blocks/Block";
import type BaseInput from "$lib/utils/BlockGen/Inputs/BaseInput";
import type { Mutator } from "$lib/utils/BlockGen/Mutators/Mutator";
import type Warning from "$lib/utils/BlockGen/Warnings/Warning";
import type Placeholder from "$lib/utils/ToolboxGen/Placeholder";
import {FlyoutButton} from "blockly";

export type Argument = BaseInput<any>;

export type BlockDefinition =
	| BlockBlockDefinition
	| LabelBlockDefinition 
	| ButtonBlockDefinition;
export interface BlockBlockDefinition {
	id: string; // This is the "type" of the block
	kind?: null;
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
	code: (args: Record<string, string | string[]>, block: Block) => string;

	mutator?: Mutator;
	hidden?: boolean;
	imports?: `${string}@${string}`[];
}
export interface LabelBlockDefinition {
	label: true;
	text: string;
} 
export interface ButtonBlockDefinition {
	kind: "button";
	text: string;
	callbackKey: string;
	callback: (p1: FlyoutButton) => void;
}
export interface MutatorBlock {
	// What inputs it adds to the block\
	adds: Argument[];
}
export interface CheckBoxMutatorBlock extends MutatorBlock {
	/**
	 * Used in checkbox mutator definition
	 * `defaultValue: false;`
	 * Shows/Hides field depending on the value
	 */
	defaultValue?: boolean;
	/**
	 * Text that appears in containerBlock in mutator menu
	 */
	text: string;
	/**
	 * name for input in container block
	 * */
	inputName: string;
}

export interface AssemblerMutatorBlock extends MutatorBlock {
	// Name of the block that appears in the block list in the UI
	block: string;
	// Can it only be added once in the UI
	once: boolean;
}

export interface DynamicListBlockMutatorBlock extends AssemblerMutatorBlock {
	
}
