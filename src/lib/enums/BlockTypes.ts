export enum BlockType {
	Any = "Any",
	String = "String",
	Boolean = "Boolean",
	Number = "Number",
	Array = "Array"
}

export enum DropdownType {
	Grid = "field_grid_dropdown",
	List = "field_dropdown",
	Auto = "auto"
}

export enum WarningType {
	Parent,
	Input,
	Deprec,
	Permanent
}

export enum BlockShape {
	Action, //Block shape for a statement block.
	Event, //Block shape for a floating block with an input inside. Can be replaced with FLOATING, but keeps code consistent.
	Floating, //Block shape for a block that cannot have any parent blocks.
	Bottom, //Block shape for a block with no blocks allowed to attach after.
	Top, //Block shape for a block that cannot have any blocks attached before it.
	Value // Block shape for a block that is a value and is placed inside inputs 
}

// This is used for the toolbox generation, it translates to kind:"block" in the blockly shadows.
export enum PlaceholderType {
	Block = "block"
}
export enum MutatorType {
	Assembler = "assembler",
	Checkbox = "checkbox",
}
