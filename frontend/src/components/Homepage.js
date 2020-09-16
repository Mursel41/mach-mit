import React from "react";
import { Grid, Typography, Button, Box, Container } from "@material-ui/core";
import hero from "../images/hero.jpg";
import logo from "../images/Logo.png";
import SearchBar from "./SearchBar";

function Homepage() {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mt={5}
      >
        <Box>
          <img src={logo} alt="Logo" width="150" />
        </Box>

        <Box>
          <Button href="#text-buttons" color="default" size="large">
            Log in
          </Button>
          <Button href="#text-buttons" color="default" size="large">
            Sign up
          </Button>
        </Box>
      </Box>

      <Box mt={10}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box width="50%">
            <Typography variant="h3" component="h3" gutterBottom width="60%">
              Meet people near you who share your interests.
            </Typography>
          </Box>
          <Box width="35%">
            <img src={hero} alt="Hero Image" width="450" />
          </Box>
        </Box>
      </Box>

      <Box mb={5} mt={5}>
        <Button variant="contained" color="secondary" size="large">
          Join us
        </Button>
      </Box>
      <Box
        mt={8}
        mb={5}
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        <Box mt={3}>
          <SearchBar />
        </Box>
      </Box>
    </Container>
  );
}
export default Homepage;
