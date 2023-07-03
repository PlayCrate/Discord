import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { CustomClient } from "../main";
import { FeedbackManager } from "../manager/FeedbackManager";
import { generateDiscordCode } from "../services/kattah";
import { successfulEmbed } from "../embeds/success";
import { DEBUG, DEBUG_TESTERS } from "../../config.json";

const verify = {
     data: new SlashCommandBuilder()
          .setName("verify")
          .setDescription("Verify your roblox account"),
     async execute(interaction: CommandInteraction, client: CustomClient) {
          const feedback = new FeedbackManager(interaction);
          await feedback.gotRequest();
          const { id, username } = interaction.member?.user as any;

          if (DEBUG && !DEBUG_TESTERS.includes(id)) {
               await feedback.error("You are not a tester.");
               return;
          }

          try {
               const verify = await generateDiscordCode(id, username);
               const { success, message, error } = verify;
               if (success) {
                    const embed = successfulEmbed("Success!", `${message}`);
                    await feedback.sendMessage({
                         embeds: [embed]
                    });
               } else {
                    feedback.error(String(error));
               }
          } catch (err) {
               feedback.error("An error occurred while generating a code.");
          }
     }
};

export default verify;
