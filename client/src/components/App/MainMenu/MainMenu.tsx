import Card from "@material-ui/core/Card/Card";
import Tab from "@material-ui/core/Tab/Tab";
import Tabs from "@material-ui/core/Tabs/";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import InlineBlock from "src/components/shared/InlineBlock/InlineBlock";

import "./MainMenu.css";

export enum MainMenuItem {
    Home = "Home",
    Counter = "Counter",
    Tasks = "Tasks",
    Gift = "Gift",
    TimeCalculator = "TimeCalculator",
    Q = "Q"
}

export interface InitialProps {
    currentItem: MainMenuItem;
}

type Props = InitialProps & RouteComponentProps<{}>;

export default class MainMenu extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <Card className="mainMenu">
                <InlineBlock>
                    <Tabs value={this.props.currentItem}>
                        {this.renderTab(MainMenuItem.Home, "Home", "/")}
                        {this.renderTab(MainMenuItem.Counter, "Counter", "/counter")}
                        {this.renderTab(MainMenuItem.Tasks, "Tasks", "/tasks")}
                        {this.renderTab(MainMenuItem.Gift, "Gift", "/gift")}
                        {this.renderTab(MainMenuItem.TimeCalculator, "Time Calculator", "/timeCalculator")}
                        {this.renderTab(MainMenuItem.Q, "Q", "/q")}
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
