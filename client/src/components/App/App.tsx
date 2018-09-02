import * as React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Counter from "src/components/App/Counter/Counter";
import Gift from "src/components/App/Gift/Gift";
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
                        <ul className="app__mainMenu">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/counter">Counter</Link>
                            </li>
                            <li>
                                <Link to="/tasks">Tasks</Link>
                            </li>
                            <li>
                                <Link to="/gift">Gift</Link>
                            </li>
                        </ul>
                        <hr className="app__mainMenuHr"/>
                        <Route exact path="/" component={Home} />
                        <Route path="/counter" component={Counter} />
                        <Route path="/tasks" component={Tasks} />
                        <Route path="/gift" component={Gift} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default hot(module)(App);
