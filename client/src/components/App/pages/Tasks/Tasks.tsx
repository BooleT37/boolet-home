import * as React from "react";
import { Link, Route } from "react-router-dom";
import Rating from "src/components/App/pages/Tasks/tasks/Rating/Rating";

import "./Tasks.css";
import Flexbox from "./tasks/Flexbox/Flexbox";
import NewPolyfill from "./tasks/NewPolyfill/NewPolyfill";

export default class Tasks extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="tasks">
                <ul className="tasks__list">
                    <li>
                        <Link to="/tasks/flexbox">flexbox</Link>
                    </li>
                    <li>
                        <Link to="/tasks/newPolyfill">new polyfill</Link>
                    </li>
                    <li>
                        <Link to="/tasks/rating">Rating</Link>
                    </li>
                </ul>
                <Route path="/tasks/flexbox" component={Flexbox} />
                <Route path="/tasks/newPolyfill" component={NewPolyfill} />
                <Route path="/tasks/rating" component={Rating} />
            </div>
        );
    }
}
