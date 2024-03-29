import { BlockShape, BlockType, WarningType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/interfaces/BlockDefinition";
import type { CategoryDefinition } from "$lib/interfaces/CategoryDefinition";
import StatementInput from "$lib/utils/BlockGen/Inputs/StatementInput";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import Warning from "$lib/utils/BlockGen/Warnings/Warning";

const blocks: BlockDefinition[] = [
    {
        id: "input_warning_test",
        text: "This block has an input warning {input}",
        args: [
            new ValueInput("test", BlockType.Any)
        ],
        warnings: [
            new Warning(WarningType.Input, "test")
        ],
        shape: BlockShape.Floating,
        inline: true,
        colour: "#db5c53",
        tooltip: "This block has an input warning",
        //! Discodes documentation here in the future
        helpUrl: "",
        code: () => {
            return ""
        },
    },
    {
        id: "parent_for_warning_test",
        text: "This is the parent block\n {input}",
        args: [
            new StatementInput("test")
        ],
        shape: BlockShape.Event,
        inline: true,
        colour: "#db5c53",
        tooltip: "This is the parent block",
        //! Discodes documentation here in the future
        helpUrl: "",
        code: () => {
            return ""
        },
    },
    {
        id: "parent_warning_test",
        text: "This block has a parent warning",
        warnings: [
            new Warning(WarningType.Parent, "parent_for_warning_test")
        ],
        shape: BlockShape.Action,
        inline: true,
        colour: "#db5c53",
        tooltip: "This block needs to be put iside it's parent block",
        //! Discodes documentation here in the future
        helpUrl: "",
        code: () => {
            return ""
        },
    },
    {
        id: "permanent_warning_test",
        text: "This block has a permanent warning",
        warnings: [
            //! This kinda sucks :/ Need to fix it I guess
            new Warning(WarningType.Permanent, "any", "This is a permanent message.")
        ],
        shape: BlockShape.Floating,
        inline: true,
        colour: "#db5c53",
        tooltip: "This block has an input warning",
        //! Discodes documentation here in the future
        helpUrl: "",
        code: () => {
            return ""
        },
    },
    {
        id: "deprecated_warning_test",
        text: "This block is deprecated",
        warnings: [
            new Warning(WarningType.Deprec)
        ],
        shape: BlockShape.Floating,
        inline: true,
        colour: "#db5c53",
        tooltip: "This block is deprecated",
        //! Discodes documentation here in the future
        helpUrl: "",
        code: () => {
            return ""
        },
    }
]

const category: CategoryDefinition = {
    name: "Warnings",
    colour: "#db5c53"
}

export default {blocks, category}