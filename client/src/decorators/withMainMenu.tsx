import Card from "@material-ui/core/Card/Card";
import * as React from "react";
import { withRouter } from "react-router";
import MainMenu, { MainMenuItem, InitialProps as MainMenuProps } from "src/components/App/MainMenu/MainMenu";

const MainMenuWithRouter = withRouter(MainMenu) as React.ComponentClass<MainMenuProps>;
// fixme
// type ComponentWrapper<Props, Class extends React.ComponentClass<Props>> = (WrappedComponent: Class) => Class;
type ComponentWrapper<Props, Class extends React.ComponentClass<Props>> = (WrappedComponent: any) => any;

export default function withMainMenu<Props, Class extends React.ComponentClass<Props>>(item?: MainMenuItem): ComponentWrapper<Props, Class> {
    return WrappedComponent =>
        class extends React.Component<any> {
            render(): any {
                return (
                    <div>
                        <MainMenuWithRouter currentItem={item}/>
                        <div className="app__container">
                            <Card>
                                <div className="app__content">
                                    <WrappedComponent {...this.props}/>
                                </div>
                            </Card>
                        </div>
                    </div>
                );
            }
        };
}
