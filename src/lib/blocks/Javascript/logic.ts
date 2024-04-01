import { BlockShape, BlockType, DropdownType, WarningType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/types/BlockDefinition";
import type { CategoryDefinition } from "$lib/types/CategoryDefinition";
import Dropdown from "$lib/utils/BlockGen/Inputs/Dropdown";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import Warning from "$lib/utils/BlockGen/Warnings/Warning";
import rgbToHex from "$lib/utils/helpers/rgbToHex";

import { Order } from "blockly/javascript";

const blocks: BlockDefinition[] = [
	{
		id: "is_equal",
		text: "{A} {CONDITION} {B}",
		args: [
			new ValueInput("A", BlockType.Any),
			new Dropdown("CONDITION", DropdownType.Auto, {
				"=": "==",
				"≠": "!=",
				"<": "<",
				"≤": "<=",
				">": ">",
				"≥": ">=",
				"==": "==="
			}),
			new ValueInput("B", BlockType.Any)
		],
		warnings: [new Warning(WarningType.Input, "A"), new Warning(WarningType.Input, "B")],
		shape: BlockShape.Floating,
		output: BlockType.Boolean,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Checks if the first input and the second input validate the condition.",
		helpUrl: "https://www.w3schools.com/js/js_comparisons.asp",
		code: (args) => {
			return [`${args.A} ${args.CONDITION} ${args.B}`, Order.NONE];
		}
	},
	{
		id: "and_or",
		text: "{A} {CONDITION} {B}",
		args: [
			new ValueInput("A", BlockType.Boolean),
			new Dropdown("CONDITION", DropdownType.Auto, { and: "&&", or: "||" }),
			new ValueInput("B", BlockType.Boolean)
		],
		warnings: [new Warning(WarningType.Input, "A"), new Warning(WarningType.Input, "B")],
		shape: BlockShape.Floating,
		output: BlockType.Boolean,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Checks if the first input and the second input validate the condition.",
		helpUrl: "",
		code: (args) => {
			return [`${args.A} ${args.CONDITION} ${args.B}`, Order.NONE];
		}
	},
	{
		id: "not",
		text: "not {OPERAND}",
		args: [new ValueInput("OPERAND", BlockType.Boolean)],
		warnings: [new Warning(WarningType.Input, "OPERAND")],
		shape: BlockShape.Floating,
		output: BlockType.Boolean,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Returns the opposite of the input",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
		code: (args) => {
			return [`!${args.OPERAND}`, Order.NONE];
		}
	},
	{
		id: "values",
		text: "{INPUT}",
		args: [
			new Dropdown("INPUT", DropdownType.Auto, {
				true: "true",
				false: "false",
				null: "null",
				undefined: "undefined"
			})
		],
		shape: BlockShape.Floating,
		output: BlockType.Any,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "",
		helpUrl: "",
		code: (args) => {
			return [`${args.INPUT}`, Order.NONE];
		}
	},
	{
		id: "ternary",
		text: "test {CONDITION} on true {ONTRUE} on false {ONFALSE}",
		args: [
			new ValueInput("CONDITION", BlockType.Boolean),
			new ValueInput("ONTRUE", BlockType.Any),
			new ValueInput("ONFALSE", BlockType.Any)
		],
		warnings: [
			new Warning(WarningType.Input, "CONDITION"),
			new Warning(WarningType.Input, "ONTRUE"),
			new Warning(WarningType.Input, "ONFALSE")
		],
		shape: BlockShape.Floating,
		output: BlockType.Any,
		inline: false,
		colour: rgbToHex(91, 128, 165),
		tooltip: "",
		helpUrl: "",
		code: (args) => {
			return [`${args.CONDITION} ? ${args.ONTRUE} : ${args.ONFALSE}`, Order.NONE];
		}
	},
	{
		id: "typeof",
		text: "typeof {OPERAND}",
		args: [new ValueInput("OPERAND", BlockType.Any)],
		warnings: [new Warning(WarningType.Input, "OPERAND")],
		shape: BlockShape.Floating,
		output: BlockType.String,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "",
		helpUrl: "",
		code: (args) => {
			return [`typeof ${args.OPERAND}`, Order.NONE];
		}
	},
	{
		id: "typeof_is",
		text: "typeof {OPERAND} is {TYPE}",
		args: [
			new ValueInput("OPERAND", BlockType.Any),
			new Dropdown("TYPE", DropdownType.Auto, {
				string: "string",
				number: "number",
				boolean: "boolean",
				array: "array",
				object: "object",
				function: "function",
				null: "null",
				undefined: "undefined"
			})
		],
		warnings: [new Warning(WarningType.Input, "OPERAND"), new Warning(WarningType.Input, "TYPE")],
		shape: BlockShape.Bottom,
		output: BlockType.Boolean,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "",
		helpUrl: "",
		code: (args) => {
			return [`typeof ${args.OPERAND} === "${args.TYPE}"`, Order.NONE];
		}
	},
	{
		id: "stop_script",
		text: "stop script",
		shape: BlockShape.Bottom,
		inline: true,
		colour: rgbToHex(165, 91, 153),
		tooltip: "",
		helpUrl: "",
		code: () => {
			return "return;";
		}
	}
];

const category: CategoryDefinition = {
	name: "Logic",
	colour: rgbToHex(91, 128, 165)
};

export default { blocks, category };
