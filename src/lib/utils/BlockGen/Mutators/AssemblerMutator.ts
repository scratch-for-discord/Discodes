<<<<<<< HEAD
import type { AssemblerMutator as AssemblerMutatorType } from "$lib/types/BlockDefinition";
import salt from "$lib/utils/helpers/salt";
import pkg from "blockly/javascript";
import type { AdditionalSettings } from "./Mutator";
import { Mutator } from "./Mutator";
import Blockly, { Connection } from "blockly/core";
import { MutatorType } from "$lib/enums/BlockTypes";

const { javascriptGenerator } = pkg;

function orderListChanged(order1: string[], order2: string[]): boolean {
	if (!(Array.isArray(order1) && Array.isArray(order2))) return false;
	if (order1.length !== order2.length) return true;
	for (let i = 0; i < order1.length; i++) {
		if (order1[i] !== order2[i]) {
			return true;
		}
	}
	return false;
}
interface ClauseBlock extends Blockly.Block {
	//input_type: Connection
	connections_: { [key: string]: Connection };
}
type ConnectionMap = { [key: string]: ConnectionMapConnection };
interface ConnectionMapConnection {
	connection: Connection;
	input_name: string;
}
export default class AssemblerMutator extends Mutator {
	//will store each properties name
	private order: string[];
	private settings: AdditionalSettings | undefined;
	constructor(
		containerBlockText: string,
		properties: AssemblerMutatorType[],
		settings?: AdditionalSettings
	) {
		super(properties, containerBlockText, MutatorType.Assembler);
		this.order = [];
		this.mixin = this.getMixin(settings);
		this.setBlocks = this.blocks;
		this.settings = settings;
	}

	get blocks(): string[] {
		const arr: string[] = [];
		for (const prop of super.properties as AssemblerMutatorType[]) {
			arr.push(prop.block);
		}
		return arr;
	}

