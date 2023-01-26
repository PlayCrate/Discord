import got from "got";

async function makeRequest(url: string) {
     const { body } = await got(url, {
          method: "GET",
          headers: {
               "Content-Type": "application/json",
               "User-Agent": "Roblox/WinInet",
               "X-Requested-With": "XMLHttpRequest"
          }
     });

     if (!body) return;
     const parsed = JSON.parse(body);
     return parsed;
}

export const groupInfo = async (groupID: number) => {
     const groups = await makeRequest(
          `https://groups.roblox.com/v1/groups/${groupID}`
     );

     if (!groups) return;
     return groups;
};

export const gameInfo = async (gameID: number) => {
     const gameInfo = await makeRequest(
          `https://games.roblox.com/v1/games?universeIds=${gameID}`
     );

     if (!gameInfo) return;
     const { playing, visits, favoritedCount } = gameInfo.data[0];
     return {
          playing,
          visits,
          favoritedCount
     };
};
