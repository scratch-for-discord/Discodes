import type { BlockShape, BlockType } from "$lib/enums/BlockTypes"
import type BaseInput from "$lib/utils/BlockGen/Inputs/BaseInput"
import type Warning from "$lib/utils/BlockGen/Warnings/Warning"
import type Placeholder from "$lib/utils/ToolboxGen/Placeholder"

export type Argument = BaseInput

export type BlockDefinition = {
    id: string // This is the "type" of the block
    label?: false // To see if the definition is a label or not
    text: string // This is "message0"
    output?: BlockType
    shape: BlockShape // The block shape
    args?: Argument[]  // This is "args0"
    warnings?: Warning[],
    placeholders?: Placeholder<unknown>[]
    inline: boolean // This is "inputsInline"
    colour: string
    tooltip: string
    helpUrl: string
    code: (args: Record<string, unknown>) => unknown
} | {
    label: true
    text: string
}
