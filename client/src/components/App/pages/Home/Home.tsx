import * as React from "react";
import { Language } from "src/models/enums";

import en from "./translations/en";
import ru from "./translations/ru";

import "./Home.css";

interface Props {
    language: Language;
}

export default class Home extends React.Component<Props> {
    // tslint:disable-next-line:prefer-function-over-method
    render(): React.ReactNode {
        const translations = this.props.language === Language.Ru ? ru : en;
        return (
            <div className="Home">
                <p>{translations.text[0]}</p>
                <p>{translations.text[1]}</p>
            </div>
        );
    }
}
