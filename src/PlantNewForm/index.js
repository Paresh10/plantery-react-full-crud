import React, { Component } from 'react'
import { Form, Button, Label, Modal, Header, Icon } from 'semantic-ui-react'


export default class PlantNewForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      region: '',
      description: '',
      image: '',
      status: true
    }
  }

handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

handleSubmit = (event) => {
  event.preventDefault()

  this.props.addNewPlant({
    name: this.state.name,
    region: this.state.region,
    description: this.state.description,
    image: this.state.image
  })

  this.setState({
    name: '',
    region: '',
    description: '',
    image: ''
  })
}


openModal = () => {
  let state = this.props.getStatus
  state = true
  this.setState({
    status: true
  })
}

closeModal = () => {
  this.setState({
    status: false
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

      <Modal trigger={<Button>  Add New Plant! </Button>} closeIcon={true} onClose={this.closeModal}>
      <Header>
        <h3> Add New Plant! </h3>
      </Header>
      <Modal.Content>
      <Form onSubmit={this.handleSubmit}>
        <Label>Name:</Label>
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
          placeholder="Where does this plant originates from?"
          onChange={this.handleChange}
        />
        <Label>Description:</Label>
        <Form.Input
          type="text"
          name="description"
          value={this.state.description}
          placeholder="Tell us about this plant"
          onChange={this.handleChange}
        />
        <Form.Input
          type="file"
          name="image"
          placeholder="Upload Image"
          onChange={this.uploadImage}
        />

        <Modal.Actions>
        <Button basic color='teal' type="Submit">Add New Plant</Button>
        </Modal.Actions>
      </Form>
      </Modal.Content>
    </Modal>

    )
  }

}
