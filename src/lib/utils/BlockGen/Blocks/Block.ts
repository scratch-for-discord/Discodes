// Blockly
import Blockly from "blockly/core"
import pkg from 'blockly/javascript';
import '@blockly/field-grid-dropdown';

const { javascriptGenerator } = pkg;

// Types
import type { Argument, BlockDefinition } from "$lib/interfaces/BlockDefinition"
import { BlockShape, BlockType } from "$lib/enums/BlockTypes";

// Helpers
// import salt from "$lib/utils/helpers/salt"

export default class Block {
    private readonly _blockDefinition: BlockDefinition

    constructor(definition: BlockDefinition) {
        this._blockDefinition = definition
    }

    generate(): void {
        const code = this._blockDefinition.code
        const shape = this._blockDefinition.shape
        const output = this._blockDefinition.output

        const blockDef = {
            type: this._blockDefinition.id,
            colour: this._blockDefinition.colour,
            tooltip: this._blockDefinition.tooltip,
            helpUrl: this._blockDefinition.helpUrl,
            inputsInline: this._blockDefinition.inline,
            args0: [] as Array<Record<string, unknown>>,
            message0: "",
        }

        // Converts the classes into usable objects for the block definition
        this._blockDefinition.args?.forEach((arg: Argument) => {
            blockDef.args0.push(arg.generate() as Record<string, unknown>)
        })

        // Converts the raw text into a blockly valid "message0" with this format: "text %1 other text %2"
        //! Has a major flow, the {args} MUST be separated by a space :|
        const generatedText: string[] = this._blockDefinition.text.split(" ")
        let counter: number = 1
        for (let i = 0; i < generatedText.length; i++) {
            if (generatedText[i].includes("{")) {
                generatedText[i] = `%${counter}`
                counter ++
            }
        }
        blockDef.message0 = generatedText.join(" ")

        // Add The block to the blocks list
        Blockly.Blocks[`${blockDef.type}`] = {
            init: function () {
                this.jsonInit(blockDef)
                
                // Here we define the block's shape
                switch(shape) {
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
                        this.setOutput(true)
                    } else {
                        this.setOutput(true, output);
                    }
                }
            },
        }

        // Generating the export code
        javascriptGenerator.forBlock[`${blockDef.type}`] = function (block: Blockly.Block) {
            const args: Record<string, unknown> = {} //? Object we will pass as argument for the custom code to run properly

            for (const arg in blockDef.args0) {
                const argValue = blockDef.args0[arg] //? The argument object, contains the name, the type etc..
                const argName: string = blockDef.args0[arg].name as string

                switch (argValue.type) {
                    case "input_value":
                        args[argName] = javascriptGenerator.valueToCode(block, argName, javascriptGenerator.ORDER_ATOMIC)
                        break
                    case "input_statement":
                        args[argName] = javascriptGenerator.statementToCode(block, argName);
                        break
                    default:
                        args[argName] = block.getFieldValue(argName)
                        break;
                }
                return code(args)
            }
        }
    }
}