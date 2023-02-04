import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { getDataFromAPI } from "@utils/api";
import { Embed } from "@utils/functions";
import prettyMilliseconds from "pretty-ms";
import type { CommandInteraction } from "discord.js";

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

    await getDataFromAPI(`users/i/${user.id}`).then(async (data) => {
      const currentGuild = data
        ? data.guildStats.filter((g: any) => g.guildId === guild.id)
        : [];

      if (currentGuild.length === 0) {
        await interaction.followUp({
          content: "You don't have any stats yet",
        });
      } else {
        await interaction.followUp({
          embeds: [
            Embed()
              .setTitle("📊 Your stats")
              .addFields({
                name: "📢 Voice Time:",
                value: `${"```"}${prettyMilliseconds(
                  currentGuild[0].voiceTime,
                  {
                    verbose: true,
                  }
                )}${"```"}`,
                inline: true,
              }),
          ],
        });
      }
    });
  }
}
