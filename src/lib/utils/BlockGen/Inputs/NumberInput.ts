import BaseInput from "./BaseInput";

export default class NumberInput extends BaseInput {
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

	private getDefinition(): { type: "field_number"; name: string; value: number } {
		return {
			type: "field_number",
			name: super.name,
			value: this._value,
			...this._settings
		};
	}

}
