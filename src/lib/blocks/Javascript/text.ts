import { BlockShape, BlockType, DropdownType, PlaceholderType } from "$lib/enums/BlockTypes";
import type { BlockDefinition } from "$lib/types/BlockDefinition";
import type { CategoryDefinition } from "$lib/types/CategoryDefinition";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import Placeholder from "$lib/utils/ToolboxGen/Placeholder";
import StatementInput from "$lib/utils/BlockGen/Inputs/StatementInput";
import Dropdown from "$lib/utils/BlockGen/Inputs/Dropdown";
import Blockly from "blockly"
import { javascriptGenerator, Order } from "blockly/javascript";
const blocks: BlockDefinition[] = [

	{
		kind: "custom_block",
		id: "text",
	},
	{
		kind: "custom_block",
		id: "text_join",
		extraState: {
			itemCount: 2
		}
	},
	{
		id: "text_count",
		text: "count {INPUT} in {TEXT}",
		args: [new ValueInput("INPUT", BlockType.String), new ValueInput("TEXT", BlockType.String)],
		placeholders: [
			new Placeholder(PlaceholderType.Block, "INPUT", "text", { TEXT: "o" }),
			new Placeholder(PlaceholderType.Block, "TEXT", "text", { INPUT: "Hello World" })
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
		}
	},
	{
		kind: "custom_block",
		id: "text_trim",
		placeholders: [
			new Placeholder(PlaceholderType.Shadow, "TEXT", "text", { TEXT: "abc" })
		]
	},
	{
		kind: "custom_block",
		id: "text_changeCase",
		placeholders: [
			new Placeholder(PlaceholderType.Shadow, "TEXT", "text", { TEXT: "abc" })
		]
	},
	{
		kind: "custom_block",
		id: "text_charAt_custom",
		placeholders: [
			new Placeholder(PlaceholderType.Block, "VALUE", "variable_get_discodes", { VAR: { name: "text" } }),


		],
		extraState: {
			at: true
		}
	},
	{
		kind: "custom_block",
		id: "text_getSubstring_custom",
		placeholders: [
			new Placeholder(PlaceholderType.Block, "STRING", "variable_get_discodes", { VAR: { name: "text" } }),


		],
	},
	{
		id: "text_find_occurrence",
		text: "in text {TEXT} find {FIRST_LAST} occurrence of item {ITEM}",
		args: [
			new ValueInput("TEXT", BlockType.String),
			new Dropdown("FIRST_LAST", DropdownType.Auto, {
				first: "indexOf",
				last: "lastIndexOf"
			}),
			new ValueInput("ITEM", BlockType.String)
		],
		placeholders: [
			new Placeholder(PlaceholderType.Block, "TEXT", "variable_get_discodes", { VAR: { name: "text" } }),
			new Placeholder(PlaceholderType.Block, "ITEM", "text", { TEXT: "hey" })
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
		}
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
		}
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
		}
	},
	{
		id: "text_replace",
		text: "in text {INPUT} replace {REPLACE} with {TEXT}",
		args: [
			new ValueInput("INPUT", BlockType.String),
			new ValueInput("REPLACE", BlockType.String),
			new ValueInput("TEXT", BlockType.String)
		],
		placeholders: [
			new Placeholder(PlaceholderType.Block, "INPUT", "text", { TEXT: "Hello" }),
			new Placeholder(PlaceholderType.Block, "REPLACE", "text", { TEXT: "Bye" }),
			new Placeholder(PlaceholderType.Block, "TEXT", "text", { TEXT: "Hello World" })
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
		}
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
		}
	},
	{
		id: "text_starts_ends",
		text: "{TEXT} {OPTION} {OTHERTEXT}",
		args: [
			new ValueInput("TEXT", BlockType.String),
			new Dropdown("OPTION", DropdownType.Auto, {
				"starts with": "startsWith",
				"ends with": "endsWith",
				includes: "includes"
			}),
			new ValueInput("OTHERTEXT", BlockType.String)
		],
		placeholders: [
			new Placeholder(PlaceholderType.Block, "TEXT", "text", { TEXT: "abcdefg" }),
			new Placeholder(PlaceholderType.Block, "OTHERTEXT", "text", { TEXT: "abc" })
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
		}
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
		}
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
		}
	},
	{
		id: "text_for_each",
		text: "for each {SELECT} in {TEXT} \n {INPUT}",
		args: [
			new Dropdown("SELECT", DropdownType.Auto, {
				character: "char",
				word: "word"
			}),
			new ValueInput("TEXT", BlockType.String),
			new StatementInput("INPUT")
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
		}
	},
	{
		id: "text_character",
		text: "{SELECT}",
		args: [
			new Dropdown("SELECT", DropdownType.Auto, {
				character: "char",
				word: "word"
			})
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
		}
	}
];

