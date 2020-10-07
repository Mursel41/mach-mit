import React from "react";
import { Button, Box, Paper } from "@material-ui/core";
import logo from "../images/Logo.png";
import { NavLink, withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundColor: theme.palette.secondary.main,
  },
}));

function Header(props) {
  const { isLoggedIn, setIsLoggedIn, setAuth, user } = props;

  console.log(props)

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuth(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    props.history.push("/");
  };
  const classes = useStyles();

  return (
    <Box>
      <Paper
        style={{
          height: "130px",
          maxWidth: "1200px",
          minWidth: "1000px",
          backgroundColor: "#FFFBF5",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mt={4}
          p={2}
        >
          <NavLink to="/">
            <Box ml={5}>
              <img src={logo} alt="Logo" width="120" />
            </Box>
          </NavLink>
          <Box mr={5} mt={2}>
            {isLoggedIn ? (
              <Box display="flex" flexDirection="row">
                <NavLink to="" onClick={handleLogout}>
                  <Button href="#text-buttons" color="default" size="large">
                    Log out
                  </Button>
                </NavLink>
                <Box  onClick={() => props.history.push(`/profile/${user._id}`)}>
                  <Avatar className={classes.avatar} />
                </Box>
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
      </Paper>
    </Box>
  );
}

export default withRouter(Header);
