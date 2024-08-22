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
/*
Logic category is finished.
*/
const blocks: BlockDefinition[] = [
	{
		id: "if_block",
		text: "if {if_input} {if}",
		args: [new ValueInput("if_input", BlockType.Boolean), new StatementInput("if")],
		warnings: [

			new Warning(WarningType.Input, {

				fieldName: "if_input"
			})
		],
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Runs the code inside if the condition is met!",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
		code: (args) => {
			console.log(args)
			let code = `if(${args.if_input === "" ? "false" : args.if_input}) {\n${args.if}\n}`;
			const ifInputs = args.if_input_list as string[];
			const ifStatementInputs = args.if_statement_list as string[];
			const else_input = args.else_input_list as string[]
			for (let i = 0; i < ifInputs.length; i++) {
				const ifInp = ifInputs[i];
				code += ` else if(${ifInp === "" ? "false" : ifInp}) {\n${ifStatementInputs[i]}\n}`;
			}
			if(else_input.length !== 0) code += ` else {\n${else_input}\n}`
			return code;
		},
		mutator: new AssemblerMutatorV2(
			"If",
			[
				{
					block: "if_test",
					adds: [
						new ValueInput("if_input", BlockType.Boolean).setField("else if"),
						new StatementInput("if_statement").setField("do")
					],
					once: true
				},
				{
					block: "else_test",
					adds: [new StatementInput("else_input").setField("else")],
					once: true
				}
			],
			{
				color: rgbToHex(91, 128, 165)
			}
		)
	},
	{
		id: "is_equal",
		text: "{A} {CONDITION} {B}",
		args: [
			new ValueInput("A", BlockType.Any),
			new Dropdown("CONDITION", DropdownType.Auto, {
				"=": "===",//Based on research better to use "===", but it can always be changed
				"≠": "!=",
				"<": "<",
				"≤": "<=",
				">": ">",
				"≥": ">="
				//"==": "==="
			}),
			new ValueInput("B", BlockType.Any)
		],
		warnings: [
			new Warning(WarningType.Input, { fieldName: "A" }),
			new Warning(WarningType.Input, { fieldName: "B" })
		],
		shape: BlockShape.Floating,
		output: BlockType.Boolean,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Checks if the first input and the second input validate the condition.",
		helpUrl: "https://www.w3schools.com/js/js_comparisons.asp",
		//code: (args) => {
		//  if(args.A === "" || args.B === "") return "false";
		//  return `${args.A} ${args.CONDITION} ${args.B}`;

		code: (args, block) => {
			block.colour = rgbToHex(255, 128, 165);
			block.outputType = BlockType.Any;
			block.addInput(new Dropdown("bob", DropdownType.Auto, { bob: "hello", alex: "nikola" }));
			block.addInput(new ValueInput("chicken", BlockType.Any));
			block.addInput(new NumberInput("numberrr", 50, { max: 100, min: 50, precision: 10 }));
			block.addInput(new TextInput("textttt", "I am a text input!"));
			console.log("Args (code prop parameter): ", args);
			return `${args.textttt}`;
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
		warnings: [
			new Warning(WarningType.Input, { fieldName: "A" }),
			new Warning(WarningType.Input, { fieldName: "B" })
		],
		shape: BlockShape.Floating,
		output: BlockType.Boolean,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Checks if the first input and the second input validate the condition.",
		helpUrl: "",
		code: (args) => {
			if (args.A === "" || args.B === "") return "false";

			return `${args.A} ${args.CONDITION} ${args.B}`;
		}
	},
	{
		id: "not",
		text: "not {OPERAND}",
		args: [new ValueInput("OPERAND", BlockType.Boolean)],
		warnings: [new Warning(WarningType.Input, { fieldName: "OPERAND" })],
		shape: BlockShape.Floating,
		output: BlockType.Boolean,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Returns the opposite of the input",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
		code: (args) => {
			if (args.OPERAND === "") return "false";

			return `!${args.OPERAND}`;
		}
	},
	{
		id: "booleans",
		text: "{INPUT}",
		args: [
			new Dropdown("INPUT", DropdownType.Auto, {
				true: "true",
				false: "false",
				//undefined: "undefined"
			})
		],
		shape: BlockShape.Floating,
		output: BlockType.Boolean,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Boolean values used to verify conditions.",
		helpUrl: "",
		code: (args) => {
			return `${args.INPUT !== "" ? args.INPUT : "null"}`;
		}
	},
	{
		id: "null",
		text: "null",

		shape: BlockShape.Floating,
		output: BlockType.Any,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Null values used to check null conditions.",
		helpUrl: "",
		code: (args) => {
			return `null`;
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
			new Warning(WarningType.Input, { fieldName: "CONDITION" }),
			new Warning(WarningType.Input, { fieldName: "ONTRUE" }),
			new Warning(WarningType.Input, { fieldName: "ONFALSE" })
		],
		shape: BlockShape.Floating,
		output: BlockType.Any,
		inline: false,
		colour: rgbToHex(91, 128, 165),
		tooltip: "JavaScript ternary operator.",
		helpUrl: "",
		code: (args) => {
			return `${args.CONDITION} ? ${args.ONTRUE} : ${args.ONFALSE}`;
		}
	},
	{
		id: "typeof",
		text: "typeof {OPERAND}",
		args: [new ValueInput("OPERAND", BlockType.Any)],
		warnings: [new Warning(WarningType.Input, { fieldName: "OPERAND" })],
		shape: BlockShape.Floating,
		output: BlockType.String,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Gives the type of the input.",
		helpUrl: "",
		code: (args) => {
			if (args.OPERAND === "") return "null";
			return `typeof ${args.OPERAND}`;
		}
	},
	{
		id: "types",
		text: "type {TYPE}",
		args: [
			// new ValueInput("OPERAND", BlockType.Any),
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
		warnings: [
			// new Warning(WarningType.Input, { fieldName: "OPERAND" }),
			new Warning(WarningType.Input, { fieldName: "TYPE" })
		],
		shape: BlockShape.Bottom,
		output: BlockType.Boolean,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "A colletion of all JavaScript base types.",
		helpUrl: "",
		code: (args) => {
			return `"${args.TYPE}"`;
		}
	},
	{
		id: "stop_script",
		text: "Stop script",
		shape: BlockShape.Bottom,
		inline: true,
		colour: rgbToHex(165, 91, 153),
		tooltip: "Stops the script, cannot have any blocks under it.",
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
