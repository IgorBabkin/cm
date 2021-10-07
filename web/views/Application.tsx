import React, { FunctionComponent } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { AboutPage } from './pages/about/AboutPage';
import { AssetsPage } from './pages/assets/AssetsPage';
import { assetTags } from '../env/tags';
import { Scope } from 'react-ts-ioc-container';

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
        <Route path="/about">
          <Scope>
            <AboutPage />
          </Scope>
        </Route>
      </Switch>
    </Router>
  );
};
