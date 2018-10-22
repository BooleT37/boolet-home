import * as path from "path";

const root = path.join(__dirname, "../..");
export const serverPath = path.join(root, "server");
export const serverDistPath = path.join(serverPath, "dist/server/src");
export const clientPath = path.join(root, "client");
export const clientDistPath = path.join(clientPath, "dist");
