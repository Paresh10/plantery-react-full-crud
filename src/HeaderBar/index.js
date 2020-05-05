import React from 'react'
import UserPlantsList from '../UserPlantsList'
import { Menu, Segment } from 'semantic-ui-react'
import { NavLink, BrowserRouter as Router, Route } from 'react-router-dom'
// import Route from 'react-router-dom/Route'

export default function HeaderBar(props) {

  return(
    <React.Fragment>
    <Router>
      <div className="ui fixed borderless huge menu">
        <div className="ui container grid">

            <NavLink  to="/plants">
              Plantery
            </NavLink>

            <NavLink to="/users/myplants">
            See My Plants
            </NavLink>

        </div>
      </div>

      <Route path="/users/myplants" exact component={props.allUserPlants} />

    </Router>
    </React.Fragment>
  )

}
