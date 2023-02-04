import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { Embed } from "@utils/functions";
import type { CommandInteraction } from "discord.js";

export class Ping extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "ping",
      description: "Ping Pong",
      category: "Misc",
      cooldown: 3,
      clientPermissions: ["EmbedLinks"],
    });
  }

  async execute(interaction: CommandInteraction) {
    const start = Date.now();
    await interaction.deferReply();
    const end = Date.now();
    const time = end - start;

    await interaction.followUp({
      embeds: [
        Embed()
          .setTitle("🏓 Pong!")
          .addFields(
            {
              name: "🤖 Bot Latency:",
              value: `${"```"}${time}ms${"```"}`,
              inline: true,
            },
            {
              name: "📡 API Latency:",
              value: `${"```"}${interaction.client.ws.ping}ms${"```"}`,
              inline: true,
            }
          ),
      ],
    });
  }
}
