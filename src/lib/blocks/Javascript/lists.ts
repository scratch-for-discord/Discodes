import { BlockShape, BlockType, DropdownType, WarningType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/types/BlockDefinition";
import type { CategoryDefinition } from "$lib/types/CategoryDefinition";
import Dropdown from "$lib/utils/BlockGen/Inputs/Dropdown";
import NumberInput from "$lib/utils/BlockGen/Inputs/NumberInput";
import TextInput from "$lib/utils/BlockGen/Inputs/TextInput";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import Warning from "$lib/utils/BlockGen/Warnings/Warning";
import rgbToHex from "$lib/utils/helpers/rgbToHex";
import StatementInput from "$lib/utils/BlockGen/Inputs/StatementInput";
import AssemblerMutatorV2 from "$lib/utils/BlockGen/Mutators/AssemblerMutator";

const blocks: BlockDefinition[] = [
	{
		id: "create_list",
		text: "create list with",
		args: [],
		shape: BlockShape.Floating,
		output: BlockType.String,
		inline: false,
		colour: rgbToHex(116, 91, 165),
		tooltip: "Creates lists with dynamic content",
		helpUrl: "",
		code: (args) => {
			return `[${args.list_content}]`;
		},
		mutator: new AssemblerMutatorV2("Add Content", [
			{
				block: "list_content",
				adds: [new ValueInput("list_content", BlockType.Any)],
				once: true
			}
		])
	},
    {
		id: "list_content",
		text: "list {CONTENT}",
		args: [new ValueInput("CONTENT", BlockType.String)],
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(116, 91, 165),
		tooltip: "",
		helpUrl: "",
		code: (args) => {
			return `${args.CONTENT ? args.CONTENT : ""}`;
		},
		hidden: true
	},
    {
        id: "length_of_list",
        text: "{DROPDOWN} {LIST}",
        args: [
            new Dropdown("DROPDOWN", DropdownType.List, {
                "length of": "length",
                "reverse": "reverse"
            }),
            new ValueInput("LIST", BlockType.Array)
        ],
        shape: BlockShape.Floating,
        output: BlockType.Number,
        inline: true,
        colour: rgbToHex(116, 91, 165),
        tooltip: "Returns the length of the list.",
        helpUrl: "",
        code: (args) => {
            switch (args.DROPDOWN) {
                case "length":
                    return `${args.LIST}.length`;
                case "reverse":
                    return `${args.LIST}.reverse()`;
                default:
                    return "";
            }
        }
    },
    {
        id: "create_list_with_item_repeated",
        text: "create list with item {ITEM} repeated {TIMES} times",
        args: [
            new ValueInput("ITEM", BlockType.Any),
            new NumberInput("TIMES", 1, { min: 1 })
        ],
        shape: BlockShape.Floating,
        output: BlockType.Array,
        inline: true,
        colour: rgbToHex(116, 91, 165),
        tooltip: "Creates a list with the specified item repeated the specified number of times.",
        helpUrl: "",
        code: (args) => {
            const item = args.ITEM;
            const times = args.TIMES;
            const list = new Array(times).fill(item);
            return `[${list.join(", ")}]`;
        }
    },
    {
        id: "lists_booleans",
        text: " {LIST} {DROPDOWN}",
        args: [
            new ValueInput("LIST", BlockType.Array),
            new Dropdown("DROPDOWN", DropdownType.List, {
                "is empty": "isEmpty",
                "contains": "contains"
            }),
        ],
        shape: BlockShape.Floating,
        output: BlockType.Boolean,
        inline: true,
        colour: rgbToHex(116, 91, 165),
        tooltip: "Checks if the list is empty.",
        helpUrl: "",
        code: (args, block) => {
            switch (args.DROPDOWN) {
                case "isEmpty":
                    block.removeInput("ITEM");
                    return `${args.LIST}.length === 0`;
                case "contains":
                    block.addInput(new ValueInput("ITEM", BlockType.Any));
                    return `${args.LIST}.includes(${args.ITEM})`;     
                default:
                    return "";
            }
        }
    },
    {
        id: "sort_list",
        text: "sort {LIST} in {ORDER}",
        args: [
            new ValueInput("LIST", BlockType.Array),
            new Dropdown("ORDER", DropdownType.Auto, {
                "ascending numeric": "asc_num",
                "descending numeric": "desc_num",
                "ascending alphabetic": "asc_alpha",
                "descending alphabetic": "desc_alpha",
            })
        ],
        shape: BlockShape.Floating,
        output: BlockType.Array,
        inline: true,
        colour: rgbToHex(116, 91, 165),
        tooltip: "Sorts the list in the specified order.",
        helpUrl: "",
        code: (args) => {
            const order = args.ORDER;
            let comparator;
            switch (order) {
                case "asc_num":
                    comparator = (a, b) => a - b;
                    break;
                case "desc_num":
                    comparator = (a, b) => b - a;
                    break;
                case "asc_alpha":
                    comparator = (a, b) => a.localeCompare(b);
                    break;
                case "desc_alpha":
                    comparator = (a, b) => b.localeCompare(a);
                    break;
                default:
                    comparator = undefined;
            }
            if (comparator) {
                return `${args.LIST}.slice().sort(${comparator})`;
            } else {
                return args.LIST;
            }
        }
    },
    {
        id: "push_to_list",
        text: "{DROPDOWN} {ITEM} to {LIST}",
        args: [
            new Dropdown("DROPDOWN", DropdownType.List, {
                "push": "push",
                "merge": "concat"
            }),
            new ValueInput("ITEM", BlockType.Any),
            new ValueInput("LIST", BlockType.Array)
        ],
        shape: BlockShape.Action,
        inline: true,
        colour: rgbToHex(116, 91, 165),
        tooltip: "Adds the item to the list.",
        helpUrl: "",
        code: (args, block) => {
            return `${args.LIST}.${args.DROPDOWN}(${args.ITEM})`;
        }
    },
    // {
    //     id: "merge_lists",
    //     text: "merge {LIST1} and {LIST2}",
    //     args: [
    //         new ValueInput("LIST1", BlockType.Array),
    //         new ValueInput("LIST2", BlockType.Array)
    //     ],
    //     shape: BlockShape.Floating,
    //     output: BlockType.Array,
    //     inline: true,
    //     colour: rgbToHex(116, 91, 165),
    //     tooltip: "Merges the two lists.",
    //     helpUrl: "",
    //     code: (args) => {
    //         return `${args.LIST1}.concat(${args.LIST2})`;
    //     }
    // },
    {
        id: "filter_list",
        text: "{FUNCTION} {LIST} as {VALUE} by {CONDITION}",
        args: [
            new Dropdown("FUNCTION", DropdownType.Auto, {
                "filter": "filter",
                "map": "map"
            }),
            new ValueInput("LIST", BlockType.Array),
            new ValueInput("VALUE", BlockType.Any),
            new ValueInput("CONDITION", BlockType.Any)
        ],
        shape: BlockShape.Floating,
        output: BlockType.Array,
        inline: true,
        colour: rgbToHex(116, 91, 165),
        tooltip: "Filters the list based on the condition.",
        helpUrl: "",
        code: (args) => {
            return `${args.LIST}.${args.FUNCTION}(${args.VALUE} => ${args.CONDITION})`;
        }
    }
];

const category: CategoryDefinition = {
    name: "Lists",
    colour: rgbToHex(116, 91, 165)
};

export default { blocks, category };
