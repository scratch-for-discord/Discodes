import { BlockShape, BlockType, DropdownType, WarningType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/interfaces/BlockDefinition";
import type { CategoryDefinition } from "$lib/interfaces/CategoryDefinition";
import Dropdown from "$lib/utils/BlockGen/Inputs/Dropdown";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import Warning from "$lib/utils/BlockGen/Warnings/Warning";
import rgbToHex from "$lib/utils/helpers/rgbToHex";
import StatementInput from "$lib/utils/BlockGen/Inputs/StatementInput";

import { Order } from "blockly/javascript";

const blocks: BlockDefinition[] = [
    {   
        id: "is_equal",
        text: "{a} {is equal to} {b}",
        args: [
            new ValueInput("A", BlockType.Any),
            new Dropdown("CONDITION", DropdownType.Auto, {"=": "==", "≠": "!=", "<":"<>", "≤": "<=", ">": ">", "≥": ">=", "==": "==="}),
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
            return [`${args.A} ${args.CONDITION} ${args.B}`, Order.NONE]
        }
    },
    {
        id: "and_or",
        text: "{a} {and} {b}",
        args: [
            new ValueInput("A", BlockType.Boolean),
            new Dropdown("CONDITION", DropdownType.Auto, {"and": "&&", "or": "||"}),
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
            return [`${args.A} ${args.CONDITION} ${args.B}`, Order.NONE]
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
    },
    {
        id: "values",
        text: "{INPUT}",
        args: [
            new Dropdown("INPUT", DropdownType.Auto, {"true": "true", "false": "false", "null": "null", "undefined": "undefined"})
        ],
        shape: BlockShape.Floating,
        output: BlockType.Any,
        inline: true,
        colour: rgbToHex(91,128,165),
        tooltip: "",
        helpUrl: "",
        code: (args) => {
            return [`${args.INPUT}`, Order.NONE]
        }
    },
    {
        id: "ternary",
        text: "test {condition} on true {onTrue} on false {onFalse}",
        args: [
            new ValueInput("condition", BlockType.Boolean),
            new ValueInput("onTrue", BlockType.Any),
            new ValueInput("onFalse", BlockType.Any),
        ],
        warnings: [
            new Warning(WarningType.Input, "condition"),
            new Warning(WarningType.Input, "onTrue"),
            new Warning(WarningType.Input, "onFalse")
        ],
        shape: BlockShape.Floating,
        output: BlockType.Any,
        inline: false,
        colour: rgbToHex(91,128,165),
        tooltip: "",
        helpUrl: "",
        code: (args) => {
            return [`${args.condition} ? ${args.onTrue} : ${args.onFalse}`, Order.NONE]
        }
    },
    {
        id: "typeof",
        text: "typeof {operand}",
        args: [
            new ValueInput("operand", BlockType.Any)
        ],
        warnings: [
            new Warning(WarningType.Input, "operand")
        ],
        shape: BlockShape.Floating,
        output: BlockType.String,
        inline: true,
        colour: rgbToHex(91,128,165),
        tooltip: "",
        helpUrl: "",
        code: (args) => {
            return [`typeof ${args.operand}`, Order.NONE]
        }
    },
    {
        id: "typeof_is",
        text: "typeof {operand} is {type}",
        args: [
            new ValueInput("operand", BlockType.Any),
            new Dropdown("type", DropdownType.Auto, {"string": "string", "number": "number", "boolean": "boolean", "array": "array", "object": "object", "function": "function", "null": "null", "undefined": "undefined"})
        ],
        warnings: [
            new Warning(WarningType.Input, "operand"),
            new Warning(WarningType.Input, "type")
        ],
        shape: BlockShape.Bottom,
        output: BlockType.Boolean,
        inline: true,
        colour: rgbToHex(91,128,165),
        tooltip: "",
        helpUrl: "",
        code: (args) => {
            return [`typeof ${args.operand} === "${args.type}"`, Order.NONE]
        }
    },
    {
        id: "stop_script",
        text: "stop script",
        shape: BlockShape.Bottom,
        inline: true,
        colour: rgbToHex(165,91,153),
        tooltip: "",
        helpUrl: "",
        code: (args) => {
            return "return;"
        }
    },
]

const category: CategoryDefinition = {
    name: "Logic",
    colour: rgbToHex(91,128,165)
}

export default {blocks, category}