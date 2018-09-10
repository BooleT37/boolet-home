import * as React from "react";

import "./TimeIntervalElement.css";

export enum SignType {
    Plus,
    Minus
}

export interface TimeInterval {
    hours: number;
    minutes: number;
    sign: SignType;
}

interface Props extends TimeInterval {
    renderSign: boolean;
    onRemove(): void;
}

export default class TimeIntervalElement extends React.Component<Props> {
    render(): JSX.Element {
        return (
            <div className="timeIntervalElement">
                {this.props.renderSign && <Sign type={this.props.sign}/>}
                <div className="timeIntervalElement_parts">
                    {this.props.hours > 0 && <IntervalPart partName="ч" partValue={this.props.hours}/>}
                    {this.props.minutes > 0 && <IntervalPart partName="м" partValue={this.props.minutes}/>}
                    <div
                        className="timeIntervalElement__removeButton"
                        onClick={this.props.onRemove}
                        title="Удалить интервал"
                    >
                        x
                    </div>
                </div>
            </div>
        );
    }
}

function Sign(props: {type: SignType}): JSX.Element {
    return (
        <div className="timeIntervalElement__sign">
            {props.type === SignType.Plus ? "+" : "-"}
        </div>
    );
}

function IntervalPart(props: {partName: string, partValue: number}): JSX.Element {
    return (
        <div className="timeIntervalElement__part">
            <div className="timeIntervalElement__partValue">{props.partValue}</div>
            <div className="timeIntervalElement__partName">{props.partName}</div>
        </div>
    );
}
