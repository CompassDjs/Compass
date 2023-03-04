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
    await sendDataToAPI(`guilds/add`, "post", {
      id: guild.id,
      guildCreatedAt: guild.createdAt.getTime(),
    });
    console.log(
      `➕ Guild: ${guild.name} - ${guild.id} - ${guild.members.cache.size} users`
    );
  }
}
