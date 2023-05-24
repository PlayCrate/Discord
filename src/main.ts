import {
     Client,
     GatewayIntentBits,
     Collection,
     CommandInteraction,
     ButtonInteraction
} from "discord.js";
import { token } from "../config.json";

import { login } from "./events/Login";
import { messages } from "./events/Message";

import { LogLevel, Logger } from "./utility/Logger";
import { ConfigSchema } from "./validators/ConfigSchema";
import importInteractions from "./import-int";
import TaskManager from "./manager/TaskManager";

const result = ConfigSchema.validate(require("../config.json"));
if (result.error) {
     Logger.log(
          LogLevel.ERROR,
          `Config validation error: ${result.error.message}`
     );
     process.exit(1);
}

interface CustomButtonInteraction extends ButtonInteraction {
     execute: (
          interaction: CommandInteraction | ButtonInteraction,
          client: CustomClient
     ) => Promise<void>;
}

export interface CustomClient extends Client {
     tasks: TaskManager;
     commands: Collection<string, CommandInteraction>;
     buttons: Collection<string, CustomButtonInteraction>;
}

const buildClient = (): CustomClient => {
     const client = new Client({
          intents: [
               GatewayIntentBits.Guilds,
               GatewayIntentBits.GuildVoiceStates,
               GatewayIntentBits.GuildMessages,
               GatewayIntentBits.MessageContent,
               GatewayIntentBits.GuildMembers
          ]
     }) as CustomClient;

     client.tasks = new TaskManager();
     client.commands = new Collection();
     client.buttons = new Collection();

     return client;
};

export const client = buildClient();

(async () => {
     login(token);
     messages();
     importInteractions(client);
})();
