import React, { useState, useEffect } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PropTypes } from "prop-types";
import Container from "react-bootstrap/Container";

import { setUser } from "../store/reducers/User";
import { isAuthenticated } from "../service/auth";

import Home from "../routes/home/";
import Login from "../routes/login/";
import Challenge from "../routes/challenge/";
import FarmsList from "../routes/farms/index";
import FarmsCheckout from "../routes/farms/checkout";
import FarmsDetail from "../routes/farms/detail";
import FarmsEdit from "../routes/farms/edit";

const App = props => {
  const { location, match } = props;
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  /**
   * Authenticates user and set state variables
   * @function authUser
   */
  const authUser = async () => {
    try {
      const userData = await isAuthenticated();
      dispatch(setUser(userData));

      setLogged(true);
      setLoading(false);
    } catch (err) {
      setLogged(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    authUser();
  }, []);

  if (loading) return null;

  const isRoot =
    location.pathname === "" ||
    location.pathname === "/" ||
    location.pathname === "/app" ||
    location.pathname === "/app/";

  if (!logged && location.pathname.indexOf("login") === -1) {
    return <Redirect to="/login" />;
  }

  if (isRoot) {
    return <Redirect to="/app/home" />;
  }

  return (
    <Container className="App">
      <header className="App-header">
        <Route path={`${match.url}app/home`} component={Home} />
        <Route exact path={`${match.url}app/farms`} component={FarmsList} />
        <Route
          path={`${match.url}app/farms/:farm_id/detail`}
          component={FarmsDetail}
        />
        <Route
          path={`${match.url}app/farms/:farm_id/edit`}
          component={FarmsEdit}
        />
        <Route
          path={`${match.url}app/farms/:farm_id/buy`}
          component={FarmsCheckout}
        />
        <Route
          path={`${match.url}app/farms/:farm_id/bid`}
          component={FarmsCheckout}
        />
        <Route path={`${match.url}app/challenge`} component={Challenge} />
        <Route path={`${match.url}login`} component={Login} />
      </header>
    </Container>
  );
};

App.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object
};

export default withRouter(App);
