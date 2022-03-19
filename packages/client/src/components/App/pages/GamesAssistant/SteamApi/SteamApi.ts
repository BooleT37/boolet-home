import GetGamesResponse from "serverModels/GetGamesResponse";
import AxiosInstance from "./AxiosInstance";
import ISteamApi from "./ISteamApi";

const SteamApi: ISteamApi = {
    getGames: async (playerId: string): Promise<GetGamesResponse> => {
        const response = await AxiosInstance.get(`getGames?playerId=${playerId}`).then(r => r.data);

        if (!response.games) {
            throw new Error('Unexpected response from Steam API')
        }

        return response
    }
};

export default SteamApi;
