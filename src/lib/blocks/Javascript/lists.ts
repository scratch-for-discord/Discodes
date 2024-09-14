import { BlockShape, BlockType, DropdownType, PlaceholderType, WarningType } from "$lib/enums/BlockTypes";
import Blockly, { Block } from "blockly"
import type { BlockDefinition } from "$lib/types/BlockDefinition";
import type { CategoryDefinition } from "$lib/types/CategoryDefinition";
import rgbToHex from "$lib/utils/helpers/rgbToHex";
import { javascriptGenerator, Order } from "blockly/javascript";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import Placeholder from "$lib/utils/ToolboxGen/Placeholder";
import Warning from "$lib/utils/BlockGen/Warnings/Warning";
import Dropdown from "$lib/utils/BlockGen/Inputs/Dropdown";
import { list } from "postcss";
import AssemblerMutator from "$lib/utils/BlockGen/Mutators/AssemblerMutator";
/*
Logic category is finished.
*/

const blocks: BlockDefinition[] = [
	{
		kind: "custom_block",
		id: "create_list_custom",
		extraState: {
			itemCount: 0
		}
	},
	{
		kind: "custom_block",
		id: "create_list_custom",
		extraState: {
			itemCount: 3
		}
	},

	{
		kind: "custom_block",
		id: "lists_repeat",
		placeholders: [
			new Placeholder(PlaceholderType.Shadow, "NUM", "number", { NUMBER:5})
			
		]
	},
	{
		kind: "custom_block",
		id: "lists_length",
	},
	{
		kind: "custom_block",
		id: "lists_isEmpty",
	},
	{
		id: "reverse_list",
		text: "reverse {LIST}",
		args: [new ValueInput("LIST", BlockType.Array)],
		shape: BlockShape.Floating,
		output: BlockType.Array,
		inline: true,
		colour: "#745BA5",
		tooltip: "",
		helpUrl: "",
		code: (args) => {

			return `${args.LIST === "" ? "[]" : args.LIST}.slice().reverse()`;
		}
	},
	{
		id: "is_list",
		text: "is {LIST} a list?",
		args: [new ValueInput("LIST", BlockType.Any)],
		shape: BlockShape.Floating,
		output: BlockType.Array,
		inline: true,
		colour: "#745BA5",
		tooltip: "",
		helpUrl: "",
		code: (args) => {

			return `Array.isArray(${args.LIST})`;
		}
	},

	{
		label: true,
		text: "list searching"
	},
	{
		id: "list_contains",
		text: "list {LIST} contains {VALUE}",
		placeholders: [
			new Placeholder(PlaceholderType.Block, "LIST", "variable_get_discodes", { VAR: {name: "list"}})

		],
		args: [new ValueInput("LIST", BlockType.Array),new ValueInput("VALUE", BlockType.Any)],
		shape: BlockShape.Floating,
		output: BlockType.Boolean,
		inline: true,
		colour: "#745BA5",
		tooltip: "",
		helpUrl: "",
		code: (args) => {

			return `${args.LIST === "" ? "[]" : args.LIST}.includes(${args.VALUE})`;
		}
	},
	{
		id: "list_find",
		text: "in list {LIST} find {DROPDOWN} by {VALUE}",
		placeholders: [
			new Placeholder(PlaceholderType.Block, "LIST", "variable_get_discodes", { VAR: {name: "list"}})

		],
		args: [new ValueInput("LIST", BlockType.Array),
			new Dropdown("DROPDOWN", DropdownType.Auto, {
				"item": "find",
				"index": "findIndex"
			}),
			new ValueInput("VALUE", BlockType.Boolean)],
		shape: BlockShape.Floating,
		output: BlockType.Any,
		inline: true,
		colour: "#745BA5",
		tooltip: "",
		helpUrl: "",
		code: (args) => {

			return `${args.LIST === "" ? "[]" : args.LIST}.${args.DROPDOWN}((list_find_element_variable) => ${args.VALUE === ""? "null" : args.VALUE})`;
		}
	},
	{
		id: "list_find_element",
		text: "list find element",
		warnings: [
			new Warning(WarningType.Parent, {fieldName: "list_find"})
		],
		shape: BlockShape.Floating,
		output: BlockType.Any,
		inline: true,
		colour: "#745BA5",
		tooltip: "",
		helpUrl: "",
		code: (args) => {

			return `list_find_element_variable`;
		}
	},
	{
		kind: "custom_block",
		id: "lists_indexOf",
		placeholders: [
			new Placeholder(PlaceholderType.Block, "VALUE", "variable_get_discodes", { VAR: {name: "list"}})
			
		]
	},
	{
		kind: "custom_block",
		id: "lists_getIndex",
		placeholders: [
			new Placeholder(PlaceholderType.Block, "VALUE", "variable_get_discodes", { VAR: {name: "list"}})
			
		]
	},
	{
		kind: "custom_block",
		id: "lists_setIndex",
		placeholders: [
			new Placeholder(PlaceholderType.Block, "LIST", "variable_get_discodes", { VAR: {name: "list"}})
			
		]
	},
	{
		kind: "custom_block",
		id: "lists_getSublist",
		placeholders: [
			new Placeholder(PlaceholderType.Block, "LIST", "variable_get_discodes", { VAR: {name: "list"}})
			
		]
	},
	{
		id: "list_push",
		text: "in list {LIST} push {VALUE}",
		args: [new ValueInput("LIST", BlockType.Array),new ValueInput("VALUE", BlockType.Any)],
		placeholders: [
			new Placeholder(PlaceholderType.Block, "LIST", "variable_get_discodes", { VAR: {name: "list"}})

		],
		// warnings: [
		// 	new Warning(WarningType.Input, { fieldName: "LIST" })
		// ],
		shape: BlockShape.Action,
		inline: true,
		colour: "#745BA5",
		tooltip: "",
		helpUrl: "",
		code: (args) => {

			return `${args.LIST === ""? "[]" : args.LIST}.push(${args.VALUE})`;
		}
	},
	{
		id: "list_copy_within",
		text: "in list {LIST} copy within from {START} to {END} at {TARGET}",
		args: [new ValueInput("LIST", BlockType.Array),
			new ValueInput("START", BlockType.Number),
			new ValueInput("END", BlockType.Number),

			new ValueInput("TARGET", BlockType.Number),

		],
		placeholders: [
			new Placeholder(PlaceholderType.Block, "LIST", "variable_get_discodes", { VAR: {name: "list"}}),
			new Placeholder(PlaceholderType.Shadow, "START", "number", { NUMBER: 1}),
			new Placeholder(PlaceholderType.Block, "END", "number", { NUMBER: 2}),
			new Placeholder(PlaceholderType.Shadow, "TARGET", "number", { NUMBER: 0}),


		],

		shape: BlockShape.Action,
		inline: true,
		colour: "#745BA5",
		tooltip: "",
		helpUrl: "",
		code: (args) => {

			return `${args.LIST === ""? "[]" : args.LIST}.copyWithin(Number(${args.TARGET}), Number(${args.START})${args.END === ""? "": `, Number(${args.END})`})`;
		}
	},
	{
		id: "list_fill",
		text: "fill list {LIST} with value {VALUE} from {START} to {END}",
		args: [new ValueInput("LIST", BlockType.Array),
			new ValueInput("VALUE", BlockType.Any),
			new ValueInput("START", BlockType.Number),

			new ValueInput("END", BlockType.Number),

		],
		placeholders: [
			new Placeholder(PlaceholderType.Block, "LIST", "variable_get_discodes", { VAR: {name: "list"}}),
			new Placeholder(PlaceholderType.Shadow, "START", "number", { NUMBER: 0}),

			new Placeholder(PlaceholderType.Shadow, "END", "number", { NUMBER: 1}),


		],

		shape: BlockShape.Action,
		inline: true,
		colour: "#745BA5",
		tooltip: "",
		helpUrl: "",
		code: (args) => {

			return `${args.LIST === ""? "[]" : args.LIST}.fill(${args.VALUE === ""? "null" : args.VALUE}, Number(${args.START}), Number(${args.END}))`;
		}
	},
	{
		label: true,
		text: "list transforming blocks"
	},
	
	{
		id: "concat_list",
		text: "combine lists {LIST}",
		extraState: {
			order: ["new_item", "new_item"]
		},
		args: [
			new ValueInput("LIST", BlockType.Array)
		],

		mutator: new AssemblerMutator("list", [
			{
				block: "new_item",
				once: false,
				adds: [
					new ValueInput("LIST", BlockType.Array)
				]
			}
		], {
			alignInputs: Blockly.inputs.Align.RIGHT,
			color: "#745BA5",
		}),
		shape: BlockShape.Value,
		output: BlockType.Array,
		inline: false,
		colour: "#745BA5",
		tooltip: "combines lists",
		helpUrl: "",
		code: (args) => {
			console.log(args)
			let concat = [];
			for(const list of args.LIST_list) {
				concat.push(list === ""? "null" : `...${list}`)
			}
			console.log(concat)
			return `${args.LIST === ""? "[]" : args.LIST}.concat(${concat.join(", ")})`;
		} 
	},
	{
		kind: "custom_block",
		id: "lists_split",
		placeholders: [
			new Placeholder(PlaceholderType.Shadow, "DELIM", "text", { TEXT: ","})
			
		]
	},
	{
		kind: "custom_block",
		id: "lists_sort",
	},






	//hidden blocks
	{
		id: "create_list_custom_container_block",
		text: "list",
		shape: BlockShape.Top,
		inline: true,
		colour: "#745BA5",
		tooltip: "adds a list item",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
		code: () => {
			return "";
		},
		hidden: true
	},
	{
		id: "new_item",
		text: "item",
		shape: BlockShape.Action,
		inline: true,
		colour: "#745BA5",
		tooltip: "adds a list item",
		helpUrl:
			"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
		code: () => {
			return "";
		},
		hidden: true
	},
	

];

