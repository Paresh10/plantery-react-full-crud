import React, { Component } from 'react'
import { Card, Button, Image } from 'semantic-ui-react'

export default class UserPlantsList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      action: 'SeeMyPlants'
    }
  }

  renderUsersPlants = () => {
    if (this.state.action === 'SeeMyPlants') {
      this.setState({
        action: 'HideMyPlants'
      })
    }
    else {
      this.setState({
        action: 'SeeMyPlants'
      })
    }
  }

  render() {
    const allPlantsForUser = this.props.allUserPlants.map((plant) => {
      return(
        <Card.Group key={plant.id} color='black'>
          <Card >
            <Card.Content >
              <Image
              floated='right'
              size='mini'
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSE9QAnM-RsJuta8SNp___18t9xWTyJ9Q_QBjNpcpFJNFa2zKh4Wg5-iTG43mqmqa2YdYznun07&usqp=CAc'
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
      <Card.Group>

      {allPlantsForUser}

      </Card.Group>
    )
    }

  }
