import * as React from "react";
import { MainMenuItem } from "src/components/App/MainMenu/MainMenu";
import page from "src/decorators/page";

@page(MainMenuItem.Home)
export default class Home extends React.Component {
    // tslint:disable-next-line:prefer-function-over-method
    render(): React.ReactNode {
        return (
            <div>
                Hello, world!
            </div>
        );
    }
}
