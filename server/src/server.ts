import * as express from "express";
import * as path from "path";

import "./aliasesSetup";

import { clientDistPath, serverPublicPath } from "./paths";

const port = process.env.PORT || 8000;
const app = express();

console.log(clientDistPath);
app.use("/dist", express.static(clientDistPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(serverPublicPath, "index.html"));
});

app.listen(port, () => { console.log(`Server running on ${port}!`); });
