import BaseInput from "./BaseInput";

export interface NumberIDef {
	type: "field_number";
	name: string;
	value: number;
	min?: number;
	max?: number;
	precision?: number;
}

export default class NumberInput extends BaseInput<NumberIDef> {
	private readonly _value: number;
	private readonly _settings: {
		min?: number;
		max?: number;
		precision?: number;
	};

	constructor(
		name: string,
		defaultValue: number,
		settings?: { min?: number; max?: number; precision?: number }
	) {
		super(name);

		this.setMethod(this.getDefinition);
		super.setName(name);
		this._value = defaultValue;
		this._settings = settings || {};
	}

	private getDefinition(): NumberIDef {
		return {
			type: "field_number",
			name: super.name,
			value: this._value,
			...this._settings
		};
	}
}
