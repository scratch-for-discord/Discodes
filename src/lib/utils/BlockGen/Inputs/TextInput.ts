import BaseInput from "./BaseInput";

interface TextInputObject {
	type: "field_input";
	name: string;
	text: string;
	//TODO Change it into a project-wide setting
	spellcheck: false;
}

export default class TextInput extends BaseInput {
	private readonly _name: string;
	private readonly _text: string;

	constructor(name: string, defaultValue: string) {
		super();

		this.setMethod(this.getDefinition);
		this._name = name;
		this._text = defaultValue;
	}

	private getDefinition(): TextInputObject {
		return {
			type: "field_input",
			name: this._name,
			text: this._text,
			spellcheck: false
		};
	}

	get name(): string {
		return this._name;
	}
}
