import Blockly from "blockly"
import type { FlyoutDefinition } from "blockly/core/utils/toolbox";
export type CategoryDefinition = {
	name: string;
	colour: string;
	hidden?: boolean;
	weight?: number;
	custom?: string; // add if you want to make dynamic categories
	// eslint-disable-next-line no-use-before-define
	customFunction?: (workspace: Blockly.WorkspaceSvg) => FlyoutDefinition; // used in pair with custom
};
