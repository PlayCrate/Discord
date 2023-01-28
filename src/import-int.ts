import {
     ButtonInteraction,
     Collection,
     CommandInteraction,
     SlashCommandBuilder
} from "discord.js";
import path from "path";
import fs from "fs";
import { type } from "../config.json";
import { CustomClient } from "./main";

const importInteractions = (client: CustomClient) => {
     importCommands(client.commands);
     importButtonInteractions(client.buttons);
};
const isProd = type === "prod" ? ".js" : ".ts";

const importCommands = (
     clientCommands: Collection<string, CommandInteraction>
) => {
     const commandsPath = path.join(__dirname, "commands");
     const commandFiles = fs
          .readdirSync(commandsPath)
          .filter((file) => file.endsWith(isProd));

     for (const file of commandFiles) {
          const filePath = path.join(commandsPath, file);
          let pull = require(filePath);
          console.log(pull);
          if (pull.default) {
               const commandData = pull.default.data as SlashCommandBuilder;
               clientCommands.set(commandData.name, pull.default);
          }
     }
};

const importButtonInteractions = (
     clientButtons: Collection<string, ButtonInteraction>
) => {
     const buttonInteractionsPath = path.join(__dirname, "buttons");
     const buttonInteractionsFiles = fs
          .readdirSync(buttonInteractionsPath)
          .filter((file) => file.endsWith(isProd));

     for (const file of buttonInteractionsFiles) {
          const filePath = path.join(buttonInteractionsPath, file);
          let pull = require(filePath);
          if (pull) {
               clientButtons.set(pull.default.data.name, pull.default);
          }
     }
};

export default importInteractions;
