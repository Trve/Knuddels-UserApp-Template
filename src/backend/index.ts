import '@lib/polyfills/polyfills-backend';

import {SlashCommands} from '@server/types';

export class Server implements App {

	public chatCommands: SlashCommands = {};

	constructor() {
		// init
	}

	public onAppStart(): void {
		// start
	}

	public onPrepareShutdown(secondsTillShutdown: number): void {
		// prepare shutdown
	}

	public onShutdown(): void {
		// shutdown
	}

}

declare let App: Server;

App = new Server();
