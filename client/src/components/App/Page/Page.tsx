import Card from "@material-ui/core/Card/Card";
import * as React from "react";
import { withRouter } from "react-router";
import { Language } from "src/models/enums";

import LanguageToggle from "./LanguageToggle/LanguageToggle";
import MainMenu, { InitialProps as MainMenuProps } from "./MainMenu/MainMenu";
import MainMenuItem from "./MainMenu/MainMenuItem";
import en from "./translations/en";
import ru from "./translations/ru";

import "./Page.css";

const MainMenuWithRouter = withRouter(MainMenu) as React.ComponentClass<MainMenuProps>;

interface Props {
    menuItem?: MainMenuItem;
    language: Language;
    title: string;

    onLanguageChange(language: Language): void;
}

export default class extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        setPageTitle(this.props.title);
    }

    componentDidUpdate(): void {
        setPageTitle(this.props.title);
    }

    render(): React.ReactNode {
        const translation = this.props.language === Language.Ru ? ru : en;
        return (
            <div>
                <MainMenuWithRouter language={this.props.language} currentItem={this.props.menuItem}/>
                <div className="page__container">
                    <Card>
                        <div className="page__content">
                            {this.props.children}
                        </div>
                    </Card>
                    <LanguageToggle language={this.props.language} onChange={this.props.onLanguageChange}/>
                    <Footer title={translation.gitHubLinkTitle}/>
                </div>
            </div>
        );
    }
}

function Footer(props: {title: string}): JSX.Element {
    return (
        <div className="page__footer">
            <div className="page__footerLinks">
                <a
                    target="_blank"
                    className="page__gitHubLogo"
                    href="https://github.com/BooleT37/boolet-home"
                    title={props.title}
                >
                    GitHub
                </a>
            </div>
        </div>
    );
}

function setPageTitle(title: string): void {
    document.title = `Boolet-Home | ${title}`;
}
