import Card from "@material-ui/core/Card/Card";
import * as React from "react";
import { withRouter } from "react-router";
import { Language } from "src/models/enums";

import LanguageToggle from "./LanguageToggle/LanguageToggle";
import MainMenu, { MainMenuItem, InitialProps as MainMenuProps } from "./MainMenu/MainMenu";

import "./Page.css";

const MainMenuWithRouter = withRouter(MainMenu) as React.ComponentClass<MainMenuProps>;

interface Props {
    menuItem: MainMenuItem;
    language: Language;
    onLanguageChange(language: Language): void;
}

export default class extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div>
                <MainMenuWithRouter currentItem={this.props.menuItem}/>
                <div className="page__container">
                    <Card>
                        <div className="page__content">
                            {this.props.children}
                        </div>
                    </Card>
                    <LanguageToggle language={this.props.language} onChange={this.props.onLanguageChange}/>
                </div>
            </div>
        );
    }
}
