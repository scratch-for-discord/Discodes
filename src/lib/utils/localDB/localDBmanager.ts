import { Dexie, type Table } from "dexie";

export default class LocalDBManager extends Dexie {
	plugins!: Table<DiscodesPluginDataStore, string>;
	users!: Table<User, string>;

	constructor() {
		super("DiscodesDatabase");

		this.version(1).stores({
			plugins: "id",
			users: "id"
		});
	}

	/**
	 * Returns the plugin table or returns undefined if the owner or the plugin doesn't exist.
	 *
	 * @param {string} id
	 * @return {*}  {(Promise<DiscodesPlugin | undefined>)}
	 * @memberof LocalDBManager
	 */
	async getPlugin(id: string): Promise<DiscodesPlugin | undefined> {
		const val = await this.plugins.get(id);

		if (!val) return undefined;

		const ownerId = val.owner;
		const owner = await this.users.get(ownerId);

		if (!owner) return undefined;

		const obj: DiscodesPlugin = {
			...val,
			owner
		};

		return obj;
	}

	async createUser(userData: User) {
		await this.users.add(userData, window.crypto.randomUUID());
	}
}

//TODO Make those interfaces!
//? Some data are for the backend only, if you feel like it doesn't belong in the localDB don't add them! Thx <3
type BlockConfig = unknown;

type DiscodesPluginDataStore = {
	id: string;
	name: string;
	owner: string;
	description: string;
	downloads: number;
	likes: number;
	rating: number;
	version: number;
	blocks: BlockConfig[];
};

type DiscodesPlugin = {
	id: string;
	owner: User;
	name: string;
	description: string;
	downloads: number;
	likes: number;
	rating: number;
	version: number;
	blocks: BlockConfig[];
};

type User = {
	username: string;
	id: string;
	follows: User[];
	followers: User[];
	createdAt: Date;
	workspaces: DiscodesWorkspace[];
	publishedPlugins: DiscodesPlugin[];
	publishedExamples: DiscodesFile[];
};

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

type DiscodesWorkspace = {
	files: DiscodesFile[];
	createdAt: Date;
	lastEditedAt: Date;
	owner: string;
	editors: string[];
	viewers: string[];
	id: string;
	name: string;
	description: string;
	timeWasted: number;
};
