import { IconButton } from "@material-ui/core";
import { Settings as SettingsIcon } from "@material-ui/icons";
import * as classNames from "classnames";
import * as React from "react";
import { Position, Player, Settings, SettingsInState } from "./Bouquet.models";
import { StyledHighlightedGirlImage } from "./Bouquet.styles";
import PlayersSettingsModal from "./PlayersSettingsModal/PlayersSettingsModal";

import {
    WHEEL_WIDTH,
    WHEEL_HEIGHT,
    WHEEL_CENTER,
    RADIUS,
    BRIDE_IMAGE_POSITION,
    GIRL_IMAGE_WIDTH,
    GIRL_IMAGE_HEIGHT,
    DEFAULT_SETTINGS, SETTINGS_LOCAL_STORAGE_KEY
} from "./Bouquet.constants";

import "./Bouquet.css";
import {
    getCirclePositions,
    getBouquetPosition,
    countV0AndAccForIndex,
    seedRandomIndex, getBouquetPositionNextToGirl, getSettingsFromState, convertSettingsToState
} from "./Bouquet.utils";

import * as bouquetImg from "./images/Bouquet.png";
import * as brideImg from "./images/Bride.png";
import * as girlImg1 from "./images/girls/girl-01.png";
import * as girlImg2 from "./images/girls/girl-02.png";
import * as girlImg3 from "./images/girls/girl-03.png";
import * as girlImg4 from "./images/girls/girl-04.png";
import * as girlImg5 from "./images/girls/girl-05.png";
import * as girlImg6 from "./images/girls/girl-06.png";
import * as girlImg7 from "./images/girls/girl-07.png";
import * as girlImg8 from "./images/girls/girl-08.png";
import * as girlImg9 from "./images/girls/girl-09.png";
import * as girlImg10 from "./images/girls/girl-10.png";
import * as girlImg11 from "./images/girls/girl-11.png";
import * as girlImg12 from "./images/girls/girl-12.png";
import * as girlImg13 from "./images/girls/girl-13.png";

interface MotionState {
    isSpinning: boolean;
    angle: number; // rad
    v: number;
    chosenIndex: number;
    isFinalAnimationPlaying: boolean;
}

interface State extends MotionState {
    v0: number; // rad per frame
    v0Adjusted: number;
    acc: number; // rad per frame^2
    accAdjusted: number;
    players: Player[];
    playersSettingsModalVisible: boolean;
}

const girlImages: string[] = [
    girlImg1, girlImg2, girlImg3, girlImg4, girlImg5, girlImg6, girlImg7,
    girlImg8, girlImg9, girlImg10, girlImg11, girlImg12, girlImg13
];

const STATIONARY_STATE: MotionState = {
    isSpinning: false,
    angle: 0,
    v: 0,
    chosenIndex: -1,
    isFinalAnimationPlaying: false
};

export default class Bouquet extends React.Component<undefined, State> {
    constructor() {
        super(undefined);

        let settings: Settings;
        if (localStorage[SETTINGS_LOCAL_STORAGE_KEY]) {
            settings = JSON.parse(localStorage.getItem(SETTINGS_LOCAL_STORAGE_KEY));
        } else {
            settings = DEFAULT_SETTINGS;
        }
        const settingsInState: SettingsInState = convertSettingsToState(settings);

        this.state = {
            ...STATIONARY_STATE,
            players: settingsInState.players,
            v0: settingsInState.v0,
            v0Adjusted: settingsInState.v0,
            acc: settingsInState.acc,
            accAdjusted: settingsInState.acc,
            playersSettingsModalVisible: false
        };
    }

    iterateLoop = (): void => {
        const { isSpinning } = this.state;
        if (isSpinning) {
            this.setState((oldState: State): State => {
                const newV = oldState.v + oldState.accAdjusted;
                if (newV > 0) {
                    return {
                        ...oldState,
                        angle: oldState.angle + oldState.v,
                        isFinalAnimationPlaying: false,
                        v: newV
                    };
                }
                return {
                    ...oldState,
                    isSpinning: false,
                    isFinalAnimationPlaying: true,
                    v: oldState.v0
                };
            });
        }
        requestAnimationFrame(this.iterateLoop);
    };

    componentDidMount(): void {
        document.title = "Свадебный букет";
        this.iterateLoop();
    }

