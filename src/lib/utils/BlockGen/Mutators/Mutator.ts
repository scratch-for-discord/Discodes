import Blockly from "blockly/core";
import { dev } from "$app/environment";
import type { MutatorBlock } from "$lib/types/BlockDefinition";
import { MutatorType } from "$lib/enums/BlockTypes";
import type { Align } from "blockly/core/inputs";
export interface AdditionalSettings {
	alignInputs?: Align | null;
	color?: number | string | undefined;
}
export class Mutator {
	private _properties: MutatorBlock[];
	private readonly _containerBlockText: string;
	private _mixin: object;
	private _blocks: string[] | undefined;
	private _helperFunction: (() => void) | undefined;
	private mutatorType: MutatorType;

	constructor(properties: MutatorBlock[], containerBlockText: string, mutatorType: MutatorType) {
		this._properties = properties;
		this._containerBlockText = containerBlockText;
		this._mixin = {};
		this.mutatorType = mutatorType;
	}
	get properties() {
		return this._properties;
	}
	get containerBlockText() {
		return this._containerBlockText;
	}

	set mixin(mixin: object) {
		this._mixin = mixin;
	}

	set setBlocks(blocks: string[]) {
		this._blocks = blocks;
	}
	setHelperFunction(helperFn: () => void) {
		this._helperFunction = helperFn;
	}
	appendInput_(this: Blockly.Block, input: any, name: string, fieldText: string) {
		const inputType = input.type || "input_value"; // Default to input_value if type is not specified
		const inputCheck = input.check; // Check for input type if specified

		switch (inputType) {
			case "input_value":
				this.appendValueInput(name).setCheck(inputCheck).appendField(fieldText);
				break;
			case "input_statement":
				this.appendStatementInput(name).setCheck(inputCheck).appendField(fieldText);
				break;
			case "input_dummy":
				this.appendDummyInput(name).appendField(fieldText);
				break;
			default:
				throw new Error(`Unsupported input type: ${inputType}`);
		}
	}

	registerMutator(name: string): object {
		// Unregister the mutator if it's already registered. Without this blockly crashes.
		if (Blockly.Extensions.isRegistered(name)) {
			if (dev) {
				console.warn("[ DEV WARNING ] Mutator already registered ... Attempting to unregister");
			}
			Blockly.Extensions.unregister(name);
		}
		Blockly.Extensions.registerMutator(name, this._mixin, this._helperFunction, this._blocks);
		return this._mixin;
	}
	get type() {
		return this.mutatorType;
	}
}
