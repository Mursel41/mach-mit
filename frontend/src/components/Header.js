import React from "react";
import { Button, Box } from "@material-ui/core";
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
  );
}

export default withRouter(Header);
