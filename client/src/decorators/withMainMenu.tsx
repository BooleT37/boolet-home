import * as React from "react";
import MainMenu, { MainMenuItem } from "src/components/App/MainMenu/MainMenu";

// fixme
// type ComponentWrapper<Props, Class extends React.ComponentClass<Props>> = (WrappedComponent: Class) => Class;
type ComponentWrapper<Props, Class extends React.ComponentClass<Props>> = (WrappedComponent: any) => any;

export default function withMainMenu<Props, Class extends React.ComponentClass<Props>>(item?: MainMenuItem, hidden?: boolean): ComponentWrapper<Props, Class> {
    return WrappedComponent =>
        class extends React.Component<any> {
            render(): any {
                return (
                    <div>
                        <MainMenu hidden={hidden} currentItem={item}/>
                        <WrappedComponent {...this.props}/>
                    </div>
                );
            }
        };
}
