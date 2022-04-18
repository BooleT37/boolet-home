import * as React from "react";
import * as ReactDOM from "react-dom";

import Viewer from "./Viewer";

const el = document.createElement("div");
document.body.appendChild(el);

ReactDOM.render(<Viewer />, el);
