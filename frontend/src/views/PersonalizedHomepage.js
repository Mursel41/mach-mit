import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ActivityCard from "../components/ActivityCard";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";

import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function PersonalizedHomepage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box>
            {" "}
            <Header />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            {" "}
            <SearchBar />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            {" "}
            <ActivityCard />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <ActivityCard />{" "}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=3</Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=3</Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=12 sm=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
