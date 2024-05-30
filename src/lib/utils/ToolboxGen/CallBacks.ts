import Blockly from "blockly/core";
import toolbox from "blockly/core/utils/toolbox";



class CallBacks {
    private categoryCallBacks: Record<string, (p1: Blockly.WorkspaceSvg) => toolbox.FlyoutDefinition>;
    private buttonCallbacks: Record<string, (p1: Blockly.WorkspaceSvg) => toolbox.FlyoutDefinition>;

    constructor() {
        this.categoryCallBacks = {};
        this.buttonCallbacks = {};
    };
    addCategoryCallback(name: string, func:(p1: Blockly.WorkspaceSvg) => toolbox.FlyoutDefinition) {}
    register(workspace: Blockly.WorkspaceSvg) {
        workspace.reg
    }

}
