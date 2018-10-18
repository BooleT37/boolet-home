import AxiosInstance from "./AxiosInstance";
import { ErrorResponse, SteamApiValidResponse } from "./SteamApi.models";

export type SteamApiResponse = SteamApiValidResponse & ErrorResponse;

export default {
    getGames: async (playerId: string): Promise<SteamApiResponse> => {
        return AxiosInstance.get(`fakeGetGames?playerId=${playerId}`).then(r => r.data);
    }
};
