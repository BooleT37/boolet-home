import "./configSettingsInitializer";

import * as express from "express";
import * as fallback from "express-history-api-fallback";
import * as bodyParser from "body-parser";

import "./aliasesSetup";

import * as paths from "./paths";
import { initializeGamesAssistantRoutes } from "./games-assistant";

const port = process.env.PORT || 8000;
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static(paths.clientDistPath));
app.post("/tasks/forms", (req, res) => {
    res.render('forms-task', { data: req.body });
});
app.use("/tasks", express.static(paths.tasksPath));
app.use("/Q", express.static(paths.qPath));
app.use("/gift", express.static(paths.giftPath));
app.use("/wedding-bouquet", express.static(paths.bouquetPath));

initializeGamesAssistantRoutes(app);

app.use(fallback("index.html", { root: paths.clientDistPath }));

app.listen(port, () => {
    console.log(`Server running on ${port}!`);
});
