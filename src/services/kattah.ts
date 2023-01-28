import { ApiResponse } from "../types/ApiResponse";
import { authorization } from "../../config.json";
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
