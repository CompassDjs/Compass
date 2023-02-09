import { Event } from "sheweny";
import type { Presence } from "discord.js";
import { sendDataToAPI } from "@utils/api";
import type { ShewenyClient } from "sheweny";

export class PresenceTracker extends Event {
  constructor(client: ShewenyClient) {
    super(client, "presenceUpdate", {
      once: false,
    });
  }

  async execute(oldPresence: Presence, _newPresence: Presence) {
    const oldActivity = oldPresence ? oldPresence.activities[0] : null;

    if (oldActivity && oldActivity.type === 0) {
      const { userId, guild } = oldPresence;
      if (userId !== "224537059308732416") return;

      const timeSpent = Date.now() - oldActivity.createdTimestamp;

      await sendDataToAPI(`stats/game`, "put", {
        guildId: guild!.id,
        userId,
        gameName: oldActivity.name,
        gameTime: timeSpent,
      });
    }
  }
}
