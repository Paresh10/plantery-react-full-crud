import React, { Component } from 'react'
import '../index.css'
import { Form, Button, Label, Message } from 'semantic-ui-react'

export default class LoginSignupForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',

      // To keep track of user status
      action: 'Login'

    }
  }

  conditionalFormRendering = () => {
    if (this.state.action === 'Login') {
      this.setState({
        action: 'Signup'
      })
    }
    else {
      this.setState({
        action: 'Login'
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.state.action === 'Signup') {
      this.props.signup(this.state)
    }
    else {
      this.props.login(this.state)
    }

  }


  render() {

    return(
      <React.Fragment>
      <h3> {this.state.action} here! </h3>
             <Form onSubmit={this.handleSubmit}>
             {
               this.state.action === 'Signup'
               &&
               <React.Fragment>
                 <Label>Name:</Label>
                 <Form.Input
                 type="text"
                 name="name"
                 placeholder="Enter your name"
                 value={this.state.name}
                 onChange={this.handleChange}
               />
               <Label>Email:</Label>
               <Form.Input
                 type="email"
                 name="email"
                 placeholder="Enter your email"
                 value={this.state.email}
                 onChange={this.handleChange}
               />
               </React.Fragment>
             }
               <Label>Username:</Label>
               <Form.Input
                 type="text"
                 name="username"
                 placeholder="Enter a username"
                 value={this.state.username}
                 onChange={this.handleChange}
               />
               <Label>Password:</Label>
               <Form.Input
                 type="text"
                 name="password"
                 placeholder="Enter a password"
                 value={this.state.password}
                 onChange={this.handleChange}
               />
               <Button type="Submit">Log In</Button>
             </Form>
             {
               this.state.action === 'Login'
               ?
               <p>
               Need an account? Sign up <span className="link" onClick={this.conditionalFormRendering}>here</span>
               </p>
               :
               <p>
               Already have an account? Log in <span className="link" onClick={this.conditionalFormRendering}>here</span>
               </p>
             }
           </React.Fragment>
    )
  }
}
