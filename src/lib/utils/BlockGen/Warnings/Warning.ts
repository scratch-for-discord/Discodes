import { WarningType } from "$lib/enums/BlockTypes";
import type { WarningData } from "$lib/types/Warnings";

export default class Warning {
	private readonly _warningType: WarningType;
	private readonly _fieldName: string | string[];
	private readonly _message: string;

	constructor(warningType: WarningType, data?: WarningData) {
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
				if(!this._fieldName || this._fieldName.length === 0) this._message = `This block requires a parent.`;
				else this._message = `This block belongs inside the ${Array.isArray(this._fieldName)? this._fieldName.join(", ") : this._fieldName} block(s).`;
				break;
			case WarningType.Permanent:
				if (this._message === "") {
					throw new Error("A message should be defined when WarningType.Permanent is being used.");
				}
				this._fieldName = "permanent";
				break;
		}
	}

	get data(): WarningData {
		return {
			message: this._message,
			warningType: this._warningType,
			fieldName: this._fieldName
		};
	}
}
// class DeprecWarning extends Warning {
//     constructor() {
//         super(WarningType.Deprec);
//         this._message = "This block is deprecated, please remove it from your code.";
//         this._fieldName = "deprecated";
//     }
// }

// class InputWarning extends Warning {
//     constructor(fieldName: string) {
//         super(WarningType.Input, { fieldName });
//         this._message = `The ${this._fieldName} input is required.`;
//     }
// }

// class PermanentWarning extends Warning {
//     constructor(message: string) {
//         super(WarningType.Permanent, { message });
//         if (message === "") {
//             throw new Error("A message should be defined when WarningType.Permanent is being used.");
//         }
//         this._fieldName = "permanent";
//     }
// }
