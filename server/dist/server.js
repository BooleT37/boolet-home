"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("./aliasesSetup");
const paths_1 = require("./paths");
const port = 8000;
const app = express();
app.use("/dist", express.static(paths_1.clientDistPath));
app.get("/", (req, res) => {
    res.sendFile("template.html");
});
app.listen(port, () => { console.log(`Server running on ${port}!`); });
//# sourceMappingURL=server.js.map