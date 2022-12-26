import { readdirSync } from "fs";
const commands = new Map();

export const loadCommands = (dir = "./src/commands/") => {
  for (let file of readdirSync(dir).filter((f) => f.endsWith(".ts"))) {
    let pull = require(`../../commands/${file}`);
    if (pull.name) {
      commands.set(pull.name, pull);
    }
  }

  return { commands };
};
