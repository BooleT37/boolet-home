import * as React from "react";
/* eslint-disable */
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}

function returnNewCar() {
    return new Car('Eagle', 'Talon TSi', 1993);
}

function returnPolyfilledNewCar() {
    const o = Car.prototype;
    const ret = Car.call(o, 'Eagle', 'Talon TSi', 1993);
    return ret || o;
}

export default class NewPolyfill extends React.Component {
    render(): JSX.Element {
        const myCar1 = returnNewCar();
        const myCar2 = returnPolyfilledNewCar();
        return (
            <div>
                <b><pre>{`function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}
                `}</pre></b>
                <ul>
                    <li>
                        <pre>{`new Car('Eagle', 'Talon TSi', 1993);`}</pre>
                        <pre>{JSON.stringify(myCar1)}</pre>
                        <pre>{"myCar instanceof Car: " + (myCar1 instanceof Car)}</pre>
                    </li>
                    <li>
                        <pre>{`const o = Car.prototype;
const ret = Car.call(o, 'Eagle', 'Talon TSi', 1993);
return ret || o;`}</pre>
                        <pre>{JSON.stringify(myCar2)}</pre>
                        <pre>{"myCar instanceof Car: " + (myCar2 instanceof Car)}</pre>
                    </li>
                </ul>
            </div>
        );
    }
}
