import React, { Component } from 'react';
import './App.css';
import PlantContainer from './PlantContainer'
import LoginSignupForm from './LoginSignupForm'
import { Menu, Segment } from 'semantic-ui-react'

export default class App extends Component {
  constructor(props){
    super(props)

      this.state = {
        loggedIn: false,
        loggedInUserName: ''
    }
  }

signup = async (signupInfo) => {

  const url = process.env.REACT_APP_API_URL + "/api/v1/users/signup"

  try {
    const signupUserResponse = await fetch(url, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(signupInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const signupJson = await signupUserResponse.json()

    if (signupUserResponse.status === 201) {
      this.setState({
        loggedIn: true,
        loggedInUserName: signupJson.data.username
      })
    }
  }
  catch (err) {
    console.error(err);
  }

}

login = async (loginInfo) => {
  const url = process.env.REACT_APP_API_URL + "/api/v1/users/login"

  try {
    const loginUserResponse = await fetch(url, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const loginJson = await loginUserResponse.json()
    if (loginUserResponse.status === 200) {
      this.setState({
        loggedIn: true,
        loggedInUserName: loginJson.data.email

      })
    }
  }
  catch (err) {
    console.error(err);
  }
}

  render() {
    return (
      <React.Fragment>
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            name="Add new plant"
            />
        </Menu>

      </Segment>
      {
        this.state.loggedIn
        ?
        <PlantContainer />
        :
        <LoginSignupForm
        login={this.login}
        signup={this.signup}
        />
      }

      </React.Fragment>
    );

  }
}















//
