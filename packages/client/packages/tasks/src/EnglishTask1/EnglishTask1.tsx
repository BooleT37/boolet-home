import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import * as React from "react";

import { images, inputs } from "./EnglishTask1.data";

import "./EnglishTask1.css";

const LOCAL_STORAGE_VALUES_KEY = "ENGLISH_TASK_1_LOCAL_STORAGE_VALUES";

interface State {
    inputValues: string[];
    invalidInputs: Set<number>;
    checkButtonPressed: boolean;
}

export default class EnglishTask1 extends React.Component<{}, State> {
    constructor() {
        super(undefined);

        this.state = {
            inputValues: Array(inputs.length).fill(""),
            invalidInputs: new Set(),
            checkButtonPressed: false
        };
    }

    componentDidMount(): void {
        const inputValues = localStorage.getItem(LOCAL_STORAGE_VALUES_KEY);
        if (inputValues) {
            this.setState({inputValues: JSON.parse(inputValues)});
        }
    }

    onInputChange = (id: number, value: string): void => {
        const inputValues = this.state.inputValues.slice();
        inputValues[id] = value;
        const invalidInputs = new Set(this.state.invalidInputs);
        invalidInputs.delete(id);
        localStorage.setItem(LOCAL_STORAGE_VALUES_KEY, JSON.stringify(inputValues));
        this.setState({ inputValues, checkButtonPressed: false, invalidInputs });
    };

    onCheckButtonClick = (): void => {
        const invalidInputs = new Set(inputs
            .filter(input => this.state.inputValues[input.id].toLowerCase() !== input.answer.toLowerCase())
            .map(input => input.id)
        );
        this.setState({ invalidInputs, checkButtonPressed: true });
    };

    render(): JSX.Element {
        const allInputsCorrect = this.state.invalidInputs.size === 0;
        return (
            <div className="EnglishTask1">
                <div className="EnglishTask1__header">
                    <h2>Past simple task</h2>
                    <p>Fill the gaps with words in past simple</p>
                </div>
                <div className="EnglishTask1__images">
                    {images.map((src, ind) => (
                        <img
                            key={ind}
                            className="EnglishTask1__img"
                            src={src}
                            alt={`image_${ind}`}
                        />
                    ))}
                    {inputs.map(input => (
                        <div
                            key={input.id}
                            className="EnglishTask1__input"
                            style={{left: input.left, top: input.top, width: input.width}}
                        >
                            <Input
                                value={this.state.inputValues[input.id]}
                                error={this.state.invalidInputs.has(input.id)}
                                onChange={e => { this.onInputChange(input.id, e.target.value); }}
                                placeholder={input.hint}
                                style={{ fontSize: "28px" }}
                            />
                        </div>
                    ))}
                    <div className="EnglishTask1__bottom">
                        <div className="EnglishTask1__checkButton">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={this.onCheckButtonClick}
                            >
                                Проверить
                            </Button>
                        </div>
                        <div className="EnglishTask1__bottomText">
                            {this.state.checkButtonPressed && allInputsCorrect && <CorrectText/>}
                            {this.state.checkButtonPressed && !allInputsCorrect && <IncorrectText count={this.state.invalidInputs.size}/>}
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

const CorrectText = (): JSX.Element => <div className="EnglishTask1__correct">Все верно! Ты умница!</div>;
const IncorrectText = (props: {count: number}): JSX.Element => (
    <div className="EnglishTask1__incorrect">Есть ошибки :( Общее число ошибок: {props.count}</div>
);
const Footer = (): JSX.Element => (
    <div className="EnglishTask1__footer">
        © Copyright <a target="_blank" href="https://www.instagram.com/sanesparza/">sanesparza</a><br/>
        Check out his awesome webtoon&nbsp;
            <b><a target="_blank" href="https://www.webtoons.com/en/challenge/everything-about-you/ep1-talk-to-her/viewer?title_no=204587&episode_no=1">
                EVERYTHING ABOUT YOU
            </a></b>
    </div>
);
