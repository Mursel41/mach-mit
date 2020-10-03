import React from "react";
import { Button, Box, Container } from "@material-ui/core";
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
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        mt={4}
      >
        <NavLink to="/">
          <Box>
            <img src={logo} alt="Logo" width="150" />
          </Box>
        </NavLink>
        <Box mt={4}>
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
    </Container>
  );
}

export default withRouter(Header);
