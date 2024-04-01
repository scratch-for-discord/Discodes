import Blockly from "blockly/core"

export default class Mutator {
    private _mixin: object;
    private _blocks: string[] | undefined

    constructor() {
        this._mixin = {}
    }

    set mixin(mixin: object) {
        this._mixin = mixin
    }

    set setBlocks(blocks: string[]) {
        this._blocks = blocks
    }

    registerMutator(name: string): void {
        // Unregister the mutator if it's already registered. Without this blockly crashes.
        if (Blockly.Extensions.isRegistered(name)) {
            Blockly.Extensions.unregister(name);
        }
        Blockly.Extensions.registerMutator(name, this._mixin, undefined, this._blocks)
    }
}