import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card/Card";
import Modal from "@material-ui/core/Modal/Modal";
import * as React from "react";
import Row from "src/components/shared/Row/Row";
import RowItem from "src/components/shared/Row/RowItem/RowItem";

import "./OneIdChosenModal.css";

interface Props {
    open: boolean;
    text: string;
    yesLabel: string;
    noLabel: string;

    onConfirm(): void;
    onCancel(): void;
}

export default class OneIdChosenModal extends React.PureComponent<Props> {
    render(): JSX.Element {
        return (
            <Modal open={this.props.open} onClose={this.props.onCancel} className="OneIdChosenModal">
                <Card className="OneIdChosenModal__conent">
                    <p>{this.props.text}</p>
                    <div className="OneIdChosenModal__buttons">
                        <Row inline>
                            <RowItem>
                                <Button variant="outlined" color="primary" autoFocus onClick={this.props.onConfirm}>{this.props.yesLabel}</Button>
                            </RowItem>
                            <RowItem>
                                <Button variant="outlined" onClick={this.props.onCancel}>{this.props.noLabel}</Button>
                            </RowItem>
                        </Row>
                    </div>
                </Card>
            </Modal>
        );
    }
}
