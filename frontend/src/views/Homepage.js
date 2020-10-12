import React, { useEffect } from "react";
import MainText from "../components/MainText";
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
          })
          .catch((error) => console.log(error));
      }
    })();
  }, [auth]);

  return (
    <Container fixed>
      <Box minHeight="82.4vh">
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} md={9}>
            <Grid item>
              <Box mt={20} mb={5}>
                <MainText />
              </Box>
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
                      padding: "20px",
                      backgroundColor: "rgba(238,250,255, 0.5)",
                      marginBottom: "30px",
                      marginTop: "30px",
                    }}
                  >
                    <Box>
                      <Typography variant="h4" component="h4" gutterBottom>
                        <Box letterSpacing={0.5} fontWeight="fontWeightMedium">
                          Created activities
                        </Box>
                      </Typography>
                    </Box>

                    <Box m={1}>
                      <Divider />
                    </Box>

                    <Grid item>
                      <ActivityCard activities={user.createdActivities} />
                    </Grid>
                  </Paper>
                </Grid>

                <Box mb={2}>
                  <Divider />
                </Box>

                <Box>
                  <Paper
                    style={{
                      padding: "20px",
                      backgroundColor: "rgba(238,250,255, 0.5)",
                      marginBottom: "30px",
                      marginTop: "30px",
                    }}
                  >
                    <Box>
                      <Typography variant="h4" component="h4" gutterBottom>
                        <Box letterSpacing={0.5} fontWeight="fontWeightMedium">
                          Participated activities
                        </Box>
                      </Typography>
                    </Box>
                    <Box mb={1}>
                      <Divider />
                    </Box>

                    <Grid item>
                      <ActivityCard activities={user.participatedActivities} />
                    </Grid>
                  </Paper>
                </Box>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
export default Homepage;
