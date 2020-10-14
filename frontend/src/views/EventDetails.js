import React, { Component } from "react";
import {
  Avatar,
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Paper,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CategoryIcon from "@material-ui/icons/Category";
import ScheduleIcon from "@material-ui/icons/Schedule";
import WcIcon from "@material-ui/icons/Wc";
import RoomIcon from "@material-ui/icons/Room";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import moment from "moment";

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
    const {
      _id,
      image,
      description,
      address: { city, street, zip },
      creator,
      participants,
      numberOfAttendee,
      price,
      startDate,
      title,
      typeOfActivity: { name, categoryImage},
      typeOfAttendee,
    } = this.state.data;

    const handleJoin = () => {
      //console.log(this.props.user._id);
      if (!this.props.isLoggedIn) return this.props.history.push("/login");

      // if (
      //   participants.findIndex(
      //     (participant) => participant._id === this.props.user._id
      //   ) !== -1
      // )
      //   return swal('', 'You have already joined this activity.', 'info');

      if (participants.length === numberOfAttendee)
        return swal("This activity has accessed its participants limit :(");

      swal({
        text: "Do you want to join this activity?",
        icon: "info",
        buttons: true,
      }).then((willJoin) => {
        if (willJoin) {
          swal("Enjoy your activity", {
            icon: "success",
          }).then(() => {
            fetch(`http://localhost:5000/api/v1/activities/${_id}/join`, {
              method: "POST",
              body: JSON.stringify({ _id: this.props.user._id }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then(() => this.props.history.push("/"))
              .catch((err) => console.log(err));
          });
        }
      });
    };

    const handleDelete = () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not have access to this activity!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Your activity has been deleted!", {
            icon: "success",
          }).then(() => {
            fetch(`http://localhost:5000/api/v1/activities/${_id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": this.props.auth,
              },
            })
              .then(() => this.props.history.push("/"))
              .catch((err) => console.log(err));
          });
        }
      });
    };

    const handleLeave = () => {
      swal({
        title: "Are you sure?",
        text: `You can join again until ${moment(startDate).format(
          "D MMM YYYY, hh:mm"
        )}`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willLeave) => {
        if (willLeave) {
          swal("You have leaved the activity!", {
            icon: "success",
          }).then(() => {
            fetch(`http://localhost:5000/api/v1/activities/${_id}/leave`, {
              method: "POST",
              body: JSON.stringify({ _id: this.props.user._id }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then(() => this.props.history.push("/"))
              .catch((err) => console.log(err));
          });
        }
      });
    };

    let button;
    if (
      participants.findIndex(
        (participant) => participant._id === this.props.user._id
      ) !== -1
    ) {
      button = (
        <Grid item xs={12} sm={3} style={{ marginTop: "1rem" }}>
          <Button
            onClick={handleLeave}
            variant="contained"
            color="secondary"
            size="large"
            fullWidth={true}
          >
            Leave
          </Button>
        </Grid>
      );
    } else if (this.props.user._id !== creator._id) {
      button = (
        <Grid item xs={12} sm={3} mt={4} style={{ marginTop: "1rem" }}>
          <Button
            onClick={handleJoin}
            variant="contained"
            color="secondary"
            size="large"
            fullWidth={true}
          >
            Join
          </Button>
        </Grid>
      );
    } else if (this.props.user._id === creator._id) {
      button = (
        <Grid item xs={12} sm={3} mt={4} style={{ marginTop: "1rem" }}>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="secondary"
            size="large"
            fullWidth={true}
          >
            Delete
          </Button>
        </Grid>
      );
    }

    return (
      <Container maxWidth="md">
        <Box minHeight="78.4vh">
          <Paper
            style={{
              padding: "10px 30px 30px 30px",
              backgroundColor: "rgba(238,250,255, 0.6)",
              marginBottom: "2rem",
              marginTop: "2rem",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box mb={1} mt={2}>
                  <Typography variant="h4" color={"secondary"}>
                    <Box letterSpacing={0.5} fontWeight="fontWeightBold">
                      {" "}
                      {title}
                    </Box>
                  </Typography>
                </Box>
                <Box m={1}>
                  <Divider />
                </Box>
              </Grid>
              <Grid container item xs={12} alignItems="center" spacing={1}>
                <Grid item>
                  <Avatar
                    onClick={() =>{ 
                      if (!this.props.isLoggedIn) return this.props.history.push("/login");
                      this.props.history.push(`/profile/${creator._id}`)}}
                    alt={creator.fullName}
                    src={creator.image}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    {" "}
                    Created by <br /> <b>{creator.fullName}</b>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={8} md={6}>
                <Box>
                  <img alt={name} src={categoryImage} width="100%" />
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CategoryIcon style={{ color: "#0098AB" }} />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <ScheduleIcon style={{ color: "#0098AB" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={moment(startDate).format("D MMM YYYY, hh:mm")}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <WcIcon style={{ color: "#0098AB" }} />
                    </ListItemIcon>
                    <ListItemText primary={typeOfAttendee} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <RoomIcon style={{ color: "#0098AB" }} />
                    </ListItemIcon>
                    <ListItemText primary={`${street}, ${zip} ${city}`} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <AttachMoneyIcon style={{ color: "#0098AB" }} />
                    </ListItemIcon>
                    <ListItemText primary={price ? `€ ${price}` : "Free"} />
                  </ListItem>
                  <Divider />
                </List>
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h6">
                  {" "}
                  <Box letterSpacing={0.5} fontWeight="fontWeightBold">
                    {" "}
                    Details / Description{" "}
                  </Box>
                </Typography>
              </Grid>

              <Grid item xs={12} md={9}>
                <Typography variant="body1">
                  {description
                    ? description
                    : "There is no available description for this activity..."}
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h6">
                  <Box letterSpacing={0.5} fontWeight="fontWeightBold">
                    {" "}
                    Participants({participants.length}/{numberOfAttendee})
                  </Box>
                </Typography>
              </Grid>

              {participants.length === 0 ? (
                <Grid item xs={12} md={9}>
                  <Typography>
                    {" "}
                    So far there is nobody joining to this activity.
                  </Typography>
                </Grid>
              ) : (
                <Grid item container xs={12} md={9} justify="flex-start">
                  {participants.map((participant) => (
                    <Grid
                      item
                      container
                      xs={4}
                      sm={3}
                      direction="column"
                      alignItems="center"
                    >
                      <Grid item>
                        <Avatar
                          onClick={() =>{ 
                                if (!this.props.isLoggedIn) return this.props.history.push("/login");
                                this.props.history.push(`/profile/${participant._id}`)}}
                          alt={participant.fullName}
                          src={participant.image}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="caption">
                          <b>{participant.fullName}</b>
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
            <Grid item>{button}</Grid>
          </Paper>
        </Box>
      </Container>
    );
  }
}

export default withRouter(EventDetails);
