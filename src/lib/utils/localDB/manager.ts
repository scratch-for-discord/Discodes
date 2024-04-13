import Blockly from "blockly/core";

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
	workspaceSave: object;
	blockLength: number;
};

export type DiscodesFile = {
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
	lastOpened: string
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

	/**
	 * Gets all the files in a workspace , returns undefined if the workspace does not exist.
	 *
	 * @param {string} id
	 * @return {*}  {(DiscodesFile[] | undefined)}
	 * @memberof LocalDB
	 */
	getAllFiles(id: string): DiscodesFile[] | undefined {
		return this.getWorkspaceByID(id)?.files;
	}
	/**
	 * Gets a specific file in a a workspace
	 *
	 * @param {string} fileName
	 * @param {string} workspaceID
	 * @return {*}  {(DiscodesFile | undefined)}
	 * @memberof LocalDB
	 */
	getFile(fileName: string, workspaceID: string): DiscodesFile | undefined {
		return this.getAllFiles(workspaceID)?.find((file) => file.name === fileName);
	}

	addFile(file: DiscodesFile, workspaceID: string): void {
		const workspace = this.getWorkspaceByID(workspaceID);
		if (!workspace) return;
		this.saveWorkspace(workspaceID, {...workspace, files: [...workspace.files, file]});
	}

	/**
	 *	 Saves a blockly workspace save into a discodes workspace file.
	 *
	 * @param {string} fileName
	 * @param {string} workspaceID
	 * @param {object} blocklySave
	 * @return {*}  {void}
	 * @memberof LocalDB
	 */
	saveBlocklyInFile(fileName: string, workspaceID: string, blocklySave: object): void {
		const workspace = this.getWorkspaceByID(workspaceID);
		if (!workspace) return;
		const files: DiscodesFile[] = this.getAllFiles(workspaceID) as DiscodesFile[];

		for (const index in files) {
			if (files[index].name === fileName) {
				files[index].blocklyWorkspaceSave.workspaceSave = blocklySave;
			}
		}
		this.saveWorkspace(workspaceID, {...workspace, files: files, lastEditedAt: new Date()});
	}

	/**
	 * Loads into a workspace the blockly save currently saved in the gien file.
	 *
	 * @param {string} fileName
	 * @param {string} discodesWorkspaceID
	 * @param {Blockly.WorkspaceSvg} blocklyWorkspace
	 * @memberof LocalDB
	 */
	loadBlocklyFromFile(fileName: string, discodesWorkspaceID: string, blocklyWorkspace: Blockly.WorkspaceSvg): void {
		Blockly.serialization.workspaces.load(this.getFile(fileName, discodesWorkspaceID)?.blocklyWorkspaceSave.workspaceSave as object, blocklyWorkspace);
	}
}

let localDB: LocalDB;

export default (): LocalDB => {
	if (!localDB) localDB = new LocalDB();
	return localDB;
};
