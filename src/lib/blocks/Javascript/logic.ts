import { BlockShape, BlockType, DropdownType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/interfaces/BlockDefinition";
import type { CategoryDefinition } from "$lib/interfaces/CategoryDefinition";
import Dropdown from "$lib/utils/BlockGen/Inputs/Dropdown";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import rgbToHex from "$lib/utils/helpers/rgbToHex";

const blocks: BlockDefinition[] = [
    {
        id: "is_equal",
        text: "{a} {is equal to} {b}",
        args: [
            new ValueInput("A", BlockType.Any),
            new Dropdown("CONDITION", DropdownType.Auto, {"=": "EQUAL", "≠": "NOT_EQUAL"}),
            new ValueInput("B", BlockType.Any),
        ],
        shape: BlockShape.Floating,
        output: BlockType.Boolean,
        inline: true,
        colour: rgbToHex(91,128,165),
        tooltip: "Checks if the first input and the second input validate the condition.",
        helpUrl: "",
        code: (args: Record<string, unknown>) => {
            const a = args.A 
            const b = args.B 
            const dropdownValue = args.CONDITION

            let operator: string
            
            switch (dropdownValue) {
                case "EQUAL":
                    operator = "=="
                    break
                case "NOT_EQUAL":
                    operator = "!="
                    break
                default:
                    operator = "=="
                    break
            }
            return `${a} ${operator} ${b}`
        }
    }
]

const category: CategoryDefinition = {
    name: "logic",
    colour: rgbToHex(91,128,165)
}

export default {blocks, category}