import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "25ch",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectType() {
  const classes = useStyles();

  const [selectActivity, setSelectActivity] = React.useState("");
  const handleChangeActivity = (event) => {
    setSelectActivity(event.target.value);
  };

  const [selectAttendee, setSelectAttendee] = React.useState("");
  const handleChangeAttendee = (event) => {
    setSelectAttendee(event.target.value);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Type of activity
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="typeOfActivity"
          value={selectActivity}
          onChange={handleChangeActivity}
          label="Type of activity"
          name="typeOfActivity"
        >
          <MenuItem value>Footbal</MenuItem>
          <MenuItem value>Cinema</MenuItem>
          <MenuItem value>Reading</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Type of attendee
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="typeOfAttendee"
          value={selectAttendee}
          onChange={handleChangeAttendee}
          label="Type of attendee"
          name="typeOfAttendee"
        >
          <MenuItem value="">
            <em>Any</em>
          </MenuItem>
          <MenuItem value>Man only</MenuItem>
          <MenuItem value>Woman only</MenuItem>
          <MenuItem value>Mixed only</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <TextField
          id="numberOfAttendee"
          label="Number of attendee"
          name="numberOfAttendee"
          type="number"
          variant="outlined"
        />
      </FormControl>
    </div>
  );
}
