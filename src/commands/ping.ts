export = {
     name: "ping",
     cooldown: 5000,
     permission: [],
     description: "Response of the PlayCrate! Bot",
     execute: async (client: any, msg: any) => {
          return {
               text: `Pong!`,
               ephemeral: false
          };
     }
};
