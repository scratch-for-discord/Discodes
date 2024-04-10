export let imports: Record<string, string> = {};

export function addImport(import_: string): void {
	const name = import_.split("@")[0];
	const version = import_.split("@")[1];
	if (!imports[name]) imports[name] = version;
	// Only use the latest version of the package.
	//Todo: Add a warning when a conflics happens.
	else if (Number(imports[name]) < Number(version)) {
		imports[name] = version;
	}
}

export function removeImport(import_: string) {
	const name = import_.split("@")[0];
	if (!imports[name]) return;
	delete imports[name];
}

export function wipeImports() {
	imports = {};
}
