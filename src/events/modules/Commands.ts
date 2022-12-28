import * as fs from "fs";
import { type } from "../../../config.json";
const commands = new Map();

export const loadCommands = () => {
     const typeSync =
          type === "dev" ? "./src/commands/" : "./build/src/commands/";
     const typeCompiler = type === "dev" ? ".ts" : ".js";
     for (let file of fs
          .readdirSync(typeSync)
          .filter((f) => f.endsWith(typeCompiler))) {
          let pull = require(`../../commands/${file}`);
          if (pull.name) {
               commands.set(pull.name, pull);
          }
     }

     return { commands };
};
