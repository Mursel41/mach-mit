import React, { useEffect } from "react";
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

  console.log(auth);

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
            console.log(data);
            setUser(data);
          })
          .catch((error) => console.log(error));
      }
    })();
  }, [auth]);

  return (
    <Container fixed>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Grid item>
            <MainTextHeroImg />
          </Grid>
          <Grid item>
            {!isLoggedIn ? <JoinButton /> : <CreateActivityButton />}
          </Grid>
        </Grid>

        <Grid item xs={12} md={9}>
          <SearchBar />
        </Grid>

        <Grid item xs={12} md={9}>
          {isLoggedIn && user && (
            <React.Fragment>
              <Box m={2}>
                <Divider />
              </Box>

              <Box>
                <Paper
                  style={{
                    padding: "10px",
                    backgroundColor: "#EEFAFF",
                  }}
                >
                  <Box>
                    <Typography variant="h4" component="h4" gutterBottom>
                      Created activities
                    </Typography>
                  </Box>

                  <Box>
                    <Divider />
                  </Box>

                  <Box>
                    <ActivityCard activities={user.createdActivities} />
                  </Box>
                </Paper>
              </Box>

              <Box m={2}>
                <Divider />
              </Box>

              <Box>
                <Paper
                  style={{
                    padding: "10px",
                    backgroundColor: "#EEFAFF",
                  }}
                >
                  <Box>
                    <Typography variant="h4" component="h4" gutterBottom>
                      Participated activities
                    </Typography>
                  </Box>

                  <Box m={3}>
                    <Divider />
                  </Box>

                  <Box>
                    <ActivityCard activities={user.participatedActivities} />
                  </Box>
                </Paper>
              </Box>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
export default Homepage;
