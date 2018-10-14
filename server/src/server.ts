import "./configSettingsInitializer";

import * as config from "config";
import * as express from "express";
import * as fallback from "express-history-api-fallback";
import * as proxy from "express-http-proxy";

import "./aliasesSetup";

import { clientDistPath } from "./paths";

const port = process.env.PORT || 8000;
const app = express();

app.use("/", express.static(clientDistPath));
app.use(fallback("index.html", { root: clientDistPath }));

app.use("/getGames", proxy("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/",
{
    proxyReqPathResolver: (req: express.Request) => `${req.url}&key=${config.get<string>("gamesAssistant.steamApiKey")}&format=json`,
    userResDecorator: (proxyRes, proxyResData) => {
        const data = JSON.parse(proxyResData.toString());
        return JSON.stringify(data.response.games.map(g => g.appid));
      }
}));

app.listen(port, () => {
    console.log(`Server running on ${port}!`);
});
