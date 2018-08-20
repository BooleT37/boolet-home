import "ignore-styles";
import * as moduleAlias from "module-alias";
import { clientDistPath, serverDistPath } from "./paths";

moduleAlias.addAlias("src", serverDistPath);
moduleAlias.addAlias("client", clientDistPath);
