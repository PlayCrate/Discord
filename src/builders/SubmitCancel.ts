import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { ButtonStyle } from "discord.js";

const SubmitCancel = (taskId: string) => {
     const row = new ActionRowBuilder<ButtonBuilder>();
     row.addComponents(
          new ButtonBuilder()
               .setCustomId(`${taskId}:submitAction`)
               .setEmoji({ name: "✅" })
               .setLabel(`Generate Code`)
               .setStyle(ButtonStyle.Success)
     );
     row.addComponents(
          new ButtonBuilder()
               .setLabel("Cancel")
               .setStyle(ButtonStyle.Danger)
               .setCustomId(`cancelAction`)
     );
     return row;
};

export default SubmitCancel;
