import { BlockShape } from "$lib/enums/BlockTypes"
import type { BlockDefinition } from "$lib/interfaces/BlockDefinition"

import type { CategoryDefinition } from "$lib/interfaces/CategoryDefinition"
import StatementInput from "$lib/utils/BlockGen/Inputs/StatementInput"

const blocks: Array<BlockDefinition> = [
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
    name: "Parent is bob",
    colour: "#f05555"
}

export default { blocks, category }