import { client } from "../main";
import { Logger, LogLevel } from "../utility/Logger";

export const login = (token: string) => {
  client.on("ready", () => {
    Logger.log(LogLevel.INFO, `Logged in as ${client.user?.tag}!`);
  });

  client.login(token);
};
