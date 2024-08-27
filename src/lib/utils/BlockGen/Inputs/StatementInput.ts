import BaseInput from "./BaseInput";

export interface StatementIDef {
	name: string;
	type: "input_statement";
}

/**
 * Creates a new value input
 * Blockly documentation: https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks#block_inputs
 * @export
 * @class ValueInput
 * @extends {BaseInput}
 */

export default class StatementInput extends BaseInput<StatementIDef> {
	constructor(name: string) {
		super(name);

		this.setMethod(this.getDefinition);
		super.setName(name);
	}

	/**
	 * Returns an object ready to be stringified for direct blockly usage
	 *
	 * @return {*}  {ValueInputJSON}
	 * @memberof ValueInput
	 */
	getDefinition(): StatementIDef {
		return {
			type: "input_statement",
			name: super.name,
		};
	}
}
