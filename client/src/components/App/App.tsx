import * as React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Q from "src/components/App/pages/Q/Q";
import Counter from "./pages/Counter/Counter";
import Gift from "./pages/Gift/Gift";
import Home from "./pages/Home/Home";
import Tasks from "./pages/Tasks/Tasks";
import TimeCalculator from "./pages/TimeCalculator/TimeCalculator";

import "src/fonts/Lobster-Regular";
import "src/fonts/MarckScript-Regular";

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
                        <Route path="/q" component={Q} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default hot(module)(App);
