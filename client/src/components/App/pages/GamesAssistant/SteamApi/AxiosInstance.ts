import Axios from "axios";

export default Axios.create({
    baseURL: process.env.API_URL
});
