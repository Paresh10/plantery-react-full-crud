import React, { Component } from 'react'
import { Form, Button, Label, Modal, Header, Icon } from 'semantic-ui-react'


export default class PlantNewForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      region: '',
      description: '',
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

  this.props.addNewPlant(this.state)

  this.setState({
    name: '',
    region: '',
    description: ''
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

  render() {
    console.log("this.state.status");
    console.log(this.state.status);
    console.log("closeModal");
    console.log(this.closeModal);
    console.log("this.open openModal");
    console.log(this.openModal);

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
        <Modal.Actions>
        <Button basic color='teal' type="Submit">Add New Plant</Button>
        </Modal.Actions>
      </Form>
      </Modal.Content>
    </Modal>

    )
  }

}
