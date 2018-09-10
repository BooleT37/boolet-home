import * as React from "react";
import { MainMenuItem } from "src/components/App/MainMenu/MainMenu";
import withMainMenu from "src/decorators/withMainMenu";

@withMainMenu(MainMenuItem.Home)
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
