import { BlockType } from "$lib/enums/BlockTypes";
import BaseInput from "./BaseInput";
import argFilter from "../../helpers/argFilter";

export interface ValueIDef {
	name: string;
	type: "input_value";
	check?: BlockType | BlockType[];
}
/**
 * Creates a new value input
 * Blockly documentation: https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks#block_inputs
 * @export
 * @class ValueInput
 * @extends {BaseInput}
 */

export default class ValueInput extends BaseInput<ValueIDef> {
	private readonly _type: BlockType[];

	constructor(name: string, type: BlockType | BlockType[]) {
		super(name);

		this.setMethod(this.getDefinition);
		super.setName(name);

		this._type = [type].flat();
	}

	/**
	 * Returns an object ready to be stringified for direct blockly usage
	 *
	 * @return {*}  {ValueInputJSON}
	 * @memberof ValueInput
	 */
	getDefinition(): ValueIDef {
		const result: ValueIDef = {
			type: "input_value",
			name: super.name,
		};

		const filtered = argFilter(this._type);
		// We return without the "check" if we have no types :)
		if (filtered.length === 0) return result;

		result.check = [...filtered];
		return result;
	}
}
