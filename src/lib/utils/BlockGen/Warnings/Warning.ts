import { WarningType } from "$lib/enums/BlockTypes";

export default class Warning {
	private readonly _warningType: WarningType;
	private readonly _fieldName: string;
	private readonly _message: string;

	constructor(warningType: WarningType, data?: { fieldName?: string; message?: string }) {
		this._warningType = warningType;
		this._fieldName = data?.fieldName ? data.fieldName : "";
		this._message = data?.message ? data.message : "";

		switch (this._warningType) {
			case WarningType.Deprec:
				this._message = "This block is deprecated, please remove it from your code.";
				this._fieldName = "deprecated";
				break;
			case WarningType.Input:
				this._message = `The ${this._fieldName} input is required.`;
				break;
			case WarningType.Parent:
				this._message = `This block belongs inside the ${this._fieldName} block.`;
				break;
			case WarningType.Permanent:
				if (this._message === "") {
					throw new Error("A message should be defined when WarningType.Permanent is being used.");
				}
				this._fieldName = "permanent";
				break;
		}
	}

	get data(): { message: string; warningType: WarningType; fieldName: string } {
		return {
			message: this._message,
			warningType: this._warningType,
			fieldName: this._fieldName
		};
	}
}
