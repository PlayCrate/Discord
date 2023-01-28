import { ButtonInteraction } from "discord.js";
import { FeedbackManager } from "../manager/FeedbackManager";
import { CustomClient } from "../main";
import { successfulEmbed } from "../embeds/success";
import { generateCode } from "../services/kattah";

const submitAction = {
     data: { name: "submitAction" },
     async execute(interaction: ButtonInteraction, client: CustomClient) {
          const feedback = new FeedbackManager(interaction);

          await feedback.removeButtons();
          await feedback.gotRequest();

          try {
               const taskId = interaction.customId.split(":")[0];
               const taskDetails = client.tasks.getTask(taskId);

               const embed = successfulEmbed(
                    "Success!",
                    `Code generated! \`${taskDetails.code}\``
               );

               const { success, error } = await generateCode(
                    taskDetails.code,
                    taskDetails.rewards
               );

               if (!success) {
                    return feedback.error(String(error!) as string);
               }

               await feedback.sendMessage({
                    embeds: [embed]
               });
          } catch (err) {
               feedback.error(String(err));
          }
     }
};

export default submitAction;
