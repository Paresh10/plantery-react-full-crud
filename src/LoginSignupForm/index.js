import React, { Component } from 'react'
import '../index.css'
import { Form, Button, Label, Message, Segment, Grid, Header, Image } from 'semantic-ui-react'

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
//       
//textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'


  render() {

    return(
      <Grid inverted textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
         
        <Grid.Column style={{ maxWidth: 450}}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSE9QAnM-RsJuta8SNp___18t9xWTyJ9Q_QBjNpcpFJNFa2zKh4Wg5-iTG43mqmqa2YdYznun07&usqp=CAc' /> {this.state.action}!
           </Header>
       

             <Form onSubmit={this.handleSubmit}  inverted size='large'>

             <h4> {this.props.message} </h4>
             
              <Segment stacked>
             {
               this.state.action === 'Signup'
               &&
               <Form.Group widths='equal'>
                 <Form.Input
                 fluid label='Name'
                 type="text"
                 name="name"
                 placeholder="Your name"
                 value={this.state.name}
                 onChange={this.handleChange}
               />

               <Form.Input
                fluid label='Email'
                 type="email"
                 name="email"
                 placeholder="Enter your email"
                 value={this.state.email}
                 onChange={this.handleChange}
               />
               </Form.Group>
             }
             <Form.Group widths='equal'>
               <Form.Input
                fluid icon='user'
                iconPosition='left'
                fluid label='User Name'
                type="text"
                name="username"
                placeholder="Enter a username"
                value={this.state.username}
                onChange={this.handleChange}
               />

               <Form.Input
                fluid icon='lock'
                iconPosition='left'
                fluid label='Password'
                type="text"
                name="password"
                placeholder="Enter a password"
                value={this.state.password}
                onChange={this.handleChange}
               />
               </Form.Group>
               <Button color='teal'  fluid size='large' type="Submit">Let Me in!</Button>
               </Segment>
             </Form>

             {
               this.state.action === 'Login'
               ?
               <Message>
               Need an account? Sign up <span className="link" onClick={this.conditionalFormRendering}>here</span>
               </Message>
               :
               <Message>
               Already have an account? Log in <span className="link" onClick={this.conditionalFormRendering}>here</span>
               </Message>
             }
             </Grid.Column>
           </Grid>
    )
  }
}
