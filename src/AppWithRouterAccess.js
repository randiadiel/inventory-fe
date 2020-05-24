import React from "react";
import { Route, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import Home from "./pages/Home";
import Login from "./components/Login";
import Item from "./pages/Item";

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push("/login");
  };

  return (
    <Security
      issuer="https://dev-493821.okta.com/oauth2/default"
      clientId="0oaczby8te3v2Tm2I4x6"
      redirectUri={window.location.origin + "/implicit/callback"}
      onAuthRequired={onAuthRequired}
      pkce={true}
    >
      <Route path="/" exact={true} component={Home} />
      <SecureRoute path="/item" component={Item} />
      <Route
        path="/login"
        render={() => (
          <Login issuer="https://dev-493821.okta.com/oauth2/default" />
        )}
      />
      <Route path="/implicit/callback" component={LoginCallback} />
    </Security>
  );
};
export default AppWithRouterAccess;
