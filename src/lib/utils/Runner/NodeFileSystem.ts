import type { WebContainer } from "@webcontainer/api";

export class NodeFileSystemManager {
	container: WebContainer;
	// any type due to the dynamic nature of the file system
	// eslint-disable-next-line
	files: Record<string, any> = {};

	constructor(container: WebContainer) {
		this.container = container;
	}

	addFiles(to: string, content: string) {
		const arr = to.split("/");

		if (arr.length === 1) {
			this.files[to] = content;
			return;
		}

		// assume last item is file name
		const [first, last] = [arr.shift(), arr.pop()];

		if (!first || !last)
			throw new Error("Unknown Error: Unable to locate first and last items of an array");

		this.files[first] = {};

		if (arr.length === 0) {
			this.files[first][last] = content;
			return;
		}

		// recurrsion baby
		// Disable due to a dynamic object where key is the directory/file name and value is the content of that file
		// eslint-disable-next-line
		const getFiles = (dir: string[], filesObj: Record<string, any>) => {
			if (dir.length === 1) {
				filesObj[dir[0]] = content;

				return;
			}

			const first = dir.shift() as string;

			filesObj[first] = {};

			getFiles(dir, filesObj[first]);
		};

		getFiles(arr, this.files);
	}

	compileFiles() {
		// I need to find a more efficient way to do this
		// this.container.mount(this.files);
	}
}
