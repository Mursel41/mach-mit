import React from "react";
import { Button, Box} from "@material-ui/core";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        background: "#2C2C2C",
        width: "30%",
    },
  });


function Homepage() {

    const classes = useStyles();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

  return (
    <div width="100%">
      <Box
        color="secondary.main"
        bgcolor="#2C2C2C"
        mt={6}
      > 
            <Box display="flex" flexDirection="row" justifyContent="center">
                    <Box mt={3}>
                        <Button variant="contained" color="secondary" size="large">
                        Join us
                        </Button>
                    </Box>
            </Box> 

            <Box display="flex" flexDirection="row" justifyContent="center" my={3} >
                <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                <BottomNavigationAction label="Info" value="info" icon={<InfoOutlinedIcon fontSize="large" style={{ backgroundColor: "#272C34", color: "#90E2D8" }} />}  />
                <BottomNavigationAction label="Email" value="email" icon={<MailOutlineOutlinedIcon fontSize="large" style={{ backgroundColor: "#272C34", color: "#90E2D8"  }}/>} />
                <BottomNavigationAction label="Help" value="help" icon={<HelpOutlineOutlinedIcon fontSize="large" style={{ backgroundColor: "#272C34", color: "#90E2D8"  }}/>} />
                </BottomNavigation>

            </Box>
                
            <Box display="flex" flexDirection="row" justifyContent="center" pb={3} color="#b0bec5">
            MachMit © 2020  
            </Box>
      </Box>

      
    </div>
  );
}
export default Homepage;