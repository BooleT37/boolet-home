import * as path from "path";

const packages = path.join(__dirname, "../..");
export const serverPath = path.join(packages, "server");
export const serverDistPath = path.join(serverPath, "dist/server/src");
export const clientPath = path.join(packages, "client");
export const clientDistPath = path.join(clientPath, "dist");
