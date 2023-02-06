import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { getDataFromAPI } from "@utils/api";
import { Embed } from "@utils/functions";
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
    await interaction.deferReply();

    await getDataFromAPI(`stats/i/${user.id}`).then(async (data) => {
      if (!data) {
        await interaction.followUp({
          content: "You don't have any stats yet",
        });
      } else {
        await interaction.followUp({
          embeds: [
            Embed()
              .setTitle("📊 Your stats")
              .addFields(
                {
                  name: "📢 Voice Time:",
                  value: `${"```"}${prettyMilliseconds(data.totalVoiceTime, {
                    verbose: true,
                  })}${"```"}`,
                  inline: true,
                },
                {
                  name: "📝 Messages:",
                  value: `${"```"}${data.user.msgSent}${"```"}`,
                },
                {
                  name: "🎮 Game Time:",
                  value: `${"```"}${prettyMilliseconds(data.totalGameTime, {
                    verbose: true,
                  })}${"```"}`,
                  inline: true,
                }
              ),
          ],
        });
      }
    });
  }
}
