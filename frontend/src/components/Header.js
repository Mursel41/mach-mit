import React from "react";
import { Button, Box, Container } from "@material-ui/core";
import logo from "../images/Logo.png";

function Header() {
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
    </Container>
  );
}

export default Header;
