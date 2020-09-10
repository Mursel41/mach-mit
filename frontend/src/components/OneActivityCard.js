import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import soccerImage from '../images/soccer.png';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function OneActivityCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia>
            <img src={soccerImage} width="100%"/>
        </CardMedia>
        <CardContent>

        <Typography gutterBottom color="secondary" variant="subtitle2">
            SOCCER
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Football for boys
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Box>21.Sep, 2020</Box>
            <Box>7/12 Paticipaters</Box>
          </Typography>
          <Typography variant="body2" color="textPrimary" textAlign="right">
            <Box textAlign="right">Leipzig</Box>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


export default OneActivityCard;