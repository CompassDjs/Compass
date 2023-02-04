import { Event } from "sheweny";
import { Interaction } from "discord.js";
import { getDataFromAPI, sendDataToAPI } from "@utils/api";
import type { ShewenyClient } from "sheweny";

export class interactionCreate extends Event {
  constructor(client: ShewenyClient) {
    super(client, "interactionCreate", {
      description: "new interaction",
    });
  }

  async execute(interaction: Interaction) {
    const { guild } = interaction;

    await getDataFromAPI(`guilds/i/${guild!.id}`).then(async (data) => {
      if (!data) {
        await sendDataToAPI(`guilds/add`, "post", {
          guildId: guild!.id,
          name: guild!.name,
          owner: guild!.ownerId,
          icon: guild!.iconURL() || null,
        });
      }
    });
  }
}
