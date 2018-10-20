import * as React from "react";

import Chip from "@material-ui/core/Chip/Chip";

import Row from "src/components/shared/Row/Row";
import RowItem from "src/components/shared/Row/RowItem/RowItem";

interface Props {
    ids: string[];
    onDelete(id: string): void;
}

export default class PlayerIdsList extends React.Component<Props> {
    render(): JSX.Element {
        const list = this.props.ids.map(id => {
            const onDelete = () => { this.props.onDelete(id); };
            return (
                <RowItem key={id}>
                    <Chip onDelete={onDelete} label={id} />
                </RowItem>
            );
        });
        return (
            <div className="GamesAssistant__playersList">
                <Row inline margin="narrow">
                    {list}
                </Row>
            </div>
        );
    }
}
