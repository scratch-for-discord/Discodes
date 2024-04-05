export default class BaseInput {
	//! Replace unknown by an enum with all the types of inputs!
	private _method: () => unknown;
	private _fieldText: string
	constructor() {
		this._fieldText = "";
		this._method = () => {};
	}

	protected setMethod(generationMethod: () => unknown) {
		this._method = generationMethod;
	}
	/*
	this function currently is meant for Mutator use
	*/
	public setField(text: string): BaseInput	 {
		this._fieldText = text;
		return this;
	}
	/*
this function currently is meant for Mutator use
*/
	public getField() {
		return this._fieldText;
	}
	public generate(): unknown {
		return this._method();
	}
}
