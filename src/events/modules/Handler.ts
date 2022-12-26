import { loadCommands } from "./Commands";
import { client } from "../../main";
import Cooldown from "./Cooldown";
import { Logger, LogLevel } from "../../utility/Logger";

const cooldown = new Cooldown();
const { commands } = loadCommands();

export const handler = async (msg: any): Promise<void> => {
  if (msg) {
    const cooldownKey = `${msg.data.commandName}-${msg.data.user.id}`;
    if (cooldown.has(cooldownKey))
      return await msg.send(`Please wait... You are on cooldown!`, true);

    let command = commands.get(msg.data.commandName);
    if (!command) return;

    if (command) {
      try {
        if (command.cooldown) {
          cooldown.set(cooldownKey, command.cooldown);
        }

        const response = await command.execute(client, msg);

        if (response) {
          if (response.error) {
            setTimeout(() => {
              cooldown.delete(cooldownKey);
            }, 2000);
          } else if (response.text) {
            await msg.send(
              response.text.replace(/\n|\r/g, " "),
              response.ephemeral
            );
          }
        }
      } catch (error) {
        Logger.log(LogLevel.ERROR, `Error while executing command: ${error}`);
      }
    }
  }
};
