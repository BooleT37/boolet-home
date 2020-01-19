import * as React from "react";
import "./Flexbox.css";

export default class Flexbox extends React.Component {
    render(): JSX.Element {
        return (
            <div className="flexbox">
                <div className="flexbox__item" id="flexbox__item_1">1</div>
                <div className="flexbox__item" id="flexbox__item_2">2</div>
                <div className="flexbox__item" id="flexbox__item_3">3</div>
                <div className="flexbox__item" id="flexbox__item_4">4</div>
            </div>
        );
    }
}
