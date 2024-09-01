import Blockly from "blockly/core";
import pkg from "blockly/javascript";
const { javascriptGenerator } = pkg;

export function getInputValue(block: Blockly.Block, input: Blockly.Input, fieldName?: string): string {
   if(!input) return "";
    const inputName = input.name; // Correct way to access the input name
    if(fieldName === "field_variable") return Blockly.Variables.getVariable(block.workspace, block.getFieldValue(inputName))?.name ?? "null";

    switch (input.type) {
        case Blockly.inputTypes.VALUE:
            return javascriptGenerator.valueToCode(
                block,
                inputName,
                javascriptGenerator.ORDER_ATOMIC
            );

        case Blockly.inputTypes.STATEMENT:
            return javascriptGenerator.statementToCode(block, inputName);

        default:
            return block.getFieldValue(inputName) || "";
    }
}
