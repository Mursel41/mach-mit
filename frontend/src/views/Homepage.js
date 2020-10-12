import React, {useState, useEffect } from "react";
import MainTextHeroImg from "../components/MainTextHeroImg";
import SearchBar from "../components/SearchBar";
import JoinButton from "../components/JoinButton";
import CreateActivityButton from "../components/CreateActivityButton";

import {
  Typography,
  Divider,
  Box,
  Paper,
  Container,
  Grid,
} from "@material-ui/core";
import ActivityCard from "../components/ActivityCard";

function Homepage(props) {
  const { isLoggedIn, auth, user, setUser } = props;
  const [createdActivities, setCreatedActivities ]= useState([]);
  const [participatedActivities, setParticipatedActivities ]= useState([]);

  useEffect(() => {
    (async () => {
      if (isLoggedIn && auth) {
        fetch(`http://localhost:5000/api/v1/users/${user._id}`, {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
            setCreatedActivities(data.createdActivities);
            setParticipatedActivities(data.participatedActivities);
          })
          .catch((error) => console.log(error));
      }
    })();
  }, [auth]);

  return (
    <Container fixed>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} md={9}>
          <Grid item>
            <MainTextHeroImg />
          </Grid>
          <Grid item>
            {!isLoggedIn ? <JoinButton /> : <CreateActivityButton />}
          </Grid>
        </Grid>

        <Grid item xs={12} md={9}>
          <SearchBar city={user.city} />
        </Grid>

        <Grid item xs={12} md={9}>
          {isLoggedIn && user && (
            <React.Fragment>
              <Box m={2}>
                <Divider />
              </Box>

              <Grid item>
                <Paper
                  style={{
                    padding: "10px",
                    backgroundColor: "rgba(238,250,255, 0.5)",
                  }}
                >
                  <Grid item>
                    <Box p={1}>
                      <Typography variant="h4" component="h4" gutterBottom>
                        Created activities
                      </Typography>
                    </Box>
                  </Grid>

                  <Box m={1}>
                    <Divider />
                  </Box>
                  <Grid item>
                    <ActivityCard activities={createdActivities.sort(function(a, b) {
                          let x = a.startDate; let y = b.startDate;
                          return ((x < y) ? 1 : ((x > y) ? -1 : 0))})} />
                  </Grid>
                </Paper>
              </Grid>

              <Box m={2}>
                <Divider />
              </Box>

              <Grid item>
                <Paper
                  style={{
                    padding: "30px",
                    backgroundColor: "rgba(238,250,255, 0.6)",
                    marginBottom: "30px",
                    marginTop: "30px",
                  }}
                >
                  <Grid item>
                    <Box p={1}>
                      <Typography variant="h4" component="h4" gutterBottom>
                        Participated activities
                      </Typography>
                    </Box>
                  </Grid>

                  <Box m={1}>
                    <Divider />
                  </Box>
                  <Grid item>
                    <ActivityCard activities={participatedActivities.sort(function(a, b) {
                          let x = a.startDate; let y = b.startDate;
                          return ((x < y) ? 1 : ((x > y) ? -1 : 0))})} />
                  </Grid>
                </Paper>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
export default Homepage;
