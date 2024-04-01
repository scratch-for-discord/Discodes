import { BlockType } from "$lib/enums/BlockTypes";

/**
 * Removes duplicates and BlockType.Any values from a BlockType array.
 *
 * @export
 * @param {BlockType[]} types
 * @return {*}  {BlockType[]}
 */
export default function argFilter(types: BlockType[]): BlockType[] {
	const newArray = [...new Set(types)];
	const result = newArray.filter((argType) => argType !== BlockType.Any);

	return result;
}
