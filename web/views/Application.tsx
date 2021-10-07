import React, { FunctionComponent } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { AboutPage } from './pages/about/AboutPage';
import { Scope } from '../core/react-ts-ioc-container/scope';
import { AssetsPage } from './pages/assets/AssetsPage';
import { assetTags } from '../env/tags';

export const Application: FunctionComponent = () => {
  return (
    <Router hashType="noslash">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Scope tags={assetTags}>
              <AssetsPage />
            </Scope>
          )}
        />
        <Route
          exact
          path="/todo"
          render={() => (
            <Scope>
              <HomePage />
            </Scope>
          )}
        />
        <Route path="/about">
          <Scope>
            <AboutPage />
          </Scope>
        </Route>
      </Switch>
    </Router>
  );
};
