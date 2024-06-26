import type { PlaceholderType } from "$lib/enums/BlockTypes";
interface PlaceholderValues {
	argValue: Record<string, unknown>;
	argName: string;
	kind: string;
	type: string;
}

export default class Placeholder<ArgType> {
	private readonly _argValue: Record<string, ArgType>;
	private readonly _argName: string;
	private readonly _kind: string;
	private readonly _type: string;

	constructor(
		type: PlaceholderType,
		argName: string,
		blockName: string,
		argValue: Record<string, ArgType>
	) {
		this._argValue = argValue;
		this._argName = argName;
		//? type: "Block" is clearer than kind:"block", it creates this confusing code but type = blockName and kind = type
		this._type = blockName;
		this._kind = type;
	}

	get values(): PlaceholderValues {
		return {
			argValue: this._argValue,
			argName: this._argName,
			kind: this._kind,
			type: this._type
		};
	}
}
