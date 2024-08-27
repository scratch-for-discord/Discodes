import BaseInput from "./BaseInput";

interface VariableInputObject {
	type: "field_variable";
	name: string;
	variable: string;
    variableTypes?: string[];
    defaultType?: string;
}

export default class VariableInput extends BaseInput<any> {
	private readonly _variable: string;
	private readonly _opt_defaultType?: string;
	private readonly _opt_variableTypes?: string[];

	constructor(name: string, variable: string, opt_defaultType?: string, opt_variableTypes?: string[]) {
		super(name);

		this.setMethod(this.getDefinition);
		super.setName(name);
		this._variable = variable;
        this._opt_defaultType = opt_defaultType;
        this._opt_variableTypes = opt_variableTypes
	}

	private getDefinition(): VariableInputObject {
		return {
			type: "field_variable",
			name: super.name,
			variable: this._variable === ""? "%{BKY_VARIABLES_DEFAULT_NAME}" : this._variable,
            variableTypes: this._opt_variableTypes,
            defaultType: this._opt_defaultType,
		};
	}

}
