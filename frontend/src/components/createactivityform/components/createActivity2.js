import React, { useState, useEffect } from 'react'
import { Container, Box, Typography, Divider, Grid, TextField, Button, Link, FormControlLabel, makeStyles,
Radio, RadioGroup, FormControl, FormLabel, MenuItem, InputAdornment, Select, InputLabel } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";

import FormDatePicker from './components/Datepicker';
import FormRadio from './components/Radio';
import FormSelect from './components/Select';
import FormInput from './components/Input';

const validationSchema = yup.object().shape({
  title: yup.string().required("Name Validation Field is Required"),
  selV: yup.string().required("Select Validation Field is Required"),
  selAutoV: yup.array().required("Multi Select Validation Field required"),
  txtDateV: yup
  .date()
  .typeError("Mui Date field must be a date")
  .required("Mui Date field is required"),
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "25ch",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



export default function CreateActivity() {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, errors } = methods;

  
  const onSubmit = (data) => {
    console.log(data);
  };
  const paidData = [
    {
      id: "yes",
      label: "Yes",
    },
    {
      id: "no",
      label: "No",
    },
  ];
  

  const numberData = [
    {
      id: "yes",
      label: "Yes",
    },
    {
      id: "no",
      label: "No",
    },
  ];
  

return (
  <FormProvider {...methods}>
    <form onSubmit={handleSubmit(data => alert(JSON.stringify(data)))}>
      <Container maxWidth="md">
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
        <FormInput 
          name="title"
          label="Title"
          required={true}
          errorobj={errors}
          multiline
          rowsMax={4}
          variant="outlined"
        />
        <FormInput 
          name="description"
          label="Description"
          required={true}
          errorobj={errors}
          multiline
          rows={4}
          variant="outlined"
        />
      <Box mt={1} mb={2} ml={1}>
        <FormRadio
          name="paid"
          label="Paid?"
          options={paidData}
          color="secondary"
        />  
        <Box ml={-1}>
          <FormInput
            name="amount"
            label="Amount"
            required={true}
            errorobj={errors}
            variant="outlined"
          />
        </Box>
      </Box>
      </Box>
      <Divider variant="middle" />
      <Box m={4} ml={13}>
      <FormInput
            name="city"
            label="City"
            required={true}
            errorobj={errors}
            multiline
            variant="outlined"            
          />
          <FormInput
            name="street"
            label="Street"
            required={true}
            errorobj={errors}
            multiline
            variant="outlined"
          />
          <FormInput
            name="zip"
            label="Zip"
            required={true}
            errorobj={errors}
            multiline
            variant="outlined"
          />
      </Box>
      <Divider variant="middle" />
      <Box m={4} ml={13}>
      <div>
      <FormSelect 
        name="sel" 
        label="Numbers" 
        options={numberData}
        variant="outlined"
      />  

      <FormSelect 
        name="selV"
        label="Type of attendee"
        options={numberData}
        required={true}
        errorobj={errors}
        variant="outlined"
      />

      
    </div>
      </Box>
      <Divider variant="middle" />
      <Box m={4}>
      <Grid container justify="space-around">
      
      </Grid>
      </Box>
      <Box align="center" mb={10} mt={4}>
          <Link color="inherit" href="">
            <Button variant="contained" color="primary" size="large">
              Save
            </Button>
          </Link>
        </Box>
      </Container>
    </form>
    </FormProvider>
  )
}
  