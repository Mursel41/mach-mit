import React from 'react';
import { Button, Box } from '@material-ui/core';
import logo from '../images/Logo.png';
import { NavLink, withRouter } from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundColor: theme.palette.secondary.main,
  }
}));



function Header(props) {
  const { isLoggedIn, setIsLoggedIn, setAuth } = props;

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuth(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    props.history.push('/');
  };
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="row"
      // alignItems="center"
      justifyContent="space-between"
      mt={2}
      mr={3}
      ml={4}
    >
      <NavLink to="/">
        <Box>
          <img src={logo} alt="Logo" width="150" />
        </Box>
      </NavLink>
      <Box>
        {isLoggedIn ? (
          <Box display="flex" flexDirection="row">
            <NavLink to="" onClick={handleLogout}>
              <Button href="#text-buttons" color="default" size="large">
                Log out
              </Button>
            </NavLink> 
            <NavLink to="/profile">
              <Avatar className={classes.avatar}/>
            </NavLink>
          </Box>
        ) : (
          <React.Fragment>
            <NavLink to="/login">
              <Button href="#text-buttons" color="default" size="large">
                Log in
              </Button>
            </NavLink>
            <NavLink to="/signup">
              <Button href="#text-buttons" color="default" size="large">
                Sign up
              </Button>
            </NavLink>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}

export default withRouter(Header);
