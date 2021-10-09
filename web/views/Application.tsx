import React, { FunctionComponent } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { AboutPage } from './pages/about/AboutPage';
import { AssetsPage } from './pages/assets/AssetsPage';
import { Scope } from 'react-ts-ioc-container';

export const Application: FunctionComponent = () => {
  return (
    <Router hashType="noslash">
      <Switch>
        <Route exact path="/">
          <AssetsPage />
        </Route>
        <Route path="/about">
          <Scope>
            <AboutPage />
          </Scope>
        </Route>
      </Switch>
    </Router>
  );
};
