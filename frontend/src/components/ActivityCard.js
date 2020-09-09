import React from 'react';
import OneActivityCard from "./OneActivityCard"
import Box from '@material-ui/core/Box';

function ActivityCard() {


  return (
  <div>
      <Box display="flex" flexDirection="row" justifyContent="space-between" p={1} m={1}>
        <OneActivityCard/>
        <OneActivityCard/>
        <OneActivityCard/>
        <OneActivityCard/>
      </Box>
  </div>
  );
}


export default ActivityCard;