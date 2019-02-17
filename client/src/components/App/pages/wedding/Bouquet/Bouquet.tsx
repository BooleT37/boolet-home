import * as React from "react";

import {
    WHEEL_WIDTH,
    WHEEL_HEIGHT,
    WHEEL_CENTER,
    RADIUS,
    BRIDE_IMAGE_POSITION, BOUQUET_IMAGE_POSITION, GIRL_IMAGE_WIDTH, GIRL_IMAGE_HEIGHT, FPS
} from "src/components/App/pages/wedding/Bouquet/Bouquet.constants";
import { firstNWithRepeat, getGirlsPositions } from "src/components/App/pages/wedding/Bouquet/Bouquet.utils";

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

import "./Bouquet.css";

interface State {
    isSpinning: boolean;
    speed: number; // rad per frame
    angle: number; // rad
}

const girlImages: string[] = [
    girlImg1, girlImg2, girlImg3, girlImg4, girlImg5, girlImg6, girlImg7,
    girlImg8, girlImg9, girlImg10, girlImg11, girlImg12, girlImg13
];

const girlsCount = 5;

export default class Bouquet extends React.Component<undefined, State> {
    constructor() {
        super(undefined);

        this.state = {
            isSpinning: false,
            speed: (Math.PI * 30 / 180) / FPS,
            angle: 0
        };
    }

    iterateLoop = () => {
        if (this.state.isSpinning) {
            this.setState(oldState => ({
                angle: oldState.angle + this.state.speed
            }));
        }
        requestAnimationFrame(this.iterateLoop);
    };

    // tslint:disable-next-line:prefer-function-over-method
    componentDidMount(): void {
        document.title = "Свадебный букет";
        this.iterateLoop();
    }

    onCenterClick = () => {
        this.setState(oldState => ({ isSpinning: !(oldState.isSpinning)}));
    };

    onSpeedInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const gradPerSec = parseInt(e.target.value, 10);
        const speed = (gradPerSec * Math.PI / 180) / FPS;
        this.setState({speed});
    };

    // tslint:disable-next-line:prefer-function-over-method
    render(): JSX.Element {
        return (
            <div className="Bouquet">
                <div
                    className="Bouquet_wheel"
                    style={{width: WHEEL_WIDTH, height: WHEEL_HEIGHT}}
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
                            style={BOUQUET_IMAGE_POSITION}
                        />
                    </span>
                    {this.renderGirls()}
                </div>
                <div className="Bouquet_speedInputWrapper">
                    Скорость:&nbsp;
                    <input
                        className="Bouquet_speedInput"
                        type="number"
                        value={Math.round(this.state.speed * FPS * 180 / Math.PI)}
                        step={15}
                        onChange={this.onSpeedInputChange}
                    />
                    &thinsp;&deg;&nbsp;/ sec
                </div>
            </div>
        );
    }

    renderGirls(): JSX.Element[] {
        const positions = getGirlsPositions(
            WHEEL_CENTER,
            girlsCount,
            RADIUS,
            GIRL_IMAGE_WIDTH,
            GIRL_IMAGE_HEIGHT,
            this.state.angle
        );
        return firstNWithRepeat(girlImages, girlsCount)
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
