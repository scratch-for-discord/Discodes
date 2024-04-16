import type { MutatorBlock } from "$lib/types/BlockDefinition";
import salt from "$lib/utils/helpers/salt";
import pkg from "blockly/javascript";
const { javascriptGenerator } = pkg;
import {Mutator} from "./Mutator";
import type {AdditionalSettings} from "./Mutator";
import Blockly, {Connection} from "blockly/core";
function orderListChanged(order1: string[], order2: string[]): boolean {
    if(!(Array.isArray(order1) && Array.isArray(order2))) return false;
    if(order1.length !== order2.length) return true;
    for (let i = 0; i < order1.length; i++) {
        if(order1[i] !== order2[i]) {
            return true;
        }
    }
    return false;
}
interface ClauseBlock extends Blockly.Block {
    //input_type: Connection
    connections_: {[key: string]: Connection}
}
type ConnectionMap = {[key: string]: ConnectionMapConnection};
interface ConnectionMapConnection {
    connection: Connection,
    input_name: string
}
export default class AssemblerMutatorV2 extends Mutator {
    //will store each properties name
    private order: string[];
    private settings: AdditionalSettings | undefined;
    constructor(containerBlockText: string, properties: MutatorBlock[], settings?: AdditionalSettings) {
        super(properties, containerBlockText);
        this.order = [];
        this.mixin = this.getMixin(settings);
        this.setBlocks = this.blocks;
        this.settings = settings;
    }

    get blocks(): string[] {
        const arr: string[] = [];
        for (const prop of super.properties) {
            arr.push(prop.block);
        }
        return arr;
    }


    getMixin(settings?: AdditionalSettings): object {
        this.order = [];
        const properties = super.properties;
        const propertieMap = Object.create(null);
        const containerBlockName = salt(10);
        const containerBlockText = super.containerBlockText;
        let inputIndexMap: Map<string, number> = new Map<string, number>();
        // First we set the save and load states.
        for(const prop of properties) {
            propertieMap[prop.block] = prop;
        }
        console.log(settings)
        Blockly.Blocks[containerBlockName] = {
            init: function(this: Blockly.Block) {
                this.jsonInit({
                    type: containerBlockName,
                    message0: `${containerBlockText}`,
                    nextStatement: true,

                    colour: settings?.color ?? 230,
                    tooltip: "Put blocks under the container block to modify the original block",
                    helpUrl: ""
                });

            }
        };
        javascriptGenerator.forBlock[containerBlockName] = function() {
            return "";
        };
        const mixin = {

            saveExtraState: function(this: any): object {

                const state = Object.create(null);
                if(this.order) state["order"] = this.order;
                return state;
            },
            //! Disable eslint cuz the state variable is of type any until they fully migrate to typescript
            // eslint-disable-next-line
            loadExtraState: function (this: any, state: any): void {
                    // const oldOrder = this.order;
                    this.order = state["order"] ?? [];
                /*if(orderListChanged(oldOrder, this.order)) */
                this.updateShape_();

            },
            decompose: function(this: Blockly.Block, workspace: Blockly.WorkspaceSvg) {

                const containerBlock = workspace.newBlock(containerBlockName);
                containerBlock.initSvg();
                const orders = (this as any).order as string[];
                // let connection = containerBlock.getInput("STACK")?.connection;
                let connection = containerBlock.nextConnection;
                if(orders) {
                    for(const order of orders) {
                        const block = workspace.newBlock(order);
                        block.initSvg();
                        connection?.connect(block.previousConnection!);
                        connection = block.nextConnection!;
                    }
                }



                return containerBlock;

            },
            compose: function(this: any, containerBlock: Blockly.Block) {
                    const connections: ConnectionMap= {};
                    const oldOrder = this.order;
                    const order = [];

                   // let itemBlock: ClauseBlock | null = containerBlock.getInputTargetBlock("STACK") as ClauseBlock | null;
                    let itemBlock = containerBlock.nextConnection!.targetBlock();

                    while(itemBlock) {
                        order.push(itemBlock.type);
                        if(itemBlock.connections_) {
                            for (const conStr of Object.keys(itemBlock.connections_)) {
                                connections[conStr] = {
                                    connection: itemBlock.connections_[conStr],
                                    input_name: itemBlock.type
                                };
                            }
                        }
                        // connections.push(itemBlock.conne);
                        itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock() as ClauseBlock | null;
                    }
                    this.order = order;
                    if(orderListChanged(oldOrder, this.order)) this.updateShape_();
                this.reconnectChildBlocks_(
                    connections
                );
            },
            updateShape_: function(this: any) {

                    for (const inp of properties) {
                        for(const add of inp.adds) {
                            let i = 1;
                            let moreInputs = true;
                            while(moreInputs) {
                                const failed =  !this.removeInput(add.name + i, true);
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
                                inputIndexMap.set(add._name, (inputIndexMap.get(add.name)??0) + 1);
                                const name = add._name + inputIndexMap.get(add.name)   ;
                                if (!this.getInput(name)) {
                                    const input = add.generate();
                                    this.appendInput_(input, name, add.getField());
                                }


                            }
                            
                        }
                    }


            },
            reconnectChildBlocks_: function(
                this: Blockly.Block,
                connections: ConnectionMap,

            ) {
                    const count = new Map<string, number>();
                for (const connectionKey in connections) {
                    const ConMap = connections[connectionKey];
                    const property = propertieMap[ConMap.input_name];
                    const connection = ConMap.connection;
                    if(!connection) continue;
                    for (const add of property.adds) {
                        const name = add.name;
                        const c = count.get(name) ?? 1;
                        connection.reconnect(this, name+c);
                        count.set(name, c+1);

                    }
                }
                // for (let i = 1; i <= 10; i++) {
                //     connections[i]?.reconnect(this, 'IF' + i);
                // }
            },
            saveConnections: function (this: any, containerBlock: Blockly.Block) {
                    const count = new Map<string, number>();
                    //let clauseBlock = containerBlock.getInputTargetBlock("STACK") as ClauseBlock | null;
                    let clauseBlock = containerBlock as ClauseBlock | null;

                    while(clauseBlock) {
                        if(clauseBlock.isInsertionMarker()) {
                            clauseBlock = clauseBlock.getNextBlock() as ClauseBlock | null;
                            continue;
                        }
                        clauseBlock.connections_ = {};
                        //count
                        const c = count.get(clauseBlock.type) ?? 1;
                        const prop = propertieMap[clauseBlock.type];
                        if(prop) {
                            for(const add of prop.adds) {
                                const inp = this.getInput(add._name + c);
                                if(inp) {

                                    clauseBlock.connections_[add._name + c] = inp && inp.connection!.targetConnection;
                                    count.set(clauseBlock.type, c+1);
                                }
                            }
                        }

                        clauseBlock = clauseBlock.getNextBlock() as ClauseBlock | null;
                    }

            },

        };

        return mixin;
    }
}
