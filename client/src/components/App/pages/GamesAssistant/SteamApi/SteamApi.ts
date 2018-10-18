import Axios from "axios";

const axiosInstance = Axios.create({
    baseURL: process.env.API_URL
  });

interface ErrorResponse {
    error?: true;
}

export interface SteamApiValidResponse {
    ids: string[];
}

export type SteamApiResponse = SteamApiValidResponse & ErrorResponse;

export default {
    getGames: async (playerId: string): Promise<SteamApiResponse> => {
        return axiosInstance.get(`getGames?playerId=${playerId}`).then(r => r.data);
    }
};
