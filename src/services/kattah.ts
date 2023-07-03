import { ApiResponse } from "../types/ApiResponse";
import { authorization, DEBUG } from "../../config.json";
import fetch from "node-fetch";

const api = "https://roblox.kattah.me/new-code";

export async function generateCode(
     code: string,
     rewardId: string
): Promise<ApiResponse> {
     try {
          const response = await fetch(api, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: authorization
               },
               body: JSON.stringify({
                    code: code,
                    rewards: rewardId,
                    used_by: "UNKNOWN"
               })
          }).then((res) => res.json());
          return response;
     } catch (err) {
          throw new Error("An error occurred while generating a code.");
     }
}

export async function generateDiscordCode(
     discordId: string,
     discordName: string
): Promise<ApiResponse> {
     const link = DEBUG
          ? "https://playcrate-debug.kattah.me/discord-verify"
          : "https://roblox.kattah.me/discord-verify";

     try {
          const response = await fetch(link, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: authorization
               },
               body: JSON.stringify({
                    payload: "REQUEST_CODE",
                    discordId: discordId,
                    discordName: discordName
               })
          }).then((res) => res.json());
          return response;
     } catch (err) {
          throw new Error("An error occurred while generating a code.");
     }
}
