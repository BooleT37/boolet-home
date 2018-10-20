import GetGamesResponse from "serverModels/GetGamesResponse";
import AxiosInstance from "./AxiosInstance";
import ISteamApi from "./ISteamApi";

const FakeSteamApi: ISteamApi = {
    getGames: async (playerId: string): Promise<GetGamesResponse> => {
        return AxiosInstance.get(`fakeGetGames?playerId=${playerId}`).then(r => r.data);
    }
};

export default FakeSteamApi;
