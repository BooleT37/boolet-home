import * as React from "react";

interface Props {
    lines: [string, string];
}

export default function FakeApiTooltip(props: Props): JSX.Element {
    return (
        <span>
            <p>{props.lines[0]}</p>
            <div>
                {props.lines[1]}
                <ul>
                    <li>boolet37</li>
                    <li>fvsk</li>
                    <li>afarnsworth</li>
                    <li>gviruswastaken</li>
                </ul>
            </div>
        </span>
    );
}