const category: CategoryDefinition = {
	name: "Lists",
	colour: rgbToHex(91, 128, 165)
};
//CUSTOM CREATE LIST BLOCK START
export type CreateWithBlock = Blockly.Block & ListCreateWithMixin;
interface ListCreateWithMixin extends ListCreateWithMixinType {
	itemCount_: number;
}
type ListCreateWithMixinType = typeof LISTS_CREATE_WITH;
const createListCustom = "create_list_custom"
const nonEmptyMsg = "create list with"
const emptyMsg = "create empty list"
const LISTS_CREATE_WITH = {
	/**
	 * Block for creating a list with any number of elements of any type.
	 */
	init: function (this: CreateWithBlock) {
		this.setHelpUrl("");
		this.setStyle('list_blocks');
		this.itemCount_ = 3;
		this.updateShape_();
		this.setOutput(true, 'Array');
		this.setMutator(
			new Blockly.icons.MutatorIcon(['new_item'], this as unknown as Blockly.BlockSvg),
		); // BUG(#6905)
		this.setTooltip("");
	},
	onchange: function (this: CreateWithBlock, e: Blockly.Events.Abstract) {
		if (e.type === Blockly.Events.BLOCK_MOVE && this.id == e.blockId || e.type === Blockly.Events.CREATE) {
			const parentBlock = this.getParent();

			if (!parentBlock) {
				// If no parent, set input types to accept any block type
				this.updateShape_([]);  // Use an empty array to accept any type
				return; // Exit early since there's no parent to check against
			}

			// Find which input the block is connected to
			const currentConnection = this.outputConnection || this.previousConnection;
			if (!currentConnection) return; // No connection to check

			// Iterate through the inputs of the parent block to find the one this block is connected to
			const parentInputs = parentBlock.inputList;
			for (let i = 0; i < parentInputs.length; i++) {
				const input = parentInputs[i];
				if (input.connection && input.connection.targetBlock() === this) {

					let acceptedTypes = input.connection.check || []; // If no types are specified, assume any type

					if (acceptedTypes.length == 0) return; // Accepts any type, so no need to change
					if (acceptedTypes[0] !== BlockType.Array) return; // Not an array, do nothing
					if (acceptedTypes[0] === BlockType.Array && acceptedTypes.length === 1) return; // Only array, do nothing
					// Change the input types to match the accepted types of the parent
					acceptedTypes = acceptedTypes[1];
					this.updateShape_((acceptedTypes as string[]).slice(1, acceptedTypes.length));
					break;
				}
			}
		}
	},


	saveExtraState: function (this: CreateWithBlock): { itemCount: number } {
		return {
			'itemCount': this.itemCount_,
		};
	},

	loadExtraState: function (this: CreateWithBlock, state: any) {
		this.itemCount_ = state['itemCount'];
		this.updateShape_();
	},

	decompose: function (
		this: CreateWithBlock,
		workspace: Blockly.Workspace,
	): Blockly.Block {
		const containerBlock = workspace.newBlock(
			'create_list_custom_container_block',
		) as Blockly.Block;
		(containerBlock as Blockly.BlockSvg).initSvg();
		let connection = containerBlock.nextConnection;
		for (let i = 0; i < this.itemCount_; i++) {
			const itemBlock = workspace.newBlock(
				'new_item',
			) as Blockly.Block;
			(itemBlock as Blockly.BlockSvg).initSvg();
			if (!itemBlock.previousConnection) {
				throw new Error('itemBlock has no previousConnection');
			}
			connection!.connect(itemBlock.previousConnection);
			connection = itemBlock.nextConnection;
		}
		return containerBlock;
	},

	compose: function (this: CreateWithBlock, containerBlock: Blockly.Block) {
		let itemBlock: Blockly.Block | null | undefined = containerBlock.nextConnection?.targetBlock();
		const connections: Blockly.Connection[] = [];
		while (itemBlock) {
			if (itemBlock.isInsertionMarker()) {
				itemBlock = itemBlock.getNextBlock() as Blockly.Block | null;
				continue;
			}
			connections.push((itemBlock as any).valueConnection_ as Blockly.Connection);
			itemBlock = itemBlock.getNextBlock() as Blockly.Block | null;
		}
		// Disconnect any children that don't belong.
		for (let i = 0; i < this.itemCount_; i++) {
			const connection = this.getInput('ADD' + i)!.connection!.targetConnection;
			if (connection && !connections.includes(connection)) {
				connection.disconnect();
			}
		}
		this.itemCount_ = connections.length;
		this.updateShape_();
		for (let i = 0; i < this.itemCount_; i++) {
			connections[i]?.reconnect(this, 'ADD' + i);
		}
	},
	saveConnections: function (this: CreateWithBlock, containerBlock: Blockly.Block) {
		let itemBlock: Blockly.Block | null | undefined = containerBlock.nextConnection?.targetBlock();

		let i = 0;
		while (itemBlock) {
			if (itemBlock.isInsertionMarker()) {
				itemBlock = itemBlock.getNextBlock() as Blockly.Block | null;
				continue;
			}
			const input = this.getInput('ADD' + i);
			(itemBlock as any).valueConnection_ = input?.connection!
				.targetConnection as Blockly.Connection;
			itemBlock = itemBlock.getNextBlock() as Blockly.Block | null;
			i++;
		}
	},
	updateShape_: function (this: CreateWithBlock, inputTypeChange?: string[]) {
		if (this.itemCount_ && this.getInput('EMPTY')) {
			this.removeInput('EMPTY');
		} else if (!this.itemCount_ && !this.getInput('EMPTY')) {
			this.appendDummyInput('EMPTY').appendField(
				Blockly.Msg['LISTS_CREATE_EMPTY_TITLE'],
			);
		}

		// Change input types if provided
		if (inputTypeChange) {
			for (let i = 0; i < this.itemCount_; i++) {
				this.getInput("ADD" + i)?.setCheck(inputTypeChange.length ? inputTypeChange : null);
			}
		}

		// Add inputs as needed
		for (let i = 0; i < this.itemCount_; i++) {
			if (!this.getInput('ADD' + i)) {
				const input = this.appendValueInput('ADD' + i).setAlign(Blockly.inputs.Align.RIGHT);
				if (i === 0) {
					input.appendField(Blockly.Msg['LISTS_CREATE_WITH_INPUT_WITH']);
				}
			}
		}

		// Remove extra inputs
		for (let i = this.itemCount_; this.getInput('ADD' + i); i++) {
			this.removeInput('ADD' + i);
		}
	},

};
Blockly.Blocks[createListCustom] = LISTS_CREATE_WITH;
javascriptGenerator.forBlock[createListCustom] = function (this: CreateWithBlock) {
	let inputCode: string[] = []
	let i = 0;
	let input = this.getInput("ADD" + i);

	while (input) {
		const value = javascriptGenerator.valueToCode(
			this,
			"ADD" + i,
			javascriptGenerator.ORDER_ATOMIC
		)
		if (value === "") inputCode.push("null")
		else inputCode.push(value)

		i++
		input = this.getInput("ADD" + i)

	}
	return [`[${inputCode.join(", ")}]`, Order.NONE];
}
//CUSTOM CREATE LIST BLOCK END
export default { blocks, category };
