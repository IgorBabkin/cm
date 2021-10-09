import React, { FunctionComponent } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { AboutPage } from './pages/about/AboutPage';
import { AssetsPage } from './pages/assets/AssetsPage';

export const Application: FunctionComponent = () => {
  return (
    <Router hashType="noslash">
      <Switch>
        <Route exact path="/">
          <AssetsPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
      </Switch>
    </Router>
  );
};
