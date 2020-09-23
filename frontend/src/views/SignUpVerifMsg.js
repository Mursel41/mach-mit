import React from "react";
import { Button, Box} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LookforButton from "../components/LookforButton";
import CreatActivityButton from "../components/CreateActivityButton";



function SignUpVerMsg() {


  return (
    <Box m={4}>

      <Box m={4} align="center">
    
      <Typography variant="body2"  align="center">
      Thank you for registration....
      </Typography>

      <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          flexWrap="wrap"
          mt={2}
        >
          <Box><Link color="" href="/"><LookforButton/></Link></Box>
          <Box><Link color="" href="/createactivity"><CreatActivityButton/></Link></Box>
      </Box>
      
    </Box>
  </Box>
  );
}
export default SignUpVerMsg;