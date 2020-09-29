import React from "react";
import ActivityCard from "../components/ActivityCard";
import Container from "@material-ui/core/Container";
import MainTextHeroImg from "../components/MainTextHeroImg";
import SearchBar from "../components/SearchBar";
import JoinButton from "../components/JoinButton";

function Homepage() {
  return (
    <Container maxWidth="lg">
      <MainTextHeroImg />
      <JoinButton />
      <SearchBar />
    </Container>
  );
}
export default Homepage;
