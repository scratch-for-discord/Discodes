import {AdditionalSettings, Mutator} from "./Mutator";
import type {CheckBoxMutatorBlock} from "$lib/types/BlockDefinition";
import salt from "$lib/utils/helpers/salt";
import Blockly from "blockly/core";
import pkg from "blockly/javascript";
const { javascriptGenerator } = pkg;
export default class CheckboxMutator extends Mutator {
	private settings: AdditionalSettings | undefined;

	constructor(containerBlockText: string, properties: CheckBoxMutatorBlock[], settings?: AdditionalSettings) {
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
		const properties = super.properties as CheckBoxMutatorBlock[];

		// const propertieMap = Object.create(null);
		const containerBlockName = salt(10);
		const containerBlockText = super.containerBlockText;
		const inputData: Record<string, boolean> = {}
		// First we set the save and load states.
		for(const prop of properties) {
			// propertieMap[prop.block] = prop;
			inputData[prop.block]
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
			// inputData: propertieMap,
			/*
			state = {
			 "input1": true
			}
			*/
			inputData: {} as Record<string, boolean>,
			//! Disable eslint cuz the state variable is of type any until they fully migrate to typescript
			// eslint-disable-next-line
			saveExtraState: function(this: any): object {
				// const state = this.inputData;
				if(this.inputData) return this.inputData;
				return {};
			},
			//! Disable eslint cuz the state variable is of type any until they fully migrate to typescript
			// eslint-disable-next-line
			loadExtraState: function (this: any, state: any): void {
				this.inputData = state;
				this.updateShape_();

			},
			// eslint-disable-next-line
			decompose: function(this: any, workspace: Blockly.WorkspaceSvg) {
				const containerBlock = workspace.newBlock(containerBlockName);
				containerBlock.initSvg();
				const inputData = this.inputData as Record<string, boolean>;
				for (let i= 0; i<properties.length; i++) {
					const propertie
					containerBlock.appendDummyInput().setAlign(Blockly.inputs.Align.RIGHT).appendField()
				}
			},
			//! Disable eslint cuz the state variable is of type any until they fully migrate to typescript
			// eslint-disable-next-line
			compose: function(this: any, containerBlock: Blockly.Block) {},
			//! Disable eslint cuz the state variable is of type any until they fully migrate to typescript
			// eslint-disable-next-line
			updateShape_: function(this: any) {},
			reconnectChildBlocks_: function(
				this: Blockly.Block,
				connections: Blockly.Connection,

			) {},
			//! Disable eslint cuz the state variable is of type any until they fully migrate to typescript
			// eslint-disable-next-line
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
		};
		super.setHelperFunction(() => {

		});

		return mixin;
	}

}
