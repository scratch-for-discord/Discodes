import Blockly from "blockly/core";
import { dev } from "$app/environment";
import type {MutatorBlock} from "$lib/types/BlockDefinition";

export default class Mutator {
	private _properties: MutatorBlock[];
	private _mixin: object;
	private _blocks: string[] | undefined;
	private _helperFunction: (() => any) | undefined;
	constructor(properties: MutatorBlock[]) {
		this._properties = properties;
		this._mixin = {};
	}
	get properties() {
		return this._properties;
	}

	set mixin(mixin: object) {
		this._mixin = mixin;
	}

	set setBlocks(blocks: string[]) {
		this._blocks = blocks;
	}
	set setHelperFunction(helperFn: () => any) {
		this._helperFunction = helperFn;
	}

	registerMutator(name: string): void {
		// Unregister the mutator if it's already registered. Without this blockly crashes.
		if (Blockly.Extensions.isRegistered(name)) {
			if (dev) {
				console.warn("[ DEV WARNING ] Mutator already registered ... Attempting to unregister");
			}
			Blockly.Extensions.unregister(name);
		}
		Blockly.Extensions.registerMutator(name, this._mixin, this._helperFunction, this._blocks);
	}

}
