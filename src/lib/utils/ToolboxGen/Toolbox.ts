import type { BlockDefinition } from "$lib/interfaces/BlockDefinition"
import type { CategoryDefinition } from "$lib/interfaces/CategoryDefinition"
import {getToolboxDefinitions} from "$lib/utils/helpers/getDefs"

//? Uhm... idk either.
export interface CategoryDefinitonObject {
    definition: CategoryDefinition,
    blockDefs: BlockDefinition[]
    parents: string[]
}

export interface ExportedCategoryDefinitonObject {
    definition: CategoryDefinition,
    blockDefs: BlockDefinition[]
    parents: string
}

export default class Toolbox {
    private _definitions: CategoryDefinitonObject[]

    constructor() {
        this._definitions = []
    }

    public async generate(): Promise<void> {
        // Gather all the necessary definitions in the block files to create the toolboxes
        await this.init()
        // console.log(this._definitions)
        // Start creating the toolbox JSON

        const toolbox: unknown[] = []

        for (const key in this._definitions) {
            const currentDefs = this._definitions[key]

            //? I'm gonna call this the Matryoshka algorithme now lol
            let virtualToolbox: unknown[] = []

            //? Parent is the last element of the parents array AKA the parent of this category :)
            for (const parent of currentDefs.parents.toReversed()) {
                virtualToolbox = [{
                    "kind": "category",
                    "name": currentDefs.definition.name,
                    "colour": currentDefs.definition.colour,
                    "id": parent,
                    "contents": virtualToolbox
                }]
            }
            toolbox[key] = virtualToolbox[0]
        }
        console.log(toolbox)

    }

    private async init(): Promise<void> {
        const defs = await getToolboxDefinitions()
        
        this._definitions = this.sortParents(defs) as CategoryDefinitonObject[]
    }

    private sortParents(array: ExportedCategoryDefinitonObject[]): unknown[] {
        // Sort the parents: the less parents a category has, the earlier it is in the list
        const sortedParents: unknown[] = []

        // Split each member of the parents to be able to compare them by their length
        for (const key in array) {
            sortedParents[key] = {definition: array[key].definition, parents: array[key].parents.split("/"), blockDefs: array[key].blockDefs}
        }

        // Compare each length and sort from smallest to biggest by array size
        //! Mark this in documentation: a block file MUST have a parent folder! (or code won't work <-- blockly won't either)
        sortedParents.sort((a: unknown, b: unknown) => {
            return (b as CategoryDefinitonObject).parents.length - (a as CategoryDefinitonObject).parents.length
        })

        return sortedParents
    }
}
