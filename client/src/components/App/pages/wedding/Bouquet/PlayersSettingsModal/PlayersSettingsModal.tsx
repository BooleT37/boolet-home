import { Modal, TextField, Button, IconButton, Paper } from "@material-ui/core";
import { Add, Delete, Close } from "@material-ui/icons";
import * as React from "react";
import { Player } from "src/components/App/pages/wedding/Bouquet/Bouquet.models";

import "./PlayersSettingsModal.css";

interface Props {
    open: boolean;
    players: Player[];
    onClose(): void;
    onSubmit(players: Player[]): void;
}

interface State {
    currentPlayers: Player[];
}

export default class PlayersSettingsModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            currentPlayers: props.players
        };
    }

    onPlayerNameChange = (playerIndex: number, value: string): void => {
        this.setState(oldState => {
            const currentPlayers = oldState.currentPlayers.slice();
            currentPlayers[playerIndex].name = value;
            return {
                ...oldState,
                currentPlayers
            };
        });
    };

    onPlayerAdd = (): void => {
        this.setState(oldState => {
            return {
                ...oldState,
                currentPlayers: oldState.currentPlayers.concat({
                    name: "",
                    imageIndex: oldState.currentPlayers.length
                })
            };
        });
    };

    onPlayerRemove = (playerIndex: number): void => {
        this.setState(oldState => {
            const currentPlayers = oldState.currentPlayers.slice();
            currentPlayers.splice(playerIndex, 1);
            return {
                ...oldState,
                currentPlayers
            };
        });
    };

    onClose = () => {
        this.setState({
            currentPlayers: this.props.players
        });
        this.props.onClose();
    };

    onSubmit = () => {
        this.props.onSubmit(this.state.currentPlayers);
    };

    render(): JSX.Element {
        const { open } = this.props;

        return (
            <Modal
                className="PlayersSettingsModal"
                open={open}
                onClose={this.onClose}
            >
                <Paper className="PlayersSettingsModal_content">
                    <h2>Настройки</h2>
                    <div className="PlayersSettingsModal_close">
                        <IconButton onClick={this.onClose}>
                            <Close/>
                        </IconButton>
                    </div>
                    {this.renderFields()}
                    <Button
                        onClick={this.onPlayerAdd}
                    >
                        <Add/>
                         Добавить
                    </Button>
                    <Button
                        onClick={this.onSubmit}
                        color="primary"
                    >
                         Сохранить
                    </Button>
                </Paper>
            </Modal>
        );
    }

    renderFields(): JSX.Element[] {
        const { currentPlayers } = this.state;
        return currentPlayers.map((p, i) => {
            const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                this.onPlayerNameChange(i, e.target.value);
            };
            const onRemove = () => {
                this.onPlayerRemove(i);
            };
            return (
                <div
                    key={i}
                    className="PlayersSettingsModal_field"
                >
                    <TextField
                        label={`Игрок ${i + 1}`}
                        value={p.name}
                        onChange={onChange}
                    />
                    <IconButton onClick={onRemove} title="Удалить">
                        <Delete color="error"/>
                    </IconButton>
                </div>
            );
        });
    }
}
