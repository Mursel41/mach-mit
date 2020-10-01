import React from 'react';
import { Avatar, Container, Grid, Typography, Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ScheduleIcon from '@material-ui/icons/Schedule';
import WcIcon from '@material-ui/icons/Wc';
import RoomIcon from '@material-ui/icons/Room';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import hero from '../images/hero.jpg';

const EventDetails = () => {
  return (
    <Container fixed>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4"> Let's play table tennis</Typography>
        </Grid>
        <Grid container item xs={12} alignItems="center" spacing={1}>
          <Grid item>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">
              {' '}
              Created by <br /> Mustafa Kurukamci
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box>
            <img alt="Table tennis" src={hero} width="100%" />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <List>
            <ListItem>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText primary="21-10-2020" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <WcIcon />
              </ListItemIcon>
              <ListItemText primary="Only for men" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <RoomIcon />
              </ListItemIcon>
              <ListItemText primary="Peterssteinweg 19, 04207 Leipzig" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary="Free" />
            </ListItem>
            <Divider />
          </List>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h6"> Details/Description</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="body1">
            {' '}
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h6"> Attendees(4)</Typography>
        </Grid>
        <Grid item container xs={12} md={9} justify="flex-start">
          <Grid
            item
            container
            spacing={1}
            xs={4}
            sm={3}
            direction="column"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Grid>
            <Grid item>
              <Typography variant="caption">Mursel Genc</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={1}
            xs={4}
            sm={3}
            direction="column"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Grid>
            <Grid item>
              <Typography variant="caption">Mursel Genc</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={1}
            xs={4}
            sm={3}
            direction="column"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Grid>
            <Grid item>
              <Typography variant="caption">Mursel Genc</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={1}
            xs={4}
            sm={3}
            direction="column"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Grid>
            <Grid item>
              <Typography variant="caption">Mursel Genc</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventDetails;
