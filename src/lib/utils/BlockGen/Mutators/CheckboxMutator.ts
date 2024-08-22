import { Mutator } from "./Mutator";
import type { AdditionalSettings } from "./Mutator";

import type { CheckBoxMutatorBlock } from "$lib/types/BlockDefinition";
import salt from "$lib/utils/helpers/salt";
<<<<<<< HEAD
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Blockly, { Connection } from "blockly/core";
=======
>>>>>>> master
import pkg from "blockly/javascript";
import { MutatorType } from "$lib/enums/BlockTypes";
const { javascriptGenerator } = pkg;

interface ClauseBlock extends Blockly.Block {
	//input_type: Connection
	connections_: { [p: string]: Blockly.Connection };
}
type ConnectionMap = { [key: string]: Blockly.Connection };

export default class CheckboxMutator extends Mutator {
	private settings: AdditionalSettings | undefined;

	constructor(
		containerBlockText: string,
		properties: CheckBoxMutatorBlock[],
		settings?: AdditionalSettings
	) {
		super(properties, containerBlockText, MutatorType.Checkbox);
		this.settings = settings;

		this.mixin = this.getMixin(settings);
		// this.setBlocks = this.blocks;
	}

	// get blocks(): string[] {
	// 	const arr: string[] = [];
	// 	for (const prop of super.properties as CheckBoxMutatorBlock[]) {
	// 		arr.push(prop.inputName);
	// 	}
	// 	return arr;
	// }
	getMixin(settings?: AdditionalSettings): object {
		const properties = super.properties as CheckBoxMutatorBlock[];

		const propertieMap: Record<string, CheckBoxMutatorBlock> = {};
		for (const prop of properties) {
			propertieMap[prop.inputName] = prop;
		}
		const containerBlockName = salt(10);
		const containerBlockText = super.containerBlockText;
		const inputData: boolean[] = [];
		const fieldData: string[] = [];
		for (const prop of properties) {
			fieldData.push(prop.inputName);
			inputData.push(!!prop.defaultValue);
		}
		Blockly.Blocks[containerBlockName] = {
			init: function(this: Blockly.Block) {
				this.jsonInit({
					type: containerBlockName,
					message0: `${containerBlockText}`,

					colour: settings?.color ?? 230,
					tooltip: "",
					helpUrl: ""
				});
			}
		};
		javascriptGenerator.forBlock[containerBlockName] = function() {
			return "";
		};
		const mixin = {
			inputs_: inputData,
			fields_: fieldData,
			//! Disable eslint cuz the state variable is of type any until they fully migrate to typescript
			// eslint-disable-next-line
			saveExtraState: function (this: any): object {
				if (!this.inputs_ || this.inputs_.length === 0) return {};
				const state = Object.create(null);
				if (this.inputs_ && this.fields_) {
					for (let i = 0; i < this.inputs_.length; i++) {
						if (this.inputs_[i]) state[this.fields_[i]] = this.inputs_[i];
					}
				}
				return state;
			},
			//! Disable eslint cuz the state variable is of type any until they fully migrate to typescript
			// eslint-disable-next-line
			loadExtraState: function (this: any, state: any): void {
				for (let i = 0; i < this.inputs_.length; i++) {
					this.inputs_[i] = state[this.fields_[i]] ?? false;
				}
				this.updateShape_();
			},
			// eslint-disable-next-line
			decompose: function (this: any, workspace: Blockly.WorkspaceSvg) {
				const containerBlock = workspace.newBlock(containerBlockName);
				for (let i = 0; i < properties.length; i++) {
					containerBlock
						.appendDummyInput()
						.setAlign(Blockly.inputs.Align.RIGHT)
						.appendField(propertieMap[this.fields_[i]].text)
						.appendField(
							new Blockly.FieldCheckbox(this.inputs_[i] ? "TRUE" : "FALSE"),
							this.fields_[i]
						);
				}
				containerBlock.initSvg();
				return containerBlock;
			},
			//! Disable eslint cuz the state variable is of type any until they fully migrate to typescript
			// eslint-disable-next-line
			compose: function (this: any, containerBlock: Blockly.Block) {
				const connections: ConnectionMap = containerBlock.connections_;

				for (let i = 0; i < this.inputs_.length; i++) {
					this.inputs_[i] = containerBlock.getFieldValue(this.fields_[i]) == "TRUE";
				}
				this.updateShape_();
				this.reconnectChildBlocks_(connections);
			},
			//! Disable eslint cuz the state variable is of type any until they fully migrate to typescript
			// eslint-disable-next-line
			updateShape_: function (this: any) {
				for (let i = 1; i <= this.inputs_.length; i++) {
					const property = propertieMap[this.fields_[i - 1]];
					for (const add of property.adds) {
						this.removeInput(add.name + i, true);
					}
				}
				for (let i = 1; i <= this.inputs_.length; i++) {
					const property = propertieMap[this.fields_[i - 1]];
					if (!this.inputs_[i - 1]) continue;
					for (const add of property.adds) {
						this.appendInput_(add.generate(), add.name + i, add.getField());
					}
				}
			},
			reconnectChildBlocks_: function(this: Blockly.Block, connections: ConnectionMap) {
				for (const connectionKey in connections) {
					const conn = connections[connectionKey];
					if (!conn) continue;
					conn.reconnect(this, connectionKey);
				}
				console.log(connections)
			},
			// eslint-disable-next-line
			saveConnections: function (this: any, containerBlock: any) {
				(containerBlock as ClauseBlock).connections_ = {};
				for (let i = 0; i < this.inputs_.length; i++) {
					const property = propertieMap[this.fields_[i]];
					if (!this.inputs_[i]) continue;
					for (const add of property.adds) {
						const input = this.getInput(add.name + i);
						containerBlock.connections_[add.name + i] = input && input.connection!.targetConnection;
					}
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
		super.setHelperFunction(() => {
			this.inputs_ = [...inputData];
			this.fields_ = [...fieldData];
		});

		return mixin;
	}
}
