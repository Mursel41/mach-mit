import React from "react";
import "./App.css";
import { Signup } from "./components/signUpForm";

class App extends React.Component {
  render() {
    return (
      <Container maxWidth="lg">
        <Homepage />
        <ActivityCard />
      </Container>
    );
  }
}

export default App;
