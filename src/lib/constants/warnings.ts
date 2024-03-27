import Blockly from "blockly/core"

export const EventsToTriggerWarnings = new Set([
	Blockly.Events.BLOCK_CHANGE,
	Blockly.Events.BLOCK_MOVE,
	Blockly.Events.FINISHED_LOADING,
    Blockly.Events.BLOCK_DELETE
]);