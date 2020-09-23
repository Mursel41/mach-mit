import React from "react";
import "date-fns";
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

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function CreateActivity() {
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Container maxWidth="md">
      <form className={classes.root} noValidate autoComplete="off">
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
            id="outlined-multiline-flexible"
            label="Title"
            multiline
            rowsMax={4}
            value={value}
            onChange={handleChange}
            variant="outlined"
            required
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            defaultValue=""
            variant="outlined"
          />

          <RadioButtons />
        </Box>

        <Divider variant="middle" />

        <Box m={4} ml={13}>
          <TextField
            id="outlined-textarea"
            label="City"
            placeholder="Placeholder"
            multiline
            variant="outlined"
            required
          />
          <TextField
            id="outlined-textarea"
            label="Street"
            placeholder="Placeholder"
            multiline
            variant="outlined"
            required
          />
          <TextField
            id="outlined-textarea"
            label="Zip"
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
      </form>
    </Container>
  );
}
