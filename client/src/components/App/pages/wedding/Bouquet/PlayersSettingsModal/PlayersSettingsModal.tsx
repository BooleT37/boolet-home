import { Modal, TextField, Button, IconButton, Paper, Select, MenuItem } from "@material-ui/core";
import { Add, Delete, Close } from "@material-ui/icons";
import * as React from "react";
import { Settings } from "src/components/App/pages/wedding/Bouquet/Bouquet.models";

import "./PlayersSettingsModal.css";

interface Props {
    open: boolean;
    settings: Settings;
    images: string[];
    onClose(): void;
    onSubmit(settings: Settings): void;
}

interface State {
    currentSettings: Settings;
}

export default class PlayersSettingsModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            currentSettings: props.settings
        };
    }

    onPlayerNameChange = (playerIndex: number, value: string): void => {
        this.setState((oldState: State): State => {
            const players = oldState.currentSettings.players.slice();
            players[playerIndex].name = value;
            return {
                ...oldState,
                currentSettings: {
                    ...oldState.currentSettings,
                    players
                }
            };
        });
    };

    onImageChange = (playerIndex: number, imageIndex: number): void => {
        this.setState((oldState: State): State => {
            const players = oldState.currentSettings.players.slice();
            players[playerIndex].imageIndex = imageIndex;
            return {
                ...oldState,
                currentSettings: {
                    ...oldState.currentSettings,
                    players
                }
            };
        });
    };

    onPlayerAdd = (): void => {
        this.setState((oldState: State): State => {
            const players = oldState.currentSettings.players;
            return {
                ...oldState,
                currentSettings: {
                    ...oldState.currentSettings,
                    players: players.concat({
                        name: "",
                        imageIndex: players.length
                    })
                }
            };
        });
    };

    onPlayerRemove = (playerIndex: number): void => {
        this.setState((oldState: State): State => {
            const players = oldState.currentSettings.players.slice();
            players.splice(playerIndex, 1);
            return {
                ...oldState,
                currentSettings: {
                    ...oldState.currentSettings,
                    players
                }
            };
        });
    };

    onV0Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v0 = e.target.value;
        this.setState((oldState: State): State => ({
            currentSettings: {
                ...oldState.currentSettings,
                v0: parseInt(v0, 10) || 0
            }
        }));
    };

    onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const t = e.target.value;
        this.setState((oldState: State): State => ({
            currentSettings: {
                ...oldState.currentSettings,
                t: parseInt(t, 10) || 0
            }
        }));
    };

    onClose = () => {
        this.setState({
            currentSettings: this.props.settings
        });
        this.props.onClose();
    };

    onSubmit = () => {
        this.props.onSubmit(this.state.currentSettings);
    };

    render(): JSX.Element {
        const { open } = this.props;
        const {
            currentSettings: {
                v0,
                t
            }
        } = this.state;

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
                    <div
                        className="PlayersSettingsModal_AddButton"
                    >
                        <Button
                            onClick={this.onPlayerAdd}
                        >
                            <Add/>
                             Добавить
                        </Button>
                    </div>
                    <div>
                        <div className="PlayersSettingsModal_field ">
                            <TextField
                                label="Начальная скорость"
                                helperText={<span>&thinsp;&deg;&nbsp;/ сек</span>}
                                value={v0}
                                onChange={this.onV0Change}
                            />
                        </div>
                        <div className="PlayersSettingsModal_field">
                            <TextField
                                className="PlayersSettingsModal_field"
                                label="Время вращения"
                                helperText={<span>&thinsp;сек</span>}
                                value={t}
                                onChange={this.onTimeChange}
                            />
                        </div>
                    </div>
                    <Button
                        onClick={this.onClose}
                        color="default"
                    >
                         Отмена
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
        return this.state.currentSettings.players.map((p, i) => {
            const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                this.onPlayerNameChange(i, e.target.value);
            };
            const onRemove = () => {
                this.onPlayerRemove(i);
            };
            const onImageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
                this.onImageChange(i, parseInt(e.target.value, 10));
            };
            const items = this.props.images.map((img, imgIndex) => (
                <MenuItem value={imgIndex} key={imgIndex}>
                    <img src={img} alt={`image_${imgIndex}`} width={20} height={20}/>
                </MenuItem>
            ));
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
                    <Select
                        className="PlayersSettingsModal_select"
                        value={p.imageIndex}
                        onChange={onImageChange}
                    >
                        {items}
                    </Select>
                    <IconButton
                        onClick={onRemove}
                        title="Удалить"
                    >
                        <Delete color="error"/>
                    </IconButton>
                </div>
            );
        });
    }
}
