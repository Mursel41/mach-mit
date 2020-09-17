import React from "react";
import "./App.css";
import { Signup } from "./components/signUpForm";
import ActivityCard from "./components/ActivityCard";
import Container from "@material-ui/core/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainTextHeroImg from "./components/MainTextHeroImg";
import SearchBar from "./components/SearchBar";
import JoinButton from "./components/JoinButton.js";


class App extends React.Component {
  render() {
    return (
      <div>
        <Container maxWidth="lg">
          <Header />
          <MainTextHeroImg />
          <JoinButton />
          <SearchBar />
          <ActivityCard />
        </Container>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
