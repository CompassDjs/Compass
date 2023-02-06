import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { VoiceState, ChannelType } from "discord.js";
import { sendDataToAPI } from "@utils/api";
import { getCacheField, setCacheField, deleteCacheField } from "@utils/cache";

export class VoiceTimer extends Event {
  constructor(client: ShewenyClient) {
    super(client, "voiceStateUpdate", {
      description: "Track time spent in voice channels",
      emitter: client,
    });
  }

  async execute(oldState: VoiceState, newState: VoiceState) {
    const { member, guild } = newState;
    if (!member || !guild) return;

    if (!oldState.channelId && newState.channelId) {
      // User joined a voice channel

      await setCacheField("voiceSessionStart", guild.id, member.id, Date.now());
    } else if (oldState.channelId && !newState.channelId) {
      // User left a voice channel
      await getCacheField("voiceSessionStart", guild.id, member.id).then(
        async (time: number) => {
          const timeSpent = Date.now() - time;

          await sendDataToAPI(`stats/voice`, "put", {
            userId: member.id,
            guildId: guild.id,
            channelId: oldState.channelId,
            createdAt: Date.now(),
            type: oldState.channel?.type as ChannelType,
            voiceTime: timeSpent,
          });
          deleteCacheField("voiceSessionStart", guild.id, member.id);
        }
      );
    }
  }
}
