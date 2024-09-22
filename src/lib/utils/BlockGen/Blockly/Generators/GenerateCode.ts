import Blockly from "blockly"
import generator from "blockly/javascript"
const { javascriptGenerator } = generator

export function generateJavascriptCode(workspace: Blockly.Workspace = Blockly.getMainWorkspace()) {
    return javascriptGenerator.workspaceToCode(workspace) as string
}