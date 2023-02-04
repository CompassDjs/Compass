import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { getDataFromAPI } from "@utils/api";
import prettyMilliseconds from "pretty-ms";
import type { CommandInteraction } from "discord.js";

export class myStats extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "stats",
      description: "Get your stats",
      category: "Stats",
      cooldown: 3,
    });
  }
  async execute(interaction: CommandInteraction) {
    const { guild, user } = interaction;
    await interaction.deferReply();

    await getDataFromAPI(`users/i/${user.id}`).then(async (data) => {
      const currentGuild = data
        ? data.guildStats.filter((g: any) => g.guildId === guild!.id)
        : [];

      if (currentGuild.length === 0) {
        await interaction.followUp({
          content: "You don't have any stats yet",
        });
      } else {
        await interaction.followUp({
          content: `**Your ${guild!.name} Stats:**\n> \`${prettyMilliseconds(
            currentGuild[0].voiceTime,
            {
              verbose: true,
            }
          )}\` in a voice channel. 📢`,
        });
      }
    });
  }
}
