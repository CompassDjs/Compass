import { Event } from "sheweny";
import { Guild } from "discord.js";
import type { ShewenyClient } from "sheweny";
import { sendDataToAPI } from "@utils/api";

export class guildCreate extends Event {
  constructor(client: ShewenyClient) {
    super(client, "guildCreate", {
      description: "new guild joined",
    });
  }

  async execute(guild: Guild) {
    await sendDataToAPI(`guilds/add`, "post", {
      guildId: guild.id,
      name: guild.name,
      owner: guild.ownerId,
      icon: guild.iconURL(),
    });
    console.log(
      `➕ Guild: ${guild.name} - ${guild.id} - ${guild.members.cache.size} users`
    );
  }
}
