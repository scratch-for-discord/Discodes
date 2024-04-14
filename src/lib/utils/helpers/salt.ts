/**
 * Generates a random string of the diven length
 *
 * @export
 * @param {number} length
 * @return {*}  {string}
 */
export default function salt(length: number): string {
	let result: string = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength: number = characters.length;

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}
