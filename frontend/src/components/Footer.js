import React from "react";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

function Footer(props) {
  const isLoggedIn = props.isLoggedIn;

  return (
    <Box
      style={{
        height: "90px",
        backgroundColor: "#102e4a",
        color: "#F5F5F5",
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Typography variant="body2" align="center">
          Copyright © Mach mit!
        </Typography>
      </Box>
    </Box>
  );
}
export default Footer;
