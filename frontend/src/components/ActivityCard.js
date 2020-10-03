import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import moment from "moment";

class ActivityCard extends React.Component {
  render(props) {
    return (
      <div>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          flexWrap="wrap"
          mt={2}
        >
          {this.props.activities.map((card) => {
            return (
              <Box m={0.5} key={card._id} width={250} p={0.1} mx={0.5} mb={0.5}>
                <Card>
                  <Box>
                    <CardActionArea>
                      <CardMedia color="secondary.main">
                        <img
                          src={card.image}
                          alt="activity_image"
                          width="100%"
                          height={230}
                        />
                      </CardMedia>
                      <CardContent>
                        <Typography
                          gutterBottom
                          color="secondary"
                          variant="subtitle2"
                        >
                          {card.typeOfActivity.name}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
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
                          <Box>0/{card.numberOfAttendee} Paticipaters</Box>
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
          })}
        </Box>
      </div>
    );
  }
}

export default ActivityCard;
