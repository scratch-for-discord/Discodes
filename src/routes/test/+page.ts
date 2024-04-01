import Blockly from "blockly/core";
import pkg from "blockly/javascript";
const { javascriptGenerator } = pkg;

Blockly.Blocks["mutator_test_container"] = {
	init: function () {
		this.jsonInit({
			type: "mutator_test_container",
			message0: "Container %1 %2",
			args0: [
				{
					type: "input_dummy"
				},
				{
					type: "input_statement",
					name: "STACK"
				}
			],
			colour: 230,
			tooltip: "",
			helpUrl: ""
		});
	}
};

Blockly.Blocks["mutator_test_item"] = {
	init: function () {
		this.jsonInit({
			type: "mutator_test_item %1",
			message0: "Item",
			colour: 230,
			tooltip: "",
			helpUrl: "",
			previousStatement: null,
			nextStatement: null
		});
	}
};

Blockly.Blocks["mutator_test_1"] = {
	init: function () {
		this.jsonInit({
			type: "mutator_test_1",
			message0: "This does stuff %1 %2",
			args0: [
				{
					type: "input_dummy"
				},
				{
					type: "input_statement",
					name: "NAME"
				}
			],
			inputsInline: true,
			previousStatement: null,
			nextStatement: null,
			colour: 230,
			tooltip: "",
			helpUrl: "",
			mutator: "bob"
		});
	}
};
javascriptGenerator.forBlock["mutator_test_1"] = function () {
	return "";
};

javascriptGenerator.forBlock["mutator_test_item"] = function () {
	return "list!";
};

if (Blockly.Extensions.isRegistered("bob")) {
	Blockly.Extensions.unregister("bob");
}
// Mutator definition
Blockly.Extensions.registerMutator(
	"bob",
	{
		// Define saveExtraState to save the number of child blocks
		saveExtraState: function () {
			return {
				itemCount: this.itemCount_
			};
		},
		// Define loadExtraState to load the number of child blocks
		//! Disable eslint cuz state is of type any until they fully migrate to typescript
		// eslint-disable-next-line
		loadExtraState: function (state: any) {
			this.itemCount_ = state["itemCount"];
			this.updateShape_();
		},
		// Define decompose to explode the block
		decompose: function (workspace: Blockly.WorkspaceSvg) {
			const containerBlock = workspace.newBlock("mutator_test_container");
			containerBlock.initSvg();
			let connection = containerBlock.getInput("STACK")?.connection;
			// Iterate over each child block and add it to the mutator workspace
			for (let i = 0; i < this.itemCount_; i++) {
				const itemBlock = workspace.newBlock("mutator_test_item");
				itemBlock.initSvg();
				connection?.connect(itemBlock.previousConnection);
				connection = itemBlock.nextConnection;
			}
			return containerBlock;
		},
		// Define compose to rebuild the block
		compose: function (containerBlock: Blockly.Block) {
			const workspaceBlocks = [];
			let itemBlock = containerBlock.getInputTargetBlock("STACK");
			while (itemBlock) {
				workspaceBlocks.push(itemBlock);
				itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
			}
			// Remove old child blocks
			this.itemCount_ = workspaceBlocks.length;
			this.updateShape_();
		},
		// Define updateShape_ to update the shape of the block
		updateShape_: function () {
			if (this.itemCount_ === 0 || this.itemCount_ === undefined) {
				if (!this.getInput("EMPTY")) {
					this.appendDummyInput("EMPTY").appendField("Empty");
				}
				// Remove all inputs except the 'EMPTY' input
				let i = 0;
				while (this.getInput(`ADD${i}`)) {
					this.removeInput(`ADD${i}`);
					i++;
				}
			} else {
				if (this.getInput("EMPTY")) {
					this.removeInput("EMPTY");
				}
				// Add new inputs
				for (let i = 0; i < this.itemCount_; i++) {
					const inputName = `ADD${i}`;
					if (!this.getInput(inputName)) {
						const input = this.appendValueInput(inputName);
						if (i === 0) {
							input.appendField("an input");
						}
					}
				}
				// Remove extra inputs if necessary
				let j = this.itemCount_;
				while (this.getInput(`ADD${j}`)) {
					this.removeInput(`ADD${j}`);
					j++;
				}
			}
		}
	},
	undefined,
	// Define blockList to specify the block types that can be added
	["mutator_test_item"]
);
