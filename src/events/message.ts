import { sendDataToAPI } from "@utils/api";
import { Message } from "discord.js";
import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";

export class MessageCreate extends Event {
  constructor(client: ShewenyClient) {
    super(client, "messageCreate", {
      description: "Message create event",
    });
  }

  execute(message: Message) {
    if (message.author.bot) return;
    const { guild, member, channel } = message;

    sendDataToAPI("stats/message", "post", {
      guildId: guild!.id,
      userId: member!.id,
      messageId: message.id,
      channelId: channel.id,
      type: message.type,
      createdAt: Date.now(),
    });
  }
}
