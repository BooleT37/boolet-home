import * as React from "react";
import Field from "src/components/App/pages/wedding/Bouquet/Field/Field";

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
import { firstNWithRepeat, getCirclePositions, getBouquetPosition } from "./Bouquet.utils";

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
    v: number;
    acc: number; // rad per frame^2
}

const girlImages: string[] = [
    girlImg1, girlImg2, girlImg3, girlImg4, girlImg5, girlImg6, girlImg7,
    girlImg8, girlImg9, girlImg10, girlImg11, girlImg12, girlImg13
];

export default class Bouquet extends React.Component<undefined, State> {
    constructor() {
        super(undefined);

        this.state = {
            isSpinning: false,
            v: 0,
            angle: 0,
            v0: V0,
            acc: ACC
        };
    }

    iterateLoop = () => {
        const { isSpinning } = this.state;
        if (isSpinning) {
            this.setState((oldState: State): State => {
                const newV = oldState.v + oldState.acc;
                return newV > 0
                    ? {
                        ...oldState,
                        angle: oldState.angle + oldState.v,
                        v: oldState.v + oldState.acc
                    }
                    : {
                        ...oldState,
                        isSpinning: false,
                        v: V0
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
        this.setState(oldState => (
            oldState.isSpinning
                ? { isSpinning: false, v: 0 }
                : { isSpinning: true, v: oldState.v0 }
        ));
    };

    onV0Change = (v0: number) => {
        this.setState((oldState => {
            const newV0 = (Math.PI * v0 / 180) / FPS;
            return {
                isSpinning: false,
                v0: newV0,
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
                            className="Bouquet_img"
                            src={bouquetImg}
                            alt="bouquet"
                            style={getBouquetPosition(this.state.angle)}
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
                    value={Math.round(- (this.state.v0 / this.state.acc) / FPS)}
                    onChange={this.onSpinDurationChange}
                />
            </div>
        );
    }

    renderGirls(): JSX.Element[] {
        const positions = getCirclePositions(
            WHEEL_CENTER,
            GIRLS_COUNT,
            RADIUS,
            GIRL_IMAGE_WIDTH,
            GIRL_IMAGE_HEIGHT,
            this.state.angle
        );
        return firstNWithRepeat(girlImages, GIRLS_COUNT)
            .map((img, i) => (
                <img
                    key={i}
                    className="Bouquet_img"
                    src={img}
                    alt={`girl_image_${i}`}
                    style={positions[i]}
                />
            ));
    }
}