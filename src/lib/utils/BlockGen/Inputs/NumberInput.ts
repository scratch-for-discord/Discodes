import BaseInput from "./BaseInput";

export default class NumberInput extends BaseInput {
	private readonly _name: string;
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
		super();

		this.setMethod(this.getDefinition);
		this._name = name;
		this._value = defaultValue;
		this._settings = settings || {};
	}

	private getDefinition(): { type: "field_number"; name: string; value: number } {
		return {
			type: "field_number",
			name: this._name,
			value: this._value,
			...this._settings
		};
	}

	get name(): string {
		return this._name;
	}
}
