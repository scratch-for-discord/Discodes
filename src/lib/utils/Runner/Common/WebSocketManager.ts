export enum WSOPCodes {
    CommitFile = 0,
    TerminalUpdate = 1,
    InstallationComplete = 2,
    BotStarted = 3
}

export interface WebSocketData<T> {
    op: WSOPCodes;
    d: T;
}

export const WEBSOCKET_ERRORS = {
    NotConnected: "WEBSOCKET ERROR: NOT CONNECTED"
}

export interface WebSocketInitOptions {
    onMessage?: <T>(eventName: WSOPCodes, data: T) => void
}

export class WebSocketManager {
    ws: WebSocket
    // eslint-disable-next-line
    files: Record<string, any> = {}
    terminal = ""

    constructor(wsAddress: string, options: WebSocketInitOptions) {
        this.ws = new WebSocket(wsAddress)

        this.ws.addEventListener("message", ({ data }) => {
            const trueData = JSON.parse(data.toString()) as WebSocketData<unknown>

            if(trueData.op === WSOPCodes.TerminalUpdate) {
                this.terminal += (trueData as WebSocketData<string>).d
                return
            }

            if(options.onMessage) options.onMessage<unknown>(trueData.op, (trueData as WebSocketData<unknown>).d)
        })
    }

    pushFile(name: string, content: string) {
        if(!name.includes("/")) {
            this.files[name] = content
            return
        }

        const fileSystemRoutes = name.split("/")

        let obj = this.files

        fileSystemRoutes.forEach((val, i) => {
            if(!this.#isDirectory(fileSystemRoutes, i)) {
                obj[val] = content

                return
            }

            if(!obj[val]) obj[val] = {}

            obj = obj[val]
        })
    }

    sendFiles(appId: string) {
        if(this.ws.readyState !== 1) throw new Error(WEBSOCKET_ERRORS.NotConnected)

        this.ws.send(JSON.stringify({
            op: WSOPCodes.CommitFile,
            d: {
                app: appId,
                files: this.files
            }
        }))
    }

    #isDirectory(array: string[], index: number) {
        return index !== array.length - 1
    }
}