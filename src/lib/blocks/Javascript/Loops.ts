import { BlockShape, BlockType, DropdownType, PlaceholderType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/types/BlockDefinition";
import type { CategoryDefinition } from "$lib/types/CategoryDefinition";
import DropdownInput from "$lib/utils/BlockGen/Inputs/Dropdown";
import StatementInput from "$lib/utils/BlockGen/Inputs/StatementInput";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import VariableInput from "$lib/utils/BlockGen/Inputs/VariableInput";
import rgbToHex from "$lib/utils/helpers/rgbToHex";
import salt from "$lib/utils/helpers/salt";
import Placeholder from "$lib/utils/ToolboxGen/Placeholder";

const blocks: BlockDefinition[] = [
	{
		id: "repeat_x_times",
		text: "Repeat {VALUE} times \n {INPUT}",
		args: [new ValueInput("VALUE", BlockType.Number), new StatementInput("INPUT")],
		placeholders: [new Placeholder(PlaceholderType.Block, "VALUE", "number", {NUMBER: 10}, true)],
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 165, 91),
		tooltip: "Repeats the code inside the given ammount of times.",
		helpUrl: "",
		code: (args) => {
			return `for (let i = 0; i < ${args.VALUE === "" ? "0" : args.VALUE}; i++) {\n${args.INPUT === "" ? "" : args.INPUT}\n}\n`;
		}
	},
	{
		id: "repeat_while",
		text: "Repeat {WHILE} {CONDITION}\n {INPUT}",
		args: [
			new DropdownInput("WHILE", DropdownType.Auto, {
				while: "while",
				until: "until"
			}),
			new ValueInput("CONDITION", BlockType.Boolean),
			new StatementInput("INPUT")
		],
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 165, 91),
		tooltip: "Repeats the code inside until/while the condition is met.",
		helpUrl: "",
		code: (args) => {
			return `while (${args.WHILE === "while" ? "" : "!"}${args.CONDITION === "" ? "false" : args.CONDITION}) {\n${args.INPUT === "" ? "" : args.INPUT}\n}\n`;
		}
	},
	
	{

		id: "for_loop",
		text: "For {VARIABLE} from {START} to {END} by {STEP}\n {INPUT}",
		args: [
			new VariableInput("VARIABLE", "i"),
			new ValueInput("START", BlockType.Number),
			new ValueInput("END", BlockType.Number),
			new ValueInput("STEP", BlockType.Number),
			new StatementInput("INPUT")
		],
		placeholders: [
			new Placeholder(PlaceholderType.Block, "START", "number", {NUMBER:1}),
			new Placeholder(PlaceholderType.Block, "END", "number", {NUMBER:10}),
			new Placeholder(PlaceholderType.Block, "STEP", "number", {NUMBER:1}),
		],
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 165, 91),
		tooltip: "For loop",
		helpUrl: "",
		code: (args) => {
			const variable = `let ${args.VARIABLE} =${args.START === "" ? "0" : args.START}`;
			const condition = `${args.VARIABLE} < ${args.END === "" ? "0" : args.END}`;
			const step = `${args.VARIABLE} += ${args.STEP === "" ? "0" : args.STEP}}`;
			if (args.VARIABLE === "") {
				const varName = salt(10);
				return `for(let vk${varName} = 0; false; vk${varName}+= 0) {}`;
			}
			return `for (${variable}; ${condition}; ${step}) {\n${args.INPUT}\n}\n`;
		}
	},
	{
		id: "array_iteration",
		text: "For each item {ITEM} in list {ARRAY}\n {INPUT}",
		args: [
			new VariableInput("ITEM", "i"),

			new ValueInput("ARRAY", BlockType.Array),
			new StatementInput("INPUT")
		],
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 165, 91),
		tooltip: "Loops throught every item of the given array.",
		helpUrl: "",
		code: (args) => {
			return `for (let ${args.ITEM} of ${args.ARRAY === ""? "[]" : args.ARRAY}) {\n${args.INPUT}\n}\n`;
		}
	},
	{
		id: "break",
		text: "{ACTION} of loop",
		args: [
			new DropdownInput("ACTION", DropdownType.Auto, {
				break: "break",
				continue: "continue"
			})
		],
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 165, 91),
		tooltip: "Breaks out of a loop.",
		helpUrl: "",
		code: (args) => {
			return `${args.ACTION};`;
		}
	}
];

const category: CategoryDefinition = {
	name: "Loops",
	colour: rgbToHex(91, 165, 91)
};
export default { blocks, category };
