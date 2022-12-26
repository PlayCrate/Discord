import { ApplicationCommandOptionType as ACOT } from "discord.js";

export = {
  name: "ping",
  cooldown: 5000,
  description: "Replies with Pong!",
  options: [
    {
      name: "user",
      type: ACOT.User,
      description: "The user you want to ban",
      required: true
    }
  ],
  execute: async (client: any, msg: any) => {
    console.log(client, msg);
    return {
      text: "Pong!",
      ephemeral: false
    };
  }
};
