import * as classNames from "classnames";
import * as React from "react";

import "./Card.css";

interface Props {
    backgroundColor: string;
    captions: string[];
    active: boolean;
}

export default class Card extends React.Component<Props> {
    render(): JSX.Element {
        const captions = this.props.captions.map((c, i) => <Caption caption={c} index={i} key={i}/>);
        return (
            <div
                className={classNames("card", {card_active: this.props.active})}
                style={{backgroundColor: this.props.backgroundColor}}
            >
                {captions}
                <div className="card__content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

function Caption(props: {caption: string, index: number}): JSX.Element {
    return (
        <div
            className="card__caption"
            id={`card__caption_${props.index}`}
        >
            {props.caption}
        </div>
    );
}
