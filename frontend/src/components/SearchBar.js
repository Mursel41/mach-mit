import React from "react";

import { Box, Button, ButtonGroup } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function SearchBar() {
  return (
    <Box display="flex" flexDirection="row" justifyContent="center">
      <Box mr={1}>
        <ButtonGroup
          disableRipple
          variant="contained"
          color="primary"
          size="large"
        >
          <Button>Activity</Button>
          <Button color="default">Partner</Button>
        </ButtonGroup>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Box style={{ width: 400 }}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={activities.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Activity"
                margin="normal"
                variant="outlined"
              />
            )}
          />
        </Box>
        <Box style={{ width: 200 }}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={cities.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select City"
                margin="normal"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: "search" }}
              />
            )}
          />
        </Box>
      </Box>
      <Box ml={1}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#90E2D8", color: "#272C34" }}
          size="large"
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}

// .....
const cities = [
  { title: "Berlin" },
  { title: "Leipzig" },
  { title: "Dortmund" },
  { title: "Dresden" },
  { title: "Cologne" },
  { title: "Munich" },
  { title: "Stuttgart" },
  { title: "Düsseldorf" },
  { title: "Frankfurt" },
  { title: "Essen" },
  { title: "Bremen" },
  { title: "Hanover" },
  { title: "Bochum" },
  { title: "Wiesbaden" },
  { title: "Erfurt" },
];

const activities = [
  { title: "Swimming" },
  { title: "Volleyball" },
  { title: "Cinema" },
  { title: "Cooking" },
  { title: "Football" },
  { title: "Meeting" },
  { title: "Climbing" },
  { title: "Photo" },
  { title: "Chess" },
];
