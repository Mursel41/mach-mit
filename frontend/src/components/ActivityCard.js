import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

class ActivityCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: [
        {
          ID: 1,
          activityType: "Soccer",
          activityName: "Football for boys",
          activityDate: "21.Sep.2020",
          totalParticipant: 12,
          actualParticipant: 7,
          location: "Leipzig",
          img:
            "https://image.freepik.com/free-vector/soccer-concept-illustration_114360-2051.jpg",
          price: "Free",
        },

        {
          ID: 4,
          activityType: "Photo",
          activityName: "Photo at Denkmal",
          activityDate: "27.Sep.2020",
          totalParticipant: 15,
          actualParticipant: 5,
          location: "Markleberg",
          img:
            "https://image.freepik.com/free-vector/minimalist-illustration-photographer-working_23-2148280985.jpg",
          price: "€30",
        },

        {
          ID: 3,
          activityType: "Bike",
          activityName: "Ready for Bike Tour?",
          activityDate: "28.Sep.2020",
          totalParticipant: 30,
          actualParticipant: 22,
          location: "Grunau",
          img:
            "https://image.freepik.com/free-vector/flat-delivery-boy-bike-background_23-2148158147.jpg",
          price: "Free",
        },
        {
          ID: 5,
          activityType: "Photo",
          activityName: "Photo at Denkmal",
          activityDate: "27.Sep.2020",
          totalParticipant: 15,
          actualParticipant: 5,
          location: "Markleberg",
          img:
            "https://image.freepik.com/free-vector/minimalist-illustration-photographer-working_23-2148280985.jpg",
          price: "€30",
        },
        {
          ID: 2,
          activityType: "Chess",
          activityName: "Come & play chess",
          activityDate: "24.Sep.2020",
          totalParticipant: 2,
          actualParticipant: 1,
          location: "Connewitz",
          img:
            "https://image.freepik.com/free-vector/cartoon-character-playing-chess-game_29937-4045.jpg",
          price: "€20",
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          flexWrap="wrap"
          mt={2}
        >
          {this.state.dummy.map((card) => {
            return (
              <Box m={0.5} key={card.ID} width={250} p={0.1} mx={0.5} mb={0.5}>
                <Card>
                  <Box height={400}>
                    <CardActionArea>
                      <CardMedia color="secondary.main">
                        <img
                          src={card.img}
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
                          {card.activityType}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                          {card.activityName}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          <Box>{card.activityDate}</Box>
                          <Box>
                            {card.actualParticipant}/{card.totalParticipant}{" "}
                            Paticipaters
                          </Box>
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
                              {card.price}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2">
                              {card.location}
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
