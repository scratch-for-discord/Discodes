import type BaseInput from "$lib/utils/BlockGen/Inputs/BaseInput";
import type { DropdownIDef } from "$lib/utils/BlockGen/Inputs/Dropdown";
import type { ImageIDef } from "$lib/utils/BlockGen/Inputs/Image";
import type { NumberIDef } from "$lib/utils/BlockGen/Inputs/NumberInput";
import type { StatementIDef } from "$lib/utils/BlockGen/Inputs/StatementInput";
import type { TextIDef } from "$lib/utils/BlockGen/Inputs/TextInput";
import type { ValueIDef } from "$lib/utils/BlockGen/Inputs/ValueInput";

export type DiscodesInput = BaseInput<
	DropdownIDef | ImageIDef | NumberIDef | StatementIDef | TextIDef | ValueIDef
>;
