import { BlockShape, BlockType, DropdownType, WarningType } from "$lib/enums/BlockTypes";
import Warning from "$lib/utils/BlockGen/Warnings/Warning";
import type { BlockDefinition } from "$lib/types/BlockDefinition";
import type { CategoryDefinition } from "$lib/types/CategoryDefinition";
import TextInput from "$lib/utils/BlockGen/Inputs/TextInput";
import ValueInput from "$lib/utils/BlockGen/Inputs/ValueInput";
import Placeholder from "$lib/utils/ToolboxGen/Placeholder";
import StatementInput from "$lib/utils/BlockGen/Inputs/StatementInput";
import Dropdown from "$lib/utils/BlockGen/Inputs/Dropdown";
import NumberInput from "$lib/utils/BlockGen/Inputs/NumberInput";
import AssemblerMutatorV2 from "$lib/utils/BlockGen/Mutators/AssemblerMutator";
import rgbToHex from "$lib/utils/helpers/rgbToHex";

const blocks: BlockDefinition[] = [
	{
		id: "create",
		text: "function {NAME} \n {INPUT}",
		args: [new TextInput("TEXT", "doSomething"), new StatementInput("INPUT")],
        warnings: [
            new Warning(WarningType.Input, { message: "This block is not connected to anything." }),
			],
        shape: BlockShape.Event,
		inline: true,
        colour: rgbToHex(165, 91, 153),
        tooltip: "Void function",
        helpUrl: "",
        code: (args) => {
			console.log(args)
			let fArgs = "";
			if (args.input.length > 0) {
				fArgs = args.input.join(", ");

            }
			return `async function ${args.TEXT} (${fArgs}) { ${args.INPUT} }`;
			}, 
		mutator: new AssemblerMutatorV2(
			"function",
			[
				{
					block: "input",
					adds: [
						new ValueInput("input", BlockType.String).setField("input"),
					],
					once: true
				},
			],
			{
				color: rgbToHex(91, 128, 165)
			}
		)

	},
	{
		id: "run",
		text: "run {TYPE} function {NAME}",
        args: [new Dropdown("TYPE", DropdownType.Auto, { "VOID": "void", "VALUE": "value" }) ,new TextInput("TEXT", "doSomething")],
        shape: BlockShape.Action,
        inline: true,
        colour: rgbToHex(165, 91, 153),
		tooltip: "Void function",
        helpUrl: "",
        code: (args, block) => {
			switch (args.TYPE) {
				case "value":
					block.outputType = BlockType.String;
					break;
				case "void":
					break;
			}
			let fArgs = "";
			if (args.input.length > 0) {
                fArgs = args.input.join(", ");
			}
			return `await ${args.TEXT}(${fArgs});`;
			}, 
        mutator: new AssemblerMutatorV2(
			"run",
            [
                {
					block: "input",
                    adds: [
                        new ValueInput("input", BlockType.Any).setField("input"),
                    ],
                    once: true
					},
            ],
			{
                color: rgbToHex(91, 128, 165)
            }
		)
	},
	{
		id: "return",
		text: "return {INPUT}",
		args: [new ValueInput("INPUT", BlockType.Any)],
        warnings: [
            new Warning(WarningType.Input, { message: "This block is not connected to anything." }),
            ],
        shape: BlockShape.Bottom,
		inline: true,
        colour: rgbToHex(165, 91, 153),
        tooltip: "Void function",
        helpUrl: "",
        code: (args) => {
			return `return ${args.INPUT};`;
		}
	}

];

const category: CategoryDefinition = {
	name: "Functions",
	colour: rgbToHex(153, 91, 165)
};

export default { blocks, category };
