import React from "react";
import { Box, Container, Typography, useMediaQuery } from "@material-ui/core";

function MainText() {
  return (
    <Container fixed>
      <Box width="70%">
        <Typography variant="h3" component="h3" gutterBottom>
          <Box letterSpacing={0.5} fontWeight="fontWeightBold" fontSize={50}>
            Meet people near you who share your interests.
          </Box>
        </Typography>
      </Box>
    </Container>
  );
}

export default MainText;
