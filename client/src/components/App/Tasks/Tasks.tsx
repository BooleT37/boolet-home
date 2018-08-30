import * as React from "react";
import { Route, Link } from "react-router-dom";
import Task1 from "./tasks/Task1/Task1";

import "./Tasks.css";

export default class Tasks extends React.Component {
    // tslint:disable-next-line:prefer-function-over-method
    render(): JSX.Element {
        return (
            <div className="tasks">
                <ul className="tasks__list">
                    <li>
                        <Link to="/tasks/task1">task1</Link>
                    </li>
                </ul>
                <Route path="/tasks/task1" component={Task1} />
            </div>
        );
    }
}
