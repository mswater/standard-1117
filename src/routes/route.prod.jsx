import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";
import { routesAuthority } from "../lib/tools/utils";
import Details from "../pages/Details/index.jsx";
import NotFound from "./../pages/404/index.jsx";
import Login from "./../pages/Login/index.jsx";
import ForgotPassword from "./../pages/ForgotPassword/index.jsx";
import NewPassword from "./../pages/NewPassword/index.jsx";
import Meeting from "./../pages/Meeting/index.jsx";
import Search from "./../pages/Search/index.jsx";
import Home from "./../pages/NewHome/index.jsx";
import Literature from "../pages/Literature/index.jsx";

const role = localStorage.getItem("token");

const Hot = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "hot" */ "../pages/Hot/index.jsx");
  },
  loading() {
    return <div>Loading...</div>;
  },
});

const Report = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "brief" */ "../pages/Report/index.jsx");
  },
  loading() {
    return <div>Loading...</div>;
  },
});

const Subject = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "subject" */ "../pages/Subject/index.jsx");
  },
  loading() {
    return <div>Loading...</div>;
  },
});


const AboutUs = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "aboutus" */ "../pages/AboutUs/index.jsx");
  },
  loading() {
    return <div>Loading...</div>;
  },
});


const ProdRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={routesAuthority(Home)} />
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
        path="/literature"
        component={routesAuthority(role ? Literature : Login, NotFound)}
      />
      <Route
        exact
        path="/report"
        component={routesAuthority(Report, NotFound)}
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
        path="/detail/:type/:detailId"
        component={routesAuthority(role ? Details : Login)}
      />
      <Route
        exact
        path="/subject"
        component={routesAuthority(Subject)}
      />
      <Route
        exact
        path="/subject/:subjectId"
        target="_blank"
        component={routesAuthority(Subject)}
      />
      <Route
        exact
        path="/aboutus"
        component={routesAuthority(AboutUs)}
      />
      <Route path="*" render={() => {return <Redirect to="/" />;}} />
    </Switch>
  );
};

export default ProdRouter;
