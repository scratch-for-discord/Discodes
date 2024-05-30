import Blockly from "blockly"
export type CategoryDefinition = {
	name: string;
	colour: string;
	hidden?: boolean;
	weight?: number;
	custom?: string; // add if you want to make dynamic categories
	customFunction?: (workspace: Blockly.WorkspaceSvg) => any[]; // used in pair with custom
};
