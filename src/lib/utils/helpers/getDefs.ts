import type { CategoryDefinition } from "$lib/interfaces/CategoryDefinition"
import type { BlockDefinition } from "blockly/core/blocks"

export interface CategoryDefinitonArray {
    definition: CategoryDefinition,
    parents: string,
    blockDefs: BlockDefinition[]
}

// Get all files from blocks file
const modules = import.meta.glob("../../blocks/**/**/*.ts")

/**
 * Returns all the category definitions from the FS and also returns their parent(s)
 *
 * @export
 * @return {*}  {Promise<CategoryDefinitonArray>}
 */
export async function getToolboxDefinitions(): Promise<CategoryDefinitonArray[]> {
    // For the toolbox defs
    const definitionArray: CategoryDefinition[] = []
    const parents: string[] = []
    const blockDefinitionArray: BlockDefinition[] = []

    for (const path in modules) {
        // Initialize the exports
        const module = await modules[path]()

        const parentPath = path.split("/")
        parentPath.splice(0,3)
        parentPath.pop()
        parents.push(parentPath.join("/"))

        // Get all the blocks from the files
        //! FIX THAT
        // @ts-expect-error Module is underfined and the red color pisses me off
        definitionArray.push(module.default.category as CategoryDefinition)
        // @ts-expect-error Module is underfined and the red color pisses me off
        blockDefinitionArray.push(module.default.blocks as BlockDefinition[])
    }

    const categoryDefinitons: CategoryDefinitonArray[] = []

    for (const key in definitionArray) {
        categoryDefinitons[key] = {
            definition: definitionArray[key], 
            parents: parents[key],
            blockDefs: blockDefinitionArray[key]
        }
    }

    return categoryDefinitons
}
