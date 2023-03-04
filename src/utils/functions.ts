import { CommandInteraction, EmbedBuilder } from "discord.js";

export function Embed(color = true) {
  const embed = new EmbedBuilder();
  if (color) embed.setColor("#2b2d31");
  return embed;
}

export function Wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function Defer(interaction: CommandInteraction) {
  let bool = true;
  await interaction.deferReply({ ephemeral: true }).catch(() => {
    bool = false;
  });
  await Wait(1000);
  return bool;
}