	getMixin(settings?: AdditionalSettings): object {
		this.order = [];
		const properties = super.properties as AssemblerMutatorType[];
		const propertieMap = Object.create(null);
		const containerBlockName = salt(10);
		const containerBlockText = super.containerBlockText;
		let inputIndexMap: Map<string, number> = new Map<string, number>();
		// First we set the save and load states.
		for (const prop of properties) {
			propertieMap[prop.block] = prop;
		}
		
		Blockly.Blocks[containerBlockName] = {
			init: function(this: Blockly.Block) {
				this.jsonInit({
					type: containerBlockName,
					message0: `${containerBlockText}`,
					nextStatement: true,

					colour: settings?.color ?? 230,
					tooltip: "Put blocks under the container block to modify the original block",
					helpUrl: ""
				});
			}
		};
		javascriptGenerator.forBlock[containerBlockName] = function() {
			return "";
		};
		const mixin = {
			//! Disable eslint cuz the state variable is of type any until they fully migrate to typescript
			// eslint-disable-next-line
			saveExtraState: function (this: any): object {
				const state = Object.create(null);
				if (this.order) state["order"] = this.order;
				return state;
			},
			//! Disable eslint cuz the state variable is of type any until they fully migrate to typescript
			// eslint-disable-next-line
			loadExtraState: function (this: any, state: any): void {
				// const oldOrder = this.order;
				this.order = state["order"] ?? [];
				/*if(orderListChanged(oldOrder, this.order)) */
				this.updateShape_();
			},
			decompose: function(this: Blockly.Block, workspace: Blockly.WorkspaceSvg) {
				const containerBlock = workspace.newBlock(containerBlockName);
				containerBlock.initSvg();
				// eslint-disable-next-line
				const orders = (this as any).order as string[];
				// let connection = containerBlock.getInput("STACK")?.connection;
				let connection = containerBlock.nextConnection;
				if (orders) {
					for (const order of orders) {
						const block = workspace.newBlock(order);
						block.initSvg();
						connection?.connect(block.previousConnection!);
						connection = block.nextConnection!;
					}
				}

				return containerBlock;
			},
			// eslint-disable-next-line
			compose: function (this: any, containerBlock: Blockly.Block) {
				const connections: ConnectionMap = {};
				const oldOrder = this.order;
				const order = [];

				// let itemBlock: ClauseBlock | null = containerBlock.getInputTargetBlock("STACK") as ClauseBlock | null;
				// eslint-disable-next-line
				let itemBlock = containerBlock.nextConnection!.targetBlock() as any;

				while (itemBlock) {
					order.push(itemBlock.type);
					if (itemBlock.connections_) {
						for (const conStr of Object.keys(itemBlock.connections_)) {
							connections[conStr] = {
								connection: itemBlock.connections_[conStr],
								input_name: itemBlock.type
							};
						}
					}
					// connections.push(itemBlock.conne);
					itemBlock =
						itemBlock.nextConnection &&
						(itemBlock.nextConnection.targetBlock() as ClauseBlock | null);
				}
				this.order = order;
				if (orderListChanged(oldOrder, this.order)) this.updateShape_();
				this.reconnectChildBlocks_(connections);
			},
			// eslint-disable-next-line
			updateShape_: function (this: any) {
				for (const inp of properties) {
					for (const add of inp.adds) {
						let i = 1;
						let moreInputs = true;
						while (moreInputs) {
							const failed = !this.removeInput(add.name + i, true);
							i++;
							if (failed) moreInputs = false;
						}
					}
				}
				inputIndexMap = new Map<string, number>();
				if (this.order) {
					for (const order of this.order) {
						const adds = propertieMap[order].adds;
						for (const add of adds) {
							inputIndexMap.set(add._name, (inputIndexMap.get(add.name) ?? 0) + 1);
							const name = add._name + inputIndexMap.get(add.name);
							if (!this.getInput(name)) {
								const input = add.generate();
								this.appendInput_(input, name, add.getField());
							}
						}
					}
				}
			},
			reconnectChildBlocks_: function(this: Blockly.Block, connections: ConnectionMap) {
				const count = new Map<string, number>();
				for (const connectionKey in connections) {
					const ConMap = connections[connectionKey];
					const property = propertieMap[ConMap.input_name];
					const connection = ConMap.connection;
					if (!connection) continue;
					for (const add of property.adds) {
						const name = add.name;
						const c = count.get(name) ?? 1;
						connection.reconnect(this, name + c);
						count.set(name, c + 1);
					}
				}
				// for (let i = 1; i <= 10; i++) {
				//     connections[i]?.reconnect(this, 'IF' + i);
				// }
			},
			// eslint-disable-next-line
			saveConnections: function (this: any, containerBlock: Blockly.Block) {
				const count = new Map<string, number>();
				//let clauseBlock = containerBlock.getInputTargetBlock("STACK") as ClauseBlock | null;
				let clauseBlock = containerBlock as ClauseBlock | null;

				while (clauseBlock) {
					if (clauseBlock.isInsertionMarker()) {
						clauseBlock = clauseBlock.getNextBlock() as ClauseBlock | null;
						continue;
					}
					clauseBlock.connections_ = {};
					//count
					const c = count.get(clauseBlock.type) ?? 1;
					const prop = propertieMap[clauseBlock.type];
					if (prop) {
						for (const add of prop.adds) {
							const inp = this.getInput(add._name + c);
							if (inp) {
								clauseBlock.connections_[add._name + c] = inp && inp.connection!.targetConnection;
								count.set(clauseBlock.type, c + 1);
							}
						}
					}

					clauseBlock = clauseBlock.getNextBlock() as ClauseBlock | null;
				}
			},
			appendInput_: function(this: Blockly.Block, input, name, fieldText) {
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
		};

		return mixin;
	}
}
=======
// import type { MutatorBlock } from "$lib/types/BlockDefinition";
// import salt from "$lib/utils/helpers/salt";
// import pkg from "blockly/javascript";
// const { javascriptGenerator } = pkg;
// import {Mutator} from "./Mutator";
// import Blockly from "blockly/core";

// export default class AssemblerMutator extends Mutator {


// 	constructor(containerBlockText: string, properties: MutatorBlock[]) {
// 		super(properties, containerBlockText);
// 		this.mixin = this.getMixin();
// 		this.setBlocks = this.blocks;
// 	}

// 	get blocks(): string[] {
// 		return super.properties.map((val) => val.block);
// 	}

// 	getMixin(): object {
// 		const properties = super.properties;
// 		const containerBlockName = salt(10);
// 		const containerBlockText = super.containerBlockText;
// 		const extraStateObj: Record<string, number> = {};

// 		// First we set the save and load states.
// 		const mixin = {

// 			saveExtraState: function(this: any): object {

// 				for (const mutatorProp of properties) {
// 					extraStateObj[mutatorProp.block] = this[`${mutatorProp.block}_count_`];
// 				}
// 				return extraStateObj;
// 			},
// 			//! Disable eslint cuz the state variable is of type any until they fully migrate to typescript
// 			// eslint-disable-next-line
// 			loadExtraState: function (this: any, state: any): void {
// 				for (const mutatorProp of properties) {
// 					this[`${mutatorProp.block}_count_`] = state[mutatorProp.block];
// 				}
// 				this.updateShape_();
// 			},

// 			decompose: function(this: any, workspace: Blockly.WorkspaceSvg) {

// 				Blockly.Blocks[containerBlockName] = {
// 					init: function(this: Blockly.Block) {
// 						this.jsonInit({
// 							type: containerBlockName,
// 							message0: `${containerBlockText}\n %1`,
// 							args0: [
// 								{
// 									type: "input_statement",
// 									name: "STACK"
// 								}
// 							],
// 							colour: 230,
// 							tooltip: "Put blocks inside of the container block to modify the original block",
// 							helpUrl: ""
// 						});
// 					}
// 				};
// 				javascriptGenerator.forBlock[containerBlockName] = function() {
// 					return "";
// 				};

// 				const containerBlock = workspace.newBlock(containerBlockName);
// 				containerBlock.initSvg();

// 				let connection = containerBlock.getInput("STACK")?.connection;
// 				for (const key in extraStateObj) {
// 					for (let i = 0; i < this[`${key}_count_`]; i++) {
// 						const blockToAdd: string = key;

// 						const itemBlock = workspace.newBlock(blockToAdd);
// 						itemBlock.initSvg();
// 						connection?.connect(itemBlock.previousConnection);
// 						connection = itemBlock.nextConnection;
// 					}
// 				}

// 				return containerBlock;
// 			},


// 			// eslint-disable-next-line
// 			compose: function (this: any, containerBlock: Blockly.Block) {

// 				const workspaceBlocks = [];
// 				let itemBlock = containerBlock.getInputTargetBlock("STACK");
// 				// Iterate over each child block in the mutator workspace and add it to the array
// 				while (itemBlock) {
// 					workspaceBlocks.push(itemBlock);
// 					itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
// 				}
// 				// Update the shape of the original block based on the number of child blocks
// 				for (const mutatorProp of properties) {
// 					const blockCount = workspaceBlocks.filter(
// 						(block) => block.type === mutatorProp.block
// 					).length;
// 					this[`${mutatorProp.block}_count_`] = blockCount;
// 				}
// 				this.updateShape_();
// 			},
// 			updateShape_: function(this: Blockly.Block) {
// 				// Iterate over each MutatorBlock defined in the properties array
// 				for (let i = 0; i < properties.length; i++) {
// 					// @ts-expect-error MutatorProp is type is "any"
// 					const blockCount = this[`${mutatorProp.block}_count_`];
// 					if (blockCount > 0) {
// 						// Determine the number of items in the adds array for the current MutatorBlock

// 						// Add inputs for each block count
// 						for (let j = 0; j < blockCount; j++) {
// 							// @ts-expect-error MutatorProp is type is "any"
// 							const inputName = mutatorProp.block + j;
// 							// @ts-expect-error MutatorProp is type is "any"
// 							const addsLength = mutatorProp.adds.length;

// 							if (!this.getInput(inputName)) {
// 								// Get the input index by taking the modulo of j with the length of the adds array
// 								const addsIndex = j % addsLength;
// 								// Generate input definition from the corresponding adds item
// 								// @ts-expect-error MutatorProp is type is "any"
// 								const input = mutatorProp.adds[addsIndex].generate();
// 								// Append the input to the block
// 								// @ts-expect-error Undefined blockly type for the private function
// 								this.appendInput_(input, inputName);
// 							}
// 						}
// 					} else {
// 						// If there are no child blocks, remove all inputs for this type
// 						let j = 0;
// 						// @ts-expect-error MutatorProp is type is "any"
// 						while (this.getInput(mutatorProp.block + j)) {
// 							// @ts-expect-error MutatorProp is type is "any"
// 							this.removeInput(mutatorProp.block + j);
// 							j++;
// 						}
// 					}

// 					// If 'once' is true, disable adding more blocks of this type
// 					// @ts-expect-error MutatorProp is type is "any"
// 					if (mutatorProp.once && blockCount > 0) {
// 						// @ts-expect-error MutatorProp is type is "any"
// 						this.getInput(mutatorProp.block + (blockCount - 1)).setCheck(null);
// 					}

// 					// Break if we have reached the end of the properties array
// 					if (i + 1 >= properties.length) {
// 						break;
// 					}

// 					// Continue adding inputs for the next MutatorBlock
// 					const nextMutatorProp = properties[i + 1];
// 					// @ts-expect-error nextMutatorProp is type is "any"
// 					const nextBlockCount = this[`${nextMutatorProp.block}_count_`];
// 					if (nextBlockCount > 0) {
// 						// Determine the number of items in the adds array for the next MutatorBlock
// 						const nextAddsLength = nextMutatorProp.adds.length;
// 						// Add inputs for each block count
// 						for (let k = 0; k < nextBlockCount; k++) {
// 							const nextInputName = nextMutatorProp.block + k;
// 							if (!this.getInput(nextInputName)) {
// 								// Get the input index by taking the modulo of k with the length of the adds array
// 								const nextAddsIndex = k % nextAddsLength;
// 								// Generate input definition from the corresponding adds item
// 								const nextInput = nextMutatorProp.adds[nextAddsIndex].generate();
// 								// Append the input to the block
// 								// @ts-expect-error Undefined blockly type for the private function
// 								this.appendInput_(nextInput, nextInputName);
// 							}
// 						}
// 					} else {
// 						// If there are no child blocks, remove all inputs for this type
// 						let k = 0;
// 						while (this.getInput(nextMutatorProp.block + k)) {
// 							this.removeInput(nextMutatorProp.block + k);
// 							k++;
// 						}
// 					}

// 					// If 'once' is true, disable adding more blocks of this type
// 					if (nextMutatorProp.once && nextBlockCount > 0) {
// 						// @ts-expect-error MutatorProp is type is "any"
// 						this.getInput(nextMutatorProp.block + (nextBlockCount - 1)).setCheck(null);
// 					}
// 				}
// 			},

// 			/**
// 			 * Append a Blockly input to the block
// 			 * @param {object} input - Input definition
// 			 * @param {string} name - Name of the input
// 			 * @private
// 			 */
// 			// eslint-disable-next-line
// 			appendInput_: function (this: Blockly.Block, input: any, name: any) {
// 				const inputType = input.type || "input_value"; // Default to input_value if type is not specified
// 				const inputCheck = input.check; // Check for input type if specified

// 				switch (inputType) {
// 					case "input_value":
// 						this.appendValueInput(name).setCheck(inputCheck);
// 						break;
// 					case "input_statement":
// 						this.appendStatementInput(name).setCheck(inputCheck);
// 						break;
// 					case "input_dummy":
// 						this.appendDummyInput(name);
// 						break;
// 					default:
// 						throw new Error(`Unsupported input type: ${inputType}`);
// 				}
// 			}
// 		};

// 		return mixin;
// 	}
// }
>>>>>>> master
