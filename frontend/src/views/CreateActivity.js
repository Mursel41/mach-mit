import React from "react";
import "date-fns";
import { Formik, Form, ErrorMessage, Field } from "formik";
import {
  TextField,
  makeStyles,
  Divider,
  Container,
  Box,
  Typography,
  Link,
  Button,
} from "@material-ui/core";
import PickDate from "../components/PickDate";
import SelectType from "../components/SelectType";
import RadioButtons from "../components/RadioButtons";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const SignupSchema = yup.object().shape({
  title: yup
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

export default function CreateActivity() {
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  return (
    <Container maxWidth="md">
      <Formik
        initialValues={{
          title: "",
          description: "",
          city: "",
          street: "",
          zip: "",
          typeOfActivity: "",
          typeOfAttendee: "",
          numberOfAttendee: "",
          date: "",
          time: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {(
          handleSubmit,
          isSubmitting,
          handleChange,
          values,
          touched,
          errors
        ) => (
          <Form className={classes.root} onSubmit={handleSubmit}>
            <Box mt={6} mb={2} ml={14}>
              <Typography
                variant="h4"
                component="h4"
                color="secondary"
                gutterBottom
              >
                CREATE YOUR ACTIVITY
              </Typography>
            </Box>

            <Box mb={4} mt={2} ml={13}>
              <TextField
                id="title"
                error={errors.title && touched.title}
                label="Title"
                name="title"
                multiline
                rowsMax={4}
                value={values.title}
                onChange={handleChange}
                variant="outlined"
              />
              <TextField
                id="description"
                label="Description"
                name="description"
                value={values.description}
                multiline
                rows={4}
                defaultValue=""
                variant="outlined"
              />
              <Field
                name="paid"
                value={values.paid}
                id="paid"
                options={["Free", "Paid"]}
                component={RadioButtons}
              />
            </Box>

            <Divider variant="middle" />

            <Box m={4} ml={13}>
              <TextField
                id="city"
                label="City"
                name="city"
                placeholder="Placeholder"
                multiline
                variant="outlined"
                required
              />
              <TextField
                id="city"
                label="Street"
                name="street"
                placeholder="Placeholder"
                multiline
                variant="outlined"
                required
              />
              <TextField
                id="zip"
                label="Zip"
                name="zip"
                placeholder="Placeholder"
                multiline
                variant="outlined"
                required
              />
            </Box>

            <Divider variant="middle" />

            <Box m={4} ml={13}>
              <SelectType />
            </Box>

            <Divider variant="middle" />

            <Box m={4}>
              <PickDate />
            </Box>

            <Box align="center" mb={10} mt={4}>
              <Link color="inherit" href="">
                <Button variant="contained" color="primary" size="large">
                  Save
                </Button>
              </Link>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
