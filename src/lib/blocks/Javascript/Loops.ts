import { BlockShape, BlockType, DropdownType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/types/BlockDefinition";
import type { CategoryDefinition } from "$lib/types/CategoryDefinition";
import Dropdown from "$lib/utils/BlockGen/Inputs/Dropdown";
import StatementInput from "$lib/utils/BlockGen/Inputs/StatementInput";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import rgbToHex from "$lib/utils/helpers/rgbToHex";
import salt from "$lib/utils/helpers/salt";

const blocks: BlockDefinition[] = [
	{
		id: "repeat_x_times",
		text: "Repeat {VALUE} times \n {INPUT}",
		args: [new ValueInput("VALUE", BlockType.Number), new StatementInput("INPUT")],
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 165, 91),
		tooltip: "Repeats the code inside the given ammount of times.",
		helpUrl: "",
		code: (args) => {
			return `for (let i = 0; i < ${args.VALUE === "" ? "0" : args.VALUE}; i++) {\n${args.INPUT === "" ? "" : args.INPUT}\n}`;
		}
	},
	{
		id: "repeat_while",
		text: "Repeat {WHILE} {CONDITION}\n {INPUT}",
		args: [
			new Dropdown("WHILE", DropdownType.Auto, {
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
			return `while (${args.WHILE === "while" ? "" : "!"}( ${args.CONDITION === "" ? "false" : args.CONDITION} )) {\n${args.INPUT === "" ? "" : args.INPUT}\n}`;
		}
	},
	{
		/**
		 * Variable blocks are needed for this to function most seamlessly
		 * */
		id: "for_loop",
		text: "For {VARIABLE} from {START} to {END} step {STEP}\n {INPUT}",
		args: [
			new ValueInput("VARIABLE", BlockType.String),
			new ValueInput("START", BlockType.Number),
			new ValueInput("END", BlockType.Number),
			new ValueInput("STEP", BlockType.Number),
			new StatementInput("INPUT")
		],
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 165, 91),
		tooltip: "For loop",
		helpUrl: "",
		code: (args) => {
			if (args.VARIABLE === "") return "";
			const variable = `let ${args.VARIABLE} =${args.START === "" ? "0" : args.START}`;
			const condition = `${args.VARIABLE} < ${args.END === "" ? "0" : args.END}`;
			const step = `${args.VARIABLE} += ${args.STEP === "" ? "0" : args.STEP}}`;
			if (args.VARIABLE === "") {
				const varName = salt(10);
				return `for(let vk${varName} = 0; false; vk${varName}+= 0) {}`;
			}
			return `for (${variable}; ${condition}; ${step}) {\n${args.INPUT}\n}`;
		}
	},
	{
		id: "array_iteration",
		text: "For each {ITEM} in {ARRAY}\n {INPUT}",
		args: [
			new ValueInput("ITEM", BlockType.Any),
			new ValueInput("ARRAY", BlockType.Array),
			new StatementInput("INPUT")
		],
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 165, 91),
		tooltip: "Loops throught every item of the given array.",
		helpUrl: "",
		code: (args) => {
			return `for (let ${args.ITEM} of ${args.ARRAY}) {\n${args.INPUT}\n}`;
		}
	},
	{
		id: "break",
		text: "{ACTION} of loop",
		args: [
			new Dropdown("ACTION", DropdownType.Auto, {
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
