import "./configSettingsInitializer";

import * as config from "config";
import * as express from "express";
import * as fallback from "express-history-api-fallback";
import * as proxy from "express-http-proxy";
import { playerIds } from "./fakeData";

import "./aliasesSetup";

import { clientDistPath } from "./paths";

const port = process.env.PORT || 8000;
const app = express();

app.use("/", express.static(clientDistPath));

app.use("/api/getGames", proxy("http://api.steampowered.com",
{
    proxyReqPathResolver: (req: express.Request) => {
        return `/IPlayerService/GetOwnedGames/v0001${req.url}&key=${config.get<string>("gamesAssistant.steamApiKey")}&format=json`;
    },
    userResHeaderDecorator: (headers: object) => {
        headers["Access-Control-Allow-Origin"] = "*";
        return headers;
    },
    userResDecorator: (proxyRes: express.Response, proxyResData) => {
        if (proxyRes.statusCode >= 400) {
            return {
                error: true
            };
        }
        const data = JSON.parse(proxyResData.toString());
        return JSON.stringify({ids: data.response.games.map(g => g.appid)});
      }
}));

app.get("/api/fakeGetGames", (req, res) => {
    const playerId = req.query.playerId.toLowerCase();
    res.setHeader("Content-type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (!(playerId in playerIds)) {
        res.statusCode = 404;
        res.send(JSON.stringify({error: "Player id not found"}));
    }
    res.send(JSON.stringify({ ids: playerIds[playerId]}));
});

app.use(fallback("index.html", { root: clientDistPath }));

app.listen(port, () => {
    console.log(`Server running on ${port}!`);
});
