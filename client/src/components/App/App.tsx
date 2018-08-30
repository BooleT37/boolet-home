import * as React from "react";
import { hot } from "react-hot-loader";

import "./App.css";

import Counter from "./Counter/Counter";

class App extends React.Component {
    // tslint:disable-next-line:prefer-function-over-method
    render(): JSX.Element {
        return (
            <div className="">
                <Counter/>
            </div>
        );
    }
}

export default hot(module)(App);
