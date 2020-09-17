import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import hero from "../images/hero.jpg";

function MainTextHeroImg() {
  return (
    <Container maxWidth="lg">
      <Box mt={10}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box>
            <Typography variant="h3" component="h3" gutterBottom width="60%">
              Meet people near you who share your interests.
            </Typography>
          </Box>
          <Box>
            <img src={hero} alt="Hero Image" width="400" />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default MainTextHeroImg;
