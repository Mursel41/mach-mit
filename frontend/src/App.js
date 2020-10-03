import React, { useState, useEffect } from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./views/Homepage";
import Dashboard from "./views/Dashboard";
import Signup from "./components/signupform/signUpForm";
import Login from "./components/LogIn";
import NotFound from "./views/NotFound";
import CreateActivity from "./views/CreateActivity";
import SignUpVerMsg from "./views/SignUpVerifMsg";
import EventDetails from "./views/EventDetails";
import PersonalizedHomepage from "./views/PersonalizedHomepage";
import Image from "./images/background.jpg";
import { Box, Container } from "@material-ui/core";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    height: `100%`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: `100%`,
    margin: -24,
    padding: 24,
  },
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(null);
  const [hasLoginError, setHasLoginError] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    if (user && token) {
      setUser(user);
      setAuth(token);
      setIsLoggedIn(true);
    }
  }, []);

  const url = "http://localhost:5000";

  const handleLogin = async (credentials) => {
    try {
      const res = await fetch(`${url}/api/v1/users/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        const payload = await res.json();
        const token = res.headers.get("x-auth-token");
        setIsLoggedIn(true);
        setUser(payload);
        localStorage.setItem("user", JSON.stringify(payload));
        setAuth(token);
        localStorage.setItem("token", JSON.stringify(token));
        setHasLoginError(false);
      } else setHasLoginError(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BrowserRouter>
      <Box style={styles.paperContainer} alignItems="center">
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setAuth={setAuth}
        />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/signup">
            <Signup
              setIsLoggedIn={setIsLoggedIn}
              setAuth={setAuth}
              setUser={setUser}
            />
          </Route>
          <Route exact path="/login">
            <Login
              handleLogin={handleLogin}
              hasLoginError={hasLoginError}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route exact path="/createactivity">
            <CreateActivity />
          </Route>
          <Route exact path="/verifymsg">
            <SignUpVerMsg />
          </Route>
          <Route exact path="/events" component={EventDetails} />

          <Route exact path="/personalizedhomepage">
            <PersonalizedHomepage />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Box>
    </BrowserRouter>
  );
};

export default App;
