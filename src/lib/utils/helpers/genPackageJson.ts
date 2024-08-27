interface PackageVersions {
	[packageName: string]: string;
}
/**
 * Turns the placed blocks packages into a package.json dependencies.
 *
 * @export
 * @param {PackageVersions} packageVersions
 * @return {*}  {string}
 */
export function generatePackageJson(packageVersions: PackageVersions): string {
	const packageJson = {
		dependencies: {} as Record<string, string>,
	};

	for (const packageName in packageVersions) {
		let version = packageVersions[packageName];
		// Add ^ if not already present
		if (!version.startsWith("^")) {
			version = `^${version}`;
		}
		packageJson.dependencies[packageName] = version;
	}
	return JSON.stringify(packageJson, null, 2);
}
