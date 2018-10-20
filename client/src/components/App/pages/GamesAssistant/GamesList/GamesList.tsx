import GridList from "@material-ui/core/GridList/GridList";
import GridListTile from "@material-ui/core/GridListTile/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import * as React from "react";
import GameModel from "serverModels/GameModel";
import { Language } from "src/models/enums";

import Game from "./Game/Game";
import en from "./translations/en";
import ru from "./translations/ru";

import "./GamesList.css";

interface Props {
    language: Language;
    games: GameModel[];
}

export default class GamesList extends React.PureComponent<Props> {
    render(): JSX.Element {
        return (
            <div className="GamesList">
                {this.props.games.length === 0 ? <EmptyListMessage/> : this.renderGrid()}
            </div>
        );
    }

    renderGrid(): JSX.Element {
        const translations = this.props.language === Language.En ? en : ru;
        return (
            <GridList cellHeight={69}>
                <GridListTile key="Subheader" cols={2} className="GamesList__title" style={{ height: "auto" }}>
                    <ListSubheader component="div">{translations.title}</ListSubheader>
                </GridListTile>
                {this.props.games.map(g => <Game key={g.id} game={g}/>)}
            </GridList>
        );
    }
}

function EmptyListMessage(): JSX.Element {
    return <div className="GamesList__emptyListMessage">Нет общих игр</div>;
}
