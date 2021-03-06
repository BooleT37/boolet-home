import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon/Icon";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Input from "@material-ui/core/Input/Input";
import { Close } from "@material-ui/icons";
import * as React from "react";

import Row from "src/components/shared/Row/Row";
import RowItem from "src/components/shared/Row/RowItem/RowItem";
import { Language } from "src/models/enums";

import { getHourAndMinuteChars } from "./TimeCalculator.utils";
import TimeIntervalElement, { SignType, TimeInterval } from "./TimeIntervalElement/TimeIntervalElement";
import en from "./translations/en";
import ru from "./translations/ru";

import "./TimeCalculator.css";

interface IntervalWithId extends TimeInterval {
    id: number;
}

interface Props {
    language: Language;
}

interface State {
    inputValue: string;
    invalidIntervalString: string;
    intervals: IntervalWithId[];
}

export default class TimeCalculator extends React.Component<Props, State> {
    private intervalId: number;

    constructor() {
        super(undefined);
        this.state = {
            inputValue: "",
            invalidIntervalString: "",
            intervals: []
        };

        this.intervalId = 0;
    }

    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.setState(this.getNextStateByInputValue(e.target.value, this.state.intervals, false) as any);
    };

    onInputKeyPress = (e: React.KeyboardEvent) => {
        if (e.which === 13) {
            this.count();
        }
    };

    getNextStateByInputValue(value: string, currentIntervals: IntervalWithId[], parseIncompleteLastInterval: boolean): Partial<State> {
        const del = "__DELIMITER__";
        if (value.length === 0) {
            return {
                inputValue: value,
                invalidIntervalString: ""
            };
        }
        const firstCharacter = value.substring(0, 1);
        if (firstCharacter !== "-" && firstCharacter !== "+") {
            value = "+" + value;
        }
        value = value.replace(/[+-]/g, substring => del + substring);
        const parts = value.split(del);
        parts.shift();
        const parsedIntervals: IntervalWithId[] = [];
        let parsed = parseInterval(
            parts[0],
            this.props.language,
            parts.length === 1 && !parseIncompleteLastInterval
        );
        if (parsed !== null) {
            parts.shift();
        }
        let isSequence = false;
        while (parsed !== null) {
            parsedIntervals.push({ ...parsed, id: this.intervalId++ });
            if (parts.length > 0) {
                parsed = parseInterval(
                    parts.shift(),
                    this.props.language,
                    !isSequence && parts.length === 1 && !parseIncompleteLastInterval
                );
                isSequence = true;
            } else {
                parsed = null;
            }
        }
        if (parts.length > 1) {
            return {
                inputValue: removeLeadingPlus(parts.join("")),
                intervals: currentIntervals.concat(parsedIntervals),
                invalidIntervalString: parts[0]
            };
        }
        return {
            inputValue: removeLeadingPlus(parts.join("")),
            intervals: currentIntervals.concat(parsedIntervals),
            invalidIntervalString: ""
        };
    }

    count = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.setState(this.getNextStateByInputValue(this.state.inputValue, this.state.intervals, true) as any);
    };

    onIntervalRemove = (id: number) => {
        this.setState({ intervals: this.state.intervals.filter(i => i.id !== id) });
    };

    clearAllIntervals = () => {
        this.setState({ intervals: [] });
    };

    render(): JSX.Element {
        const intervals = this.state.intervals.map((interval, index) => {
                const onRemove = (): void => {
                    this.onIntervalRemove(interval.id);
                };
                return (
                    <TimeIntervalElement
                        key={interval.id}
                        language={this.props.language}
                        renderSign={index > 0}
                        sign={interval.sign}
                        hours={interval.hours}
                        minutes={interval.minutes}
                        onRemove={onRemove}
                    />
                );
            }
        );

        const translation = this.props.language === Language.Ru ? ru : en;

        return (
            <div className="timeCalculator">
                <h2>{translation.enterTime}</h2>
                <div className="timeCalculator__intervals">
                    {intervals}
                    {intervals.length > 0 && <span>+&nbsp;</span>}
                </div>
                <Row inline>
                    <RowItem>
                        <Input
                            className="timeCalculator__input"
                            placeholder={translation.inputPlaceholder}
                            value={this.state.inputValue}
                            onChange={this.onInputChange}
                            onKeyPress={this.onInputKeyPress}
                        />
                    </RowItem>
                    <RowItem>
                        <Button
                            variant="outlined"
                            type="button"
                            color="primary"
                            onClick={this.count}
                        >
                            {translation.count}
                        </Button>
                    </RowItem>
                    <RowItem>
                        <Icon className=""/>
                        <IconButton
                            color="secondary"
                            type="button"
                            onClick={this.clearAllIntervals}
                            title="Очистить"
                        >
                            <Close/>
                        </IconButton>
                    </RowItem>
                </Row>
                {this.state.invalidIntervalString && <ErrorMessage message={this.state.invalidIntervalString}/>}
                <div className="timeCalculator__sum">{translation.sum}:&nbsp;
                    <span className="timeCalculator__sumValue">
                        {intervalToString(countSum(this.state.intervals), this.props.language)}
                    </span>
                </div>
            </div>
        );
    }
}

function ErrorMessage(props: { message: string }): JSX.Element {
    return (
        <div className="timeCalculator__errorMessage">
            Ошибка при разборе следующего токена:<br/>
            <strong>{props.message}</strong>
        </div>
    );
}

function parseInterval(str: string, language: Language, onlyFullString = false): TimeInterval {
    const matches = getTimeRegExp(language).exec(str);
    if (!matches) {
        return null;
    }
    const sign: SignType = matches[1] === "+" ? SignType.Plus : SignType.Minus;
    if (onlyFullString) {
        if (matches[2] !== undefined && matches[4] !== undefined) {
            return {
                sign,
                hours: parseInt(matches[3], 10),
                minutes: parseInt(matches[5], 10)
            };
        }
        return null;
    }
    if (matches[2] === undefined && matches[4] === undefined) {
        return null;
    }
    return {
        sign,
        hours: matches[2] !== undefined ? parseInt(matches[3], 10) : 0,
        minutes: matches[4] !== undefined ? parseInt(matches[5], 10) : 0
    };
}

function intervalToString(interval: TimeInterval, language: Language): string {
    const [hourChar, minuteChar] = getHourAndMinuteChars(language);
    return `${interval.sign === SignType.Minus ? "-" : ""}${interval.hours}${hourChar} ${interval.minutes}${minuteChar}`;
}

function removeLeadingPlus(str: string): string {
    if (str.startsWith("+")) {
        return str.substring(1);
    }
    return str;
}

function countSum(intervals: TimeInterval[]): TimeInterval {
    return intervals.reduce<TimeInterval>((a, c) => {
        const minutes = a.hours * 60 + a.minutes;
        const minutesToAdd = c.hours * 60 + c.minutes;
        let newMinutes = c.sign === SignType.Plus
            ? minutes + minutesToAdd
            : minutes - minutesToAdd;
        const sign = newMinutes >= 0 ? SignType.Plus : SignType.Minus;
        newMinutes = Math.abs(newMinutes);
        return {
            sign,
            hours: Math.floor(newMinutes / 60),
            minutes: newMinutes % 60
        };
    }, {
        minutes: 0,
        hours: 0,
        sign: SignType.Plus
    });
}

function getTimeRegExp(language: Language): RegExp {
    const [hourChar, minuteChar] = getHourAndMinuteChars(language);
    return new RegExp(`([+-])\\s*((\\d+)\\s*${hourChar})?\\s*((\\d+)\\s*${minuteChar})?\\s*`);
}
