import Blockly from "blockly/core";
import pkg from "blockly/javascript";
const { javascriptGenerator } = pkg;
export function getInputValue(block: Blockly.Block, inputName: string, inputType: string): string {
<<<<<<< HEAD
	// if(!block.getInput(inputName)) return "";
	switch (inputType) {
		case "input_value":
			return javascriptGenerator.valueToCode(block, inputName, javascriptGenerator.ORDER_ATOMIC);
		case "input_statement":
			return javascriptGenerator.statementToCode(block, inputName);
		default:
			return block.getFieldValue(inputName);
	}
=======
    // if(!block.getInput(inputName)) return "";
    switch (inputType) {
        case "input_value":
            return  javascriptGenerator.valueToCode(
                block,
                inputName,
                javascriptGenerator.ORDER_ATOMIC
            );
        case "input_statement":
            return javascriptGenerator.statementToCode(block, inputName);
        default:
            return block.getFieldValue(inputName);
    }
>>>>>>> master
}
