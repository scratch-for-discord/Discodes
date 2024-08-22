export default class BaseInput<Definition = unknown> {
	//! Replace unknown by an enum with all the types of inputs!
	private _method!: () => Definition;
	private _fieldText: string;
	private _name: string;

	constructor(name?: string) {
		this._name = name ?? "";
		this._fieldText = "";
	}

	protected setMethod(generationMethod: () => Definition) {
		this._method = generationMethod;
	}
	/*
	this function currently is meant for Mutator use
	*/
	public setField(text: string): BaseInput<Definition> {
		this._fieldText = text;
		return this;
	}
	/*
this function currently is meant for Mutator use
*/
	public get name() {
		return this._name;
	}
	public setName(newName: string) {
		this._name = newName;
	}
	public getField() {
		return this._fieldText;
	}
	public generate(): Definition {
		return this._method();
	}
}
