import React from 'react';
import { Button, Box, Container } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

function CreateActivityButton(props) {
  return (
    <Container maxWidth="lg">
      <Box mb={3} mt={3}>
        <Button
          onClick={() => props.history.push('/createactivity')}
          variant="contained"
          color="secondary"
          size="large"
          style={{
            height: '54px',
          }}
        >
          Create Activity
        </Button>
      </Box>
    </Container>
  );
}
export default withRouter(CreateActivityButton);
