import React from "react";
import { Button, Box, Container } from "@material-ui/core";

function CreateActivityButton() {
  return (
    <Container maxWidth="lg">
      <Box mb={3} mt={3}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{
            height: "54px",
          }}
        >
          Create Activity
        </Button>
      </Box>
    </Container>
  );
}
export default CreateActivityButton;
