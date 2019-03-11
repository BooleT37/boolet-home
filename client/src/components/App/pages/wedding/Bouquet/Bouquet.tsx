import * as classNames from "classnames";
import * as React from "react";
import { Position } from "src/components/App/pages/wedding/Bouquet/Bouquet.models";
import { StyledHighlightedGirlImage } from "src/components/App/pages/wedding/Bouquet/Bouquet.styles";
import Field from "src/components/App/pages/wedding/Bouquet/Field/Field";
import { getTime } from "src/components/App/pages/wedding/Bouquet/movementUtils";

import {
    WHEEL_WIDTH,
    WHEEL_HEIGHT,
    WHEEL_CENTER,
    RADIUS,
    BRIDE_IMAGE_POSITION,
    GIRL_IMAGE_WIDTH,
    GIRL_IMAGE_HEIGHT,
    V0,
    GIRLS_COUNT,
    FPS,
    ACC
} from "./Bouquet.constants";

import "./Bouquet.css";
import {
    firstNWithRepeat,
    getCirclePositions,
    getBouquetPosition,
    countV0AndAccForIndex,
    seedRandomIndex, getBouquetPositionNextToGirl
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

interface State {
    isSpinning: boolean;
    angle: number; // rad
    v0: number; // rad per frame
    v0Adjusted: number; // rad per frame
    v: number;
    acc: number; // rad per frame^2
    accAdjusted: number; // rad per frame^2
    chosenIndex: number;
    isFinalAnimationPlaying: boolean;
}

const girlImages: string[] = [
    girlImg1, girlImg2, girlImg3, girlImg4, girlImg5, girlImg6, girlImg7,
    girlImg8, girlImg9, girlImg10, girlImg11, girlImg12, girlImg13
];

const DEFAULT_STATE: State = {
    isSpinning: false,
    v: 0,
    angle: 0,
    v0: V0,
    v0Adjusted: V0,
    acc: ACC,
    accAdjusted: ACC,
    chosenIndex: -1,
    isFinalAnimationPlaying: false
};

export default class Bouquet extends React.Component<undefined, State> {
    constructor() {
        super(undefined);

        this.state = DEFAULT_STATE;
    }

    iterateLoop = () => {
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

// tslint:disable-next-line:prefer-function-over-method
    componentDidMount(): void {
        document.title = "Свадебный букет";
        this.iterateLoop();
    }

    onCenterClick = () => {
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
            const chosenIndex = seedRandomIndex(GIRLS_COUNT);
            const { v0, acc } = countV0AndAccForIndex(
                chosenIndex,
                oldState.acc,
                oldState.v0,
                oldState.angle,
                GIRLS_COUNT
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

    onV0Change = (v0: number) => {
        this.setState((oldState => {
            const newV0 = (Math.PI * v0 / 180) / FPS;
            return {
                isSpinning: false,
                acc: oldState.acc * (newV0 / oldState.v0)
            };
        }));
    };

    onSpinDurationChange = (spinDuration: number) => {
        this.setState(oldState => ({
            isSpinning: false,
            acc:  - oldState.v0 / (spinDuration * FPS)
        }));
    };

    // tslint:disable-next-line:prefer-function-over-method
    render(): JSX.Element {
        const { chosenIndex, isFinalAnimationPlaying, angle } = this.state;
        const bouquetPosition: Position = isFinalAnimationPlaying
            ? getBouquetPositionNextToGirl(angle, chosenIndex)
            : getBouquetPosition(angle);
        const bouquetClassName = classNames(
            "Bouquet_img",
            "Bouquet_bouquet",
            { Bouquet_bouquet_moving: isFinalAnimationPlaying }
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
                <Field
                    label="Начальная скорость: "
                    suffix={<span>&thinsp;&deg;&nbsp;/ сек</span>}
                    value={Math.round(this.state.v0 * FPS * 180 / Math.PI)}
                    onChange={this.onV0Change}
                />
                <Field
                    label="Длительность вращения: "
                    suffix={<span>&thinsp;сек</span>}
                    value={Math.round(getTime(this.state.acc, this.state.v0) / FPS)}
                    onChange={this.onSpinDurationChange}
                />
            </div>
        );
    }

    renderGirls(): JSX.Element[] {
        const { angle, isFinalAnimationPlaying, chosenIndex} = this.state;
        const positions = getCirclePositions(
            WHEEL_CENTER,
            GIRLS_COUNT,
            RADIUS,
            GIRL_IMAGE_WIDTH,
            GIRL_IMAGE_HEIGHT,
            angle
        );
        return firstNWithRepeat(girlImages, GIRLS_COUNT)
            .map((img, i) => (
                <Girl
                    key={i}
                    highlighted={isFinalAnimationPlaying && i === chosenIndex}
                    img={img}
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
}

function Girl({ highlighted, img, position, index }: GirlProps): JSX.Element {
    const children = (
        <img
            src={img}
            alt={`girl_image_${index}`}
        />
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
