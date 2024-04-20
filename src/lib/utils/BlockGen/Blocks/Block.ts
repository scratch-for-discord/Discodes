// Blockly
import Blockly from "blockly/core";
import * as gridDropdown from "@blockly/field-grid-dropdown";
import pkg from "blockly/javascript";
// Types

import type {
	Argument,
	AssemblerMutator,
	BlockDefinition,
	CheckBoxMutatorBlock,
	MutatorBlock
} from "$lib/types/BlockDefinition";
import { BlockShape, BlockType, DropdownType, MutatorType, WarningType } from "$lib/enums/BlockTypes";
import type { Abstract } from "blockly/core/events/events_abstract";
import type { DiscodesInput } from "$lib/types/DiscodesInput";
import type Warning from "../Warnings/Warning";


// Warnings
import {addWarning, removeWarning, warnings as warningsObj} from "../Warnings/WarningsList";
import {EventsToTriggerWarnings} from "$lib/constants/warnings";

// Helpers
import {dev} from "$app/environment";
import salt from "$lib/utils/helpers/salt";

import {getInputValue} from "$lib/utils/helpers/getInputValue";



import { addImport } from "$lib/utils/BlockGen/Blocks/importsList";

interface BlocklyBlockDefinition {
	type: string
	colour: string
	tooltip: string
	helpUrl: string
	inputsInline: boolean
	args0: Record<string, string>[]
	message0: string
	mutator:string | undefined
};

const { javascriptGenerator, Order } = pkg;

export default class Block {
	private _blockDefinition: BlockDefinition;
	private _block!: Blockly.Block;
	private _blocklyDefinition!: BlocklyBlockDefinition;

	constructor(definition: BlockDefinition) {
		this._blockDefinition = definition;
	}

	set outputType(type: BlockType) {
		this._block.setOutput(true, type);
	}

	set colour(colour: string) {
		this._block.setColour(colour);
	}

	public addWarning(warning: Warning): void {
		if (this._blockDefinition.label) throw new Error("Cannot add a warning to a label");
		if (warningsObj[this._block.id] && warningsObj[this._block.id][warning.data.fieldName]) return;
		this._blockDefinition.warnings = this._blockDefinition.warnings ? [...this._blockDefinition.warnings, warning] : [warning];
	}

	public removeWarning(fieldName: string): void {
		if (this._blockDefinition.label) throw new Error("Cannot remove a warning form a label");
		if ((!warningsObj[this._block.id] || !warningsObj[this._block.id][fieldName]) && this._blockDefinition.warnings !== undefined) return;
		this._blockDefinition.warnings = this._blockDefinition.warnings?.filter(warning => warning.data.fieldName !== fieldName);
	}

	public addText(text: string, fieldName: string): void {
		this._block.appendDummyInput(fieldName).appendField(text);
	}

	public removeText(fieldName: string): void {
		this._block.removeInput(fieldName);
	}

	public addInput(input: DiscodesInput): void {
		const generated = input.generate();
		if (!this._block || this._block.getInput(generated.name) || this._block.isInFlyout) return;
		let isDummy: boolean = true;

		switch(generated.type) {
			case DropdownType.Grid:
				this._block.appendDummyInput(generated.name)
				.appendField(new gridDropdown.FieldGridDropdown(generated.options as Blockly.MenuGenerator) as Blockly.Field<string | undefined>);
				break;

			case DropdownType.List:
				this._block.appendDummyInput(generated.name)
				.appendField(new Blockly.FieldDropdown(generated.options as Blockly.MenuGenerator) as Blockly.Field<string | undefined>);
				break;
			
			case "input_value":
				this._block.appendValueInput(generated.name)
				.setCheck(generated.check as string | string[] | undefined ? generated.check as string | string[]: null);
				isDummy = false;
				break;
			
			case "input_statement":
				this._block.appendStatementInput(generated.name);
				isDummy = false;
				break;

			case "field_number":
				this._block.appendDummyInput(generated.name)
				.appendField(new Blockly.FieldNumber(generated.value, generated.min, generated.max, generated.precision));
				break;

			case "field_image":
				this._block.appendDummyInput(generated.name)
				.appendField(new Blockly.FieldImage(generated.src, generated.width, generated.height, generated.alt));
				break;

			case "field_input":
				this._block.appendDummyInput(generated.name)
				.appendField(new Blockly.FieldTextInput(generated.text, undefined,{spellcheck: generated.spellcheck}));
				break;
		}
		(this._blocklyDefinition.args0 as Array<unknown>).push({...generated, isDummy: isDummy});
	}

