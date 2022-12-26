import { client } from "../main";
import { handler } from "./modules/Handler";
import { shortenText } from "../misc/Utils";
import { Logger, LogLevel } from "../utility/Logger";
import { racism, slurs } from "../utility/Regex";

export const messages = () => {
  client.on("interactionCreate", async (msg: any) => {
    if (msg.commandName) {
      const msgHadnler = {
        data: msg,

        send: async (response: string, ephemeral: Boolean) => {
          response = shortenText(response, 1950);

          if (racism.test(response) || slurs.test(response)) {
            Logger.log(
              LogLevel.WARN,
              `This message violates the Discord Terms of Service.`
            );
            return;
          }

          try {
            msg.reply(
              ephemeral ? { content: response, ephemeral: true } : response
            );
          } catch (error) {
            Logger.log(LogLevel.ERROR, `Error while sending message: ${error}`);
          }
        }
      };

      handler(msgHadnler);
    }
  });
};
