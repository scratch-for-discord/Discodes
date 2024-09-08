import { BlockShape, BlockType, DropdownType, PlaceholderType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/types/BlockDefinition";
import type { CategoryDefinition } from "$lib/types/CategoryDefinition";
import Dropdown from "$lib/utils/BlockGen/Inputs/Dropdown";
import NumberInput from "$lib/utils/BlockGen/Inputs/NumberInput";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import Placeholder from "$lib/utils/ToolboxGen/Placeholder";

const blocks: BlockDefinition[] = [

	{
		id: "number",
		text: "{NUMBER}",
		args: [new NumberInput("NUMBER", 0)],
		shape: BlockShape.Floating,
		output: BlockType.Number,
		inline: true,
		colour: "#5b67a5",
		tooltip: "A simple number value.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
		code: (args) => {
			return `${args.NUMBER}`;
		}
	},
	{
		id: "operations",
		text: "{OPERAND1} {OPERATOR} {OPERAND2}",
		args: [
			new ValueInput("OPERAND1", BlockType.Number),
			new Dropdown("OPERATOR", DropdownType.Auto, {
				"+": "+",
				"-": "-",
				"*": "*",
				"/": "/",
				"%": "%",
				"^": "pow"
			}),
			new ValueInput("OPERAND2", BlockType.Number)
		],
		placeholders: [
			new Placeholder(PlaceholderType.Shadow, "OPERAND1", "number", { NUMBER: 1 }),
			new Placeholder(PlaceholderType.Shadow, "OPERAND2", "number", { NUMBER: 2 })
		],
		shape: BlockShape.Floating,
		output: BlockType.Number,
		inline: true,
		colour: "#5b67a5",
		tooltip: "Performs a binary operation on the two given inputs.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
		code: (args) => {
			if (args.OPERATOR === "pow") return `Math.pow(${args.OPERAND1}, ${args.OPERAND2})`;
			return `${args.OPERAND1} ${args.OPERATOR} ${args.OPERAND2}`;
		}
	},
	{
		id: "operations2",
		text: "{OPERATION} {NUMBER}",
		args: [
			new Dropdown("OPERATION", DropdownType.Auto, {
				"square root": "sqrt",
				absolute: "abs",
				negate: "negative",
				inverse: "inverse",
				ln: "log",
				log10: "log10",
				exp: "exp",
				sin: "sin",
				cos: "cos",
				tan: "tan",
				asin: "asin",
				acos: "acos",
				atan: "atan",
				round: "round",
				"round up": "ceil",
				"round down": "floor"
			}),
			new ValueInput("NUMBER", BlockType.Number)
		],
		placeholders: [new Placeholder(PlaceholderType.Shadow, "NUMBER", "number", { NUMBER: 1 })],
		shape: BlockShape.Floating,
		output: BlockType.Number,
		inline: true,
		colour: "#5b67a5",
		tooltip: "Perform complex math operations on a number.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
		code: (args) => {
			switch (args.OPERATION) {
				case "negate":
					return `Math.abs(${args.NUMBER}) * -1`;

				case "inverse":
					return `${args.NUMBER}) * -1`;
				case "log10":
					return `Math.log(${args.NUMBER}) / Math.log(10)`;
				case "sin":
				case "cos":
				case "tan":
				case "asin":
				case "acos":
				case "atan":
					return `(Math.(${args.OPERATION}) / Math.PI) * 180`;
				default:
					return `Math.${args.OPERATION}(${args.NUMBER})`;
			}
		}
	},
	{
		id: "constants",
		text: "{CONSTANT}",
		args: [
			new Dropdown("CONSTANT", DropdownType.Auto, {
				π: "Math.PI",
				e: "Math.E",
				ϕ: "(1 + Math.sqrt(5)) / 2",
				"√(2)": "Math.SQRT2",
				"√(½)": "Math.Math.SQRT1_2",
				"∞": "Infinity",
				NaN: "NaN"
			})
		],
		shape: BlockShape.Floating,
		output: BlockType.Number,
		inline: true,
		colour: "#5b67a5",
		tooltip: "A set of math constants.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
		code: (args) => {
			return `${args.CONSTANT}`;
		}
	},
	{
		id: "is",
		text: "{NUMBER} is {VALUE}",
		args: [
			new ValueInput("NUMBER", BlockType.Number),
			new Dropdown("VALUE", DropdownType.Auto, {
				number: "number",
				even: "even",
				odd: "odd",
				prime: "prime",
				whole: "whole",
				positive: "positive",
				negative: "negative",
				// "divisible by": "divisible" useless since modulo operator already exists
			})
		],
		placeholders: [new Placeholder(PlaceholderType.Shadow, "NUMBER", "number", { NUMBER: 1 })],
		shape: BlockShape.Floating,
		output: BlockType.Boolean,
		inline: true,
		colour: "#5b67a5",
		tooltip: "Checks if a number is even, odd, prime, whole, positive, negative, or div",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
		code: (args, block) => {

			switch (`${args.VALUE}`) {
				case "number":
					return `typeof ${args.NUMBER} === "number" && ${args.NUMBER} % 1 === 0`;
				case "even":
					return `${args.NUMBER} % 2 === 0`;
				case "odd":
					return `${args.NUMBER} % 2!== 0`;
				case "prime":
					return `isPrime(${args.NUMBER})`; /* function isPrime(number) {if (number < 2) {return false;};for (let i = 2; i <= Math.sqrt(number); i++) {if (number % i === 0) {return false;}}return true;} */
				case "whole":
					return `${args.NUMBER} % 1 === 0`;
				case "positive":
					return `${args.NUMBER} > 0`;
				case "negative":
					return `${args.NUMBER} < 0`;
				default:
					return `false`; // fix when added mutator
			}
		}
	},
	{
		id: "array_math",
		text: "{OPERATION} of list {ARRAY}",
		args: [
			new Dropdown("OPERATION", DropdownType.Auto, {
				sum: "sum",
				min: "min",
				max: "max",
				average: "average",
				median: "median",
				mode: "mode",
				range: "range",
				random: "random",
				"standard deviation": "standard deviation"
			}),
			new ValueInput("ARRAY", [BlockType.Array, BlockType.Number])
		],
		placeholders: [
		    new Placeholder(PlaceholderType.Block, "ARRAY", "create_list_custom", {})
		],
		shape: BlockShape.Floating,
		output: BlockType.Number,
		inline: true,
		colour: "#5b67a5",
		tooltip: "Performs math operations on lists.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
		code: (args) => {
			switch (args.OPERATION) {
				case "sum":
					return `${args.ARRAY}.reduce((a, b) => a + b)`;
				case "min":
					return `${args.ARRAY}.reduce((a, b) => Math.min(a, b))`;
				case "max":
					return `${args.ARRAY}.reduce((a, b) => Math.max(a, b))`;
				case "average":
					return `${args.ARRAY}.reduce((a, b) => a + b) / ${args.ARRAY}.length`;
				case "median":
					return `${args.ARRAY}.sort((a, b) => a - b).length % 2? ${args.ARRAY}.sort((a, b) => a - b)[Math.floor(${args.ARRAY}.length / 2)] : ((${args.ARRAY}.sort((a, b) => a - b)[Math.floor(${args.ARRAY}.length / 2)] + ${args.ARRAY}.sort((a, b) => a - b - 1)[Math.floor(${args.ARRAY}.length / 2)]) / 2 ))`;
				case "mode":
					return `${args.ARRAY}.sort((a, b) => a - b).length % 2`;
				case "range":
					return `${args.ARRAY}.reduce((a, b) => Math.max(a, b) - Math.min(a, b))`;
				case "random":
					return `Math.floor(Math.random() * ${args.ARRAY}.length)`;
				case "standard deviation":
					return `Math.sqrt(${args.ARRAY}.reduce((a, b) => Math.pow(a - b, 2)) / ${args.ARRAY}.length)`;
				default:
					return `Math.${args.OPERATION}(${args.ARRAY})`;
			}
		}
	},
	{
		id: "random_int",
		text: "random integer between {MIN} to {MAX}",
		args: [new ValueInput("MIN", BlockType.Number), new ValueInput("MAX", BlockType.Number)],
		placeholders: [
			new Placeholder(PlaceholderType.Shadow, "MIN", "number", { NUMBER: 1 }),
			new Placeholder(PlaceholderType.Shadow, "MAX", "number", { NUMBER: 10 })
		],
		shape: BlockShape.Floating,
		output: BlockType.Number,
		inline: true,
		colour: "#5b67a5",
		tooltip: "Generates a random number between the two given numbers.",
		helpUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
		code: (args) => {
			return `Math.floor(Math.random() * (${args.MAX} - ${args.MIN}) + ${args.MIN})`;
		}
	},
	{
		id: "random_fraction",
		text: "random fraction",
		shape: BlockShape.Floating,
		output: BlockType.Number,
		inline: true,
		colour: "#5b67a5",
		tooltip: "Generates a random fraction",
		helpUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
		code: () => {
			return "Math.random()";
		}
	},
	{
		id: "toNumber",
		text: "convert text {TEXT} to number",
		args: [new ValueInput("TEXT", BlockType.String)],
		placeholders: [new Placeholder(PlaceholderType.Shadow, "TEXT", "text", { TEXT: "123" })],
		shape: BlockShape.Floating,
		output: BlockType.Number,
		inline: true,
		colour: "#5b67a5",
		tooltip: "Converts text to a number.",
		helpUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
		code: (args) => {
			return `parseInt(${args.TEXT})`;
		}
	},
	{
		id: "constrain {VALUE} between {MIN} and {MAX}",
		text: "constrain {VALUE} between {MIN} and {MAX}",
		args: [
			new ValueInput("VALUE", BlockType.Number),
			new ValueInput("MIN", BlockType.Number),
			new ValueInput("MAX", BlockType.Number)
		],
		placeholders: [
			new Placeholder(PlaceholderType.Shadow, "VALUE", "number", { NUMBER: 50 }),
			new Placeholder(PlaceholderType.Shadow, "MIN", "number", { NUMBER: 1 }),
			new Placeholder(PlaceholderType.Shadow, "MAX", "number", { NUMBER: 100 })
		],
		shape: BlockShape.Floating,
		output: BlockType.Number,
		inline: true,
		colour: "#5b67a5",
		tooltip: "Constrains a number between two numbers.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
		code: (args) => {
			return `Math.min(Math.max(${args.VALUE}, ${args.MIN}), ${args.MAX})`;
		}
	}
	// {
	//     id: "chance {CHANCE} %",
	//     text: "{CHANCE} % chance of true",
	//     args: [
	//         new ValueInput("CHANCE", BlockType.Number)
	//     ],
	//     placeholders: [
	//         new Placeholder(PlaceholderType.Shadow, "CHANCE", "number", {NUMBER: 50})
	//     ],
	//     shape: BlockShape.Floating,
	//     output: BlockType.Boolean,
	//     inline: true,
	//     colour: "#5b67a5",
	//     tooltip: "Chances a number between two numbers.",
	//     helpUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
	//     code: (args) => {
	//         return `Math.random() * 100 < ${args.CHANCE}`
	//     }

	// }
];

const category: CategoryDefinition = {
	name: "Math",
	colour: "#5b67a5"
};

export default { blocks, category };
