import Button from "@material-ui/core/Button/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "@material-ui/core/Input/Input";
import * as classNames from "classnames";
import * as React from "react";

import InlineBlock from "src/components/shared/InlineBlock/InlineBlock";
import Row from "src/components/shared/Row/Row";
import RowItem from "src/components/shared/Row/RowItem/RowItem";
import { Language } from "src/models/enums";

import SteamApi from "./SteamApi/SteamApi";

import "./GamesAssistant.css";

interface Props {
    language: Language;
}

interface State {
    inputValue: string;
    loading: boolean;
    errorMessage: string;
    games: string[];
}

export default class GamesAssistant extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
          inputValue: "",
          loading: false,
          errorMessage: "",
          games: []
        };
    }

    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({inputValue: e.target.value, errorMessage: ""});
    };

    onInputKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13 || e.which === 13) { // Enter
            await this.showGames();
        }
    };

    showGames = async () => {
        this.setState({loading: true, errorMessage: ""});
        try {
            const games = await SteamApi.getGames(this.state.inputValue);
            this.setState({loading: false, games});
        } catch (e) {
            console.log(e.response);
            this.setState({loading: false, games: [], errorMessage: getErrorMessage(e.response || e)});
        }
    };

    render(): JSX.Element {
        return (
            <div className="GamesAssistant">
                <div className="GamesAssistant__body">
                    <div className="GamesAssistant__controls">
                        <InlineBlock>
                            <Row>
                                <RowItem>
                                    <Input
                                        value={this.state.inputValue}
                                        onChange={this.onInputChange}
                                        onKeyPress={this.onInputKeyPress}
                                    />
                                </RowItem>
                                <RowItem>
                                    <Row align="center">
                                        <RowItem>
                                            <Button variant="outlined" onClick={this.showGames}>
                                                Показать игры
                                            </Button>
                                        </RowItem>
                                        <RowItem>
                                            <Spinner shown={this.state.loading}/>
                                        </RowItem>
                                    </Row>
                                </RowItem>
                            </Row>
                        </InlineBlock>
                    </div>
                    {this.state.games.length !== 0 && <div>{JSON.stringify(this.state.games.join())}</div>}
                    {this.state.errorMessage && <div className="GamesAssistant__error">{this.state.errorMessage}</div>}
                </div>
            </div>
        );
    }
}

function Spinner(props: {shown: boolean}): JSX.Element {
    return (
        <div className={classNames("GamesAssistant__spinner", {GamesAssistant__spinner_shown: props.shown})}>
            <CircularProgress size={20}/>
        </div>
    );
}

function getErrorMessage(e: any): string {
    let message = "Ошибка Steam API";
    if (e.status) {
        message += ` [${e.status}]`;
    }
    if (e.message) {
        message += `: ${e.message}`;
    } else if (e.statusText) {
        message += `: ${e.statusText}`;
    }
    return message;
}
