import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Autocomplete } from "formik-material-ui-lab";
import { Select } from "formik-material-ui";
import MuiTextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Formik, Form, Field } from "formik";
import FormikRadioGroup from "./radioGroupFormik";
import FormLabel from "@material-ui/core/FormLabel";
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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icon: {
    color: theme.palette.secondary.main,
  },
}));

const activities = [
  { name: "Football" },
  { name: "Volleyball" },
  { name: "Basketball" },
  { name: "Tennis" },
  { name: "Bowling" },
  { name: "Cricket" },
];

const ranges = [
  {
    value: 'none',
    label: 'None',
  },
  {
    value: '0-20',
    label: '0 to 20',
  },
  {
    value: '21-50',
    label: '21 to 50',
  },
  {
    value: '51-100',
    label: '51 to 100',
  },
];

const Signup = (props) => {
  const classes = useStyles();
  const apiUrl = "http://localhost:5000/api/v1/users/signup";
  const [emailError, setEmailError] = useState("");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography 
            variant="h4"
            component="h4"
            color="secondary"
            gutterBottom>
          Create Your Activity
        </Typography>

        <Formik
          initialValues={{
            title: "",
            description: "",
            paid: "",
            paidamount: "",
            gender: "",
            street: "",
            city: "",
            zip: "",
            typeofactivity: [],
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, {setSubmitting}) => {
            alert(JSON.stringify(values, null, 2));
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
                <Grid item xs={12}>
                  <TextField
                    error={errors.title && touched.title}
                    autoComplete="title"
                    name="title"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    value={values.title}
                    id="title"
                    label="Title"
                    autoFocus
                    helperText={
                      errors.title && touched.title
                        ? errors.title
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.description && touched.description}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    value={values.description}
                    id="description"
                    label="Description"
                    multiline
                    rows={4}
                    name="description"
                    autoComplete="desc"
                    helperText={
                      errors.description && touched.description
                        ? errors.description
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
                  <FormLabel component="legend">Paid?</FormLabel>
                  <Field
                    name="paid"
                    value={values.paid}
                    id="paid"
                    options={["Yes", "No"]}
                    component={FormikRadioGroup}
                  />
                  {values.paid === "Yes" ? 
                  <TextField
                  error={errors.paidamount && touched.paidamount}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={values.paidamount}
                  InputProps={{
                    inputProps: { 
                        max: 100, min: 1 
                    }
                }}
                  name="paidamount"
                  label="Amount in €"
                  type="number"
                  id="paidamount"
                  helperText={
                    errors.paidamount && touched.paidamount
                      ? errors.paidamount
                      : null
                  }
                  />
                  : null}
                </Grid>
                <Grid item xs={12}>
                <Divider />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    error={errors.city && touched.city}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    value={values.city}
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="city"
                    helperText={
                      errors.city && touched.city ? errors.city : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    error={errors.street && touched.street}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    value={values.street}
                    id="street"
                    label="Street"
                    name="street"
                    autoComplete="street"
                    helperText={
                      errors.street && touched.street ? errors.street : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    error={errors.zip && touched.zip}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    value={values.zip}
                    id="zip"
                    label="Zip"
                    name="zip"
                    autoComplete="zip"
                    helperText={
                      errors.zip && touched.zip ? errors.zip : null
                    }
                  /> 
                </Grid>
                <Grid item xs={12}>
                <Divider /> 
                </Grid>
                <Grid item xs={12}>
                <Field
                    name="typeofactivity"
                    component={Autocomplete}
                    options={activities.map(option => option.name)}
                    fullWidth
                    renderInput={(params) => (
                      <MuiTextField
                        {...params}
                        error={touched["typeofactivity"] && !!errors["typeofactivity"]}
                        helperText={touched["typeofactivity"] && errors["typeofactivity"]}
                        label="Type of activity"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  
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
    </Container>
  );
};

export default withRouter(Signup);


/* (values, { setSubmitting }) => {
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
            props.history.push("/dashboard");
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
*/



/*<Field
                    name="interests"
                    multiple
                    component={Autocomplete}
                    options={activities}
                    getOptionLabel={(option) => option.name}
                    fullWidth
                    renderInput={(params) => (
                      <MuiTextField
                        {...params}
                        error={touched["interests"] && !!errors["interests"]}
                        helperText={touched["interests"] && errors["interests"]}
                        label="Your interests"
                        variant="outlined"
                      />
                    )}
                  />
                  */