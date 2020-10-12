import React from "react";
import { Button, Box, Grid, makeStyles } from "@material-ui/core";
import logo from "../images/Logo.png";
import { NavLink, withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuth(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    props.history.push("/");
  };
  const classes = useStyles();

  return (
    <Grid
      Container
      style={{
        height: "90px",
        backgroundColor: "#102e4a",
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <NavLink to="/">
          <Box ml={4}>
            <img src={logo} alt="Logo" width="90" />
          </Box>
        </NavLink>
        <Box mr={4}>
          {isLoggedIn ? (
            <Box display="flex" flexDirection="row" alignItems="center">
              <NavLink
                to=""
                onClick={handleLogout}
                style={{ textDecoration: "none" }}
              >
                <Button
                  href="#text-buttons"
                  style={{
                    color: "white",
                  }}
                  size="large"
                >
                  Log out
                </Button>
              </NavLink>
              <Box onClick={() => props.history.push(`/profile/${user._id}`)}>
                {user.image && (
                  <Avatar className={classes.avatar} src={user.image} />
                )}
              </Box>
            </Box>
          ) : (
            <React.Fragment>
              <NavLink to="/login" style={{ textDecoration: "none" }}>
                <Button
                  href="#text-buttons"
                  size="large"
                  style={{
                    color: "white",
                  }}
                >
                  Log in
                </Button>
              </NavLink>
              <NavLink to="/signup" style={{ textDecoration: "none" }}>
                <Button
                  href="#text-buttons"
                  size="large"
                  style={{
                    color: "white",
                  }}
                >
                  Sign up
                </Button>
              </NavLink>
            </React.Fragment>
          )}
        </Box>
      </Box>
    </Grid>
  );
}

export default withRouter(Header);
