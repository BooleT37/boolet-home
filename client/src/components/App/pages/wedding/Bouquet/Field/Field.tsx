import * as React from "react";

import "./Field.css";

interface Props {
    label: React.ReactNode;
    suffix?: React.ReactNode;
    value: number;
    onChange(value: number): void;
}

export default class Field extends React.Component<Props> {
    onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.props.onChange(parseInt(e.target.value, 10));
    };

    render(): JSX.Element {
        const { label, suffix, value } = this.props;
        return (
            <div className="Field">
                <span>{label}</span>
                <input
                    className="Field_input"
                    value={value ? value.toString() : ""}
                    onChange={this.onChange}
                />
                <span>{suffix}</span>
            </div>
        );
    }
}
