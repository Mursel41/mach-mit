import React from "react";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import hero from "../images/hero.jpg";

function Homepage() {
  return (
    <Box m={30}>
      <Grid container>
        <Box mr={20}>
          <Grid item sm style={{ padding: 20 }}>
            <Typography variant="h2" component="h2" gutterBottom>
              Meet people near you who share your interests.
            </Typography>
            <Box mt={6} mb={10}>
              <Button variant="contained" color="secondary" size="large">
                Join us
              </Button>
            </Box>
          </Grid>
        </Box>

        <Grid item sm style={{ padding: 20 }}>
          <img src={hero} alt="Hero Image" width="100%" />
        </Grid>
      </Grid>
    </Box>
  );
}
export default Homepage;
