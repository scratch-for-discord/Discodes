import { BlockShape, BlockType, DropdownType, WarningType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/types/BlockDefinition";
import type { CategoryDefinition } from "$lib/types/CategoryDefinition";
import Dropdown from "$lib/utils/BlockGen/Inputs/Dropdown";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import Warning from "$lib/utils/BlockGen/Warnings/Warning";
import rgbToHex from "$lib/utils/helpers/rgbToHex";
import StatementInput from "$lib/utils/BlockGen/Inputs/StatementInput";
import AssemblerMutatorV2 from "$lib/utils/BlockGen/Mutators/AssemblerMutatorV2";

const blocks: BlockDefinition[] = [
	{

		id: "if_block",
		text: "if {operand} {if}",
		args: [new ValueInput("operand", BlockType.Boolean), new StatementInput("if")],
		warnings: [new Warning(WarningType.Input, {
			fieldName: "operand",
		})],
		shape: BlockShape.Action,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Returns the opposite of the input",
		helpUrl:
			`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT`,
		code: (args) => {
			console.log(args)
			let code = `if(${args.operand === ""? "false" : args.operand}) {
	${args.if}
}`;
			const ifInputs = args.if_input as string[];
			const ifStatementInputs = args.if_statement as string[];

			for (let i=0; i < ifInputs.length; i++) {
				const ifInp = ifInputs[i];
				code += ` else if(${ifInp === ""? "false" : ifInp}) {
	${ifStatementInputs[i]}
}`;
			}

			return code;
		},
		mutator: new AssemblerMutatorV2("If", [
			{
				block: "if_test",
				adds: [new ValueInput("if_input", BlockType.Boolean).setField("else if"), new StatementInput("if_statement").setField("do")],
				once: true
			},
			{
				block: "else_test",
				adds: [new StatementInput("else_input").setField("else")],
				once: true
			}
		], {
			color: rgbToHex(91, 128, 165)
		})
	},
	{
		id: "is_equal",
		text: "{A} {CONDITION} {B}",
		args: [
			new ValueInput("A", BlockType.Any),
			new Dropdown("CONDITION", DropdownType.Auto, {
				"=": "===",
				"≠": "!=",
				"<": "<",
				"≤": "<=",
				">": ">",
				"≥": ">=",
				//always need to use === instead of == in js, removed this
				//because user is always going to select the first one and question the last one.
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
		code: (args) => {
			if(args.A === "" || args.B === "") return "false";
			return `${args.A} ${args.CONDITION} ${args.B}`;
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
			if(args.A === "" || args.B === "") return "false";

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
			if(args.OPERAND === "") return "false";

			return `!${args.OPERAND}`;
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
				//undefined: "undefined"
			})
		],
		shape: BlockShape.Floating,
		output: BlockType.Any ,
		inline: true,
		colour: rgbToHex(91, 128, 165),
		tooltip: "",
		helpUrl: "",
		code: (args) => {
			return `${args.INPUT !== ""? args.INPUT : "null"}`;
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
		tooltip: "",
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
		tooltip: "",
		helpUrl: "",
		code: (args) => {
			if(args.OPERAND === "") return "null";
			return `typeof ${args.OPERAND}`;
		}
	},
	{
		id: "typeof_types",
		text: "typeof types {TYPE}",
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
		tooltip: "",
		helpUrl: "",
		code: (args) => {
			return `"${args.TYPE}"`;
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
