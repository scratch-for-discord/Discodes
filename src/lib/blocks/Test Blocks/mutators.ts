import { BlockShape, BlockType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/types/BlockDefinition";
import type { CategoryDefinition } from "$lib/types/CategoryDefinition";
import StatementInput from "$lib/utils/BlockGen/Inputs/StatementInput";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";

import rgbToHex from "$lib/utils/helpers/rgbToHex";
import CheckboxMutator from "$lib/utils/BlockGen/Mutators/CheckboxMutator";

const blocks: BlockDefinition[] = [
	{
		label: true,
		text: "All the mutator blocks will be displayed here!"
	},
	{
		id: "test_item",
		text: "list thing",
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Returns the opposite of the input",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
		code: () => {
			return "bob";
		},
		hidden: true
	},
	{
		id: "if_test",
		text: "else if",
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Returns the opposite of the input",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
		code: () => {
			return "bob";
		},

		hidden: true
	},
	{
		id: "else_test",
		text: "else",
		shape: BlockShape.Bottom,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Returns the opposite of the input",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
		code: () => {
			return "bob";
		},
		hidden: true
	},
	// {
	// 	id: "not_mutator",
	// 	text: "not {operand}",
	// 	args: [new ValueInput("operand", BlockType.Boolean)],
	// 	warnings: [new Warning(WarningType.Input, "operand")],
	// 	shape: BlockShape.Action,
	// 	inline: true,
	// 	colour: rgbToHex(91, 128, 165),
	// 	tooltip: "Returns the opposite of the input",
	// 	helpUrl:
	// 		"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
	// 	code: (args) => {
	// 		return `!${args.operand}`;
	// 	},
	// 	mutator: new AssemblerMutator("Not content", [
	// 		{
	// 			block: "if_test",
	// 			adds: [new ValueInput("elseIf", BlockType.Any)],
	// 			once: true
	// 		},
	// 		{
	// 			block: "else_test",
	// 			adds: [new StatementInput("ifThing")],
	// 			once: true
	// 		}
	// 	])
	// },

	{
		id: "checkbox_mutator",
		text: "checkbox mutator\n",
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Returns the opposite of the input",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
		code: (args) => {
			return `${args}`;
		},
		mutator: new CheckboxMutator(
			"hello",
			[
				{
					text: "input 1",
					inputName: "if_test",
					adds: [
						new ValueInput("if_input", BlockType.Boolean).setField("else if"),
						new StatementInput("if_statement").setField("do")
					],
					defaultValue: true
				},
				{
					text: "input 2",
					inputName: "else_test",
					adds: [new StatementInput("else_input").setField("else")],
					defaultValue: false
				}
			],
			{
				color: rgbToHex(91, 128, 165)
			}
		)
	}
];

const category: CategoryDefinition = {
	name: "Mutators",
	colour: "#db5c53"
};

export default { blocks, category };
