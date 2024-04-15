// Blockly
import Blockly from "blockly/core";
import "@blockly/field-grid-dropdown";
import pkg from "blockly/javascript";
const { javascriptGenerator, Order } = pkg;

// Types
import type { Argument, BlockDefinition } from "$lib/types/BlockDefinition";
import { BlockShape, BlockType, WarningType } from "$lib/enums/BlockTypes";
import type { Abstract } from "blockly/core/events/events_abstract";

// Warnings
import { addWarning, removeWarning, warnings as warningsObj } from "../Warnings/WarningsList";
import { EventsToTriggerWarnings } from "$lib/constants/warnings";

// Helpers
import { dev } from "$app/environment";
import salt from "$lib/utils/helpers/salt";
import { addImport } from "$lib/utils/BlockGen/Blocks/importsList";
import type Warning from "../Warnings/Warning";

export default class Block {
	private _blockDefinition: BlockDefinition;
	private _block!: Blockly.Block;

	constructor(definition: BlockDefinition) {
		this._blockDefinition = definition;
	}

	set outputType(type: BlockType) {
		this._block.setOutput(true, type);
	}

	set colour(colour: string) {
		this._block.setColour(colour);
	}

	addWarning(warning: Warning): void {
		if (this._blockDefinition.label) throw new Error("Cannot add a warning to a label");
		if (warningsObj[this._block.id] && warningsObj[this._block.id][warning.data.fieldName]) return;
		this._blockDefinition.warnings = this._blockDefinition.warnings ? [...this._blockDefinition.warnings, warning] : [warning];
	}

	removeWarning(fieldName: string): void {
		if (this._blockDefinition.label) throw new Error("Cannot remove a warning form a label");
		if ((!warningsObj[this._block.id] || !warningsObj[this._block.id][fieldName]) && this._blockDefinition.warnings !== undefined) return;
		this._blockDefinition.warnings = this._blockDefinition.warnings?.filter(warning => warning.data.fieldName !== fieldName);
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

		const blockDef = {
			type: this._blockDefinition.id,
			colour: this._blockDefinition.colour,
			tooltip: this._blockDefinition.tooltip,
			helpUrl: this._blockDefinition.helpUrl,
			inputsInline: this._blockDefinition.inline,
			args0: [] as Record<string, string>[],
			message0: "",
			mutator: mutatorName == "" ? undefined : mutatorName
		};

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

				// Warnings Code
				this.setOnChange(function(this: Blockly.Block, changeEvent: Abstract) {
					if (
						importName &&
						!this.isInFlyout &&
						changeEvent.type !== Blockly.Events.VIEWPORT_CHANGE
					) {
						for (const import_ of importName) {
							addImport(import_);
						}
					}

					if (
						(EventsToTriggerWarnings.has(changeEvent.type) || changeEvent.type == "change") &&
						!this.isInFlyout
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

		// Generating the export code
		javascriptGenerator.forBlock[blockDef.type] = function(block: Blockly.Block) {
			const args: Record<string, string> = {}; //? Object we will pass as argument for the custom code to run properly

			for (const arg in blockDef.args0) {
				const argValue = blockDef.args0[arg]; //? The argument object, contains the name, the type etc..
				const argName: string = blockDef.args0[arg].name as string;

				switch (argValue.type) {
					case "input_value":
						args[argName] = javascriptGenerator.valueToCode(
							block,
							argName,
							javascriptGenerator.ORDER_ATOMIC
						);
						break;
					case "input_statement":
						args[argName] = javascriptGenerator.statementToCode(block, argName);
						break;
					default:
						args[argName] = block.getFieldValue(argName);
						break;
				}
			}
			return output ? [code(args, blockClass), Order.NONE] : code(args, blockClass);
		};
	}


}
