import Axios from "axios";

const axiosInstance = Axios.create({
    baseURL: process.env.API_URL
  });

export default {
    getGames: async (playerId: string): Promise<string[]> => {
        return axiosInstance.get(`getGames?playerId=${playerId}`).then(r => r.data);
    }
};
