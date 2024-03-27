import { BlockType, BlockShape, DropdownType } from "$lib/enums/BlockTypes"
import type { BlockDefinition } from "$lib/interfaces/BlockDefinition"

import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput"
import Dropdown from "$lib/utils/BlockGen/Inputs/Dropdown"
import type { CategoryDefinition } from "$lib/interfaces/CategoryDefinition"
import StatementInput from "$lib/utils/BlockGen/Inputs/StatementInput"

const blocks: Array<BlockDefinition> = [
    {
        id: "insane",
        text: "This is a {test} block with a {dropdown}",
        shape: BlockShape.Floating,
        args: [
            new ValueInput("testInput", BlockType.Any),
            new Dropdown("dropdownTest", DropdownType.Auto ,{fersw: "sdfsfdsf", aa: "ddfsd", hehe: "susagain", b: "sus", r: "sussssus", c:"bobb", z:"grswgrew", rge:"rhgergh", ghrtehe:"grwge", gerwge:"rewgfewr", fgrwgf: "greg"})
        ],
        inline: true,
        colour: "#db5c53",
        tooltip: "This is a test block ahha",
        helpUrl: "https://youtube.com",
        code: (args: Record<string, unknown>) => {
            return args.testInput
        }
    },
    {
        id: "vite",
        text: "I love\n {chichen}\n but why?",
        shape: BlockShape.Event,
        args: [
            new StatementInput("chicken"),
        ],
        inline: true,
        colour: "#db5c53",
        tooltip: "This is a test block ahha",
        helpUrl: "https://youtube.com",
        code: (args: Record<string, unknown>) => {
            return args.chicken
        }
    }
]

const category: CategoryDefinition = {
    name: "Two Blocks here",
    colour: "#ff5555"
}

export default { blocks, category }