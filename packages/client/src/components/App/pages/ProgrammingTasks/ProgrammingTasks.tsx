import * as React from "react";
import { Link, Route } from "react-router-dom";
import Rating from "./tasks/Rating/Rating";
import Flexbox from "./tasks/Flexbox/Flexbox";
import NewPolyfill from "./tasks/NewPolyfill/NewPolyfill";

import "./ProgrammingTasks.css";

export default class ProgrammingTasks extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="programming-tasks">
                <ul className="programming-tasks__list">
                    <li>
                        <Link to="/programming-tasks/flexbox">flexbox</Link>
                    </li>
                    <li>
                        <Link to="/programming-tasks/newPolyfill">new polyfill</Link>
                    </li>
                    <li>
                        <Link to="/programming-tasks/rating">Rating</Link>
                    </li>
                </ul>
                <Route path="/programming-tasks/flexbox" component={Flexbox} />
                <Route path="/programming-tasks/newPolyfill" component={NewPolyfill} />
                <Route path="/programming-tasks/rating" component={Rating} />
            </div>
        );
    }
}
