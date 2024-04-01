import { BlockShape, BlockType, WarningType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/types/BlockDefinition";
import type { CategoryDefinition } from "$lib/types/CategoryDefinition";
import StatementInput from "$lib/utils/BlockGen/Inputs/StatementInput";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import AssemblerMutator from "$lib/utils/BlockGen/Mutators/AssemblerMutator";
import Warning from "$lib/utils/BlockGen/Warnings/Warning";
import rgbToHex from "$lib/utils/helpers/rgbToHex";

const blocks: BlockDefinition[] = [
    {
        label: true,
        text: "All the mutator blocks will be displayed here!"
    },
    {
        id: "test_item",
        text: "list thing",
        shape: BlockShape.Action,
        inline: true,
        colour: rgbToHex(91,128,165),
        tooltip: "Returns the opposite of the input",
        helpUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
        code: () => {
            return "bob"
        },
        hidden: true
    },
    {
        id: "test_item2",
        text: "list thing 2",
        shape: BlockShape.Action,
        inline: true,
        colour: rgbToHex(91,128,165),
        tooltip: "Returns the opposite of the input",
        helpUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
        code: () => {
            return "bob"
        },
        hidden: true
    },
    {
        id: "not_mutator",
        text: "not {operand}",
        args: [
            new ValueInput("operand", BlockType.Boolean)
        ],
        warnings: [
            new Warning(WarningType.Input, "operand")
        ],
        shape: BlockShape.Action,
        inline: true,
        colour: rgbToHex(91,128,165),
        tooltip: "Returns the opposite of the input",
        helpUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
        code: (args) => {
            return `!${args.operand}`
        },
        mutator: new AssemblerMutator("Not content",[{
            block: "test_item",
            adds: [new ValueInput("bob", BlockType.Any)],
            once: true
        },
        {
            block: "test_item2",
            adds: [new StatementInput("bob")],
            once: true
        }])
    }
]

const category: CategoryDefinition = {
    name: "Mutators",
    colour: "#db5c53"
}

export default {blocks, category}