import type { MutatorBlock } from "$lib/types/BlockDefinition";
import salt from "$lib/utils/helpers/salt";
import pkg from "blockly/javascript";
const { javascriptGenerator } = pkg;
import Mutator from "./Mutator";
import Blockly from "blockly/core";

export default class AssemblerMutator extends Mutator {
	private readonly _properties: MutatorBlock[];
	private readonly _containerBlockText: string;

	constructor(containerBlockText: string, properties: MutatorBlock[]) {
		super();
		this._properties = properties;
		this._containerBlockText = containerBlockText;
		this.mixin = this.getMixin();
		this.setBlocks = this.blocks;
	}

	get blocks(): string[] {
		return this._properties.map((val) => val.block);
	}

	getMixin(): object {
		const properties = this._properties;
		const containerBlockName = salt(10);
		const containerBlockText = this._containerBlockText;
		const extraStateObj: Record<string, number> = {};
		// First we set the save and load states.
		const mixin = {
			saveExtraState: function (this: any): object {
				for (const mutatorProp of properties) {
					extraStateObj[mutatorProp.block] = this[`${mutatorProp.block}_count_`];
				}
				return extraStateObj;
			},
			//! Disable eslint cuz the state variable is of type any until they fully migrate to typescript
			// eslint-disable-next-line
			loadExtraState: function (this: any, state: any): void {
				for (const mutatorProp of properties) {
					this[`${mutatorProp.block}_count_`] = state[mutatorProp.block];
				}
				this.updateShape_();
			},
			decompose: function (this: any, workspace: Blockly.WorkspaceSvg) {
				Blockly.Blocks[containerBlockName] = {
					init: function (this: Blockly.Block) {
						this.jsonInit({
							type: containerBlockName,
							message0: `${containerBlockText}\n %1`,
							args0: [
								{
									type: "input_statement",
									name: "STACK"
								}
							],
							colour: 230,
							tooltip: "Put blocks inside of the container block to modify the original block",
							helpUrl: ""
						});
					}
				};
				javascriptGenerator.forBlock[containerBlockName] = function () {
					return "";
				};

				const containerBlock = workspace.newBlock(containerBlockName);
				containerBlock.initSvg();

				let connection = containerBlock.getInput("STACK")?.connection;
				for (const key in extraStateObj) {
					for (let i = 0; i < this[`${key}_count_`]; i++) {
						const blockToAdd: string = key;

						const itemBlock = workspace.newBlock(blockToAdd);
						itemBlock.initSvg();
						connection?.connect(itemBlock.previousConnection);
						connection = itemBlock.nextConnection;
					}
				}

				return containerBlock;
			},
			compose: function (this: any, containerBlock: Blockly.Block) {
				const workspaceBlocks = [];
				let itemBlock = containerBlock.getInputTargetBlock("STACK");
				// Iterate over each child block in the mutator workspace and add it to the array
				while (itemBlock) {
					workspaceBlocks.push(itemBlock);
					itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
				}
				// Update the shape of the original block based on the number of child blocks
				for (const mutatorProp of properties) {
					const blockCount = workspaceBlocks.filter(
						(block) => block.type === mutatorProp.block
					).length;
					this[`${mutatorProp.block}_count_`] = blockCount;
				}
				this.updateShape_();
			},
			updateShape_: function (this: Blockly.Block) {
				// Iterate over each MutatorBlock defined in the properties array
				for (let i = 0; i < properties.length; i++) {
					// @ts-ignore MutatorProp is type is "any"
					const blockCount = this[`${mutatorProp.block}_count_`];
					if (blockCount > 0) {
						// Determine the number of items in the adds array for the current MutatorBlock

						// Add inputs for each block count
						for (let j = 0; j < blockCount; j++) {
							// @ts-ignore MutatorProp is type is "any"
							const inputName = mutatorProp.block + j;
							// @ts-ignore MutatorProp is type is "any"
							const addsLength = mutatorProp.adds.length;

							if (!this.getInput(inputName)) {
								// Get the input index by taking the modulo of j with the length of the adds array
								const addsIndex = j % addsLength;
								// Generate input definition from the corresponding adds item
								// @ts-ignore MutatorProp is type is "any"
								const input = mutatorProp.adds[addsIndex].generate();
								// Append the input to the block
								// @ts-ignore Undefined blockly type for the private function
								this.appendInput_(input, inputName);
							}
						}
					} else {
						// If there are no child blocks, remove all inputs for this type
						let j = 0;
						// @ts-ignore MutatorProp is type is "any"
						while (this.getInput(mutatorProp.block + j)) {
							// @ts-ignore MutatorProp is type is "any"
							this.removeInput(mutatorProp.block + j);
							j++;
						}
					}

					// If 'once' is true, disable adding more blocks of this type
					// @ts-ignore MutatorProp is type is "any"
					if (mutatorProp.once && blockCount > 0) {
						// @ts-ignore MutatorProp is type is "any"
						this.getInput(mutatorProp.block + (blockCount - 1)).setCheck(null);
					}

					// Break if we have reached the end of the properties array
					if (i + 1 >= properties.length) {
						break;
					}

					// Continue adding inputs for the next MutatorBlock
					const nextMutatorProp = properties[i + 1];
					// @ts-ignore nextMutatorProp is type is "any"
					const nextBlockCount = this[`${nextMutatorProp.block}_count_`];
					if (nextBlockCount > 0) {
						// Determine the number of items in the adds array for the next MutatorBlock
						const nextAddsLength = nextMutatorProp.adds.length;
						// Add inputs for each block count
						for (let k = 0; k < nextBlockCount; k++) {
							const nextInputName = nextMutatorProp.block + k;
							if (!this.getInput(nextInputName)) {
								// Get the input index by taking the modulo of k with the length of the adds array
								const nextAddsIndex = k % nextAddsLength;
								// Generate input definition from the corresponding adds item
								const nextInput = nextMutatorProp.adds[nextAddsIndex].generate();
								// Append the input to the block
								// @ts-ignore Undefined blockly type for the private function
								this.appendInput_(nextInput, nextInputName);
							}
						}
					} else {
						// If there are no child blocks, remove all inputs for this type
						let k = 0;
						while (this.getInput(nextMutatorProp.block + k)) {
							this.removeInput(nextMutatorProp.block + k);
							k++;
						}
					}

					// If 'once' is true, disable adding more blocks of this type
					if (nextMutatorProp.once && nextBlockCount > 0) {
						// @ts-ignore MutatorProp is type is "any"
						this.getInput(nextMutatorProp.block + (nextBlockCount - 1)).setCheck(null);
					}
				}
			},

			/**
			 * Append a Blockly input to the block
			 * @param {object} input - Input definition
			 * @param {string} name - Name of the input
			 * @private
			 */
			appendInput_: function (this: Blockly.Block, input: any, name: any) {
				const inputType = input.type || "input_value"; // Default to input_value if type is not specified
				const inputCheck = input.check; // Check for input type if specified

				switch (inputType) {
					case "input_value":
						this.appendValueInput(name).setCheck(inputCheck);
						break;
					case "input_statement":
						this.appendStatementInput(name).setCheck(inputCheck);
						break;
					case "input_dummy":
						this.appendDummyInput(name);
						break;
					default:
						throw new Error(`Unsupported input type: ${inputType}`);
				}
			}
		};

		return mixin;
	}
}
