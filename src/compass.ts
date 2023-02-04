import { ShewenyClient } from "sheweny";
import {
  IntentsBitField,
  PermissionFlagsBits,
  ActivityType,
  Partials,
} from "discord.js";

export default class Compass extends ShewenyClient {
  constructor() {
    super({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildVoiceStates,
      ],
      partials: [
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
      ],
      presence: {
        activities: [
          {
            name: "SENW",
            type: ActivityType.Watching,
          },
        ],
      },
      managers: {
        commands: {
          directory: "./commands",
          autoRegisterApplicationCommands: true,
          applicationPermissions: true,
          default: {
            type: "SLASH_COMMAND",
            channel: "GUILD",
            cooldown: 3,
            userPermissions: [PermissionFlagsBits.UseApplicationCommands],
          },
        },
        events: {
          directory: "./events",
          default: {
            once: false,
          },
        },
        buttons: {
          directory: "./interactions/buttons",
        },
        selectMenus: {
          directory: "./interactions/selectmenus",
        },
      },
      mode: "development", // Change to production for production bot
    });
  }
}
