import {
     Client,
     GatewayIntentBits,
     REST,
     Routes,
     Collection,
     CommandInteraction,
     ButtonInteraction
} from "discord.js";
import { token, client_id, refresh_time } from "../config.json";
import { loadCommands } from "./events/modules/Commands";

import { login } from "./events/Login";
import { messages } from "./events/Message";

import { LogLevel, Logger } from "./utility/Logger";
import { ConfigSchema } from "./validators/ConfigSchema";

const result = ConfigSchema.validate(require("../config.json"));
if (result.error) {
     Logger.log(
          LogLevel.ERROR,
          `Config validation error: ${result.error.message}`
     );
     process.exit(1);
}

if (refresh_time < 360000) {
     Logger.log(
          LogLevel.ERROR,
          "Refresh time must be at least 360000ms (6 minutes)"
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
     commands: Collection<string, CommandInteraction>;
     buttons: Collection<string, CustomButtonInteraction>;
}

export const client = new Client({
     intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildVoiceStates,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
          GatewayIntentBits.GuildMembers
     ]
}) as CustomClient;

(async () => {
     login(token);
     messages();
     const commandsMapped = loadCommands();
     const commands = [...commandsMapped.commands.values()];

     const rest = new REST({ version: "10" }).setToken(token);
     try {
          Logger.log(
               LogLevel.DEBUG,
               "Started refreshing application (/) commands."
          );

          await rest.put(Routes.applicationCommands(client_id), {
               body: commands
          });

          Logger.log(
               LogLevel.INFO,
               "Successfully reloaded application (/) commands."
          );
     } catch (error) {
          Logger.log(
               LogLevel.ERROR,
               `Error while reloading application (/) commands: ${error}`
          );
     }
})();
