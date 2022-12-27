import { ActivityType } from "discord.js";
import { client } from "../main";
import { Logger, LogLevel } from "../utility/Logger";

export const login = (token: string) => {
     client.on("ready", () => {
          Logger.log(LogLevel.INFO, `Logged in as ${client.user?.tag}!`);

          client.user?.setActivity(
               `Active in ${client.guilds.cache.size} Servers`,
               {
                    type: ActivityType.Streaming,
                    url: "https://www.twitch.tv/dontaddthisbot"
               }
          );
     });

     client.login(token);
};
