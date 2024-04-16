import {AdditionalSettings, Mutator} from "./Mutator";
import {MutatorBlock} from "$lib/types/BlockDefinition";
import salt from "$lib/utils/helpers/salt";
import Blockly from "blockly/core";
import pkg from "blockly/javascript";
const { javascriptGenerator } = pkg;
export default class CheckboxMutator extends Mutator {
	private settings: AdditionalSettings | undefined;

	constructor(containerBlockText: string, properties: MutatorBlock[], settings?: AdditionalSettings) {
		super(properties, containerBlockText);
		this.settings = settings;

		this.mixin = this.getMixin(settings);
		this.setBlocks = this.blocks;
	}

	get blocks(): string[] {
		const arr: string[] = [];
		for (const prop of super.properties) {
			arr.push(prop.block);
		}
		return arr;
	}
	getMixin(settings: AdditionalSettings): object {
		const properties = super.properties;
		const propertieMap = Object.create(null);
		const containerBlockName = salt(10);
		const containerBlockText = super.containerBlockText;
		let inputIndexMap: Map<string, number> = new Map<string, number>();
		// First we set the save and load states.
		for(const prop of properties) {
			propertieMap[prop.block] = prop;
		}
		Blockly.Blocks[containerBlockName] = {
			init: function(this: Blockly.Block) {
				this.jsonInit({
					type: containerBlockName,
					message0: `${containerBlockText}`,
					nextStatement: false,
					previousStatement: false,

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

			saveExtraState: function(this: any): object {

			},
			//! Disable eslint cuz the state variable is of type any until they fully migrate to typescript
			// eslint-disable-next-line
			loadExtraState: function (this: any, state: any): void {


			},
			decompose: function(this: Blockly.Block, workspace: Blockly.WorkspaceSvg) {},
			compose: function(this: any, containerBlock: Blockly.Block) {},
			updateShape_: function(this: any) {},
			reconnectChildBlocks_: function(
				this: Blockly.Block,
				connections: Blockly.Connection,

			) {},
			saveConnections: function (this: any, containerBlock: Blockly.Block) {},
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
		}
		return mixin;
	}

}
