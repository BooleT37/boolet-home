import * as React from "react";

import "./RowItem.css";

interface Props {
    expanded?: boolean;
    className?: string;
}

export default class RowItem extends React.Component<Props> {
    static defaultProps: Partial<Props> = {
        expanded: false
    };
    render(): JSX.Element {
        let className = "rowItem";
        if (this.props.expanded) {
            className += " rowItem_expanded";
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