const category: CategoryDefinition = {
	name: "Text",
	colour: "#5ba58c"
};

//text_charAt Start 
function textCharAt() {
	const type = "text_charAt_custom"
	Blockly.Blocks[type] = {
		init: function (this: Blockly.Block) {
			this.jsonInit({
				'type': type,
				'message0': '%{BKY_TEXT_CHARAT_TITLE}', // "in text %1 %2"
				'args0': [
					{
						'type': 'input_value',
						'name': 'VALUE',
						'check': 'String',
					},
					{
						'type': 'field_dropdown',
						'name': 'WHERE',
						'options': [
							['%{BKY_TEXT_CHARAT_FROM_START}', 'FROM_START'],
							['%{BKY_TEXT_CHARAT_FROM_END}', 'FROM_END'],
							['%{BKY_TEXT_CHARAT_FIRST}', 'FIRST'],
							['%{BKY_TEXT_CHARAT_LAST}', 'LAST'],
							['%{BKY_TEXT_CHARAT_RANDOM}', 'RANDOM'],
						],
					},
				],
				'output': 'String',
				'style': 'text_blocks',
				'helpUrl': '%{BKY_TEXT_CHARAT_HELPURL}',
				'inputsInline': true,
				'mutator': 'text_charAt_custom_mutator',
			},)
		}
	}
	/** Type of a block that has TEXT_CHARAT_MUTATOR_MIXIN */
	type CharAtBlock = Blockly.Block & CharAtMixin;
	interface CharAtMixin extends CharAtMixinType { }
	type CharAtMixinType = typeof CHARAT_MUTATOR_MIXIN;

	/**
	 * Mixin for mutator functions in the 'text_charAt_mutator' extension.
	 */
	const CHARAT_MUTATOR_MIXIN = {
		isAt_: false,

		saveExtraState: function (this: CharAtBlock): { at: boolean } {
			return {
				'at': this.isAt_,
			};
		},
	
		loadExtraState: function (this: CharAtBlock | any, state: any) {
			this.isAt_ = state['at'];
			this.updateAt_(this.isAt_);
		},


		
		updateAt_: function (this: CharAtBlock, isAt: boolean) {
			this.removeInput('AT', true);
			this.removeInput('ORDINAL', true);
			if (isAt) {
				this.appendValueInput('AT').setCheck('Number');
				if (Blockly.Msg['ORDINAL_NUMBER_SUFFIX']) {
					this.appendDummyInput('ORDINAL').appendField(
						Blockly.Msg['ORDINAL_NUMBER_SUFFIX'],
					);
				}
			}
			if (Blockly.Msg['TEXT_CHARAT_TAIL']) {
				this.removeInput('TAIL', true);
				this.appendDummyInput('TAIL').appendField(Blockly.Msg['TEXT_CHARAT_TAIL']);
			}

			this.isAt_ = isAt;
		},
	};

	const CHARAT_EXTENSION = function (this: CharAtBlock) {
		const dropdown = this.getField('WHERE') as Blockly.FieldDropdown;
		dropdown.setValidator(function (this: Blockly.FieldDropdown, value: any) {
			const newAt = value === 'FROM_START' || value === 'FROM_END';
			const block = this.getSourceBlock() as CharAtBlock;
			if (newAt !== block.isAt_) {
				block.updateAt_(newAt);
			}
			return undefined; // FieldValidators can't be void.  Use option as-is.
		});
		this.updateAt_(true);
		this.setTooltip(() => {
			const where = this.getFieldValue('WHERE');
			let tooltip = Blockly.Msg['TEXT_CHARAT_TOOLTIP'];
			if (where === 'FROM_START' || where === 'FROM_END') {
				const msg =
					where === 'FROM_START'
						? Blockly.Msg['LISTS_INDEX_FROM_START_TOOLTIP']
						: Blockly.Msg['LISTS_INDEX_FROM_END_TOOLTIP'];
				if (msg) {
					tooltip +=
						'  ' +
						msg.replace('%1', this.workspace.options.oneBasedIndex ? '#1' : '#0');
				}
			}
			return tooltip;
		});
	};
	console.log()
	if(Blockly.Extensions.isRegistered("text_charAt_custom_mutator")) Blockly.Extensions.unregister('text_charAt_custom_mutator')
	Blockly.Extensions.registerMutator(
		'text_charAt_custom_mutator',
		CHARAT_MUTATOR_MIXIN,
		CHARAT_EXTENSION,
	);
	javascriptGenerator.forBlock[type] = function(block: Blockly.Block) {
		const where = block.getFieldValue('WHERE') || 'FROM_START';
  const textOrder = where === 'RANDOM' ? Order.NONE : Order.MEMBER;
  const text = javascriptGenerator.valueToCode(block, 'VALUE', textOrder) || "''";
  switch (where) {
    case 'FIRST': {
      const code = text + '.charAt(0)';
      return [code, Order.FUNCTION_CALL];
    }
    case 'LAST': {
      const code = text + '.slice(-1)';
      return [code, Order.FUNCTION_CALL];
    }
    case 'FROM_START': {
      const at = javascriptGenerator.getAdjusted(block, 'AT');
      // Adjust index if using one-based indices.
      const code = text + '.charAt(' + at + ')';
      return [code, Order.FUNCTION_CALL];
    }
    case 'FROM_END': {
      const at = javascriptGenerator.getAdjusted(block, 'AT', 1, true);
      const code = text + '.slice(' + at + ').charAt(0)';
      return [code, Order.FUNCTION_CALL];
    }
    case 'RANDOM': {
      const functionName = javascriptGenerator.provideFunction_(
        'textRandomLetter',
        `
function ${javascriptGenerator.FUNCTION_NAME_PLACEHOLDER_}(text) {
  var x = Math.floor(Math.random() * text.length);
  return text[x];
}
`,
      );
      const code = functionName + '(' + text + ')';
      return [code, Order.FUNCTION_CALL];
    }
  }
  throw Error('Unhandled option (text_charAt).');
	}
}
textCharAt()
//text_charAt End

