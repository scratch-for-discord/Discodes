export default class LocalDBManager {

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
    follows: User[]
    followers: User[]
    createdAt: Date
    workspaces: DiscodesWorkspace[]
    publishedPluins: DiscodesPlugin[]
    publishedExamples: DiscodesFile[]
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
