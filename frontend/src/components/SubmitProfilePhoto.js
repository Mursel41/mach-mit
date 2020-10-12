import React, { Component } from 'react'
import Avatar from "@material-ui/core/Avatar";
import axios, {post} from 'axios'
import {
  Button,
  Input,
  Box,
  Paper,
  Container,
  Grid,
} from "@material-ui/core";

export default class SubmitProfilePhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
          // Initially, no file is selected
          selectedFile: null,
          newPhoto: false,
          changeStatus: false,
          photoPath:""
        };
      }



  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };
  // On file upload (click the upload button)
  onFileUpload = () => {

    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append(
      "image",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    axios.post(`http://localhost:5000/api/v1/users/${this.props.id}/userImage`, formData)
        .then(response=> {if(response.status===200)this.setState({changeStatus:true})})
        .catch(error=>console.log(error));

    // window.location.reload();
    };

    componentDidMount() {
     this.setState({ photoPath: this.props.image})
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.changeStatus !== this.state.changeStatus) {
        axios.get(`http://localhost:5000/api/v1/users/${this.props.id}`,{
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": this.props.auth,
          },
        })
        .then(response=> this.setState({ photoPath: response.data.image}))
        .catch(error=>console.log(error));


      }
    }
    render() {

        return (

            <div>
               <Container fixed>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={6}>
                  {this.props.image &&<Avatar src={this.state.photoPath} style={{ width: 120, height: 120}}/>}
                  </Grid>
                
                {this.state.changeStatus===true ? <h4>Your profile photo is changed succesfully</h4> :
                <React.Fragment>
                  <Grid item xs={6}>
                   <Button onClick={()=>this.setState({newPhoto:true})} variant="contained" color="primary">
                   Change Photo
                   </Button>
                  </Grid>
                    {this.state.newPhoto &&
                    <React.Fragment>
                      <Grid item xs={12}>
                    <h4>Please Upload your new profile photo (max 1MB)</h4>
                    <Input type="file" onChange={this.onFileChange} color="primary"/>
                    
                    {this.state.selectedFile && 
                        <React.Fragment>
                            <div>
                              <h2>File Details:</h2>
                              <p>File Name: {this.state.selectedFile.name}</p>
                              <p>File Type: {this.state.selectedFile.type}</p>
                            </div>
                        
                        <Button onClick={this.onFileUpload} variant="contained" color="secondary">
                        Upload
                        </Button>
                        </React.Fragment>}
                    </Grid>
                    </React.Fragment>}
                </React.Fragment>}
            </Grid>
          </Container>
        </div>

        )
    }
}
