import { WebContainer } from "@webcontainer/api";
import { NodeFileSystemManager } from "./NodeFileSystem";

// SINGLETON CLASS DO NOT MANUALLY BUILD
class ContainerBuilder {
	fileSystem!: NodeFileSystemManager;
	container!: WebContainer;
	isReady: boolean = false
	termianlData = ``;

	constructor() {
		(async () => {
			this.container = await WebContainer.boot();
			this.fileSystem = new NodeFileSystemManager(this.container);

			this.isReady = true;
		})();
	}

	async runCommand(command: string) {
		if (!this.isReady) throw new Error("Sorry, Terminal is not ready yet");

		const keywords = command.split(" ");

		const cmd = keywords.shift();

		if (!cmd) throw new Error("Cannot extract command prefix from the string");

		const spawnProcess = await this.container.spawn(cmd, keywords);

		// eslint-disable-next-line
		let d = this.termianlData

		await spawnProcess.output.pipeTo(
			new WritableStream({
				write(data) {
					d += `\n${data}`;
				}
			})
		);

		return spawnProcess.exit;
	}
}

let containerBuilderInstance: ContainerBuilder;

export function getContainer() {
	if (!containerBuilderInstance) containerBuilderInstance = new ContainerBuilder();

	return containerBuilderInstance;
}
