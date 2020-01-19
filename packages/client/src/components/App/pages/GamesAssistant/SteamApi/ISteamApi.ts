import GetGamesResponse from "serverModels/GetGamesResponse";

interface ISteamApi {
    getGames(playerId: string): Promise<GetGamesResponse>;
}

export default ISteamApi;
