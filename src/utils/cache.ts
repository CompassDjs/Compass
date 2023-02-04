import db from "quick.db";

export async function getCacheField(
  key: string,
  guildId: string,
  userId: string
) {
  return (await db.get(`${key}_${guildId}_${userId}`)) || null;
}

export async function setCacheField(
  key: string,
  guildId: string,
  userId: string,
  data: any
) {
  return await db.set(`${key}_${guildId}_${userId}`, data);
}

export function deleteCacheField(key: string, guildId: string, userId: string) {
  return db.delete(`${key}_${guildId}_${userId}`);
}
