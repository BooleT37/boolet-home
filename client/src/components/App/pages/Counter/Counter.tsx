import * as React from "react";
import "./Counter.css";

interface State {
    count: number;
}

export default class Counter extends React.Component<{}, State> {
    constructor() {
        super(undefined);
        this.state = {
            count: 1
        };
    }

    onButtonClick = () => {
        this.setState({count: this.state.count + 1});
    };

    render(): React.ReactNode {
        return (
            <div className="counter">
                <h2>Count: {this.state.count}</h2>
                <button className="counter__button" type="button" onClick={this.onButtonClick}>+1</button>
            </div>
        );
    }
}
