import React from "react";
import ActivityCard from "./ActivityCard";
import Container from "@material-ui/core/Container";
import MainTextHeroImg from "./MainTextHeroImg";
import SearchBar from "./SearchBar";
import JoinButton from "./JoinButton";

function Homepage() {
  return (
    <Container maxWidth="lg">
      <MainTextHeroImg />
      <JoinButton />
      <SearchBar />
      <ActivityCard />
    </Container>
  );
}
export default Homepage;
