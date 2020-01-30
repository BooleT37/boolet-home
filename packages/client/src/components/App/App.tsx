import { MuiThemeProvider, createMuiTheme, CircularProgress } from "@material-ui/core";
import * as React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MainMenuItem from "src/components/App/Page/MainMenu/MainMenuItem";
import Page from "src/components/App/Page/Page";
import { Language } from "src/models/enums";

import en from "./translations/en";
import ru from "./translations/ru";

import Counter from "./pages/Counter/Counter";
import GamesAssistant from "./pages/GamesAssistant/GamesAssistant";
import Home from "./pages/Home/Home";
import RentCalculator from "./pages/RentCalculator/RentCalculator";
import Tasks from "./pages/Tasks/Tasks";
import TimeCalculator from "./pages/TimeCalculator/TimeCalculator";

import IPageTitles from "./translations/IPageTitles";

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

  getPageTitles(): IPageTitles {
    return this.state.language === Language.Ru ? ru.pageTitles : en.pageTitles;
  }

  onLanguageChange = (language: Language): void => {
    this.setState({ language });
  };

  render(): JSX.Element {
    return (
      <div className="app">
        <MuiThemeProvider theme={createMuiTheme()}>
            <Router>
                <div>
                    <Route exact path="/" render={this.renderHomePage} />
                    <Route path="/counter" render={this.renderCounterPage} />
                    <Route
                        path="/tasks"
                        render={this.renderPage(Tasks, this.getPageTitles().tasks)}
                    />
                    <Route
                        path="/timeCalculator"
                        render={this.renderTimeCalculatorPage}
                    />
                    <Route
                        path="/gamesAssistant"
                        render={this.renderGamesAssistantPage}
                    />
                    <Route
                        path="/rentCalculator"
                        render={this.renderRentCalculatorPage}
                    />
                    <Route
                        path="/wedding/bouquet"
                        component={() => {
                          const Bouquet = React.lazy(() => import("./pages/wedding/Bouquet/Bouquet"));
                          return <React.Suspense fallback={<CircularProgress />}><Bouquet/></React.Suspense>;
                        }}
                    />
                </div>
            </Router>
        </MuiThemeProvider>
      </div>
    );
  }

  renderHomePage = (): React.ReactNode =>
    this.renderPage(Home, this.getPageTitles().home, MainMenuItem.Home, {
      language: this.state.language
    })();

  renderCounterPage = (): React.ReactNode =>
    this.renderPage(
      Counter,
      this.getPageTitles().counter,
      MainMenuItem.Counter,
      { language: this.state.language }
    )();

  renderTimeCalculatorPage = (): React.ReactNode =>
    this.renderPage(
      TimeCalculator,
      this.getPageTitles().timeCalculator,
      MainMenuItem.TimeCalculator,
      { language: this.state.language }
    )();

  renderGamesAssistantPage = (): React.ReactNode =>
    this.renderPage(
      GamesAssistant,
      this.getPageTitles().gamesAssistant,
      MainMenuItem.GamesAssistant,
      { language: this.state.language }
    )();

  renderRentCalculatorPage = (): React.ReactNode =>
    this.renderPage(RentCalculator, this.getPageTitles().gamesAssistant, null, {
      language: this.state.language
    })();

  renderPage = <Component extends React.ComponentClass>(
    Component: Component,
    title: string,
    menuItem?: MainMenuItem,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    componentProps?: any // fixme fix 'any' type
  ): (() => React.ReactNode) => {
    return (): React.ReactNode => (
      <Page
        title={title}
        menuItem={menuItem}
        language={this.state.language}
        onLanguageChange={this.onLanguageChange}
      >
        <Component {...componentProps} />
      </Page>
    );
  };
}

export default hot(module)(App);
