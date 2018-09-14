import * as express from "express";
import * as fallback from "express-history-api-fallback";

import "./aliasesSetup";

import { clientDistPath, serverPublicPath } from "./paths";

const port = process.env.PORT || 8000;
const app = express();

app.use("/dist", express.static(clientDistPath));
app.use(express.static(serverPublicPath));
app.use(fallback("index.html", { root: serverPublicPath }));

app.listen(port, () => {
    console.log(`Server running on ${port}!`);
});
