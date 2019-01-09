import React, { Component } from "react";
import "./css/style.css";
//switch is for wrapping private routes to prevent strange redirection issues
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux"; //component that provides the store.
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import ForumSections from "./components/forum/ForumSections";
import ForumSection from "./components/forum/ForumSection";
import Thread from "./components/forum/Thread";
import Wallet from "./components/wallet/Wallet";
import Character from "./components/character/Character";
import Shops from "./components/shops/Shops";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout the user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

const classes = {
  footer: "footer footer-dark"
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forum" component={ForumSections} />
            <Route exact path="/forum/:forumSection" component={ForumSection} />
            <Route
              exact
              path="/forum/:forumSection/:threadId/:threadTitle"
              component={Thread}
            />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/wallet" component={Wallet} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/character" component={Character} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/shops" component={Shops} />
            </Switch>
            <Footer classes={classes.footer} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
