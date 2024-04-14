/**
 * Converts an RGB value to a Hex string
 *
 * @export
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @return {*}  {string}
 */
export default function rgbToHex(r: number, g: number, b: number): string {
	return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}
