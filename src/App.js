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
        loggedInUserName: '',
        users: [],
        userId: null
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

      const users = this.state.users.slice()
      users.push(loginJson.data)

      this.setState({
        loggedIn: true,
        loggedInUserName: loginJson.data.email,
        userId: loginJson.data.id,
        users: users

      })
      console.log("users in login");
      console.log(this.state.users);

      console.log("this.state.userId in login");
      console.log(this.state.userId);
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

deleteUserAccount = async () => {
  const url = process.env.REACT_APP_API_URL + "/api/v1/users/" + this.state.userId

  try {
    const deleteUserResponse = await fetch(url, {
      credentials: 'include',
      method: 'DELETE'

    })

    console.log("deleteUserResponse");
    console.log(deleteUserResponse);

    const deletedUserJson = await deleteUserResponse.json()

    console.log("deletedUserJson");
    console.log(deletedUserJson);
    console.log("userId");
    console.log(this.state.userId)

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
    console.log("this.state.users");
    console.log(this.state.users)
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
