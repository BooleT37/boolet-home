import Card from "@material-ui/core/Card/Card";
import Tab from "@material-ui/core/Tab/Tab";
import Tabs from "@material-ui/core/Tabs/";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import MainMenuItem from "src/components/App/Page/MainMenu/MainMenuItem";

import InlineBlock from "src/components/shared/InlineBlock/InlineBlock";

import { Language } from "src/models/enums";

import en from "./translations/en";
import ru from "./translations/ru";

import "./MainMenu.css";

export interface InitialProps {
    language: Language;
    currentItem?: MainMenuItem;
}

type Props = InitialProps & RouteComponentProps;

export default class MainMenu extends React.Component<Props> {
    render(): React.ReactNode {
        const itemNames = this.props.language === Language.Ru ? ru.items : en.items;
        return (
            <Card className="mainMenu">
                <InlineBlock>
                    <Tabs value={this.props.currentItem || ""}>
                        {this.renderTab(MainMenuItem.Home, itemNames[MainMenuItem.Home], "/")}
                        {this.renderTab(MainMenuItem.Counter, itemNames[MainMenuItem.Counter], "/counter")}
                        {this.renderTab(MainMenuItem.TimeCalculator, itemNames[MainMenuItem.TimeCalculator], "/timeCalculator")}
                        {this.renderTab(MainMenuItem.GamesAssistant, itemNames[MainMenuItem.GamesAssistant], "/gamesAssistant")}
                    </Tabs>
                </InlineBlock>
            </Card>
        );
    }

    renderTab(value: MainMenuItem, label: string, path: string): JSX.Element {
        const onClick = () => { this.props.history.push(path); };
        return (
            <Tab value={value} label={label} onClick={onClick}/>
        );
    }
}
