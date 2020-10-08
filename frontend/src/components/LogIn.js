import React, { useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
import {
  Avatar,
  Paper,
  Button,
  CssBaseline,
  TextField,
  Link,
  Typography,
  Grid,
  Container,
  makeStyles,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const { handleLogin, hasLoginError, isLoggedIn } = props;
  const classes = useStyles();

  const [inputs, setInputs] = useState({ email: "", password: "" });
  const handleInputsChange = (evt) =>
    setInputs({ ...inputs, [evt.target.name]: evt.target.value });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(inputs);
  };

  return (
    <React.Fragment>
      {isLoggedIn ? (
        <Redirect to="/" />
      ) : (
        <Container component="main" maxWidth="xs">
          <Paper
            style={{
              padding: "20px",
              paddingBottom: "60px",
              backgroundColor: "rgba(238,250,255, 0.6)",
              marginBottom: "160px",
              marginTop: "160px",
            }}
          >
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={inputs.email}
                  onChange={handleInputsChange}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  value={inputs.password}
                  onChange={handleInputsChange}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {hasLoginError && (
                  <Typography>
                    Email or password is wrong. Please try again...
                  </Typography>
                )}
                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Login
                </Button>
                <Grid container>
                  {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                  <Grid item>
                    <Link to="/signup" variant="body2" component={NavLink}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Paper>
        </Container>
      )}
    </React.Fragment>
  );
}
