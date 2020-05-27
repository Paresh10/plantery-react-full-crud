import React, { Component } from 'react'
import { Form, Button, Label, Modal, Header } from 'semantic-ui-react'

export default class EditUserPlants extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      region: '',
      description: '',
      image: ''

    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.updatePlant({
      name: this.state.name,
      region: this.state.region,
      description: this.state.description,
      image: this.state.image
    })
  }

 uploadImage = async image => {
  const files = image.target.files;
  const data = new FormData();

  data.append("file", files[0]);
  data.append("upload_preset", "paresh");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dy5lodsfm/image/upload",
    {
      method: "POST",
      body: data
    }
  );

  const file = await response.json();

  console.log("file.secure_url")
  console.log(file.secure_url);

  this.setState({
    image: file.secure_url
  });
};
 

  render() {
    return(
      <Modal open={true} closeIcon={true} onClose={this.props.closeModal}>
              <Header>
                <h3>New info</h3>
              </Header>
              <Modal.Content>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Input
                    type="text"
                    name="name"
                    value={this.state.name}
                    placeholder="Enter a name"
                    onChange={this.handleChange}
                  />
                  <Label>Region:</Label>
                  <Form.Input
                    type="text"
                    name="region"
                    value={this.state.region}
                    placeholder="Region"
                    onChange={this.handleChange}
                  />
                  <Label>Description:</Label>
                  <Form.Input
                    type="text"
                    name="description"
                    value={this.state.description}
                    placeholder="About..."
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    type="file"
                    name="image"
                    placeholder="Update Plant's image"
                    onChange={this.uploadImage}
                  />                  
                  <Modal.Actions>
                    <Button type="Submit">Update</Button>
                  </Modal.Actions>
                </Form>
              </Modal.Content>
            </Modal>
    )
  }
}
