import { WebContainer } from "@webcontainer/api";
import { NodeFileSystemManager } from "./NodeFileSystem";

// SINGLETON CLASS DO NOT MANUALLY BUILD
class ContainerBuilder {
	fileSystem!: NodeFileSystemManager;
	container!: WebContainer;
	isReady: boolean = false;

	constructor() {
		(async() => {
			this.container = await WebContainer.boot();
			this.fileSystem = new NodeFileSystemManager(this.container);

			this.isReady = true;
		})();
	}
}

let containerBuilderInstance: ContainerBuilder;

export function getContainer() {
	if (containerBuilderInstance) return containerBuilderInstance;

	containerBuilderInstance = new ContainerBuilder();

	return containerBuilderInstance;
}
