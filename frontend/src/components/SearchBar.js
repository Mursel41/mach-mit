import React from "react";
import {
  Container,
  Button,
  Paper,
  Typography,
  Divider,
  Grid,
  Box,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ActivityCard from "../components/ActivityCard";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      categories: [],
      locations: [],
      //categories for search options
      inputCategory: [],
      //location for search options
      inputLocation: "",
      message: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // fetch('http://localhost:5000/api/v1/activities')
    //   .then((res) => res.json())
    //   .then((activities) => this.setState({ activities }))
    //   .catch((err) => console.log(err));

    fetch("http://localhost:5000/api/v1/categories")
      .then((res) => res.json())
      .then((categories) => this.setState({ categories }))
      .catch((err) => console.log(err));

    fetch("http://localhost:5000/api/v1/activities/locations")
      .then((res) => res.json())
      .then((locations) => this.setState({ locations }))
      .catch((err) => console.log(err));
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let searchKey = "";

    if (
      this.state.inputCategory.length === 0 &&
      this.state.inputLocation !== ""
    ) {
      searchKey = `?address.city=${this.state.inputLocation}`;
      this.setState({ message: `${this.state.inputLocation}` });
    } else if (
      this.state.inputCategory.length !== 0 &&
      this.state.inputLocation === ""
    ) {
      searchKey = `?typeOfActivity=${this.state.inputCategory._id}`;
      this.setState({ message: `${this.state.inputCategory.name}` });
    } else if (
      this.state.inputCategory.length !== 0 &&
      this.state.inputLocation !== ""
    ) {
      searchKey = `?typeOfActivity=${this.state.inputCategory._id}&address.city=${this.state.inputLocation}`;
      this.setState({
        message: `${this.state.inputCategory.name} in ${this.state.inputLocation}`,
      });
    }

    if (searchKey !== "") {
      fetch(`http://localhost:5000/api/v1/activities${searchKey}`)
        .then((res) => res.json())
        .then((activities) => this.setState({ activities }))
        .catch((err) => console.log(err));

      this.setState({ inputLocation: "" });
      this.setState({ inputCategory: [] });
    }
  }

  handleChangeCategory = (evt, val) => {
    this.setState({ inputCategory: val || [] });
  };

  handleChangeLocation = (evt, val) => {
    this.setState({ inputLocation: val });
  };

  render() {
    return (
      <Container>
        <Grid container justify="center" alignItems="center">
          <Paper
            style={{
              backgroundColor: "rgba(238,250,255, 0.5)",
              width: "100%",
              padding: "5px",
            }}
          >
            <form id="Search" onSubmit={this.handleSubmit}>
              <Grid container justify="center" alignItems="center" spacing={1}>
                <Grid item xs={12} sm={5}>
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={this.state.categories.map((option) => option)}
                    getOptionLabel={(option) => option.name}
                    value={this.state.inputCategory}
                    defaultValue={this.state.inputCategory}
                    onChange={this.handleChangeCategory}
                    renderInput={(params) => (
                      <TextField
                        style={{
                          backgroundColor: "#FFFFFF",
                        }}
                        {...params}
                        label="Search Activity"
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={this.state.locations.map((option) => option)}
                    getOptionLabel={(option) => option}
                    value={this.state.inputLocation}
                    defaultValue={this.state.inputLocation}
                    onChange={this.handleChangeLocation}
                    renderInput={(params) => (
                      <TextField
                        style={{
                          backgroundColor: "#FFFFFF",
                        }}
                        {...params}
                        label="Select Location"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: "search" }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    variant="contained"
                    fullWidth={true}
                    style={{
                      backgroundColor: "#90E2D8",
                      color: "rgb(16, 46, 74)",
                      height: "54px",
                      marginTop: "6px",
                      fontSize: ".9rem",
                    }}
                    type="submit"
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        <Paper
          style={{
            backgroundColor: "rgba(238,250,255, 0.5)",
            width: "100%",
            padding: "5px",
            marginTop: "10px",
          }}
        >
          {this.state.activities.length > 0 && (
            <Box>
              <Box>
                <Typography variant="h4" component="h4" gutterBottom>
                  {`Results for ${this.state.message}`}
                </Typography>

                <Divider />
              </Box>

              <Grid item justify="center">
                <ActivityCard activities={this.state.activities} />
              </Grid>
            </Box>
          )}
        </Paper>
      </Container>
    );
  }
}
