import * as classNames from "classnames";
import * as React from "react";

import "../fonts/MarckScript-Regular";

import { poemQuatrains } from "./Q.poem";
import QSlide from "./QSlide";

import "./Q.less";

interface State {
    activeSlide: number;
    surpriseReached: boolean;
}

const surpriseDelay = 10000;

export default class Q extends React.Component<{}, State> {
    constructor() {
        super(undefined);
        this.state = {
            activeSlide: 0,
            surpriseReached: false
        };
    }

    componentDidUpdate(): void {
        if (this.state.activeSlide === poemQuatrains.length - 1) {
            setTimeout(() => { this.setState({surpriseReached: true}); }, surpriseDelay);
        }
    }

    moveToNextSlide = (): void => {
        console.log(this.state.activeSlide + 1);
        if (this.state.activeSlide < poemQuatrains.length - 1) {
            this.setState({ activeSlide: this.state.activeSlide + 1 });
        }
    };

    moveToPreviousSlide = (): void => {
        // console.log(this.state.activeSlide - 1);
        if (this.state.activeSlide > 0 || (this.state.surpriseReached && this.state.activeSlide === 0)) {
            this.setState({ activeSlide: this.state.activeSlide - 1 });
        }
    };

    render(): JSX.Element {
        const slides = poemQuatrains.map((q, i) => (
            <QSlide
                key={i}
                index={i}
                lines={q}
                isActive={this.state.activeSlide === i}
                moveToNextSlide={this.moveToNextSlide}
                moveToPreviousSlide={this.moveToPreviousSlide}
            />
        ));
        slides.unshift(
            <QSlide
                key={-1}
                isActive={true}
                lines={null}
                index={null}
                moveToNextSlide={this.moveToNextSlide}
                moveToPreviousSlide={this.moveToPreviousSlide}
                secret
            />

        );
        const containerClassNames = classNames(
            "q__container",
            `q__container_activeSlide_${this.state.activeSlide}`,
            {
                "q_container_surprise": this.state.surpriseReached
            }
        );

        return (
            <div className="q">
                <div className={containerClassNames}>
                    {slides}
                </div>
            </div>
        );
    }
}
