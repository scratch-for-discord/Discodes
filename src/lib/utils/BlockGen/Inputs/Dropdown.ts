import BaseInput from "./BaseInput";

import { DropdownType } from "$lib/enums/BlockTypes";

export interface DropdownIDef {
	name: string;
	type: DropdownType;
	options: string[][];
}

/**
 * Creates a new dropdown input
 * Blockly documentation: https://www.youtube.com/watch?v=s2_xaEvcVI0#t=386
 * @export
 * @class Dropdown
 * @extends {BaseInput}
 */
<<<<<<< HEAD
<<<<<<< HEAD
=======
export default class DropdownInput extends BaseInput {
>>>>>>> master
=======
export default class Dropdown extends BaseInput {
>>>>>>> parent of 7dd02ae (Variable category, dynamic categories, buttons (#29))

export default class Dropdown extends BaseInput<DropdownIDef> {
	private readonly _options: Array<Array<string>>;
	private _dropdownType: DropdownType;

	constructor(name: string, dropdownType: DropdownType, options: Record<string, string>) {
		super(name);
		this.setMethod(this.getDefinition);

		super.setName(name);
		this._dropdownType = dropdownType;
		this._options = this.objectToArray(options);
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
	getDefinition(): DropdownIDef {
		if (this._dropdownType === DropdownType.Auto) {
			// Automatically swaps between grid and list type depending on the length of the arguments.
			this._dropdownType = this._options.length > 10 ? DropdownType.Grid : DropdownType.List;
		}
		console.log(this._options)
		return {
			type: this._dropdownType,
			name: super.name,
			options: this._options
		};
	}
}
