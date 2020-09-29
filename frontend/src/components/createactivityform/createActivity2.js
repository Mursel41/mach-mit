import React, { useState, useEffect } from 'react'
import { Container, Box, Typography, Divider } from '@material-ui/core';
import { useForm, Form } from './components/useForm';
import Input from './components/Input';
import RadioGroup from '../createactivityform/components/RadioGroup';



const paidItems = [
  { id: 'yes', title: 'Yes' },
  { id: 'no', title: 'No' },
]

const initialFValues = {
  title: '',
  description: '',
  mobile: '',
  city: '',
  paid: 'no',
  departmentId: '',
  hireDate: new Date(),
  isPermanent: false,
}

export default function CreateActivity() {

  const validate = (fieldValues = values) => {
      let temp = { ...errors }
      if ('title' in fieldValues)
          temp.title = fieldValues.title ? "" : "This field is required."
      if ('description' in fieldValues)
          temp.description = fieldValues.description ? "" : "This field is required."
      if ('mobile' in fieldValues)
          temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
      if ('departmentId' in fieldValues)
          temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
      setErrors({
          ...temp
      })

      if (fieldValues == values)
          return Object.values(temp).every(x => x == "")
  }

  const {
      values,
      setValues,
      errors,
      setErrors,
      handleInputChange,
      resetForm
  } = useForm(initialFValues, true, validate);

  const handleSubmit = e => {
      e.preventDefault()
  }

  return (
    <Form onSubmit={handleSubmit}>
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
        <Input 
          name="title"
          label="Title"
          value={values.title}
          onChange={handleInputChange}
          error={errors.title}
          multiline
          rowsMax={4}
        />
        <Input 
          name="description"
          label="Description"
          value={values.description}
          onChange={handleInputChange}
          error={errors.description}
          multiline
          row={4}
        />
        <Box mt={1} mb={2} ml={1}>
        <RadioGroup
          name="paid"
          label="Paid?"
          value={values.paid}
          onChange={handleInputChange}
          items={paidItems}
        />
        <Input
          label="Amount"
          name="amount"
          value={values.amount}
          onChange={handleInputChange}
          labelWidth={60}
          required
        />      
        </Box>
      </Box>
      <Divider variant="middle" />
      <Box m={4} ml={13}>
      <Input 
         name="city"
         label="City"
         value={values.city}
         onChange={handleInputChange}
         error={errors.city}
         multiline
         placeholder="Placeholder"
      />   
      </Box>
      </Container>
    </Form>
  )
}
  