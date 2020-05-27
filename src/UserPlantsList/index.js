import React, { Component } from 'react'
import { Card, Button, Image } from 'semantic-ui-react'
import HeaderBar from '../HeaderBar'

export default class UserPlantsList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      action: 'ShowPlants'
    }
  }

  renderUsersPlants = () => {
    if (this.state.action === 'ShowPlants') {
      this.setState({
        action: 'HideMyPlants'
      })
    }
    else {
      this.setState({
        action: 'ShowPlants'
      })
    }
  }

  render() {
    const allPlantsForUser = this.props.allUserPlants.map((plant) => {
      return(
        <Card.Group key={plant.id} color='black' style={{ marginLeft: '20px' }}>
          <Card >
            <Card.Content >
              <Image
              floated='right'
              size='mini'
              src={plant.image}
              />
              <Card.Header>
                {plant.name}
              </Card.Header>

              <Card.Meta>
                Found in: {plant.region}
              </Card.Meta>
              <Card.Meta>
                Posted by: {plant.belongs_to.name}
              </Card.Meta>

              <Card.Description>
                About: {plant.description}
              </Card.Description>
            </Card.Content>

              <Card.Content extra>
              <div className='ui two buttons'>
                <Button
                onClick={() => this.props.editPlant(plant.id)}
                basic color='blue'>
                  Edit
                </Button>
                <Button
                onClick={() => this.props.deleteUserPlants(plant.id)}
                basic color='red'>
                  Delete
                </Button>
              </div>
            </Card.Content>

          </Card>
        </Card.Group>
      )

    })

    return(
      <React.Fragment>
      {
        this.state.action === 'ShowPlants'
        &&
        <Card.Group>
        {allPlantsForUser}
        </Card.Group>
      }

      </React.Fragment>
    )
    }

  }
