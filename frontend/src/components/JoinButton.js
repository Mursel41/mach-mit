import React from "react";
import { Button, Box, Container } from "@material-ui/core";

function JoinButton() {
  return (
    <Container maxWidth="lg">
      <Box mb={10} mt={6}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{
            height: "54px",
          }}
        >
          Join us
        </Button>
      </Box>
    </Container>
  );
}
export default JoinButton;
