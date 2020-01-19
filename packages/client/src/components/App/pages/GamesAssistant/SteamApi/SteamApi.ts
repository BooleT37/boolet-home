import GetGamesResponse from "serverModels/GetGamesResponse";
import AxiosInstance from "./AxiosInstance";
import ISteamApi from "./ISteamApi";

const SteamApi: ISteamApi = {
    getGames: async (playerId: string): Promise<GetGamesResponse> => {
        return AxiosInstance.get(`getGames?playerId=${playerId}`).then(r => r.data);
    }
};

export default SteamApi;
