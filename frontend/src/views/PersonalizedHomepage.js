import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Divider,
  Box,
  Paper,
  Container,
} from "@material-ui/core";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import ActivityCard from "../components/ActivityCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  html: {
    height: "100%",
  },
  "#componentWithId": {
    height: "100%",
  },
}));

export default function PersonalizedHomepage() {
  const classes = useStyles();
  const [activities, setActivities] = useState([]);
  const [typeOfActivity, setTypeOfActivity] = useState(
    "5f620c20f12b4373545185a2"
  );
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/v1/activities?typeOfActivity=${typeOfActivity}`
      )
      .then((response) => setActivities(response.data))
      .catch((error) => console.log({ error }));
  }, []);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Box m={4} display="flex" flexDirection="row" justifyContent="center">
          <SearchBar />
        </Box>

        <Box m={6}>
          <Divider />
        </Box>
        <Box>
          <Paper
            style={{
              padding: "20px",
              backgroundColor: "#FFFBF5",
              maxWidth: "1200px",
            }}
          >
            <Box m={3}>
              <Typography variant="h4" component="h4" gutterBottom>
                Your created activities
              </Typography>
            </Box>

            <Grid container spacing={3} justify="center">
              <ActivityCard activities={activities} />
            </Grid>
          </Paper>
        </Box>
        <Box m={6}>
          <Divider />
        </Box>

        <Box>
          <Paper
            style={{
              padding: "20px",
              backgroundColor: "#FFFBF5",
              maxWidth: "1200px",
            }}
          >
            <Box m={3}>
              <Typography variant="h4" component="h4" gutterBottom>
                Your attended activities
              </Typography>
            </Box>

            <Grid container spacing={3} justify="center">
              <ActivityCard activities={activities} />
            </Grid>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}