	public removeInput(inputName: string): void {
		if (!this._block.getInput(inputName)) return;
		this._block.removeInput(inputName);
	}

	generate(): void {
		if (this._blockDefinition.label) return;
		
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const blockClass = this; // Used because `this` is overwritten in the blockly functions.

		const code = this._blockDefinition.code;
		const shape = this._blockDefinition.shape;
		const output = this._blockDefinition.output;
		const importName = this._blockDefinition.imports;
		const mutatorName: string = this._blockDefinition.mutator
			? this._blockDefinition.id + salt(5)
			: "";

		const blockDef: BlocklyBlockDefinition = {
			type: this._blockDefinition.id,
			colour: this._blockDefinition.colour,
			tooltip: this._blockDefinition.tooltip,
			helpUrl: this._blockDefinition.helpUrl,
			inputsInline: this._blockDefinition.inline,
			args0: [],
			message0: "",
			mutator: mutatorName == "" ? undefined : mutatorName
		};

		blockClass._blocklyDefinition = blockDef;

		if (this._blockDefinition.mutator) {
			this._blockDefinition.mutator.registerMutator(mutatorName);
		}

		// Converts the classes into usable objects for the block definition
		this._blockDefinition.args?.forEach((arg: Argument) => {
			blockDef.args0.push(arg.generate() as Record<string, string>);
		});

		// Converts the raw text into a blockly valid "message0" with this format: "text %1 other text %2"
		let counter: number = 1;
		blockDef.message0 = this._blockDefinition.text.replace(/\{.*?\}/g, () => `%${counter++}`);

		if (Blockly.Blocks[blockDef.type] !== undefined && !dev) {
			throw Error(`Block "${blockDef.type}" is defined twice.`);
		}
		//const blockDefinition = this._blockDefinition;
		// Add The block to the blocks list
		Blockly.Blocks[blockDef.type] = {
			init: function(this: Blockly.Block) {
				this.jsonInit(blockDef);

				// We will pass the block in different functions of the class so we need it stored.
				blockClass._block = this;

				// Here we define the block's shape
				switch (shape) {
					case BlockShape.Action:
						this.setPreviousStatement(true);
						this.setNextStatement(true);
						break;
					case BlockShape.Bottom:
						this.setPreviousStatement(true);
						break;
					case BlockShape.Top:
						// opposite of terminal
						this.setNextStatement(true);
						break;
				}

				// Here we add an output if needed
				if (output) {
					if (output == BlockType.Any) {
						this.setOutput(true);
					} else {
						this.setOutput(true, output);
					}
				}
				// eslint-disable-next-line @typescript-eslint/no-this-alias
				const block = this;
				// Warnings Code
				this.setOnChange(function(this: Blockly.Block, changeEvent: Abstract) {

					if (
						importName &&
						!this.isInFlyout &&
						changeEvent.type !== Blockly.Events.VIEWPORT_CHANGE
					) {
						// "import" is a reserved name
						for (const import_ of importName) {
							addImport(import_);
						}
					}

					if (
						(EventsToTriggerWarnings.has(changeEvent.type) || changeEvent.type == "change") &&
						!this.isInFlyout &&
						block.id == this.id
					) {
						const warnings = blockClass._blockDefinition.label ? undefined : blockClass._blockDefinition.warnings;
						if (!warnings) return;
						
						const topParent = this.getRootBlock();
						let resultMessage: string = "";
						
						for (const warning of warnings) {
							const { warningType, message, fieldName } = warning.data;
							switch (warningType) {
								case WarningType.Parent:
									if (topParent.type != fieldName) {
										resultMessage += `${message}\n`;
										addWarning(this.id, fieldName, message);
										break;
									}
									removeWarning(this.id, fieldName);
									break;

								case WarningType.Input:
									if (this.getInput(fieldName)?.connection?.targetConnection === null) {
										resultMessage += `${message}\n`;
										addWarning(this.id, fieldName, message);
										break;
									}
									removeWarning(this.id, fieldName);
									break;

								case WarningType.Deprec:
									resultMessage += `${message}\n`;
									addWarning(this.id, fieldName, message);
									break;

								case WarningType.Permanent:
									resultMessage += `${message}\n`;
									addWarning(this.id, fieldName, message);
									break;
							}
						}
						if (warningsObj[this.id] && Object.keys(warningsObj[this.id]).length === 0) {
							delete warningsObj[this.id];
						}
						this.setWarningText(resultMessage);
					}
				});
			}
		};
		const properties = this._blockDefinition.mutator?.properties;
		const propertyMap: Record<string, MutatorBlock> = {};
		if(properties) {
			for (const property of properties) {
				if(this._blockDefinition.mutator?.type === MutatorType.Assembler) {
					propertyMap[(property as AssemblerMutator).block] = property;

				} else if(this._blockDefinition.mutator?.type === MutatorType.Checkbox) {
					propertyMap[(property as CheckBoxMutatorBlock).inputName] = property;

				}
			}
		}

		// Generating the export code
		javascriptGenerator.forBlock[blockDef.type] = function(block: Blockly.Block) {

			const args: Record<string, string | string[]> = {}; //? Object we will pass as argument for the custom code to run properly

			for (const arg in blockDef.args0) {
				const argValue = blockDef.args0[arg]; //? The argument object, contains the name, the type etc..
				const argName: string = blockDef.args0[arg].name as string;
				args[argName] = getInputValue(block, argName, argValue.type);
			}

			//parse mutator values
			for(const propertyKey of Object.keys(propertyMap)) {
				const property = propertyMap[propertyKey];
				console.log(propertyMap)
				for (const add of property.adds) {
					const valueList: string[] = [];
					let i = 1;
					let input = block.getInput(add.name + i);
					while(input) {
						const definition = add.generate() as Record<string, unknown>;
						valueList.push(getInputValue(block, definition.name as string + i, definition.type as string));
						i++;
						input = block.getInput(add.name + i);
					}
					args[add.name] =  valueList;


// 			const args: Record<string, string> = {}; //? Object we will pass as argument to be used for code generation
			
// 			for (const arg of blockClass._blocklyDefinition.args0) {
// 				//! Fix this asap...
// 				//@ts-expect-error gergerg
// 				if (arg.isDummy === true) {
// 					// Since it's a dummy input we need to get the value from the fields array inside the dummy input!
// 					//@ts-expect-error We have to access the protected value to generate it correctly.
// 					args[arg.name] = block.getInput(arg.name)?.fieldRow[0].value_;
// 					continue;
// 				} 

// 				switch (arg.type) {
// 					case "input_value":
// 						args[arg.name] = javascriptGenerator.valueToCode(
// 							block,
// 							arg.name,
// 							javascriptGenerator.ORDER_ATOMIC
// 						);
// 						break;

// 					case "input_statement":
// 						args[arg.name] = javascriptGenerator.statementToCode(block, arg.name);
// 						break;

// 					default:
// 						args[arg.name] = block.getFieldValue(arg.name);
// 						break;

				}

			}
			return output ? [code(args, blockClass), Order.NONE] : code(args, blockClass);
		};
	}
}
