import * as React from "react";
import ReactSwipeEvents from "react-swipe-events";

import "./QSlide.less";

interface Props {
    isActive: boolean;
    lines: JSX.Element[];
    index: number;
    secret?: boolean;

    moveToNextSlide(): void;

    moveToPreviousSlide(): void;
}

const typesCount = 3;

export default class QSlide extends React.Component<Props> {
    render(): JSX.Element {
        if (this.props.secret) {
            return this.renderSecretSlide();
        }
        const lines = this.props.lines.map((l, i) => <div key={i} className={`qSlide_line qSlide_line_${i}`}>{l}</div>);
        const classNames = [
            "qSlide",
            `${this.props.isActive ? "qSlide_state_active" : ""}`,
            `qSlide_index_${this.props.index}`,
            `qSlide_type_${this.props.index % typesCount}`
        ].join(" ");
        return (
            <div className={classNames}>
                <ReactSwipeEvents
                    onSwipedUp={this.props.moveToNextSlide}
                    onSwipedDown={this.props.moveToPreviousSlide}
                >
                    <div className="qSlide__container">{lines}</div>
                </ReactSwipeEvents>
            </div>
        );
    }

    renderSecretSlide(): JSX.Element {
        return (
            <div className="qSlide qSlide_secret">
                <ReactSwipeEvents
                    onSwipedUp={this.props.moveToNextSlide}
                    onSwipedDown={this.props.moveToPreviousSlide}
                >
                    <div className="qSlide__container">
                        <div className="qSlide_questionMark">?</div>
                        <div className="qSlide_ring"/>
                    </div>
                </ReactSwipeEvents>
            </div>
        );
    }
}
