import { WebSocketManager, type WebSocketInitOptions } from "../Common/WebSocketManager";

// TODO: IMPLEMENT MORE FUNCTIONS FOR REMOTE WS

export class RemoteWSManager extends WebSocketManager {
	constructor(wsAddress: string, options: WebSocketInitOptions = {}) {
		super(wsAddress, options);
	}
}
