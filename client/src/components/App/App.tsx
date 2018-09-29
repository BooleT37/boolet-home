import * as React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Language } from "src/models/enums";

import { MainMenuItem } from "src/components/App/Page/MainMenu/MainMenu";
import Page from "src/components/App/Page/Page";

import Counter from "./pages/Counter/Counter";
import Gift from "./pages/Gift/Gift";
import Home from "./pages/Home/Home";
import Q from "./pages/Q/Q";
import Tasks from "./pages/Tasks/Tasks";
import TimeCalculator from "./pages/TimeCalculator/TimeCalculator";

import "./App.css";

interface State {
    language: Language;
}

class App extends React.Component<{}, State> {
    constructor() {
        super(undefined);
        this.state = {
            language: Language.Ru
        };
    }

    onLanguageChange = (language: Language) => {
        this.setState({language});
    };

    render(): JSX.Element {
        return (
            <div className="app">
                <Router>
                    <div>
                        <Route exact path="/" render={this.renderPage(Home, MainMenuItem.Home)}/>
                        <Route path="/counter" render={this.renderCounterPage}/>
                        <Route path="/tasks" render={this.renderPage(Tasks, MainMenuItem.Tasks)}/>
                        <Route path="/gift" component={Gift}/>
                        <Route path="/timeCalculator" render={this.renderTimeCalculatorPage}/>
                        <Route path="/q" component={Q}/>
                    </div>
                </Router>
            </div>
        );
    }

    renderCounterPage = () =>
        this.renderPage(Counter, MainMenuItem.Counter, {language: this.state.language})();

    renderTimeCalculatorPage = () =>
        this.renderPage(TimeCalculator, MainMenuItem.TimeCalculator, {language: this.state.language})();

    renderPage = <Component extends React.ComponentClass>(
            Component: Component,
            menuItem: MainMenuItem,
            componentProps?: any // fixme fix 'any' type
    ): () => React.ReactNode => {
        return () => (
            <Page menuItem={menuItem} language={this.state.language} onLanguageChange={this.onLanguageChange}>
                <Component {...componentProps}/>
            </Page>
        );
    }
}

export default hot(module)(App);
