import * as React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Counter from "./pages/Counter/Counter";
import Gift from "./pages/Gift/Gift";
import Home from "./pages/Home/Home";
import Tasks from "./pages/Tasks/Tasks";
import TimeCalculator from "./pages/TimeCalculator/TimeCalculator";

import "./App.css";

class App extends React.Component {
    // tslint:disable-next-line:prefer-function-over-method
    render(): JSX.Element {
        return (
            <div className="app">
                <Router>
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route path="/counter" component={Counter} />
                        <Route path="/tasks" component={Tasks} />
                        <Route path="/gift" component={Gift} />
                        <Route path="/timeCalculator" component={TimeCalculator} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default hot(module)(App);
