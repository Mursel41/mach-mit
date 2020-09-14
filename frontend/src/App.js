import React from "react";
import ActivityCard from "./components/ActivityCard"
import "./App.css";
import Homepage from "./components/Homepage.js";

class App extends React.Component {
  render() {
    return (
     <div>
      <Homepage />
      <ActivityCard/>
      </div>
    );
  }
}

export default App;
