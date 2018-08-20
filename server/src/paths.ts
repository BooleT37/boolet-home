import * as path from "path";

const root = path.join(__dirname, "..");
export const serverPath = path.join(root, "server");
export const serverSrcPath = path.join(serverPath, "src");
export const serverDistPath = path.join(serverPath, "dist/server/src");
export const clientPath = path.join(root, "client");
export const clientSrcPath = path.join(clientPath, "src");
export const clientDistPath = path.join(serverPath, "dist/client/src");
