export let imports: Record<string, string> = {};

function parseVersion(version: string): number[] {
	return version.split(".").map(Number);
}

function compareVersions(version1: number[], version2: number[]): number {
	for (let i = 0; i < Math.max(version1.length, version2.length); i++) {
		const v1 = version1[i] || 0;
		const v2 = version2[i] || 0;
		if (v1 < v2) {
			return -1;
		} else if (v1 > v2) {
			return 1;
		}
	}
	return 0;
}

/**
 * Adds an import to the imports variable and overwrites the existing one if the given version is greater.
 *
 * @export
 * @param {string} import_
 */
export function addImport(import_: `${string}@${string}`): void {
	const name = import_.split("@")[0];
	const version = import_.split("@")[1];

	// If imports doesn't have the package name yet, add it.
	if (!imports[name]) {
		imports[name] = version;
	} else {
		// Otherwise, compare versions.
		const currentVersion = parseVersion(imports[name]);
		const newVersion = parseVersion(version);

		if (compareVersions(currentVersion, newVersion) < 0) {
			imports[name] = version;
		}
	}
}
/**
 *Removes a specific import
 *
 * @export
 * @param {string} import_
 */
export function removeImport(import_: string): void {
	const name = import_.split("@")[0];
	if (!imports[name]) return;
	delete imports[name];
}

/**
 * Deletes all block imports
 *
 * @export
 */
export function wipeImports() {
	imports = {};
}
