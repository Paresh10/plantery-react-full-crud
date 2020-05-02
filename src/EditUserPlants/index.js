import React, { Component } from 'react'
import { Form, Button, Label, Modal, Header } from 'semantic-ui-react'

export default class EditUserPlants extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      region: '',
      description: ''

    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.updatePlant(this.state)
  }

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
                  <Modal.Actions>
                    <Button type="Submit">Update</Button>
                  </Modal.Actions>
                </Form>
              </Modal.Content>
            </Modal>
    )
  }
}
