import React from 'react';
import { Box, Button, Paper, Typography, Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ActivityCard from '../components/ActivityCard';

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
      inputLocation: '',
      message: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // fetch('http://localhost:5000/api/v1/activities')
    //   .then((res) => res.json())
    //   .then((activities) => this.setState({ activities }))
    //   .catch((err) => console.log(err));

    fetch('http://localhost:5000/api/v1/categories')
      .then((res) => res.json())
      .then((categories) => this.setState({ categories }))
      .catch((err) => console.log(err));

    fetch('http://localhost:5000/api/v1/activities/locations')
      .then((res) => res.json())
      .then((locations) => this.setState({ locations }))
      .catch((err) => console.log(err));
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let searchKey = '';

    if (
      this.state.inputCategory.length === 0 &&
      this.state.inputLocation !== ''
    ) {
      searchKey = `?address.city=${this.state.inputLocation}`;
      this.setState({ message: `${this.state.inputLocation}` });
    } else if (
      this.state.inputCategory.length !== 0 &&
      this.state.inputLocation === ''
    ) {
      searchKey = `?typeOfActivity=${this.state.inputCategory._id}`;
      this.setState({ message: `${this.state.inputCategory.name}` });
    } else if (
      this.state.inputCategory.length !== 0 &&
      this.state.inputLocation !== ''
    ) {
      searchKey = `?typeOfActivity=${this.state.inputCategory._id}&address.city=${this.state.inputLocation}`;
      this.setState({
        message: `${this.state.inputCategory.name} in ${this.state.inputLocation}`,
      });
    }

    if (searchKey !== '') {
      fetch(`http://localhost:5000/api/v1/activities${searchKey}`)
        .then((res) => res.json())
        .then((activities) => this.setState({ activities }))
        .catch((err) => console.log(err));

      this.setState({ inputLocation: '' });
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
      <Box>
        <div>
          <Paper
            style={{
              height: '85px',
              width: '800px',
              backgroundColor: '#FFFBF5',
            }}
          >
            <form id="Search" onSubmit={this.handleSubmit}>
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="center"
                alignItems="center"
                mt={8}
                mb={5}
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Box style={{ width: 300 }}>
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
                            backgroundColor: '#FFFFFF',
                          }}
                          {...params}
                          label="Search Activity"
                          margin="normal"
                          variant="outlined"
                        />
                      )}
                    />
                  </Box>
                  <Box style={{ width: 300 }}>
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
                            backgroundColor: '#FFFFFF',
                          }}
                          {...params}
                          label="Select Location"
                          margin="normal"
                          variant="outlined"
                          InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                      )}
                    />
                  </Box>
                </Box>
                <Box ml={1} mt={1}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: '#90E2D8',
                      color: '#272C34',
                      height: '54px',
                      width: '150px',
                    }}
                    type="submit"
                  >
                    Search
                  </Button>
                </Box>
              </Box>
            </form>
          </Paper>
        </div>
        {this.state.activities.length > 0 && (
          <div>
            <Box m={2}>
              <Paper
                style={{
                  padding: '10px',
                  backgroundColor: '#FFFBF5',
                  maxWidth: '1400px',
                }}
              >
                <Box m={3}>
                  <Typography variant="h4" component="h4" gutterBottom>
                    {`Results for ${this.state.message}`}
                  </Typography>
                </Box>

                <Box m={2}>
                  <Divider />
                </Box>

                <Box m={2}>
                  <ActivityCard activities={this.state.activities} />
                </Box>
              </Paper>
            </Box>
          </div>
        )}
      </Box>
    );
  }
}
