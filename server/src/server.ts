import * as express from "express";

import "./aliasesSetup";

import { clientDistPath } from "./paths";

const port = 8000;
const app = express();

app.use("/dist", express.static(clientDistPath));

app.get("/", (req, res) => {
  res.sendFile("template.html");
});

app.listen(port, () => { console.log(`Server running on ${port}!`); });
