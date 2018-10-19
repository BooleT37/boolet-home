import Button from "@material-ui/core/Button/Button";
import Chip from "@material-ui/core/Chip/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Input from "@material-ui/core/Input/Input";
import Switch from "@material-ui/core/Switch/Switch";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { AddCircle } from "@material-ui/icons";
import * as classNames from "classnames";
import * as React from "react";
import FakeSteamApi from "src/components/App/pages/GamesAssistant/SteamApi/FakeSteamApi";

import InlineBlock from "src/components/shared/InlineBlock/InlineBlock";
import Row from "src/components/shared/Row/Row";
import RowItem from "src/components/shared/Row/RowItem/RowItem";
import { Language } from "src/models/enums";

import "./GamesAssistant.css";

import { Game } from "./GamesAssistant.models";
import SteamApi from "./SteamApi/SteamApi";
import en from "./translations/en";
import ru from "./translations/ru";

interface Props {
    language: Language;
}

interface State {
    inputValue: string;
    loading: boolean;
    errorMessage: string;
    games: Game[];
    playerIds: string[];
    useFakeApi: boolean;
}

export default class GamesAssistant extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            inputValue: "",
            loading: false,
            errorMessage: "",
            games: [],
            playerIds: [],
            useFakeApi: false
        };
    }

    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({inputValue: e.target.value, errorMessage: ""});
    };

    onInputKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13 || e.which === 13) { // Enter
            await this.addPlayerId();
        }
    };

    addPlayerId = () => {
        this.setState({playerIds: this.state.playerIds.concat(this.state.inputValue), inputValue: ""});
    };

    showGames = async () => {
        this.setState({loading: true, errorMessage: ""});
        try {
            const api = this.state.useFakeApi ? FakeSteamApi : SteamApi;
            const responseModels = await Promise.all(this.state.playerIds.map(async id => api.getGames(id)));
            const commonIds = getCommonElements(responseModels.map(m => m.ids));
            this.setState({loading: false, games: commonIds});
        } catch (e) {
            this.setState({loading: false, games: [], errorMessage: getErrorMessage(e.response || e)});
        }
    };

    onUseFakeApiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({useFakeApi: e.target.checked});
    };

    render(): JSX.Element {
        const translations = this.props.language === Language.Ru ? ru : en;
        const inputEmpty = this.state.inputValue.length === 0;
        const alreadyHaveSamePlayerId = this.state.playerIds.some(
            id => this.state.inputValue.toLowerCase() === id.toLowerCase()
        );
        const tooltipTitle = inputEmpty
            ? translations.enterPlayerId
            : alreadyHaveSamePlayerId
                ? translations.idAlreadyInList
                : translations.addIdButtonTooltip;
        const idsListEmpty = this.state.playerIds.length === 0;

        return (
            <div className="GamesAssistant">
                <div className="GamesAssistant__body">
                    <div className="GamesAssistant__fakeApiSwitch">
                        <Tooltip placement="left" title={translations.fakeApiTooltip}>
                            <InlineBlock>
                                <Switch
                                    checked={this.state.useFakeApi}
                                    onChange={this.onUseFakeApiChange}
                                    id="GamesAssistant__fakeApiSwitch"
                                />
                                <label htmlFor="GamesAssistant__fakeApiSwitch">
                                    Fake API
                                </label>
                            </InlineBlock>
                        </Tooltip>
                    </div>
                    {this.state.playerIds.length !== 0 && this.renderPlayerIds()}
                    <div className="GamesAssistant__controls">
                        <div>
                            <Row inline>
                                <RowItem>
                                    <Row margin="none">
                                        <RowItem>
                                            <Input
                                                value={this.state.inputValue}
                                                onChange={this.onInputChange}
                                                onKeyPress={this.onInputKeyPress}
                                                placeholder="Player Id"
                                            />
                                        </RowItem>
                                        <RowItem>
                                            <Tooltip title={tooltipTitle} placement="right-start">
                                                <div>
                                                    <IconButton
                                                        disabled={inputEmpty || alreadyHaveSamePlayerId}
                                                        onClick={this.addPlayerId}
                                                    >
                                                        <AddCircle color={inputEmpty || alreadyHaveSamePlayerId ? "disabled" : "primary"}/>
                                                    </IconButton>
                                                </div>
                                            </Tooltip>
                                        </RowItem>
                                    </Row>
                                </RowItem>
                                <RowItem>
                                    <Row align="center">
                                        <RowItem>
                                            <Spinner shown={this.state.loading}/>
                                        </RowItem>
                                    </Row>
                                </RowItem>
                            </Row>
                        </div>
                        <div>
                            <Tooltip title={idsListEmpty ? translations.atLeastOnePlayerIdRequired : ""} placement="right-start">
                                <InlineBlock>
                                    <Button
                                        disabled={idsListEmpty}
                                        variant="outlined"
                                        onClick={this.showGames}
                                    >
                                        {translations.buttonText}
                                    </Button>
                                </InlineBlock>
                            </Tooltip>
                        </div>
                    </div>
                    {this.state.games.length !== 0 && <div>{JSON.stringify(this.state.games.join())}</div>}
                    {this.state.errorMessage && <div className="GamesAssistant__error">{`${translations.baseErrorMessage} ${this.state.errorMessage}`}</div>}
                </div>
            </div>
        );
    }

    renderPlayerIds(): JSX.Element {
        const list = this.state.playerIds.map(id => {
            const onDelete = () => {
                this.setState({playerIds: this.state.playerIds.filter(currentId => currentId !== id)});
            };
            return (
                <RowItem key={id}>
                    <Chip onDelete={onDelete} label={id} />
                </RowItem>
            );
        });
        return (
            <div className="GamesAssistant__playersList">
                <Row inline margin="narrow">
                    {list}
                </Row>
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

function GamesList(props: {gameIds: string[]}): JSX.Element {
    return (
        <div>
            {props.gameIds.map(id => <Game key={id} id={id}/>)}
        </div>
    )
}

function Game(props: {id: string, name: string}): JSX.Element {
    return (
        <div className=""></div>
    )
}

function getErrorMessage(e: any): string {
    let message = "";
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

function getCommonElements<TValue>(list: TValue[][]): TValue[] {
    if (list.length === 0) {
        return [];
    }
    return getCommonElementsRecursive(list[0], list.slice(1));
}

function getCommonElementsRecursive<TValue>(currentList: TValue[], remainingLists: TValue[][]): TValue[] {
    if (remainingLists.length === 0) {
        return currentList;
    }
    return getCommonElementsRecursive(getCommonElementsOfTwoLists(currentList, remainingLists[0]), remainingLists.slice(1));
}

function getCommonElementsOfTwoLists<TValue>(list1: TValue[], list2: TValue[]): TValue[] {
    return list1.filter(el1 => list2.some(el2 => el1 === el2));
}
