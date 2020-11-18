import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";
import { routesAuthority } from "../lib/tools/utils";
import Details from "../pages/Details/index.jsx";
import Tabs from "../pages/Tabs/index.jsx";
import NotFound from "./../pages/404/index.jsx";
import Login from "./../pages/Login/index.jsx";
import ForgotPassword from "./../pages/ForgotPassword/index.jsx";
import NewPassword from "./../pages/NewPassword/index.jsx";
import Meeting from "./../pages/Meeting/index.jsx";
import Search from "./../pages/Search/index.jsx";

const role = localStorage.getItem("token");
const Home = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "home" */ "./../pages/Home/index.jsx");
  },
  loading() {
    return <div>Loading...</div>;
  },
});

const Hot = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "hot" */ "../pages/Hot/index.jsx");
  },
  loading() {
    return <div>Loading...</div>;
  },
});

const Topic = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "topic" */ "../pages/Topic/index.jsx");
  },
  loading() {
    return <div>Loading...</div>;
  },
});

const Literature = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "literature" */ "../pages/Literature/index.jsx");
  },
  loading() {
    return <div>Loading...</div>;
  },
});

const Analysis = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "analyse" */ "../pages/Analysis/index.jsx");
  },
  loading() {
    return <div>Loading...</div>;
  },
});

const Stat = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "stat" */ "../pages/Stat/index.jsx");
  },
  loading() {
    return <div>Loading...</div>;
  },
});

const BriefReport = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "brief" */ "../pages/BriefReport/index.jsx");
  },
  loading() {
    return <div>Loading...</div>;
  },
});

const Personal = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "personal" */ "../pages/Personal/index.jsx");
  },
  loading() {
    return <div>Loading...</div>;
  },
});


const ProdRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={routesAuthority(role ? Home : Login)} />
      <Route
        exact
        path="/login"
        component={routesAuthority(Login)}
      />
      <Route
        exact
        path="/forgot"
        component={routesAuthority(ForgotPassword)}
      />
      <Route
        exact
        path="/newpassword"
        component={routesAuthority(NewPassword)}
      />
      <Route
        exact
        path="/hot"
        component={routesAuthority(role ? Hot : Login, NotFound)}
      />
      <Route
        exact
        path="/topic"
        component={routesAuthority(role ? Topic : Login, NotFound)}
      />
      <Route
        exact
        path="/literature"
        component={routesAuthority(role ? Literature : Login, NotFound)}
      />
      <Route
        exact
        path="/analysis"
        component={routesAuthority(role ? Analysis : Login, NotFound)}
      />
      <Route
        exact
        path="/stat"
        component={routesAuthority(role ? Stat : Login, NotFound)}
      />
      <Route
        exact
        path="/report"
        component={routesAuthority(BriefReport, NotFound)}
      />
      <Route
        exact
        path="/personal"
        component={routesAuthority(Personal, NotFound)}
      />
      <Route
        exact
        path="/meeting"
        component={routesAuthority(role ? Meeting : Login, NotFound)}
      />
      <Route
        exact
        path="/search"
        component={routesAuthority(role ? Search : Login, NotFound)}
      />
      <Route
        exact
        path="/search/:content"
        component={routesAuthority(role ? Search : Login, NotFound)}
      />
      <Route
        exact
        path="/detail/:detailId"
        component={routesAuthority(role ? Details : Login)}
      />
      <Route
        exact
        path="/details/tabs"
        component={routesAuthority(role ? Tabs : Login)}
      />
      <Route path="*" render={() => {return <Redirect to="/" />;}} />
    </Switch>
  );
};

export default ProdRouter;