//text_getSubstring Start
function text_getSubstring() {
/** Type of a 'text_get_substring' block. */
type GetSubstringBlock = Blockly.Block & GetSubstringMixin;
interface GetSubstringMixin extends GetSubstringType {
  WHERE_OPTIONS_1: Array<[string, string]>;
  WHERE_OPTIONS_2: Array<[string, string]>;
}
type GetSubstringType = typeof GET_SUBSTRING_BLOCK;

const GET_SUBSTRING_BLOCK = {
  /**
   * Block for getting substring.
   */
  init: function (this: GetSubstringBlock) {
    this['WHERE_OPTIONS_1'] = [
      [Blockly.Msg['TEXT_GET_SUBSTRING_START_FROM_START'], 'FROM_START'],
      [Blockly.Msg['TEXT_GET_SUBSTRING_START_FROM_END'], 'FROM_END'],
      [Blockly.Msg['TEXT_GET_SUBSTRING_START_FIRST'], 'FIRST'],
    ];
    this['WHERE_OPTIONS_2'] = [
      [Blockly.Msg['TEXT_GET_SUBSTRING_END_FROM_START'], 'FROM_START'],
      [Blockly.Msg['TEXT_GET_SUBSTRING_END_FROM_END'], 'FROM_END'],
      [Blockly.Msg['TEXT_GET_SUBSTRING_END_LAST'], 'LAST'],
    ];
    this.setHelpUrl(Blockly.Msg['TEXT_GET_SUBSTRING_HELPURL']);
    this.setStyle('text_blocks');
    this.appendValueInput('STRING')
      .setCheck('String')
      .appendField(Blockly.Msg['TEXT_GET_SUBSTRING_INPUT_IN_TEXT']);
    this.appendDummyInput('AT1');
    this.appendDummyInput('AT2');
    if (Blockly.Msg['TEXT_GET_SUBSTRING_TAIL']) {
      this.appendDummyInput('TAIL').appendField(Blockly.Msg['TEXT_GET_SUBSTRING_TAIL']);
    }
    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.updateAt_(1, true);
    this.updateAt_(2, true);
    this.setTooltip(Blockly.Msg['TEXT_GET_SUBSTRING_TOOLTIP']);
  },

  updateAt_: function (this: GetSubstringBlock, n: 1 | 2, isAt: boolean) {
    // Create or delete an input for the numeric index.
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('AT' + n);
    this.removeInput('ORDINAL' + n, true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT' + n).setCheck('Number');
      if (Blockly.Msg['ORDINAL_NUMBER_SUFFIX']) {
        this.appendDummyInput('ORDINAL' + n).appendField(
          Blockly.Msg['ORDINAL_NUMBER_SUFFIX'],
        );
      }
    } else {
      this.appendDummyInput('AT' + n);
    }
    // Move tail, if present, to end of block.
    if (n === 2 && Blockly.Msg['TEXT_GET_SUBSTRING_TAIL']) {
      this.removeInput('TAIL', true);
      this.appendDummyInput('TAIL').appendField(Blockly.Msg['TEXT_GET_SUBSTRING_TAIL']);
    }
    const menu: any = Blockly.fieldRegistry.fromJson({
      type: 'field_dropdown',
      options:
        this[('WHERE_OPTIONS_' + n) as 'WHERE_OPTIONS_1' | 'WHERE_OPTIONS_2'],
    }) as Blockly.FieldDropdown;
    menu.setValidator(
      /**
       * @param value The input value.
       * @returns Null if the field has been replaced; otherwise undefined.
       */
      function (this: Blockly.FieldDropdown, value: any): null | undefined {
        const newAt = value === 'FROM_START' || value === 'FROM_END';
        // The 'isAt' variable is available due to this function being a
        // closure.
        if (newAt !== isAt) {
          const block = this.getSourceBlock() as GetSubstringBlock;
          block.updateAt_(n, newAt);
          // This menu has been destroyed and replaced.
          // Update the replacement.
          block.setFieldValue(value, 'WHERE' + n);
          return null;
        }
        return undefined;
      },
    );

    this.getInput('AT' + n)!.appendField(menu, 'WHERE' + n);
    if (n === 1) {
      this.moveInputBefore('AT1', 'AT2');
      if (this.getInput('ORDINAL1')) {
        this.moveInputBefore('ORDINAL1', 'AT2');
      }
    }
  },
};

Blockly.Blocks['text_getSubstring_custom'] = GET_SUBSTRING_BLOCK;
const getSubstringIndex = function (
	stringName: string,
	where: string,
	opt_at?: string,
  ): string | undefined {
	if (where === 'FIRST') {
	  return '0';
	} else if (where === 'FROM_END') {
	  return stringName + '.length - 1 - ' + opt_at;
	} else if (where === 'LAST') {
	  return stringName + '.length - 1';
	} else {
	  return opt_at;
	}
  };
javascriptGenerator.forBlock["text_getSubstring_custom"] = function(block: Blockly.Block) {
	  // Dictionary of WHEREn field choices and their CamelCase equivalents. */
	  const wherePascalCase = {
		'FIRST': 'First',
		'LAST': 'Last',
		'FROM_START': 'FromStart',
		'FROM_END': 'FromEnd',
	  };
	  type WhereOption = keyof typeof wherePascalCase;
	  // Get substring.
	  const where1 = block.getFieldValue('WHERE1') as WhereOption;
	  const where2 = block.getFieldValue('WHERE2') as WhereOption;
	  const requiresLengthCall =
		where1 !== 'FROM_END' &&
		where1 !== 'LAST' &&
		where2 !== 'FROM_END' &&
		where2 !== 'LAST';
	  const textOrder = requiresLengthCall ? Order.MEMBER : Order.NONE;
	  const text = javascriptGenerator.valueToCode(block, 'STRING', textOrder) || "''";
	  let code;
	  if (where1 === 'FIRST' && where2 === 'LAST') {
		code = text;
		return [code, Order.NONE];
	  } else if (text.match(/^'?\w+'?$/) || requiresLengthCall) {
		// If the text is a variable or literal or doesn't require a call for
		// length, don't generate a helper function.
		let at1;
		switch (where1) {
		  case 'FROM_START':
			at1 = javascriptGenerator.getAdjusted(block, 'AT1');
			break;
		  case 'FROM_END':
			at1 = javascriptGenerator.getAdjusted(block, 'AT1', 1, false, Order.SUBTRACTION);
			at1 = text + '.length - ' + at1;
			break;
		  case 'FIRST':
			at1 = '0';
			break;
		  default:
			throw Error('Unhandled option (text_getSubstring).');
		}
		let at2;
		switch (where2) {
		  case 'FROM_START':
			at2 = javascriptGenerator.getAdjusted(block, 'AT2', 1);
			break;
		  case 'FROM_END':
			at2 = javascriptGenerator.getAdjusted(block, 'AT2', 0, false, Order.SUBTRACTION);
			at2 = text + '.length - ' + at2;
			break;
		  case 'LAST':
			at2 = text + '.length';
			break;
		  default:
			throw Error('Unhandled option (text_getSubstring).');
		}
		code = text + '.slice(' + at1 + ', ' + at2 + ')';
	  } else {
		const at1 = javascriptGenerator.getAdjusted(block, 'AT1');
		const at2 = javascriptGenerator.getAdjusted(block, 'AT2');
		// The value for 'FROM_END' and'FROM_START' depends on `at` so
		// we add it as a parameter.
		const at1Param =
		  where1 === 'FROM_END' || where1 === 'FROM_START' ? ', at1' : '';
		const at2Param =
		  where2 === 'FROM_END' || where2 === 'FROM_START' ? ', at2' : '';
		const functionName = javascriptGenerator.provideFunction_(
		  'subsequence' + wherePascalCase[where1] + wherePascalCase[where2],
		  `
	function ${
			javascriptGenerator.FUNCTION_NAME_PLACEHOLDER_
		  }(sequence${at1Param}${at2Param}) {
	  var start = ${getSubstringIndex('sequence', where1, 'at1')};
	  var end = ${getSubstringIndex('sequence', where2, 'at2')} + 1;
	  return sequence.slice(start, end);
	}
	`,
		);
		code =
		  functionName +
		  '(' +
		  text +
		  // The value for 'FROM_END' and 'FROM_START' depends on `at` so we
		  // pass it.
		  (where1 === 'FROM_END' || where1 === 'FROM_START' ? ', ' + at1 : '') +
		  (where2 === 'FROM_END' || where2 === 'FROM_START' ? ', ' + at2 : '') +
		  ')';
	  }
	  return [code, Order.FUNCTION_CALL];
}
}
text_getSubstring()
//text_getSubstring End


export default { blocks, category };
