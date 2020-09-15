import React from "react";
import ActivityCard from "./components/ActivityCard";
import "./App.css";
import Homepage from "./components/Homepage.js";
import Container from "@material-ui/core/Container";
import Footer from "./components/Footer";

class App extends React.Component {
  render() {
    return (

      <div>
      <Container maxWidth="lg">
        <Homepage />
        <ActivityCard />
        
      </Container>
        <div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
