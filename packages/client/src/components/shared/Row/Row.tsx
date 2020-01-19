import * as React from "react";

import "./Row.less";

interface Props {
    margin?: "huge" | "wide" | "narrow" | "tiny" | "none";
    align?: "flexStart" | "flexEnd" | "center" | "baseline" | "stretch";
    justify?: "end";
    inline?: boolean;
    className?: string;
}

export default class Row extends React.Component<Props> {
    render(): JSX.Element {
        let className = "row";
        if (this.props.inline) {
            className += ` row_inline`;
        }
        if (this.props.margin) {
            className += ` row_margin_${this.props.margin}`;
        }
        if (this.props.align) {
            className += ` row_align_${this.props.align}`;
        }
        if (this.props.justify) {
            className += ` row_align_${this.props.justify}`;
        }
        if (this.props.className) {
            className += ` ${this.props.className}`;
        }
        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
}
