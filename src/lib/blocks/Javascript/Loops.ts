import { BlockShape, BlockType, WarningType, DropdownType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/interfaces/BlockDefinition";
import type { CategoryDefinition } from "$lib/interfaces/CategoryDefinition";
import Dropdown from "$lib/utils/BlockGen/Inputs/Dropdown";
import StatementInput from "$lib/utils/BlockGen/Inputs/StatementInput";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import Warning from "$lib/utils/BlockGen/Warnings/Warning";
import rgbToHex from "$lib/utils/helpers/rgbToHex";
import { Order } from "blockly/javascript";


const blocks: BlockDefinition[] = [
    {
        id: "repeat_x_times",
        text: "Repeat {value} times \n {input}",
        args: [
            new ValueInput("value", BlockType.Number),
            new StatementInput("input")
        ],
        shape: BlockShape.Action,
        inline: true,
        colour: rgbToHex(91, 165, 91),
        tooltip: "Repeat x times",
        helpUrl: "",
        code: (args) => {
            return `for (let i = 0; i < ${args.value}; i++) {\n${args.input}\n}`
        },
    },
    {
        id: "repeat_while",
        text: "Repeat {while} {condition}\n {input}",
        args: [
            new Dropdown("while", DropdownType.Auto, {
                "while": "while",
                "until": "until"
            }),
            new ValueInput("condition", BlockType.Boolean),
            new StatementInput("input")
        ],
        shape: BlockShape.Action,
        inline: true,
        colour: rgbToHex(91, 165, 91),
        tooltip: "Repeat while",
        helpUrl: "",
        code: (args) => {
            return `${args.while} (${args.condition}){\n${args.input}\n}`
        },
    },
    {
        id: "for_loop",
        text: "For {variable} from {start} to {end} step {step}\n {input}",
        args: [
            new ValueInput("variable", BlockType.String),
            new ValueInput("start", BlockType.Number),
            new ValueInput("end", BlockType.Number),
            new ValueInput("step", BlockType.Number),
            new StatementInput("input")
        ],
        shape: BlockShape.Action,
        inline: true,
        colour: rgbToHex(91, 165, 91),
        tooltip: "For loop",
        helpUrl: "",
        code: (args) => {
            return `for (let ${args.variable} = ${args.start}; ${args.variable} < ${args.end}; ${args.variable} += ${args.step}) {\n${args.input}\n}`
        },
    },
    {
        id: "array_iteration",
        text: "For each {item} in {array}\n {input}",
        args: [
            new ValueInput("item", BlockType.Any),
            new ValueInput("array", BlockType.Array),
            new StatementInput("input")
        ],
        shape: BlockShape.Action,
        inline: true,
        colour: rgbToHex(91, 165, 91),
        tooltip: "Array iteration",
        helpUrl: "",
        code: (args) => {
            return `for (let ${args.item} of ${args.array}) {\n${args.input}\n}`
        },
    },
    {
        id: "break",
        text: "{action} of loop",
        args: [
            new Dropdown("action", DropdownType.Auto, {
                "break": "break",
                "continue": "continue"
            }),
        ],
        shape: BlockShape.Action,
        inline: true,
        colour: rgbToHex(91, 165, 91),
        tooltip: "Break",
        helpUrl: "",
        code: (args) => {
            return `${args.action};`
        },
    }
]

const category: CategoryDefinition = {
    name: "Loops",
    colour: rgbToHex(91, 165, 91)
}
export default {blocks, category}
