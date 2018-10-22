import * as classNames from "classnames";
import * as React from "react";

import Button from "@material-ui/core/Button/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Input from "@material-ui/core/Input/Input";
import Switch from "@material-ui/core/Switch/Switch";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { AddCircle } from "@material-ui/icons";

import GameModel from "serverModels/GameModel";

import FakeSteamApi from "src/components/App/pages/GamesAssistant/SteamApi/FakeSteamApi";
import InlineBlock from "src/components/shared/InlineBlock/InlineBlock";
import Row from "src/components/shared/Row/Row";
import RowItem from "src/components/shared/Row/RowItem/RowItem";
import { Language } from "src/models/enums";

import FakeApiTooltip from "./GamesList/FakeApiTooltip/FakeApiTooltip";
import GamesList from "./GamesList/GamesList";
import OneIdChosenModal from "./OneIdChosenModal/OneIdChosenModal";
import PlayerIdsList from "./PlayerIdsList/PlayerIdsList";

import ISteamApi from "./SteamApi/ISteamApi";
import SteamApi from "./SteamApi/SteamApi";

import { areGamesEqual, getCommonElements, getErrorMessage } from "./GamesAssistant.utils";
import IGamesAssistantTranslations from "./translations/IGamesAssistantTranslations";

import en from "./translations/en";
import ru from "./translations/ru";

import "./GamesAssistant.css";

enum LocalStorageItems {
    UseFakeApi = "UseFakeApi"
}

interface Props {
    language: Language;
}

interface State {
    inputValue: string;
    loading: boolean;
    errorMessage: string;
    games: GameModel[];
    playerIds: string[];
    useFakeApi: boolean;
    oneIdChosenModalOpen: boolean;
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
            useFakeApi: Boolean(localStorage.getItem(LocalStorageItems.UseFakeApi) === "true") || false,
            oneIdChosenModalOpen: false
        };
    }

    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({inputValue: e.target.value, errorMessage: ""});
    };

    onInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13 || e.which === 13) { // Enter
            this.addPlayerId();
        }
    };

    addPlayerId = () => {
        this.setState({playerIds: this.state.playerIds.concat(this.state.inputValue), inputValue: ""});
    };

    deletePlayerId = (id: string) => {
        this.setState({playerIds: this.state.playerIds.filter(currentId => currentId !== id)});
    };

    onShowGamesButtonClick = async () => {
        if (this.state.playerIds.length === 1) {
            this.openOneIdChosenModal();
        } else {
            await this.showGames();
        }
    };

    async showGames(): Promise<void> {
        this.setState({games: [], loading: true, errorMessage: ""});
        try {
            const api: ISteamApi = this.state.useFakeApi ? FakeSteamApi : SteamApi;
            const responses = await Promise.all(this.state.playerIds.map(async id => api.getGames(id)));
            const commonGames = getCommonElements(responses.map(r => r.games), areGamesEqual);
            this.setState({loading: false, games: commonGames});
        } catch (e) {
            this.setState({loading: false, errorMessage: getErrorMessage(e.response || e)});
        }
    }

    onUseFakeApiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        localStorage.setItem(LocalStorageItems.UseFakeApi, value.toString());
        this.setState({useFakeApi: e.target.checked});
    };

    openOneIdChosenModal = () => {
        this.setState({oneIdChosenModalOpen: true});
    };

    closeOneIdChosenModal = () => {
        this.setState({oneIdChosenModalOpen: false});
    };

    onOneIdChosenModalConfirm = async () => {
        this.closeOneIdChosenModal();
        await this.showGames();
    };

    render(): JSX.Element {
        const translations: IGamesAssistantTranslations = this.props.language === Language.Ru ? ru : en;
        const inputEmpty: boolean = this.state.inputValue.length === 0;
        const alreadyHaveSamePlayerId: boolean = this.state.playerIds.some(
            id => this.state.inputValue.toLowerCase() === id.toLowerCase()
        );
        const tooltipTitle: string = inputEmpty
            ? translations.enterPlayerId
            : alreadyHaveSamePlayerId
                ? translations.idAlreadyInList
                : translations.addIdButtonTooltip;
        const idsListEmpty: boolean = this.state.playerIds.length === 0;

        return (
            <div className="GamesAssistant">
                <div className="GamesAssistant__body">
                    <div className="GamesAssistant__fakeApiSwitch">
                        <Tooltip placement="left" title={<FakeApiTooltip lines={translations.fakeApiTooltip}/>}>
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
                    {this.state.playerIds.length !== 0 && <PlayerIdsList ids={this.state.playerIds} onDelete={this.deletePlayerId}/>}
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
                                        onClick={this.onShowGamesButtonClick}
                                    >
                                        {translations.buttonText}
                                    </Button>
                                </InlineBlock>
                            </Tooltip>
                        </div>
                    </div>
                    {!this.state.errorMessage && <GamesList games={this.state.games} language={this.props.language}/>}
                    {this.state.errorMessage && <div className="GamesAssistant__error">{`${translations.baseErrorMessage} ${this.state.errorMessage}`}</div>}
                    <OneIdChosenModal
                        open={this.state.oneIdChosenModalOpen}
                        text={translations.oneIdChosenModal.text}
                        yesLabel={translations.oneIdChosenModal.yesLabel}
                        noLabel={translations.oneIdChosenModal.noLabel}
                        onConfirm={this.onOneIdChosenModalConfirm}
                        onCancel={this.closeOneIdChosenModal}
                    />
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
