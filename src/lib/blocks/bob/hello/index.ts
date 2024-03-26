import { BlockShape, BlockType, PlaceholderType } from "$lib/enums/BlockTypes"
import type { BlockDefinition } from "$lib/interfaces/BlockDefinition"

import type { CategoryDefinition } from "$lib/interfaces/CategoryDefinition"
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput"
import Placeholder from "$lib/utils/ToolboxGen/Placeholder"

const blocks: BlockDefinition[] = [
    {
        id: "test",
        text: "This is a {test} block!",
        shape: BlockShape.Action,
        args: [
            new ValueInput("testInput", BlockType.Any)
        ],
        placeholders: [
            new Placeholder("testInput",PlaceholderType.Block, "text", {"TEXT": "Hello World"})
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
    name: "Parent is Hello",
    colour: "#ff0000"
}

export default { blocks, category }