import React from "react";
import { Radio, Box, TextField, InputAdornment } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const RadioButtons = ({
  field,
  form: { touched, errors },
  name,
  options,
  ...props
}) => {
  const fieldName = name || field.name;
  const [value, setValue] = React.useState("Free");
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const [values, setValues] = React.useState({
    amount: "",
  });

  return (
    <React.Fragment>
      <Box mt={1} mb={2} ml={1}>
        <RadioGroup {...field} {...props} name={fieldName} row>
          {options.map((option) => (
            <FormControlLabel
              labelPlacement="start"
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>

        {touched[fieldName] && errors[fieldName] && (
          <React.Fragment>{errors[fieldName]}</React.Fragment>
        )}

        <Box ml={-1}>
          <TextField
            id="outlined-adornment-amount"
            value={values.amount}
            label="Amount"
            variant="outlined"
            onChange={handleChange("amount")}
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
            labelWidth={60}
            disabled={value === "Free"}
            required
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default RadioButtons;
