import { WebContainer, type WebContainerProcess } from "@webcontainer/api";
import { NodeFileSystemManager } from "./NodeFileSystem";

// SINGLETON CLASS DO NOT MANUALLY BUILD
class ContainerBuilder {
	fileSystem!: NodeFileSystemManager;
	container!: WebContainer;
	isReady: boolean = false;
	shell?: WebContainerProcess
	terminal = ""

	constructor(currentTerminal?: string) {
		this.terminal = currentTerminal || "";

		(async() => {
			this.container = await WebContainer.boot();
			this.fileSystem = new NodeFileSystemManager(this.container);

			this.isReady = true;
		})()
	}

	async start() {
		if(!this.fileSystem.isMounted) throw new Error("Files have not mounted yet")

		const shellProcess = await this.container.spawn("node index.js")
		
		shellProcess.output.pipeTo(new WritableStream({
			write: (chunk) => {
				this.terminal += chunk + "\n"
			}
		}))

		this.shell = shellProcess
	}

	async stop() {
		if(!this.shell) return

		this.shell.kill()

		this.shell = undefined
	}
}

let containerBuilderInstance: ContainerBuilder;

export function getContainer() {
	if (containerBuilderInstance) return containerBuilderInstance;

	containerBuilderInstance = new ContainerBuilder();

	return containerBuilderInstance;
}
