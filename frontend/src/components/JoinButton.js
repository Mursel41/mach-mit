import React from "react";
import { Button, Box, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function JoinButton() {
  const history = useHistory();

  const handleClick = () => {
    history.push("/signup");
  };

  return (
    <Container maxWidth="lg">
      <Box mb={10} mt={2}>
        <Button
          onClick={handleClick}
          variant="contained"
          color="secondary"
          style={{
            height: "60px",
            width: "150px",
          }}
        >
          Join us
        </Button>
      </Box>
    </Container>
  );
}
export default JoinButton;
