import Switch from "@material-ui/core/Switch/Switch";
import * as classNames from "classnames";
import * as React from "react";

import { Language } from "src/models/enums";

import "./LanguageToggle.css";

interface Props {
    language: Language;
    onChange(language: Language): void;
}

export default class LanguageToggle extends React.Component<Props> {
    onLanguageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.props.onChange(e.target.checked ? Language.En : Language.Ru);
    };

    switchToRussian = (e: React.MouseEvent): false|void => {
        this.props.onChange(Language.Ru);
        e.stopPropagation();
        return false;
    };

    switchToEnglish = (e: React.MouseEvent): false|void => {
        this.props.onChange(Language.En);
        e.stopPropagation();
        return false;
    };

    render(): JSX.Element {
        return (
            <div className="languageToggle">
                <Label
                    caption="Русский"
                    current={this.props.language === Language.Ru}
                    onClick={this.switchToRussian}
                />
                <Switch
                    checked={this.props.language === Language.En}
                    onChange={this.onLanguageChange}
                />
                <Label
                    caption="English"
                    current={this.props.language === Language.En}
                    onClick={this.switchToEnglish}
                />
            </div>
        );
    }
}

function Label(props: {caption: string, current: boolean, onClick(e: React.MouseEvent): false|void}): JSX.Element {
    const className = classNames(
        "languageToggle__label",
        {
            "languageToggle__label_current": props.current
        }
    );
    return (
        <span className={className} onClick={e => { props.onClick(e) }}>
            {props.caption}
        </span>
    );
}
