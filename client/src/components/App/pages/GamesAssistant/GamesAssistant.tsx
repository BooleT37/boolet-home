import Button from "@material-ui/core/Button/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "@material-ui/core/Input/Input";
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
    }

    onInputKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13 || e.which === 13) { // Enter
            await this.showGames();
        }
    }

    showGames = async () => {
        this.setState({loading: true, errorMessage: ""});
        try {
            const games = await SteamApi.getGames(this.state.inputValue);
            this.setState({loading: false, games});
        } catch (e) {
            this.setState({loading: false, games: [], errorMessage: e.message});
        }
    }

    render(): JSX.Element {
        return (
            <div className="GamesAssistant">
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
                                        {this.state.loading && <CircularProgress size={20}/>}
                                    </RowItem>
                                </Row>
                            </RowItem>
                        </Row>
                    </InlineBlock>
                </div>
                <div>
                    {this.state.games.join()}
                </div>
            </div>
        );
    }
}
