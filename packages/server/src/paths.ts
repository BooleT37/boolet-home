import * as path from "path";

export const packages = path.join(__dirname, "../..");
export const serverPath = path.join(packages, "server");
export const serverDistPath = path.join(serverPath, "dist/server/src");
export const clientPath = path.join(packages, "client");
export const clientDistPath = path.join(clientPath, "dist");
export const englishTasksPath = path.join(clientPath, "/packages/english-tasks/dist");
