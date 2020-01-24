import React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import Search from "./components/Search";
import Wizard from "./components/Wizard";
import Cards from "./components/Cards";
import Main from "./components/Main";
import Edit from "./components/Edit";
import ScrollToTop from "./components/ScrollTop";
import AddClient from "./components/AddClient";

export default props => (
  <HashRouter>
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/edit" component={Edit} />
        <Route exact path="/wizard" component={Wizard} />
        <Route exact path="/cards" component={Cards} />
        <Route exact path="/add" component={AddClient} />
      </Switch>
    </ScrollToTop>
  </HashRouter>
);
