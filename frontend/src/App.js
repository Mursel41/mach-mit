import React, { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Homepage from './components/Homepage';
import Dashboard from './views/Dashboard';
import { Signup } from './components/signUpForm';
import Login from './components/LogIn';
import NotFound from './views/NotFound';
import CreateActivity from './views/CreateActivity';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(null);
  const [hasLoginError, setHasLoginError] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    if (user && token) {
      setUser(user);
      setAuth(token);
      setIsLoggedIn(true);
    }
  }, []);

  const url = 'http://localhost:5000';

  const handleLogin = async (credentials) => {
    try {
      const res = await fetch(`${url}/api/v1/users/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 200) {
        const payload = await res.json();
        const token = res.headers.get('x-auth-token');
        setIsLoggedIn(true);
        setUser(payload);
        localStorage.setItem('user', JSON.stringify(payload));
        setAuth(token);
        localStorage.setItem('token', JSON.stringify(token));
        setHasLoginError(false);
      } else setHasLoginError(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BrowserRouter>
      <div>
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
            <Signup />
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
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
