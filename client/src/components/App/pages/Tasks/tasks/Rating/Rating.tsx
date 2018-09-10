import * as React from "react";
import "./Rating.css";

export default class Rating extends React.Component {
    // tslint:disable-next-line:prefer-function-over-method
    render(): JSX.Element {
        return (
            <form className="rating">
                <label>
                    <input type="radio" name="stars" value="1"/>
                    <span className="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="stars" value="2"/>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="stars" value="3"/>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="stars" value="4"/>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="stars" value="5"/>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                    <span className="icon">★</span>
                </label>
            </form>
        );
    }
}
