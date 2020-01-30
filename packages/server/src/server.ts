import "./configSettingsInitializer";

import * as express from "express";
import * as fallback from "express-history-api-fallback";

import "./aliasesSetup";

import * as paths from "./paths";
import { initializeGamesAssistantRoutes } from "./games-assistant";

const port = process.env.PORT || 8000;
const app = express();

app.use("/", express.static(paths.clientDistPath));
app.use("/english-tasks", express.static(paths.englishTasksPath));
app.use("/Q", express.static(paths.qPath));

app.use(fallback("index.html", { root: paths.clientDistPath }));

initializeGamesAssistantRoutes(app);

app.listen(port, () => {
    console.log(`Server running on ${port}!`);
});
