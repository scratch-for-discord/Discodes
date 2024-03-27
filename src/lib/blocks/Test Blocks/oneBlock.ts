import { BlockShape, BlockType, PlaceholderType, WarningType } from "$lib/enums/BlockTypes"
import type { BlockDefinition } from "$lib/interfaces/BlockDefinition"

import type { CategoryDefinition } from "$lib/interfaces/CategoryDefinition"
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput"
import Warning from "$lib/utils/BlockGen/Warnings/Warning"
import Placeholder from "$lib/utils/ToolboxGen/Placeholder"

const blocks: BlockDefinition[] = [
    {
        id: "test",
        text: "This is a {test} block! {bob}",
        shape: BlockShape.Action,
        args: [
            new ValueInput("testInput", BlockType.Any),
            new ValueInput("fish", BlockType.Any)
        ],
        placeholders: [
            new Placeholder(PlaceholderType.Block,"testInput", "text", {"TEXT": "Hello World"}),
            new Placeholder(PlaceholderType.Block, "fish", "math_number", {"NUM": 45})
        ],
        warnings: [
            new Warning(WarningType.Parent, "vite"),
            new Warning(WarningType.Input, "testInput"),
        ],
        inline: true,
        colour: "#db5c53",
        tooltip: "This is a test block ahha",
        helpUrl: "https://youtube.com",
        code: (args: Record<string, unknown>) => {
            return args.testInput
        }
    }
]

const category: CategoryDefinition = {
    name: "One block here",
    colour: "#ff0000"
}

export default { blocks, category }