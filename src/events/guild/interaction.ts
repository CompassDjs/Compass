import { Event } from "sheweny";
import { Interaction } from "discord.js";
import { getDataFromAPI, sendDataToAPI } from "@utils/api";
import type { ShewenyClient } from "sheweny";

export class InteractionCreate extends Event {
  constructor(client: ShewenyClient) {
    super(client, "interactionCreate", {
      description: "new interaction",
    });
  }

  async execute(interaction: Interaction) {
    const { guild } = interaction;
    if (!guild) return;

    await getDataFromAPI(`guilds/i/${guild.id}`).then(async (data) => {
      if (!data) {
        await sendDataToAPI(`guilds/add`, "post", {
          guildId: guild.id,
          createdAt: guild.createdAt,
          supportedSince: Date.now(),
        });
      }
    });
  }
}
