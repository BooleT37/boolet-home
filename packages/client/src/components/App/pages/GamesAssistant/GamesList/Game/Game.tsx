import GridListTile from "@material-ui/core/GridListTile/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar/GridListTileBar";
import * as React from "react";
import GameModel from "serverModels/GameModel";

import Row from "src/components/shared/Row/Row";
import RowItem from "src/components/shared/Row/RowItem/RowItem";

import "./Game.css";
import * as defaultLogo from "./images/defaultLogo.png";

interface Props {
    game: GameModel;
}

export default class Game extends React.PureComponent<Props> {
    getLogoSrcOrDefault(): string {
        const game = this.props.game;
        if (game.logo) {
            return `https://steamcdn-a.opskins.media/steamcommunity/public/images/apps/${game.id}/${game.logo}.jpg`;
        }
        return defaultLogo;
    }

    getIconSrc(): string {
        const game = this.props.game;
        return `https://steamcdn-a.opskins.media/steamcommunity/public/images/apps/${game.id}/${game.icon}.jpg`;
    }

    getGameUrl(): string {
        return `https://store.steampowered.com/app/${this.props.game.id}`;
    }

    render(): JSX.Element {
        const game = this.props.game;
        return (
            <a href={this.getGameUrl()} target="_blank" title={game.name}>
                <GridListTile component="span" key={game.id} className="Game__list-tile">
                    <img src={this.getLogoSrcOrDefault()} alt={game.name} />
                    <GridListTileBar
                        title={this.renderGameTitle()}
                    />
                </GridListTile>
            </a>
        );
    }

    renderGameTitle(): JSX.Element {
        const game = this.props.game;
        return (
            <Row inline align="center" margin="narrow" className="Game__title">
                <RowItem>
                    {game.icon && <img src={this.getIconSrc()} alt="Icon" className="Game__icon"/>}
                </RowItem>
                <RowItem className="Game__name">
                    {game.name}
                </RowItem>
            </Row>
        );
    }
}
