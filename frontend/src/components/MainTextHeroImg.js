import React from "react";
import { Box, Container, Typography } from "@material-ui/core";

function MainTextHeroImg() {
  return (
    <Container fixed>
      <Box mt={10} width="60%">
        <Typography variant="h3" component="h3" gutterBottom>
          Meet people near you who share your interests.
        </Typography>
      </Box>
    </Container>
  );
}

export default MainTextHeroImg;
