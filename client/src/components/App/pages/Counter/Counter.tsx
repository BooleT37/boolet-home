import * as React from "react";
import { MainMenuItem } from "src/components/App/MainMenu/MainMenu";
import withMainMenu from "src/decorators/withMainMenu";
import "./Counter.css";

interface State {
    count: number;
}

@withMainMenu(MainMenuItem.Counter)
export default class Counter extends React.Component<undefined, State> {
    constructor() {
        super(undefined);
        this.state = {
            count: 0
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
