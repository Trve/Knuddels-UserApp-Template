export type SlashCommandHandler = (user: User, params: string, command: string) => void;
export interface SlashCommands {
	[commandName: string]: (user: User, params: string, command: string) => void;
}

export interface SlashCommandConfig {
	commandName: string;
	commandHandler: SlashCommandHandler;
}
