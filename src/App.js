import React, { Component } from 'react';
import './App.css';
import PlantContainer from './PlantContainer'
import LoginSignupForm from './LoginSignupForm'
import UserContainer from './UserContainer'
import HeaderBar from './HeaderBar'
import { Menu, Segment, Message } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

export default class App extends Component {
  constructor(props){
    super(props)

      this.state = {
        loggedIn: false,
        loggedInUserName: '',
        users: [],
        userId: null,
        message: ''
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
        loggedInUserName: signupJson.data.username,
      })
    }
    let message = this.state.message
    message = `Hey ${this.state.loggedInUserName},`

    this.setState({
      message: message
    })

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

      const users = this.state.users.slice()
      users.push(loginJson.data)

      console.log("loggedInUserName before state");
      console.log(this.state.loggedInUserName);

      this.setState({
        loggedIn: true,
        loggedInUserName: loginJson.data.username,
        userId: loginJson.data.id,
        users: users
      })
      let message = this.state.message
      message = `Hey ${this.state.loggedInUserName},`

      this.setState({
        message: message
      })


    }
    else {
      this.setState({
        message: 'Username or password not valid'
      })
    }
    console.log("this.state,message");
    console.log(this.state.message);

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

deleteUserAccount = async () => {
  const url = process.env.REACT_APP_API_URL + "/api/v1/users/" + this.state.userId

  try {
    const deleteUserResponse = await fetch(url, {
      credentials: 'include',
      method: 'DELETE'

    })

    const deletedUserJson = await deleteUserResponse.json()

    if (deleteUserResponse.status === 200) {
      const users = this.state.users.filter(user => user.id !== this.state.userId)
      this.setState({
        loggedIn: false,
        users: users
      })

    }
  }
  catch (err) {
    console.error(err);
  }
}

  render() {
    return (
    <Router>

      <React.Fragment>
      <Segment inverted>
        <Menu inverted pointing secondary>

        {
          this.state.loggedIn
          &&
          <Menu.Item
            onClick={this.logout}
            name="Log out"
            />
        }

            <Menu.Item
            />
            <Menu.Item
            onClick={this.deleteUserAccount}
            name="DELETE USER"
            />

        </Menu>

      </Segment>
      {
        this.state.loggedIn
        ?
        <React.Fragment>
        <HeaderBar />
        <PlantContainer
        message={this.state.message}
        />
        <UserContainer />
        </React.Fragment>
        :
        <LoginSignupForm
        message={this.state.message}
        login={this.login}
        signup={this.signup}
        />
      }
      </React.Fragment>
    </Router>
    );

  }
}















//
