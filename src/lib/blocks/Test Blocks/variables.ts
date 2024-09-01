
import type { BlockDefinition } from "$lib/types/BlockDefinition";
import type { CategoryDefinition } from "$lib/types/CategoryDefinition";
import Blockly from "blockly"
import { BlockShape, BlockType, DropdownType } from "$lib/enums/BlockTypes";
import DropdownInput from "$lib/utils/BlockGen/Inputs/Dropdown";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import VariableInput from "$lib/utils/BlockGen/Inputs/VariableInput";

function fixVariableName(variable: string): string {
    // Remove non-alphabetic characters from the start and end
    let fixedVariable = variable.replace(/^[^a-zA-Z]+|[^a-zA-Z0-9]+$/g, '');

    // Replace non-alphabetic characters in the middle with underscores
    fixedVariable = fixedVariable.replace(/[^a-zA-Z0-9]+/g, '_');

    return fixedVariable;
}
const blocks: BlockDefinition[] = [
    {
        kind: "button",
        text: "Create a variable...",
        callbackKey: "CREATE_VARIABLE_OUR",
        callback(p1) {
            Blockly.Variables.createVariableButtonHandler(p1.getTargetWorkspace(), undefined, '');
            // let pro = prompt("New variable:")
            // p1.getTargetWorkspace().createVariable(pro as string, "any", pro)
        },
    },
    {
        id: "variable_get_discodes",
        text: "{VAR}",
        args: [
            new VariableInput("VAR", "")
        ],
        code(args) {

            const varName = fixVariableName(args.VAR as string)
            return varName
        
        },
        output: BlockType.Any,
        shape: BlockShape.Value,
        inline: false, // This is "inputsInline"
        colour: "#A55B99",
        tooltip: "variable block",
        helpUrl: ""
    },
    {
        id: "variable_set_discodes",
        text: "set {VAR} to {INPUT}",
        args: [
            new VariableInput("VAR", ""),
            new ValueInput("INPUT", BlockType.Any)
        ],
        code(args) {
            const varName = fixVariableName(args.VAR as string)

            return `${varName}${args.INPUT !== ""? " =" : ";"} ${args.INPUT !== ""? args.INPUT+";": ""}\n`
        },
        shape: BlockShape.Action,
        inline: true, // This is "inputsInline"
        colour: "#A55B99",
        tooltip: "variable block",
        helpUrl: ""
    },
    {
        id: "variable_change_discodes",
        text: "change {VAR} by {DROPDOWN} {INPUT}",
        args: [
            new VariableInput("VAR", ""),
            new DropdownInput("DROPDOWN", DropdownType.Auto, 
                {
                    "adding": "+",
                    "subtracting": "-",
                    "multiplying": "*",
                    "dividing": "/",
                }
            ),
            new ValueInput("INPUT", BlockType.Any)

        ],
        code(args) {
            const varName = fixVariableName(args.VAR as string)
            return `${varName}${args.INPUT !== ""? " "+ args.DROPDOWN + "=" : ";"} ${args.INPUT !== ""? args.INPUT+";": ""}\n`

        },
        shape: BlockShape.Action,
        inline: true, // This is "inputsInline"
        colour: "#A55B99",
        tooltip: "variable block",
        helpUrl: ""
    }
];

const category: CategoryDefinition = {
    name: "Variables",
    colour: "#db5c53",
    custom: "VARIABLE_DYNAMIC_OUR",
    customFunction(workspace) {
        let variableModelList = workspace.getAllVariables()
        let blocklist = [];
        blocklist.push({
            "kind": "button",
            "text": "Create a variable...",
            "callbackKey": "CREATE_VARIABLE_OUR"
        })
        if(variableModelList.length !== 0) {
            const lastVariable = variableModelList[variableModelList.length-1]
            blocklist.push({
                "kind": "block",
                "type": "variable_set_discodes",
                "fields": {
                    "VAR": {
                      "name": lastVariable.name,
                      "type": lastVariable.type,
                    }
                },
            })
            blocklist.push({
                "kind": "block",
                "type": "variable_change_discodes",
                "fields": {
                    "VAR": {
                      "name": lastVariable.name,
                      "type": lastVariable.type,
                    }
                },
            })
        }
        variableModelList.sort(Blockly.VariableModel.compareByName);

        for(const value of variableModelList) {
            blocklist.push( {
                "kind": "block",
                "fields": {
                    "VAR": {
                      "name": value.name,
                      "type": value.type,
                    }
                },
                "type": "variable_get_discodes",
              })
        }
        return blocklist;
    },
};

export default { blocks, category };
