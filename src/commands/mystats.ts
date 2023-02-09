import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { getDataFromAPI } from "@utils/api";
import { Embed, Wait } from "@utils/functions";
import prettyMilliseconds from "pretty-ms";
import { CommandInteraction } from "discord.js";

export class MyStats extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "stats",
      description: "Get your stats",
      category: "Stats",
      cooldown: 3,
      clientPermissions: ["EmbedLinks"],
    });
  }
  async execute(interaction: CommandInteraction) {
    const { guild, user } = interaction;
    if (!guild) return;
    await Wait(1000);
    await interaction.deferReply();

    await getDataFromAPI(`stats/i/${guild.id}/${user.id}`).then(
      async (data) => {
        if (!data) {
          await interaction.followUp({
            content: "You don't have any stats yet",
          });
        } else {
          console.log(data);
          const totalVoiceTime = data.guildTotalVoice;
          const totalGameTime = data.totalGameTime;
          const totalMsg = data.guildTotalMsg;
          await interaction.followUp({
            embeds: [
              Embed()
                .setAuthor({
                  name: `${guild.name} 📊`,
                  iconURL: guild.iconURL() || undefined,
                })
                .addFields(
                  {
                    name: "📢 Voice Time",
                    value: `${"```"}${
                      totalVoiceTime
                        ? prettyMilliseconds(totalVoiceTime, {
                            verbose: true,
                          })
                        : "0"
                    }${"```"}`,
                    inline: true,
                  },
                  {
                    name: "📝 Messages",
                    value: `${"```"}${totalMsg ? totalMsg : "0"}${"```"}`,
                  },
                  {
                    name: "🎮 Game Time",
                    value: `${"```"}${
                      totalGameTime
                        ? prettyMilliseconds(totalGameTime, {
                            verbose: true,
                          })
                        : "0"
                    }${"```"}`,
                    inline: true,
                  }
                )
                .setTimestamp(),
            ],
          });
        }
      }
    );
  }
}
