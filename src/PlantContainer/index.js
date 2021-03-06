import React, { Component } from 'react'
import PlantList from '../PlantList'
import PlantNewForm from '../PlantNewForm'
import './index.css'


export default class PlantContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      plants: [],
      addPlant: -1,
      status: ''
    }
  }
componentDidMount () {
  this.allPlants()
}

// Get routes for all the plants
allPlants = async () => {
  try {
    const url = process.env.REACT_APP_API_URL + "/api/v1/plants/"

    const plantsResponse = await fetch(url, {
      credentials: 'include'
    })

    const plantJson = await plantsResponse.json()
    console.log(plantJson);
    this.setState({
      plants: plantJson.data
    })
  }
  catch (err) {
    console.error(err);
  }
}

// Create routes for the plant
addNewPlant = async (addPlant) => {
  try {
    const url = process.env.REACT_APP_API_URL + "/api/v1/plants/"

    const addNewPlantResponse = await fetch(url, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(addPlant),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const plantJson = await addNewPlantResponse.json()

    console.log("plantJson");
    console.log(plantJson);

    if (addNewPlantResponse.status === 201) {

      const plant = this.state.plants
      plant.push(plantJson.data)
      console.log("plant");
      console.log(plant);

      this.setState({
        plant: plant
      })
    }
  }
  catch (err) {
    console.error(err);
  }
}

// getStatus = () => {
//   this.setStatus({
//     status: this.props.action
//   })

// }

  render() {
    return(
      <React.Fragment>
      <h3 className="welcome"> {this.props.message} Welcome to Plantery </h3>

      {
        this.props.action === "AddPlant"
        &&
        <PlantNewForm
        closeModal={this.closeModal}
        addNewPlant={this.addNewPlant}/>
      }

      {
        this.state.plants.length > 0
        &&
        <PlantList plants={this.state.plants}
        />

      }

      </React.Fragment>
    )
  }
}
