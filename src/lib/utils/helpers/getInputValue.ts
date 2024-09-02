import Blockly from "blockly/core";
import pkg from "blockly/javascript";
const { javascriptGenerator } = pkg;

export function getInputValue(
    block: Blockly.Block,
    inputName: string,
    inputType?: string
  ): string {
    console.log(inputName, inputType)
    switch (inputType) {
      case "input_value":

      return javascriptGenerator.valueToCode(
          block,
          inputName,
          javascriptGenerator.ORDER_ATOMIC
        ) // Ensure a fallback value is provided
  
      case "field_variable":
        const fieldValue = block.getFieldValue(inputName);
        if (fieldValue) {
          return (
            Blockly.Variables.getVariable(block.workspace, fieldValue)?.name ?? ""
          );
        } else {
          return "";
        }
  
      case "input_statement":
        return javascriptGenerator.statementToCode(block, inputName) // Ensure a fallback value is provided
  
      default:
        // Handle other cases or return field values as default
        return block.getFieldValue(inputName) // Ensure a fallback value is provided
    }
  }
  