    onCenterClick = (): void => {
        this.setState(oldState => {
            if (oldState.isSpinning) {
                return {
                    ...oldState,
                    isSpinning: false,
                    v: 0,
                    v0Adjusted: oldState.v0,
                    accAdjusted: oldState.acc,
                    chosenIndex: -1,
                    isFinalAnimationPlaying: false
                };
            }
            const chosenIndex = seedRandomIndex(oldState.players.length);
            const { v0, acc } = countV0AndAccForIndex(
                chosenIndex,
                oldState.acc,
                oldState.v0,
                oldState.angle,
                oldState.players.length
            );
            // console.log(`v0: ${oldState.v0} -> ${v0}`);
            // console.log(`a: ${oldState.acc} -> ${acc}`);
            // console.log(`t: ${getTime(acc, v0) / FPS} sec`);
            return {
                ...oldState,
                isSpinning: true,
                v: v0,
                v0Adjusted: v0,
                accAdjusted: acc,
                chosenIndex,
                isFinalAnimationPlaying: false
            };
        });
    };

    onPlayerSettingsModalOpen = (): void => {
        this.setState({playersSettingsModalVisible: true});
    };

    onPlayerSettingsModalClose = (): void => {
        this.setState({playersSettingsModalVisible: false});
    };

    onPlayerSettingsModalSubmit = (settings: Settings): void => {
        localStorage.setItem(SETTINGS_LOCAL_STORAGE_KEY, JSON.stringify(settings));
        this.setState({
            playersSettingsModalVisible: false,
            ...convertSettingsToState(settings)
        });
    };

    render(): JSX.Element {
        const {
            chosenIndex,
            isFinalAnimationPlaying,
            angle,
            playersSettingsModalVisible,
            players,
            acc,
            v0
        } = this.state;
        const bouquetPosition: Position = isFinalAnimationPlaying
            ? getBouquetPositionNextToGirl(angle, chosenIndex, players.length)
            : getBouquetPosition(angle);
        const bouquetClassName = classNames(
            "Bouquet_img",
            "Bouquet_bouquet",
            { 'Bouquet_bouquet_moving': isFinalAnimationPlaying }
        );

        const settings: Settings = getSettingsFromState(
            { players, v0, acc }
        );

        return (
            <div className="Bouquet">
                <div
                    className="Bouquet_wheel"
                    style={{ width: WHEEL_WIDTH, height: WHEEL_HEIGHT }}
                >
                    <span className="Bouquet_center" onClick={this.onCenterClick}>
                        <img
                            className="Bouquet_img"
                            src={brideImg}
                            alt="bride"
                            style={BRIDE_IMAGE_POSITION}
                        />
                        <img
                            className={bouquetClassName}
                            src={bouquetImg}
                            alt="bouquet"
                            style={bouquetPosition}
                        />
                    </span>
                    {this.renderGirls()}
                </div>
                <span className="Bouquet_settings">
                    <IconButton onClick={this.onPlayerSettingsModalOpen}>
                        <SettingsIcon/>
                    </IconButton>
                </span>
                <PlayersSettingsModal
                    open={playersSettingsModalVisible}
                    settings={settings}
                    images={girlImages}
                    onClose={this.onPlayerSettingsModalClose}
                    onSubmit={this.onPlayerSettingsModalSubmit}
                />
            </div>
        );
    }

    renderGirls(): JSX.Element[] {
        const { angle, isFinalAnimationPlaying, chosenIndex, players } = this.state;
        const positions = getCirclePositions(
            WHEEL_CENTER,
            players.length,
            RADIUS,
            GIRL_IMAGE_WIDTH,
            GIRL_IMAGE_HEIGHT,
            angle
        );
        return players
            .map((player, i) => (
                <Girl
                    name={player.name}
                    key={player.name}
                    highlighted={isFinalAnimationPlaying && i === chosenIndex}
                    img={girlImages[player.imageIndex]}
                    index={i}
                    position={positions[i]}
                />
            ));
    }
}

interface GirlProps {
    highlighted: boolean;
    position: Position;
    img: string;
    index: number;
    name: string;
}

function Girl({ highlighted, img, position, index, name }: GirlProps): JSX.Element {
    const children = (
        <div>
            <img
                src={img}
                alt={`girl_image_${index}`}
            />
            <div>{name}</div>
        </div>
    );
    if (highlighted) {
        return (
            <StyledHighlightedGirlImage
                style={position}
            >
                {children}
            </StyledHighlightedGirlImage>
        );
    }
    return (
        <div
            className="Bouquet_img"
            style={position}
        >
            {children}
        </div>
    );
}
