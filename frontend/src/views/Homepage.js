import React, { useEffect } from 'react';
import MainTextHeroImg from '../components/MainTextHeroImg';
import SearchBar from '../components/SearchBar';
import JoinButton from '../components/JoinButton';
import CreateActivityButton from '../components/CreateActivityButton';
import { Typography, Divider, Box, Paper, Container } from '@material-ui/core';
import ActivityCard from '../components/ActivityCard';

function Homepage(props) {
  const { isLoggedIn, auth, user, setUser } = props;

  console.log(auth);

  useEffect(() => {
    (async () => {
      if (isLoggedIn && auth) {
        fetch(`http://localhost:5000/api/v1/users/${user._id}`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': auth,
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

  //console.log(user);
  return (
    <Container maxWidth="lg">
      <Box
        m={4}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <MainTextHeroImg />
        </Box>

        {!isLoggedIn ? <JoinButton /> : <CreateActivityButton />}

        <Box>
          <SearchBar />
        </Box>

        {isLoggedIn && user && (
          <React.Fragment>
            <Box m={6}>
              <Divider />
            </Box>

            <Box>
              <Paper
                style={{
                  padding: '10px',
                  backgroundColor: '#FFFBF5',
                  maxWidth: '1400px',
                }}
              >
                <Box m={3}>
                  <Typography variant="h4" component="h4" gutterBottom>
                    Created activities
                  </Typography>
                </Box>

                <Box m={2}>
                  <Divider />
                </Box>

                <Box m={2}>
                  <ActivityCard activities={user.createdActivities} />
                </Box>
              </Paper>
            </Box>

            <Box m={6}>
              <Divider />
            </Box>

            <Box>
              <Paper
                style={{
                  padding: '10px',
                  backgroundColor: '#FFFBF5',
                  maxWidth: '1400px',
                }}
              >
                <Box m={3}>
                  <Typography variant="h4" component="h4" gutterBottom>
                    Participated activities
                  </Typography>
                </Box>

                <Box m={2}>
                  <Divider />
                </Box>

                <Box m={2}>
                  <ActivityCard activities={user.participatedActivities} />
                </Box>
              </Paper>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Container>
  );
}
export default Homepage;
