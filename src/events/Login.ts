import { ActivityType, Guild } from "discord.js";
import { client } from "../main";
import { Logger, LogLevel } from "../utility/Logger";
import { gameInfo, groupInfo } from "../services/roblox";
import { guilds, refresh_time } from "../../config.json";

export const login = (token: string) => {
     client.on("ready", async () => {
          Logger.log(LogLevel.INFO, `Logged in as ${client.user?.tag}!`);

          client.user?.setActivity(`PlayCrate!`, {
               type: ActivityType.Playing
          });

          client.guilds.cache.forEach((guild: Guild) => {
               if (!guilds.includes(guild.id)) return;
               Logger.log(LogLevel.INFO, `Connected to ${guild.name}`);

               const categoryChannels = guild.channels.cache.filter(
                    (channel) => channel.type === 4
               );

               categoryChannels.forEach((channel) => {
                    channel.name = channel.name.toLowerCase();
                    console.log(channel.name);
                    if (channel.name !== "➤ server stats") return;

                    setInterval(async () => {
                         const FindChannelsByParentID =
                              guild.channels.cache.filter(
                                   (parent) => parent.parentId === channel.id
                              );

                         const playCrate = await gameInfo(4158951932);
                         const playCrateGroup = await groupInfo(13004189);

                         FindChannelsByParentID.forEach((vc) => {
                              vc.name = vc.name.toLowerCase();

                              console.log(`Updated in ${guild.name}!`);
                              if (vc.name.includes("playing")) {
                                   vc.setName(
                                        `Playing Now: ${playCrate?.playing.toLocaleString()}`
                                   );
                              } else if (vc.name.includes("members")) {
                                   let serverMembers = vc.guild.memberCount;
                                   vc.setName(`Members: ${serverMembers}`);
                              } else if (vc.name.includes("visits")) {
                                   const format = new Intl.NumberFormat("en", {
                                        notation: "standard",
                                        compactDisplay: "short"
                                   }).format(playCrate?.visits);

                                   vc.setName(`Visits: ${format}`);
                              } else if (vc.name.includes("fans")) {
                                   const format = new Intl.NumberFormat("en", {
                                        notation: "compact",
                                        compactDisplay: "short",
                                        maximumFractionDigits: 2
                                   }).format(playCrateGroup?.memberCount);

                                   vc.setName(`Fans: ${format}`);
                              }
                         });
                    }, 5000);
               });
          });
     });

     client.login(token);
};
