import { EmbedBuilder } from "discord.js";

export function Embed(color = true) {
  const embed = new EmbedBuilder();
  if (color) embed.setColor("#2f3136");
  return embed;
}

export function Wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
