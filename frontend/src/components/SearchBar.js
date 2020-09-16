import React from "react";

import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { Box, Button, ButtonGroup } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    border: "1px solid black",
    height: "40px",
    maxWidth: "600px",
    minWidth: "150px",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100ch",
      "&:focus": {
        width: "100ch",
      },
    },
  },
}));

export default function SearchBar() {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="row"
      justifyContent="center"
    >
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
      <Box alignItems="center">
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
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
