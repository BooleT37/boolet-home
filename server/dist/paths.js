"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const root = path.join(__dirname, "..");
exports.serverPath = path.join(root, "server");
exports.serverSrcPath = path.join(exports.serverPath, "src");
exports.serverDistPath = path.join(exports.serverPath, "dist/server/src");
exports.clientPath = path.join(root, "client");
exports.clientSrcPath = path.join(exports.clientPath, "src");
exports.clientDistPath = path.join(exports.serverPath, "dist/client/src");
//# sourceMappingURL=paths.js.map