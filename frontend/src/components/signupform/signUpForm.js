import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
  Avatar,
  FormLabel,
  Box,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Autocomplete } from "formik-material-ui-lab";
import MuiTextField from "@material-ui/core/TextField";
import { Formik, Form, Field } from "formik";
import FormikRadioGroup from "./radioGroupFormik";
import { withRouter } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import swal from "sweetalert";

// Validation and style

let SignupSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(30, "Name is too long.")
    .required("This field is required."),
  lastName: yup
    .string()
    .max(30, "Last name is too long.")
    .required("This field is required."),
  email: yup
    .string()
    .email("Email is invalid")
    .required("This field is required."),
  password: yup
    .string()
    .required("Please enter your password.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character."
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match.")
    .required("Confirm password is required."),
  age: yup.number().positive().integer().required("This field is required."),
  city: yup.string().required("This field is required."),
  gender: yup.string().required("Please select your gender."),
  interests: yup.string().required("Please select your interests."),
});

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icon: {
    color: theme.palette.secondary.main,
  },
}));

const Signup = (props) => {
  const classes = useStyles();
  const apiUrl = "http://localhost:5000/api/v1/users/signup";
  const [emailError, setEmailError] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios.get(`http://localhost:5000/api/v1/categories`);
      setCategories(result.data);
    })();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box minHeight="80vh">
        <Paper
          style={{
            padding: "10px 20px 10px 20px",
            backgroundColor: "rgba(238,250,255, 0.6)",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                gender: "",
                age: "",
                city: "",
                interests: [],
              }}
              validationSchema={SignupSchema}
              onSubmit={(values, { setSubmitting }) => {
                axios
                  .post(`${apiUrl}`, JSON.stringify(values), {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                  .then((res) => {
                    if (res.status === 201) {
                      swal("Success!", "Register successfully", "success").then(
                        () => {
                          const token = res.headers["x-auth-token"];
                          props.setIsLoggedIn(true);
                          props.setUser(res.data);
                          localStorage.setItem(
                            "user",
                            JSON.stringify(res.data)
                          );
                          props.setAuth(token);
                          localStorage.setItem("token", JSON.stringify(token));
                          props.history.push("/");
                        }
                      );
                    } else if (res.status === 500) {
                      swal("Error!", res.statusMessage, "error");
                    }
                  })
                  .catch((error) => {
                    console.log(error.response);
                    setEmailError(error.response.data.error.message);
                  });
                setSubmitting(false);
              }}
            >
              {({
                errors,
                handleChange,
                touched,
                handleSubmit,
                values,
                isSubmitting,
              }) => (
                <Form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        error={errors.firstName && touched.firstName}
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        value={values.firstName}
                        id="firstName"
                        label="First Name*"
                        autoFocus
                        helperText={
                          errors.firstName && touched.firstName
                            ? errors.firstName
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        error={errors.lastName && touched.lastName}
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        value={values.lastName}
                        id="lastName"
                        label="Last Name*"
                        name="lastName"
                        autoComplete="lname"
                        helperText={
                          errors.lastName && touched.lastName
                            ? errors.lastName
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={
                          emailError !== "" || (errors.email && touched.email)
                        }
                        variant="outlined"
                        fullWidth
                        onFocus={() => {
                          setEmailError("");
                        }}
                        onChange={handleChange}
                        value={values.email}
                        id="email"
                        label="Email Address*"
                        name="email"
                        autoComplete="email"
                        helperText={
                          emailError
                            ? emailError
                            : errors.email && touched.email
                            ? errors.email
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={errors.password && touched.password}
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        label="Password*"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        helperText={
                          errors.password && touched.password
                            ? errors.password
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={
                          errors.confirmPassword && touched.confirmPassword
                        }
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        name="confirmPassword"
                        label="Confirm Password*"
                        type="password"
                        id="confirmPassword"
                        autoComplete="confirm-password"
                        helperText={
                          errors.confirmPassword && touched.confirmPassword
                            ? errors.confirmPassword
                            : null
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      container
                      direction="row"
                      justify="space-evenly"
                      alignItems="center"
                    >
                      <FormLabel component="legend">Gender</FormLabel>
                      <Field
                        name="gender"
                        value={values.gender}
                        id="gender"
                        options={["Male", "Female", "Other"]}
                        component={FormikRadioGroup}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={errors.age && touched.age}
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        value={values.age}
                        id="age"
                        label="Age*"
                        name="age"
                        autoComplete="age"
                        helperText={
                          errors.age && touched.age ? errors.age : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={errors.city && touched.city}
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        value={values.city}
                        id="city"
                        label="City*"
                        name="city"
                        autoComplete="city"
                        helperText={
                          errors.city && touched.city ? errors.city : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="interests"
                        multiple
                        component={Autocomplete}
                        options={categories}
                        getOptionLabel={(option) => option.name}
                        fullWidth
                        renderInput={(params) => (
                          <MuiTextField
                            {...params}
                            error={
                              touched["interests"] && !!errors["interests"]
                            }
                            helperText={
                              touched["interests"] && errors["interests"]
                            }
                            label="Your interests"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Paper>
      </Box>
    </Container>
  );
};

export default withRouter(Signup);
