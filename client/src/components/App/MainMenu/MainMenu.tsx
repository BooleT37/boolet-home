import * as classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

import "./MainMenu.css";

export enum MainMenuItem {
    Home = "Home",
    Counter = "Counter",
    Tasks = "Tasks",
    Gift = "Gift"
}

interface Props {
    hidden: boolean;
    currentItem: MainMenuItem;
}

export default class MainMenu extends React.Component<Props> {
    render(): JSX.Element {
        return (
            <div className="mainMenu">
                {this.props.hidden && <div className="mainMenu__hoverArea"/>}
                <div className={classNames("mainMenu__container", { mainMenu__container_hidden: this.props.hidden })}>
                    <ul className="mainMenu__list">
                        <MenuItem
                            isCurrent={this.props.currentItem === MainMenuItem.Home}
                            path="/"
                            label="Home"
                        />
                        <MenuItem
                            isCurrent={this.props.currentItem === MainMenuItem.Counter}
                            path="/counter"
                            label="Counter"
                        />
                        <MenuItem
                            isCurrent={this.props.currentItem === MainMenuItem.Tasks}
                            path="/tasks"
                            label="Tasks"
                        />
                        <MenuItem
                            isCurrent={this.props.currentItem === MainMenuItem.Gift}
                            path="/gift"
                            label="Gift"
                        />
                    </ul>
                </div>
            </div>
        );
    }
}

function MenuItem(props: { isCurrent: boolean, path: string, label: string }): JSX.Element {
    return (
        <li className="mainMenu__item">
            <Link
                className={props.isCurrent ? `mainMenu__current` : ""}
                to={`${props.path}`}
            >
                {props.label}
            </Link>
        </li>
    );
}
