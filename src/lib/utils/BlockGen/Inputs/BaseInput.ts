export default class BaseInput<Definition> {
	private _method!: () => Definition;

	protected setMethod(generationMethod: () => Definition) {
		this._method = generationMethod;
	}

	public generate(): Definition {
		return this._method();
	}
}
