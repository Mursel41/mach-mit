import React from "react";
import { Button, Box, Container } from "@material-ui/core";

function LookForActivityButton() {
  return (
    <Container maxWidth="lg">
      <Box mb={3} mt={3}>
        <Button
          variant="contained"
          color="Primary"
          size="large"
          style={{
            height: "54px",
          }}
        >
          Look for Activity
        </Button>
      </Box>
    </Container>
  );
}
export default LookForActivityButton;
