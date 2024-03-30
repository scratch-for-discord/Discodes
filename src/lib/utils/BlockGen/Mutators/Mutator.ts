import type { MutatorType } from "$lib/enums/MutatorType";

export default class Mutator {

    private readonly _mutatorType: MutatorType

    constructor (type: MutatorType) {
        this._mutatorType = type
    }
}