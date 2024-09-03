import { BlockShape, BlockType, DropdownType, WarningType } from "$lib/enums/BlockTypes";
import Blockly from "blockly"
import type { BlockDefinition } from "$lib/types/BlockDefinition";
import type { CategoryDefinition } from "$lib/types/CategoryDefinition";
import rgbToHex from "$lib/utils/helpers/rgbToHex";
import { javascriptGenerator, Order } from "blockly/javascript";
import { getInputValue } from "$lib/utils/helpers/getInputValue";
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
					console.log(acceptedTypes);
	
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
javascriptGenerator[createListCustom] = function (this: CreateWithBlock) {
	let inputCode: string[] = []
	let i = 0;
	let input = this.getInput("ADD" + i);

	while (input) {
		const value = javascriptGenerator.valueToCode(
			this,
			"ADD" + i,
			javascriptGenerator.ORDER_ATOMIC
		  )
		if(value === "") inputCode.push("null")
		else inputCode.push(value)

		i++
		input = this.getInput("ADD" + i)

	}
	return [`[${inputCode.join(", ")}]`, Order.NONE];
}
//CUSTOM CREATE LIST BLOCK END
export default { blocks, category };
