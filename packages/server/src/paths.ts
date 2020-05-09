import * as path from "path";

export const packages = path.join(__dirname, "../..");
export const serverPath = path.join(packages, "server");
export const serverDistPath = path.join(serverPath, "dist/server/src");
export const clientPath = path.join(packages, "client");
export const clientDistPath = path.join(clientPath, "dist");
export const tasksPath = path.join(clientPath, "/packages/tasks/dist");
export const qPath = path.join(clientPath, "/packages/q/dist");
export const giftPath = path.join(clientPath, "/packages/gift/dist");
export const bouquetPath = path.join(clientPath, "/packages/wedding-bouquet/dist");
