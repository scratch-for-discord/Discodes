import { BlockShape, BlockType, DropdownType, PlaceholderType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/types/BlockDefinition";
import type { CategoryDefinition } from "$lib/types/CategoryDefinition";
import TextInput from "$lib/utils/BlockGen/Inputs/TextInput";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import Placeholder from "$lib/utils/ToolboxGen/Placeholder";
import StatementInput from "$lib/utils/BlockGen/Inputs/StatementInput";
import Dropdown from "$lib/utils/BlockGen/Inputs/Dropdown";
import AssemblerMutatorV2 from "$lib/utils/BlockGen/Mutators/AssemblerMutator";

const blocks: BlockDefinition[] = [
	{
		id: "text",
		text: "⟪{TEXT}⟫",
		args: [new TextInput("TEXT", "Hello World")],
		shape: BlockShape.Floating,
		output: BlockType.String,
		inline: true,
		colour: "#5ba58c",
		tooltip: "Allows you to make a text input.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
		code: (args) => {
			return `"${args.TEXT}"`;
		},
	},
	{
		id: "create_text_with_x",
		text: "create text with {CONTENT}",
		args: [new ValueInput("CONTENT", BlockType.String)],
		shape: BlockShape.Floating,
		output: BlockType.String,
		inline: true,
		colour: "%{BKY_TEXTS_HUE}",
		tooltip: "Creates text with dynamic content",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
		code: (args) => {
			return `new Text("${args.CONTENT}")`;
		},
		mutator: new AssemblerMutatorV2("Add Content", [
			{
				block: "text_content",
				adds: [new ValueInput("text_content", BlockType.String)],
				once: true,
			},
		]),
	},
	{
		id: "text_content",
		text: "text {TEXT_CONTENT}",
		args: [new ValueInput("TEXT_CONTENT", BlockType.String)],
		shape: BlockShape.Action,
		inline: true,
		colour: "%{BKY_TEXTS_HUE}",
		tooltip: "Text content for creating text with x",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
		code: (args) => {
			return `${args.TEXT_CONTENT}`;
		},
		hidden: true,
	},
	{
		id: "text_count",
		text: "count {INPUT} in {TEXT}",
		args: [new ValueInput("INPUT", BlockType.String), new ValueInput("TEXT", BlockType.String)],
		placeholders: [
			new Placeholder(PlaceholderType.Block, "INPUT", "text", { TEXT: "o" }),
			new Placeholder(PlaceholderType.Block, "TEXT", "text", { INPUT: "Hello World" }),
		],
		shape: BlockShape.Floating,
		output: BlockType.Number,
		inline: true,
		colour: "%{BKY_TEXTS_HUE}",
		tooltip: "Counts the occurrences of a substring in a text.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
		code: (args) => {
			return `String(${args.TEXT}).split(${args.INPUT}).length - 1`;
		},
	},
	{
		id: "text_trim",
		text: "trim spaces from {SIDE} of {TEXT}",
		args: [
			new Dropdown("SIDE", DropdownType.Auto, {
				"both sides": "trim",
				"left side": "trimLeft",
				"right side": "trimRight",
			}),
			new ValueInput("TEXT", BlockType.String),
		],
		placeholders: [
			new Placeholder(PlaceholderType.Block, "TEXT", "text", { SIDE: " Hello World " }),
		],
		shape: BlockShape.Floating,
		output: BlockType.String,
		inline: true,
		colour: "%{BKY_TEXTS_HUE}",
		tooltip: "Removes leading and trailing whitespace from a string.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim",
		code: (args) => {
			return `String(${args.TEXT}).${args.SIDE}()`;
		},
	},
	{
		id: "text_case",
		text: "tp {CASE} case of {TEXT}",
		args: [
			new Dropdown("CASE", DropdownType.Auto, {
				upper: "toUpperCase",
				lower: "toLowerCase",
				title: "toTitleCase",
			}),
			new ValueInput("TEXT", BlockType.String),
		],
		placeholders: [new Placeholder(PlaceholderType.Block, "TEXT", "text", { CASE: "abc" })],
		shape: BlockShape.Floating,
		output: BlockType.String,
		inline: true,
		colour: "%{BKY_TEXTS_HUE}",
		tooltip: "Converts the case of text.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
		code: (args) => {
			if (args.CASE === "toTitleCase") {
				return `String(${args.TEXT}).replace(/\\w\\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})`;
			}
			return `String(${args.TEXT}).${args.CASE}()`;
		},
	},
	{
		id: "text_substring",
		text: "in text {TEXT} get substring from {FROM} {INPUT1} to {TO} {INPUT2}",
		args: [
			new ValueInput("TEXT", BlockType.String),
			new Dropdown("FROM", DropdownType.Auto, {
				letter: "charAt",
				"first letter": "start",
				"last letter": "charEndAt",
				"from end": "end",
			}),
			new ValueInput("INPUT1", BlockType.Number),
			new Dropdown("TO", DropdownType.Auto, {
				letter: "charAt",
				last: "last",
				"from start letter": "substring",
				"x from end": "slice",
			}),
			new ValueInput("INPUT2", BlockType.Number),
		],
		placeholders: [
			new Placeholder(PlaceholderType.Block, "TEXT", "text", { TEXT: "hey" }),
			new Placeholder(PlaceholderType.Block, "INPUT1", "number", { NUMBER: 1 }),
			new Placeholder(PlaceholderType.Block, "INPUT2", "number", { NUMBER: 2 }),
		],
		shape: BlockShape.Floating,
		output: BlockType.String,
		inline: true,
		colour: "%{BKY_TEXTS_HUE}",
		tooltip: "Gets a substring from a text.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
		code: (args) => {
			return `String(${args.TEXT}).${args.FROM}(${args.INPUT1}, ${args.INPUT2})`; // No idea how to make this
		},
	},
	{
		id: "text_get_letter",
		text: "in text {TEXT} get {LETTER} {INPUT}",
		args: [
			new ValueInput("TEXT", BlockType.String),
			new Dropdown("LETTER", DropdownType.Auto, {
				letter: "charAt",
				"letter from end": "chatEndAt",
				first: "charStart",
				last: "charEnd",
				random: "random",
			}),
			new ValueInput("INPUT", BlockType.Number),
		],
		placeholders: [
			new Placeholder(PlaceholderType.Block, "TEXT", "text", { TEXT: "hey" }),
			new Placeholder(PlaceholderType.Block, "INPUT", "number", { NUMBER: 1 }),
		],
		shape: BlockShape.Floating,
		output: BlockType.String,
		inline: true,
		colour: "%{BKY_TEXTS_HUE}",
		tooltip: "Gets a specific letter from a text.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
		code: (args) => {
			const text = `String(${args.TEXT})`;
			switch (args.LETTER) {
				case "charAt":
					return `${text}.charAt(${args.INPUT})`;
				case "chatEndAt":
					return `${text}.slice(-${args.INPUT}).charAt(0)`;
				case "charStart":
					return `${text}.charAt(0)`;
				case "charEnd":
					return `${text}.slice(-1)`;
				case "random":
					return `${text}.charAt(Math.floor(Math.random() * ${args.INPUT}))`;
				default:
					return "";
			}
		},
	},
	{
		id: "text_find_occurrence",
		text: "in text {TEXT} find {FIRST_LAST} occurrence of item {ITEM}",
		args: [
			new ValueInput("TEXT", BlockType.String),
			new Dropdown("FIRST_LAST", DropdownType.Auto, {
				first: "indexOf",
				last: "lastIndexOf",
			}),
			new ValueInput("ITEM", BlockType.String),
		],
		placeholders: [
			new Placeholder(PlaceholderType.Block, "TEXT", "text", { TEXT: "hey hey" }),
			new Placeholder(PlaceholderType.Block, "ITEM", "text", { TEXT: "hey" }),
		],
		shape: BlockShape.Floating,
		output: BlockType.Number,
		inline: true,
		colour: "%{BKY_TEXTS_HUE}",
		tooltip: "Finds the first or last occurrence of an item in a text.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
		code: (args) => {
			const text = `String(${args.TEXT})`;
			return `${text}.${args.FIRST_LAST}(${args.ITEM})`;
		},
	},
	{
		id: "text_reverse",
		text: "reverse text {TEXT}",
		args: [new ValueInput("TEXT", BlockType.String)],
		placeholders: [new Placeholder(PlaceholderType.Block, "TEXT", "text", { TEXT: "abc" })],
		shape: BlockShape.Floating,
		output: BlockType.String,
		inline: true,
		colour: "%{BKY_TEXTS_HUE}",
		tooltip: "Reverses the given text.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
		code: (args) => {
			return `String(${args.TEXT}).split('').reverse().join('')`;
		},
	},
	{
		id: "text_is_empty",
		text: "text {TEXT} is empty?",
		args: [new ValueInput("TEXT", BlockType.String)],
		placeholders: [new Placeholder(PlaceholderType.Block, "TEXT", "text", { TEXT: "" })],
		shape: BlockShape.Floating,
		output: BlockType.Boolean,
		inline: true,
		colour: "%{BKY_TEXTS_HUE}",
		tooltip: "Checks if the given text is empty.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
		code: (args) => {
			return `String(${args.TEXT}).length === 0`;
		},
	},
	{
		id: "text_replace",
		text: "replace {INPUT} with {REPLACE} in {TEXT}",
		args: [
			new ValueInput("INPUT", BlockType.String),
			new ValueInput("REPLACE", BlockType.String),
			new ValueInput("TEXT", BlockType.String),
		],
		placeholders: [
			new Placeholder(PlaceholderType.Block, "INPUT", "text", { TEXT: "Hello" }),
			new Placeholder(PlaceholderType.Block, "REPLACE", "text", { TEXT: "Bye" }),
			new Placeholder(PlaceholderType.Block, "TEXT", "text", { TEXT: "Hello World" }),
		],
		shape: BlockShape.Floating,
		output: BlockType.String,
		inline: true,
		colour: "%{BKY_TEXTS_HUE}",
		tooltip: "Replaces occurrences of input with replace in the given text.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
		code: (args) => {
			return `String(${args.TEXT}).replace(new RegExp(${args.INPUT}, 'g'), ${args.REPLACE})`;
		},
	},
	{
		id: "text_length",
		text: "length of {TEXT}",
		args: [new ValueInput("TEXT", BlockType.String)],
		placeholders: [new Placeholder(PlaceholderType.Block, "TEXT", "text", { TEXT: "Hello World" })],
		shape: BlockShape.Floating,
		output: BlockType.Number,
		inline: true,
		colour: "%{BKY_TEXTS_HUE}",
		tooltip: "Gets the length of a text.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length",
		code: (args) => {
			return `String(${args.TEXT}).length`;
		},
	},
	{
		id: "text_starts_ends",
		text: "{TEXT} {OPTION} {OTHERTEXT}",
		args: [
			new ValueInput("TEXT", BlockType.String),
			new Dropdown("OPTION", DropdownType.Auto, {
				"starts with": "startsWith",
				"ends with": "endsWith",
				includes: "includes",
			}),
			new ValueInput("OTHERTEXT", BlockType.String),
		],
		placeholders: [
			new Placeholder(PlaceholderType.Block, "TEXT", "text", { TEXT: "abcdefg" }),
			new Placeholder(PlaceholderType.Block, "OTHERTEXT", "text", { TEXT: "abc" }),
		],
		shape: BlockShape.Floating,
		output: BlockType.Boolean,
		inline: true,
		colour: "%{BKY_TEXTS_HUE}",
		tooltip: "Checks if text starts, ends, or includes another text.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
		code: (args) => {
			return `String(${args.TEXT}).${args.OPTION}(${args.OTHERTEXT})`;
		},
	},
	{
		id: "text_newline",
		text: "new line",
		output: BlockType.String,
		shape: BlockShape.Floating,
		inline: true,
		colour: "%{BKY_TEXTS_HUE}",
		tooltip: "Represents a new line character.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
		code: () => {
			return "\\n";
		},
	},
	{
		id: "text_contains_number",
		text: "{TEXT} contains numbers ?",
		args: [new ValueInput("TEXT", BlockType.String)],
		placeholders: [new Placeholder(PlaceholderType.Block, "TEXT", "text", { TEXT: "abc123" })],
		shape: BlockShape.Floating,
		output: BlockType.Boolean,
		inline: true,
		colour: "%{BKY_TEXTS_HUE}",
		tooltip: "Checks if text contains any numbers.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
		code: (args) => {
			return `String(${args.TEXT}).match(/\\d+/g) !== null`;
		},
	},
	{
		id: "text_for_each",
		text: "for each {SELECT} in {TEXT} \n {INPUT}",
		args: [
			new Dropdown("SELECT", DropdownType.Auto, {
				character: "char",
				word: "word",
			}),
			new ValueInput("TEXT", BlockType.String),
			new StatementInput("INPUT"),
		],
		placeholders: [new Placeholder(PlaceholderType.Block, "TEXT", "text", { TEXT: "abc" })],
		shape: BlockShape.Action,
		inline: true,
		colour: "%{BKY_TEXTS_HUE}",
		tooltip: "Iterates through each character or word in the text.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
		code: (args) => {
			switch (args.SELECT) {
				case "char":
					return `for (let char_i = 0; char_i < String(${args.TEXT}).length; char_i++){\nlet char_i_char = String(${args.TEXT})[char_i] ${args.INPUT}}`;
				case "word":
					return `for (let word_i = 0; word_i < String(${args.TEXT}).split(' ').length; word_i++){\nlet word_i_word = String(${args.TEXT}).split(' ')[word_i] ${args.INPUT}}`;
				default:
					return "";
			}
		},
	},
	{
		id: "text_character",
		text: "{SELECT}",
		args: [
			new Dropdown("SELECT", DropdownType.Auto, {
				character: "char",
				word: "word",
			}),
		],
		shape: BlockShape.Floating,
		output: BlockType.String,
		inline: true,
		colour: "%{BKY_TEXTS_HUE}",
		tooltip: "Outputs the selected character or word.",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
		code: (args) => {
			switch (args.SELECT) {
				case "char":
					return "char_i_char";
				case "word":
					return "word_i_word";
				default:
					return "";
			}
		},
	},
];

const category: CategoryDefinition = {
	name: "Text",
	colour: "#5ba58c",
};

export default { blocks, category };
