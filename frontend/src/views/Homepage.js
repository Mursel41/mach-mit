import React, { useState, useEffect } from "react";
import MainText from "../components/MainText";
import SearchBar from "../components/SearchBar";
import JoinButton from "../components/JoinButton";
import CreateActivityButton from "../components/CreateActivityButton";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
  Typography,
  Divider,
  Box,
  Paper,
  Container,
  Grid,
} from "@material-ui/core";
import ActivityCard from "../components/ActivityCard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


function Homepage(props) {
  const { isLoggedIn, auth, user, setUser } = props;
  const [createdActivities, setCreatedActivities] = useState([]);
  const [participatedActivities, setParticipatedActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (isLoggedIn && auth) {
        fetch(`http://localhost:5000/api/v1/users/${user._id}`, {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setIsLoading(false);
            setUser(data);
            setCreatedActivities(data.createdActivities);
            setParticipatedActivities(data.participatedActivities);
          })
          .catch((error) => console.log(error));
      }
    })();
  }, [auth]);

  
  const classes = useStyles();

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
                      <Typography variant="h5" component="h5" gutterBottom>
                        <Box letterSpacing={0.5} fontWeight="fontWeightBold">
                          Created activities
                        </Box>
                      </Typography>
                    </Box>
                    <Box m={1}>
                      <Divider />
                    </Box>
                    <Grid item>
                    {isLoading ?       
                        <div className={classes.root}>
                          <h2>Loading...</h2>
                          <LinearProgress color="secondary" />
                        </div>
                        :
                      <ActivityCard
                        activities={createdActivities.sort(function (a, b) {
                          let x = a.startDate;
                          let y = b.startDate;
                          return x < y ? 1 : x > y ? -1 : 0;
                        })}
                      />
                      }
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
                    {isLoading ?       
                        <div className={classes.root}>
                          <h2>Loading...</h2>
                          <LinearProgress color="secondary" />
                        </div>
                        :
                      <Typography variant="h5" component="h5" gutterBottom>
                        <Box letterSpacing={0.5} fontWeight="fontWeightBold">
                          Participated activities
                        </Box>
                      </Typography>
                    }
                    </Box>
                    <Box mb={1}>
                      <Divider />
                    </Box>

                    <Grid item>
                      <ActivityCard
                        activities={participatedActivities.sort(function (
                          a,
                          b
                        ) {
                          let x = a.startDate;
                          let y = b.startDate;
                          return x < y ? 1 : x > y ? -1 : 0;
                        })}
                      />
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
