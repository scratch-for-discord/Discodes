import type { WebContainer } from "@webcontainer/api";

export class NodeFileSystemManager {
	container: WebContainer;
	// any type due to the dynamic nature of the file system
	// eslint-disable-next-line
	files: Record<string, any> = {
		commands: {
			directory: {

			}
		}
	};
	isMounted = false

	constructor(container: WebContainer) {
		this.container = container;
	}

	// eslint-disable-next-line
	setPackageJson(content: Record<string, any>) {
		if(this.isMounted) {
			this.container.fs.writeFile("./package.json", JSON.stringify(content, null, 4))
		}

		this.files['package.json'] = {
			file: {
				contents: JSON.stringify(content, null, 4)
			}
		}
	}

	setIndex(content: string) {
		if(this.isMounted) {
			this.container.fs.writeFile("./index.js", content)
		}

		this.files['index.js'] = {
			file: {
				contents: content
			}
		}
	}

	addCommand(name: string, content: string) {
		if(this.isMounted) {
			this.container.fs.writeFile(`./commands/${name}.js`, content)
		}

		this.files.commands.directory[`${name}.js`] = content
	}

	compileFiles() {
		this.container.mount(this.files);
		this.isMounted = true
	}
}
