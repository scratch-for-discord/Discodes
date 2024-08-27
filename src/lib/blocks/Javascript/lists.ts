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
import AssemblerMutator from "$lib/utils/BlockGen/Mutators/AssemblerMutator";
import DynamicListBlockMutator from "$lib/utils/BlockGen/Mutators/DynamicListBlockMutator";
/*
Logic category is finished.
*/
const blocks: BlockDefinition[] = [
	{
		id: "create_list",
		text: "create list with",

		shape: BlockShape.Value,
        output: BlockType.Array,
		inline: false,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Runs the code inside if the condition is met!",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
		code: (args) => {
			return "";
		},
		mutator: new DynamicListBlockMutator(
			"list",
			[
				{
					block: "new_item",
					adds: [
						new ValueInput("item", BlockType.Any).setField(""),
					],
					once: false
				},

			],
			{
				color: rgbToHex(91, 128, 165)
			}
		)
	},
	{
		id: "new_item",
		text: "list",
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "adds a list item",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
		code: () => {
			return "";
		},
		hidden: true
	},
	
];

const category: CategoryDefinition = {
	name: "Lists",
	colour: rgbToHex(91, 128, 165)
};

export default { blocks, category };
