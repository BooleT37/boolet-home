import * as express from "express";
import { getGamesForPlayerId } from "./fakeData";
import PlayerIdNotFoundError from "./PlayerIdNotFoundError";
import * as proxy from "express-http-proxy";
import * as config from "config";
import { IncomingHttpHeaders, OutgoingHttpHeaders } from "http2";

export function initializeGamesAssistantRoutes(app: express.Express): void {
    app.use("/api/getGames", proxy("http://api.steampowered.com",
        {
            proxyReqPathResolver: (req: express.Request): string => {
                return `/IPlayerService/GetOwnedGames/v0001${req.url}&key=${config.get<string>("gamesAssistant.steamApiKey")}&format=json`;
            },
            userResHeaderDecorator: (headers: IncomingHttpHeaders): OutgoingHttpHeaders => {
                headers["Access-Control-Allow-Origin"] = "*";
                return headers;
            },
            userResDecorator: (proxyRes: express.Response, proxyResData): string => {
                if (proxyRes.statusCode >= 400) {
                    return JSON.stringify({
                        error: true
                    });
                }
                const data = JSON.parse(proxyResData.toString());
                return JSON.stringify({ games: data.response.games.map(g => [g.appid, g.name]) });
            }
        }));

    app.get("/api/fakeGetGames", (req, res) => {
        try {
            const playerId = req.query.playerId.toLowerCase();
            res.setHeader("Content-type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            const gamesForPlayerId = getGamesForPlayerId(playerId);
            res.send(JSON.stringify({ games: gamesForPlayerId }));
        } catch (e) {
            if (e instanceof PlayerIdNotFoundError) {
                res.statusCode = 404;
            } else {
                res.statusCode = 500;
            }
            res.send(JSON.stringify({ error: e.message }));
        }
    });
}