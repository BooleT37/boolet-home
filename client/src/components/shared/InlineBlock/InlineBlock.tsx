import * as ClassNames from "classnames";
import * as React from "react";

import "./InlineBlock.less";

export type VerticalAlign = number | "baseline" | "bottom" | "middle" | "sub" | "super"
    | "text-bottom" | "text-top" | "top" | "inherit";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    verticalAlign?: VerticalAlign;
}

export default class InlineBlock extends React.Component<Props, undefined> {
    // noinspection JSUnusedGlobalSymbols
    static defaultProps: Props = {
        verticalAlign: "top"
    };

    constructor(props: Props) {
        super(props);
    }
    render(): JSX.Element {
        const attributes = getHtmlAttributes(this.props);
        const verticalAlignClass = typeof this.props.verticalAlign === "string"
            ? `inlineBlock_verticalAlign_${this.props.verticalAlign}`
            : null;
        const className = ClassNames(
            "inlineBlock",
            verticalAlignClass,
            { [this.props.className]: this.props.className !== undefined }
        );
        if (typeof this.props.verticalAlign === "number") {
            attributes.style = { verticalAlign: this.props.verticalAlign };
        }
        return (
            <div className={className} {...attributes}>
                {this.props.children}
            </div>
        );
    }
}

function getHtmlAttributes(props: Props): Partial<Props> {
    const newProps = {...{}, ...props};
    delete newProps.verticalAlign;
    delete newProps.className;
    return newProps;
}
