import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Signup } from './components/signupform/signUpForm';



class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
      <Signup />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
