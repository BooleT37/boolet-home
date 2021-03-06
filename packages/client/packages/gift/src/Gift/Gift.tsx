import * as React from "react";
import TouchCarousel from "react-touch-carousel";
import touchWithMouseHOC from "react-touch-carousel/lib/touchWithMouseHOC";

import Card from "./Card/Card";

import "./Gift.css";
import poem from "./poem";

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
    render(): React.ReactNode {
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

function renderCard(index: number, modIndex: number): JSX.Element {
    return (
        <Card
            key={index}
            backgroundColor={backgroundColors[modIndex]}
            captions={poem[modIndex]}
            active={true}
        >
            {modIndex === 6 ? <div className="gift__puppy"/> : null}
        </Card>
    );
}

function renderGift(props: {children: React.ReactNode}): JSX.Element {
    return (
        <div className="gift">
            {props.children}
        </div>
    );
}
