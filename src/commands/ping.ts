import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { CustomClient } from "../main";
import { FeedbackManager } from "../manager/FeedbackManager";

const test = {
     data: new SlashCommandBuilder()
          .setName("ping")
          .setDescription("Bot response command"),
     async execute(interaction: CommandInteraction, client: CustomClient) {
          const feedback = new FeedbackManager(interaction);
          await feedback.gotRequest();
     }
};

export default test;
