import "./configSettingsInitializer";

import * as config from "config";
import * as express from "express";
import * as fallback from "express-history-api-fallback";

import "./aliasesSetup";

import { clientDistPath } from "./paths";

const port = process.env.PORT || 8000;
const app = express();

app.use("/", express.static(clientDistPath));
app.use(fallback("index.html", { root: clientDistPath }));

console.log(config.get("gamesAssistant.steamApiKey"));

app.listen(port, () => {
    console.log(`Server running on ${port}!`);
});
