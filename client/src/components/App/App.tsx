import * as React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Counter from "src/components/App/Counter/Counter";
import Home from "src/components/App/Home/Home";
import Tasks from "src/components/App/Tasks/Tasks";

import "./App.css";

class App extends React.Component {
    // tslint:disable-next-line:prefer-function-over-method
    render(): JSX.Element {
        return (
            <div className="app">
                <Router>
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/counter">Counter</Link>
                            </li>
                            <li>
                                <Link to="/tasks">Tasks</Link>
                            </li>
                        </ul>
                        <hr/>
                        <Route exact path="/" component={Home} />
                        <Route path="/counter" component={Counter} />
                        <Route path="/tasks" component={Tasks} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default hot(module)(App);
