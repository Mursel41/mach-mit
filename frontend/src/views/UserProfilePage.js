import React, { useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import { Autocomplete } from "formik-material-ui-lab";
import MuiTextField from "@material-ui/core/TextField";
import { Formik, Form, Field } from "formik";
import FormikRadioGroup from "../components/signupform/radioGroupFormik";
import FormLabel from "@material-ui/core/FormLabel";
import { withRouter } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import swal from "sweetalert";

// Validation and style

let SignupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required()
    .max(30, "Name is too long."),
  lastName: yup
    .string()
    .required()
    .max(30, "Last name is too long."),
  email: yup
    .string()
    .required()
    .email("Email is invalid"),
  age: yup.number().required().positive().integer(),
  city: yup.string().required(),
  gender: yup.string().required(),
  interests: yup.string(),
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



const Profile = (props) => {

  const [user, setUser ]= useState(null);
  const [categories, setCategories]=useState([]);

  const classes = useStyles();

  const [emailError, setEmailError] = useState("");

  useEffect(()=>{
    
    async function fetchMyAPI() {
      
      const result1= await axios.get(`http://localhost:5000/api/v1/categories`,{headers: {'X-Auth-Token': props.auth}});
      setCategories(result1.data);
      
      const result2= await axios.get(`http://localhost:5000/api/v1/users/${props.match.params.id}`,{headers: {'X-Auth-Token': props.auth}});
      setUser(result2.data);
    }
      fetchMyAPI()
    },[props])

  useEffect(()=>{
    async function fetchMyAPI() {
   
    const newCategories = categories.filter((category)=> 
      {const index = user.interests.findIndex(interest=> category.name===interest.name)
       
        return index===-1
      }
      )

    setCategories(newCategories)
    }
    fetchMyAPI()
    
  },[user && user.interests])

  return (



<Container component="main" maxWidth="xs">


      <CssBaseline />
      <div className={classes.paper}>
       

        {/* see own profile page starts here */}
          
        
       {props.match.params.id===props.user._id && user &&<Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
            age: user.age,
            city: user.city,
            interests: user.interests,
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {

            console.log(values)
           
              fetch(`http://localhost:5000/api/v1/users/${props.user._id}`, {
                method:'PUT',
                headers: {
                  "Content-Type": "application/json",
                  'X-Auth-Token': props.auth
                },
                body:JSON.stringify(values),
              })
              .then((res) => {
                if (res.status === 200) {
                  swal("Success!", "Updated successfully", "success").then(
                    () => {
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
              <Grid item xs={12}>
              <Avatar className={classes.avatar}>
              
              </Avatar>
              <Typography component="h1" variant="h5">
                Profile
              </Typography>
              </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.firstName && touched.firstName}
                    autoComplete="fname"
                    name="firstName"
                    fullWidth
                    onChange={handleChange}
                    value={values.firstName}
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
                    fullWidth
                    onChange={handleChange}
                    value={values.lastName}
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
                    error={emailError !== "" || (errors.email && touched.email)}
                    fullWidth
                    onFocus={() => {
                      setEmailError("");
                    }}
                    onChange={handleChange}
                    value={values.email}
                    id="email"
                    label="Email Address"
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
                    fullWidth
                    onChange={handleChange}
                    value={values.age}
                    id="age"
                    label="Age"
                    name="age"
                    autoComplete="age"
                    helperText={errors.age && touched.age ? errors.age : null}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.city && touched.city}
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
                        error={touched["interests"] && !!errors["interests"]}
                        helperText={touched["interests"] && errors["interests"]}
                        label="My interests"
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
                Update
              </Button>
            </Form>
          )}
        </Formik>
}

{/* see own profile page ends here */}

{/* see others profile page starts here */}

{props.match.params.id!==props.user._id && user && <Grid container spacing={1}>
              <Grid item xs={12}>
              <Avatar className={classes.avatar}>
              
              </Avatar>
              <Typography component="h1" variant="h5">
                Profile
              </Typography>
              </Grid>
                <Grid item xs={6}>
                <TextField
                  id="standard-read-only-input"
                  label="First Name"
                  defaultValue={user.firstName}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                  id="standard-read-only-input"
                  label="Last Name"
                  defaultValue={user.lastName}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                  id="standard-read-only-input"
                  label="Gender"
                  defaultValue={user.gender}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                  id="standard-read-only-input"
                  label="Age"
                  defaultValue={user.age}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  id="standard-read-only-input"
                  label="City"
                  fullWidth
                  defaultValue={user.city}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  id="standard-read-only-input"
                  label="Interests"
                  fullWidth
                  defaultValue={user.interests.map(interest => interest.name)}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                </Grid>
    </Grid>}

{/* see others profile page ends here */}        
      </div>
    </Container>
  );
};

export default withRouter(Profile);
