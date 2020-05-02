import React from 'react'
import { Card, Button, Image} from 'semantic-ui-react'

export default function UserPlantsList(props) {

  const allPlantsForUser = props.allUserPlants.map((plant) => {
    return(
      <Card.Group key={plant.id} coloe='black'>
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
              onClick={() => props.editPlant(plant.id)}
              basic color='blue'>
                Edit
              </Button>
              <Button basic color='red'>
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
