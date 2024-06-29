import { BlockShape, BlockType, DropdownType, PlaceholderType } from "$lib/enums/BlockTypes";
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
        id: "random_color_hex",
        text: "random color",
        shape: BlockShape.Floating,
		output: BlockType.String,
        inline: true,
        colour: rgbToHex(165, 116, 91),
        tooltip: "Generates a random color in hex format",
        helpUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random",
        code: () => {
            return `'#' + Math.floor(Math.random()*16777215).toString(16);`
        }
    },
	{
        id: "make_color",
        text: "make color with {TYPE}",
        args: [
            new Dropdown("TYPE", DropdownType.Auto, {
                "RGB": "rgb",
				"RGBA": "rgba",
                "HEX": "hex",
                "HSL": "hsl"
            })
        ],
        shape: BlockShape.Floating,
		output: BlockType.String,
        inline: true,
        colour: rgbToHex(165, 116, 91),
        tooltip: "Generates a color with the specified format",
        helpUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/",
        code: (args, block) => {
			block.removeInput("A");
			block.removeInput("R");
			block.removeInput("G");
			block.removeInput("B");
			block.removeInput("HEX");
			switch (args.TYPE){
				case "rgba":
					block.addInput(new NumberInput("A", 50, { max: 255, min: 0, precision: 1 }));
				case "rgb":	
					block.addInput(new NumberInput("R", 50, { max: 255, min: 0, precision: 1 }));
					block.addInput(new NumberInput("G", 50, { max: 255, min: 0, precision: 1 }));
					block.addInput(new NumberInput("B", 50, { max: 255, min: 0, precision: 1 }));
					if (args.TYPE === "rgba"){
						return `rgba(${args.R}, ${args.G}, ${args.B}, ${args.A})`;
				}
					return `rgb(${args.R}, ${args.G}, ${args.B})`;

				case "hex":
					// block.addInput(new ValueInput("HEX", BlockType.String));
					block.addInput(new TextInput("HEX", "#ffffff"));
					return `#${args.HEX}`;

				case "hsl":
					block.addInput(new NumberInput("R", 50, { max: 255, min: 0, precision: 1 }));
					block.addInput(new NumberInput("G", 50, { max: 255, min: 0, precision: 1 }));
					block.addInput(new NumberInput("B", 50, { max: 255, min: 0, precision: 1 }));
					return `hsl(${args.R}, ${args.G}%, ${args.B}%)`;
					break;
			
				default:
					break;
				}
				
				console.log(block)
				return "as"
			}
		}

];

const category: CategoryDefinition = {
	name: "Colors",
	colour: rgbToHex(165, 116, 91)
};

export default { blocks, category };
