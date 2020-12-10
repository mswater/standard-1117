import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./../pages/NewHome/index.jsx";
import Hot from "../pages/Hot/index.jsx";
import Details from "../pages/Details/index.jsx";
import Literature from "../pages/Literature/index.jsx";
import Personal from "../pages/Personal/index.jsx";
import NotFound from "./../pages/404/index.jsx";
import Login from "./../pages/Login/index.jsx";
import ForgotPassword from "./../pages/ForgotPassword/index.jsx";
import NewPassword from "./../pages/NewPassword/index.jsx";
import Meeting from "./../pages/Meeting/index.jsx";
import Search from "./../pages/Search/index.jsx";
import AboutUs from "../pages/AboutUs/index.jsx";
import Report from "../pages/Report/index.jsx";
import Subject from "../pages/Subject/index.jsx";
import { routesAuthority } from "./../lib/tools/utils.js";

const role = localStorage.getItem("token");

const DevRouter = () => {
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
        target="_blank"
        component={routesAuthority(role ? Details : Login)}
      />
      <Route
        exact
        path="/subject"
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

export default DevRouter;
