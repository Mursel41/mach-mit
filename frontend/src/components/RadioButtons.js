import React from "react";
import { Radio, Box } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export default function RadioButtons() {
  return (
    <FormControl component="fieldset">
      <Box mt={1} mb={2} ml={1}>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top"
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
      </Box>
    </FormControl>
  );
}
