import React from 'react'
import { Card, Button, Image } from 'semantic-ui-react'


export default function PlantList(props) {

  const plants = props.plants.map((plant) => {
    return(
      <Card key={plant.id} color='black' style={{ marginLeft: '20px' }}>
      <Image src= {plant.image}/>
      <Card.Content>
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

        </Card.Content>
      </Card>
    )
  })
  return(
    <Card.Group>
      {plants}
    </Card.Group>
  )
}
