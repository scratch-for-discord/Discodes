import { BlockShape, BlockType, DropdownType, WarningType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/interfaces/BlockDefinition";
import type { CategoryDefinition } from "$lib/interfaces/CategoryDefinition";
import Dropdown from "$lib/utils/BlockGen/Inputs/Dropdown";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import Warning from "$lib/utils/BlockGen/Warnings/Warning";
import rgbToHex from "$lib/utils/helpers/rgbToHex";
import { Order } from "blockly/javascript";

const blocks: BlockDefinition[] = [
    {   
        id: "is_equal",
        text: "{a} {is equal to} {b}",
        args: [
            new ValueInput("A", BlockType.Any),
            new Dropdown("CONDITION", DropdownType.Auto, {"=": "EQ", "≠": "NEQ", "<":"LT", "≤": "LEQ", ">": "GT", "≥": "GEQ"}),
            new ValueInput("B", BlockType.Any),
        ],
        warnings: [
            new Warning(WarningType.Input, "A"),
            new Warning(WarningType.Input, "B")
        ],
        shape: BlockShape.Floating,
        output: BlockType.Boolean,
        inline: true,
        colour: rgbToHex(91,128,165),
        tooltip: "Checks if the first input and the second input validate the condition.",
        helpUrl: "https://www.w3schools.com/js/js_comparisons.asp",
        code: (args) => {
            let operator: string
            switch (args.CONDITION) {
                case "EQ":
                    operator = "=="
                    break
                case "NEQ":
                    operator = "!="
                    break
                case "LT":
                    operator = "<"
                    break;
                case "LEQ":
                    operator = "<="
                    break;
                case "GT":
                    operator = ">"
                    break;
                case "GEQ":
                    operator = ">="
                    break;
                default:
                    operator = "=="
                    break
            }
            return [`${args.A} ${operator} ${args.B}`, Order.NONE]
        }
    },
    {
        id: "and_or",
        text: "{a} {and} {b}",
        args: [
            new ValueInput("A", BlockType.Boolean),
            new Dropdown("CONDITION", DropdownType.Auto, {"and": "AND", "or": "OR"}),
            new ValueInput("B", BlockType.Boolean),
        ],
        warnings: [
            new Warning(WarningType.Input, "A"),
            new Warning(WarningType.Input, "B")
        ],
        shape: BlockShape.Floating,
        output: BlockType.Boolean,
        inline: true,
        colour: rgbToHex(91,128,165),
        tooltip: "Checks if the first input and the second input validate the condition.",
        helpUrl: "",
        code: (args) => {
            let operator: string;
            switch (args.CONDITION) {
                case "AND":
                    operator = "&&"
                    break;
                case "OR":
                    operator = "||"
                    break;
                default:
                    operator = "&&"
                    break;
            }
            return [`${args.A} ${operator} ${args.B}`, Order.NONE]
        },
    },
    {
        id: "not",
        text: "not {operand}",
        args: [
            new ValueInput("operand", BlockType.Boolean)
        ],
        warnings: [
            new Warning(WarningType.Input, "operand")
        ],
        shape: BlockShape.Floating,
        output: BlockType.Boolean,
        inline: true,
        colour: rgbToHex(91,128,165),
        tooltip: "Returns the opposite of the input",
        helpUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
        code: (args) => {
            return [`!${args.operand}`, Order.NONE]
        }
    }
]

const category: CategoryDefinition = {
    name: "logic",
    colour: rgbToHex(91,128,165)
}

export default {blocks, category}