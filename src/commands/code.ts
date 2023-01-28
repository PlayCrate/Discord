import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { CustomClient } from "../main";
import { FeedbackManager } from "../manager/FeedbackManager";
import SubmitCancel from "../builders/SubmitCancel";
import { interactionEmbed } from "../embeds/interaction";
import { randomBytes } from "crypto";
import { adminChannels } from "../../config.json";

function generateCode() {
     let code = randomBytes(2).toString("hex");
     code +=
          "-" +
          randomBytes(2).toString("hex") +
          "-" +
          randomBytes(2).toString("hex");
     return code.toUpperCase();
}

const code = {
     channels: adminChannels,
     data: new SlashCommandBuilder()
          .setName("code")
          .setDescription("Set Code of PlayCrate")
          .addStringOption((option) =>
               option
                    .setName("reward")
                    .setDescription("Please put rewardId")
                    .setRequired(true)
          ),
     async execute(interaction: CommandInteraction, client: CustomClient) {
          const feedback = new FeedbackManager(interaction);
          await feedback.gotRequest();

          const rewardId = interaction.options.get("reward")?.value as string;
          const taskId = client.tasks.addTask({
               interaction: interaction,
               code: generateCode(),
               rewards: rewardId,
               action: "submitAction"
          });

          const buildEmbed = interactionEmbed(
               "Code",
               "Do you want to generate a code for reward? " +
                    "```" +
                    rewardId +
                    "```"
          );
          const buildComponents = SubmitCancel(taskId);
          await feedback.sendMessage({
               embeds: [buildEmbed],
               components: [buildComponents]
          });
     }
};

export default code;
