import { WebSocketManager, type WebSocketInitOptions } from "../Common/WebSocketManager";

// TODO: IMPLEMENT MORE FUNCTIONS FOR LOCAL WS

export class LocalWSManager extends WebSocketManager {
    constructor(wsAddress: string, options: WebSocketInitOptions = {}) {
        super(wsAddress, options)
    }
}