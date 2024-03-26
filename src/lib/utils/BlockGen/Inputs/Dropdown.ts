import BaseInput from "./BaseInput";

import { DropdownType } from "$lib/enums/BlockTypes";

interface DropdownJSON {
    name: string
    type: DropdownType
    options: Array<Array<string>>
}

/**
 * Creates a new dropdown input                            
 * Blockly documentation: https://www.youtube.com/watch?v=s2_xaEvcVI0#t=386
 * @export
 * @class Dropdown
 * @extends {BaseInput}
 */
export default class Dropdown extends BaseInput {
    private readonly _name: string
    private readonly _options: Array<Array<string>>
    private _dropdownType: DropdownType


    constructor(name: string, dropdownType: DropdownType, options: Record<string,string>) {
        super()
        this.setMethod(this.getDefinition)

        this._name = name
        this._dropdownType = dropdownType
        this._options = this.objectToArray(options)
    }

    /**
     * Sorts an object to be compatible to blockly's dropdown options
     *
     * @private
     * @param {Record<string, string>} object
     * @return {*}  {Array<Array<string>>}
     * @memberof Dropdown
     */
    private objectToArray(object: Record<string, string>): Array<Array<string>> {
        return Object.keys(object).map((key) => [key, object[key]]);
    }

    /**
     * Returns an object ready to be stringified for direct blockly usage
     *
     * @return {*}  {DropdownJSON}
     * @memberof Dropdown
     */
    getDefinition(): DropdownJSON {
        if (this._dropdownType === DropdownType.Auto) {
            // Automatically swaps bewteen grid and list type depending on the length of the arguments.
            this._dropdownType = this._options.length > 10 ? DropdownType.Grid : DropdownType.List
        }

        return {
            type: this._dropdownType,
            name: this._name,
            options: this._options
        }
    }

    get name(): string {
        return this._name
    }
}
