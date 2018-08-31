import * as React from "react";
import { Route, Link } from "react-router-dom";
import Flexbox from "./tasks/Flexbox/Flexbox";
import NewPolyfill from "./tasks/NewPolyfill/NewPolyfill";

import "./Tasks.css";

export default class Tasks extends React.Component {
    // tslint:disable-next-line:prefer-function-over-method
    render(): JSX.Element {
        return (
            <div className="tasks">
                <ul className="tasks__list">
                    <li>
                        <Link to="/tasks/flexbox">flexbox</Link>
                    </li>
                    <li>
                        <Link to="/tasks/newPolyfill">new polyfill</Link>
                    </li>
                </ul>
                <Route path="/tasks/flexbox" component={Flexbox} />
                <Route path="/tasks/newPolyfill" component={NewPolyfill} />
            </div>
        );
    }
}
