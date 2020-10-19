import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDateTimePicker } from 'formik-material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "formik-material-ui";
import MuiTextField from "@material-ui/core/TextField";
import { Formik, Form, Field } from "formik";
import FormikRadioGroup from "./radioGroupFormik";
import FormLabel from "@material-ui/core/FormLabel";
import { withRouter } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import swal from "sweetalert";

// Validation and style

let CreateActivitySchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Title is too short.")
    .max(20, "Title is too long.")
    .required("This field is required."),
  description: yup
    .string()
    .min(10, "Description is too short.")
    .max(256, "Description is too long.")
    .required("This field is required."),
  paid: yup
    .string()
    .required("This field is required."),
  price: yup
    .number()
    .integer(),
  address: yup.object().shape({
    city: yup
    .string()
    .required("Please select event location."),
    street: yup
    .string()
    .required("This field is required."),
    zip: yup
    .string()
    .required("This field is required."),
  }),  
  typeOfActivity: yup
    .string()
    .required("Please select type of activity."),
  typeOfAttendee: yup
    .string()
    .required("This field is required."),
  numberOfAttendee: yup
    .number()
    .positive()
    .integer()
    .required("This field is required."),
  startDate: yup
    .date().required("This field is required."),
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



const CreateActivity = (props) => {
  const classes = useStyles();
  const apiUrl = "http://localhost:5000/api/v1/categories";
  const apiUrlPost = "http://localhost:5000/api/v1/activities";
  const [categories, setCategories] = useState([]);


  useEffect(()=> {
    async function fetchData() {
    const result = await axios.get(`${apiUrl}`);
    setCategories(result.data);
    }
    fetchData();
  },[])

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
            price: 0,
            address: {
              city: "",
              street: "",
              zip: "",
            },
            typeOfActivity: "",
            typeOfAttendee: "",
            numberOfAttendee: "",
            startDate: new Date(),
          }}
          validationSchema={CreateActivitySchema}
          onSubmit={(values, { setSubmitting }) => {
             axios
              .post(`${apiUrlPost}`, JSON.stringify(values), {
                headers: {
                  "Content-Type": "application/json",
                  "x-auth-token": props.auth,
                },
              })
              .then((res) => {
                console.log(res.data);
                if (res.status === 201) {
                  swal("Success!", "Created event successfully", "success").then(() => {   
                    props.history.push('/');
                  })
                } else if (res.status === 500) {
                  swal("Error!", res.statusMessage, "error");
                }
              })
              .catch((error) => {
                console.log(error.response);
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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <MuiTextField
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
                  <MuiTextField
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
                    onChange={handleChange}
                    value={values.paid}
                    id="paid"
                    options={["Yes", "No"]}
                    component={FormikRadioGroup}
                  />
                  {values.paid === "Yes" ? 
                  <MuiTextField
                  error={errors.price && touched.price}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={values.price}
                  InputProps={{
                    inputProps: { 
                        max: 5000, min: 0 
                    }
                }}
                  name="price"
                  label="Amount in €"
                  type="number"
                  id="price"
                  helperText={
                    errors.price && touched.price
                      ? errors.price
                      : null
                  }
                  />
                  : null}
                </Grid>
                <Grid item xs={12}>
                <Divider />
                </Grid>
                <Grid item xs={12}>
                <MuiTextField
                    error={errors.city && touched.city}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    value={values.address.city}
                    id="city"
                    label="City"
                    name="address.city"
                    autoComplete="city"
                    helperText={
                      errors.city && touched.city ? errors.city : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                <MuiTextField
                    error={errors.street && touched.street}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    value={values.address.street}
                    id="street"
                    label="Street"
                    name="address.street"
                    autoComplete="street"
                    helperText={
                      errors.street && touched.street ? errors.street : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                <MuiTextField
                    error={errors.zip && touched.zip}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    value={values.address.zip}
                    id="zip"
                    label="Zip"
                    name="address.zip"
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
                component={TextField}
                type="text"
                name="typeOfActivity"
                onChange={handleChange}
                label="Type of activity"
                value={values.typeOfActivity}
                select
                fullWidth
                variant="outlined"
                InputLabelProps={{
                shrink: true,
              }}
            >
              {categories.map((option) => (
                <MenuItem key={option._id} value={option._id || ''}>
                  {option.name}
                </MenuItem>
              ))}
            </Field>
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="center"
                >
                  <Field
                    name="typeOfAttendee"
                    value={values.typeOfAttendee}
                    onChange={handleChange}
                    id="typeOfAttendee"
                    options={["Man only", "Woman only", "Mixed only", "Any"]}
                    component={FormikRadioGroup}
                  />
                </Grid>
                <Grid item xs={12}>
                <MuiTextField
                  error={errors.numberOfAttendee && touched.numberOfAttendee}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={values.numberOfAttendee}
                  InputProps={{
                    inputProps: { 
                        max: 50, min: 1 
                    }
                }}
                  name="numberOfAttendee"
                  label="Number of attendee"
                  type="number"
                  id="numberOfAttendee"
                  helperText={
                    errors.numberOfAttendee && touched.numberOfAttendee
                      ? errors.numberOfAttendee
                      : null
                  }
                  />
                </Grid>
                <Grid item xs={12}>
                <Divider /> 
                </Grid>
                <Grid item xs={12}>
                <Field
                component={KeyboardDateTimePicker}
                fullWidth
                name="startDate"
                ampm={false}
                disablePast={true}
                label="Date and time"
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
                Add
              </Button>
            </Form>
            </MuiPickersUtilsProvider>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default withRouter(CreateActivity);
