import type { BlockBlockDefinition, BlockDefinition } from "$lib/types/BlockDefinition";
import type { FlyoutDefinition, ToolboxDefinition, ToolboxItemInfo } from "blockly/core/utils/toolbox";
import Blockly from "blockly/core";

export default class Toolbox {
	// eslint-disable-next-line no-use-before-define
	private callbackCategory: Record<string, (workspace: Blockly.WorkspaceSvg) => FlyoutDefinition>;
	private callbackOther: Record<string, (p1: Blockly.FlyoutButton) => void>;

	constructor() {	
		this.callbackCategory = {};
		this.callbackOther = {};

	}
	public async generate(): Promise<ToolboxDefinition> {
		const structure = await this.fetchFiles();
		const contents = [];

		for (const category in structure) {
			contents.push(structure[category]);
		}

		return {
			kind: "categoryToolbox",
			contents: contents as ToolboxItemInfo[]
		};
	}
	public registerCallbacks(workspace: Blockly.WorkspaceSvg) {
		for (const catKey of Object.keys(this.callbackCategory)) {
			workspace.registerToolboxCategoryCallback(catKey, this.callbackCategory[catKey])
		}
		for (const otherKey of Object.keys(this.callbackOther)) {
			console.log(otherKey)
			workspace.registerButtonCallback(otherKey, this.callbackOther[otherKey])
		}
	}
	private async fetchFiles() {
		const files = import.meta.glob("../../blocks/**/**/*.ts");
		const directories: string[] = Object.keys(files).map((key) => key);

		// too lazy to type rn WILL TYPE LATER
		// eslint-disable-next-line
		const structure: { [key: string]: any } = {};

		for (const path in files) {
			const filesInDir = this.filterPaths(path, directories);
			const mainParent = path.split("/").filter((val) => val !== "..")[1];

			if (!structure[mainParent]) {
				structure[mainParent] = {
					contents: [],
					kind: "category",
					name: mainParent,
					colour: "#2facf5"
				};
			}

			const secondaryDomiants = path.split("/");
			secondaryDomiants.splice(0, 4);
			secondaryDomiants.pop();

			this.setStruct(secondaryDomiants, structure[mainParent]["contents"], filesInDir, path);
		}
		return structure;
	}

	private async setStruct(
		path: string[],
		contents: unknown[],
		filesInDir: string[],
		topPath: string
	) {
		if (path.length === 0) {
			for (const directory of filesInDir) {
				const topPath2 = topPath.split("/");
				topPath2.pop();
				topPath = topPath2.join("/");

				//! FIX THE TYPE OR ELSE ITS GONNA BREAK LMFAO (Memory leak also?)

				const definitions = await import(/* @vite-ignore */ `${topPath}/${directory}`);
				if(definitions.default.category.custom) {
					// if(!definitions.default.category.customFunction && definitions.default.category.custom !== "VARIABLE_DYNAMIC") throw new Error("'customFunction' is required for a custom category!")
					contents.push({
						kind: "category",
						name: definitions.default.category.name,
						colour: definitions.default.category.colour,
						contents: [],
						custom: definitions.default.category.custom
					});
					if(!definitions.default.category.customFunction) return
					this.callbackCategory[definitions.default.category.custom] = definitions.default.category.customFunction
					for (const blockDef of definitions.default.blocks as BlockDefinition[]) {
						if(blockDef.kind === "button") {
							this.callbackOther[blockDef.callbackKey] = blockDef.callback;
							continue;
						}
					}
				}
				const blockContents = [];

				for (const blockDef of definitions.default.blocks as BlockDefinition[]) {
					if (!blockDef.label && blockDef.hidden === true) continue;
					const inputs: Record<string, unknown> = {};
					if(blockDef.kind === "button") {
						this.callbackOther[blockDef.callbackKey] = blockDef.callback;

						// this.workspace.registerButtonCallback(blockDef.callbackKey, blockDef.callback);
						blockContents.push(blockDef);
						continue;
					}
					if (!blockDef.label && blockDef.placeholders) {
						for (const placeholder of blockDef.placeholders) {
							const data = placeholder.values;
							const key = Object.keys(data.argValue)[0];
							const value = data.argValue[key];

							inputs[data.argName] = {
								block: {
									type: data.type,
									fields: {}
								}
							};
							// @ts-expect-error Accessing unknown type
							inputs[data.argName]["block"]["fields"][key] = value;
						}
					}

					blockContents.push(
						blockDef.label
							? { kind: "label", text: blockDef.text }
							: {
									kind: "block",
									type: blockDef.id,
									extraState: (blockDef as BlockBlockDefinition).extraState ?? {},
									inputs: inputs
								}
					);
				}
				if(!definitions.default.category.custom) {
					contents.push({
						kind: "category",
						name: definitions.default.category.name,
						contents: blockContents,
						colour: definitions.default.category.colour
					});
				}

			}
			return;
		}

		const element = path.splice(0, 1)[0];

		contents.push({
			kind: "category",
			name: element,
			contents: [],
			colour: "#2facf5"
		});

		await this.setStruct(
			path,
			// @ts-expect-error Unknown type
			(contents[contents.length - 1] as unknown[])["contents"],
			filesInDir,
			topPath
		);
	}

	private filterPaths(path: string, paths: string[]): string[] {
		const resultFiles: string[] = [];
		const directory = path.endsWith("/") ? path.slice(0, -1) : path; // Remove trailing slash if present

		for (const filePath of paths) {
			if (filePath.startsWith(directory)) {
				const fileName = filePath.split("/").pop() as string;
				resultFiles.push(fileName);
			}
		}
		return resultFiles;
	}
}
