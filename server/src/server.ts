import * as express from "express";
import * as path from "path";

import "./aliasesSetup";

import { clientDistPath, clientPublicPath } from "./paths";

const port = 8000;
const app = express();

console.log(clientDistPath);
app.use("/dist", express.static(clientDistPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(clientPublicPath, "index.html"));
});

app.listen(port, () => { console.log(`Server running on ${port}!`); });
