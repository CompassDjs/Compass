import { Event } from "sheweny";
import { Guild } from "discord.js";
import type { ShewenyClient } from "sheweny";
import { deleteDataFromAPI } from "@utils/api";

export class GuildDelete extends Event {
  constructor(client: ShewenyClient) {
    super(client, "guildDelete", {
      description: "guild left",
    });
  }

  async execute(guild: Guild) {
    await deleteDataFromAPI(`guilds/i/${guild.id}`);
    console.log(
      `➖ Guild: ${guild.name} - ${guild.id} - ${guild.members.cache.size} users`
    );
  }
}
