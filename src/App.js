import React, { Component } from 'react';
import './App.css';
import PlantContainer from './PlantContainer'
import LoginSignupForm from './LoginSignupForm'
import UserContainer from './UserContainer'
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
    console.log("loginJson");
    console.log(loginJson);
    
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

logout = async () => {
  try {
    const url = process.env.REACT_APP_API_URL + "/api/v1/users/logout"

    const logoutUserResponse = await fetch(url, {
      credentials: 'include'
    })

    // const logoutJson = await logoutUserResponse.json()

    if (logoutUserResponse.status === 200) {
      this.setState({
        loggedIn: false,
        loggedInUserName: ''
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
              onClick={this.logout}
              name="Log out"
              />
            <Menu.Item
            />
        </Menu>

      </Segment>
      {
        this.state.loggedIn
        ?
        <React.Fragment>

        <PlantContainer />
        <UserContainer />
        </React.Fragment>
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
