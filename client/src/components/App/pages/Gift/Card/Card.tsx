import * as classNames from "classnames";
import * as React from "react";

import "./Card.css";

interface Props {
    backgroundColor: string;
    captions: string[];
    active: boolean;
}

interface State {
    active: boolean;
}

export default class Card extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            active: false
        };
    }

    setActive = () => {
        this.setState({active: true});
    };

    render(): JSX.Element {
        const captions = this.props.captions.map((c, i) => <Caption caption={c} index={i} key={i}/>);
        return (
            <div
                className={classNames("card", {card_active: this.state.active})}
                style={{backgroundColor: this.props.backgroundColor}}
            >
                <div className="card__buttonWrapper">
                    <button type="button" className="card__button" onClick={this.setActive}>Нажми</button>
                </div>
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
