import { BlockShape, BlockType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/interfaces/BlockDefinition";
import type { CategoryDefinition } from "$lib/interfaces/CategoryDefinition";
import TextInput from "$lib/utils/BlockGen/Inputs/TextInput";
import { Order } from "blockly/javascript";

const blocks: BlockDefinition[] = [
    {
        id: "text",
        text: "⟪{TEXT}⟫",
        args: [
            new TextInput("TEXT", "Hello World")
        ],
        shape: BlockShape.Floating,
        output: BlockType.String,
        inline: true,
        colour: "#5ba58c",
        tooltip: "Allows you to make a text input.",
        helpUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
        code: (args) => {
            return [args.TEXT, Order.NONE]
        }
    }
]

const category: CategoryDefinition = {
    name: "Text",
    colour: "#5ba58c"
}

export default {blocks, category}