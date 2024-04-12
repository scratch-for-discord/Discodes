//TODO Make those interfaces!
//? Some data are for the backend only, if you feel like it doesn't belong in the localDB don't add them! Thx <3
// type BlockConfig = unknown;

// type DiscodesPlugin = {
// 	id: string;
// 	owner: string;
// 	name: string;
// 	description: string;
// 	downloads: number;
// 	likes: number;
// 	rating: number;
// 	version: number;
// 	blocks: BlockConfig[];
// };

// type User = {
// 	username: string;
// 	id: string;
// 	follows: string[];
// 	followers: string[];
// 	createdAt: Date;
// 	workspaces: string[];
// 	publishedPlugins: string[];
// 	publishedExamples: string[];
// };

type BlocklyWorkspaceSave = {
	workspaceSave: object | string;
	blockLength: number;
};

type DiscodesFile = {
	name: string;
	createdAt: Date;
	lastEditedAt: Date;
	blocklyWorkspaceSave: BlocklyWorkspaceSave;
	thumbnail: string;
	timeWasted: number;
};

export type DiscodesWorkspace = {
	id: string;
	files: DiscodesFile[];
	createdAt: Date;
	lastEditedAt: Date;
	owner: string;
	editors: string[];
	viewers: string[];
	name: string;
	description: string;
	timeWasted: number;
	token: string;
};

class LocalDB {
	/**
	 *  The user's unique identifier, returns null it doesn't exist.
	 *
	 * @type {(string | null)}
	 * @memberof LocalDB
	 */
	get userID(): string | null {
		return window.localStorage.getItem("userID");
	}

	set userID(id: string) {
		window.localStorage.setItem("userID", id);
	}

	/**
	 * An array of the saved workspaces, if no workspaces are saved the array is empty.
	 *
	 * @readonly
	 * @type {DiscodesWorkspace[]}
	 * @memberof LocalDB
	 */
	get workspaces(): DiscodesWorkspace[] {
		return JSON.parse(window.localStorage.getItem("workspaces") || '{"workspaces": []}').workspaces;
	}

	set workspaces(workspacesArray: DiscodesWorkspace[]) {
		localStorage.setItem("workspaces", JSON.stringify({ workspaces: workspacesArray }));
	}

	/**
	 * Adds a workspace to the LocalDB
	 *
	 * @param {DiscodesWorkspace} workspace
	 * @memberof LocalDB
	 */
	addWorkspace(workspace: DiscodesWorkspace): void {
		this.workspaces = [...this.workspaces, workspace];
	}

	/**
	 * Returns the desired workspace with the given ID, if the workspace does not exists, returs undefined.
	 *
	 * @param {string} id
	 * @return {*}  {(DiscodesWorkspace | undefined)}
	 * @memberof LocalDB
	 */
	getWorkspaceByID(id: string): DiscodesWorkspace | undefined {
		return this.workspaces.find((workspace) => workspace.id === id);
	}

	/**
	 * Deletes a workspace from the LocalDB by it's ID
	 *
	 * @param {string} id
	 * @memberof LocalDB
	 */
	deleteWorkspace(id: string) {
		this.workspaces = this.workspaces.filter((workspace) => workspace.id !== id);
	}

	/**
	 *  Overwrites a workspace definition
	 *
	 * @param {string} id
	 * @param {DiscodesWorkspace} newWorkspace
	 * @memberof LocalDB
	 */
	saveWorkspace(id: string, newWorkspace: DiscodesWorkspace): void {
		const newWorkspaceArray: DiscodesWorkspace[] = this.workspaces.map((workspace) => {
			// Automatically modify the last edited at here
			if (workspace.id === id) return { ...newWorkspace, lastEditedAt: new Date() };
			return workspace;
		});

		this.workspaces = newWorkspaceArray;
	}
}

let localDB: LocalDB;

export default (): LocalDB => {
	if (!localDB) localDB = new LocalDB();
	return localDB;
};
