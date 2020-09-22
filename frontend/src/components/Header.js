import React from "react";
import { Button, Box } from "@material-ui/core";
import logo from "../images/Logo.png";

export function Header() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      // alignItems="center"
      justifyContent="space-between"
      mt={2}
      mr={3}
      ml={4}
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
  );
}

export default Header;
