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
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

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
      firstSearch: false,
      isLoading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/v1/categories")
      .then((res) => res.json())
      .then((categories) => {
        let sortedCategories = (categories.sort(function (a,b) {
          let x = a.name;
          let y = b.name;
          return x < y ? -1 : x > y ? 1 : 0;
        }))
        this.setState({ categories: sortedCategories })
      })
      .catch((err) => console.log(err));

    fetch("http://localhost:5000/api/v1/activities/locations")
      .then((res) => res.json())
      .then((locations) => this.setState({ locations }))
      .catch((err) => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.city !== this.props.city) {
      this.setState({ inputLocation: this.props.city });
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let searchKey = "";
    this.setState({isLoading: true})

    if (
      this.state.inputCategory.length === 0 &&
      this.state.inputLocation !== ""
    ) {
      searchKey = `?address.city=${this.state.inputLocation}`;
      this.setState({ message: ` ${this.state.inputLocation}` });
    } else if (
      this.state.inputCategory.length !== 0 &&
      this.state.inputLocation === ""
    ) {
      searchKey = `?typeOfActivity=${this.state.inputCategory._id}`;
      this.setState({ message: ` ${this.state.inputCategory.name}` });
    } else if (
      this.state.inputCategory.length !== 0 &&
      this.state.inputLocation !== ""
    ) {
      searchKey = `?typeOfActivity=${this.state.inputCategory._id}&address.city=${this.state.inputLocation}`;
      this.setState({
        message: ` ${this.state.inputCategory.name} in ${this.state.inputLocation}`,
      });
    }

    if (searchKey !== "") {
      this.setState({ activities: [] });

      fetch(`http://localhost:5000/api/v1/activities${searchKey}`)
        .then((res) => res.json())
        .then((activities) => {
          this.setState({
            isLoading: false,
          });
          activities.sort(function (a, b) {
            let x = a.startDate;
            let y = b.startDate;
            return x < y ? -1 : x > y ? 1 : 0;
          });
          this.setState({
            isLoading: false,
            activities: activities.filter(
              (activity) =>
                new Date(activity.startDate).getTime() > new Date().getTime()
            ),
          });
        })
        .catch((err) => console.log(err));

      this.setState({ inputLocation: "" });
      this.setState({ inputCategory: [] });
      this.setState({ firstSearch: true });
    }
  }

  handleChangeCategory = (evt, val) => {
    this.setState({ inputCategory: val || [] });
  };

  handleChangeLocation = (evt, val) => {
    this.setState({ inputLocation: val });
  };


  useStyles = () => makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

  render() {




    const classes = this.useStyles();

    return (
      <Container component="main" maxWidth="lg">
        <Grid container justify="center" alignItems="center">
          <Paper
            style={{
              backgroundColor: "#F5F5F5",
              width: "100%",
              padding: "10px",
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
                        {...params}
                        label="Search Activity"
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
                        {...params}
                        label="Select Location"
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
                      color: "#102E4A",
                      height: "54px",
                      fontWeight: "500",
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
        {this.state.firstSearch && (
          <Paper
            style={{
              padding: "20px",
              backgroundColor: "rgba(238,250,255, 0.5)",
              marginBottom: "5px",
              marginTop: "60px",
            }}
          >
            <Box>
              <Box>
              {this.state.isLoading ?       
                        <div className={classes.root}>
                          <h2>Loading...</h2>
                          <LinearProgress color="secondary" />
                        </div>
                        :
                <Typography variant="h5" component="h5" gutterBottom>
                  {this.state.activities.length > 0 ? (
                    <React.Fragment>
                      <Box letterSpacing={0.5} fontWeight="fontWeightBold">
                        Activities for {this.state.message}
                      </Box>
                    </React.Fragment>
                  ) : (
                    this.state.firstSearch && (
                      <Box letterSpacing={0.5} fontWeight="fontWeightBold">
                        Sorry, there are no activities for
                        {this.state.message}.
                      </Box>
                    )
                  )}
                </Typography>
                  } 
              </Box>
              <Box mb={1}>
                <Divider />
              </Box>
              <Grid item>
                <ActivityCard activities={this.state.activities} />
              </Grid>
            </Box>
          </Paper>
        )}
      </Container>
    );
  }
}
