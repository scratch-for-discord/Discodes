import { Dexie, type Table } from "dexie";

let dbManager: LocalDBManager

export function getDB() {
    if (!dbManager) {
        dbManager = new LocalDBManager()
    }

    return dbManager
}

// SINGLETON CLASS! DO NOT BUILD
class LocalDBManager extends Dexie {
    plugins!: Table<DiscodesPlugin, string>
    workspaces!: Table<DiscodesWorkspace, string>
    examples!: Table<DiscodesWorkspace, string>

    constructor() {
        super("DiscodesDatabase")

        this.version(1).stores({
            plugins: "id",
            workspaces: "id",
            examples: "id",
        })
    }
}

let userStore: UserStorage

export function getUserStore() {
    if (!userStore) userStore = new UserStorage()

    return userStore
}

// SINGLETON CLASS! DO NOT BUILD
class UserStorage {
    // Be sure to implement both push and pull methods inside these 3 methods (i.e. Pushing offline created ones to server and pulling online ones from the server)
    async syncPlugins(): Promise<DiscodesPlugin> {
        throw new Error('Method not implemented')
    }

    async syncWorkspaces(): Promise<DiscodesWorkspace> {
        throw new Error('Method not implemented')
    }

    async syncExamples(): Promise<DiscodesWorkspace> {
        throw new Error('Method not implemented')
    }

    setUser(user: User) {
        localStorage.setItem("userdata", JSON.stringify(user))
    }

    async refreshFollowers(): Promise<string[]> {
        throw new Error("Method not implemented") // TODO: Dynamically fetch followers based on their id/the user id from the database
    }

    async refreshFollowings(): Promise<string[]> {
        throw new Error("Menthod not implemented")
    }

    async getFollowers() {
        await this.refreshFollowers()

        const userData = this.getUserData()

        return await Promise.all(userData.followers.map(v => new UserDataGetter(v)))
    }

    async getFollowings() {
        await this.refreshFollowings()

        const userData = this.getUserData()

        return await Promise.all(userData.follows.map(v => new UserDataGetter(v)))
    }

    async getPublishedExamples() {
        const userDataJson = this.getUserData()

        const db = getDB()

        await this.syncExamples()

        const plugins = await Promise.all(userDataJson.publishedExamples.map((str) => db.plugins.get(str)))

        return plugins
    }

    getUserData() {
        const userData = localStorage.getItem("userdata")

        if (!userData) throw new Error("User has not logged on yet")

        const userDataJson = JSON.parse(userData) as User // I don't like using 'as' here but I've got no choice

        return userDataJson
    }

    async getPublishedPlugins() {
        const userDataJson = this.getUserData()

        const db = getDB()

        await this.syncPlugins()

        const plugins = await Promise.all(userDataJson.publishedPlugins.map((str) => db.plugins.get(str)))

        return plugins
    }

    async getWorkspaces() {
        const userData = this.getUserData()

        const db = getDB()

        await this.syncWorkspaces()

        const workspaces = await Promise.all(userData.workspaces.map((str) => db.workspaces.get(str)))

        return workspaces
    }
}

export class UserDataGetter {
    id: string

    constructor(id: string) {
        this.id = id
    }

    async getData(): Promise<User> {
        throw new Error("Method not implemented")
    }
}

//TODO Make those interfaces!
//? Some data are for the backend only, if you feel like it doesn't belong in the localDB don't add them! Thx <3
type BlockConfig = unknown;

type DiscodesPlugin = {
    id: string,
    owner: User
    name: string
    description: string
    downloads: number
    likes: number
    rating: number
    version: number
    blocks: BlockConfig[]
}

type User = {
    username: string
    id: string
    follows: string[]
    followers: string[]
    createdAt: Date
    workspaces: string[]
    publishedPlugins: string[]
    publishedExamples: string[]
}

type BlocklyWorkspaceSave = {
    workspaceSave: object | string
    blockLength: number
}

type DiscodesFile = {
    name: string
    createdAt: Date
    lastEditedAt: Date
    blocklyWorkspaceSave: BlocklyWorkspaceSave
    thumbnail: string
    timeWasted: number
}

type DiscodesWorkspace = {
    files: DiscodesFile[]
    createdAt: Date
    lastEditedAt: Date
    owner: string
    editors: string[]
    viewers: string[]
    id: string
    name: string
    description: string
    timeWasted: number
}
