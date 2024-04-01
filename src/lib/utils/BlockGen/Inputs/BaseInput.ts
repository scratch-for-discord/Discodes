export default class BaseInput {
	//! Replace unknown by an enum with all the types of inputs!
	private _method: () => unknown;

	constructor() {
		this._method = () => {};
	}

	protected setMethod(generationMethod: () => unknown) {
		this._method = generationMethod;
	}

	public generate(): unknown {
		return this._method();
	}
}
