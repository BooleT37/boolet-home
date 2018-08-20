"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("ignore-styles");
const moduleAlias = require("module-alias");
const paths_1 = require("./paths");
moduleAlias.addAlias("src", paths_1.serverDistPath);
moduleAlias.addAlias("client", paths_1.clientDistPath);
//# sourceMappingURL=aliasesSetup.js.map