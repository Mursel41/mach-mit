import React, { useState, useEffect } from 'react';

import MainTextHeroImg from '../components/MainTextHeroImg';
import SearchBar from '../components/SearchBar';
import JoinButton from '../components/JoinButton';

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Divider,
  Box,
  Paper,
  Container,
} from '@material-ui/core';

import axios from 'axios';
import ActivityCard from '../components/ActivityCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  html: {
    height: '100%',
  },
  '#componentWithId': {
    height: '100%',
  },
}));

function Homepage(props) {
  const classes = useStyles();
  const [activities, setActivities] = useState([]);
  const [typeOfActivity, setTypeOfActivity] = useState(
    '5f620c20f12b4373545185a2'
  );
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/v1/activities?typeOfActivity=${typeOfActivity}`
      )
      .then((response) => setActivities(response.data))
      .catch((error) => console.log({ error }));
  }, []);

  const isLoggedIn = props.isLoggedIn;

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

        {!isLoggedIn ? <JoinButton /> : ''}

        <Box>
          <SearchBar />
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
                Your created activities
              </Typography>
            </Box>

            <Box m={2}>
              <Divider />
            </Box>

            <Box m={2}>
              <ActivityCard activities={activities} />
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
                Your attended activities
              </Typography>
            </Box>

            <Box m={2}>
              <Divider />
            </Box>

            <Box m={2}>
              <ActivityCard activities={activities} />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
export default Homepage;
