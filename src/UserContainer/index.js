import React, { Component } from 'react'
import UserPlantsList from '../UserPlantsList'

export default class UserContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      allUserPlants: []
    }
  }
componentDidMount() {
  this.userPlants()
}

userPlants = async () => {
  const url = process.env.REACT_APP_API_URL + "/api/v1/users/myplants"
  console.log('url')
  console.log(url);

  const userPlantsResponse = await fetch(url, {
    credentials: 'include'
  })

    console.log('userPlantsResponse');
    console.log(userPlantsResponse);

  const userPlantsJson = await userPlantsResponse.json()
  console.log("userPlantsJson");
  console.log(userPlantsJson);

  this.setState({
    allUserPlants: userPlantsJson.data
  })
}

  render() {
    return (
      <React.Fragment>
      <h3> See My Plants </h3>
        <UserPlantsList
          allUserPlants={this.state.allUserPlants}
          />
      </React.Fragment>
    )
  }
  }
