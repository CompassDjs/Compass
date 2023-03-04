import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { getDataFromAPI } from "@utils/api";
import { Defer, Embed } from "@utils/functions";
import prettyMilliseconds from "pretty-ms";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
} from "discord.js";

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
    await Defer(interaction);

    await getDataFromAPI(`stats/bot/${guild.id}/${user.id}`).then(
      async (data) => {
        if (!data.totals) {
          await interaction.followUp({
            content: "`📊` You don't have any stats yet!",
          });
        } else {
          const totalVoiceTime = data.totals.totalVoice;
          const totalGameTime = data.totals.totalGames;
          const totalMsg = data.totals.totalMsg;

          const webLinkBtn =
            new ActionRowBuilder<ButtonBuilder>().addComponents(
              new ButtonBuilder()
                .setLabel("View more")
                .setStyle(ButtonStyle.Link)
                .setURL(process.env.FRONT_URL!)
                .setEmoji("🧭")
            );

          await interaction.followUp({
            embeds: [
              Embed()
                .setAuthor({
                  name: `${guild.name}`,
                  iconURL: guild.iconURL() || undefined,
                })
                .setFooter({
                  text: `${user.tag}`,
                  iconURL: user.displayAvatarURL(),
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
                    inline: true,
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
                ),
            ],
            components: [webLinkBtn],
          });
        }
      }
    );
  }
}
