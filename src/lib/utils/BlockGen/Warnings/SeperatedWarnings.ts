import { WarningType } from "$lib/enums/BlockTypes";
import Warning from "./Warning";

export class ParentWarning extends Warning {
    constructor(parents: string | string []) {
        super(WarningType.Parent, {
			fieldName: parents,
			warningType: WarningType.Parent,
			message: ""
		});

    }
}
export class InputWarning extends Warning {
    constructor(fieldName: string) {
        super(WarningType.Input, {
			fieldName: fieldName,
			warningType: WarningType.Input,
			message: ""
		});

    }
}
export class DeprecWarning extends Warning {
    constructor() {
        super(WarningType.Deprec, {
			fieldName: "",
			warningType: WarningType.Deprec,
			message: ""
		});

    }
}
export class PermWarning extends Warning {
    constructor(message: string) {
        super(WarningType.Permanent, {
			fieldName: "",
			warningType: WarningType.Permanent,
			message: message
		});

    }
}
