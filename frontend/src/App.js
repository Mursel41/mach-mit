import React from "react";
import { Container, Typography, Button, Box } from "@material-ui/core";
import hero from "./images/hero.jpg";

function App() {
  return (
    <Container className="App" maxWidth="m">
      <Box mt={14} mb={6}>
        <Typography variant="h2" component="h2" gutterBottom>
          Meet people near you who share your interests.
        </Typography>
      </Box>
      <Box mt={14} mb={6}>
        <img src={hero} alt="Hero Image" width="70%" />
      </Box>

      <Button variant="contained" color="secondary" size="large">
        Join us
      </Button>
    </Container>
  );
}

export default App;
