import React from "react";
import { Radio, Box, TextField, InputAdornment, Fab } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export default function RadioButtons() {
  const [value, setValue] = React.useState("Free");

  const handleChangeRadios = (event) => {
    setValue(event.target.value);
  };

  const [values, setValues] = React.useState({
    amount: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <FormControl component="fieldset">
      <Box mt={1} mb={2} ml={1}>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          value={value}
          onChange={handleChangeRadios}
        >
          <FormControlLabel
            value="Free"
            control={<Radio color="secondary" />}
            label="Free"
          />
          <FormControlLabel
            value="Paid"
            control={<Radio color="secondary" />}
            label="Paid"
          />
        </RadioGroup>

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
    </FormControl>
  );
}
