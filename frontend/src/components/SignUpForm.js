import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const gender = [
    {
      value: 'Male',
      label: 'Male',
    },
    {
      value: 'Female',
      label: 'Female',
    },
    {
      value: 'Other',
      label: 'Other',
    },
  ];

    
  export default function SignUp() {
  const classes = useStyles();

  const signUpSchema = yup.object().shape({
    firstName: yup.string().required('This field is required.'), 
    lastName: yup.string().required('This field is required.'), 
    email: yup.string().email().required('This field is required.'), 
    password: yup.string()
        .min(6, 'Password is too short.')
        .max(30, 'Password is too long.')
        .required('This field is required.'),
    gender: yup.mixed().required('This field is required.'),
    age: yup.number().positive().integer().required('This field is required.'),
    city: yup.string().required('This field is required.')     
});
  

const [currency, setGender] = React.useState('Gender');
const handleGender = (event) => {
  setGender(event.target.value);
};

return (
    <Container component="main" maxWidth="xs">
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
            city: ""
          }}
          validationSchema={signUpSchema}
          onSubmit={values => {
            console.log(values);
          }}>
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.firstName && touched.firstName}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="firstName"
                    label="First Name"
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
                    id="lastName"
                    label="Last Name"
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
                    error={errors.email && touched.email}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    helperText={
                      errors.email && touched.email ? errors.email : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.password && touched.password}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="password"
                    label="Password"
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
                    id="outlined-select-gender"
                    select
                    fullWidth
                    required
                    label="Gender"
                    value={currency}
                    onChange={handleGender}
                    variant="outlined"
                  >
                    {gender.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.age && touched.age}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="age"
                    label="Age"
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
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="city"
                    helperText={
                      errors.city && touched.city ? errors.city : null
                    }
                  />
                </Grid>     
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}




        