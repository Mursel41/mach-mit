import React, { Component } from 'react';
import {
  Avatar,
  Container,
  Grid,
  Typography,
  Box,
  Button,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CategoryIcon from '@material-ui/icons/Category';
import ScheduleIcon from '@material-ui/icons/Schedule';
import WcIcon from '@material-ui/icons/Wc';
import RoomIcon from '@material-ui/icons/Room';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import hero from '../images/hero.jpg';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import moment from 'moment';

class EventDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: { address: {}, creator: {}, participants: [], typeOfActivity: {} },
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`http://localhost:5000/api/v1/activities/${id}`)
      .then((res) => res.json())
      .then((data) => this.setState({ data }))
      .catch((err) => console.log(err));
  }

  render() {
    console.log(this.state.data);
    const {
      _id,
      description,
      address: { city, street, zip },
      creator,
      participants,
      numberOfAttendee,
      price,
      startDate,
      title,
      typeOfActivity: { name },
      typeOfAttendee,
    } = this.state.data;

    const handleClick = () => {
      console.log(this.props.user._id);
      if (!this.props.isLoggedIn) return this.props.history.push('/login');

      if (
        participants.findIndex(
          (participant) => participant._id === this.props.user._id
        ) !== -1
      )
        return swal('', 'You have already joined this activity.', 'info');

      if (participants.length === numberOfAttendee)
        return swal('This activity has accessed its participants limit :(');

      swal({
        text: 'Do you want to join this activity?',
        icon: 'info',
        buttons: true,
      }).then((willJoin) => {
        if (willJoin) {
          swal('Enjoy your activity', {
            icon: 'success',
          }).then(() => {
            fetch(`http://localhost:5000/api/v1/activities/${_id}/join`, {
              method: 'POST',
              body: JSON.stringify({ _id: this.props.user._id }),
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then(() => this.props.history.push('/'))
              .catch((err) => console.log(err));
          });
        }
      });
    };

    return (
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4"> {title}</Typography>
          </Grid>
          <Grid container item xs={12} alignItems="center" spacing={1}>
            <Grid item>
              <Avatar  onClick={() => this.props.history.push(`/profile/${creator._id}`)}
                alt={creator.fullName}
                src="/static/images/avatar/1.jpg"
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                {' '}
                Created by <br /> {creator.fullName}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box>
              <img alt={name} src={hero} width="100%" />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <ScheduleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={moment(startDate).format('D MMM YYYY, hh:mm')}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <WcIcon />
                </ListItemIcon>
                <ListItemText primary={typeOfAttendee} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <RoomIcon />
                </ListItemIcon>
                <ListItemText primary={`${street}, ${zip} ${city}`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary={price ? `€ ${price}` : 'Free'} />
              </ListItem>
              <Divider />
            </List>
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h6"> Details / Description</Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="body1">
              {description
                ? description
                : 'There is no available description for this activity...'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h6">
              {' '}
              Participants({participants.length})
            </Typography>
          </Grid>
          {participants.length === 0 ? (
            <Typography>
              {' '}
              So far there is nobody joining to this activity. Be first to enjoy
              the activity.
            </Typography>
          ) : (
            <Grid item container xs={12} md={9} justify="flex-start">
              {participants.map((participant) => (
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
                    <Avatar
                      onClick={() => this.props.history.push(`/profile/${participant._id}`)}
                      alt={participant.fullName}
                      src="/static/images/avatar/1.jpg"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">
                      {participant.fullName}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              onClick={handleClick}
              variant="contained"
              color="secondary"
              size="large"
            >
              Join
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(EventDetails);
