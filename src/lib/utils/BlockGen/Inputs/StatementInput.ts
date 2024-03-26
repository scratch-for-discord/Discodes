import BaseInput from "./BaseInput";

interface StatementInputJSON {
    name: string
    type: "input_statement"
}

/**
 * Creates a new value input                            
 * Blockly documentation: https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks#block_inputs
 * @export
 * @class ValueInput
 * @extends {BaseInput}
 */
export default class StatementInput extends BaseInput {
    private readonly _name: string

    constructor(name: string) {
        super()

        this.setMethod(this.getDefinition)
        this._name = name
    }

    /**
     * Returns an object ready to be stringified for direct blockly usage
     *
     * @return {*}  {ValueInputJSON}
     * @memberof ValueInput
     */
    getDefinition(): StatementInputJSON {
        return {
            type: "input_statement",
            name: this._name
        }
    }

    get name(): string {
        return this._name
    }
}
