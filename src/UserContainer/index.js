import React, { Component } from 'react'
import UserPlantsList from '../UserPlantsList'
import EditUserPlants from '../EditUserPlants'

export default class UserContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      allUserPlants: [],
      idOfPlantToEdit: -1
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

deleteUserPlants = async (idOfPlantToDelete) => {
  const url = process.env.REACT_APP_API_URL + '/api/v1/plants/' + idOfPlantToDelete

  try {
    const deleteUserPlantsResponse = await fetch(url, {
      credentials: 'include',
      method: 'DELETE'
    })

    const deleteUserJson = await deleteUserPlantsResponse.json()

    if (deleteUserPlantsResponse.status === 200) {
      this.setState({
        allUserPlants: this.state.allUserPlants.filter(plant => plant.id !== idOfPlantToDelete)
      })
    }
  }
  catch (err) {
      console.error(err);
  }
}

editPlant = (idOfPlantToEdit) => {
  console.log("idOfPlantToEdit");
  console.log(idOfPlantToEdit);

  this.setState({
    idOfPlantToEdit: idOfPlantToEdit
  })

}

updatePlant = async (updatePlantInfo) => {
  const url = process.env.REACT_APP_API_URL + "/api/v1/plants/" + this.state.idOfPlantToEdit

  try {
    const updatePlantResponse = await fetch(url, {
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify(updatePlantInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const updatePlantJson = await updatePlantResponse.json()
    console.log("updatePlantJson");
    console.log(updatePlantJson);

    if (updatePlantResponse.status === 200) {
      const plants = this.state.allUserPlants
      const indexOfUpdatedPlant = plants.findIndex(plant => plant.id === this.state.idOfPlantToEdit)
      plants[indexOfUpdatedPlant] = updatePlantJson.data

      this.setState({
        plants: plants,
        idOfPlantToEdit: -1
      })
    }
  }
  catch (err) {
    console.error(err);
  }
}

closeModal =() => {
  this.setState({
    idOfPlantToEdit: -1
  })
}

  render() {
    return (
      <React.Fragment>
      <h3> See My Plants </h3>
        <UserPlantsList
          allUserPlants={this.state.allUserPlants}
          editPlant={this.editPlant}
          deleteUserPlants={this.deleteUserPlants}
          />
          {
            this.state.idOfPlantToEdit !== -1
            &&
            <EditUserPlants
            closeModal={this.closeModal}
            updatePlant={this.updatePlant}
            plantToEdit=
            {this.state.allUserPlants.find((plant)=> plant.id === this.state.idOfPlantToEdit)}
            />
          }
      </React.Fragment>
    )
  }
  }
