import "./configSettingsInitializer";

import * as express from "express";
import * as fallback from "express-history-api-fallback";

import "./aliasesSetup";

import { clientDistPath } from "./paths";
import { initializeGamesAssistantRoutes } from "./games-assistant";

const port = process.env.PORT || 8000;
const app = express();

app.use("/", express.static(clientDistPath));

app.use(fallback("index.html", { root: clientDistPath }));

initializeGamesAssistantRoutes(app);

app.listen(port, () => {
    console.log(`Server running on ${port}!`);
});
