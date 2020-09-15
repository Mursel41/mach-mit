import React from "react";
import ActivityCard from "./components/ActivityCard";
import "./App.css";
import Homepage from "./components/Homepage.js";
import Container from "@material-ui/core/Container";

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
