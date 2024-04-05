import type { MutatorBlock } from "$lib/types/BlockDefinition";
import salt from "$lib/utils/helpers/salt";
import pkg from "blockly/javascript";
const { javascriptGenerator } = pkg;
import Mutator from "./Mutator";
import Blockly, {BlockSvg, Connection} from "blockly/core";

export default class AssemblerMutatorV2 extends Mutator {
    private readonly _properties: MutatorBlock[];
    private readonly _containerBlockText: string;
    //will store each properties name
    private order: string[];
    constructor(containerBlockText: string, properties: MutatorBlock[]) {
        super();
        this.order = [];
        this._properties = properties;
        this._containerBlockText = containerBlockText;
        this.mixin = this.getMixin();
        this.setBlocks = this.blocks;

    }

    get blocks(): string[] {
        const arr: string[] = [];
        for (const prop of this._properties) {
            arr.push(prop.block);
        }
        return arr;
    }

    getMixin(): object {
        const properties = this._properties;
        const propertieMap = Object.create(null)
        const containerBlockName = salt(10);
        const containerBlockText = this._containerBlockText;
        const extraStateObj: Record<string, number> = {};
        let inputIndexMap: Map<string, number> = new Map<string, number>();
        // First we set the save and load states.
        for(const prop of properties) {
            propertieMap[prop.block] = prop;
        }
        const mixin = {
                elseifCount_: 0,
                elseCount_: 0,
            saveExtraState: function(this: any): object {

                const state = Object.create(null);
                if(this.order) state["order"] = this.order;
                return state;
            },
            //! Disable eslint cuz the state variable is of type any until they fully migrate to typescript
            // eslint-disable-next-line
            loadExtraState: function (this: any, state: any): void {
                    this.order = state["order"];
                this.updateShape_();
            },
            decompose: function(this: any, workspace: Blockly.WorkspaceSvg) {
                Blockly.Blocks[containerBlockName] = {
                    init: function(this: Blockly.Block) {
                        this.jsonInit({
                            type: containerBlockName,
                            message0: `${containerBlockText}\n %1`,
                            args0: [
                                {
                                    type: "input_statement",
                                    name: "STACK"
                                }
                            ],
                            colour: 230,
                            tooltip: "Put blocks inside of the container block to modify the original block",
                            helpUrl: ""
                        });
                    }
                };
                javascriptGenerator.forBlock[containerBlockName] = function() {
                    return "";
                };
                const containerBlock = workspace.newBlock(containerBlockName);
                containerBlock.initSvg();
                let connection = containerBlock.getInput("STACK")?.connection;
                if(this.order) {
                    for(const order of this.order) {
                        const block = workspace.newBlock(order);
                        block.initSvg();
                        connection?.connect(block.previousConnection!);
                        connection = block.nextConnection!;
                    }
                }



                return containerBlock;

            },
            compose: function(this: any, containerBlock: Blockly.Block) {
                    this.order = [];
                    let itemBlock: Blockly.Block | null = containerBlock.getInputTargetBlock("STACK");
                    while(itemBlock) {
                        this.order.push(itemBlock.type);
                        itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
                    }
                    this.updateShape_();
            },
            updateShape_: function(this: Blockly.Block) {
                    for (const inp of properties) {
                        for(const add of inp.adds) {
                            let i = 1;
                            let moreInputs = true;
                            while(moreInputs) {
                                const failed =  !this.removeInput(add._name + i, true);
                                i++;
                                if(failed) moreInputs = false;
                            }
                        }
                    }
                    inputIndexMap = new Map<string, number>();
                    if(this.order) {
                        for (const order of this.order) {
                            const adds = propertieMap[order].adds;
                            for (const add of adds) {
                                inputIndexMap.set(add._name, (inputIndexMap.get(add._name)??0) + 1);
                                const name = add._name + inputIndexMap.get(add._name) ?? 0;
                                if (!this.getInput(name)) {
                                    const input = add.generate();
                                    this.appendInput_(input, name, add.getField());
                                }


                            }
                            
                        }
                    }


            },

            appendInput_: function(this: Blockly.Block, input, name, fieldText) {
                const inputType = input.type || "input_value"; // Default to input_value if type is not specified
                const inputCheck = input.check; // Check for input type if specified

                switch (inputType) {
                    case "input_value":
                        this.appendValueInput(name).setCheck(inputCheck).appendField(fieldText);
                        break;
                    case "input_statement":
                        this.appendStatementInput(name).setCheck(inputCheck).appendField(fieldText);
                        break;
                    case "input_dummy":
                        this.appendDummyInput(name).appendField(fieldText);
                        break;
                    default:
                        throw new Error(`Unsupported input type: ${inputType}`);
                }
            }
        };

        return mixin;
    }
}
