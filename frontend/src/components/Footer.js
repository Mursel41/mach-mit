import React from "react";
import { Button, Box} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';



function Footer() {


  return (
    <Box bgcolor="#2C2C2C" color="white" mt={3}>

      <Box align="center" py={3}>
        <Link color="inherit" href="http://localhost:3000/">
        <Button variant="contained" color="secondary" size="large">
                Join us
        </Button>
        </Link>
      </Box>
      <Box pb={3} align="center">
      <Link color="inherit" href="http://localhost:3000/">Home</Link>
      &nbsp;|&nbsp;<Link color="inherit" href="mailto:info@localhost.com">e-mail</Link>
      &nbsp;|&nbsp; <Link color="inherit" href="http://localhost:3000/">FAQ</Link>
      </Box>
      <Box pb={3}>
      <Typography variant="body2"  align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        Mach mit!
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </Box>
  </Box>
  );
}
export default Footer;