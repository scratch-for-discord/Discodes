import { BlockShape, BlockType, DropdownType, WarningType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/types/BlockDefinition";
import type { CategoryDefinition } from "$lib/types/CategoryDefinition";
import Dropdown from "$lib/utils/BlockGen/Inputs/Dropdown";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import Warning from "$lib/utils/BlockGen/Warnings/Warning";
import rgbToHex from "$lib/utils/helpers/rgbToHex";
import CheckboxMutator from "$lib/utils/BlockGen/Mutators/CheckboxMutator";
import Blockly from "blockly"
/*
Logic category is finished.
*/
const blocks: BlockDefinition[] = [
	{
		id: "create_embed",
		text: "Create embed\n",
		shape: BlockShape.Value,
		inline: false,
		colour: rgbToHex(91, 128, 165),
		tooltip: "Creates an embed",
        output: BlockType.DiscordEmbed,
		helpUrl: "",
		code: (args) => {
			return "";
		},
        mutator: new CheckboxMutator(
			"Create embed",
			[
                {
                    "text": "Title",
                    "inputName": "title",
                    "adds": [new ValueInput("title", BlockType.String).setField("Title")],
                    "defaultValue": true
                },
                {
                    "text": "Description",
                    "inputName": "description",
                    "adds": [new ValueInput("description", BlockType.String).setField("Description")],
                    "defaultValue": true
                },
                {
                    "text": "Fields",
                    "inputName": "fields",
                    "adds": [new ValueInput("fields", [BlockType.Array, BlockType.DiscordAPIEmbedField]).setField("Fields")],
                    "defaultValue": false
                },
                {
                    "text": "Color",
                    "inputName": "color",
                    "adds": [new ValueInput("color", BlockType.Number).setField("Color")],
                    "defaultValue": false
                },
                {
                    "text": "Author",
                    "inputName": "author",
                    "adds": [new ValueInput("author", BlockType.DiscordEmbedAuthorData).setField("Author")],
                    "defaultValue": false
                },
                {
                    "text": "Footer",
                    "inputName": "footer",
                    "adds": [new ValueInput("footer", BlockType.DiscordEmbedFooterData).setField("Footer")],
                    "defaultValue": false
                },
                {
                    "text": "Thumbnail",
                    "inputName": "thumbnail",
                    "adds": [new ValueInput("thumbnail", BlockType.DiscordAssetData).setField("Thumbnail")],
                    "defaultValue": false
                },
                {
                    "text": "Image",
                    "inputName": "image",
                    "adds": [new ValueInput("image", BlockType.Any).setField("Image")],
                    "defaultValue": false
                },
                {
                    "text": "Timestamp",
                    "inputName": "timestamp",
                    "adds": [new ValueInput("timestamp", [BlockType.String, BlockType.Number, BlockType.Date]).setField("Timestamp")],
                    "defaultValue": false
                },
                {
                    "text": "URL",
                    "inputName": "url",
                    "adds": [new ValueInput("url", BlockType.String).setField("URL")],
                    "defaultValue": false
                },
                {
                    "text": "Video",
                    "inputName": "video",
                    "adds": [new ValueInput("video", BlockType.DiscordAssetData).setField("Video")],
                    "defaultValue": false
                },
                {
                    "text": "Provider",
                    "inputName": "provider",
                    "adds": [new ValueInput("provider", BlockType.DiscordAPIEmbedProvider).setField("Provider")],
                    "defaultValue": false
                }
            ],
            
			{
				alignInputs: Blockly.inputs.Align.RIGHT,
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

			return (args.A == '' || args.B == '')? `false ${args.CONDITION} false` : `${args.A} ${args.CONDITION} ${args.B}`;
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
	}
];

const category: CategoryDefinition = {
	name: "Embed",
	colour: rgbToHex(91, 128, 165)
};

export default { blocks, category };
