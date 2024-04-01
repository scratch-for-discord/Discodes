// Blockly
import Blockly from "blockly/core";
import "@blockly/field-grid-dropdown";
import pkg from "blockly/javascript";
const { javascriptGenerator } = pkg;

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

export default class Block {
	private readonly _blockDefinition: BlockDefinition;

	constructor(definition: BlockDefinition) {
		this._blockDefinition = definition;
	}

	generate(): void {
		if (this._blockDefinition.label) return;

		const code = this._blockDefinition.code;
		const shape = this._blockDefinition.shape;
		const output = this._blockDefinition.output;
		const warnings = this._blockDefinition.warnings;
		const mutatorName: string = this._blockDefinition.mutator
			? this._blockDefinition.id + salt(5)
			: "";

		const blockDef = {
			type: this._blockDefinition.id,
			colour: this._blockDefinition.colour,
			tooltip: this._blockDefinition.tooltip,
			helpUrl: this._blockDefinition.helpUrl,
			inputsInline: this._blockDefinition.inline,
			args0: [] as Record<string, unknown>[],
			message0: "",
			mutator: mutatorName == "" ? undefined : mutatorName
		};

		if (this._blockDefinition.mutator) {
			this._blockDefinition.mutator.registerMutator(mutatorName);
		}

		// Converts the classes into usable objects for the block definition
		this._blockDefinition.args?.forEach((arg: Argument) => {
			blockDef.args0.push(arg.generate() as Record<string, unknown>);
		});

		// Converts the raw text into a blockly valid "message0" with this format: "text %1 other text %2"
		let counter: number = 1;
		blockDef.message0 = this._blockDefinition.text.replace(/\{.*?\}/g, () => `%${counter++}`);

		if (Blockly.Blocks[blockDef.type] !== undefined && !dev) {
			throw Error(`Block "${blockDef.type}" is defined twice.`);
		}

		// Add The block to the blocks list
		Blockly.Blocks[blockDef.type] = {
			init: function (this: Blockly.Block) {
				this.jsonInit(blockDef);

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
				this.setOnChange(function (this: Blockly.Block, changeEvent: Abstract) {
					if (
						(EventsToTriggerWarnings.has(changeEvent.type) || changeEvent.type == "change") &&
						!this.isInFlyout
					) {
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
									addWarning(this.id, "deprecated", message);
									break;

								case WarningType.Permanent:
									resultMessage += `${message}\n`;
									addWarning(this.id, "permanent", message);
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
		javascriptGenerator.forBlock[blockDef.type] = function (block: Blockly.Block) {
			const args: Record<string, unknown> = {}; //? Object we will pass as argument for the custom code to run properly

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
			return code(args);
		};
	}
}
