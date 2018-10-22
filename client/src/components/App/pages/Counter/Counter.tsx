import * as React from "react";
import { Language } from "src/models/enums";

import en from "./translations/en";
import ru from "./translations/ru";

import "./Counter.css";

interface Props {
    language: Language;
}

interface State {
    count: number;
}

export default class Counter extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            count: 1
        };
    }

    onButtonClick = () => {
        this.setState({count: this.state.count + 1});
    };

    render(): React.ReactNode {
        const translation = this.props.language === Language.Ru ? ru : en;

        return (
            <div className="counter">
                <p>{translation.text[0]}<br/>{translation.text[1]}</p>
                <h2>{translation.count}: {this.state.count}</h2>
                <button className="counter__button" type="button" onClick={this.onButtonClick}>+1</button>
            </div>
        );
    }
}
