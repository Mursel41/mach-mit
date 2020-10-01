import React from "react";
import Container from "@material-ui/core/Container";
import MainTextHeroImg from "../components/MainTextHeroImg";
import SearchBar from "../components/SearchBar";
import JoinButton from "../components/JoinButton";

function Homepage(props) {
  const isLoggedIn=props.isLoggedIn;

  return (
    <Container maxWidth="lg">
      <MainTextHeroImg />
      {!isLoggedIn ? (<JoinButton />):('')}
      <SearchBar />
    </Container>
  );
}
export default Homepage;
