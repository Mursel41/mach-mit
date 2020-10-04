import React from "react";
import { Button, Box, Container, Paper } from "@material-ui/core";
import logo from "../images/Logo.png";
import { NavLink, withRouter } from "react-router-dom";

function Header(props) {
  const { isLoggedIn, setIsLoggedIn, setAuth } = props;

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuth(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    props.history.push("/");
  };

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
              <NavLink to="" onClick={handleLogout}>
                <Button href="#text-buttons" color="default" size="large">
                  Log out
                </Button>
              </NavLink>
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
