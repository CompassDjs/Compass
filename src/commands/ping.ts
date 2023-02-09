import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { Defer, Embed } from "@utils/functions";
import type { CommandInteraction } from "discord.js";
import { apiPing } from "@utils/api";

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
    let start = Date.now();
    await Defer(interaction);
    const djsApiLantency = Date.now() - 1000 - start;

    start = Date.now();
    await apiPing();
    const cpsApiLatency = Date.now() - start;

    await interaction.followUp({
      embeds: [
        Embed()
          .setTitle("🏓 Pong!")
          .addFields(
            {
              name: "🤖 Bot Latency",
              value: `${"```"}${djsApiLantency}ms${"```"}`,
            },
            {
              name: "📡 Discord API",
              value: `${"```"}${interaction.client.ws.ping}ms${"```"}`,
              inline: true,
            },
            {
              name: "🧭 Compass API",
              value: `${"```"}${cpsApiLatency}ms${"```"}`,
              inline: true,
            }
          ),
      ],
    });
  }
}
