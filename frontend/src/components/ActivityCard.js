import React from "react";
import { Card, Grid } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import moment from "moment";
import { withRouter } from "react-router-dom";

class ActivityCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container spacing={1} justify="center">
        {this.props.activities && this.props.activities.length < 1 ? (
          <p> No activity yet!</p>
        ) : (
          this.props.activities &&
          this.props.activities.map((card) => {
            return (
              <Box
                m={0.5}
                key={card._id}
                width={200}
                mx={0.5}
                mb={0.5}
                onClick={() => this.props.history.push(`/events/${card._id}`)}
              >
                <Card>
                  <Box>
                    <CardActionArea>
                      <CardMedia color="secondary.main">
                        <img
                          src={card.typeOfActivity.categoryImage}
                          alt="activity_image"
                          width="100%"
                          height={150}
                        />
                      </CardMedia>
                      <CardContent>
                        <Typography
                          gutterBottom
                          color="secondary"
                          variant="subtitle3"
                        >
                          {card.typeOfActivity.name}
                        </Typography>
                        <Typography gutterBottom variant="h7" component="h2">
                          {card.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          <Box>
                            {moment(card.startDate).format("D MMM YYYY")}
                          </Box>
                          {card.participants.length ===
                          card.numberOfAttendee ? (
                            "FULL"
                          ) : (
                            <Box>
                              {" "}
                              {card.participants.length}/{card.numberOfAttendee}{" "}
                              Participants
                            </Box>
                          )}
                        </Typography>
                        <Box
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-between"
                          flexWrap="wrap"
                          mt={2}
                        >
                          <Box>
                            {" "}
                            <Typography variant="body2" color="Primary">
                              {card.price === 0 ? "Free" : "€ " + card.price}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2">
                              {card.address.city}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Box>
                </Card>
              </Box>
            );
          })
        )}
      </Grid>
    );
  }
}

export default withRouter(ActivityCard);
