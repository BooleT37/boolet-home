import * as React from "react";
import TouchCarousel from "react-touch-carousel";
import touchWithMouseHOC from "react-touch-carousel/lib/touchWithMouseHOC";

import Card from "./Card/Card";
import poem from "./poem";

import "./Gift.css";

const backgroundColors = [
    "lightBlue",
    "peachpuff",
    "#caffd6",
    "lightBlue",
    "peachpuff",
    "#caffd6",
    "lightBlue",
    "peachpuff",
    "#caffd6"
];

export default class Gift extends React.Component {
    // tslint:disable-next-line:prefer-function-over-method
    render(): JSX.Element {
        return (
            <TouchCarousel
                component={touchWithMouseHOC(renderGift)}
                cardCount={poem.length}
                cardSize={640}
                renderCard={renderCard}
                vertical
                loop={false}
            />
        );
    }
}

function renderCard(index: number, modIndex: number, cursor: number, carouselState: any): JSX.Element {
    return (
        <Card
            key={index}
            backgroundColor={backgroundColors[modIndex]}
            captions={poem[modIndex]}
            active={true}
        />
    );
}

function renderGift(props: {children: React.ReactNode}): JSX.Element {
    return (
        <div className="gift">
            {props.children}
        </div>
    );
}
