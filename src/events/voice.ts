import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { VoiceState } from "discord.js";
import { cacheDataToAPI } from "@utils/api";
import { getCacheField, setCacheField, deleteCacheField } from "@utils/cache";

export class VoiceStateUpdateEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "voiceStateUpdate", {
      description: "Track time spent in voice channels",
      emitter: client,
    });
  }

  async execute(oldState: VoiceState, newState: VoiceState) {
    const { member, guild } = newState;

    if (!oldState.channelId && newState.channelId) {
      // User joined a voice channel
      await setCacheField(
        "voiceSessionStart",
        guild.id,
        member!.id,
        Date.now()
      );
    } else if (oldState.channelId && newState.channelId) {
      // User moved to another voice channel
      await getCacheField("voiceSessionStart", guild.id, member!.id).then(
        async (time) => {
          if (typeof time === "number") {
            const timeSpent = Date.now() - time;

            await cacheDataToAPI(`users/i/voice/${member!.id}`, {
              voiceTime: timeSpent,
            });
          }
        }
      );
      await setCacheField(
        "voiceSessionStart",
        guild.id,
        member!.id,
        Date.now()
      );
    } else if (oldState.channelId && !newState.channelId) {
      // User left a voice channel
      await getCacheField("voiceSessionStart", guild.id, member!.id).then(
        async (time) => {
          if (typeof time === "number") {
            const timeSpent = Date.now() - time;

            await cacheDataToAPI(`users/i/voice/${member!.id}`, {
              voiceTime: timeSpent,
            });
            deleteCacheField("voiceSessionStart", guild.id, member!.id);
          }
        }
      );
    }
  }
}
