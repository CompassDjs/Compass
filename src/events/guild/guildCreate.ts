import { Event } from "sheweny";
import { Guild } from "discord.js";
import type { ShewenyClient } from "sheweny";
import { sendDataToAPI } from "@utils/api";

export class GuildCreate extends Event {
  constructor(client: ShewenyClient) {
    super(client, "guildCreate", {
      description: "new guild joined",
    });
  }

  async execute(guild: Guild) {
    //ajouter supportedSince
    await sendDataToAPI(`guilds/add`, "post", {
      guildId: guild.id,
      createdAt: guild.createdAt,
      supportedSince: Date.now(),
    });
    console.log(
      `➕ Guild: ${guild.name} - ${guild.id} - ${guild.members.cache.size} users`
    );
  }
}
